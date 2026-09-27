import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col justify-between">
      <SEOHead
        title="Contact Me | Aayush Kumar Singh"
        description="Get in touch with Aayush Kumar Singh for full-time software engineering roles, contract consulting, or AI/ML collaborations."
        keywords="Contact Aayush Kumar Singh, Hire Full Stack Developer, Hire ML Engineer, Nepal"
        canonical="/contact"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
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

            {/* Core Contact Component */}
            <Contact />

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
