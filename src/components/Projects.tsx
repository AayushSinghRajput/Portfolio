import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
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
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my work spanning full-stack web development and
              AI/ML — built with modern, production-grade technologies.
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex justify-center gap-2 mb-12 fade-in-up">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-gradient-primary border-transparent text-white shadow-lg scale-105"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="ml-2 text-xs opacity-70">
                    {filtered.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <div
                key={`${activeCategory}-${project.id}`}
                className="project-card fade-in-up"
              >
                {/* Project Image / Icon */}
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <project.icon size={64} className="text-white" />
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 text-xs font-semibold bg-black/30 backdrop-blur-sm rounded-full text-white">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/40 transition-colors"
                    >
                      <Github size={18} className="text-white" />
                    </a>
                    {project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/40 transition-colors"
                      >
                        <ExternalLink size={18} className="text-white" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                    {project.demo !== "#" ? (
                      <Button
                        size="sm"
                        className="flex-1 gradient-primary"
                        asChild
                      >
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Demo
                        </a>
                      </Button>
                    ) : (
                      <Button size="sm" className="flex-1" disabled>
                        <ExternalLink size={16} className="mr-2" />
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 fade-in-up stagger-4">
            <p className="text-muted-foreground mb-6">
              Want to see more of my work?
            </p>
            <Button
              size="lg"
              variant="outline"
              className="hover:scale-105 transition-transform"
              asChild
            >
              <a
                href="https://github.com/AayushSinghRajput"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} className="mr-2" />
                View All Projects on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;