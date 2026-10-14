import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { SeasonalSpotlight } from "@/components/home/SeasonalSpotlight";
import { FlavorExplorer, type ExplorerApple } from "@/components/home/FlavorExplorer";
import { PressBand, HandDipped, ClubFeature, GiftingExperiences, FundraisingBand, InstagramGrid } from "@/components/home/Sections";
import { VisitBlock } from "@/components/VisitBlock";
import { coreApples, priceLabel } from "@/lib/catalog";
import { lineFor } from "@/lib/cart-line";

export const metadata: Metadata = {
  title: { absolute: "Caramel Apples & Hand-Dipped Chocolates in Carnegie, PA | My Favorite Sweet Shoppe" },
  description:
    "Gourmet caramel apples, hand-dipped chocolates and chocolate covered strawberries, made by hand on Main Street in Carnegie, PA, just outside Pittsburgh. Order for local pickup or shipping.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const apples: ExplorerApple[] = coreApples.map((p) => ({
    handle: p.handle,
    name: p.name === "Classic Caramel Apple" ? "Classic Caramel" : p.name,
    price: priceLabel(p),
    short: p.short,
    flavors: p.flavors,
    cutout: p.cutout!,
    badge: p.badge,
    line: lineFor(p),
  }));

  return (
    <>
      <Hero />
      <PressBand />
      <SeasonalSpotlight />
      <section aria-labelledby="explorer-title" className="bg-caramel-500 text-cocoa-950">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <h2 id="explorer-title" className="display text-[clamp(2.6rem,1.4rem+4.4vw,5.25rem)]">
            Pick your apple.
          </h2>
          <p className="measure mt-4 mb-8 text-lg">
            Every one starts as a tart Granny Smith dipped in caramel we make in small batches. Then it gets interesting.
          </p>
          <FlavorExplorer apples={apples} />
        </div>
      </section>
      <HandDipped />
      <ClubFeature />
      <GiftingExperiences />
      <FundraisingBand />
      <section aria-label="Visit the shop" className="border-t border-cream-200 bg-cream-50">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <VisitBlock />
        </div>
      </section>
      <InstagramGrid />
    </>
  );
}
