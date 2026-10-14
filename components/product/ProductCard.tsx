import Image from "next/image";
import Link from "next/link";
import { type Product, priceLabel } from "@/lib/catalog";
import { lineFor } from "@/lib/cart-line";
import { QuickAdd } from "@/components/cart/CartButtons";

export function Sticker({ badge, className = "" }: { badge: Product["badge"]; className?: string }) {
  if (!badge) return null;
  return badge === "best-seller" ? (
    <span className={`sticker sticker-best ${className}`}>
      Best
      <br />
      seller
    </span>
  ) : (
    <span className={`sticker sticker-seasonal ${className}`}>Seasonal</span>
  );
}

/** Chocolate wave that rises over the card on hover: "the dip". */
export function DipCoat() {
  return (
    <span className="dip-coat" aria-hidden>
      <svg viewBox="0 0 400 34" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M0 22 C 30 10, 55 30, 90 20 S 150 6, 190 18 S 250 32, 290 16 S 360 8, 400 20 L400 34 L0 34 Z"
        />
      </svg>
      <span className="gloss" />
    </span>
  );
}

export function ProductCard({
  product: p,
  sizes = "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw",
  aspect = "aspect-[4/5]",
  showShort = false,
  className = "",
  headingLevel = "h3",
  feature = false,
}: {
  product: Product;
  sizes?: string;
  aspect?: string;
  showShort?: boolean;
  className?: string;
  headingLevel?: "h2" | "h3";
  /** Bento hero tile: the photo grows to fill the cell and the label stays compact. */
  feature?: boolean;
}) {
  const H = headingLevel;
  const canQuickAdd = !p.requiresQuote && p.variants.length === 1;
  return (
    <article className={`dip group relative rounded-[var(--radius-card)] bg-cream-100 shadow-[var(--shadow-soft)] ${className}`}>
      <Link href={p.url} className="flex h-full flex-col rounded-[var(--radius-card)]">
        <span className={`warm relative block ${aspect} ${feature ? "min-h-0 flex-1" : ""} overflow-hidden rounded-t-[var(--radius-card)]`}>
          <Image src={p.image.url} alt={p.image.altText ?? p.title} fill sizes={sizes} className="dip-img object-cover" />
        </span>
        <span className={`dip-label flex flex-col gap-1 p-3.5 sm:p-5 sm:pr-16 ${feature ? "flex-none sm:p-7 sm:pr-20" : "flex-1"}`}>
          <H className={feature ? "text-[1.6rem] leading-tight sm:text-[2.2rem]" : "text-[1.12rem] leading-tight sm:text-[1.35rem]"}>
            {p.name}
          </H>
          {showShort && <span className={`dip-muted line-clamp-2 text-cocoa-700 ${feature ? "text-base sm:text-lg" : "text-sm"}`}>{p.short}</span>}
          <span className="price dip-muted mt-auto pt-1 font-semibold text-cocoa-700">{priceLabel(p)}</span>
        </span>
      </Link>
      <Sticker badge={p.badge} className="absolute top-3 left-3 z-[3]" />
      {canQuickAdd && (
        <span className="absolute top-2.5 right-2.5 z-[3] sm:top-auto sm:right-4 sm:bottom-4">
          <QuickAdd line={lineFor(p)} label={p.name} />
        </span>
      )}
      <DipCoat />
    </article>
  );
}
