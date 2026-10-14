import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { pages, site } from "@/lib/site";
import { Container, PageHero, Steps, Placeholder } from "@/components/ui";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Caramel Apple Fundraisers for Schools & Teams near Pittsburgh",
  description:
    "Run a school, team or club fundraiser with gourmet caramel apples, homemade fudge and $10 gift certificates from My Favorite Sweet Shoppe in Carnegie, PA.",
  alternates: { canonical: "/fundraising" },
};

export default function FundraisingPage() {
  const f = pages.fundraising;
  return (
    <>
      <PageHero
        tone="caramel"
        title={f.headline}
        intro={f.intro}
        crumbs={[{ name: "Fundraising", path: "/fundraising" }]}
        image={{ url: f.image.url, alt: f.image.alt, width: f.image.width, height: f.image.height }}
      >
        <a href="#start" className="btn btn-cocoa text-lg">
          Start a fundraiser
        </a>
      </PageHero>

      <Container className="py-20 lg:py-28">
        <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">How it works</h2>
        <div className="mt-10">
          <Steps steps={f.steps} />
        </div>
      </Container>

      <section className="bg-cream-100">
        <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-6">
            <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">Three things that sell</h2>
            <ul className="mt-8 space-y-6">
              {f.products.map((p) => (
                <li key={p.title}>
                  <h3 className="text-2xl">{p.title}</h3>
                  <p className="mt-1 text-lg text-cocoa-700">{p.body}</p>
                </li>
              ))}
            </ul>
            <Placeholder title="What your group earns" className="mt-8">
              {f.profitNote}
            </Placeholder>
            <a href={f.overviewUrl} target="_blank" rel="noopener noreferrer" className="link mt-6 inline-flex items-center gap-1 font-semibold">
              Read the full fundraising overview <ArrowUpRight size={16} weight="bold" aria-hidden />
            </a>
          </div>
          <div id="active" className="lg:col-span-6">
            <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">Recent partners</h2>
            <ul className="mt-8 grid gap-3">
              {f.partners.map((p) => (
                <li key={p.name} className="ticket bg-caramel-200 px-9 py-6">
                  <span className="display block text-3xl">{p.name}</span>
                  <span className="text-cocoa-700">{p.detail}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-cocoa-700">
              Ordering for one of these groups? Follow the link your group shared, or call {site.phone.display}.
            </p>
          </div>
        </Container>
      </section>

      <section id="start" className="on-dark bg-cocoa-900 text-cream-50">
        <Container className="grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <h2 className="display text-[clamp(2.4rem,1.4rem+3.4vw,4.5rem)]">Start a fundraiser</h2>
            <p className="mt-5 text-lg text-cream-100">Tell us about your group and we&apos;ll walk you through the program and timeline.</p>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm
              tone="dark"
              subject="New fundraiser inquiry"
              submitLabel="Start my fundraiser"
              fields={[
                { name: "name", label: "Your name", required: true, autoComplete: "name", half: true },
                { name: "organization", label: "School, team or club", required: true, half: true },
                { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
                { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
                { name: "sellers", label: "About how many sellers?", type: "number", half: true },
                { name: "start", label: "Hoping to start", type: "date", half: true },
                { name: "products", label: "Interested in", type: "select", options: ["Caramel apples", "Homemade fudge", "Gift certificates", "A mix", "Not sure yet"] },
                { name: "goal", label: "Goal or anything else", type: "textarea" },
              ]}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
