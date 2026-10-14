import type { Metadata } from "next";
import { pages, site } from "@/lib/site";
import { Container, PageHero, Steps } from "@/components/ui";
import { VideoFacade } from "@/components/VideoFacade";
import { Phone } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Chocolate-Dipped Wine Bottles in Pittsburgh",
  description:
    "Bring your favorite bottle of wine and we'll dip it in chocolate. $29.98 per bottle, ready in 5 days, at My Favorite Sweet Shoppe in Carnegie, PA.",
  alternates: { canonical: "/gifting/wine-bottles" },
};

export default function WinePage() {
  const w = pages.gifting.wine;
  return (
    <>
      <PageHero
        tone="cocoa"
        title={w.headline}
        intro={w.intro}
        crumbs={[
          { name: "Gifting", path: "/gifting" },
          { name: "Chocolate-Dipped Wine Bottles", path: "/gifting/wine-bottles" },
        ]}
        image={{ url: w.image.url, alt: w.image.alt, width: w.image.width, height: w.image.height }}
      >
        <a href={`tel:${site.phone.tel}`} className="btn btn-cream text-lg">
          <Phone size={20} weight="bold" aria-hidden /> Call to book a bottle
        </a>
      </PageHero>

      <Container className="py-20 lg:py-28">
        <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">How it works</h2>
        <div className="mt-10">
          <Steps steps={w.steps} />
        </div>
      </Container>

      <section className="bg-cream-100">
        <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:items-center lg:py-24">
          <div className="lg:col-span-5">
            <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">Pricing</h2>
            <dl className="mt-8 divide-y divide-cocoa-900/15 border-y border-cocoa-900/15">
              {w.pricing.map((p) => (
                <div key={p.label} className="flex items-baseline justify-between gap-6 py-5">
                  <dt className="text-lg">{p.label}</dt>
                  <dd className="price display text-3xl">${p.price}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 font-semibold text-apple-700">You must provide the wine. We do not sell wine.</p>
          </div>
          <div className="lg:col-span-7">
            <VideoFacade id={w.videoId} title="Chocolate-dipped wine bottles at My Favorite Sweet Shoppe" poster={w.image} />
          </div>
        </Container>
      </section>
    </>
  );
}
