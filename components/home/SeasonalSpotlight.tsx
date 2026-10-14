import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getSeason, getProducts, priceLabel } from "@/lib/catalog";
import { currentSeasonId } from "@/lib/season-now";
import { SEASON_LABELS } from "@/lib/nav";

/** Renders the current season only; the season comes from an hourly-revalidated cache, so the page stays static. */
export async function SeasonalSpotlight() {
  const s = getSeason(await currentSeasonId());
  const items = getProducts(s.spotlight);
  return (
    <section aria-label="In season now" className="on-dark relative bg-cocoa-900 text-cream-50">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 className="display max-w-[14ch] text-[clamp(2.6rem,1.4rem+4.4vw,5.25rem)]">{s.headline}</h2>
        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <figure className="min-w-0 lg:col-span-7">
            <div className="warm relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
              <Image src={s.image.url} alt={s.image.alt} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
            </div>
          </figure>
          <div className="flex min-w-0 flex-col lg:col-span-5">
            <p className="measure text-lg text-cream-100">{s.intro}</p>
            <ul className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:mx-0 lg:px-0">
              {items.map((p) => (
                <li key={p.handle} className="w-[44vw] max-w-[220px] shrink-0 snap-start sm:w-auto sm:max-w-none">
                  <Link href={p.url} className="group block overflow-hidden rounded-[16px] bg-cocoa-800 transition-colors hover:bg-cocoa-700">
                    <span className="warm relative block aspect-square overflow-hidden">
                      <Image
                        src={p.image.url}
                        alt={p.image.altText ?? p.title}
                        fill
                        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 45vw, 44vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </span>
                    <span className="block p-3.5">
                      <span className="block font-display text-lg leading-tight font-semibold [font-variation-settings:'SOFT'_100]">
                        {p.name}
                      </span>
                      <span className="price text-sm text-caramel-200">{priceLabel(p)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/shop/seasonal" className="btn btn-cream mt-8 self-start text-lg">
              Shop {SEASON_LABELS[s.id]} <ArrowRight size={20} weight="bold" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
