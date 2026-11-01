import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const PILLARS = [
  {
    code: "01",
    label: "Full-Stack Engineering",
    description: "Designing resilient web architectures from scalable client layers to robust server orchestration.",
  },
  {
    code: "02",
    label: "AI-Integrated Applications",
    description: "Embedding RAG retrieval pipelines, LLM agents, and semantic vectors directly into product workflows.",
  },
  {
    code: "03",
    label: "Backend Architecture",
    description: "Constructing high-throughput APIs, transactional consistency, and hardened relational/document data models.",
  },
  {
    code: "04",
    label: "Creative Development",
    description: "Bringing algorithms to life through interactive WebGL, kinetic mathematics, and fluid editorial typography.",
  },
];

export const Introduction: React.FC = () => {
  return (
    <section
      id="intro"
      aria-label="Engineering Philosophy"
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DAD4C9]"
    >
      {/* Section Index Marker */}
      <div className="flex items-center justify-between font-mono text-xs text-[#77746C] tracking-widest uppercase mb-12 sm:mb-16">
        <span>00 // PERSPECTIVE</span>
        <span>ENGINEERING PHILOSOPHY</span>
      </div>

      {/* Editorial Headline Statement */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-20 sm:mb-28">
        <div className="lg:col-span-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-h1 font-serif text-[#20201D] leading-[1.05]"
          >
            "Engineering is more than writing code."
          </motion.h2>
        </div>

        <div className="lg:col-span-4 lg:pt-3">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[#5E5B54] leading-relaxed font-sans"
          >
            I enjoy transforming complex ideas into practical software products. My work spans full-stack development, AI-integrated applications, backend architecture and interactive digital experiences.
          </motion.p>
        </div>
      </div>

      {/* Four Core Pillars (Labels, not generic skill cards) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#DAD4C9]">
        {PILLARS.map((pillar, idx) => (
          <motion.div
            key={pillar.code}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
            className="p-6 bg-[#FFFFFF] border border-[#DAD4C9] hover:border-[#20201D] transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-[#77746C] mb-4">
                <span>PILLAR // {pillar.code}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E65336] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-serif text-2xl text-[#20201D] mb-3 leading-snug group-hover:text-[#E65336] transition-colors">
                {pillar.label}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#5E5B54] leading-relaxed font-sans pt-4 border-t border-[#DAD4C9]/60">
              {pillar.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Introduction;
