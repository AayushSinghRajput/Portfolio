import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Briefcase } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Experience from "@/components/Experience";
import { Button } from "@/components/ui/button";

const ExperiencePage = () => {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col justify-between">
      <SEOHead
        title="Experience & Journey | Aayush Kumar Singh"
        description="Professional internship background and hackathon accomplishments of Aayush Kumar Singh. Nexalaris Innovations, Janakpur Hackathon 2.0 Runner-Up, and key engineering impact."
        keywords="Experience, Nexalaris Innovations, Janakpur Hackathon, Full Stack Internship, Aayush Kumar Singh"
        canonical="/experience"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Experience", url: "/experience" },
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

            {/* Core Experience Component */}
            <Experience />

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExperiencePage;
