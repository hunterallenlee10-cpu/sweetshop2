import type { Metadata } from "next";
import { ArrowUpRight, Ticket } from "@phosphor-icons/react/dist/ssr";
import { pages } from "@/lib/site";
import { getProduct } from "@/lib/catalog";
import { Container, PageHero, Placeholder } from "@/components/ui";

export const metadata: Metadata = {
  title: "Kids' Chocolate Workshops in Carnegie, PA",
  description:
    "Kids' workshops at My Favorite Sweet Shoppe: a behind-the-scenes tour, three treats to make and take home, and candy bingo. $25 a seat, ages 5+.",
  alternates: { canonical: "/experiences/kids-workshops" },
};

export default function WorkshopsPage() {
  const w = pages.experiences.workshops;
  const img = getProduct("monster-marshmallow-pop")!.image;
  return (
    <>
      <PageHero
        title={w.headline}
        intro={w.intro}
        crumbs={[
          { name: "Experiences", path: "/experiences" },
          { name: "Kids' Workshops", path: "/experiences/kids-workshops" },
        ]}
        image={{ url: img.url, alt: "A hand-decorated monster marshmallow pop", width: img.width, height: img.height }}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <a href={w.ticketsUrl} className="btn btn-primary text-lg">
            <Ticket size={20} weight="bold" aria-hidden /> Get tickets
          </a>
          <p className="price">
            <span className="display text-4xl">${w.price}</span> per child
          </p>
        </div>
      </PageHero>

      <Container className="grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-6">
          <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">What they&apos;ll make</h2>
          <ul className="mt-8 grid grid-cols-3 gap-3">
            {w.makes.map((m) => (
              <li key={m} className="grid aspect-square min-w-0 place-items-center rounded-[var(--radius-card)] bg-caramel-500 p-2 text-center font-display text-base leading-tight font-semibold break-words sm:p-3 sm:text-xl text-cocoa-950 [font-variation-settings:'SOFT'_100]">
                {m}
              </li>
            ))}
          </ul>
          <dl className="mt-8 space-y-3 text-lg">
            <div className="flex gap-3">
              <dt className="font-bold">When:</dt>
              <dd>{w.duration}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="font-bold">Ages:</dt>
              <dd>{w.ages}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="font-bold">Parents:</dt>
              <dd>{w.parents}</dd>
            </div>
          </dl>
        </div>
        <div className="lg:col-span-6">
          <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">Upcoming</h2>
          <ul className="mt-8 space-y-3">
            {w.upcoming.map((u) => (
              <li key={u.date}>
                <Placeholder title={u.date}>{u.theme}</Placeholder>
              </li>
            ))}
          </ul>
          <a href={w.ticketsUrl} className="link mt-6 inline-flex items-center gap-1 font-semibold">
            See tickets on our current store <ArrowUpRight size={16} weight="bold" aria-hidden />
          </a>
          <Placeholder title="Workshop photo" className="mt-8">
            {w.imageNote}
          </Placeholder>
        </div>
      </Container>
    </>
  );
}
