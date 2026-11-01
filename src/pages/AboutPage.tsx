import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import About from "@/components/About";
import Footer from "@/components/Footer";

export const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SEOHead
        title="About & Engineering Philosophy | Aayush Kumar Singh"
        description="Learn more about Aayush Kumar Singh — Computer Engineering graduate, Full-Stack Developer & AI Engineer based in Kathmandu, Nepal."
        keywords="About Aayush Kumar Singh, Computer Engineering, Full-Stack Developer, AI Engineer, Nepal"
        canonical="/about"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
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

        <About />
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
