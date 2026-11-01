import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import TechnicalExpertise from "@/components/TechnicalExpertise";
import Footer from "@/components/Footer";

export const SkillsPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="Technical Expertise | Aayush Kumar Singh"
        description="Core technical stack of Aayush Kumar Singh: React, Next.js, Node.js, FastAPI, Python, PostgreSQL, ChromaDB, RAG pipelines, and Docker."
        keywords="Skills, Technical Expertise, React, FastAPI, Python, RAG, ChromaDB, Full-Stack, Aayush Kumar Singh"
        canonical="/skills"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Skills", url: "/skills" },
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

        <TechnicalExpertise />
      </div>

      <Footer />
    </div>
  );
};

export default SkillsPage;
