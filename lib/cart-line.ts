import type { Product, Variant } from "./catalog";
import type { LineSnapshot } from "@/components/cart/cart-context";

/** Server-side: capture what the cart needs, so client islands receive a tiny serializable object. */
export function lineFor(p: Product, v: Variant = p.variants[0]): LineSnapshot {
  return {
    variantId: v.id,
    handle: p.handle,
    title: p.name,
    variantTitle: v.title === "Default Title" ? null : v.title,
    price: Number(v.price.amount),
    image: { url: p.image.url, width: p.image.width, height: p.image.height, alt: p.image.altText ?? p.title },
    ships: p.ships,
    shopifyUrl: p.shopifyUrl,
  };
}
