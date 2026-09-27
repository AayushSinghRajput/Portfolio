import { useState } from "react";
import { ExternalLink, Github, Sparkles, FolderGit2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/assets/assets";

const CATEGORIES = ["All", "Web Development", "AI / ML"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-medium text-cyan-400 mb-4">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Production & Engineering Works</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Full-stack web applications and AI/ML architectures designed for performance,
              reliability, and real-world utility.
            </p>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex justify-center gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                    : "glass-card border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {cat}
                <span className="ml-2 text-[11px] opacity-75">
                  {cat === "All"
                    ? projects.length
                    : projects.filter((p) => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => {
              const hasLiveDemo = project.demo && project.demo !== "#";
              return (
                <div
                  key={`${activeCategory}-${project.id}`}
                  className="glass-card rounded-2xl border border-border/70 overflow-hidden flex flex-col justify-between hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
                >
                  <div>
                    {/* Visual Card Banner with Gradient & Icon */}
                    <div
                      className={`relative h-44 bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between overflow-hidden`}
                    >
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                      
                      {/* Top Badges */}
                      <div className="flex items-center justify-between z-10">
                        <span className="px-3 py-1 text-xs font-semibold bg-black/35 backdrop-blur-md rounded-full text-white border border-white/10">
                          {project.category}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${project.title} on GitHub`}
                              className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white/90 hover:text-white hover:bg-black/50 transition-colors"
                            >
                              <Github size={16} />
                            </a>
                          )}
                          {hasLiveDemo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View live demo of ${project.title}`}
                              className="p-2 bg-black/30 backdrop-blur-md rounded-full text-white/90 hover:text-white hover:bg-black/50 transition-colors"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="z-10 flex items-center gap-3">
                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white shadow-inner">
                          <project.icon size={28} />
                        </div>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold tracking-tight mb-2.5 text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.slice(0, 5).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-background/80 border border-border/60 text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="px-2 py-1 text-[11px] font-medium rounded-lg bg-background/80 border border-border/60 text-muted-foreground">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Footer Card Actions */}
                  <div className="p-6 pt-0 border-t border-border/40 mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${hasLiveDemo ? "bg-emerald-400 animate-pulse" : "bg-muted-foreground/50"}`} />
                      <span className="text-xs font-mono text-muted-foreground">
                        {hasLiveDemo ? "Live Deployment" : "Open Source"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {hasLiveDemo ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs font-semibold text-primary hover:text-primary hover:bg-primary/10 gap-1 px-3 py-1.5 h-auto"
                          asChild
                        >
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            Visit Live
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/30 gap-1 px-3 py-1.5 h-auto"
                          asChild
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            Repository
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Projects;