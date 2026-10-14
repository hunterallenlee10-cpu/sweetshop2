import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import cutouts from "@/data/cutouts.json";
import { HeroMotion } from "./HeroMotion";

/* x = left %, w = width, l = full length (px), d = pour delay. Short ones over the text column, long ones in the gaps. */
const DRIPS = [
  { x: "2.5%", w: 20, l: 150, d: 0, md: true },
  { x: "8%", w: 12, l: 96, d: 260, md: true },
  { x: "15%", w: 26, l: 170, d: 120, md: true },
  { x: "27%", w: 14, l: 120, d: 380, md: true },
  { x: "38%", w: 18, l: 140, d: 200 },
  { x: "49%", w: 30, l: 300, d: 60, md: true },
  { x: "57%", w: 12, l: 110, d: 420, md: true },
  { x: "68%", w: 22, l: 230, d: 160, md: true },
  { x: "79%", w: 16, l: 140, d: 320 },
  { x: "88%", w: 34, l: 340, d: 40 },
  { x: "96%", w: 14, l: 120, d: 240 },
];

export function Hero() {
  const apple = cutouts["triple-chocolate"];
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-cream-50">
      {/* the pour */}
      <div className="pour-band" aria-hidden>
        <svg viewBox="0 0 1440 20" preserveAspectRatio="none">
          <path
            fill="currentColor"
            d="M0 0H1440V6C1380 14 1330 4 1270 10S1150 18 1080 9 950 3 890 12 760 19 690 9 560 2 500 11 380 18 310 8 180 2 120 11 40 16 0 8Z"
          />
        </svg>
      </div>
      <div className="pour-drips" aria-hidden>
        {DRIPS.map((d, i) => (
          <span
            key={`n${i}`}
            className={`drip-neck ${d.md ? "hidden md:block" : ""}`}
            style={{ "--x": d.x, "--w": `${d.w}px` } as React.CSSProperties}
          />
        ))}
        {DRIPS.map((d, i) => (
          <span
            key={i}
            className={`drip ${d.md ? "hidden md:block" : ""}`}
            style={{ "--x": d.x, "--w": `${d.w}px`, "--l": `${d.l}px`, "--d": `${d.d}ms` } as React.CSSProperties}
          >
            <span className="drip-inner" data-drip>
              <span className="drip-gloss" />
            </span>
          </span>
        ))}
        <span className="drop" data-drop style={{ "--x": "calc(88% + 17px)" } as React.CSSProperties} />
      </div>

      {/* the counter the apple stands on */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[1] h-[clamp(64px,13vh,128px)] bg-cream-100 shadow-[inset_0_10px_0_-6px_var(--color-cream-200)]"
      />
      <div className="relative z-[3] mx-auto grid max-w-[1400px] items-center gap-4 px-5 pt-16 pb-0 sm:px-6 md:pt-24 lg:min-h-[min(calc(100dvh-72px),880px)] lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-16">
        <div className="lg:col-span-6 lg:pb-24">
          <h1 id="hero-title" className="display rise text-[clamp(3.4rem,1.6rem+6.4vw,6rem)] text-cocoa-900">
            Handmade in{" "}
            <span className="relative inline-block whitespace-nowrap">
              Carnegie.
              <svg
                className="scribble absolute -bottom-[0.14em] left-0 h-[0.3em] w-[96%] text-caramel-500"
                viewBox="0 0 300 30"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M4 20C60 9 132 6 196 10c38 2 70 6 98 12M38 26c56-7 128-9 190-4"
                  stroke="currentColor"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  pathLength={1}
                />
              </svg>
            </span>
          </h1>
          <p className="rise measure mt-7 max-w-[30rem] text-lg text-cocoa-700 sm:text-xl" style={{ "--d": "120ms" } as React.CSSProperties}>
            Gourmet caramel apples and hand-dipped chocolates, made by our family on Main Street since 2014.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={{ "--d": "220ms" } as React.CSSProperties}>
            <Link href="/shop/caramel-apples" className="btn btn-primary text-lg">
              Shop Caramel Apples <ArrowRight size={20} weight="bold" aria-hidden />
            </Link>
            <Link href="/visit" className="btn btn-outline text-lg text-cocoa-900">
              Visit the Shop
            </Link>
          </div>
        </div>

        <div className="relative flex h-[min(56vh,480px)] items-end justify-center lg:col-span-6 lg:h-[min(78vh,760px)]">
          <div
            aria-hidden
            className="absolute bottom-[10%] left-1/2 h-[9%] w-[58%] -translate-x-1/2 rounded-[50%] bg-cocoa-900/30 blur-xl"
            data-apple-shadow
          />
          <div className="hero-apple relative z-[1] h-[94%] origin-bottom">
            <div data-apple className="h-full origin-[50%_85%]">
              <Image
                src={apple.src}
                width={apple.width}
                height={apple.height}
                alt="Triple Chocolate gourmet caramel apple: homemade caramel, milk chocolate and a white and dark chocolate drizzle"
                preload
                fetchPriority="high"
                sizes="(min-width: 1024px) 34vw, 70vw"
                quality={85}
                className="h-full w-auto object-contain drop-shadow-[0_30px_30px_rgb(42_23_17/0.25)]"
              />
            </div>
          </div>
        </div>
      </div>
      <HeroMotion />
    </section>
  );
}
