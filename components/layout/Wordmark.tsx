import Image from "next/image";

/**
 * Proposed evolution of the shop's logo: it keeps the signature candy apple standing in for the "o" in "Shoppe",
 * set in the site's display face. [PLACEHOLDER: final logo needs owner approval.]
 */
export function Wordmark({ tone = "light", size = "md" }: { tone?: "light" | "dark"; size?: "md" | "lg" }) {
  const main = tone === "light" ? "text-cream-50" : "text-cocoa-900";
  const sub = tone === "light" ? "text-caramel-400" : "text-apple-600";
  const big = size === "lg";
  return (
    <span className="inline-flex flex-col leading-none select-none">
      <span className="sr-only">My Favorite Sweet Shoppe</span>
      <span
        aria-hidden
        className={`font-display italic ${sub} ${big ? "text-2xl" : "text-[0.95rem]"} [font-variation-settings:'SOFT'_100,'opsz'_24] font-semibold tracking-tight`}
      >
        My Favorite
      </span>
      <span
        aria-hidden
        className={`flex items-end font-display font-bold ${main} ${big ? "text-5xl" : "text-[1.55rem]"} tracking-[-0.03em] [font-variation-settings:'SOFT'_100,'opsz'_48]`}
      >
        Sweet Sh
        <Image
          src="/brand/apple-o.webp"
          alt=""
          width={120}
          height={192}
          className={`${big ? "mx-0.5 -mb-1 h-[3.6rem]" : "mx-px -mb-[3px] h-[1.95rem]"} w-auto`}
        />
        ppe
      </span>
    </span>
  );
}
