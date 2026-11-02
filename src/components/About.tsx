import React from "react";
import { motion } from "framer-motion";
import { MapPin, GraduationCap, Award, CheckCircle2, ArrowUpRight } from "lucide-react";
import profilePhoto from "@/assets/profile_image.webp";

export const About: React.FC = () => {
  return (
    <section
      id="about"
      aria-label="About Aayush Kumar Singh"
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DAD4C9]"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-16 pb-6 border-b border-[#DAD4C9]">
        <div>
          <span className="font-mono text-xs text-[#77746C] tracking-widest uppercase block mb-2">
            05 // BIOGRAPHY
          </span>
          <h2 className="text-h1 font-serif text-[#20201D]">
            Curious by nature. Engineer by practice.
          </h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-[#5E5B54]">
          <MapPin className="w-3.5 h-3.5 text-[#E65336]" />
          <span>Kathmandu, Nepal</span>
        </div>
      </div>

      {/* Main Grid: Portrait Left (4 cols), Bio & Credential Specs Right (8 cols) */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Architectural Portrait Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative border border-[#20201D] bg-[#E9E3D8] p-3 rounded overflow-hidden shadow-xs">
            <div className="aspect-[4/5] overflow-hidden rounded border border-[#DAD4C9] bg-[#20201D]/5">
              <picture>
                <source srcSet="/aayush-kumar-singh.webp" type="image/webp" />
                <img
                  src="/aayush-kumar-singh.jpg"
                  alt="Aayush Kumar Singh — Computer Engineering Graduate and AI Software Engineer"
                  title="Aayush Kumar Singh"
                  className="w-full h-full object-cover object-center grayscale contrast-115 hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  width={400}
                  height={500}
                />
              </picture>
            </div>
            <div className="pt-3 flex items-center justify-between font-mono text-[11px] text-[#5E5B54]">
              <span>AAYUSH KUMAR SINGH</span>
              <span className="text-[#8A9367]">BE. CE // TU</span>
            </div>
          </div>

          <div className="p-4 bg-[#FFFFFF] border border-[#DAD4C9] rounded space-y-2 font-mono text-xs text-[#5E5B54]">
            <div className="flex justify-between border-b border-[#DAD4C9]/60 pb-1.5">
              <span className="text-[#77746C]">STATUS:</span>
              <span className="text-[#20201D] font-medium">Available for Opportunities</span>
            </div>
            <div className="flex justify-between border-b border-[#DAD4C9]/60 pb-1.5">
              <span className="text-[#77746C]">LOCATION:</span>
              <span className="text-[#20201D]">Kathmandu, Nepal</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#77746C]">DEGREE:</span>
              <span className="text-[#20201D]">B.E. Computer Engineering</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio Prose & Engineering Values */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-6 text-base sm:text-lg text-[#5E5B54] leading-relaxed font-sans">
            <p className="text-xl sm:text-2xl text-[#20201D] font-serif leading-snug">
              I am a Computer Engineering graduate from Tribhuvan University, IOE Purwanchal Campus, specializing in full-stack architecture, backend systems, and AI-integrated software.
            </p>

            <p>
              My engineering approach prioritizes architectural clarity and mathematical correctness over superficial complexity. Across professional internships and hackathons, I have built production educational platforms, designed double-entry financial ledgers, and developed retrieval-augmented generation (RAG) pipelines that turn static document corpora into factual, context-aware assistants.
            </p>

            <p>
              Whether orchestrating asynchronous FastAPI endpoints, structuring ACID-compliant PostgreSQL tables, or engineering interactive 3D WebGL simulations, I focus on clean code, thorough accessibility, and real product utility.
            </p>
          </div>

          {/* Academic & Verified Highlights Spec Grid */}
          <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-[#DAD4C9]">
            <div className="p-5 bg-[#FFFFFF] border border-[#DAD4C9] rounded space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#8A9367]">
                <GraduationCap className="w-4 h-4" />
                <span>FORMAL EDUCATION</span>
              </div>
              <h3 className="font-serif text-xl text-[#20201D]">
                B.E. in Computer Engineering
              </h3>
              <p className="text-xs text-[#5E5B54] font-sans leading-relaxed">
                Institute of Engineering, Purwanchal Campus, Tribhuvan University (Graduated 2026). Rigorous foundations in algorithms, DBMS, operating systems, and computer architecture.
              </p>
            </div>

            <div className="p-5 bg-[#FFFFFF] border border-[#DAD4C9] rounded space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#E65336]">
                <Award className="w-4 h-4" />
                <span>COMPETITIVE ACCOLADE</span>
              </div>
              <h3 className="font-serif text-xl text-[#20201D]">
                Hackathon 1st Runner-Up
              </h3>
              <p className="text-xs text-[#5E5B54] font-sans leading-relaxed">
                Janakpur Hackathon 2.0 / UI2AI (December 2025). Built an Anonymous Incident Reporting system with an AI legal assistance bot trained on Nepal's Constitution 2072.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
