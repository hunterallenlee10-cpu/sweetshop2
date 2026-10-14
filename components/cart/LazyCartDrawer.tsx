"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCart } from "./cart-context";

const load = () => import("./CartDrawer").then((m) => m.CartDrawer);
const CartDrawer = dynamic(load, { ssr: false });

/** The drawer isn't needed for first paint: warm its chunk when the browser is idle, mount it on first open. */
export function LazyCartDrawer() {
  const { isOpen } = useCart();
  const [wanted, setWanted] = useState(false);
  if (isOpen && !wanted) setWanted(true);

  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => void load());
    else window.setTimeout(() => void load(), 2500);
  }, []);

  return wanted ? <CartDrawer /> : null;
}
