import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, FolderGit2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Projects from "@/components/Projects";
import { Button } from "@/components/ui/button";

const ProjectsPage = () => {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col justify-between">
      <SEOHead
        title="Featured Projects | Aayush Kumar Singh"
        description="Explore production projects engineered by Aayush Kumar Singh: SmartPrep AI, Employee Management System, GreenCart, Civic-Tech Legal Chatbot, and Thumblify."
        keywords="Projects, SmartPrep AI, React, FastAPI, Full Stack Projects, Machine Learning, RAG, Aayush Kumar Singh"
        canonical="/projects"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/projects" },
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

            {/* Core Projects Component */}
            <Projects />

            {/* Bottom Call to Action */}
            <div className="mt-16 glass-card p-8 rounded-3xl border border-primary/30 text-center relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                Interested in Custom Engineering or AI Integration?
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base mb-6">
                All source code is available on GitHub with clear documentation and modular architectures.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="gradient-primary text-primary-foreground font-semibold px-6 rounded-xl">
                  <a href="https://github.com/AayushSinghRajput" target="_blank" rel="noopener noreferrer">
                    Visit GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-border hover:bg-muted/30 rounded-xl">
                  <Link to="/contact">Get in Touch</Link>
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

export default ProjectsPage;
