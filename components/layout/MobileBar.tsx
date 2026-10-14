"use client";

import Link from "next/link";
import { Handbag, MapPin, Phone } from "@phosphor-icons/react";
import { useCart } from "@/components/cart/cart-context";

/** Sticky bottom bar on phones: Cart / Visit / Call. */
export function MobileBar({ tel }: { tel: string }) {
  const { count, open, ready } = useCart();
  const item =
    "flex min-h-[3.75rem] flex-1 flex-col items-center justify-center gap-0.5 text-[0.8rem] font-bold tracking-wide active:bg-cream-50/10";
  return (
    <nav
      aria-label="Quick actions"
      className="on-dark fixed inset-x-0 bottom-0 z-40 flex border-t border-cream-50/10 bg-cocoa-900/95 pb-[env(safe-area-inset-bottom)] text-cream-50 backdrop-blur-md md:hidden"
    >
      <button type="button" onClick={open} className={item} aria-label={ready && count ? `Cart, ${count} items` : "Cart"}>
        <span className="relative">
          <Handbag size={24} weight="bold" aria-hidden />
          {ready && count > 0 && (
            <span className="price absolute -top-1.5 -right-3 grid h-5 min-w-5 place-items-center rounded-full bg-apple-600 px-1 text-[0.7rem] leading-none">
              {count}
            </span>
          )}
        </span>
        Cart
      </button>
      <Link href="/visit" className={`${item} border-x border-cream-50/10`}>
        <MapPin size={24} weight="bold" aria-hidden />
        Visit
      </Link>
      <a href={`tel:${tel}`} className={item}>
        <Phone size={24} weight="bold" aria-hidden />
        Call
      </a>
    </nav>
  );
}
