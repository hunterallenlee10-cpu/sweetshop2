"use client";

import { useEffect, useState } from "react";

type Day = { day: number; name: string; open: string | null; close: string | null };
type Status = { open: boolean; label: string; detail: string };

const TZ = "America/New_York";
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const fmt = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  if (h === 12 && m === 0) return "noon";
  const hr = h % 12 || 12;
  return `${hr}${m ? `:${String(m).padStart(2, "0")}` : ""}${h < 12 ? "am" : "pm"}`;
};

/** Wall-clock time in Carnegie, PA, regardless of the visitor's timezone. */
function nowInShop(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function computeStatus(hours: Day[], date: Date): Status {
  const { day, minutes } = nowInShop(date);
  const today = hours[day];
  if (today.open && today.close) {
    const o = toMin(today.open);
    const c = toMin(today.close);
    if (minutes >= o && minutes < c) {
      const left = c - minutes;
      return {
        open: true,
        label: left <= 30 ? "Open now, closing soon" : "Open now",
        detail: `Until ${fmt(today.close)} today`,
      };
    }
    if (minutes < o) return { open: false, label: `Opens today at ${fmt(today.open)}`, detail: "Closed right now" };
  }
  for (let i = 1; i <= 7; i++) {
    const d = hours[(day + i) % 7];
    if (d.open) {
      return {
        open: false,
        label: `Opens ${i === 1 ? "tomorrow" : d.name} at ${fmt(d.open)}`,
        detail: "Closed right now",
      };
    }
  }
  return { open: false, label: "Closed", detail: "" };
}

/**
 * Live "Open now / Opens Tuesday at noon" pill. Time is only read after mount (prerender stays static),
 * and the static fallback has the same footprint so nothing shifts.
 */
export function OpenStatus({ hours, tone = "light", fallback }: { hours: Day[]; tone?: "light" | "dark"; fallback: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const tick = () => setStatus(computeStatus(hours, new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [hours]);

  const dark = tone === "dark";
  return (
    <span
      className={`inline-flex min-h-9 items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-semibold ${
        dark ? "bg-cream-50/10 text-cream-50" : "bg-cream-100 text-cocoa-900"
      }`}
      aria-live="polite"
    >
      <span className="relative flex size-2.5" aria-hidden>
        {status?.open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-granny-600 opacity-60 motion-reduce:hidden" />
        )}
        <span
          className={`relative size-2.5 rounded-full ${status ? (status.open ? "bg-granny-600" : "bg-apple-600") : "bg-cocoa-500"}`}
        />
      </span>
      {status ? (
        <span>
          {status.label}
          {status.detail && <span className={`font-normal ${dark ? "text-cream-100" : "text-cocoa-700"}`}> · {status.detail}</span>}
        </span>
      ) : (
        <span>{fallback}</span>
      )}
    </span>
  );
}
