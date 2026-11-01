import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { updateScrollState } from "@/lib/scrollStore";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export interface UseLenisScrollOptions {
  enabled?: boolean;
}

/**
 * Initializes Lenis smooth scroll and binds it directly to GSAP ScrollTrigger
 * and the shared mutable WebGL scrollStore.
 * Cleans up listeners and ticker callbacks on unmount to prevent memory leaks.
 */
export const useLenisScroll = (options: UseLenisScrollOptions = {}) => {
  const { enabled = true } = options;
  const reducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // If reduced motion is preferred or explicitly disabled, do not initialize smooth scroll
    if (!enabled || reducedMotion || typeof window === "undefined") {
      const handleNativeScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
        updateScrollState(scrollY, progress);
        ScrollTrigger.update();
      };

      window.addEventListener("scroll", handleNativeScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleNativeScroll);
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      window.__lenis = lenis;
    }

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", (e: { scroll: number; velocity: number; direction: number }) => {
      ScrollTrigger.update();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, e.scroll / maxScroll)) : 0;
      updateScrollState(e.scroll, progress, e.velocity, e.direction);
    });

    // Run Lenis on GSAP's internal ticker to avoid dual RAF desyncs
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined" && window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, [enabled, reducedMotion]);

  return lenisRef;
};
