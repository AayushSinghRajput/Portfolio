import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ArchitecturalKineticSculpture } from "./ArchitecturalKineticSculpture";
import CanvasErrorBoundary from "./CanvasErrorBoundary";
import Hero3DFallback from "./Hero3DFallback";

interface Hero3DCanvasProps {
  className?: string;
}

import { isWebGLAvailable } from "@/lib/webglSupport";

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ className = "" }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webGLAvailable, setWebGLAvailable] = useState<boolean | null>(null);
  const [isInView, setIsInView] = useState(true);
  const [dpr, setDpr] = useState<number>(1.5);
  const containerRef = useRef<HTMLDivElement>(null);
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>(undefined);

  useEffect(() => {
    // Check WebGL availability
    const supported = isWebGLAvailable();
    setWebGLAvailable(supported);

    // Compute clamped DPR based on screen width
    const width = window.innerWidth;
    if (width < 640) {
      setDpr(Math.min(window.devicePixelRatio || 1, 1.25));
    } else if (width < 1024) {
      setDpr(Math.min(window.devicePixelRatio || 1, 1.5));
    } else {
      setDpr(Math.min(window.devicePixelRatio || 1, 2.0));
    }

    // Detect reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Bind event source to hero section
    const heroSection = document.getElementById("home");
    if (heroSection) {
      setEventSource(heroSection);
    } else if (containerRef.current) {
      setEventSource(containerRef.current);
    }

    // Viewport observer to pause render loop completely when off-screen
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

  // If WebGL is unavailable, render fallback immediately
  if (webGLAvailable === false) {
    return (
      <div className={`relative w-full h-full overflow-hidden ${className}`}>
        <Hero3DFallback />
      </div>
    );
  }

  if (webGLAvailable === null) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <CanvasErrorBoundary fallback={<Hero3DFallback />}>
        <Suspense fallback={<Hero3DFallback />}>
          <Canvas
            frameloop={isInView ? "always" : "never"}
            eventSource={eventSource}
            camera={{ position: [0, 0, 4.3], fov: 44 }}
            dpr={dpr}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "default",
              failIfMajorPerformanceCaveat: false,
            }}
            className="w-full h-full pointer-events-auto"
          >
            {/* Architectural Warm Studio Lighting Rig */}
            <ambientLight intensity={0.9} color="#F5F1E8" />
            {/* Primary Key Light (Soft Warm Studio Sunlight) */}
            <directionalLight position={[5, 7, 5]} intensity={1.75} color="#FFFDF6" />
            {/* Dramatic Rim Light (Warm Vermilion Edge Silhouette Glow) */}
            <directionalLight position={[-6, -4, -3]} intensity={1.5} color="#E65336" />
            {/* Subtle Olive / Cool Technical Rim */}
            <directionalLight position={[-3, 6, -2]} intensity={0.8} color="#8A9367" />
            {/* Soft Ambient Ground Bounce */}
            <directionalLight position={[0, -5, 2]} intensity={0.45} color="#FAF7F2" />

            {/* Kinetic Sculpture */}
            <ArchitecturalKineticSculpture reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
};

export default Hero3DCanvas;
