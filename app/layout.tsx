import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { CartProvider } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { JsonLd, localBusinessLd } from "@/components/JsonLd";
import { seasons } from "@/lib/catalog";
import { site, SITE_URL, NOINDEX } from "@/lib/site";

/*
 * Self-hosted Latin subsets (SIL OFL). Fraunces is pinned to SOFT=100 and weights 500-700, the only values the
 * design uses: 36 KB instead of 121 KB for the full opsz/SOFT/wght variable font.
 */
const fraunces = localFont({
  src: [
    { path: "./fonts/fraunces-soft.woff2", weight: "500 700", style: "normal" },
    { path: "./fonts/fraunces-soft-italic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Iowan Old Style", "Georgia", "serif"],
});
const figtree = localFont({
  src: [{ path: "./fonts/figtree.woff2", weight: "300 900", style: "normal" }],
  variable: "--font-figtree",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Gourmet Caramel Apples & Hand-Dipped Chocolates | Carnegie, PA",
    template: "%s | My Favorite Sweet Shoppe",
  },
  description:
    "Handmade gourmet caramel apples, hand-dipped chocolates and chocolate covered strawberries from My Favorite Sweet Shoppe on Main Street in Carnegie, PA, just outside Pittsburgh. Local pickup or shipping.",
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: NOINDEX ? { index: false, follow: false } : { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#2a1711",
  colorScheme: "light",
};

/** Sets <html data-season> before first paint so date-based content never flashes or shifts. */
const seasonMap = Object.fromEntries(seasons.flatMap((s) => s.months.map((m) => [m, s.id])));
const seasonScript = `(function(){try{var m=+new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric'}).format(new Date());document.documentElement.dataset.season=(${JSON.stringify(
  seasonMap,
)})[m]||'summer'}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: seasonScript }} />
      </head>
      <body className="min-h-dvh">
        <CartProvider>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileBar tel={site.phone.tel} />
          <CartDrawer />
        </CartProvider>
        <div className="grain" aria-hidden />
        <JsonLd data={localBusinessLd()} />
      </body>
    </html>
  );
}
