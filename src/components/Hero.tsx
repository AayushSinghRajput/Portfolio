import React, { lazy, Suspense } from "react";
import { ArrowDownRight, Compass, Sparkles, Send, ArrowDown } from "lucide-react";
import profilePhoto from "@/assets/profile_image.webp";
import Hero3DFallback from "@/components/canvas/Hero3DFallback";

const Hero3DCanvas = lazy(() => import("@/components/canvas/Hero3DCanvas"));

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      aria-label="Introduction and Overview"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Top Editorial Mono Metadata Row */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-wider text-[#5E5B54] border-b border-[#DAD4C9] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8A9367] animate-pulse" aria-hidden="true" />
          <span className="text-[#20201D] font-medium">Available for opportunities</span>
          <span className="hidden sm:inline text-[#77746C]">// Kathmandu, Nepal</span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[#77746C]">
          <span>IOE PURWANCHAL CAMPUS</span>
          <span>•</span>
          <span>B.E. COMPUTER ENGINEERING</span>
          <span>•</span>
          <span className="text-[#20201D]">EST. 2026</span>
        </div>
      </div>

      {/* Main Hero Composition: Type Left, 3D Sculpture Space Right */}
      <div className="relative z-10 my-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8">
        {/* Left Column: Headlines & Positioning (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 sm:space-y-8">
          
          {/* Portrait Vignette & Positioning Pill */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-[#20201D] shadow-sm flex-shrink-0">
              <img
                src={profilePhoto}
                alt="Portrait of Aayush Kumar Singh"
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
                width={56}
                height={56}
                loading="eager"
              />
            </div>
            <div>
              <p className="font-mono text-xs text-[#5E5B54] tracking-wider uppercase">
                Aayush Kumar Singh
              </p>
              <h2 className="text-xs sm:text-sm font-sans font-medium text-[#20201D]">
                Computer Engineering Graduate <span className="text-[#E65336] mx-1">|</span> Full-Stack Developer <span className="text-[#E65336] mx-1">|</span> AI-Integrated Software Engineer
              </h2>
            </div>
          </div>

          {/* Primary Statement */}
          <div className="space-y-4">
            <h1 className="text-hero text-[#20201D] max-w-2xl font-serif">
              I engineer ideas into interactive digital experiences.
            </h1>
            <p className="text-base sm:text-lg text-[#5E5B54] leading-relaxed max-w-xl font-sans">
              Building scalable software, intelligent applications and immersive digital experiences through engineering and creative technology.
            </p>
          </div>

          {/* CTA Action Cluster */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <button
              type="button"
              onClick={() => scrollTo("work")}
              className="arch-button-primary group"
              aria-label="View Selected Work section"
            >
              <span>View Selected Work</span>
              <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => scrollTo("playground")}
              className="arch-button-secondary group"
              aria-label="Explore My Experiments playground"
            >
              <Sparkles className="w-4 h-4 text-[#8A9367]" />
              <span>Explore My Experiments</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="arch-button-secondary group"
              aria-label="Contact Me section"
            >
              <Send className="w-3.5 h-3.5 text-[#E65336]" />
              <span>Contact Me</span>
            </button>
          </div>
        </div>

        {/* Right Column: Architectural Space & Sculpture Staging (5 cols) */}
        <div className="lg:col-span-5 min-h-[440px] sm:min-h-[520px] lg:min-h-[600px] w-full relative flex items-center justify-center">
          {/* Borderless 3D Kinetic Sculpture / Fallback */}
          <div className="w-full h-full min-h-[440px] sm:min-h-[520px] lg:min-h-[600px] relative flex items-center justify-center">
            <Suspense fallback={<Hero3DFallback />}>
              <Hero3DCanvas className="w-full h-full" />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Bar: Status, Scroll Indicator, Coordinates */}
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-4 pt-6 border-t border-[#DAD4C9]">
        <div className="max-w-md">
          <span className="font-mono text-[10px] text-[#77746C] uppercase tracking-widest block mb-1">
            Status // November 2026
          </span>
          <p className="text-xs sm:text-sm text-[#20201D] font-sans">
            Available for relevant engineering opportunities and collaborations.
          </p>
        </div>

        {/* Scroll Cue */}
        <button
          type="button"
          onClick={() => scrollTo("intro")}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#5E5B54] hover:text-[#20201D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
          aria-label="Scroll to Introduction"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#E65336] animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;