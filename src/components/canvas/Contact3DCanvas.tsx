import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Contact3DGlobe from "./Contact3DGlobe";
import CanvasErrorBoundary from "./CanvasErrorBoundary";
import Contact3DFallback from "./Contact3DFallback";

interface Contact3DCanvasProps {
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

export const Contact3DCanvas: React.FC<Contact3DCanvasProps> = ({ className = "" }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webGLAvailable, setWebGLAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    setWebGLAvailable(checkWebGLSupport());

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  if (webGLAvailable === false) {
    return <Contact3DFallback />;
  }

  return (
    <div className={`w-full h-64 sm:h-72 relative ${className}`}>
      <CanvasErrorBoundary fallback={<Contact3DFallback />}>
        <Suspense fallback={<Contact3DFallback />}>
          <Canvas
            camera={{ position: [0, 0, 4.4], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "default",
              failIfMajorPerformanceCaveat: false,
            }}
            className="w-full h-full"
          >
            <ambientLight intensity={1.0} />
            <directionalLight position={[4, 5, 3]} intensity={1.8} color="#38bdf8" />
            <directionalLight position={[-4, -3, -2]} intensity={1.2} color="#a855f7" />
            <Contact3DGlobe reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
};

export default Contact3DCanvas;
