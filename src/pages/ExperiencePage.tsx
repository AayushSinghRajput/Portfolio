import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Footer from "@/components/Footer";

export const ExperiencePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="Experience & Career Journey | Aayush Kumar Singh"
        description="Professional experience, internships, and engineering leadership of Aayush Kumar Singh: TuitionMaster, NavaNexa Tech, Nexalaris Tech, and BlueFox."
        keywords="Experience, Internships, TuitionMaster, NavaNexa, Nexalaris, BlueFox, Aayush Kumar Singh"
        canonical="/experience"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Experience", url: "/experience" },
        ]}
      />

      <div>
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#5E5B54] hover:text-[#20201D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        <ExperienceTimeline />
      </div>

      <Footer />
    </div>
  );
};

export default ExperiencePage;
