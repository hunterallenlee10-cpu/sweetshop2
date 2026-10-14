import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts, formatDate } from "@/lib/site";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Journal: Stories from the Sweet Shoppe",
  description: "Caramel apple history, the I Like Pie apple, buckeyes, chocolate-dipped wine bottles and more from My Favorite Sweet Shoppe.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const [lead, ...rest] = posts;
  return (
    <>
      <PageHero title="The journal" intro="Notes from the kitchen on Main Street." crumbs={[{ name: "Journal", path: "/journal" }]} />
      <Container className="py-14 lg:py-20">
        <Link href={`/journal/${lead.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:items-center">
          <span className="warm relative block aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] lg:col-span-7">
            {lead.image && (
              <Image src={lead.image} alt="" fill preload sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            )}
          </span>
          <span className="lg:col-span-5">
            <span className="text-cocoa-700">{formatDate(lead.publishedAt)}</span>
            <span className="display mt-2 block text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] group-hover:underline">{lead.title}</span>
            <span className="mt-4 block text-lg text-cocoa-700">{lead.excerpt}</span>
          </span>
        </Link>
        <ul className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link href={`/journal/${p.slug}`} className="group block">
                <span className="warm relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-cream-100">
                  {p.image && (
                    <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                </span>
                <span className="mt-4 block text-sm text-cocoa-700">{formatDate(p.publishedAt)}</span>
                <span className="mt-1 block font-display text-2xl leading-tight font-semibold [font-variation-settings:'SOFT'_100] group-hover:underline">
                  {p.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
