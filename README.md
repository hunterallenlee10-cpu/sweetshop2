# My Favorite Sweet Shoppe: redesign spec

A redesign of [myfavoritesweetshoppe.com](https://myfavoritesweetshoppe.com) for the handmade chocolate and gourmet caramel
apple shop at 237 E Main Street, Carnegie, PA. Built with Next.js 16 (App Router), TypeScript, Tailwind v4 and GSAP.

- **Design:** see [DESIGN.md](DESIGN.md) for the concept, palette, type, motion principles and information architecture.
- **Handoff:** see [HANDOFF.md](HANDOFF.md) for deploy steps, every placeholder the owner needs to fill, and the pitch summary.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

It deploys to Vercel with zero config. Optional environment variables:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and Open Graph (defaults to the Vercel production URL). Set to `https://myfavoritesweetshoppe.com` at launch. |
| `NEXT_PUBLIC_NOINDEX` | Set to `1` to keep a long-lived preview out of search results. |

## How it's put together

| Path | What lives there |
| --- | --- |
| `data/products.json` | 82 products from the live store, shaped like the Shopify Storefront API `products` connection. Custom fields (flavor family, allergens, pickup and ship availability, badges, seasons) are `metafields` in the `mfss` namespace. |
| `data/collections.json` | Shop collections and the six seasonal spotlights (Halloween, Christmas, Valentine's, Easter & Mother's Day, Graduation, Summer). |
| `data/site.json`, `data/pages.json`, `data/journal.json` | Shop facts, page copy, and the blog. These are pulled from the live site; anything unverified is tagged `[PLACEHOLDER]`. |
| `lib/catalog.ts` | The typed catalog layer. Swap the JSON import for a Storefront API query here to go headless. |
| `components/cart/*` | The cart: drawer, quantities, pickup vs. ship, gift message. Checkout builds a Shopify cart permalink on the existing store. |
| `components/home/*` | Homepage sections, including the hero pour (CSS keyframes plus GSAP ScrollTrigger, loaded on first scroll) and the flavor explorer. |
| `scripts/` | The scripts that pulled the catalog and journal from the live store and cut out the apple photos. |

### Seasonal content

`lib/season-now.ts` reads the date inside a `'use cache'` scope with `cacheLife('hours')`. The homepage spotlight and
`/shop/seasonal` are therefore static pages that switch to the new season on their own. Nav labels use a tiny
pre-paint script (`<html data-season>`).

### Checkout

The cart hands off to the live Shopify store with `https://myfavoritesweetshoppe.com/cart/{variant}:{qty},...`. The gift
message goes in as the order note and the pickup/ship choice as a cart attribute. Caramel Apple Club subscriptions deep-link to the
existing subscription product with `?selling_plan=` preselected.
