"use client";

import { useId, useState } from "react";
import { CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "date" | "number" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  help?: string;
  autoComplete?: string;
  half?: boolean;
};

const SHOP_EMAIL = "myfavoritesweetshoppe@gmail.com";

/**
 * Inquiry form with inline validation. With no form backend in this spec, a valid submission opens the visitor's
 * email app with a fully composed message to the shop. [PLACEHOLDER: connect to Shopify Forms or an email service.]
 */
export function InquiryForm({
  subject,
  fields,
  submitLabel = "Send inquiry",
  to = SHOP_EMAIL,
  tone = "light",
}: {
  subject: string;
  fields: Field[];
  submitLabel?: string;
  to?: string;
  tone?: "light" | "dark";
}) {
  const uid = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<string | null>(null);
  const dark = tone === "dark";

  function validate(form: HTMLFormElement) {
    const next: Record<string, string> = {};
    for (const f of fields) {
      const el = form.elements.namedItem(f.name) as HTMLInputElement | null;
      if (!el) continue;
      const v = el.value.trim();
      if (f.required && !v) next[f.name] = `Please add your ${f.label.toLowerCase()}.`;
      else if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) next[f.name] = "That email doesn't look right. Check for a typo?";
      else if (f.type === "tel" && v && v.replace(/\D/g, "").length < 10) next[f.name] = "Please include a 10-digit phone number.";
    }
    return next;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    const data = new FormData(form);
    const body = fields
      .map((f) => `${f.label}: ${String(data.get(f.name) ?? "").trim() || "-"}`)
      .join("\n");
    const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(href);
    window.location.href = href;
  }

  if (sent) {
    return (
      <div role="status" className={`rounded-[var(--radius-card)] p-8 ${dark ? "bg-cream-50/10" : "bg-cream-100"}`}>
        <CheckCircle size={40} weight="fill" className={dark ? "text-caramel-400" : "text-granny-600"} aria-hidden />
        <p className="display mt-4 text-3xl">Almost there.</p>
        <p className={`measure mt-3 text-lg ${dark ? "text-cream-100" : "text-cocoa-700"}`}>
          Your email app should open with your message ready to send. If it didn&apos;t,{" "}
          <a className="link font-semibold" href={sent}>
            open it here
          </a>{" "}
          or call us at <a className="link font-semibold" href="tel:+14125645416">412-564-5416</a>.
        </p>
        <button type="button" onClick={() => setSent(null)} className={`btn btn-outline mt-6 ${dark ? "" : "text-cocoa-900"}`}>
          Edit my message
        </button>
      </div>
    );
  }

  const input = `w-full rounded-[var(--radius-input)] border-2 px-4 py-3 text-base transition-colors focus:outline-none ${
    dark
      ? "border-cream-50/25 bg-cocoa-800 text-cream-50 placeholder:text-cream-100/60 focus:border-caramel-400"
      : "border-cream-200 bg-cream-50 text-cocoa-900 placeholder:text-cocoa-500 focus:border-cocoa-900"
  }`;

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => {
        const id = `${uid}-${f.name}`;
        const err = errors[f.name];
        const describedBy = [f.help ? `${id}-help` : "", err ? `${id}-err` : ""].filter(Boolean).join(" ") || undefined;
        const common = {
          id,
          name: f.name,
          required: f.required,
          "aria-invalid": err ? true : undefined,
          "aria-describedby": describedBy,
          autoComplete: f.autoComplete,
          className: `${input} ${err ? (dark ? "border-caramel-400!" : "border-apple-600!") : ""}`,
        };
        return (
          <div key={f.name} className={`flex flex-col gap-2 ${f.half ? "" : "sm:col-span-2"}`}>
            <label htmlFor={id} className="font-semibold">
              {f.label}
              {f.required ? (
                <span aria-hidden className={dark ? "text-caramel-400" : "text-apple-600"}>
                  {" "}
                  *
                </span>
              ) : (
                <span className={`font-normal ${dark ? "text-cream-100" : "text-cocoa-700"}`}> (optional)</span>
              )}
            </label>
            {f.type === "textarea" ? (
              <textarea {...common} rows={5} />
            ) : f.type === "select" ? (
              <select {...common} defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input {...common} type={f.type ?? "text"} />
            )}
            {f.help && (
              <p id={`${id}-help`} className={`text-sm ${dark ? "text-cream-100" : "text-cocoa-700"}`}>
                {f.help}
              </p>
            )}
            {err && (
              <p id={`${id}-err`} className={`text-sm font-semibold ${dark ? "text-caramel-200" : "text-apple-700"}`}>
                {err}
              </p>
            )}
          </div>
        );
      })}
      <div className="sm:col-span-2">
        <button type="submit" className={`btn text-lg ${dark ? "btn-cream" : "btn-primary"}`}>
          <PaperPlaneTilt size={20} weight="bold" aria-hidden /> {submitLabel}
        </button>
        <p className={`mt-3 text-sm ${dark ? "text-cream-100" : "text-cocoa-700"}`}>
          Prefer to talk? Call <a className="link" href="tel:+14125645416">412-564-5416</a>, Tuesday to Saturday, noon to 6pm.
        </p>
      </div>
    </form>
  );
}
