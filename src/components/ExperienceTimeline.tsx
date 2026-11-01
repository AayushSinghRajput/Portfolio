import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, MapPin, Award, Briefcase, GraduationCap } from "lucide-react";
import { TIMELINE_ENTRIES, TimelineEntry } from "@/data/portfolioData";

export const ExperienceTimeline: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>("tuitionmaster-role");
  const [filter, setFilter] = useState<"All" | "Experience" | "Education" | "Honor">("All");

  const filteredEntries = filter === "All"
    ? TIMELINE_ENTRIES
    : TIMELINE_ENTRIES.filter((e) => {
        if (filter === "Experience") return e.type === "Experience" || e.id === "hackathon-janakpur";
        if (filter === "Honor") return e.type === "Honor" || e.id === "hackathon-janakpur";
        return e.type === filter;
      });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getIcon = (type: TimelineEntry["type"]) => {
    switch (type) {
      case "Education":
        return <GraduationCap className="w-4 h-4 text-[#8A9367]" />;
      case "Honor":
        return <Award className="w-4 h-4 text-[#E65336]" />;
      default:
        return <Briefcase className="w-4 h-4 text-[#20201D]" />;
    }
  };

  return (
    <section
      id="journey"
      aria-label="Experience and Career Timeline"
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DAD4C9]"
    >
      {/* Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-16 pb-6 border-b border-[#DAD4C9]">
        <div>
          <span className="font-mono text-xs text-[#77746C] tracking-widest uppercase block mb-2">
            03 // CHRONOLOGY
          </span>
          <h2 className="text-h1 font-serif text-[#20201D]">
            Experience & Journey
          </h2>
        </div>
        
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {(["All", "Experience", "Education", "Honor"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 font-mono text-xs uppercase tracking-wider rounded transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336] ${
                filter === tab
                  ? "bg-[#20201D] text-[#F5F1E8] border border-[#20201D]"
                  : "bg-[#FFFFFF] text-[#5E5B54] border border-[#DAD4C9] hover:border-[#20201D]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Expandable Architectural Timeline */}
      <div className="space-y-4">
        {filteredEntries.map((entry, idx) => {
          const isExpanded = expandedId === entry.id;

          return (
            <div
              key={entry.id}
              className={`border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? "bg-[#FFFFFF] border-[#20201D] shadow-sm"
                  : "bg-[#F5F1E8] border-[#DAD4C9] hover:border-[#20201D]"
              }`}
            >
              {/* Header Button */}
              <button
                type="button"
                onClick={() => toggleExpand(entry.id)}
                className="w-full p-6 text-left flex items-start sm:items-center justify-between gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
                aria-expanded={isExpanded}
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="p-2.5 rounded bg-[#E9E3D8] border border-[#DAD4C9] flex-shrink-0 mt-1 sm:mt-0">
                    {getIcon(entry.type)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-serif text-xl sm:text-2xl text-[#20201D] font-normal">
                        {entry.role}
                      </span>
                      {entry.badge && (
                        <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#E9E3D8] text-[#5E5B54] border border-[#DAD4C9]">
                          {entry.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#5E5B54]">
                      <span className="text-[#20201D] font-medium">{entry.organization}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#77746C]" />
                        {entry.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="hidden md:inline font-mono text-xs text-[#77746C]">
                    {entry.period}
                  </span>
                  <div className={`p-1.5 rounded transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-4 h-4 text-[#20201D]" />
                  </div>
                </div>
              </button>

              {/* Expandable Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-[#DAD4C9]/70 space-y-4">
                      <div className="md:hidden font-mono text-xs text-[#77746C] pt-2">
                        {entry.period}
                      </div>

                      <p className="text-sm sm:text-base text-[#5E5B54] font-sans leading-relaxed">
                        {entry.scope}
                      </p>

                      {/* Accomplishments */}
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] text-[#77746C] uppercase tracking-wider block">
                          Key Deliverables
                        </span>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-[#20201D] font-sans">
                          {entry.highlights.map((hl, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2">
                              <span className="text-[#E65336] font-mono mt-0.5">•</span>
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {entry.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 font-mono text-[10px] text-[#5E5B54] bg-[#E9E3D8] border border-[#DAD4C9] rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
