import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Education from "@/components/Education";
import { Button } from "@/components/ui/button";

const EducationPage = () => {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col justify-between">
      <SEOHead
        title="Education & Credentials | Aayush Kumar Singh"
        description="Academic background in Computer Engineering at Tribhuvan University (IOE Purwanchal Campus), coursework, verified hackathon awards, and continuous learning."
        keywords="Education, Computer Engineering, Tribhuvan University, IOE Purwanchal, Certifications, Aayush Kumar Singh"
        canonical="/education"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Education", url: "/education" },
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

            {/* Core Education Component */}
            <Education />

            {/* Bottom Call to Action */}
            <div className="mt-16 glass-card p-8 rounded-3xl border border-primary/30 text-center relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                Looking for Technical Verification or Transcripts?
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base mb-6">
                Feel free to reach out for complete credential verification, recommendation letters, or project reviews.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="gradient-primary text-primary-foreground font-semibold px-6 rounded-xl">
                  <Link to="/contact">Contact Aayush</Link>
                </Button>
                <Button asChild variant="outline" className="border-border hover:bg-muted/30 rounded-xl">
                  <a href="/resume.pdf" download>Download Resume</a>
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

export default EducationPage;
