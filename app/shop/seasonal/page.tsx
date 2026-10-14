import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { seasons, getProducts } from "@/lib/catalog";
import { SEASON_LABELS } from "@/lib/nav";
import { ProductCard } from "@/components/product/ProductCard";
import { Container, Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Seasonal Treats: Halloween, Christmas, Valentine's, Easter & More",
  description:
    "Seasonal caramel apples, holiday gift boxes, Valentine's strawberries, Easter baskets and graduation photo Oreos from My Favorite Sweet Shoppe in Carnegie, PA.",
  alternates: { canonical: "/shop/seasonal" },
};

/** The current season is picked by date before first paint (html[data-season]); every season is prerendered. */
export default function SeasonalPage() {
  return (
    <>
      {seasons.map((s) => (
        <div key={s.id} data-season-only={s.id}>
          <section className="on-dark bg-cocoa-900 text-cream-50">
            <Container className="grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:py-16">
              <div className="lg:col-span-6">
                <Breadcrumbs
                  dark
                  items={[
                    { name: "Shop", path: "/shop" },
                    { name: "Seasonal", path: "/shop/seasonal" },
                  ]}
                />
                <p className="mt-6 font-display text-xl text-caramel-400 italic">Now in season: {SEASON_LABELS[s.id]}</p>
                <h1 className="display mt-2 text-[clamp(2.8rem,1.5rem+4.8vw,5.75rem)]">{s.headline}</h1>
                <p className="measure mt-6 text-xl text-cream-100">{s.intro}</p>
              </div>
              <div className="lg:col-span-6">
                <div className="warm relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
                  <Image src={s.image.url} alt={s.image.alt} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
                </div>
              </div>
            </Container>
          </section>
          <Container className="py-14 lg:py-20">
            <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {getProducts(s.handles).map((p) => (
                <li key={p.handle}>
                  <ProductCard product={p} className="h-full" aspect="aspect-square" />
                </li>
              ))}
            </ul>
          </Container>
        </div>
      ))}
      <Container className="pb-20">
        <h2 className="text-3xl">Through the year</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {seasons.map((s) => (
            <li key={s.id} className="flex items-baseline justify-between gap-4 rounded-[14px] bg-cream-100 px-5 py-4">
              <span className="font-display text-xl font-semibold [font-variation-settings:'SOFT'_100]">{SEASON_LABELS[s.id]}</span>
              <span className="text-cocoa-700">
                {s.months.map((m) => new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" }).format(Date.UTC(2026, m - 1, 15))).join(" & ")}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-cocoa-700">
          Need something for a specific date? Add it to your cart notes, or{" "}
          <Link href="/contact" className="link">
            get in touch
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
