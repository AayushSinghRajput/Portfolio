import { Link } from "react-router-dom";
import { ArrowLeft, User, Sparkles, MapPin, Mail, Award, Rocket, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import profileAvatar from "@/assets/profile_image.png";
import { highlights, skillTags } from "@/assets/assets";

const AboutPage = () => {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col justify-between">
      <SEOHead
        title="About Me | Aayush Kumar Singh"
        description="Learn more about Aayush Kumar Singh — Full Stack Developer & ML Engineer based in Kathmandu, Nepal. Background, engineering philosophy, and expertise."
        keywords="About Aayush Kumar Singh, Full Stack Developer, ML Engineer, Nepal, Software Engineer Bio"
        canonical="/about"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />

      <Navbar />

      <main className="pt-28 pb-20 flex-grow">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Back link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>

            {/* Page Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-cyan-400 border border-primary/20">
                  <User size={28} />
                </div>
              </div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
                About <span className="text-gradient">Me</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
                Full Stack Developer & ML Engineer dedicated to architecting reliable, scalable software
                and intelligent AI-driven applications.
              </p>
              <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
            </div>

            {/* Profile Overview Card */}
            <div className="glass-card p-6 sm:p-10 rounded-3xl border border-border/80 mb-16">
              <div className="grid lg:grid-cols-12 gap-10 items-center">
                
                {/* Photo & Quick Info */}
                <div className="lg:col-span-4 flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
                      <img
                        src={profileAvatar}
                        alt="Aayush Kumar Singh"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="absolute bottom-2 right-2 p-1.5 bg-background rounded-full border border-border shadow-md">
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Aayush Kumar Singh
                  </h2>
                  <p className="text-sm font-medium text-cyan-400 mb-2">
                    Full Stack Dev & ML Engineer
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin size={13} className="text-primary" />
                    Kathmandu, Nepal
                  </p>
                </div>

                {/* Bio text */}
                <div className="lg:col-span-8 space-y-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
                  <p>
                    I am a software engineer with professional internship experience building full-stack
                    web systems using{" "}
                    <span className="text-foreground font-semibold">
                      React, Next.js, Node.js, Express, and FastAPI
                    </span>
                    . My engineering philosophy revolves around clean architecture, scalable database design,
                    and responsive user experiences.
                  </p>

                  <p>
                    Alongside full-stack web development, I build production-ready Machine Learning
                    systems. I have engineered{" "}
                    <span className="text-cyan-400 font-semibold">
                      Retrieval-Augmented Generation (RAG) pipelines, LangChain integrations, and vector database
                      solutions with ChromaDB
                    </span>
                    , including educational tools and legal document search assistants.
                  </p>

                  <p>
                    I graduated with a Bachelor's in Computer Engineering from{" "}
                    <span className="text-foreground font-medium">IOE Purwanchal Campus, Tribhuvan University</span>.
                    I am certified in <span className="text-cyan-400 font-semibold">Supervised & Unsupervised Machine Learning by DataCamp</span>{" "}
                    and was awarded <span className="text-amber-400 font-semibold">1st Runner-Up at Janakpur Hackathon 2.0</span>{" "}
                    for building a civic-tech legal AI assistant.
                  </p>

                  <div className="pt-4 flex flex-wrap gap-2">
                    {skillTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 rounded-xl bg-background/60 border border-border/60 text-xs font-medium text-foreground/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Highlights Grid */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold tracking-tight text-foreground text-center mb-8">
                Key Strengths & Principles
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="glass-card p-6 rounded-2xl border border-border/80 text-center hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                      <item.icon size={22} className="text-primary-foreground" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2 text-base">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action Banner */}
            <div className="glass-card p-8 rounded-3xl border border-primary/30 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                Let's Build Something Exceptional Together
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base mb-6">
                Whether you have an ambitious project, a full-time role, or an AI concept to prototype, I'd love to chat.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="gradient-primary text-primary-foreground font-semibold px-6 rounded-xl">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
                <Button asChild variant="outline" className="border-border hover:bg-muted/30 rounded-xl">
                  <Link to="/projects">View Projects</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
