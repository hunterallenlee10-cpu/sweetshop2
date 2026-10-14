"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CaretDown, List, X, Phone, ArrowRight } from "@phosphor-icons/react";
import { NAV, SECONDARY, SEASON_LABELS, type NavItem } from "@/lib/nav";
import { CartButton } from "@/components/cart/CartButtons";
import type { SeasonId } from "@/lib/catalog";

function SeasonLabel({ prefix = "" }: { prefix?: string }) {
  return (
    <>
      {(Object.keys(SEASON_LABELS) as SeasonId[]).map((s) => (
        <span key={s} data-season-only={s}>
          {prefix}
          {SEASON_LABELS[s]}
        </span>
      ))}
    </>
  );
}

function Dropdown({ item, open, onToggle }: { item: NavItem; open: boolean; onToggle: (v: boolean) => void }) {
  const setOpen = onToggle;
  const btn = useRef<HTMLButtonElement>(null);
  const panelId = `menu-${item.label.toLowerCase().replace(/\W+/g, "-")}`;
  const isShop = item.label === "Shop";
  const hoverTimer = useRef<number | undefined>(undefined);

  return (
    <li
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        window.clearTimeout(hoverTimer.current);
        hoverTimer.current = window.setTimeout(() => setOpen(true), 80);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        window.clearTimeout(hoverTimer.current);
        hoverTimer.current = window.setTimeout(() => setOpen(false), 160);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          btn.current?.focus();
        }
      }}
    >
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="inline-flex min-h-11 items-center gap-1 rounded-full px-3.5 font-semibold text-cream-50 transition-colors hover:bg-cream-50/10 aria-expanded:bg-cream-50/10"
      >
        {item.label}
        <CaretDown size={14} weight="bold" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className={`absolute top-[calc(100%+12px)] ${isShop ? "left-0 w-[min(760px,80vw)]" : "left-0 w-[340px]"} rounded-[var(--radius-card)] bg-cream-50 p-3 text-cocoa-900 shadow-[var(--shadow-lift)]`}
      >
        <span aria-hidden className="absolute -top-3 left-0 h-3 w-full" />
        {isShop ? (
          <ul className="grid grid-cols-5 gap-2">
            {item.children!.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="group flex h-full flex-col rounded-[14px] p-2 transition-colors hover:bg-cream-100"
                >
                  <span
                    className={`relative mb-2 block aspect-square overflow-hidden rounded-[12px] ${c.image ? "bg-cream-100" : "bg-caramel-500"}`}
                  >
                    {c.image ? (
                      <Image
                        src={c.image}
                        alt=""
                        fill
                        sizes="140px"
                        className={`${c.image.startsWith("/cutouts") ? "object-contain p-2" : "object-cover"} transition-transform duration-500 group-hover:scale-105`}
                      />
                    ) : (
                      <span className="absolute inset-0 grid place-items-center p-2 text-center font-display text-lg leading-tight font-semibold text-cocoa-950 [font-variation-settings:'SOFT'_100]">
                        <SeasonLabel prefix="Now: " />
                      </span>
                    )}
                  </span>
                  <span className="font-display text-[1.05rem] leading-tight font-semibold [font-variation-settings:'SOFT'_100]">
                    {c.label === "Seasonal" ? "Seasonal" : c.label}
                  </span>
                  <span className="text-sm text-cocoa-700">{c.note === "seasonal" ? <SeasonLabel /> : c.note}</span>
                </Link>
              </li>
            ))}
            <li className="col-span-5 flex items-center justify-between rounded-[14px] bg-cream-100 px-4 py-2.5 text-sm">
              <span>Many treats contain peanuts or tree nuts.</span>
              <Link href="/allergy-info" onClick={() => setOpen(false)} className="link font-semibold">
                Allergy info
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            {item.children!.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-4 rounded-[14px] px-4 py-3 transition-colors hover:bg-cream-100"
                >
                  <span>
                    <span className="block font-display text-lg leading-tight font-semibold [font-variation-settings:'SOFT'_100]">
                      {c.label}
                    </span>
                    <span className="text-sm text-cocoa-700">{c.note}</span>
                  </span>
                  <ArrowRight size={18} aria-hidden className="shrink-0 text-cocoa-500" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

export function DesktopNav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openMenu]);

  return (
    <nav ref={navRef} aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        {NAV.map((item) =>
          item.children ? (
            <Dropdown
              key={item.label}
              item={item}
              open={openMenu === item.label}
              onToggle={(v) => setOpenMenu((cur) => (v ? item.label : cur === item.label ? null : cur))}
            />
          ) : (
            <li key={item.label}>
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-full px-3.5 font-semibold text-cream-50 transition-colors hover:bg-cream-50/10"
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

export function MobileMenu({ phone }: { phone: { display: string; tel: string } }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 font-semibold text-cream-50"
        aria-haspopup="dialog"
      >
        <List size={26} weight="bold" aria-hidden />
        <span className="sr-only sm:not-sr-only">Menu</span>
      </button>
      <dialog
        ref={ref}
        onClose={close}
        aria-label="Menu"
        className="on-dark m-0 h-dvh max-h-dvh w-full max-w-full bg-cocoa-900 p-0 text-cream-50 backdrop:bg-cocoa-950/60"
      >
        <div className="flex min-h-full flex-col px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="flex h-14 items-center justify-end">
            <button
              type="button"
              onClick={close}
              className="grid size-11 place-items-center rounded-full hover:bg-cream-50/10"
              aria-label="Close menu"
            >
              <X size={26} weight="bold" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1">
            <ul className="divide-y divide-cream-50/10">
              {NAV.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <details className="group">
                      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between py-3 font-display text-[2rem] leading-none font-semibold [font-variation-settings:'SOFT'_100] [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <CaretDown size={22} weight="bold" className="transition-transform group-open:rotate-180" aria-hidden />
                      </summary>
                      <ul className="pb-4">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={close}
                              className="flex min-h-11 items-center justify-between py-2 pl-1 text-lg text-cream-100"
                            >
                              <span>
                                {c.label === "Seasonal" ? (
                                  <>
                                    Seasonal: <SeasonLabel />
                                  </>
                                ) : (
                                  c.label
                                )}
                              </span>
                              <ArrowRight size={18} aria-hidden className="text-caramel-400" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={close}
                      className="flex min-h-14 items-center py-3 font-display text-[2rem] leading-none font-semibold [font-variation-settings:'SOFT'_100]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-cream-100">
              {SECONDARY.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} onClick={close} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a href={`tel:${phone.tel}`} className="btn btn-cream mt-6 w-full">
            <Phone size={20} weight="bold" aria-hidden /> Call {phone.display}
          </a>
        </div>
      </dialog>
    </div>
  );
}

export function HeaderCart() {
  return <CartButton className="text-cream-50 hover:bg-cream-50/10" />;
}
