# My Favorite Sweet Shoppe: Design

## Concept: The Counter

The site is the candy counter at 237 E Main Street, not a Shopify theme. It should feel like walking up to the glass case:
the apples stand in a row on a shelf, every price is written on a little folded tent card, the caramel is still warm,
and someone behind the counter knows your name. Heritage confectioner (ribbon, parchment, hand-lettered prices) set with
the restraint of a modern food magazine (big confident type, tight photo crops, generous space).

Three ideas carry the whole site:

1. **The pour.** Molten caramel drips from the header into the hero and keeps pouring as you scroll. Later, product
   cards get "dipped" in chocolate on hover. This is the one signature motion, used in two places, nowhere else.
2. **The case.** Caramel apples are cut out from the shop's own studio photos and stand on shelves, like the window
   display customers already love ("the window full of hand-dipped caramel apples"). Prices sit on tent cards.
3. **Color fields, not accents.** Like confectioner packaging, whole sections are cocoa, caramel, candy-apple red or
   parchment. Color owns regions. It is never sprinkled on as small accents over a neutral page.

The design read: a heritage-confectioner e-commerce redesign for local families, gift-givers and corporate buyers,
in a warm, editorial, a-little-playful language. Built on Next.js with Tailwind v4 utilities and GSAP for the single
scroll-driven moment. Dials: variance 7, motion 6, density 4.

## Palette

The brief pins the palette, so this is a deliberate warm-craft world, not a default. It stays saturated: cocoa and red
own whole sections, and parchment is the resting surface between them.

| Token | Hex | Role |
| --- | --- | --- |
| `cocoa-950` | `#1E0F0B` | Deepest shadow, text on caramel |
| `cocoa-900` | `#2A1711` | Primary text, dark fields (header, seasonal, footer) |
| `cocoa-700` | `#4E2C20` | Secondary text on light, milk-chocolate surfaces |
| `cocoa-500` | `#7B4B35` | Tertiary text on light (6.6:1 on cream) |
| `caramel-500` | `#C77F2E` | Molten caramel: the drip, the explorer field, underline flourishes |
| `caramel-400` | `#E0A353` | Caramel highlight / text on cocoa (7.8:1) |
| `caramel-200` | `#F2D29C` | Soft caramel tint, text on red (4.8:1) |
| `apple-600` | `#B3141C` | Candy-apple red: primary CTA, the Club field, sale/seasonal stickers |
| `apple-700` | `#8C0F16` | Pressed / hover red |
| `cream-50` | `#FBF3E4` | Parchment page ground |
| `cream-100` | `#F3E5CB` | Shelf / tent card / raised parchment |
| `cream-200` | `#E8D3AE` | Hairlines, shelf edge |
| `granny-600` | `#5E8A22` | Semantic only: the "Open now" dot |

Contrast is checked: cocoa-900 on cream is 15.5:1, red on cream is 6.3:1, cream on red is 6.3:1, cocoa-900 on caramel is 5.3:1, and
caramel-400 on cocoa is 7.8:1. Shadows are tinted with cocoa, never black. The site is a single designed world in one light
theme. Dark cocoa sections are part of the composition and are not a dark mode.

## Type

- **Display: Fraunces** (variable, `opsz` + `SOFT` axes). The brief names it, and the SOFT axis at 100 rounds
  the serifs into something that looks poured, not cut. Headlines use `SOFT 100` with optical size tracking the size.
  Italic is used for a single emphasized word at most per heading.
- **Text & UI: Figtree.** A friendly, highly legible geometric sans for body copy, prices, buttons and forms.
- Scale (fluid, `clamp`): display 3.25rem to 6rem; h2 2.25rem to 4rem; h3 1.5rem to 2rem; body 1.0625rem; small 0.875rem.
  Body measure is max 65ch. Tracking floor is -0.03em on display. Prices use tabular numerals.
- No eyebrow labels above headings. The heading carries the section.

## Texture & ornament

- **Paper grain:** one fixed, `pointer-events-none` SVG-noise layer at 3.5% opacity. It never sits on a scrolling element.
- **Hand-drawn underline:** an SVG stroke in caramel under one word per page (the hero's "Carnegie"). It draws itself once.
- **Stickers:** round-ish die-cut badges for **Best-seller** and **Seasonal**, slightly rotated, with a cream outline and a
  tinted drop shadow. They appear only on product imagery, as the brief asks.
- **Tent cards:** the price label on every product. It's a parchment card with a fold line, product name in Fraunces and the
  price in tabular Figtree.
- **Shape language:** buttons are full pills (like a lollipop stick end). Cards and photos use 20px radii. Inputs use 14px.
  Stickers are circles. Nothing else.

## Motion principles

1. **One authored moment.** The pour (header to hero, scroll-scrubbed) and the dip (product cards on hover) are the
   same material, so they read as a single idea. Everything else is a quiet entrance or a state change.
2. **Transform and opacity only.** Drips are tall pills that slide down from behind the header (`translateY`), so they never
   scale or distort. The dip is a chocolate wave translated up inside a clipped card.
3. **Exponential ease-out** (`cubic-bezier(.16,1,.3,1)`), with content visible by default. No element depends on JS to appear.
4. **Reduced motion is a first-class layout.** Under `prefers-reduced-motion: reduce` the drips render fully poured and
   static. The hero apple doesn't rotate, the dip becomes a color change, reveals are instant, and the explorer filters
   without transitions.
5. **Lazy by default.** GSAP loads only on the homepage hero, after hydration, and only if motion is allowed.

## Information architecture

Six top-level items, one line, max 72px tall:

1. **Shop**: Caramel Apples, Hand-Dipped Chocolates, Strawberries, Care Packages & Gift Baskets, Seasonal
   (labeled for the current season by date: Halloween Sep-Oct, Christmas Nov-Dec, Valentine's Jan-Feb,
   Easter & Mother's Day Mar-Apr, Graduation May-Jun, Summer Favorites Jul-Aug)
2. **The Caramel Apple Club**: dedicated landing page
3. **Gifting**: Corporate Gifting, Care Packages, Chocolate-Dipped Wine Bottles, Custom Photo Treats
4. **Experiences**: Private Parties, Kids' Workshops
5. **Fundraising**
6. **Visit**

Secondary (footer + mobile menu + contextual links): Journal, Allergy Info, About, Contact.
Allergy Info is also linked from every product page, the cart and the Shop menu.

URL map: `/shop`, `/shop/caramel-apples`, `/shop/hand-dipped-chocolates`, `/shop/chocolate-covered-strawberries`,
`/shop/care-packages`, `/shop/seasonal`, `/products/[handle]`, `/caramel-apple-club`, `/gifting/*`, `/experiences/*`,
`/fundraising`, `/visit`, `/journal/[slug]`, `/allergy-info`, `/about`, `/contact`. Every legacy Shopify URL
(`/collections/*`, `/products/<old-handle>`, `/pages/*`, `/blogs/my-favorites/*`) 301-redirects to its new home.

## Homepage flow

| # | Section | Field | Layout family |
| --- | --- | --- | --- |
| 1 | Hero: "Handmade in Carnegie." + cut-out apple, the pour | parchment | asymmetric split |
| 2 | Seasonal spotlight (picked by date) | cocoa | full-bleed photo + product rail |
| 3 | Pick your apple: flavor explorer | caramel | interactive shelf case |
| 4 | Hand-dipped favorites (6) | parchment | bento (1 + 2 + 3) |
| 5 | The Caramel Apple Club | candy-apple red | stacked statement + cadence picker |
| 6 | Gifting + Experiences | cocoa / parchment | two-panel split |
| 7 | Fundraising for schools & teams | parchment | ticket band |
| 8 | Visit the shop: live open status, hours, map | parchment | info + map |
| 9 | Instagram grid placeholder | cocoa | 6-up grid |
| 10 | Footer (no currency selector) | cocoa | columns |

## Commerce

- Product data lives in `data/products.json`, shaped like the Storefront API `products` connection. Custom attributes
  (flavor family, allergens, pickup and ship availability, badges, seasons) are `metafields` in the `mfss` namespace, so a live
  headless query is a drop-in swap.
- The cart drawer is a dialog with a focus trap. It has quantity steppers, a pickup vs. ship toggle (strawberries and photo treats
  force pickup), a gift message and a subtotal. **Checkout builds a Shopify cart permalink** (`/cart/{variant}:{qty},...`)
  on the existing store, passing the gift message as the order note and the fulfillment choice as a cart attribute, so
  checkout works today. Each line item also links to its existing product URL.

## Mobile

Mobile-first. A sticky bottom bar (Cart, Visit, Call) on phones. The hero apple and the pour scale down but stay. The
explorer becomes a horizontal snap-scroll shelf. Every multi-column layout collapses explicitly to one column under 768px.
