"use client";

import { Handbag, Plus } from "@phosphor-icons/react";
import { useCart, type LineSnapshot } from "./cart-context";

export function CartButton({ className = "" }: { className?: string }) {
  const { count, open, ready } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      className={`relative inline-flex min-h-11 items-center gap-2 rounded-full px-3.5 font-bold ${className}`}
      aria-label={ready && count > 0 ? `Open cart, ${count} item${count === 1 ? "" : "s"}` : "Open cart"}
    >
      <Handbag size={24} weight="bold" aria-hidden />
      <span className="hidden sm:inline">Cart</span>
      {ready && count > 0 && (
        <span className="price grid h-6 min-w-6 place-items-center rounded-full bg-apple-600 px-1.5 text-xs leading-none text-cream-50">
          {count}
        </span>
      )}
    </button>
  );
}

/** Small round "+" for shelf/explorer tiles. */
export function QuickAdd({ line, label }: { line: LineSnapshot; label: string }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      onClick={() => add(line, 1)}
      className="grid size-11 shrink-0 place-items-center rounded-full bg-apple-600 text-cream-50 shadow-[0_8px_16px_-8px_rgb(140_15_22/0.9)] transition-transform hover:scale-105 hover:bg-apple-700 active:scale-95"
      aria-label={`Add ${label} to cart`}
    >
      <Plus size={20} weight="bold" aria-hidden />
    </button>
  );
}

export function AddToCart({
  line,
  className = "btn btn-primary",
  children = "Add to cart",
}: {
  line: LineSnapshot;
  className?: string;
  children?: React.ReactNode;
}) {
  const { add } = useCart();
  return (
    <button type="button" className={className} onClick={() => add(line, 1)}>
      {children}
    </button>
  );
}
