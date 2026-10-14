"use client";

import { useState } from "react";
import { ArrowRight, Check } from "@phosphor-icons/react";

type Cadence = { id: string; label: string; detail: string; sellingPlanId: string };
type Box = { id: string; label: string; price: number; apples: number; url: string };

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

/**
 * Cadence + box picker. Subscribing deep-links to the shop's existing Shopify subscription product with the
 * selling plan preselected, so the subscription runs on their current subscriptions app.
 */
export function ClubPicker({ cadences, boxes }: { cadences: Cadence[]; boxes: Box[] }) {
  const [cadence, setCadence] = useState(cadences[0].id);
  const [box, setBox] = useState(boxes[0].id);
  const c = cadences.find((x) => x.id === cadence)!;
  const b = boxes.find((x) => x.id === box)!;
  const perYear = c.id === "monthly" ? 12 : c.id === "bimonthly" ? 6 : 4;
  const href = `${b.url}?selling_plan=${c.sellingPlanId.split("/").pop()}`;

  const tile = (active: boolean) =>
    `relative flex cursor-pointer flex-col rounded-[16px] border-2 p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-caramel-400 ${
      active ? "border-cocoa-900 bg-cocoa-900 text-cream-50" : "border-cream-200 bg-cream-50 hover:border-cocoa-500"
    }`;

  return (
    <div className="rounded-[28px] bg-cream-50 p-5 text-cocoa-900 shadow-[0_40px_70px_-30px_rgb(30_15_11/0.7)] sm:p-7">
      <fieldset>
        <legend className="font-display text-2xl font-semibold [font-variation-settings:'SOFT'_100]">How often?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {cadences.map((x) => (
            <label key={x.id} className={tile(x.id === cadence)}>
              <input type="radio" name="cadence" value={x.id} checked={x.id === cadence} onChange={() => setCadence(x.id)} className="sr-only" />
              <span className="font-bold">{x.label}</span>
              <span className={`text-sm ${x.id === cadence ? "text-caramel-200" : "text-cocoa-700"}`}>{x.detail}</span>
              {x.id === cadence && <Check size={18} weight="bold" className="absolute top-3 right-3 text-caramel-400" aria-hidden />}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="mt-6">
        <legend className="font-display text-2xl font-semibold [font-variation-settings:'SOFT'_100]">Which box?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {boxes.map((x) => (
            <label key={x.id} className={tile(x.id === box)}>
              <input type="radio" name="box" value={x.id} checked={x.id === box} onChange={() => setBox(x.id)} className="sr-only" />
              <span className="font-bold">{x.label}</span>
              <span className={`price text-sm ${x.id === box ? "text-caramel-200" : "text-cocoa-700"}`}>
                {usd.format(x.price)} a box, shipping included
              </span>
              {x.id === box && <Check size={18} weight="bold" className="absolute top-3 right-3 text-caramel-400" aria-hidden />}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-cream-200 pt-6">
        <p aria-live="polite">
          <span className="price display block text-4xl">{usd.format(b.price)}</span>
          <span className="text-cocoa-700">
            {b.apples} apple{b.apples > 1 ? "s" : ""} per box, {perYear} boxes a year
          </span>
        </p>
        <a href={href} className="btn btn-primary text-lg">
          Subscribe <ArrowRight size={20} weight="bold" aria-hidden />
        </a>
      </div>
      <p className="mt-3 text-sm text-cocoa-700">Cancel or pause anytime. You&apos;ll finish on our secure Shopify checkout.</p>
    </div>
  );
}
