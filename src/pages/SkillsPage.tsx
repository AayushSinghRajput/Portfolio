import { Link } from "react-router-dom";
import { ArrowLeft, Code, Layers, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Skills from "@/components/Skills";
import { Button } from "@/components/ui/button";

const SkillsPage = () => {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col justify-between">
      <SEOHead
        title="Technical Skills & Arsenal | Aayush Kumar Singh"
        description="Comprehensive technical toolkit of Aayush Kumar Singh: React, Next.js, Node.js, FastAPI, Python, MongoDB, ChromaDB, RAG pipelines, and cloud tools."
        keywords="Skills, React, FastAPI, Python, RAG, ChromaDB, Machine Learning, Full Stack, Aayush Kumar Singh"
        canonical="/skills"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Skills", url: "/skills" },
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

            {/* Reusable Core Skills Component */}
            <Skills />

            {/* Bottom Call to Action */}
            <div className="mt-16 glass-card p-8 rounded-3xl border border-primary/30 text-center relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                Looking for a Specific Tech Stack?
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base mb-6">
                I adapt quickly to modern frameworks, toolchains, and AI models. Check out my projects to see these tools in action.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="gradient-primary text-primary-foreground font-semibold px-6 rounded-xl">
                  <Link to="/projects">Explore Projects</Link>
                </Button>
                <Button asChild variant="outline" className="border-border hover:bg-muted/30 rounded-xl">
                  <Link to="/contact">Discuss Architecture</Link>
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

export default SkillsPage;
