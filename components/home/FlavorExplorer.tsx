"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { flushSync } from "react-dom";
import { QuickAdd } from "@/components/cart/CartButtons";
import type { LineSnapshot } from "@/components/cart/cart-context";

export type ExplorerApple = {
  handle: string;
  name: string;
  price: string;
  short: string;
  flavors: string[];
  cutout: { src: string; width: number; height: number };
  badge: string | null;
  line: LineSnapshot;
};

const FILTERS = [
  { id: "all", label: "All apples" },
  { id: "caramel", label: "Caramel" },
  { id: "chocolate", label: "Chocolate" },
  { id: "candy", label: "Candy-topped" },
  { id: "nutty", label: "Nutty" },
] as const;
type FilterId = (typeof FILTERS)[number]["id"];

export function FlavorExplorer({ apples }: { apples: ExplorerApple[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const shown = filter === "all" ? apples : apples.filter((a) => a.flavors.includes(filter));
  const count = (id: FilterId) => (id === "all" ? apples.length : apples.filter((a) => a.flavors.includes(id)).length);

  const choose = (id: FilterId) => {
    if (id === filter) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (!reduce && doc.startViewTransition) doc.startViewTransition(() => flushSync(() => setFilter(id)));
    else setFilter(id);
  };

  const label = FILTERS.find((f) => f.id === filter)!.label.toLowerCase();

  return (
    <div>
      <div role="group" aria-label="Filter apples by flavor" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        {FILTERS.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => choose(f.id)}
              className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-5 font-bold transition-colors ${
                active ? "bg-cocoa-900 text-cream-50" : "bg-cream-50 text-cocoa-900 hover:bg-caramel-200"
              }`}
            >
              {f.label}
              <span className={`price text-sm font-semibold ${active ? "text-caramel-200" : "text-cocoa-500"}`}>{count(f.id)}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {filter === "all" ? "apples" : `${label} apples`}.
      </p>

      {/* the case */}
      <div className="mt-8 rounded-[28px] bg-cream-100 p-3 shadow-[inset_0_2px_0_rgb(255_255_255/0.6),0_30px_60px_-30px_rgb(42_23_17/0.6)] sm:p-5 lg:p-8">
        <ul className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto md:grid md:grid-cols-4 md:overflow-visible lg:grid-cols-6">
          {shown.map((a) => (
            <li
              key={a.handle}
              className="group relative w-[46vw] max-w-[220px] shrink-0 snap-start md:w-auto md:max-w-none"
              style={{ viewTransitionName: `apple-${a.handle}` }}
            >
              <Link href={`/products/${a.handle}`} className="block rounded-[16px] focus-visible:outline-offset-[-3px]">
                <span className="relative flex h-[190px] items-end justify-center px-3 sm:h-[220px]">
                  <Image
                    src={a.cutout.src}
                    alt=""
                    width={a.cutout.width}
                    height={a.cutout.height}
                    sizes="(min-width: 1024px) 140px, 120px"
                    className="relative z-[1] h-[92%] w-auto object-contain transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:rotate-3 motion-reduce:transition-none"
                  />
                  {a.badge === "best-seller" && (
                    <span className="sticker sticker-best absolute top-2 left-2 z-[2] size-16! text-[0.72rem]!">
                      Best
                      <br />
                      seller
                    </span>
                  )}
                </span>
                {/* shelf board: cells sit edge to edge, so the boards read as one shelf */}
                <span aria-hidden className="block h-3 bg-cream-200 shadow-[0_8px_10px_-6px_rgb(42_23_17/0.45)]" />
                <span className="block px-3 pt-4 pb-5 pr-14">
                  <span className="block font-display text-[1.15rem] leading-tight font-semibold [font-variation-settings:'SOFT'_100]">
                    {a.name}
                  </span>
                  <span className="price mt-0.5 block font-semibold text-cocoa-700">{a.price}</span>
                </span>
              </Link>
              <span className="absolute right-2 bottom-5">
                <QuickAdd line={a.line} label={`${a.name} caramel apple`} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
