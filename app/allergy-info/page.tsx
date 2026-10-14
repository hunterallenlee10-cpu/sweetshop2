import type { Metadata } from "next";
import Link from "next/link";
import { Warning } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { products } from "@/lib/catalog";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Allergy Information",
  description:
    "Allergy information for My Favorite Sweet Shoppe. Our products may contain or come into contact with wheat, eggs, peanuts and tree nuts.",
  alternates: { canonical: "/allergy-info" },
};

const GROUPS: { key: string; label: string }[] = [
  { key: "peanuts", label: "Made with peanuts" },
  { key: "tree nuts", label: "Made with tree nuts" },
  { key: "wheat", label: "Made with wheat (pretzels & cookies)" },
];

export default function AllergyPage() {
  const core = products.filter((p) => p.seasons.length === 0);
  return (
    <>
      <PageHero
        title="Allergy information"
        crumbs={[{ name: "Allergy Info", path: "/allergy-info" }]}
        intro="Many of our treats are made with peanuts or tree nuts, and everything is made in one kitchen."
      />
      <Container className="py-14 lg:py-20">
        <div className="flex gap-4 rounded-[var(--radius-card)] border-2 border-apple-600 bg-cream-100 p-6 sm:p-8">
          <Warning size={36} weight="fill" className="shrink-0 text-apple-600" aria-hidden />
          <div>
            <h2 className="text-2xl">Please read before ordering</h2>
            <p className="measure mt-3 text-lg">{site.allergyStatement}</p>
            <p className="mt-4">
              Questions about a specific treat? Call us at{" "}
              <a href={`tel:${site.phone.tel}`} className="link font-semibold">
                {site.phone.display}
              </a>{" "}
              and ask for a manager.
            </p>
          </div>
        </div>

        <h2 className="display mt-16 text-[clamp(2rem,1.4rem+2.2vw,3.25rem)]">By ingredient</h2>
        <p className="measure mt-3 text-cocoa-700">
          Based on the ingredients named in each product&apos;s description. It is a guide, not a guarantee: cross-contact is possible with every
          item.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {GROUPS.map((g) => (
            <section key={g.key} className="rounded-[var(--radius-card)] bg-cream-100 p-6">
              <h3 className="text-xl">{g.label}</h3>
              <ul className="mt-3 space-y-1.5">
                {core
                  .filter((p) => p.madeWith.includes(g.key))
                  .map((p) => (
                    <li key={p.handle}>
                      <Link href={p.url} className="hover:underline">
                        {p.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
