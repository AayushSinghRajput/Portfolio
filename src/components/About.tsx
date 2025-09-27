import { Code, Database, Globe, Zap } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Crafting responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks."
    },
    {
      icon: Database,
      title: "Backend Development", 
      description: "Building robust server-side applications with Node.js, Express, and RESTful API design."
    },
    {
      icon: Globe,
      title: "Full Stack Solutions",
      description: "End-to-end application development from database design to user interface implementation."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Optimizing applications for speed, scalability, and exceptional user experience."
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6 fade-in-up stagger-1">
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a passionate Full Stack Developer with expertise in modern web technologies. 
                  My journey in software development has equipped me with a comprehensive skill set 
                  spanning both frontend and backend development.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I specialize in creating seamless digital experiences using technologies like 
                  <span className="text-accent font-medium"> React, Next.js, Node.js, Express, and MongoDB</span>. 
                  My approach combines clean code practices with user-centered design principles.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Beyond coding, I'm passionate about problem-solving, continuous learning, and 
                  staying up-to-date with the latest industry trends. I believe in writing maintainable, 
                  scalable code that stands the test of time.
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-3">
                {['HTML', 'CSS', 'JavaScript', 'Tailwind CSS','React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Git/GitHub', 'RESTful APIs'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 glass-card text-sm font-medium hover:scale-105 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column - Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-6 fade-in-up stagger-2">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="glass-card p-6 text-center hover:scale-105 transition-transform hover:shadow-accent"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <item.icon size={24} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;