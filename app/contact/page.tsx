import type { Metadata } from "next";
import { EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react/dist/ssr";
import { site, fullAddress, directionsUrl } from "@/lib/site";
import { Container, PageHero } from "@/components/ui";
import { InquiryForm } from "@/components/InquiryForm";
import { OpenStatus } from "@/components/OpenStatus";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Call 412-564-5416, email myfavoritesweetshoppe@gmail.com, or visit 237 E Main Street, Carnegie, PA 15106.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Say hello." intro="Questions, custom orders or just a sweet tooth? Call during open hours or send us a note." crumbs={[{ name: "Contact", path: "/contact" }]}>
        <OpenStatus hours={site.hours} fallback={site.hoursSummary} />
      </PageHero>
      <Container className="grid gap-14 py-16 lg:grid-cols-12 lg:py-24">
        <ul className="space-y-6 text-lg lg:col-span-4">
          <li className="flex gap-4">
            <Phone size={28} weight="fill" className="shrink-0 text-apple-600" aria-hidden />
            <a href={`tel:${site.phone.tel}`} className="link font-semibold">
              {site.phone.display}
            </a>
          </li>
          <li className="flex gap-4">
            <EnvelopeSimple size={28} weight="fill" className="shrink-0 text-apple-600" aria-hidden />
            <a href={`mailto:${site.email}`} className="link font-semibold break-all">
              {site.email}
            </a>
          </li>
          <li className="flex gap-4">
            <MapPin size={28} weight="fill" className="shrink-0 text-apple-600" aria-hidden />
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="link font-semibold">
              {fullAddress}
            </a>
          </li>
          <li className="rounded-[var(--radius-card)] bg-cream-100 p-5 text-base">
            {site.hoursSummary}
            <br />
            <span className="text-cocoa-700">{site.hoursNote}</span>
          </li>
        </ul>
        <div className="lg:col-span-8">
          <h2 className="mb-6 text-3xl">Send a message</h2>
          <InquiryForm
            subject="Message from the website"
            submitLabel="Send message"
            fields={[
              { name: "name", label: "Your name", required: true, autoComplete: "name", half: true },
              { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
              { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
              { name: "topic", label: "Topic", type: "select", half: true, options: ["An order", "Custom order", "Corporate gifting", "Parties & workshops", "Fundraising", "Something else"] },
              { name: "message", label: "Message", type: "textarea", required: true },
            ]}
          />
        </div>
      </Container>
    </>
  );
}
