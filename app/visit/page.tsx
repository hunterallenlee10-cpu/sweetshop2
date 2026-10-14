import type { Metadata } from "next";
import { Container, Breadcrumbs, Placeholder } from "@/components/ui";
import { VisitBlock } from "@/components/VisitBlock";

export const metadata: Metadata = {
  title: "Visit Our Chocolate Shop in Carnegie, PA",
  description:
    "Visit My Favorite Sweet Shoppe at 237 E Main Street, Carnegie, PA 15106, just outside Pittsburgh. Open Tuesday to Saturday, noon to 6pm. Call 412-564-5416.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs items={[{ name: "Visit", path: "/visit" }]} />
      </Container>
      <Container className="py-10 lg:py-14">
        <VisitBlock headingLevel="h1" />
      </Container>
      <section className="bg-cream-100">
        <Container className="grid gap-10 py-16 md:grid-cols-3 lg:py-20">
          <div>
            <h2 className="text-2xl">In the shop</h2>
            <p className="mt-2 text-cocoa-700">
              The full case of caramel apples, hand-dipped chocolates, fresh fudge and nostalgic candy you won&apos;t find online.
            </p>
          </div>
          <div>
            <h2 className="text-2xl">Picking up an order?</h2>
            <p className="mt-2 text-cocoa-700">
              Choose local pickup at checkout. We&apos;ll have it ready at the counter during open hours.
            </p>
          </div>
          <Placeholder title="Parking & accessibility">
            [PLACEHOLDER] Where to park on Main Street, and step-free access details.
          </Placeholder>
        </Container>
      </section>
    </>
  );
}
