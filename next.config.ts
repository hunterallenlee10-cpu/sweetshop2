import type { NextConfig } from "next";
import productsJson from "./data/products.json";

type Edge = { node: { handle: string; metafields: { key: string; value: string }[] } };

/** Legacy Shopify product URLs (including the "copy-of-..." and duplicate handles) 301 to the clean ones. */
const productRedirects = (productsJson.data.products.edges as Edge[])
  .map(({ node }) => ({ to: node.handle, from: node.metafields.find((m) => m.key === "shopify_handle")?.value ?? "" }))
  .filter(({ from, to }) => from && from !== to && /^[\w-]+$/.test(from))
  .map(({ from, to }) => ({ source: `/products/${from}`, destination: `/products/${to}`, permanent: true }));

const seasonal = [
  "valentines-day",
  "valentines-day-1",
  "christmas-holiday-chocolate-pittsburgh",
  "easter-2023",
  "halloween-1",
  "spring-holidays",
  "sweeten-your-summer",
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/s/files/**" },
      { protocol: "https", hostname: "myfavoritesweetshoppe.com", pathname: "/cdn/shop/**" },
    ],
  },
  async redirects() {
    return [
      ...productRedirects,
      { source: "/products/i-like-apple-pie-gourmet-caramel-apple", destination: "/products/i-like-apple-pie", permanent: true },
      { source: "/collections/all", destination: "/shop", permanent: true },
      { source: "/collections/gourmet-caramel-apples-pittsburgh", destination: "/shop/caramel-apples", permanent: true },
      { source: "/collections/gourmet-apples", destination: "/shop/caramel-apples", permanent: true },
      { source: "/collections/hand-dipped-chocolates", destination: "/shop/hand-dipped-chocolates", permanent: true },
      { source: "/collections/care-packages-gift-baskets", destination: "/shop/care-packages", permanent: true },
      { source: "/collections/kids-workshops", destination: "/experiences/kids-workshops", permanent: true },
      { source: "/collections/frontpage", destination: "/shop", permanent: true },
      ...seasonal.map((s) => ({ source: `/collections/${s}`, destination: "/shop/seasonal", permanent: true })),
      { source: "/collections/:fundraiser(.*-fundraiser)", destination: "/fundraising", permanent: false },
      { source: "/collections/:handle/products/:product", destination: "/products/:product", permanent: true },
      { source: "/pages/about-us", destination: "/about", permanent: true },
      { source: "/pages/corporate-gifting", destination: "/gifting/corporate", permanent: true },
      { source: "/pages/fundraising", destination: "/fundraising", permanent: true },
      { source: "/pages/chocolate-birthday-parties", destination: "/experiences/private-parties", permanent: true },
      { source: "/pages/chocolate-dipped-bottles-of-wine", destination: "/gifting/wine-bottles", permanent: true },
      { source: "/pages/send-sweetness-share-support", destination: "/gifting#giving-back", permanent: true },
      { source: "/pages/allergy-information", destination: "/allergy-info", permanent: true },
      { source: "/pages/contact-us", destination: "/contact", permanent: true },
      { source: "/pages/contact", destination: "/contact", permanent: true },
      { source: "/blogs/my-favorites", destination: "/journal", permanent: true },
      { source: "/blogs/my-favorites/:slug", destination: "/journal/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
