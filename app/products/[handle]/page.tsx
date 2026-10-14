import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Storefront, Truck, XCircle, CheckCircle, Warning, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { products, getProduct, getCollection, pairsWith, priceLabel, type Product } from "@/lib/catalog";
import { ProductCard, Sticker } from "@/components/product/ProductCard";
import { Gallery, type Slide } from "@/components/product/Gallery";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { Container, Breadcrumbs } from "@/components/ui";
import { JsonLd, productLd } from "@/components/JsonLd";
import { lineFor } from "@/lib/cart-line";

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

const COLLECTION_FOR: Record<Product["category"], { handle: string; name: string }> = {
  apples: { handle: "caramel-apples", name: "Caramel Apples" },
  chocolates: { handle: "hand-dipped-chocolates", name: "Hand-Dipped Chocolates" },
  strawberries: { handle: "chocolate-covered-strawberries", name: "Strawberries" },
  "care-packages": { handle: "care-packages", name: "Care Packages" },
  club: { handle: "caramel-apples", name: "Caramel Apples" },
};

function seoTitle(p: Product) {
  if (p.category === "apples") return `${p.title} | Caramel Apples Pittsburgh`;
  if (p.category === "strawberries") return `${p.title} | Pittsburgh`;
  return p.title;
}

export async function generateMetadata({ params }: PageProps<"/products/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const p = getProduct(handle);
  if (!p) return {};
  const description = `${p.short} ${priceLabel(p)}. Handmade at My Favorite Sweet Shoppe in Carnegie, PA, for ${
    p.ships ? "local pickup or shipping" : "local pickup"
  }.`;
  return {
    title: seoTitle(p),
    description,
    alternates: { canonical: p.url },
    openGraph: { type: "website", title: p.title, description, images: [{ url: p.image.url, alt: p.image.altText ?? p.title }] },
  };
}

const ALLERGEN_LABEL: Record<string, string> = { peanuts: "Peanuts", "tree nuts": "Tree nuts", wheat: "Wheat" };

export default function ProductPage({ params }: PageProps<"/products/[handle]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductView params={params} />
    </Suspense>
  );
}

function ProductSkeleton() {
  return (
    <Container className="grid animate-pulse gap-10 py-16 motion-reduce:animate-none lg:grid-cols-12 lg:gap-14" aria-hidden>
      <div className="aspect-square rounded-[var(--radius-card)] bg-cream-100 lg:col-span-6" />
      <div className="space-y-5 lg:col-span-6">
        <div className="h-16 w-3/4 rounded-2xl bg-cream-100" />
        <div className="h-6 w-full rounded-xl bg-cream-100" />
        <div className="h-10 w-40 rounded-xl bg-cream-100" />
        <div className="h-12 w-64 rounded-full bg-cream-200" />
      </div>
    </Container>
  );
}

async function ProductView({ params }: Pick<PageProps<"/products/[handle]">, "params">) {
  const { handle } = await params;
  const p = getProduct(handle);
  if (!p) notFound();

  const col = COLLECTION_FOR[p.category];
  const slides: Slide[] = [
    ...(p.cutout ? [{ url: p.cutout.src, alt: p.image.altText ?? p.title, width: p.cutout.width, height: p.cutout.height, cutout: true }] : []),
    ...p.images.map((i) => ({ url: i.url, alt: i.altText ?? p.title, width: i.width, height: i.height })),
  ];
  const line = lineFor(p);
  const isClub = p.category === "club";
  const collection = getCollection(col.handle);

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs
          items={[
            { name: "Shop", path: "/shop" },
            { name: col.name, path: `/shop/${collection?.handle ?? col.handle}` },
            { name: p.name, path: p.url },
          ]}
        />
      </Container>

      <Container className="grid gap-10 py-8 lg:grid-cols-12 lg:gap-14 lg:py-12">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-24">
            <Gallery slides={slides} badge={p.badge ? <Sticker badge={p.badge} className="size-20!" /> : undefined} />
          </div>
        </div>

        <div className="lg:col-span-6">
          <h1 className="display text-[clamp(2.5rem,1.6rem+3.4vw,4.5rem)]">{p.title}</h1>
          <p className="measure mt-4 text-xl text-cocoa-700">{p.short}</p>

          <div className="mt-8">
            {p.requiresQuote ? (
              <div className="space-y-4">
                <p className="display text-3xl">Priced per order</p>
                <Link href="/gifting/custom-photo-treats#order" className="btn btn-primary text-lg">
                  Start a photo order <ArrowRight size={20} weight="bold" aria-hidden />
                </Link>
              </div>
            ) : isClub ? (
              <div className="space-y-4">
                <p className="price display text-4xl">{priceLabel(p)} a box</p>
                <Link href="/caramel-apple-club" className="btn btn-primary text-lg">
                  Choose your delivery schedule <ArrowRight size={20} weight="bold" aria-hidden />
                </Link>
              </div>
            ) : (
              <PurchasePanel
                base={{
                  handle: line.handle,
                  title: line.title,
                  image: line.image,
                  ships: line.ships,
                  shopifyUrl: line.shopifyUrl,
                }}
                options={p.options}
                variants={p.variants.map((v) => ({
                  id: v.id,
                  title: v.title,
                  price: Number(v.price.amount),
                  available: v.availableForSale,
                  options: Object.fromEntries(v.selectedOptions.map((o) => [o.name, o.value])),
                }))}
              />
            )}
          </div>

          {/* Fulfillment */}
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            <li className="flex items-start gap-3 rounded-[16px] bg-cream-100 p-4">
              <Storefront size={26} className="shrink-0 text-cocoa-900" aria-hidden />
              <span>
                <span className="flex items-center gap-1.5 font-bold">
                  <CheckCircle size={18} weight="fill" className="text-granny-600" aria-hidden /> Local pickup
                </span>
                <span className="text-sm text-cocoa-700">237 E Main St, Carnegie. Tue to Sat, noon to 6pm.</span>
              </span>
            </li>
            <li className="flex items-start gap-3 rounded-[16px] bg-cream-100 p-4">
              <Truck size={26} className="shrink-0 text-cocoa-900" aria-hidden />
              <span>
                {p.ships ? (
                  <>
                    <span className="flex items-center gap-1.5 font-bold">
                      <CheckCircle size={18} weight="fill" className="text-granny-600" aria-hidden /> Ships
                    </span>
                    <span className="text-sm text-cocoa-700">
                      {p.category === "care-packages" || isClub ? "Shipping is included." : "Shipping calculated at checkout."}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-1.5 font-bold">
                      <XCircle size={18} weight="fill" className="text-apple-600" aria-hidden /> Pickup only
                    </span>
                    <span className="text-sm text-cocoa-700">Made fresh to order. We don&apos;t ship this one.</span>
                  </>
                )}
              </span>
            </li>
          </ul>

          {/* Flavor */}
          <section aria-labelledby="flavor" className="mt-10">
            <h2 id="flavor" className="text-2xl">
              The flavor
            </h2>
            <p className="measure mt-3 text-lg leading-relaxed">{p.description}</p>
            {p.category === "apples" && (
              <p className="measure mt-3 text-cocoa-700">
                Every apple starts as a crisp, tart Granny Smith, hand-dipped in caramel we make in small batches.
              </p>
            )}
          </section>

          {/* Allergens */}
          <section aria-labelledby="allergens" className="mt-8 rounded-[var(--radius-card)] border-2 border-caramel-500 bg-caramel-200/40 p-5">
            <h2 id="allergens" className="flex items-center gap-2 text-xl">
              <Warning size={22} weight="fill" className="text-caramel-600" aria-hidden /> Allergy info
            </h2>
            {p.madeWith.length > 0 && (
              <p className="mt-3">
                <span className="font-semibold">Made with: </span>
                {p.madeWith.map((m) => (
                  <span key={m} className="mr-1.5 mb-1.5 inline-flex rounded-full bg-cocoa-900 px-3 py-1 text-sm font-bold text-cream-50">
                    {ALLERGEN_LABEL[m] ?? m}
                  </span>
                ))}
              </p>
            )}
            <p className="mt-2 text-sm text-cocoa-700">
              {p.allergenNote} We can&apos;t guarantee any product is safe for people with allergies.{" "}
              <Link href="/allergy-info" className="link font-semibold text-cocoa-900">
                Read our allergy info
              </Link>
            </p>
          </section>

          <p className="mt-6 text-sm text-cocoa-700">
            Also on our current store:{" "}
            <a href={p.shopifyUrl} className="link inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
              view this product <ArrowUpRight size={14} weight="bold" aria-hidden />
            </a>
          </p>
        </div>
      </Container>

      <section aria-labelledby="pairs" className="border-t border-cream-200 bg-cream-100/50">
        <Container className="py-16 lg:py-20">
          <h2 id="pairs" className="display text-[clamp(2rem,1.4rem+2.2vw,3.25rem)]">
            Pairs well with
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {pairsWith(p).map((q) => (
              <li key={q.handle}>
                <ProductCard product={q} className="h-full" aspect="aspect-square" sizes="(min-width: 1024px) 22vw, 46vw" />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <JsonLd data={productLd(p)} />
    </>
  );
}
