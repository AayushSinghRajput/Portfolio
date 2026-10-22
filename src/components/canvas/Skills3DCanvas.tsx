import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Skills3DCloud from "./Skills3DCloud";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

interface Skills3DCanvasProps {
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

export const Skills3DCanvas: React.FC<Skills3DCanvasProps> = ({ className = "" }) => {
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
    return null;
  }

  return (
    <div className={`w-full h-[400px] sm:h-[460px] relative ${className}`}>
      <CanvasErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 6.2], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "default",
              failIfMajorPerformanceCaveat: false,
            }}
            className="w-full h-full"
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[4, 5, 3]} intensity={1.5} color="#38bdf8" />
            <directionalLight position={[-4, -4, -2]} intensity={1.2} color="#a855f7" />
            <Skills3DCloud reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
};

export default Skills3DCanvas;
