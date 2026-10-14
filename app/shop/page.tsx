import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { collections, collectionProducts, seasons } from "@/lib/catalog";
import { SEASON_LABELS } from "@/lib/nav";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Shop Caramel Apples, Chocolates & Gifts",
  description:
    "Shop gourmet caramel apples, hand-dipped chocolates, chocolate covered strawberries and care packages from My Favorite Sweet Shoppe in Carnegie, PA. Local pickup or shipping.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        title="The shop"
        intro="Everything we make by hand, ready for pickup on Main Street or shipped to your door."
        crumbs={[{ name: "Shop", path: "/shop" }]}
      />
      <Container className="py-14 lg:py-20">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {collections.map((c, i) => (
            <li key={c.handle} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <Link
                href={`/shop/${c.handle}`}
                className="group block h-full overflow-hidden rounded-[var(--radius-card)] bg-cream-100 shadow-[var(--shadow-soft)]"
              >
                <span className={`warm relative block overflow-hidden ${i < 2 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <Image
                    src={c.image.url}
                    alt={c.image.alt}
                    fill
                    sizes={i < 2 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    preload={i === 0}
                  />
                </span>
                <span className="flex items-end justify-between gap-4 p-6">
                  <span>
                    <span className="display block text-[clamp(1.8rem,1.3rem+1.4vw,2.6rem)]">{c.navTitle}</span>
                    <span className="text-cocoa-700">{collectionProducts(c).length} treats</span>
                  </span>
                  <ArrowRight size={26} weight="bold" className="mb-1 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
          <li className="lg:col-span-2">
            <Link
              href="/shop/seasonal"
              className="group on-dark flex h-full min-h-[280px] flex-col justify-end rounded-[var(--radius-card)] bg-cocoa-900 p-6 text-cream-50 shadow-[var(--shadow-soft)]"
            >
              <span className="text-caramel-400">In season now</span>
              <span className="display mt-2 block text-[clamp(1.8rem,1.3rem+1.4vw,2.6rem)]">
                {seasons.map((s) => (
                  <span key={s.id} data-season-only={s.id}>
                    {SEASON_LABELS[s.id]}
                  </span>
                ))}
              </span>
              <span className="mt-4 inline-flex items-center gap-2 font-bold">
                Shop seasonal <ArrowRight size={18} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        </ul>
      </Container>
    </>
  );
}
