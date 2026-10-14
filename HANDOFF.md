# Handoff: My Favorite Sweet Shoppe redesign

## 1. Deploying

The code is on branch `claude/brave-wozniak-lu1sy3` of `hunterallenlee10-cpu/sweetshop2`. It builds cleanly and deploys
to Vercel with zero config.

Automated deploy was blocked: the connected Vercel account is not allowed to create projects in the `leu` team
(403 `forbidden`). To publish it yourself (about 2 minutes):

1. Vercel dashboard, then **Add New… → Project → Import** `hunterallenlee10-cpu/sweetshop2`. If the repo isn't listed,
   give the Vercel GitHub app access to it.
2. Framework is detected as Next.js. Leave every setting at its default. No environment variables are required.
3. Deploy the `claude/brave-wozniak-lu1sy3` branch (or merge it to `main` first and deploy that).
4. Optional: once it's live on the real domain, set `NEXT_PUBLIC_SITE_URL=https://myfavoritesweetshoppe.com`. For a preview
   you'll leave up for a long time, set `NEXT_PUBLIC_NOINDEX=1`.

## 2. Placeholders the owner needs to fill

Each one appears on the site as a dashed "[PLACEHOLDER]" card or line, so nothing is fabricated.

**Photos**
- [ ] Storefront exterior at 237 E Main Street, ideally with the apple window (Visit page, homepage Visit section)
- [ ] Nina and the family at the counter (About)
- [ ] A kids' workshop in progress (Kids' Workshops)
- [ ] Instagram feed: the grid currently uses shop product photos. Connect the live feed.

**Facts and pricing**
- [ ] Caramel Apple Club: confirm current pricing per cadence. The live store has subscription discounts configured, but the site shows $39.95 / $19.95 per box.
- [ ] Caramel Apple Club: shipping regions and which days apples ship
- [ ] Caramel Apple Club: example box contents for this season
- [ ] Custom photo Oreos: per-dozen price and lead time
- [ ] Fundraising: what each group earns (percentage or dollars per item)
- [ ] Kids' Workshops: next two dates and themes. The live ticket pages are for September and October 2025.
- [ ] Giving back: this month's nonprofit partner (currently Hope Grows, per the live page)
- [ ] Visit: parking on Main Street and step-free access details

**Brand and integrations**
- [ ] Logo: the header uses a proposed evolution of the current logo (the candy apple still stands in for the "o"), set in the new type. Needs approval, or a vector of the original.
- [ ] Client logos or a client list for Corporate Gifting, with permission
- [ ] Forms (corporate, parties, fundraising, photo treats, contact) validate and then open the visitor's email app addressed to the shop. Connect them to Shopify Forms or an email service before launch.
- [ ] Rewards: the live store runs a "Rewards" loyalty widget. Re-add it (or its headless equivalent) so members keep their points.
- [ ] Testimonials: none are shown, because none were provided. Real press coverage from the About page is used instead.

## 3. Facts used from the live site (please confirm)

Everything comes from myfavoritesweetshoppe.com. Nothing was invented.
- Founded 2014 by Nina Midgley with her parents Terri & Ed Midgley (from /pages/about-us), plus the four press links
- Hours Tue to Sat, noon to 6pm, closed Sunday and Monday, "Seasonal hours vary"; phone 412-564-5416; myfavoritesweetshoppe@gmail.com
- Corporate contact nina@myfavoritesweetshoppe.com; "more than 10 years" of corporate gifting
- Junior Chocolatier party: $350 for up to 10 guests, $100 deposit, add-ons and time slots as listed for 2025/2026
- Wine bottle dipping $29.98 (large 1.5L or wedding $39.95), ready in 5 days, customer brings the wine
- Strawberries are pickup or local delivery only, so the cart forces pickup when they're in it
- Care packages include shipping
- Caramel batch: about 3 hours, 60 to 70 apples (from the I Like Pie journal post)
- Allergen chips on product pages come from the ingredients named in each product's own description, alongside the shop's blanket cross-contact statement

## 4. Decisions made in the cleanup

- **Catalog:** 213 live products became 82. Removed: duplicate "I Like Apple Pie", fundraiser-specific copies, `copy-of-...`
  duplicates, test products, expired one-offs (2023 Easter baskets, past workshop tickets), loose novelty candy,
  No Whey products and gift-card promos. The loose candy is presented as "in the shop" on the Visit page. Those products
  still exist in Shopify and can be re-added to `scripts/build_data.py`.
- **URLs:** clean handles everywhere (for example `milk-chocolate-pretzel-twist`, which was actually an Oreo, is now
  `caramel-filled-oreo`). Every legacy `/collections/*`, `/products/<old-handle>`, `/pages/*` and `/blogs/*` URL returns a
  301 to its new home, so search rankings carry over.
- **Fundraiser storefronts** (GAA, SCHS Ski Club, Revolution All Star Cheer) currently live as Shopify collections. In
  this spec they redirect to /fundraising. A per-group page is a follow-up if the headless store goes live.

## 5. Verification

- `next build`: 0 errors and 0 warnings; 120 pages prerendered. Typecheck and ESLint are clean.
- Every route captured at 375, 768 and 1440px with no horizontal overflow and no console errors. Reduced-motion mode was
  checked: the drips render static and fully poured, the apple doesn't rotate, and GSAP never loads.
- 29 automated interaction checks passed:
  - Cart: add to cart, quantity, subtotal, pickup vs. ship, gift note, and the checkout permalink.
  - Strawberries force pickup; variant pricing updates.
  - Keyboard: menus, Escape, and the skip link.
  - Open-now status, Club deep link, and form validation.
  - Legacy 301 redirects; mobile Cart/Visit/Call bar and menu.
- Lighthouse, mobile, simulated throttling, local production server:

| Page | Perf | A11y | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 93 to 96 | 100 | 100 | 100 |
| Caramel Apple Club | 94 | 100 | 100 | 100 |
| Caramel Apples collection | 93 | 100 | 100 | 100 |
| Product (Snickers) | 97 | 100 | 100 | 100 |
| Visit | 98 | 100 | 100 | 100 |
| Corporate Gifting | 95 | 100 | 100 | 100 |

  CLS is about 0 and TBT is 50 to 70 ms. Simulated mobile LCP is 2.3 to 3.1 s on the local server. Pages whose LCP is a large
  remote photo sit around 3 s. Re-measure on the Vercel deployment, where the CDN and image cache should bring these down.

## 6. Before / after (for the pitch)

| Before | After |
| --- | --- |
| Homepage says "Welcome to the new website… still a work in progress" | Opens on "Handmade in Carnegie." with a real caramel apple and molten caramel pouring from the header |
| 14 top-level nav items over two rows; 2023 "Easter" still in the main nav; "Seasonal Products" links to the homepage | Six items on one line. "Seasonal" shows whatever is in season today (Halloween right now) and switches on its own |
| Two endless product walls (18 apples, 20+ chocolates) | A story: in-season spotlight, a "Pick your apple" flavor explorer, six hand-dipped favorites, the Club, gifting and experiences, fundraising, then the visit info |
| Duplicate products and slugs like `copy-of-…` | 82 clean products with readable URLs; old links 301 to their new homes |
| The Club, fundraising, parties, workshops, wine bottles and corporate gifting are buried in the nav | Each has its own page with a clear next step (subscribe, book, inquire). The Club has a cadence picker that deep-links into the existing subscription |
| 100+ currency footer list | A footer with address, hours, phone and social. A live "Open now / Opens tomorrow at noon" indicator in Carnegie time |
| No allergy guidance on products | Allergen chips and the cross-contact statement on every product page, plus an Allergy Info page linked from the menu and cart |
| Generic theme, no local SEO markup | Bakery/Store and Product schema, per-page titles targeting "caramel apples Pittsburgh", "chocolate shop Carnegie PA" and similar, sitemap, Open Graph image |
| Mobile: a stack of banners | A mobile-first layout with a sticky Cart / Visit / Call bar and tap-to-call |
| Checkout | Unchanged: the same Shopify checkout, gift note and pickup/ship choice carried over, so no migration risk |
