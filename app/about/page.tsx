import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { pages, site } from "@/lib/site";
import { Container, PageHero, Placeholder } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Our Family Chocolate Shop in Carnegie, PA",
  description:
    "My Favorite Sweet Shoppe was founded in 2014 by Nina Midgley with her parents Terri & Ed. Hand-dipped chocolates and gourmet caramel apples on Main Street in Carnegie, PA.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const a = pages.about;
  return (
    <>
      <PageHero tone="cocoa" title={a.headline} crumbs={[{ name: "About", path: "/about" }]} />
      <Container className="grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
        <div className="space-y-6 text-xl leading-relaxed lg:col-span-7">
          {a.body.map((p) => (
            <p key={p} className="measure">
              {p}
            </p>
          ))}
          <p className="measure text-cocoa-700">
            One batch of our caramel takes about three hours and dips 60 to 70 Granny Smith apples. It&apos;s why the window on Main Street is
            full of them.
          </p>
        </div>
        <div className="space-y-5 lg:col-span-5">
          <div className="warm relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)]">
            <Image
              src="https://cdn.shopify.com/s/files/1/0512/7523/5512/files/Apples-Colllection-MFSS.jpg?v=1619751810"
              alt="A row of gourmet caramel apples"
              fill
              preload
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
          <Placeholder title="Family photo">{a.teamPhotoNote}</Placeholder>
        </div>
      </Container>
      <section className="bg-cream-100">
        <Container className="py-20 lg:py-24">
          <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">In the news</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {site.press.map((p) => (
              <li key={p.url}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between gap-6 rounded-[var(--radius-card)] bg-cream-50 p-7 shadow-[var(--shadow-soft)]"
                >
                  <span className="font-display text-2xl leading-snug italic">&ldquo;{p.title}&rdquo;</span>
                  <span className="flex items-center justify-between font-bold">
                    {p.outlet}
                    <ArrowUpRight size={20} weight="bold" aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
