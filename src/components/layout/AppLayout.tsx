import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface AppLayoutProps {
  children: React.ReactNode;
}

/**
 * Global layout shell providing Lenis smooth scroll, architectural navigation,
 * skip links for keyboard accessibility, and subtle route transitions.
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  // Initialize Lenis synchronized with GSAP ScrollTrigger and WebGL scrollStore
  useLenisScroll();
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();

  // Scroll restoration and anchor jump handling on route changes
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const elem = document.getElementById(targetId);
        if (elem) {
          const lenis = window.__lenis;
          if (lenis) {
            lenis.scrollTo(elem, { offset: -70 });
          } else {
            elem.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#20201D] font-sans antialiased selection:bg-[#E65336] selection:text-white relative">
      <CustomCursor />
      <Navbar />
      <main id="main-content" role="main" className="focus:outline-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AppLayout;
