"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "@phosphor-icons/react";

/** Click-to-load YouTube embed: no third-party scripts or cookies until the visitor asks for the video. */
export function VideoFacade({ id, title, poster }: { id: string; title: string; poster: { url: string; alt: string } }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] bg-cocoa-950 shadow-[var(--shadow-lift)]">
      {on ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button type="button" onClick={() => setOn(true)} className="group absolute inset-0 h-full w-full" aria-label={`Play video: ${title}`}>
          <Image src={poster.url} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover opacity-80 transition-opacity group-hover:opacity-90" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-20 place-items-center rounded-full bg-apple-600 text-cream-50 shadow-[var(--shadow-lift)] transition-transform group-hover:scale-110">
              <Play size={34} weight="fill" aria-hidden />
            </span>
          </span>
          <span className="absolute bottom-4 left-4 rounded-full bg-cocoa-950/80 px-4 py-2 text-sm font-bold text-cream-50">Watch how it&apos;s done</span>
        </button>
      )}
    </div>
  );
}
