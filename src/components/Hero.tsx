import React, { useState, useEffect } from "react";
import { ArrowDownRight, Sparkles, Send } from "lucide-react";
import profilePhoto from "@/assets/profile_image.webp";
import heroSculptureBg from "@/assets/hero-sculpture-bg.webp";

export const Hero: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | string, options?: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -40 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Gentle parallax calculation
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      aria-label="Introduction and Overview"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-start overflow-hidden bg-[#F5F1E8] pt-24 sm:pt-28 pb-16 lg:py-0"
    >
      {/* 3D Kinetic Sculpture Background Scene */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) scale(1.02)`,
        }}
        aria-hidden="true"
      >
        <img
          src={heroSculptureBg}
          alt=""
          className="w-full h-full object-cover object-[78%_center] sm:object-[72%_center] lg:object-right-center"
          loading="eager"
          fetchPriority="high"
        />

        {/* Soft responsive radial gradient to ensure left text is 100% readable across all viewports */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F1E8]/95 via-[#F5F1E8]/75 to-transparent sm:via-[#F5F1E8]/40 lg:via-transparent" />

        {/* Bottom Atmospheric Blend Mask to dissolve dunes seamlessly into site ground */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 sm:h-48 bg-gradient-to-b from-transparent via-[#F5F1E8]/60 to-[#F5F1E8] pointer-events-none"
          aria-hidden="true"
        />

        {/* Ambient Animated Star Sparkle Accents matching reference image */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {/* Sparkle 1: Top near sphere */}
          <span className="absolute top-[18%] right-[56%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.9)] animate-pulse" />
          {/* Sparkle 2: Upper right orbit */}
          <span className="absolute top-[12%] right-[14%] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.95)] animate-pulse delay-300" />
          {/* Sparkle 3: Outer right orbit intersection */}
          <span className="absolute top-[37%] right-[8%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.85)] animate-pulse delay-700" />
          {/* Sparkle 4: Lower orbit track */}
          <span className="absolute top-[74%] right-[42%] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.95)] animate-pulse delay-500" />
          {/* Sparkle 5: Lower right dune highlight */}
          <span className="absolute top-[82%] right-[26%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.85)] animate-pulse delay-1000" />
        </div>
      </div>

      {/* Main Content Composition Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 py-8 lg:py-20 flex flex-col justify-center">
        <div className="max-w-2xl xl:max-w-3xl flex flex-col items-start space-y-6 sm:space-y-8">
          
          {/* Top Identity Vignette Badge */}
          <div className="flex items-center gap-3.5 group">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#20201D]/25 shadow-sm flex-shrink-0 bg-white/60">
              <img
                src={profilePhoto}
                alt="Portrait of Aayush Kumar Singh"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                width={48}
                height={48}
                loading="eager"
              />
            </div>
            <div>
              <p className="font-sans text-[11px] font-bold tracking-wider text-[#5E5B54] uppercase leading-tight">
                AAYUSH KUMAR SINGH
              </p>
              <h2 className="text-xs sm:text-[13px] font-sans font-medium text-[#20201D] leading-normal flex flex-wrap items-center mt-0.5">
                <span>Computer Engineering Graduate</span>
                <span className="text-[#DE4F26] mx-1 sm:mx-1.5 font-normal">|</span>
                <span>Full-Stack Developer</span>
                <span className="text-[#DE4F26] mx-1 sm:mx-1.5 font-normal">|</span>
                <span>AI-Integrated Software Engineer</span>
              </h2>
            </div>
          </div>

          {/* Editorial Display Headline */}
          <div className="space-y-4 sm:space-y-5">
            <h1 className="font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.1rem] xl:text-[5.5rem] text-[#20201D] leading-[1.03] tracking-[-0.025em] font-normal">
              I engineer{" "}
              <span className="italic text-[#DE4F26] font-normal inline-block hover:scale-[1.02] transition-transform origin-left">
                ideas
              </span>
              <br />
              into interactive
              <br />
              digital experiences<span className="text-[#DE4F26]">.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5E5B54] leading-relaxed max-w-xl font-sans font-normal">
              Building scalable software, intelligent applications and immersive digital experiences through engineering and creative technology.
            </p>
          </div>

          {/* Action Button Cluster */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-2">
            <button
              type="button"
              onClick={() => scrollTo("work")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1E1E1C] text-white font-sans text-sm font-medium hover:bg-[#DE4F26] transition-all duration-200 shadow-sm hover:shadow group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#DE4F26]"
              aria-label="View Selected Work section"
            >
              <span>View Selected Work</span>
              <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo("playground")}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-[#EFE9DF]/80 hover:bg-[#E7DFCFC] border border-[#DDD5C7] text-[#20201D] font-sans text-sm font-medium transition-all duration-200 backdrop-blur-sm shadow-sm group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#DE4F26]"
              aria-label="Explore My Experiments playground"
            >
              <Sparkles className="w-4 h-4 text-[#DE4F26] transition-transform group-hover:rotate-12" />
              <span>Explore My Experiments</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#EFE9DF]/80 hover:bg-[#E7DFCFC] border border-[#DDD5C7] text-[#20201D] font-sans text-sm font-medium transition-all duration-200 backdrop-blur-sm shadow-sm group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#DE4F26]"
              aria-label="Contact Me section"
            >
              <Send className="w-3.5 h-3.5 text-[#DE4F26] transition-transform group-hover:translate-x-0.5" />
              <span>Contact Me</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;