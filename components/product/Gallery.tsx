"use client";

import Image from "next/image";
import { useState } from "react";

export type Slide = { url: string; alt: string; width: number; height: number; cutout?: boolean };

export function Gallery({ slides, badge }: { slides: Slide[]; badge?: React.ReactNode }) {
  const [i, setI] = useState(0);
  const s = slides[i];
  return (
    <div>
      <div
        className={`relative aspect-square overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] ${
          s.cutout ? "bg-[radial-gradient(circle_at_50%_40%,var(--color-cream-50),var(--color-caramel-200))]" : "warm bg-cream-100"
        }`}
      >
        {s.cutout && (
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-[16%] bg-cream-100 shadow-[inset_0_8px_0_-5px_var(--color-cream-200)]" />
        )}
        <Image
          key={s.url}
          src={s.url}
          alt={s.alt}
          fill
          preload={i === 0}
          sizes="(min-width: 1024px) 50vw, 100vw"
          quality={85}
          className={s.cutout ? "z-[1] object-contain object-bottom px-[18%] pt-[6%] pb-[8%]" : "object-cover"}
        />
        {badge && <span className="absolute top-4 left-4 z-[2]">{badge}</span>}
      </div>
      {slides.length > 1 && (
        <ul className="mt-3 flex gap-3" aria-label="Product photos">
          {slides.map((sl, n) => (
            <li key={sl.url}>
              <button
                type="button"
                onClick={() => setI(n)}
                aria-pressed={n === i}
                aria-label={`Show photo ${n + 1} of ${slides.length}`}
                className={`relative block size-20 overflow-hidden rounded-[14px] border-2 transition-colors ${
                  n === i ? "border-cocoa-900" : "border-transparent hover:border-cream-200"
                } ${sl.cutout ? "bg-caramel-200" : "bg-cream-100"}`}
              >
                <Image src={sl.url} alt="" fill sizes="80px" className={sl.cutout ? "object-contain p-1.5" : "object-cover"} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
