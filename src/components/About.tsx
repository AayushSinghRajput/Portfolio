import { highlights, skillTags } from "../assets/assets";

const About = () => {
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
                  I'm a Full Stack Developer with internship experience building
                  scalable web applications using
                  <span className="text-accent font-medium">
                    {" "}
                    React, Next.js, Node.js, Express, and FastAPI
                  </span>{" "}
                  — with a strong focus on clean architecture, REST API design,
                  and performance optimization.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  I also apply ML Engineering skills to build smarter products —
                  RAG pipelines, LLM-integrated systems, and vector database
                  architectures with ChromaDB, including a virtual teaching
                  assistant and a facial analysis advisor.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a hackathon runner-up, a team lead, and someone who writes
                  maintainable, production-ready code. Bachelor's in Computer
                  Engineering from IOE Purwanchal Campus. Based in Kathmandu,
                  Nepal.
                </p>
              </div>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-3">
                {skillTags.map((skill) => (
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
                  <h3 className="font-semibold mb-2 text-foreground">
                    {item.title}
                  </h3>
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
