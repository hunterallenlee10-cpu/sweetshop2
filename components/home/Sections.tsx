import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Gift, Buildings, Wine, Camera, Confetti, Student, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { getProducts, getProduct } from "@/lib/catalog";
import { site, pages } from "@/lib/site";
import { ProductCard } from "@/components/product/ProductCard";

/* ---------------- In the news (real press, from /pages/about-us) ---------------- */
export function PressBand() {
  return (
    <section aria-labelledby="press-title" className="border-b border-cream-200 bg-cream-50">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-5 py-8 sm:px-6 lg:flex-row lg:items-center lg:gap-10 lg:px-8">
        <h2 id="press-title" className="shrink-0 font-display text-xl italic">
          In the news
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3 lg:gap-8">
          {site.press.slice(0, 3).map((p) => (
            <li key={p.url}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="group block leading-snug">
                <span className="block text-sm font-bold">{p.outlet}</span>
                <span className="text-cocoa-700 group-hover:underline">{p.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Hand-dipped favorites: a curated six, as a 1 + 2 + 3 bento ---------------- */
const FAVORITES = [
  "mountain-magic-bites",
  "caramel-cashew-patties",
  "chocolate-buckeyes",
  "caramel-sea-salt-milk-chocolate-twist",
  "milk-chocolate-strawberries",
  "reeses-stuffed-oreo",
];

export function HandDipped() {
  const [hero, ...rest] = getProducts(FAVORITES);
  return (
    <section aria-labelledby="dipped-title" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 id="dipped-title" className="display text-[clamp(2.4rem,1.4rem+3.6vw,4.5rem)]">
            Dipped by our family, <em className="font-display italic">for yours.</em>
          </h2>
          <p className="measure mt-4 text-lg text-cocoa-700">
            Pretzel twists and rods, stuffed twists, dipped Oreos and boxes by the pound. Singles start at $2.
          </p>
        </div>
        <Link href="/shop/hand-dipped-chocolates" className="btn btn-outline shrink-0 self-start text-cocoa-900 md:self-auto">
          Shop all chocolates <ArrowRight size={18} weight="bold" aria-hidden />
        </Link>
      </div>
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto]">
        <li className="col-span-2 lg:row-span-2">
          <ProductCard
            product={hero}
            showShort
            feature
            className="h-full"
            aspect="aspect-[4/3] lg:aspect-auto lg:min-h-[420px]"
            sizes="(min-width: 1024px) 62vw, 100vw"
          />
        </li>
        {rest.map((p) => (
          <li key={p.handle}>
            <ProductCard product={p} className="h-full" aspect="aspect-square" sizes="(min-width: 1024px) 30vw, 48vw" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- The Caramel Apple Club ---------------- */
export function ClubFeature() {
  const club = pages.club;
  return (
    <section aria-labelledby="club-title" className="on-dark relative overflow-hidden bg-apple-600 text-cream-50">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-28">
        <div className="lg:col-span-7">
          <h2 id="club-title" className="display text-[clamp(2.8rem,1.4rem+5vw,5.75rem)]">
            Three apples. Every month. <span className="text-caramel-200">Your porch.</span>
          </h2>
          <p className="measure mt-6 text-xl text-cream-100">{club.intro}</p>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {club.steps.map((s, i) => (
              <li key={s.title} className="border-t-2 border-cream-50/30 pt-4">
                <span className="display text-4xl text-caramel-200" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="mt-2 text-xl">{s.title}</h3>
                <p className="mt-1 text-cream-100">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href="/caramel-apple-club" className="btn btn-cream text-lg">
              Join the Club <ArrowRight size={20} weight="bold" aria-hidden />
            </Link>
            <p className="price text-lg">
              <span className="display text-3xl">$39.95</span> <span className="text-cream-100">a box, shipping included</span>
            </p>
          </div>
        </div>
        <div className="relative h-[420px] sm:h-[520px] lg:col-span-5 lg:h-[600px]">
          <div className="absolute top-0 right-[4%] w-[62%] rotate-[4deg] overflow-hidden rounded-[var(--radius-card)] shadow-[0_30px_50px_-20px_rgb(30_15_11/0.6)] ring-8 ring-cream-50">
            <Image
              src={club.images[0].url}
              alt={club.images[0].alt}
              width={club.images[0].width}
              height={club.images[0].height}
              sizes="(min-width: 1024px) 26vw, 60vw"
              className="aspect-[3/4] h-auto w-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-[2%] w-[56%] -rotate-[5deg] overflow-hidden rounded-[var(--radius-card)] shadow-[0_30px_50px_-20px_rgb(30_15_11/0.6)] ring-8 ring-cream-50">
            <Image
              src={club.images[1].url}
              alt={club.images[1].alt}
              width={club.images[1].width}
              height={club.images[1].height}
              sizes="(min-width: 1024px) 24vw, 55vw"
              className="aspect-[3/4] h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Gifting + Experiences ---------------- */
export function GiftingExperiences() {
  const gifts = [
    { href: "/gifting/corporate", label: "Corporate gifting", note: "Logo chocolates, branded boxes, client gifts", Icon: Buildings },
    { href: "/shop/care-packages", label: "Care packages", note: "Shipped, all-in-one, from $50", Icon: Gift },
    { href: "/gifting/wine-bottles", label: "Chocolate-dipped wine bottles", note: "Bring a bottle, ready in 5 days", Icon: Wine },
    { href: "/gifting/custom-photo-treats", label: "Custom photo treats", note: "Your photo on a chocolate Oreo", Icon: Camera },
  ];
  const exp = pages.experiences;
  const workshopImage = getProduct("monster-marshmallow-pop")!.image;
  return (
    <section aria-label="Gifting and experiences" className="grid lg:grid-cols-2">
      <div className="on-dark bg-cocoa-900 px-5 py-20 text-cream-50 sm:px-10 lg:py-28 lg:pr-16 lg:pl-[max(2rem,calc((100vw-1400px)/2+2rem))]">
        <h2 className="display text-[clamp(2.4rem,1.4rem+3.2vw,4.25rem)]">Gifting, done for you.</h2>
        <p className="measure mt-4 text-lg text-cream-100">
          From one care package to a hundred client boxes with your logo on them.
        </p>
        <ul className="mt-10 divide-y divide-cream-50/15 border-y border-cream-50/15">
          {gifts.map(({ href, label, note, Icon }) => (
            <li key={href}>
              <Link href={href} className="group flex items-center gap-4 py-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-caramel-500 text-cocoa-950">
                  <Icon size={24} weight="bold" aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-2xl leading-tight font-semibold [font-variation-settings:'SOFT'_100]">{label}</span>
                  <span className="text-cream-100">{note}</span>
                </span>
                <ArrowRight size={22} className="shrink-0 text-caramel-400 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-cream-100 px-5 py-20 sm:px-10 lg:py-28 lg:pr-[max(2rem,calc((100vw-1400px)/2+2rem))] lg:pl-16">
        <h2 className="display text-[clamp(2.4rem,1.4rem+3.2vw,4.25rem)]">Come make something.</h2>
        <p className="measure mt-4 text-lg text-cocoa-700">Private parties and kids&apos; workshops in our party room in Carnegie.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link href="/experiences/private-parties" className="group overflow-hidden rounded-[var(--radius-card)] bg-cream-50 shadow-[var(--shadow-soft)]">
            <span className="warm relative block aspect-[4/5] overflow-hidden">
              <Image
                src={exp.party.image.url}
                alt={exp.party.image.alt}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </span>
            <span className="block p-5">
              <Confetti size={26} className="text-apple-600" aria-hidden />
              <span className="mt-2 block font-display text-2xl leading-tight font-semibold [font-variation-settings:'SOFT'_100]">
                Junior Chocolatier Parties
              </span>
              <span className="text-cocoa-700">Up to 10 guests, ages 6+, from $350</span>
            </span>
          </Link>
          <Link href="/experiences/kids-workshops" className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-caramel-500 text-cocoa-950 shadow-[var(--shadow-soft)]">
            <span className="warm relative block aspect-[4/5] overflow-hidden">
              <Image
                src={workshopImage.url}
                alt="A hand-decorated monster marshmallow pop, the kind of treat kids make at a workshop"
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </span>
            <span className="flex flex-1 flex-col justify-end p-5">
              <Student size={26} aria-hidden />
              <span className="mt-2 block font-display text-2xl leading-tight font-semibold [font-variation-settings:'SOFT'_100]">
                Kids&apos; Workshops
              </span>
              <span>
                Tour the kitchen, make three treats, play candy bingo. $25 a seat, ages 5+.
              </span>
              <span className="mt-4 inline-flex items-center gap-2 font-bold">
                See dates <ArrowRight size={18} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Fundraising: a ticket ---------------- */
export function FundraisingBand() {
  const f = pages.fundraising;
  return (
    <section aria-labelledby="fund-title" className="mx-auto max-w-[1400px] px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="ticket relative grid gap-10 bg-caramel-200 px-6 py-12 text-cocoa-950 sm:px-12 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:px-16 lg:py-16">
        <div>
          <h2 id="fund-title" className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">
            Raise money with caramel apples.
          </h2>
          <p className="measure mt-5 text-lg text-cocoa-700">
            Schools, teams and clubs sell our caramel apples, homemade fudge and $10 gift certificates. We make everything; you
            collect the orders.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/fundraising#start" className="btn btn-cocoa text-lg">
              Start a fundraiser <ArrowRight size={20} weight="bold" aria-hidden />
            </Link>
            <Link href="/fundraising" className="btn btn-outline text-lg">
              How it works
            </Link>
          </div>
        </div>
        <div className="border-t-2 border-dashed border-cocoa-900/30 pt-8 lg:border-t-0 lg:border-l-2 lg:pt-0 lg:pl-12">
          <h3 className="text-xl">Recently sold with</h3>
          <ul className="mt-4 space-y-3">
            {f.partners.map((p) => (
              <li key={p.name}>
                <span className="block font-display text-2xl leading-tight font-semibold [font-variation-settings:'SOFT'_100]">
                  {p.name}
                </span>
                <span className="text-cocoa-700">{p.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Instagram grid (placeholder until a feed is connected) ---------------- */
export function InstagramGrid() {
  const tiles = [
    getProduct("ghost")!,
    getProduct("chocolate-buckeyes")!,
    getProduct("strawberry-bouquet")!,
    getProduct("happy-birthday-care-package")!,
    getProduct("christmas-twist-stack")!,
    getProduct("melted-skull")!,
  ];
  return (
    <section aria-labelledby="ig-title" className="on-dark bg-cocoa-900 text-cream-50">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 id="ig-title" className="display text-[clamp(2.2rem,1.4rem+2.8vw,3.75rem)]">
            Fresh from the counter
          </h2>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg font-bold text-caramel-400 hover:text-caramel-200"
          >
            <InstagramLogo size={24} weight="fill" aria-hidden /> {site.social.instagramHandle}
            <ArrowUpRight size={18} weight="bold" aria-hidden />
          </a>
        </div>
        <ul className="mt-10 grid grid-cols-3 gap-1.5 sm:gap-3 lg:grid-cols-6">
          {tiles.map((p) => (
            <li key={p.handle}>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="warm group relative block aspect-square overflow-hidden rounded-[10px] sm:rounded-[14px]"
                aria-label={`${p.name} on Instagram`}
              >
                <Image
                  src={p.image.url}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 15vw, 32vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-cream-100/80">
          [PLACEHOLDER] Shown with shop photos. Connect the Instagram feed to show the latest posts here.
        </p>
      </div>
    </section>
  );
}

