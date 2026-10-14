import Link from "next/link";
import { FacebookLogo, InstagramLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { site, fullAddress, directionsUrl } from "@/lib/site";
import { NAV, SECONDARY } from "@/lib/nav";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const shop = NAV.find((n) => n.label === "Shop")!.children!;
  const gifting = NAV.find((n) => n.label === "Gifting")!.children!;
  const experiences = NAV.find((n) => n.label === "Experiences")!.children!;
  const social = [
    { href: site.social.facebook, label: "Facebook", Icon: FacebookLogo },
    { href: site.social.instagram, label: "Instagram", Icon: InstagramLogo },
    { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedinLogo },
    { href: `mailto:${site.email}`, label: "Email", Icon: EnvelopeSimple },
  ];
  const col = "space-y-1";
  const a = "inline-flex min-h-9 items-center text-cream-100 transition-colors hover:text-caramel-400";
  const h = "mb-3 font-display text-xl font-semibold text-cream-50 [font-variation-settings:'SOFT'_100]";

  return (
    <footer className="on-dark bg-cocoa-950 pb-24 text-cream-100 md:pb-0">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8 lg:py-20">
        <div className="space-y-5">
          <Wordmark size="lg" />
          <address className="not-italic leading-relaxed">
            <a href={directionsUrl} className={`${a} min-h-0`} target="_blank" rel="noopener noreferrer">
              {fullAddress}
            </a>
            <br />
            <a href={`tel:${site.phone.tel}`} className={`${a} min-h-0`}>
              {site.phone.display}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className={`${a} min-h-0 break-all`}>
              {site.email}
            </a>
          </address>
          <p>
            {site.hoursSummary}
            <br />
            <span className="text-caramel-200">{site.hoursNote}</span>
          </p>
          <ul className="flex gap-2">
            {social.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="grid size-11 place-items-center rounded-full bg-cream-50/10 text-cream-50 transition-colors hover:bg-caramel-500 hover:text-cocoa-950"
                  aria-label={label}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon size={22} weight="fill" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Shop">
          <h2 className={h}>Shop</h2>
          <ul className={col}>
            {shop.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={a}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/caramel-apple-club" className={a}>
                The Caramel Apple Club
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Gifting and experiences">
          <h2 className={h}>Gifts & events</h2>
          <ul className={col}>
            {[...gifting.filter((g) => g.href !== "/shop/care-packages"), ...experiences].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={a}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/fundraising" className={a}>
                Fundraising
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="The shoppe">
          <h2 className={h}>The shoppe</h2>
          <ul className={col}>
            <li>
              <Link href="/visit" className={a}>
                Visit & hours
              </Link>
            </li>
            {SECONDARY.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={a}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-cream-50/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 py-6 text-sm text-cream-100/80 sm:px-6 md:flex-row md:justify-between lg:px-8">
          <p>
            © {site.legalName}. Made by hand in Carnegie, PA since {site.founded}.
          </p>
          <p>Redesign preview. Checkout runs on the shop&apos;s current Shopify store.</p>
        </div>
      </div>
    </footer>
  );
}
