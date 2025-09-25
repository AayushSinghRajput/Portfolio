import { ExternalLink, Github, Brain, Briefcase, Music, BarChart3, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Quick.ai",
      description: "AI-powered web application that leverages machine learning to provide intelligent solutions and automated workflows for enhanced productivity.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "AI/ML", "Express", "MongoDB"],
      icon: Brain,
      github: "https://github.com/aayush-singh-rajput/quick-ai",
      demo: "https://quick-ai-demo.vercel.app",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "Job Portal",
      description: "Full-stack job listing and application platform connecting job seekers with employers through an intuitive interface and powerful search capabilities.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      icon: Briefcase,
      github: "https://github.com/aayush-singh-rajput/job-portal",
      demo: "https://job-portal-demo.vercel.app",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "Minor Project",
      description: "Personal full-stack project demonstrating comprehensive web development skills with modern technologies and best practices.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Express", "MongoDB", "CSS3", "JavaScript"],
      icon: Zap,
      github: "https://github.com/aayush-singh-rajput/minor-project",
      demo: "https://minor-project-demo.vercel.app",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Spotify Clone",
      description: "React-based music streaming interface that replicates Spotify's user experience with playlist management and audio controls.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "CSS3", "JavaScript", "Spotify API", "Responsive Design"],
      icon: Music,
      github: "https://github.com/aayush-singh-rajput/spotify-clone",
      demo: "https://spotify-clone-demo.vercel.app",
      gradient: "from-green-600 to-green-400"
    },
    {
      id: 5,
      title: "Sentiment Analysis",
      description: "React application with AI/ML integration for real-time sentiment detection and analysis of text data with interactive visualizations.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Python", "Machine Learning", "NLP", "Chart.js"],
      icon: BarChart3,
      github: "https://github.com/aayush-singh-rajput/sentiment-analysis",
      demo: "https://sentiment-analysis-demo.vercel.app",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of my recent work in full-stack development, 
              featuring modern web applications built with cutting-edge technologies.
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className={`project-card fade-in-up stagger-${Math.min(index + 1, 4)}`}
              >
                {/* Project Image/Icon */}
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <project.icon size={64} className="text-white" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex space-x-2">
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/40 transition-colors"
                      >
                        <Github size={18} className="text-white" />
                      </a>
                      <a 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/40 transition-colors"
                      >
                        <ExternalLink size={18} className="text-white" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
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
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1 gradient-primary"
                      asChild
                    >
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-2" />
                        Demo
                      </a>
                    </Button>
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
              <a href="https://github.com/aayush-singh-rajput" target="_blank" rel="noopener noreferrer">
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