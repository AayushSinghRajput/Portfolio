import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

export const EducationPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="Education & Academic Credentials | Aayush Kumar Singh"
        description="B.E. in Computer Engineering from Tribhuvan University, IOE Purwanchal Campus. Verified credentials and competitive hackathon honors."
        keywords="Education, Computer Engineering, Tribhuvan University, IOE Purwanchal, Certifications, Aayush Kumar Singh"
        canonical="/education"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Education", url: "/education" },
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

        <Education />
      </div>

      <Footer />
    </div>
  );
};

export default EducationPage;
