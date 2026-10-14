import Link from "next/link";
import { site } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { DesktopNav, HeaderCart, MobileMenu } from "./SiteNav";

export function Header() {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-apple-600 px-5 py-3 font-bold text-cream-50 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <header className="on-dark sticky top-0 z-40 bg-cocoa-900 text-cream-50">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <Link href="/" className="shrink-0 rounded-md" aria-label="My Favorite Sweet Shoppe, home">
            <Wordmark />
          </Link>
          <DesktopNav />
          <div className="flex items-center gap-1">
            <HeaderCart />
            <MobileMenu phone={site.phone} />
          </div>
        </div>
      </header>
    </>
  );
}
