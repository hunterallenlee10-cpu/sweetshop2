"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { Minus, Plus, X, Storefront, Truck, LockSimple, Trash } from "@phosphor-icons/react";
import { checkoutUrl, useCart } from "./cart-context";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function CartDrawer() {
  const cart = useCart();
  const ref = useRef<HTMLDialogElement>(null);
  const giftId = useId();
  const { state, isOpen, close, mustPickup } = cart;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  const fulfillment = mustPickup ? "pickup" : state.fulfillment;

  return (
    <>
      <dialog
        ref={ref}
        aria-labelledby="cart-title"
        onClose={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="cart-sheet fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-full max-w-[440px] bg-cream-50 p-0 text-cocoa-900 shadow-[var(--shadow-lift)] backdrop:bg-cocoa-950/55"
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-cream-200 px-6 py-5">
            <h2 id="cart-title" className="text-[1.9rem]">
              Your cart
            </h2>
            <button
              type="button"
              onClick={close}
              className="grid size-11 place-items-center rounded-full hover:bg-cream-100"
              aria-label="Close cart"
            >
              <X size={22} weight="bold" />
            </button>
          </header>

          {state.lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
              <Image src="/cutouts/caramel-apple.webp" alt="" width={110} height={170} className="h-auto w-[110px] -rotate-6" />
              <p className="display text-3xl">Nothing in the bag yet.</p>
              <p className="text-cocoa-700">Start with an apple. Everyone does.</p>
              <Link href="/shop/caramel-apples" className="btn btn-primary" onClick={close}>
                Shop caramel apples
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex-1 divide-y divide-cream-200 overflow-y-auto px-6" aria-label="Items in your cart">
                {state.lines.map((l) => (
                  <li key={l.variantId} className="flex gap-4 py-5">
                    <Link
                      href={`/products/${l.handle}`}
                      onClick={close}
                      className="relative size-[84px] shrink-0 overflow-hidden rounded-[14px] bg-cream-100"
                    >
                      <Image src={l.image.url} alt={l.image.alt} fill sizes="84px" className="object-cover" />
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            href={`/products/${l.handle}`}
                            onClick={close}
                            className="block font-display text-lg leading-tight [font-variation-settings:'SOFT'_100] hover:underline"
                          >
                            {l.title}
                          </Link>
                          {l.variantTitle && <p className="text-sm text-cocoa-500">{l.variantTitle}</p>}
                          {!l.ships && <p className="mt-0.5 text-sm text-apple-600">Pickup only</p>}
                        </div>
                        <p className="price shrink-0 font-semibold">{usd.format(l.price * l.quantity)}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center rounded-full bg-cream-100" role="group" aria-label={`Quantity for ${l.title}`}>
                          <button
                            type="button"
                            className="grid size-10 place-items-center rounded-full hover:bg-cream-200"
                            onClick={() => cart.setQuantity(l.variantId, l.quantity - 1)}
                            aria-label={`Decrease quantity of ${l.title}`}
                          >
                            <Minus size={16} weight="bold" />
                          </button>
                          <span className="price w-8 text-center font-semibold" aria-live="polite">
                            {l.quantity}
                          </span>
                          <button
                            type="button"
                            className="grid size-10 place-items-center rounded-full hover:bg-cream-200"
                            onClick={() => cart.setQuantity(l.variantId, l.quantity + 1)}
                            aria-label={`Increase quantity of ${l.title}`}
                          >
                            <Plus size={16} weight="bold" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => cart.remove(l.variantId)}
                          className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-sm text-cocoa-700 hover:bg-cream-100"
                        >
                          <Trash size={16} /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="space-y-5 border-t border-cream-200 bg-cream-100/70 px-6 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <fieldset>
                  <legend className="mb-2 text-sm font-bold">How would you like it?</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        { v: "pickup", label: "Pick up", sub: "237 E Main St", Icon: Storefront },
                        { v: "ship", label: "Ship it", sub: "To your door", Icon: Truck },
                      ] as const
                    ).map(({ v, label, sub, Icon }) => {
                      const disabled = v === "ship" && mustPickup;
                      return (
                        <label
                          key={v}
                          className={`flex cursor-pointer items-center gap-3 rounded-[14px] border-2 px-3 py-2.5 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-apple-600 ${
                            fulfillment === v ? "border-cocoa-900 bg-cocoa-900 text-cream-50" : "border-cream-200 bg-cream-50 hover:border-cocoa-500"
                          } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                        >
                          <input
                            type="radio"
                            name="fulfillment"
                            value={v}
                            className="sr-only"
                            checked={fulfillment === v}
                            disabled={disabled}
                            onChange={() => cart.setFulfillment(v)}
                          />
                          <Icon size={22} aria-hidden />
                          <span className="leading-tight">
                            <span className="block font-bold">{label}</span>
                            <span className={`text-xs ${fulfillment === v ? "text-caramel-200" : "text-cocoa-700"}`}>{sub}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {mustPickup && (
                    <p className="mt-2 text-sm text-cocoa-700">
                      Strawberries and photo treats are made fresh for local pickup, so this order is pickup only.
                    </p>
                  )}
                </fieldset>

                <div>
                  <div className="flex items-baseline justify-between">
                    <label htmlFor={giftId} className="text-sm font-bold">
                      Gift message <span className="font-normal text-cocoa-700">(optional)</span>
                    </label>
                    <span className="price text-xs text-cocoa-700">{state.giftMessage.length}/300</span>
                  </div>
                  <textarea
                    id={giftId}
                    rows={2}
                    maxLength={300}
                    value={state.giftMessage}
                    onChange={(e) => cart.setGiftMessage(e.target.value)}
                    className="mt-1.5 w-full resize-none rounded-[14px] border-2 border-cream-200 bg-cream-50 px-3.5 py-2.5 text-base placeholder:text-cocoa-500 focus:border-cocoa-900 focus:outline-none"
                    placeholder="Happy birthday, Grandma! Love, the kids."
                  />
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="font-bold">Subtotal</span>
                  <span className="price display text-3xl">{usd.format(cart.subtotal)}</span>
                </div>
                <p className="-mt-3 text-sm text-cocoa-700">
                  {fulfillment === "pickup"
                    ? "Pickup is free. Taxes are calculated at checkout."
                    : "Shipping and taxes are calculated at checkout."}{" "}
                  <Link href="/allergy-info" onClick={close} className="link">
                    Allergy info
                  </Link>
                </p>
                <a href={checkoutUrl(state, mustPickup)} className="btn btn-primary w-full text-lg">
                  <LockSimple size={20} weight="bold" aria-hidden /> Check out
                </a>
                <p className="-mt-2 text-center text-xs text-cocoa-700">
                  You&apos;ll finish on our secure Shopify checkout.
                </p>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
