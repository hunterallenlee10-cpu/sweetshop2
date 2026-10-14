import type { Metadata } from "next";
import { pages } from "@/lib/site";
import { getProduct } from "@/lib/catalog";
import { lineFor } from "@/lib/cart-line";
import { Container, PageHero, Steps, Placeholder } from "@/components/ui";
import { InquiryForm } from "@/components/InquiryForm";
import { AddToCart } from "@/components/cart/CartButtons";

export const metadata: Metadata = {
  title: "Custom Photo Oreos for Graduations & Parties",
  description:
    "Chocolate-covered Oreos printed with your photo for graduations, birthdays, showers and company events. Made in Carnegie, PA, for local pickup.",
  alternates: { canonical: "/gifting/custom-photo-treats" },
};

export default function PhotoTreatsPage() {
  const t = pages.gifting.photoTreats;
  const p = getProduct(t.productHandle)!;
  return (
    <>
      <PageHero
        title={t.headline}
        intro={t.intro}
        crumbs={[
          { name: "Gifting", path: "/gifting" },
          { name: "Custom Photo Treats", path: "/gifting/custom-photo-treats" },
        ]}
        image={{ url: t.image.url, alt: t.image.alt, width: t.image.width, height: t.image.height }}
      >
        <div className="flex flex-wrap gap-3">
          <AddToCart line={lineFor(p)} className="btn btn-primary text-lg">
            Start a pickup order
          </AddToCart>
          <a href="#order" className="btn btn-outline text-lg text-cocoa-900">
            Ask a question
          </a>
        </div>
      </PageHero>

      <Container className="py-20 lg:py-28">
        <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">How it works</h2>
        <div className="mt-10">
          <Steps steps={t.steps} />
        </div>
        <Placeholder title="Pricing & lead time" className="mt-12">
          {t.pricingNote}
        </Placeholder>
      </Container>

      <section id="order" className="bg-cream-100">
        <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-5">
            <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">Planning a party?</h2>
            <p className="mt-5 text-lg text-cocoa-700">
              Tell us the occasion, how many, and when. We&apos;ll reply with pricing and how to send your photo.
            </p>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm
              subject="Custom photo treats inquiry"
              submitLabel="Send my request"
              fields={[
                { name: "name", label: "Your name", required: true, autoComplete: "name", half: true },
                { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
                { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
                { name: "occasion", label: "Occasion", type: "select", required: true, half: true, options: ["Graduation", "Birthday", "Shower", "Wedding", "Company event", "Other"] },
                { name: "quantity", label: "How many cookies?", type: "number", half: true },
                { name: "date", label: "Pickup date", type: "date", half: true },
                { name: "details", label: "Details", type: "textarea", help: "Colors, school, names, anything that helps." },
              ]}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
