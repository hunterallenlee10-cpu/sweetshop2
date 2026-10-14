import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { collections, getCollection, collectionProducts, type Product } from "@/lib/catalog";
import { ProductCard } from "@/components/product/ProductCard";
import { Container, PageHero } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return collections.map((c) => ({ collection: c.handle }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[collection]">): Promise<Metadata> {
  const { collection } = await params;
  const c = getCollection(collection);
  if (!c) return {};
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: `/shop/${c.handle}` },
    openGraph: { title: c.seoTitle, description: c.seoDescription, images: [{ url: c.image.url, alt: c.image.alt }] },
  };
}

const KIND_ORDER: [string, string][] = [
  ["bags & boxes", "Boxes & bags by the pound"],
  ["stuffed twists", "Stuffed pretzel twists"],
  ["pretzels", "Pretzel twists & rods"],
  ["dipped cookies", "Dipped Oreos"],
];

function Grid({ items, eager = 0 }: { items: Product[]; eager?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
      {items.map((p, i) => (
        <li key={p.handle}>
          <ProductCard product={p} className="h-full" aspect="aspect-square" headingLevel={i < eager ? "h2" : "h3"} />
        </li>
      ))}
    </ul>
  );
}

export default function CollectionPage({ params }: PageProps<"/shop/[collection]">) {
  return (
    <Suspense
      fallback={
        <Container className="py-16" aria-hidden>
          <div className="h-20 w-2/3 animate-pulse rounded-2xl bg-cream-100 motion-reduce:animate-none" />
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-[var(--radius-card)] bg-cream-100 motion-reduce:animate-none" />
            ))}
          </div>
        </Container>
      }
    >
      <CollectionView params={params} />
    </Suspense>
  );
}

async function CollectionView({ params }: Pick<PageProps<"/shop/[collection]">, "params">) {
  const { collection } = await params;
  const c = getCollection(collection);
  if (!c) notFound();
  const items = collectionProducts(c);
  const isApples = c.handle === "caramel-apples";
  const isChocolates = c.handle === "hand-dipped-chocolates";

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.title,
    itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}${p.url}`, name: p.title })),
  };

  return (
    <>
      <PageHero
        title={c.title}
        intro={
          <>
            <p>{c.intro}</p>
            <p className="mt-3 text-base">{c.body}</p>
          </>
        }
        crumbs={[
          { name: "Shop", path: "/shop" },
          { name: c.navTitle, path: `/shop/${c.handle}` },
        ]}
        image={{ url: c.image.url, alt: c.image.alt, width: c.image.width, height: c.image.height }}
        tone={isApples ? "caramel" : "cream"}
      />

      <Container className="py-14 lg:py-20">
        <p className="mb-6 text-cocoa-700">
          <span className="price font-semibold text-cocoa-900">{items.length}</span> treats. Many contain peanuts or tree nuts.{" "}
          <Link href="/allergy-info" className="link">
            Allergy info
          </Link>
        </p>
        {isChocolates ? (
          <div className="space-y-16">
            {KIND_ORDER.map(([kind, label]) => {
              const group = items.filter((p) => p.kind === kind);
              if (!group.length) return null;
              return (
                <section key={kind} aria-labelledby={`k-${kind}`}>
                  <h2 id={`k-${kind}`} className="mb-6 text-[clamp(1.8rem,1.3rem+1.6vw,2.6rem)]">
                    {label}
                  </h2>
                  <Grid items={group} />
                </section>
              );
            })}
          </div>
        ) : (
          <Grid items={items} />
        )}
      </Container>

      {isApples && (
        <Container className="pb-20">
          <Link
            href="/caramel-apple-club"
            className="group on-dark grid items-center gap-6 overflow-hidden rounded-[var(--radius-card)] bg-apple-600 p-8 text-cream-50 sm:grid-cols-[1fr_auto] sm:p-12"
          >
            <span>
              <span className="display block text-[clamp(2rem,1.4rem+2.4vw,3.4rem)]">Can&apos;t pick just one?</span>
              <span className="mt-2 block text-lg text-cream-100">
                Join the Caramel Apple Club: three apples, chosen for the season, $39.95 a box with shipping included.
              </span>
            </span>
            <span className="btn btn-cream text-lg">
              Join the Club <ArrowRight size={20} weight="bold" aria-hidden />
            </span>
          </Link>
          <p className="mt-6 text-cocoa-700">
            Looking for Halloween apples?{" "}
            <Link href="/shop/seasonal" className="link font-semibold">
              See what&apos;s in season
            </Link>
            .
          </p>
        </Container>
      )}
      <JsonLd data={itemListLd} />
    </>
  );
}

