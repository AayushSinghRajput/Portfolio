import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ArchitecturalLoaderProps {
  onComplete: () => void;
}

export const ArchitecturalLoader: React.FC<ArchitecturalLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialsRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // If reduced motion is requested, complete immediately
    if (reducedMotion) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.45,
            ease: "power2.inOut",
            onComplete,
          });
        },
      });

      // Animate progress percentage from 0 to 100
      const counter = { val: 0 };
      tl.to(counter, {
        val: 100,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          const current = Math.floor(counter.val);
          setPercent(current);
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${current}%`;
          }
        },
      }, 0);

      // Subtle architectural frame expansion
      tl.fromTo(
        frameRef.current,
        { scale: 0.88, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" },
        0
      );

      // Stagger initials reveal: A - K - S
      if (initialsRef.current) {
        const letters = initialsRef.current.querySelectorAll(".loader-char");
        tl.fromTo(
          letters,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" },
          0.1
        );
      }

      // Exit transition for inner elements
      tl.to(
        [initialsRef.current, progressTextRef.current, frameRef.current],
        { y: -16, opacity: 0, duration: 0.35, ease: "power2.in" },
        1.45
      );
    }, containerRef);

    // Allow user to skip anytime by clicking or pressing Escape/Space
    const handleSkip = (e: KeyboardEvent | MouseEvent) => {
      if ("key" in e && e.key !== "Escape" && e.key !== " ") return;
      ctx.kill();
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete,
      });
    };

    window.addEventListener("keydown", handleSkip);

    return () => {
      window.removeEventListener("keydown", handleSkip);
      ctx.revert();
    };
  }, [reducedMotion, onComplete]);

  // Click anywhere to skip
  const handleContainerClick = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete,
    });
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      role="progressbar"
      aria-label="Loading portfolio"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F5F1E8] text-[#20201D] cursor-pointer select-none"
    >
      {/* Architectural Corner Crosshairs */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-[#77746C] tracking-widest uppercase">
        + SYS.INIT // 2026
      </div>
      <div className="absolute top-6 right-6 font-mono text-[10px] text-[#77746C] tracking-widest uppercase">
        LAT 27.7172° N, LON 85.3240° E
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[10px] text-[#77746C] tracking-widest uppercase">
        KATHMANDU, NEPAL
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] text-[#77746C] tracking-widest uppercase">
        CLICK OR ESC TO SKIP
      </div>

      {/* Central Frame */}
      <div
        ref={frameRef}
        className="relative w-72 sm:w-80 p-8 border border-[#DAD4C9] bg-[#E9E3D8]/50 flex flex-col items-center justify-center"
      >
        {/* Subtle geometric hairline marks */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#20201D]" />
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#20201D]" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#20201D]" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#20201D]" />

        {/* Animated Initials "AKS" */}
        <div
          ref={initialsRef}
          className="font-serif text-5xl sm:text-6xl tracking-tight text-[#20201D] flex items-center justify-center gap-1.5 mb-6"
        >
          <span className="loader-char inline-block">A</span>
          <span className="loader-char inline-block text-[#E65336]">.</span>
          <span className="loader-char inline-block">K</span>
          <span className="loader-char inline-block text-[#E65336]">.</span>
          <span className="loader-char inline-block">S</span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-[#DAD4C9] relative overflow-hidden mb-3">
          <div
            ref={progressBarRef}
            className="absolute top-0 left-0 bottom-0 bg-[#E65336] transition-all duration-75"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Progress Metadata */}
        <div
          ref={progressTextRef}
          className="w-full flex items-center justify-between font-mono text-[11px] text-[#5E5B54]"
        >
          <span>BUILDING SCENE</span>
          <span className="text-[#20201D] font-medium">{percent.toString().padStart(3, "0")}%</span>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturalLoader;
