import type { Product } from "@/lib/catalog";
import { site, SITE_URL, fullAddress, type Post } from "@/lib/site";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const BUSINESS_ID = `${SITE_URL}/#business`;

export function localBusinessLd() {
  const open = site.hours.filter((h) => h.open);
  return {
    "@context": "https://schema.org",
    "@type": ["Bakery", "Store"],
    "@id": BUSINESS_ID,
    name: site.name,
    description:
      "Handmade gourmet caramel apples, hand-dipped chocolates and chocolate covered strawberries on Main Street in Carnegie, PA, just outside Pittsburgh.",
    url: SITE_URL,
    image: [`${SITE_URL}/opengraph-image`, "https://cdn.shopify.com/s/files/1/0512/7523/5512/files/Apples-Colllection-MFSS.jpg?v=1619751810"],
    logo: `${SITE_URL}/icon.png`,
    telephone: site.phone.tel,
    email: site.email,
    priceRange: "$",
    servesCuisine: ["Chocolate", "Candy", "Caramel apples"],
    foundingDate: site.founded,
    founder: { "@type": "Person", name: "Nina Midgley" },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`My Favorite Sweet Shoppe ${fullAddress}`)}`,
    areaServed: [
      { "@type": "City", name: "Carnegie" },
      { "@type": "City", name: "Pittsburgh" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: open.map((h) => h.name),
        opens: open[0].open,
        closes: open[0].close,
      },
    ],
    sameAs: [site.social.facebook, site.social.instagram, site.social.linkedin],
  };
}

export function productLd(p: Product) {
  const prices = p.variants.map((v) => Number(v.price.amount));
  const url = `${SITE_URL}${p.url}`;
  const offers =
    p.requiresQuote
      ? undefined
      : p.variants.length > 1 && Math.min(...prices) !== Math.max(...prices)
        ? {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: Math.min(...prices).toFixed(2),
            highPrice: Math.max(...prices).toFixed(2),
            offerCount: p.variants.length,
            availability: "https://schema.org/InStock",
            url,
          }
        : {
            "@type": "Offer",
            priceCurrency: "USD",
            price: prices[0].toFixed(2),
            availability: p.variants[0].availableForSale ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
            url,
            seller: { "@id": BUSINESS_ID },
          };
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    description: p.description || p.short,
    image: p.images.map((i) => i.url),
    sku: p.variants[0].sku || p.handle,
    brand: { "@type": "Brand", name: site.name },
    url,
    ...(offers ? { offers } : {}),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function articleLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    image: post.image ? [post.image] : undefined,
    author: { "@type": "Organization", name: site.name, url: SITE_URL },
    publisher: { "@id": BUSINESS_ID },
    mainEntityOfPage: `${SITE_URL}/journal/${post.slug}`,
  };
}
