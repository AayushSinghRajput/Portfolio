import React, { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github, CheckCircle2, Layers, Cpu, Database } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { FEATURED_PROJECTS, CaseStudyProject } from "@/data/portfolioData";
import ProjectDiagrammaticPreview from "@/components/projects/ProjectDiagrammaticPreview";

export const ProjectCaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const projectIndex = useMemo(() => {
    return FEATURED_PROJECTS.findIndex((p) => p.slug === slug);
  }, [slug]);

  const project = FEATURED_PROJECTS[projectIndex];

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const nextProject = FEATURED_PROJECTS[(projectIndex + 1) % FEATURED_PROJECTS.length];

  return (
    <article className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SEOHead
        title={`${project.title} — Architectural Case Study`}
        description={project.description}
        canonical={`/projects/${project.slug}`}
        keywords={`${project.title}, ${project.category}, ${project.stack.join(", ")}, Aayush Kumar Singh`}
      />

      {/* Back Navigation */}
      <div className="mb-10">
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#5E5B54] hover:text-[#20201D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Selected Work</span>
        </Link>
      </div>

      {/* Editorial Header */}
      <header className="space-y-6 pb-12 border-b border-[#DAD4C9]">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase text-[#77746C]">
          <span className="px-2 py-0.5 bg-[#E9E3D8] text-[#5E5B54] rounded border border-[#DAD4C9]">
            {project.category}
          </span>
          <span>//</span>
          <span>Role: {project.role}</span>
        </div>

        <h1 className="text-h1 font-serif text-[#20201D]">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-[#5E5B54] leading-relaxed max-w-3xl font-sans">
          {project.tagline}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="arch-button-primary"
            >
              <span>Visit Live Production</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="arch-button-secondary"
            >
              <Github className="w-4 h-4" />
              <span>Inspect Source Code</span>
            </a>
          )}
        </div>
      </header>

      {/* Primary Architectural Schematic */}
      <div className="my-12 sm:my-16">
        <div className="border border-[#DAD4C9] rounded shadow-xs overflow-hidden">
          <ProjectDiagrammaticPreview project={project} />
        </div>
      </div>

      {/* Case Study Details Grid */}
      <div className="space-y-16">
        {/* Section 1: Overview */}
        <section className="space-y-4">
          <span className="font-mono text-xs text-[#77746C] tracking-widest uppercase block">
            01 // CONTEXT & PROBLEM
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#20201D]">
            System Overview
          </h2>
          <p className="text-base sm:text-lg text-[#5E5B54] leading-relaxed font-sans">
            {project.description}
          </p>
        </section>

        {/* Section 2: Architecture */}
        <section className="space-y-4 pt-8 border-t border-[#DAD4C9]">
          <span className="font-mono text-xs text-[#77746C] tracking-widest uppercase block">
            02 // ARCHITECTURE OVERVIEW
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#20201D]">
            Technical Infrastructure & Data Flow
          </h2>
          <p className="text-base sm:text-lg text-[#5E5B54] leading-relaxed font-sans">
            {project.architectureOverview}
          </p>
        </section>

        {/* Section 3: Engineering Highlights */}
        <section className="space-y-6 pt-8 border-t border-[#DAD4C9]">
          <span className="font-mono text-xs text-[#77746C] tracking-widest uppercase block">
            03 // KEY HIGHLIGHTS
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#20201D]">
            Core Deliverables & Capabilities
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#FFFFFF] border border-[#DAD4C9] rounded space-y-2"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-[#E65336]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SPEC-{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <p className="text-sm text-[#20201D] leading-relaxed font-sans">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Contributions & Technology */}
        <section className="space-y-6 pt-8 border-t border-[#DAD4C9]">
          <span className="font-mono text-xs text-[#77746C] tracking-widest uppercase block">
            04 // CONTRIBUTIONS & STACK
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#20201D]">
            Engineering Scope
          </h2>
          <ul className="space-y-2.5 text-base text-[#5E5B54] font-sans">
            {project.keyContributions.map((contrib, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#E65336] font-mono mt-1">•</span>
                <span>{contrib}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <span className="font-mono text-xs text-[#77746C] uppercase tracking-wider block mb-2">
              Technology Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 font-mono text-xs text-[#20201D] bg-[#E9E3D8] border border-[#DAD4C9] rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Next Project Footer */}
      <footer className="mt-24 pt-12 border-t border-[#DAD4C9] flex flex-wrap items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-[#77746C] uppercase tracking-wider block mb-1">
            Next Case Study
          </span>
          <Link
            to={`/projects/${nextProject.slug}`}
            className="text-2xl sm:text-3xl font-serif text-[#20201D] hover:text-[#E65336] transition-colors"
          >
            {nextProject.title} →
          </Link>
        </div>

        <Link
          to="/#work"
          className="arch-button-secondary"
        >
          View All Work
        </Link>
      </footer>
    </article>
  );
};

export default ProjectCaseStudyPage;
