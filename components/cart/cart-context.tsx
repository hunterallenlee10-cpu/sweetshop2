"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState, useSyncExternalStore } from "react";

const STORE = "https://myfavoritesweetshoppe.com";
const KEY = "mfss-cart-v1";

/** Everything the cart needs to render a line, captured when it is added, so the client never loads the catalog. */
export type LineSnapshot = {
  variantId: string; // gid://shopify/ProductVariant/123
  handle: string;
  title: string;
  variantTitle: string | null;
  price: number;
  image: { url: string; width: number; height: number; alt: string };
  ships: boolean;
  shopifyUrl: string;
};
export type CartLine = LineSnapshot & { quantity: number };
export type Fulfillment = "pickup" | "ship";

type State = { lines: CartLine[]; fulfillment: Fulfillment; giftMessage: string };
type Action =
  | { type: "hydrate"; state: State }
  | { type: "add"; line: LineSnapshot; quantity: number }
  | { type: "set-qty"; variantId: string; quantity: number }
  | { type: "remove"; variantId: string }
  | { type: "fulfillment"; value: Fulfillment }
  | { type: "gift"; value: string }
  | { type: "clear" };

const initial: State = { lines: [], fulfillment: "pickup", giftMessage: "" };
const MAX_QTY = 99;

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case "hydrate":
      return a.state;
    case "add": {
      const existing = state.lines.find((l) => l.variantId === a.line.variantId);
      const lines = existing
        ? state.lines.map((l) =>
            l.variantId === a.line.variantId ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + a.quantity) } : l,
          )
        : [...state.lines, { ...a.line, quantity: Math.min(MAX_QTY, a.quantity) }];
      return { ...state, lines };
    }
    case "set-qty":
      return {
        ...state,
        lines:
          a.quantity <= 0
            ? state.lines.filter((l) => l.variantId !== a.variantId)
            : state.lines.map((l) => (l.variantId === a.variantId ? { ...l, quantity: Math.min(MAX_QTY, a.quantity) } : l)),
      };
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.variantId !== a.variantId) };
    case "fulfillment":
      return { ...state, fulfillment: a.value };
    case "gift":
      return { ...state, giftMessage: a.value.slice(0, 300) };
    case "clear":
      return initial;
  }
}

const numericId = (gid: string) => gid.split("/").pop();

/** Builds a Shopify cart permalink on the existing store: real cart, real checkout, today. */
export function checkoutUrl(state: State, mustPickup: boolean) {
  if (!state.lines.length) return STORE;
  const items = state.lines.map((l) => `${numericId(l.variantId)}:${l.quantity}`).join(",");
  const params = new URLSearchParams();
  const fulfillment = mustPickup ? "pickup" : state.fulfillment;
  params.set("attributes[Fulfillment]", fulfillment === "pickup" ? "Local pickup in Carnegie" : "Ship it");
  if (state.giftMessage.trim()) params.set("note", `Gift message: ${state.giftMessage.trim()}`);
  return `${STORE}/cart/${items}?${params.toString()}`;
}

type Ctx = {
  state: State;
  ready: boolean;
  count: number;
  subtotal: number;
  mustPickup: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (line: LineSnapshot, quantity?: number) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  remove: (variantId: string) => void;
  setFulfillment: (f: Fulfillment) => void;
  setGiftMessage: (m: string) => void;
  announcement: string;
};

const CartContext = createContext<Ctx | null>(null);
const noopSubscribe = () => () => {};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  // false during prerender and hydration, true once running in the browser
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const [isOpen, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const hydrated = useRef(false);

  // localStorage is only read after mount: nothing time- or browser-dependent runs during prerender.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as State;
        if (Array.isArray(parsed.lines)) dispatch({ type: "hydrate", state: { ...initial, ...parsed } });
      }
    } catch {
      /* storage unavailable: run as an in-memory cart */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore quota / private mode */
    }
  }, [state]);

  const add = useCallback((line: LineSnapshot, quantity = 1) => {
    dispatch({ type: "add", line, quantity });
    setAnnouncement(`Added ${quantity} ${line.title}${line.variantTitle ? `, ${line.variantTitle}` : ""} to your cart.`);
    setOpen(true);
  }, []);

  const value = useMemo<Ctx>(() => {
    const count = state.lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = state.lines.reduce((n, l) => n + l.quantity * l.price, 0);
    return {
      state,
      ready,
      count,
      subtotal,
      mustPickup: state.lines.some((l) => !l.ships),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add,
      setQuantity: (variantId, quantity) => dispatch({ type: "set-qty", variantId, quantity }),
      remove: (variantId) => {
        const line = state.lines.find((l) => l.variantId === variantId);
        dispatch({ type: "remove", variantId });
        if (line) setAnnouncement(`Removed ${line.title} from your cart.`);
      },
      setFulfillment: (value) => dispatch({ type: "fulfillment", value }),
      setGiftMessage: (value) => dispatch({ type: "gift", value }),
      announcement,
    };
  }, [state, ready, isOpen, add, announcement]);

  return (
    <CartContext.Provider value={value}>
      {children}
      {/* always mounted, so additions are announced even before the lazy drawer loads */}
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
