import productsJson from "@/data/products.json";
import collectionsJson from "@/data/collections.json";
import cutoutsJson from "@/data/cutouts.json";

/* Types mirror the Shopify Storefront API so a live `products` query can replace the JSON import. */
export type Money = { amount: string; currencyCode: string };
export type ShopImage = { id?: string; url: string; altText?: string | null; width: number; height: number };
export type Variant = {
  id: string;
  title: string;
  sku?: string | null;
  availableForSale: boolean;
  price: Money;
  compareAtPrice?: Money | null;
  selectedOptions: { name: string; value: string }[];
};
export type Metafield = { namespace: string; key: string; type: string; value: string };
export type ProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  vendor: string;
  tags: string[];
  availableForSale: boolean;
  onlineStoreUrl: string;
  publishedAt: string;
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  featuredImage: ShopImage | null;
  images: { edges: { node: ShopImage }[] };
  options: { id: string | null; name: string; values: string[] }[];
  variants: { edges: { node: Variant }[] };
  metafields: Metafield[];
  sellingPlanGroups?: unknown;
};

export type Category = "apples" | "chocolates" | "strawberries" | "care-packages" | "club";
export type Flavor = "caramel" | "chocolate" | "candy" | "nutty";
export type SeasonId = "halloween" | "christmas" | "valentines" | "spring" | "graduation" | "summer";

/** Flattened, UI-friendly view of a product. */
export type Product = {
  id: string;
  handle: string;
  title: string;
  name: string;
  description: string;
  short: string;
  category: Category;
  flavors: Flavor[];
  madeWith: string[];
  allergenNote: string;
  ships: boolean;
  badge: "best-seller" | "seasonal" | null;
  seasons: SeasonId[];
  kind: string | null;
  requiresQuote: boolean;
  shopifyHandle: string;
  url: string;
  shopifyUrl: string;
  image: ShopImage;
  images: ShopImage[];
  cutout: { src: string; width: number; height: number } | null;
  minPrice: number;
  maxPrice: number;
  options: { name: string; values: string[] }[];
  variants: Variant[];
};

const cutouts = cutoutsJson as Record<string, { src: string; width: number; height: number }>;

function field(n: ProductNode, key: string): string | undefined {
  return n.metafields.find((m) => m.namespace === "mfss" && m.key === key)?.value;
}
const list = (v?: string) => (v ? (JSON.parse(v) as string[]) : []);

function displayName(n: ProductNode) {
  // Keep the cards short: "Snickers" rather than "Snickers Gourmet Caramel Apple".
  return n.title.replace(/ Gourmet Caramel Apple$/, "");
}

function toProduct(n: ProductNode): Product {
  const images = n.images.edges.map((e) => e.node);
  return {
    id: n.id,
    handle: n.handle,
    title: n.title,
    name: displayName(n),
    description: n.description,
    short: field(n, "short_description") ?? n.description,
    category: field(n, "category") as Category,
    flavors: list(field(n, "flavor_families")) as Flavor[],
    madeWith: list(field(n, "made_with")),
    allergenNote: field(n, "allergen_note") ?? "",
    ships: field(n, "ships") !== "false",
    badge: (field(n, "badge") as Product["badge"]) ?? null,
    seasons: list(field(n, "seasons")) as SeasonId[],
    kind: field(n, "kind") ?? null,
    requiresQuote: field(n, "requires_quote") === "true",
    shopifyHandle: field(n, "shopify_handle") ?? n.handle,
    url: `/products/${n.handle}`,
    shopifyUrl: n.onlineStoreUrl,
    image: n.featuredImage ?? images[0],
    images,
    cutout: cutouts[n.handle] ?? null,
    minPrice: Number(n.priceRange.minVariantPrice.amount),
    maxPrice: Number(n.priceRange.maxVariantPrice.amount),
    options: n.options.filter((o) => !(o.name === "Title" && o.values[0] === "Default Title")),
    variants: n.variants.edges.map((e) => e.node),
  };
}

const nodes = (productsJson as unknown as { data: { products: { edges: { node: ProductNode }[] } } }).data.products.edges.map(
  (e) => e.node,
);
export const products: Product[] = nodes.map(toProduct);
const byHandle = new Map(products.map((p) => [p.handle, p]));
const byShopifyHandle = new Map(products.map((p) => [p.shopifyHandle, p]));

export const getProduct = (handle: string) => byHandle.get(handle);
export const getProductByShopifyHandle = (handle: string) => byShopifyHandle.get(handle);
export const getProducts = (handles: string[]) =>
  handles.map((h) => byHandle.get(h)).filter((p): p is Product => Boolean(p));

/* ---------- Collections & seasons ---------- */
export type Collection = (typeof collectionsJson)["collections"][number];
export type Season = Omit<(typeof collectionsJson)["seasons"][number], "id"> & { id: SeasonId };

export const collections = collectionsJson.collections as Collection[];
export const seasons = collectionsJson.seasons as Season[];
export const getCollection = (handle: string) => collections.find((c) => c.handle === handle);
export const getSeason = (id: SeasonId) => seasons.find((s) => s.id === id)!;

export function collectionProducts(c: Collection): Product[] {
  return products.filter(
    (p) => c.categories.includes(p.category) && (!c.excludeSeasonal || p.seasons.length === 0),
  );
}

/** Month is 1-12. Pure, so it can run in the pre-paint script and in tests. */
export function seasonForMonth(month: number): SeasonId {
  return (seasons.find((s) => s.months.includes(month))?.id ?? "summer") as SeasonId;
}

/** Core (non-seasonal) apples, in menu order, for the flavor explorer. */
export const coreApples = products.filter((p) => p.category === "apples" && p.seasons.length === 0);

/* ---------- Cross-sells ---------- */
const CROSS: Record<Category, string[]> = {
  apples: ["mountain-magic-bites", "milk-chocolate-strawberries", "caramel-cashew-patties"],
  chocolates: ["i-like-apple-pie", "chocolate-buckeyes", "milk-chocolate-strawberries"],
  strawberries: ["assorted-chocolate-box", "triple-chocolate", "caramel-sea-salt-milk-chocolate-twist"],
  "care-packages": ["caramel-apple-club", "mountain-magic-bites", "assorted-chocolate-box"],
  club: ["i-like-apple-pie", "happy-birthday-care-package", "mountain-magic-bites"],
};

/** "Pairs well with": one close cousin (shared flavor or kind), then complementary picks from other shelves. */
export function pairsWith(p: Product, n = 4): Product[] {
  const sameShelf = products.filter(
    (q) =>
      q.handle !== p.handle &&
      q.category === p.category &&
      q.seasons.length === 0 &&
      !q.requiresQuote &&
      (p.flavors.some((f) => q.flavors.includes(f)) || (p.kind && q.kind === p.kind)),
  );
  // Deterministic but varied: pick the cousin by the handle's length.
  const cousin = sameShelf.length ? [sameShelf[p.handle.length % sameShelf.length]] : [];
  const picks = [...cousin, ...getProducts(CROSS[p.category] ?? [])].filter((q) => q.handle !== p.handle);
  return [...new Map(picks.map((q) => [q.handle, q])).values()].slice(0, n);
}

/* ---------- Formatting ---------- */
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
export const formatPrice = (n: number) => usd.format(n);
export function priceLabel(p: Product) {
  if (p.requiresQuote) return "Priced per order";
  return p.minPrice === p.maxPrice ? formatPrice(p.minPrice) : `From ${formatPrice(p.minPrice)}`;
}
