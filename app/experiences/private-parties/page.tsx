import type { Metadata } from "next";
import { CalendarCheck, Clock } from "@phosphor-icons/react/dist/ssr";
import { pages } from "@/lib/site";
import { Container, PageHero } from "@/components/ui";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Chocolate Birthday Parties: Junior Chocolatier Party",
  description:
    "Junior Chocolatier birthday parties at My Favorite Sweet Shoppe in Carnegie, PA: up to 10 guests, 1.5 hours, aprons, four dipped treats and a certificate. $350.",
  alternates: { canonical: "/experiences/private-parties" },
};

export default function PartiesPage() {
  const p = pages.experiences.party;
  return (
    <>
      <PageHero
        tone="caramel"
        title={p.headline}
        intro={p.intro}
        crumbs={[
          { name: "Experiences", path: "/experiences" },
          { name: "Private Parties", path: "/experiences/private-parties" },
        ]}
        image={{ url: p.image.url, alt: p.image.alt, width: p.image.width, height: p.image.height }}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <a href="#book" className="btn btn-cocoa text-lg">
            Request a date
          </a>
          <p className="price">
            <span className="display text-4xl">${p.price}</span> for up to 10 guests
          </p>
        </div>
      </PageHero>

      <Container className="grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-7">
          <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">The party includes</h2>
          <ul className="mt-8 space-y-4 text-lg">
            {p.includes.map((t) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden className="mt-2.5 size-2.5 shrink-0 rounded-full bg-apple-600" />
                {t}
              </li>
            ))}
          </ul>
          <p className="measure mt-8 text-cocoa-700">{p.notes}</p>
        </div>
        <div className="space-y-5 lg:col-span-5">
          <div className="rounded-[var(--radius-card)] bg-cream-100 p-7">
            <h3 className="flex items-center gap-2 text-2xl">
              <Clock size={24} aria-hidden /> Time slots
            </h3>
            <dl className="mt-4 space-y-3">
              {p.slots.map((s) => (
                <div key={s.days}>
                  <dt className="font-bold">{s.days}</dt>
                  <dd className="text-cocoa-700">{s.times}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-[var(--radius-card)] bg-cream-100 p-7">
            <h3 className="flex items-center gap-2 text-2xl">
              <CalendarCheck size={24} aria-hidden /> Add-ons
            </h3>
            <dl className="mt-4 space-y-3">
              {p.addOns.map((a) => (
                <div key={a.label} className="flex items-baseline justify-between gap-4">
                  <dt>{a.label}</dt>
                  <dd className="price shrink-0 font-bold">{/^\d/.test(a.price) ? `$${a.price}` : a.price}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 border-t border-cocoa-900/15 pt-4 text-sm text-cocoa-700">
              A non-refundable ${p.deposit} deposit secures your date. Carnegie location only.
            </p>
          </div>
        </div>
      </Container>

      <section id="book" className="on-dark bg-cocoa-900 text-cream-50">
        <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">Request a party date</h2>
            <p className="mt-5 text-lg text-cream-100">We&apos;ll confirm availability and send deposit details.</p>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm
              tone="dark"
              subject="Junior Chocolatier party request"
              submitLabel="Request this date"
              fields={[
                { name: "name", label: "Your name", required: true, autoComplete: "name", half: true },
                { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
                { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", half: true },
                { name: "guestOfHonor", label: "Guest of honor's name & age", half: true },
                { name: "date", label: "Preferred date", type: "date", required: true, half: true },
                {
                  name: "slot",
                  label: "Preferred time",
                  type: "select",
                  required: true,
                  half: true,
                  options: ["Friday 6:30pm", "Friday 7pm", "Saturday 6:30pm", "Saturday 7pm", "Sunday 11am", "Sunday 1pm", "Sunday 3pm"],
                },
                { name: "guests", label: "Number of guests", type: "number", required: true, half: true, help: "Up to 10 included; up to 15 at $14.50 each." },
                { name: "details", label: "Anything else?", type: "textarea", help: "Bringing cake or decorations? Let us know here." },
              ]}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
