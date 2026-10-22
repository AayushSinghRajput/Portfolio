import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { GeometricCore } from "./HeroGeometricCore";
import CanvasErrorBoundary from "./CanvasErrorBoundary";
import Hero3DFallback from "./Hero3DFallback";

interface Hero3DCanvasProps {
  className?: string;
}

const checkWebGLSupport = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
};

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ className = "" }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webGLAvailable, setWebGLAvailable] = useState<boolean | null>(null);
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>(undefined);

  useEffect(() => {
    // Check WebGL availability
    const supported = checkWebGLSupport();
    setWebGLAvailable(supported);

    // Detect reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    // Bind event source to the hero section so mouse moves anywhere in hero update 3D tilt
    const heroSection = document.getElementById("home");
    if (heroSection) {
      setEventSource(heroSection);
    } else if (containerRef.current) {
      setEventSource(containerRef.current);
    }

    // Viewport intersection observer to pause render loop when out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "120px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      observer.disconnect();
    };
  }, []);

  // If WebGL is confirmed unavailable, render the fallback immediately
  if (webGLAvailable === false) {
    return (
      <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
        <Hero3DFallback />
      </div>
    );
  }

  // While checking, render empty or fallback
  if (webGLAvailable === null) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <CanvasErrorBoundary fallback={<Hero3DFallback />}>
        <Suspense fallback={<Hero3DFallback />}>
          <Canvas
            frameloop={isInView ? "always" : "never"}
            eventSource={eventSource}
            camera={{ position: [0, 0, 5.5], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "default",
              failIfMajorPerformanceCaveat: false,
            }}
            className="w-full h-full"
          >
            {/* Ambient & directional lighting */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[4, 5, 4]} intensity={1.4} color="#38bdf8" />
            <directionalLight position={[-4, -3, -2]} intensity={1.1} color="#c084fc" />
            <directionalLight position={[0, -4, 3]} intensity={0.8} color="#34d399" />

            {/* 3D Geometric Core Scene */}
            <GeometricCore reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
};

export default Hero3DCanvas;
