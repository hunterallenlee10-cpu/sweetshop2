import Link from "next/link";
import Image from "next/image";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";

export function Container({ children, className = "", ...rest }: { children?: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={`mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Breadcrumbs({
  items,
  dark = false,
  onColor = false,
}: {
  items: { name: string; path: string }[];
  dark?: boolean;
  /** On a saturated light field (caramel), muted cocoa fails contrast: use full-strength text. */
  onColor?: boolean;
}) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className={`flex flex-wrap items-center gap-1 ${dark ? "text-cream-100" : onColor ? "text-cocoa-950" : "text-cocoa-700"}`}>
          {all.map((it, i) => (
            <li key={it.path} className="flex items-center gap-1">
              {i > 0 && <CaretRight size={12} weight="bold" aria-hidden className="opacity-60" />}
              {i === all.length - 1 ? (
                <span aria-current="page" className={`font-semibold ${dark ? "text-cream-50" : "text-cocoa-900"}`}>
                  {it.name}
                </span>
              ) : (
                <Link href={it.path} className="hover:underline">
                  {it.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  );
}

type Tone = "cream" | "cocoa" | "caramel" | "red";
const tones: Record<Tone, string> = {
  cream: "bg-cream-100 text-cocoa-900",
  cocoa: "on-dark bg-cocoa-900 text-cream-50",
  caramel: "bg-caramel-500 text-cocoa-950",
  red: "on-dark bg-apple-600 text-cream-50",
};

/** Inner-page header: one colored field, a big title, an intro, an optional photo. */
export function PageHero({
  title,
  intro,
  crumbs,
  tone = "cream",
  image,
  children,
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs: { name: string; path: string }[];
  tone?: Tone;
  image?: { url: string; alt: string; width: number; height: number; contain?: boolean };
  children?: React.ReactNode;
}) {
  const dark = tone === "cocoa" || tone === "red";
  return (
    <section className={tones[tone]}>
      <Container className={`grid gap-10 py-12 lg:py-16 ${image ? "lg:grid-cols-12 lg:items-center" : ""}`}>
        <div className={image ? "lg:col-span-7" : ""}>
          <Breadcrumbs items={crumbs} dark={dark} onColor={tone === "caramel"} />
          <h1 className="display mt-6 max-w-[18ch] text-[clamp(2.8rem,1.5rem+4.8vw,5.75rem)]">{title}</h1>
          {intro && (
            <div className={`measure mt-6 text-lg sm:text-xl ${dark ? "text-cream-100" : tone === "caramel" ? "text-cocoa-950" : "text-cocoa-700"}`}>{intro}</div>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && (
          <div className="lg:col-span-5">
            <div
              className={`warm relative overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-lift)] ${
                image.width / image.height > 1.25 ? "aspect-[16/10]" : "aspect-[4/3] lg:aspect-[4/5]"
              } ${image.contain ? "bg-cream-50" : ""}`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                preload
                sizes="(min-width: 1024px) 38vw, 100vw"
                className={image.contain ? "object-contain p-8" : "object-cover"}
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export function Steps({ steps, tone = "light" }: { steps: { title: string; body: string }[]; tone?: "light" | "dark" }) {
  return (
    <ol className="grid gap-8 md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className={`border-t-2 pt-5 ${tone === "dark" ? "border-cream-50/25" : "border-cocoa-900/15"}`}>
          <span className={`display text-5xl ${tone === "dark" ? "text-caramel-400" : "text-apple-600"}`} aria-hidden>
            {i + 1}
          </span>
          <h3 className="mt-3 text-2xl">{s.title}</h3>
          <p className={`mt-2 ${tone === "dark" ? "text-cream-100" : "text-cocoa-700"}`}>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-cocoa-900/15 border-y border-cocoa-900/15">
      {items.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-xl font-semibold [font-variation-settings:'SOFT'_100] [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-full bg-cream-100 text-xl transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="measure pb-5 text-lg text-cocoa-700">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Visible, clearly labelled slot for content the owner still needs to supply. */
export function Placeholder({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border-2 border-dashed border-cocoa-500/40 bg-cream-100/60 p-6 text-cocoa-700 ${className}`}
    >
      <p className="font-display text-lg font-semibold text-cocoa-900 [font-variation-settings:'SOFT'_100]">{title}</p>
      <p className="mt-1 text-sm">{children}</p>
    </div>
  );
}
