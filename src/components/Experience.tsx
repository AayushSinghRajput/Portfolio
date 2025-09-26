import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      title: "Full Stack Developer Intern",
      company: "Tech Solutions Inc.",
      location: "Remote",
      period: "June 2024 - Present",
      type: "Internship",
      description: "Developed and maintained web applications using React, Node.js, and MongoDB. Collaborated with senior developers to implement new features and optimize existing codebase.",
      achievements: [
        "Built 3 full-stack web applications from scratch",
        "Improved application performance by 40% through optimization",
        "Collaborated with a team of 5 developers using Agile methodology"
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express", "Git"],
      gradient: "from-blue-500 to-cyan-500",
      websiteUrl: "https://techsolutions.com"
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "StartupHub",
      location: "Hybrid",
      period: "Jan 2024 - May 2024",
      type: "Part-time",
      description: "Focused on creating responsive and interactive user interfaces for various client projects. Worked closely with designers to implement pixel-perfect designs.",
      achievements: [
        "Delivered 5 responsive websites with 100% client satisfaction",
        "Reduced page load times by 35% through code optimization",
        "Mentored 2 junior developers in React best practices"
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      gradient: "from-purple-500 to-pink-500",
      websiteUrl: "https://startuphub.io"
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      company: "CodeAcademy Pro",
      location: "Online",
      period: "Sep 2023 - Dec 2023",
      type: "Education",
      description: "Intensive full-stack web development program covering modern technologies and industry best practices. Completed multiple projects and received certifications.",
      achievements: [
        "Graduated with honors from intensive 16-week program",
        "Built 10+ projects including full-stack applications",
        "Received certifications in React, Node.js, and Database Design"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
      gradient: "from-green-500 to-emerald-500",
      websiteUrl: "https://codecademy.com"
    }
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience & <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My professional journey and key milestones in full-stack development
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div 
                  key={exp.id}
                  className={`relative fade-in-up stagger-${Math.min(index + 1, 4)}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 w-4 h-4 bg-gradient-primary rounded-full border-4 border-background hidden md:block"></div>

                  {/* Content Card */}
                  <div className="md:ml-20 glass-card p-6 hover:scale-105 transition-transform">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{exp.title}</h3>
                        <div className="flex items-center space-x-2 text-accent font-medium">
                          <span>{exp.company}</span>
                          <ExternalLink size={16} />
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end mt-2 md:mt-0">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                          <Calendar size={16} />
                          <span>{exp.period}</span>
                        </div>
                        <a
                          href={exp.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-accent transition-colors cursor-pointer group"
                        >
                          <MapPin size={16} />
                          <span>{exp.location}</span>
                          <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="mb-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${exp.gradient} text-white`}>
                        {exp.type}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-foreground">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold mb-2 text-foreground">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
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
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 fade-in-up stagger-4">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready for New <span className="text-gradient">Challenges</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                I'm actively seeking new opportunities to grow and contribute to innovative projects.
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
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
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