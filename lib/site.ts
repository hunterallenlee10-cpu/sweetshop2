import siteJson from "@/data/site.json";
import pagesJson from "@/data/pages.json";
import journalJson from "@/data/journal.json";

export const site = siteJson;
export const pages = pagesJson;

export type Post = (typeof journalJson)["posts"][number];
export const posts: Post[] = journalJson.posts;
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL when the site moves to its real domain; on Vercel it falls back to the
 * project's production URL so canonicals, Open Graph images and the sitemap stay self-consistent on the preview.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/** Set NEXT_PUBLIC_NOINDEX=1 to keep a long-lived preview out of search results. */
export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `My Favorite Sweet Shoppe, ${fullAddress}`,
)}`;
export const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${site.geo.lng - 0.006}%2C${
  site.geo.lat - 0.0035
}%2C${site.geo.lng + 0.006}%2C${site.geo.lat + 0.0035}&layer=mapnik&marker=${site.geo.lat}%2C${site.geo.lng}`;

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" }).format(
    new Date(iso),
  );
}
