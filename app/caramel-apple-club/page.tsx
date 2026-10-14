import type { Metadata } from "next";
import Image from "next/image";
import { pages } from "@/lib/site";
import { getProduct, coreApples } from "@/lib/catalog";
import { Container, Breadcrumbs, Steps, Faq, Placeholder } from "@/components/ui";
import { ClubPicker } from "@/components/ClubPicker";
import { JsonLd, productLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "The Caramel Apple Club: Gourmet Caramel Apple Subscription",
  description:
    "Three handmade gourmet caramel apples delivered monthly, every other month or seasonally. $39.95 a box with shipping included, from My Favorite Sweet Shoppe near Pittsburgh.",
  alternates: { canonical: "/caramel-apple-club" },
};

export default function ClubPage() {
  const club = pages.club;
  const three = getProduct(club.productHandle)!;
  const single = getProduct(club.singleHandle)!;
  const boxes = [
    { id: "three", label: "The Shareable: 3 apples", price: Number(club.price), apples: 3, url: three.shopifyUrl },
    { id: "single", label: "Sweet & Simple: 1 apple", price: Number(club.singlePrice), apples: 1, url: single.shopifyUrl },
  ];
  const lineup = ["i-like-apple-pie", "triple-chocolate", "snickers", "pecan-drizzle", "cookies-and-cream", "confetti"]
    .map((h) => coreApples.find((a) => a.handle === h)!)
    .filter(Boolean);

  return (
    <>
      <section className="on-dark bg-apple-600 text-cream-50">
        <Container className="grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:py-20">
          <div className="lg:col-span-6">
            <Breadcrumbs dark items={[{ name: "The Caramel Apple Club", path: "/caramel-apple-club" }]} />
            <h1 className="display mt-6 text-[clamp(3rem,1.6rem+5vw,6rem)]">{club.headline}</h1>
            <p className="measure mt-6 text-xl text-cream-100">{club.intro}</p>
            <ul className="mt-8 flex items-end gap-1" aria-hidden>
              {lineup.slice(0, 3).map((a, i) => (
                <li key={a.handle} className={i === 1 ? "-mb-1" : ""}>
                  <Image
                    src={a.cutout!.src}
                    alt=""
                    width={a.cutout!.width}
                    height={a.cutout!.height}
                    sizes="120px"
                    className={`h-36 w-auto drop-shadow-[0_16px_14px_rgb(30_15_11/0.45)] sm:h-44 ${i === 0 ? "-rotate-6" : i === 2 ? "rotate-6" : ""}`}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div id="join" className="lg:col-span-6">
            <ClubPicker cadences={club.cadences} boxes={boxes} />
          </div>
        </Container>
      </section>

      <Container className="py-20 lg:py-28">
        <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">How it works</h2>
        <div className="mt-10">
          <Steps steps={club.steps} />
        </div>
      </Container>

      <section className="bg-cream-100">
        <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:py-28">
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            {club.images.map((img, i) => (
              <div key={img.url} className={`warm relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] ${i ? "mt-12" : ""}`}>
                <Image src={img.url} alt={img.alt} fill sizes="(min-width: 1024px) 24vw, 46vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="lg:col-span-6">
            <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">What&apos;s in a box</h2>
            <ul className="mt-8 space-y-4 text-lg">
              {club.inTheBox.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 size-2.5 shrink-0 rounded-full bg-apple-600" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-8 font-semibold">Flavors you might find:</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {lineup.map((a) => (
                <li key={a.handle} className="rounded-full bg-cream-50 px-4 py-2 font-semibold">
                  {a.name}
                </li>
              ))}
            </ul>
            <Placeholder title="This season's box" className="mt-8">
              {club.sampleBoxNote}
            </Placeholder>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-4">
          <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">Questions</h2>
          <p className="mt-4 text-lg text-cocoa-700">
            Anything else? Call us at <a className="link" href="tel:+14125645416">412-564-5416</a>.
          </p>
        </div>
        <div className="lg:col-span-8">
          <Faq items={club.faq} />
        </div>
      </Container>

      <section className="on-dark bg-cocoa-900 text-cream-50">
        <Container className="flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
          <p className="display max-w-[20ch] text-[clamp(2rem,1.4rem+2.4vw,3.5rem)]">Your mailbox could be a lot sweeter.</p>
          <a href="#join" className="btn btn-primary text-lg">
            Pick your schedule
          </a>
        </Container>
      </section>
      <JsonLd data={productLd(three)} />
    </>
  );
}
