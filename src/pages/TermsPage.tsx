import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, AlertCircle, Scale, ShieldCheck } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SEOHead
        title="Terms of Service"
        description="Terms of service and acceptable usage guidelines for visiting and interacting with the portfolio website of Aayush Kumar Singh."
        keywords="Terms of Service, Terms and Conditions, Legal, Aayush Kumar Singh"
        canonical="/terms"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms" },
        ]}
      />

      <article className="space-y-12">
        {/* Back Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#5E5B54] hover:text-[#20201D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <header className="border-b border-[#DAD4C9] pb-8 space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#E65336] uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Legal Agreement // Terms &amp; Conditions</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#20201D] tracking-tight leading-tight">
            Terms of Service
          </h1>
          <p className="font-mono text-xs text-[#77746C]">
            Effective Date: November 13, 2026 &bull; Domain: aayushkumarsingh.com.np
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base text-[#403E38] leading-relaxed font-sans">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#20201D] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#77746C]" />
              <span>1. Agreement to Terms</span>
            </h2>
            <p>
              By accessing and using this website (<strong>https://www.aayushkumarsingh.com.np</strong>), you agree to be bound by these Terms of Service, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#20201D] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#77746C]" />
              <span>2. Intellectual Property Rights</span>
            </h2>
            <p>
              The original written articles, project case studies, custom illustrations, design layouts, and software architectures displayed on this website are the proprietary property of <strong>Aayush Kumar Singh</strong> unless otherwise stated (e.g., open-source third-party libraries).
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong>Code Snippets &amp; Tutorials:</strong> Code samples provided in technical blog articles are made available under permissive open-source principles (MIT license style) for educational and reference purposes.
              </li>
              <li>
                <strong>Brand &amp; Identity:</strong> Personal portrait imagery, branding trademarks, and proprietary client showcase assets may not be reproduced or redistributed commercially without prior written consent.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#20201D]">
              3. User Conduct &amp; Acceptable Use
            </h2>
            <p>
              When utilizing this website or submitting contact requests, you agree not to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Use the website in any manner that could disable, overburden, or impair server operations.</li>
              <li>Attempt to gain unauthorized access to any backend endpoints, database systems, or networks.</li>
              <li>Submit malicious, abusive, or automated spam communications through the contact API.</li>
              <li>Scrape or mirror substantial portions of proprietary long-form technical content without attribution.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#20201D] flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#77746C]" />
              <span>4. Disclaimer of Warranties</span>
            </h2>
            <p>
              All materials and information on this site are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While we strive to maintain accurate, up-to-date technical write-ups and system performance metrics, we make no warranties, expressed or implied, regarding completeness, reliability, or suitability for any particular purpose.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#20201D]">
              5. Limitation of Liability
            </h2>
            <p>
              In no event shall Aayush Kumar Singh or associated contributors be liable for any damages (including, without limitation, damages for loss of data, system downtime, or profit) arising out of the use or inability to use the materials or code demonstrations on this website.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#20201D]">
              6. Third-Party Links &amp; Advertising
            </h2>
            <p>
              This site may include external hyperlinks and third-party advertisements (such as Google AdSense). We have no control over the content, privacy policies, or practices of any third-party websites or services. Your interactions with third-party advertisers are solely between you and the respective third party.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#20201D]">
              7. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Nepal, without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3 pt-6 border-t border-[#DAD4C9]">
            <h2 className="font-serif text-2xl text-[#20201D]">
              8. Contact &amp; Questions
            </h2>
            <p>
              If you have any questions regarding these Terms of Service, please reach out via email at{" "}
              <a href="mailto:aayushsinghrajput2002@gmail.com" className="text-[#E65336] underline">
                aayushsinghrajput2002@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default TermsPage;
