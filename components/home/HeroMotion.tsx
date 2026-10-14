"use client";

import { useEffect } from "react";

/**
 * Scroll half of the signature pour. The load pour is CSS (it starts on first paint); GSAP loads after hydration,
 * only when motion is allowed, and scrubs: drips lengthen, one drop falls, and the apple turns and sinks.
 */
export function HeroMotion() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const hero = document.getElementById("hero");
    if (!hero) return;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        const st = { trigger: hero, start: "top top", end: "bottom top", scrub: 0.8 };
        // drip-inner sits inside the CSS-animated .drip, so the two transforms compose instead of fighting
        gsap.to("[data-drip]", { yPercent: 46, ease: "none", stagger: { each: 0.02, from: "random" }, scrollTrigger: st });
        gsap.fromTo(
          "[data-drop]",
          { y: 300, opacity: 0, scale: 0.6 },
          {
            keyframes: [
              { y: 330, opacity: 1, scale: 1, duration: 0.15 },
              { y: 760, opacity: 1, duration: 0.65, ease: "power2.in" },
              { y: 800, opacity: 0, scaleY: 0.4, duration: 0.2 },
            ],
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "60% top", scrub: 0.4 },
          },
        );
        gsap.to("[data-apple]", { rotate: 9, y: 70, ease: "none", scrollTrigger: st });
        gsap.to("[data-apple-shadow]", { scaleX: 0.8, opacity: 0.6, ease: "none", scrollTrigger: st });
      }, hero);
      cleanup = () => ctx.revert();
    })();

    const onChange = () => {
      if (mq.matches) cleanup();
    };
    mq.addEventListener("change", onChange);
    return () => {
      cancelled = true;
      mq.removeEventListener("change", onChange);
      cleanup();
    };
  }, []);
  return null;
}
