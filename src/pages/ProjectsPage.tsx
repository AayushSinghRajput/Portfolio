import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Github, ExternalLink } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { FEATURED_PROJECTS, ADDITIONAL_PROJECTS } from "@/data/portfolioData";
import ProjectDiagrammaticPreview from "@/components/projects/ProjectDiagrammaticPreview";
import Footer from "@/components/Footer";

export const ProjectsPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="Selected Engineering Projects | Aayush Kumar Singh"
        description="Architectural case studies, AI retrieval systems, and full-stack engineering platforms by Aayush Kumar Singh."
        keywords="Projects, TuitionMaster, SmartPrep AI, NavaNexa, FastAPI, React, Civic-Tech, Full Stack, Aayush Kumar Singh"
        canonical="/projects"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
        ]}
      />

      <div className="space-y-16">
        {/* Top Back Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#5E5B54] hover:text-[#20201D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="space-y-4 max-w-2xl border-b border-[#DAD4C9] pb-8">
          <span className="font-mono text-xs text-[#77746C] tracking-widest uppercase block">
            DIRECTORY // ARCHITECTURAL CASE STUDIES
          </span>
          <h1 className="text-h1 font-serif text-[#20201D]">
            Selected Projects
          </h1>
          <p className="text-base sm:text-lg text-[#5E5B54] font-sans leading-relaxed">
            In-depth documentation of production platforms, AI retrieval systems, and fintech infrastructure.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {FEATURED_PROJECTS.map((project, idx) => (
            <article
              key={project.id}
              className="bg-[#FFFFFF] border border-[#DAD4C9] hover:border-[#20201D] transition-colors flex flex-col justify-between overflow-hidden group"
            >
              <div>
                <Link to={`/projects/${project.slug}`} className="block">
                  <ProjectDiagrammaticPreview project={project} />
                </Link>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#77746C] uppercase tracking-wider">
                    <span>CASE {String(idx + 1).padStart(2, "0")}</span>
                    <span className="text-[#8A9367]">{project.category}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-[#20201D] group-hover:text-[#E65336] transition-colors">
                    <Link to={`/projects/${project.slug}`}>
                      {project.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5E5B54] font-sans leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 font-mono text-[10px] text-[#5E5B54] bg-[#E9E3D8] border border-[#DAD4C9] rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-[#DAD4C9]/60">
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-[#20201D] hover:text-[#E65336] transition-colors"
                >
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#5E5B54] hover:text-[#20201D]"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Additional Engineering Works Section */}
        <div className="space-y-8 pt-12 border-t border-[#DAD4C9]">
          <div className="space-y-2">
            <span className="font-mono text-xs text-[#77746C] tracking-widest uppercase block">
              ARCHIVE // ADDITIONAL SOFTWARE & AI WORKS
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#20201D]">
              Civic-Tech, Machine Learning & Systems
            </h2>
            <p className="text-sm text-[#5E5B54] font-sans max-w-2xl">
              Production utility platforms, academic research implementations, and competitive hackathon systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {ADDITIONAL_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="bg-[#FFFFFF] border border-[#DAD4C9] p-6 flex flex-col justify-between hover:border-[#20201D] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#77746C]">
                    <span className="text-[#8A9367]">{project.category}</span>
                    {project.badge && (
                      <span className="px-2 py-0.5 bg-[#E9E3D8] border border-[#DAD4C9] text-[#20201D] rounded font-medium">
                        {project.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#20201D]">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E5B54] font-sans leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 font-mono text-[10px] text-[#5E5B54] bg-[#F5F1E8] border border-[#DAD4C9] rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#DAD4C9]/60 flex items-center gap-4 text-xs font-mono">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#20201D] hover:text-[#E65336] transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#20201D] hover:text-[#E65336] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live App</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
