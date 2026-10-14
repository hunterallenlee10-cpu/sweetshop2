import type { Metadata, Viewport } from "next";
import { Fraunces, Figtree } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { CartProvider } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { JsonLd, localBusinessLd } from "@/components/JsonLd";
import { seasons } from "@/lib/catalog";
import { site, SITE_URL, NOINDEX } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

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
