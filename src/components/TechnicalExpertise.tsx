import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECHNICAL_EXPERTISE } from "@/data/portfolioData";

export const TechnicalExpertise: React.FC = () => {
  const [activeDomainIndex, setActiveDomainIndex] = useState<number>(0);
  const activeDomain = TECHNICAL_EXPERTISE[activeDomainIndex];

  return (
    <section
      id="expertise"
      aria-label="Technical Expertise and Domains"
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DAD4C9]"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-16 pb-6 border-b border-[#DAD4C9]">
        <div>
          <span className="font-mono text-xs text-[#77746C] tracking-widest uppercase block mb-2">
            02 // CAPABILITIES
          </span>
          <h2 className="text-h1 font-serif text-[#20201D]">
            Technical Expertise
          </h2>
        </div>
        <p className="max-w-md text-sm sm:text-base text-[#5E5B54] font-sans">
          Curated domain proficiencies. No arbitrary percentage bars — organized by functional architecture and production usage.
        </p>
      </div>

      {/* Interactive Domain Switcher & Editorial Spec Sheet */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
        {/* Left Column: Domain Selector Tabs (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="font-mono text-[10px] text-[#77746C] uppercase tracking-wider block mb-2">
            Select Domain Focus
          </span>
          {TECHNICAL_EXPERTISE.map((category, idx) => {
            const isActive = activeDomainIndex === idx;

            return (
              <button
                key={category.code}
                type="button"
                onClick={() => setActiveDomainIndex(idx)}
                className={`w-full text-left p-4 sm:p-5 border transition-all duration-200 flex items-center justify-between group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336] ${
                  isActive
                    ? "bg-[#20201D] text-[#F5F1E8] border-[#20201D] shadow-sm"
                    : "bg-[#FFFFFF] text-[#20201D] border-[#DAD4C9] hover:border-[#20201D]"
                }`}
                aria-pressed={isActive}
              >
                <div>
                  <span
                    className={`font-mono text-[10px] block mb-1 uppercase tracking-wider ${
                      isActive ? "text-[#E65336]" : "text-[#77746C]"
                    }`}
                  >
                    {category.code}
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-normal">
                    {category.domain}
                  </span>
                </div>
                <span
                  className={`font-mono text-xs ${
                    isActive ? "text-[#F5F1E8]" : "text-[#77746C] group-hover:text-[#20201D]"
                  }`}
                >
                  {category.skills.length} TECHNOLOGIES
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Spec Sheet & Displayed Technology Grid (7 cols) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#DAD4C9] p-6 sm:p-8 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomain.code}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#DAD4C9]">
                <div>
                  <span className="font-mono text-[10px] text-[#77746C] uppercase tracking-widest block">
                    ACTIVE ARCHITECTURAL DOMAIN
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#20201D]">
                    {activeDomain.domain}
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#8A9367] px-2.5 py-1 bg-[#E9E3D8] rounded border border-[#DAD4C9]">
                  {activeDomain.code}
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#5E5B54] font-sans leading-relaxed">
                {activeDomain.description}
              </p>

              {/* Verified Stack Matrix */}
              <div className="space-y-3 pt-2">
                <span className="font-mono text-[10px] text-[#77746C] uppercase tracking-wider block">
                  Core Technologies & Tools
                </span>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {activeDomain.skills.map((skill, sIdx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: sIdx * 0.04 }}
                      className="p-3 bg-[#F5F1E8] border border-[#DAD4C9] rounded flex items-center justify-between group hover:border-[#20201D] transition-colors"
                    >
                      <span className="font-mono text-xs sm:text-sm text-[#20201D] font-medium">
                        {skill}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E65336] opacity-60 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Footnote */}
          <div className="pt-8 mt-8 border-t border-[#DAD4C9] flex items-center justify-between font-mono text-[11px] text-[#77746C]">
            <span>STRICT STACK SPECIFICATION</span>
            <span className="text-[#20201D]">PRODUCTION PROVEN</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalExpertise;
