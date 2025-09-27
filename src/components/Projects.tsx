import { ExternalLink, Github, Brain, Briefcase, Music, BarChart3, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Quick.ai",
      description: "QuickAI is a comprehensive AI-powered platform offering a suite of creative and productivity tools designed to simplify content creation, image manipulation, and document analysis.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "Express", "MongoDB","Neon","Clerk","Gemini","Cloudinary"],
      icon: Brain,
      github: "https://github.com/AayushSinghRajput/quickai.git",
      demo: "https://quickai-green.vercel.app/",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "Job Portal",
      description: "A full-stack Job Portal application where users can apply for jobs and recruiters can manage job postings and view applications.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      icon: Briefcase,
      github: "https://github.com/AayushSinghRajput/job-portal.git",
      demo: "https://job-portal-omega-inky.vercel.app/",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      title: "AI Facial Analysis & SkinCare Advisor",
      description: "Personal full-stack project demonstrating comprehensive web development skills with modern technologies and best practices.",
      image: "/api/placeholder/600/400",
      technologies: ["React","Bootstrap",  "JavaScript", "Node.js","Express", "MongoDB" , "Multer","Flask","TensorFlow","OpenCV","MobileNet","Gunicorn"],
      icon: Zap,
      github: "https://github.com/AayushSinghRajput/minor-project.git",
      demo: "https://minor-project-frontend-murex.vercel.app/",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Spotify Clone",
      description: "Spotify Clone is a React application that replicates Spotify's core music streaming functionality with a modern UI. It features music playback controls, album browsing, and responsive design using React and Tailwind CSS.",
      image: "/api/placeholder/600/400",
      technologies: ["React", "TailwindCSS", "CSS3", "JavaScript", "Responsive Design"],
      icon: Music,
      github: "https://github.com/AayushSinghRajput/Spotify_Clone.git",
      demo: "https://spotify-clone-delta-one-51.vercel.app/",
      gradient: "from-green-600 to-green-400"
    },
    {
      id: 5,
      title: "Sentiment Analysis",
      description: "React application with AI/ML integration for real-time sentiment detection and analysis of text data with interactive visualizations.",
      image: "/api/placeholder/600/400",
      technologies: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express","Python","Flask","TextBlob","RESTful API"],
      icon: BarChart3,
      github: "https://github.com/AayushSinghRajput/Sentiment-Analysis.git",
      demo: "https://sentiment-analysis-frontend-gray.vercel.app/",
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
              <a href="https://github.com/AayushSinghRajput" target="_blank" rel="noopener noreferrer">
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