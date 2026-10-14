import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { pages } from "@/lib/site";
import { getCollection } from "@/lib/catalog";
import { Container, PageHero, Placeholder } from "@/components/ui";

export const metadata: Metadata = {
  title: "Chocolate Gifts: Corporate, Care Packages, Wine & Photo Treats",
  description:
    "Custom chocolate gifts from Carnegie, PA: corporate logo chocolates, shipped care packages, chocolate-dipped wine bottles and custom photo Oreos. Serving Pittsburgh and beyond.",
  alternates: { canonical: "/gifting" },
};

export default function GiftingPage() {
  const g = pages.gifting;
  const care = getCollection("care-packages")!;
  const cards = [
    { href: "/gifting/corporate", title: "Corporate gifting", body: "Logo chocolate bars, branded boxes and Oreos, event favors and client gifts.", img: g.corporate.image },
    { href: "/shop/care-packages", title: "Care packages", body: "All-in-one gift boxes, shipping included.", img: care.image },
    { href: "/gifting/wine-bottles", title: "Chocolate-dipped wine bottles", body: "Bring a bottle, pick a design, pick it up in 5 days.", img: g.wine.image },
    { href: "/gifting/custom-photo-treats", title: "Custom photo treats", body: "Your photo on a chocolate-covered Oreo.", img: g.photoTreats.image },
  ];
  return (
    <>
      <PageHero
        tone="cocoa"
        title="Gifts that get remembered."
        intro="For a birthday, a client list of two hundred, or the person who has everything. We'll make it by hand."
        crumbs={[{ name: "Gifting", path: "/gifting" }]}
      />
      <Container className="py-16 lg:py-24">
        <ul className="grid gap-5 sm:grid-cols-2">
          {cards.map((c, i) => (
            <li key={c.href}>
              <Link href={c.href} className="group block h-full overflow-hidden rounded-[var(--radius-card)] bg-cream-100 shadow-[var(--shadow-soft)]">
                <span className="warm relative block aspect-[16/10] overflow-hidden">
                  <Image
                    src={c.img.url}
                    alt={c.img.alt}
                    fill
                    preload={i === 0}
                    sizes="(min-width: 640px) 46vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="flex items-end justify-between gap-4 p-6">
                  <span>
                    <span className="display block text-[clamp(1.8rem,1.3rem+1.4vw,2.6rem)]">{c.title}</span>
                    <span className="text-cocoa-700">{c.body}</span>
                  </span>
                  <ArrowRight size={26} weight="bold" className="mb-1 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
      <section id="giving-back" className="bg-caramel-500 text-cocoa-950">
        <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">{g.givingBack.headline}</h2>
            <p className="measure mt-5 text-xl">{g.givingBack.body}</p>
            <Link href="/shop/care-packages" className="btn btn-cocoa mt-8 text-lg">
              Shop care packages <ArrowRight size={20} weight="bold" aria-hidden />
            </Link>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-[var(--radius-card)] bg-cream-50 p-7">
              <p className="text-cocoa-700">This month&apos;s nonprofit partner</p>
              <a
                href={g.givingBack.partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="display mt-1 inline-flex items-center gap-2 text-4xl hover:underline"
              >
                {g.givingBack.partner.name} <ArrowUpRight size={24} weight="bold" aria-hidden />
              </a>
              <p className="mt-3 text-cocoa-700">{g.givingBack.partner.note}</p>
            </div>
            <Placeholder title="Monthly partner" className="mt-4 bg-cream-50/40">
              {g.givingBack.partnerNote}
            </Placeholder>
          </div>
        </Container>
      </section>
    </>
  );
}
