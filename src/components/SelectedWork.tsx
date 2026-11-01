import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, ArrowRight } from "lucide-react";
import { FEATURED_PROJECTS } from "@/data/portfolioData";
import ProjectDiagrammaticPreview from "./projects/ProjectDiagrammaticPreview";

export const SelectedWork: React.FC = () => {
  return (
    <section
      id="work"
      aria-label="Selected Engineering Work"
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DAD4C9]"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-16 sm:mb-24 pb-6 border-b border-[#DAD4C9]">
        <div>
          <span className="font-mono text-xs text-[#77746C] tracking-widest uppercase block mb-2">
            01 // PORTFOLIO
          </span>
          <h2 className="text-h1 font-serif text-[#20201D]">
            Selected Work
          </h2>
        </div>
        <div className="flex flex-col sm:items-end gap-3 max-w-md">
          <p className="text-sm sm:text-base text-[#5E5B54] font-sans">
            Four flagship case studies representing full-stack architecture, retrieval-augmented intelligence, and high-trust financial systems.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#20201D] hover:text-[#E65336] uppercase tracking-wider transition-colors group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
          >
            <span>View Full Directory (8 Projects)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Editorial Project Entries */}
      <div className="space-y-24 sm:space-y-36">
        {FEATURED_PROJECTS.map((project, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center group"
            >
              {/* Diagram / Visual Preview Column (7 cols) */}
              <div className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="block relative overflow-hidden transition-all duration-300 group-hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
                  aria-label={`View Case Study: ${project.title}`}
                >
                  <ProjectDiagrammaticPreview project={project} />
                </Link>
              </div>

              {/* Text & Metadata Column (5 cols) */}
              <div className={`lg:col-span-5 space-y-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[#77746C] uppercase tracking-wider">
                    <span>PROJECT {String(idx + 1).padStart(2, "0")}</span>
                    <span>•</span>
                    <span className="text-[#8A9367]">{project.category}</span>
                  </div>
                  <h3 className="text-h2 font-serif text-[#20201D] group-hover:text-[#E65336] transition-colors">
                    <Link to={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-xs font-mono text-[#5E5B54] italic">
                    {project.role}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#5E5B54] leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-2 border-t border-[#DAD4C9]/70">
                  <span className="font-mono text-[10px] text-[#77746C] uppercase tracking-wider block">
                    Architectural Highlights
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#20201D] font-sans">
                    {project.highlights.slice(0, 3).map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-[#E65336] font-mono mt-0.5">•</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-mono text-[#5E5B54] bg-[#FFFFFF] border border-[#DAD4C9] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#DAD4C9]">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium tracking-wider uppercase text-[#20201D] hover:text-[#E65336] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#5E5B54] hover:text-[#20201D] transition-colors"
                      aria-label={`${project.title} Live URL`}
                    >
                      <span>Live Site</span>
                      <ArrowUpRight className="w-3 h-3 text-[#E65336]" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-[#5E5B54] hover:text-[#20201D] transition-colors"
                      aria-label={`${project.title} GitHub Repository`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Bottom CTA to Full Project Directory */}
      <div className="pt-16 mt-20 sm:mt-28 border-t border-[#DAD4C9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-[#FFFFFF] p-6 sm:p-8 border rounded-sm">
        <div className="space-y-1">
          <span className="font-mono text-[10px] text-[#77746C] uppercase tracking-widest block">
            EXPANDED DIRECTORY // ARCHIVE
          </span>
          <h3 className="font-serif text-2xl text-[#20201D]">
            Explore All Engineering Works & Civic-Tech
          </h3>
          <p className="text-xs sm:text-sm text-[#5E5B54] font-sans">
            Browse additional full-stack applications, academic AI implementations, and hackathon systems.
          </p>
        </div>

        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#20201D] text-[#F5F1E8] hover:bg-[#E65336] transition-colors font-mono text-xs uppercase tracking-wider rounded shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
        >
          <span>View Complete Archive (8)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default SelectedWork;
