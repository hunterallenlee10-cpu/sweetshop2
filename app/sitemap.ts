import type { MetadataRoute } from "next";
import { products, collections } from "@/lib/catalog";
import { posts, SITE_URL } from "@/lib/site";

const STATIC = [
  ["/", 1],
  ["/shop", 0.9],
  ["/shop/seasonal", 0.8],
  ["/caramel-apple-club", 0.9],
  ["/gifting", 0.7],
  ["/gifting/corporate", 0.8],
  ["/gifting/wine-bottles", 0.6],
  ["/gifting/custom-photo-treats", 0.6],
  ["/experiences", 0.6],
  ["/experiences/private-parties", 0.7],
  ["/experiences/kids-workshops", 0.6],
  ["/fundraising", 0.7],
  ["/visit", 0.8],
  ["/journal", 0.5],
  ["/allergy-info", 0.5],
  ["/about", 0.5],
  ["/contact", 0.5],
] as const;

/** Dates are fixed strings, not `new Date()`, so the sitemap prerenders. Update CONTENT_UPDATED when content changes. */
const CONTENT_UPDATED = "2026-10-14";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC.map(([path, priority]) => ({ url: `${SITE_URL}${path}`, lastModified: CONTENT_UPDATED, priority })),
    ...collections.map((c) => ({ url: `${SITE_URL}/shop/${c.handle}`, lastModified: CONTENT_UPDATED, priority: 0.9 })),
    ...products.map((p) => ({
      url: `${SITE_URL}${p.url}`,
      lastModified: CONTENT_UPDATED,
      priority: p.seasons.length ? 0.5 : 0.7,
      images: [p.image.url],
    })),
    ...posts.map((p) => ({ url: `${SITE_URL}/journal/${p.slug}`, lastModified: p.publishedAt.slice(0, 10), priority: 0.4 })),
  ];
}
