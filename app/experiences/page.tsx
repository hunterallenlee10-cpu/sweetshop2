import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { pages } from "@/lib/site";
import { getProduct } from "@/lib/catalog";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Chocolate Birthday Parties & Kids' Workshops near Pittsburgh",
  description:
    "Junior Chocolatier private parties and kids' chocolate workshops in our party room in Carnegie, PA. Kids dip, decorate and take home their own treats.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesPage() {
  const e = pages.experiences;
  const workshopImg = getProduct("monster-marshmallow-pop")!.image;
  const cards = [
    {
      href: "/experiences/private-parties",
      title: "Junior Chocolatier Parties",
      body: "A private party for up to 10 guests, ages 6+. From $350.",
      img: { url: e.party.image.url, alt: e.party.image.alt },
    },
    {
      href: "/experiences/kids-workshops",
      title: "Kids' Workshops",
      body: "Tour the kitchen, make three treats, play candy bingo. $25 a seat, ages 5+.",
      img: { url: workshopImg.url, alt: "A monster marshmallow pop decorated by hand" },
    },
  ];
  return (
    <>
      <PageHero
        tone="caramel"
        title="Come make something."
        intro="Our party room in Carnegie is where kids get aprons, a behind-the-scenes look, and a bag of treats they made themselves."
        crumbs={[{ name: "Experiences", path: "/experiences" }]}
      />
      <Container className="py-16 lg:py-24">
        <ul className="grid gap-5 md:grid-cols-2">
          {cards.map((c, i) => (
            <li key={c.href}>
              <Link href={c.href} className="group block h-full overflow-hidden rounded-[var(--radius-card)] bg-cream-100 shadow-[var(--shadow-soft)]">
                <span className="warm relative block aspect-[4/3] overflow-hidden">
                  <Image src={c.img.url} alt={c.img.alt} fill preload={i === 0} sizes="(min-width: 768px) 46vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
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
    </>
  );
}
