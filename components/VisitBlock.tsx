import { MapPin, Phone, NavigationArrow } from "@phosphor-icons/react/dist/ssr";
import { site, fullAddress, directionsUrl, mapEmbedUrl } from "@/lib/site";
import { OpenStatus } from "@/components/OpenStatus";

const fmt = (hhmm: string | null) => {
  if (!hhmm) return "";
  const [h] = hhmm.split(":").map(Number);
  return h === 12 ? "Noon" : `${h % 12}pm`;
};

export function HoursList() {
  // Week starts Tuesday, the first open day, so the closed days sit together at the end.
  const order = [2, 3, 4, 5, 6, 0, 1].map((d) => site.hours[d]);
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-1.5">
      {order.map((d) => (
        <div key={d.day} className="contents">
          <dt className="font-semibold">{d.name}</dt>
          <dd className={`price ${d.open ? "" : "text-cocoa-500"}`}>{d.open ? `${fmt(d.open)} to ${fmt(d.close)}` : "Closed"}</dd>
        </div>
      ))}
    </dl>
  );
}

export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[var(--radius-card)] bg-cream-200 shadow-[var(--shadow-soft)] ${className}`}>
      <iframe
        src={mapEmbedUrl}
        title={`Map showing My Favorite Sweet Shoppe at ${fullAddress}`}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full border-0 [filter:sepia(.35)_saturate(.85)_hue-rotate(-8deg)_contrast(.98)]"
      />
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-cocoa absolute right-4 bottom-4 shadow-[var(--shadow-soft)]"
      >
        <NavigationArrow size={18} weight="fill" aria-hidden /> Directions
      </a>
    </div>
  );
}

export function VisitBlock({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <H className="display text-[clamp(2.6rem,1.4rem+4vw,5rem)]">Come say hi on Main Street.</H>
        <div className="mt-6">
          <OpenStatus hours={site.hours} fallback={site.hoursSummary} />
        </div>
        <address className="mt-8 flex items-start gap-3 text-lg not-italic">
          <MapPin size={26} weight="fill" className="mt-0.5 shrink-0 text-apple-600" aria-hidden />
          <span>
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postalCode}
            <span className="block text-base text-cocoa-700">In Carnegie, {site.address.neighborhood}.</span>
          </span>
        </address>
        <div className="mt-8 rounded-[var(--radius-card)] bg-cream-100 p-6">
          {H === "h1" ? <h2 className="mb-4 text-2xl">Hours</h2> : <h3 className="mb-4 text-2xl">Hours</h3>}
          <HoursList />
          <p className="mt-4 text-sm text-cocoa-700">{site.hoursNote} Call ahead around holidays.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <NavigationArrow size={18} weight="fill" aria-hidden /> Get directions
          </a>
          <a href={`tel:${site.phone.tel}`} className="btn btn-outline text-cocoa-900">
            <Phone size={18} weight="bold" aria-hidden /> {site.phone.display}
          </a>
        </div>
      </div>
      <div className="grid gap-5 lg:col-span-7">
        <MapEmbed className="aspect-[4/3] lg:aspect-auto lg:min-h-[420px]" />
        <div className="flex min-h-[150px] items-center justify-center rounded-[var(--radius-card)] border-2 border-dashed border-cocoa-500/40 bg-cream-100 p-6 text-center text-cocoa-700">
          <p>
            <span className="block font-display text-xl text-cocoa-900">Storefront photo</span>
            [PLACEHOLDER] A wide photo of the shop front at 237 E Main Street, ideally with the apple window display.
          </p>
        </div>
      </div>
    </div>
  );
}
