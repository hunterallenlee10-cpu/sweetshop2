"use client";

import { useId, useMemo, useState } from "react";
import { Minus, Plus, Handbag } from "@phosphor-icons/react";
import { useCart, type LineSnapshot } from "@/components/cart/cart-context";

type V = { id: string; title: string; price: number; available: boolean; options: Record<string, string> };

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function PurchasePanel({
  base,
  options,
  variants,
}: {
  base: Omit<LineSnapshot, "variantId" | "variantTitle" | "price">;
  options: { name: string; values: string[] }[];
  variants: V[];
}) {
  const { add } = useCart();
  const uid = useId();
  const [selected, setSelected] = useState<Record<string, string>>(() => variants[0].options);
  const [qty, setQty] = useState(1);

  const variant = useMemo(
    () => variants.find((v) => Object.entries(selected).every(([k, val]) => v.options[k] === val)) ?? null,
    [selected, variants],
  );
  const available = (name: string, value: string) =>
    variants.some((v) => v.available && v.options[name] === value && Object.entries(selected).every(([k, val]) => k === name || v.options[k] === val));

  return (
    <div className="space-y-6">
      <p className="price display text-4xl" aria-live="polite">
        {variant ? usd.format(variant.price) : "Unavailable"}
      </p>

      {options.map((o) => (
        <fieldset key={o.name}>
          <legend className="mb-2 font-bold">{o.name.replace(/^Title$/, "Option")}</legend>
          <div className="flex flex-wrap gap-2">
            {o.values.map((val) => {
              const checked = selected[o.name] === val;
              const ok = available(o.name, val);
              return (
                <label
                  key={val}
                  className={`relative inline-flex min-h-11 cursor-pointer items-center rounded-full border-2 px-4 font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-apple-600 ${
                    checked ? "border-cocoa-900 bg-cocoa-900 text-cream-50" : "border-cream-200 bg-cream-50 hover:border-cocoa-500"
                  } ${ok ? "" : "line-through opacity-50"}`}
                >
                  <input
                    type="radio"
                    name={`${uid}-${o.name}`}
                    value={val}
                    checked={checked}
                    onChange={() => setSelected((s) => ({ ...s, [o.name]: val }))}
                    className="sr-only"
                  />
                  {val}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full bg-cream-100" role="group" aria-label="Quantity">
          <button
            type="button"
            className="grid size-12 place-items-center rounded-full hover:bg-cream-200 disabled:opacity-40"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            aria-label="Decrease quantity"
          >
            <Minus size={18} weight="bold" />
          </button>
          <span className="price w-10 text-center text-lg font-semibold" aria-live="polite" aria-label={`Quantity ${qty}`}>
            {qty}
          </span>
          <button
            type="button"
            className="grid size-12 place-items-center rounded-full hover:bg-cream-200"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            aria-label="Increase quantity"
          >
            <Plus size={18} weight="bold" />
          </button>
        </div>
        <button
          type="button"
          disabled={!variant || !variant.available}
          onClick={() =>
            variant &&
            add(
              { ...base, variantId: variant.id, variantTitle: variant.title === "Default Title" ? null : variant.title, price: variant.price },
              qty,
            )
          }
          className="btn btn-primary min-w-[14rem] flex-1 text-lg sm:flex-none"
        >
          <Handbag size={22} weight="bold" aria-hidden />
          {variant && !variant.available ? "Sold out" : `Add to cart${variant ? ` · ${usd.format(variant.price * qty)}` : ""}`}
        </button>
      </div>
    </div>
  );
}
