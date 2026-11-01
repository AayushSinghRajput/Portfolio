import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GoogleAnalytics = () => {
  const location = useLocation();
  const measurementId =
    import.meta.env.VITE_GA_MEASUREMENT_ID || "G-328NKRX2KM";

  // Fallback: If not present in HTML, inject script dynamically
  useEffect(() => {
    if (!measurementId || typeof window === "undefined") return;

    if (!window.gtag && !document.getElementById("ga-gtag-script")) {
      const script = document.createElement("script");
      script.id = "ga-gtag-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: unknown[]) => {
        window.dataLayer.push(args);
      };
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", measurementId);
    }
  }, [measurementId]);

  // Track SPA page navigation changes across React Router
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;

    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  return null;
};

export default GoogleAnalytics;
