import { useState } from "react";
import { skillCategories, techIcons, bottomStats } from "../assets/assets";
import { Sparkles, Layers, CheckCircle2 } from "lucide-react";

const getProficiencyLabel = (level: number) => {
  if (level >= 85) return { label: "Advanced", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" };
  if (level >= 75) return { label: "Proficient", badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" };
  return { label: "Familiar", badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30" };
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const displayedCategories =
    selectedCategory === "All"
      ? skillCategories
      : skillCategories.filter((cat) => cat.title === selectedCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-medium text-cyan-400 mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>Core Competencies</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Technical <span className="text-gradient">Skills & Arsenal</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              A comprehensive stack spanning modern frontend frameworks, scalable backend systems,
              AI/ML orchestration, technical documentation, and SEO search strategy.
            </p>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Tech Stack Stream */}
          <div className="mb-16">
            <h3 className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-6">
              Primary Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-5xl mx-auto">
              {techIcons.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-105 group"
                >
                  <tech.icon size={20} className={`${tech.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-sm font-medium text-foreground/90 group-hover:text-foreground">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${
                selectedCategory === "All"
                  ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/40"
                  : "glass-card border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              All Domains
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.title}
                onClick={() => setSelectedCategory(cat.title)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  selectedCategory === cat.title
                    ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/40"
                    : "glass-card border-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Skills Category Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="glass-card p-6 rounded-2xl border border-border/70 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} shadow-md`}>
                        <category.icon size={22} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold tracking-tight">{category.title}</h3>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground/70">
                      {category.skills.length} skills
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {category.skills.map((skill, skillIndex) => {
                      const { label, badge } = getProficiencyLabel(skill.level);
                      return (
                        <div
                          key={skillIndex}
                          className="p-2.5 rounded-xl bg-background/40 hover:bg-background/80 border border-border/40 transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-sm font-medium text-foreground/90">
                              {skill.name}
                            </span>
                          </div>
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badge}`}>
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-1.5 text-xs text-muted-foreground/70">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Production & Project Tested</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Stats Metric Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16">
            {bottomStats.map((stat, index) => (
              <div
                key={index}
                className="text-center glass-card p-6 rounded-2xl border border-border/60 hover:border-primary/40 hover:scale-105 transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-gradient mb-2 tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
