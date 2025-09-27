import { 
  Code, 
  Database, 
  Globe, 
  GitBranch, 
  Server, 
  Smartphone,
  Palette,
  Zap
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "JavaScript", level: 80 },
        { name: "React", level: 90 },
        { name: "Next.js", level: 75 }
      ]
    },
    {
      title: "Backend",
      icon: Server,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express", level: 80 },
        { name: "RESTful APIs", level: 75 },
        { name: "Authentication", level: 80 }
      ]
    },
    {
      title: "Database",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "MongoDB", level: 90 },
        { name: "MySQL", level: 75 },
        { name: "Database Design", level: 80 },
        { name: "Data Modeling", level: 70 }
      ]
    },
    {
      title: "Tools & Others",
      icon: GitBranch,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Responsive Design", level: 95 },
        { name: "Problem Solving", level: 85 },
        { name: "Team Collaboration", level: 90 }
      ]
    }
  ];

  const techIcons = [
    { name: "React", icon: Globe, color: "text-blue-400" },
    { name: "Node.js", icon: Server, color: "text-green-400" },
    { name: "MongoDB", icon: Database, color: "text-green-500" },
    { name: "JavaScript", icon: Code, color: "text-yellow-400" },
    { name: "Git", icon: GitBranch, color: "text-orange-400" },
    { name: "CSS3", icon: Palette, color: "text-blue-500" },
    { name: "Express", icon: Zap, color: "text-purple-400" },
    { name: "Next.js", icon: Smartphone, color: "text-gray-300" }
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Technical <span className="text-gradient">Skills</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolkit of modern technologies and frameworks
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
          </div>

          {/* Tech Icons Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6 mb-16 fade-in-up stagger-1">
            {techIcons.map((tech, index) => (
              <div 
                key={index}
                className="flex flex-col items-center space-y-2 skill-card animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`p-4 rounded-lg bg-gradient-to-br ${tech.color} bg-opacity-10`}>
                  <tech.icon size={32} className={tech.color} />
                </div>
                <span className="text-sm font-medium text-center">{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Skills Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 fade-in-up stagger-2">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="glass-card p-6 hover:scale-105 transition-transform">
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <category.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out`}
                          style={{ 
                            width: `${skill.level}%`,
                            animationDelay: `${(categoryIndex * 4 + skillIndex) * 0.1}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 fade-in-up stagger-3">
            {[
              { number: "20+", label: "Projects Completed" },
              { number: "5+", label: "Technologies Mastered" },
              { number: "100%", label: "Client Satisfaction" },
              { number: "24/7", label: "Learning Mode" }
            ].map((stat, index) => (
              <div key={index} className="text-center glass-card p-6 hover:scale-105 transition-transform">
                <div className="text-3xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;