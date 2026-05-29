import { useState } from "react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { experiences, ExperienceType } from "../assets/assets";

type FilterType = "All" | ExperienceType;

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "All" },
  { label: "Internships", value: "Internship" },
  { label: "Hackathons", value: "Hackathon" },
];

const Experience = () => {
  const [active, setActive] = useState<FilterType>("All");

  const filtered =
    active === "All"
      ? experiences
      : experiences.filter((e) => e.type === active);

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience & <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional internships and hackathon highlights that shaped my
              development as an engineer.
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-3 mb-12 fade-in-up stagger-1">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === f.value
                    ? "gradient-primary text-primary-foreground shadow-primary scale-105"
                    : "glass-card text-muted-foreground hover:text-foreground hover:scale-105"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8 fade-in-up stagger-2">
            {filtered.map((exp) => (
              <div
                key={`${active}-${exp.id}`}
                className="glass-card overflow-hidden flex flex-col hover:scale-[1.02] transition-transform"
              >
                {/* Visual Banner — same pattern as project cards */}
                <div
                  className={`relative h-36 bg-gradient-to-br ${exp.gradient}`}
                >
                  {/* Decorative blobs */}
                  <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full" />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full" />

                  {/* Banner content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    {/* Top row — icon + badges */}
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <exp.icon size={20} className="text-white" />
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="px-3 py-1 text-xs font-semibold bg-black/25 backdrop-blur-sm rounded-full text-white">
                          {exp.type}
                        </span>
                        {exp.badge && (
                          <span className="px-3 py-1 text-xs font-semibold bg-yellow-500/80 backdrop-blur-sm rounded-full text-white">
                            {exp.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom row — title + company */}
                    <div>
                      <h3 className="text-base font-bold text-white leading-snug drop-shadow">
                        {exp.title}
                      </h3>
                      {exp.websiteUrl ? (
                        <a
                          href={exp.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-white/80 text-xs hover:text-white transition-colors mt-0.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {exp.company}
                          <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span className="text-white/80 text-xs">
                          {exp.company}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Project Info */}
                  {exp.projectInfo && (
                    <div className="mb-4 p-4 rounded-lg bg-muted/30 border border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-1">
                        {exp.projectInfo.appName}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {exp.projectInfo.description}
                      </p>
                      {exp.projectInfo.features && (
                        <ul className="space-y-1 mt-3">
                          {exp.projectInfo.features.map((f, i) => (
                            <li
                              key={i}
                              className="text-xs text-muted-foreground flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Certificate */}
                  {exp.certificateImage && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-foreground">
                          Certificate
                        </h4>
                        <button
                          onClick={() =>
                            window.open(
                              exp.certificateImage,
                              "_blank",
                              "noopener noreferrer",
                            )
                          }
                          className="flex items-center gap-1 text-xs text-accent hover:underline"
                        >
                          View full size
                          <ExternalLink size={12} />
                        </button>
                      </div>
                      <img
                        src={exp.certificateImage}
                        alt={`${exp.company} certificate`}
                        className="w-full h-auto rounded-lg border border-border cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                        onClick={() =>
                          window.open(
                            exp.certificateImage,
                            "_blank",
                            "noopener noreferrer",
                          )
                        }
                      />
                    </div>
                  )}

                  {/* Achievements */}
                  <div className="mb-4 flex-grow">
                    <h4 className="text-sm font-semibold text-foreground mb-2">
                      Key Achievements
                    </h4>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((a, i) => (
                        <li
                          key={i}
                          className="text-xs text-muted-foreground flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mt-auto pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 fade-in-up stagger-4">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready for New <span className="text-gradient">Challenges</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Open to full-time roles, freelance projects, and collaborations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg hover:scale-105 transition-transform font-medium"
                >
                  Download Resume
                </a>
                <button
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-6 py-3 border border-border rounded-lg hover:scale-105 transition-transform font-medium"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
