import type { Metadata } from "next";
import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { pages } from "@/lib/site";
import { Container, PageHero, Placeholder } from "@/components/ui";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Corporate Chocolate Gifts in Pittsburgh",
  description:
    "Custom logo chocolate bars, branded chocolate boxes, logo Oreos, gift baskets and event favors. Corporate chocolate gifts from My Favorite Sweet Shoppe in Carnegie, PA, shipped coast to coast.",
  alternates: { canonical: "/gifting/corporate" },
};

export default function CorporatePage() {
  const c = pages.gifting.corporate;
  return (
    <>
      <PageHero
        title="Corporate gifting"
        intro={
          <>
            <p className="display text-[clamp(1.5rem,1.2rem+1vw,2rem)] text-cocoa-900">{c.headline}</p>
            <p className="mt-4">{c.intro}</p>
          </>
        }
        crumbs={[
          { name: "Gifting", path: "/gifting" },
          { name: "Corporate", path: "/gifting/corporate" },
        ]}
        image={{ url: c.image.url, alt: c.image.alt, width: c.image.width, height: c.image.height }}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#inquire" className="btn btn-primary text-lg">
            Plan your gifts
          </a>
          <a href={c.catalogUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-lg text-cocoa-900">
            {c.catalogLabel} <ArrowUpRight size={18} weight="bold" aria-hidden />
          </a>
        </div>
      </PageHero>

      <Container className="py-20 lg:py-28">
        <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">What we make for companies</h2>
        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {c.offerings.map((o) => (
            <li key={o.title} className="border-t-2 border-cocoa-900/15 pt-5">
              <h3 className="text-2xl">{o.title}</h3>
              <p className="mt-2 text-cocoa-700">{o.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10">
          <a href={c.samplesUrl} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1 font-semibold">
            See a sampling of past corporate gifts <ArrowUpRight size={16} weight="bold" aria-hidden />
          </a>
        </p>
        <Placeholder title="Client logos" className="mt-10">
          {c.clientLogosNote}
        </Placeholder>
      </Container>

      <section id="inquire" className="on-dark bg-cocoa-900 text-cream-50">
        <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">Tell us what you&apos;re planning.</h2>
            <p className="mt-5 text-lg text-cream-100">
              Headcount, date and budget are plenty to get started. Nina will follow up with ideas and a quote.
            </p>
            <a href={`mailto:${c.email}`} className="mt-6 inline-flex items-center gap-2 text-lg font-bold text-caramel-400 hover:text-caramel-200">
              <EnvelopeSimple size={22} weight="bold" aria-hidden /> {c.email}
            </a>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm
              tone="dark"
              to={c.email}
              subject="Corporate gifting inquiry"
              submitLabel="Request a quote"
              fields={[
                { name: "name", label: "Your name", required: true, autoComplete: "name", half: true },
                { name: "company", label: "Company", required: true, autoComplete: "organization", half: true },
                { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
                { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
                {
                  name: "type",
                  label: "What are you looking for?",
                  type: "select",
                  required: true,
                  options: ["Logo chocolate bars", "Branded chocolate boxes", "Branded Oreos", "Gift baskets", "Event favors", "Holiday gifts", "Not sure yet"],
                },
                { name: "quantity", label: "Roughly how many gifts?", type: "number", half: true },
                { name: "date", label: "Needed by", type: "date", half: true, help: "Holiday orders: earlier is better." },
                { name: "details", label: "Anything else we should know?", type: "textarea" },
              ]}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
