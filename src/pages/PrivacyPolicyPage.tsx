import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, FileText, Globe } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <SEOHead
        title="Privacy Policy"
        description="Privacy policy and data governance practices for the personal website and portfolio of Aayush Kumar Singh (aayushkumarsingh.com.np)."
        keywords="Privacy Policy, Data Protection, Cookie Policy, Google AdSense, GDPR, CCPA, Aayush Kumar Singh"
        canonical="/privacy-policy"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy-policy" },
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
            <Shield className="w-4 h-4" />
            <span>Compliance &amp; Data Governance // Legal</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#20201D] tracking-tight leading-tight">
            Privacy Policy
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
              <span>1. Overview &amp; Scope</span>
            </h2>
            <p>
              This Privacy Policy outlines how <strong>Aayush Kumar Singh</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the website&rdquo;) collects, uses, maintains, and discloses information gathered from visitors to <strong>https://www.aayushkumarsingh.com.np</strong>.
            </p>
            <p>
              We are committed to respecting your privacy, upholding international data protection standards (including the General Data Protection Regulation &ndash; GDPR, and the California Consumer Privacy Act &ndash; CCPA), and maintaining absolute transparency regarding our use of analytics, advertising, and contact forms.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#20201D]">
              2. Information We Collect
            </h2>
            <p>We may collect information from visitors in the following ways:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong>Direct Communications:</strong> When you submit a message via our Contact form, we collect your name, email address, subject, and message content to respond to professional inquiries, freelance projects, or technical collaboration requests.
              </li>
              <li>
                <strong>Log Files &amp; Technical Identifiers:</strong> Like most standard web servers, our hosting infrastructure automatically logs non-personally identifiable information such as browser type, operating system, referring/exit pages, internet protocol (IP) addresses, date/time stamps, and clickstream behavior.
              </li>
              <li>
                <strong>Cookies &amp; Local Storage:</strong> Small text files placed on your device to remember user preferences (such as theme preferences) and support site functionality and analytics.
              </li>
            </ul>
          </section>

          {/* Section 3: Google AdSense & Advertising Cookies */}
          <section className="space-y-4 p-6 bg-[#EBE5DA]/60 border border-[#DAD4C9] rounded-lg">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#20201D]">
              <Eye className="w-4 h-4 text-[#E65336]" />
              <span>Mandatory Disclosure</span>
            </div>
            <h2 className="font-serif text-2xl text-[#20201D]">
              3. Google AdSense &amp; Advertising Cookies
            </h2>
            <p>
              This website uses <strong>Google AdSense</strong>, a third-party advertising service provided by Google Inc., to serve advertisements.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong>Third-Party Vendors &amp; Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&rsquo;s prior visits to this website or other websites across the internet.
              </li>
              <li>
                <strong>Advertising Cookies:</strong> Google&rsquo;s use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our site and/or other sites on the Internet.
              </li>
              <li>
                <strong>Personalized Advertising Opt-Out:</strong> Users may opt out of personalized advertising by visiting{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E65336] underline hover:text-[#20201D]"
                >
                  Google Ads Settings
                </a>
                . Alternatively, you can opt out of a third-party vendor&rsquo;s use of cookies for personalized advertising by visiting{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E65336] underline hover:text-[#20201D]"
                >
                  www.aboutads.info
                </a>{" "}
                or the{" "}
                <a
                  href="https://youronlinechoices.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E65336] underline hover:text-[#20201D]"
                >
                  Your Online Choices
                </a>{" "}
                consumer choice page.
              </li>
            </ul>
          </section>

          {/* Section 4: Analytics */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#20201D] flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#77746C]" />
              <span>4. Google Analytics (GA4)</span>
            </h2>
            <p>
              We use <strong>Google Analytics</strong> (Measurement ID: <code className="font-mono text-xs bg-[#E4DDD1] px-1.5 py-0.5 rounded">G-328NKRX2KM</code>) to understand website traffic, user interactions, and demographic aggregate data. Google Analytics uses first-party cookies to report on user interactions without personally identifying individual visitors.
            </p>
            <p>
              You can prevent Google Analytics from recognizing you on return visits to this site by disabling cookies in your browser or by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E65336] underline hover:text-[#20201D]"
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </p>
          </section>

          {/* Section 5: Data Security */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#20201D] flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#77746C]" />
              <span>5. Data Security &amp; Retention</span>
            </h2>
            <p>
              We implement industry-standard technical and organizational security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal data. All data transmissions are encrypted using Transport Layer Security (TLS / HTTPS).
            </p>
            <p>
              We retain contact inquiries only as long as necessary to fulfill professional communication purposes. We never sell, rent, lease, or trade personal identification information to any outside parties.
            </p>
          </section>

          {/* Section 6: User Rights */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#20201D]">
              6. Your Rights (GDPR &amp; CCPA)
            </h2>
            <p>Depending on your jurisdiction, you have the right to:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Request access to any personal information we hold about you.</li>
              <li>Request correction or deletion of your personal data.</li>
              <li>Object to or restrict the processing of your data.</li>
              <li>Request data portability.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us directly using the details provided below.
            </p>
          </section>

          {/* Section 7: External Links */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#20201D]">
              7. External Links &amp; Third-Party Services
            </h2>
            <p>
              Our portfolio contains links to external websites, including GitHub, LinkedIn, Twitter/X, and external project hosts. We do not operate or control these third-party platforms and are not responsible for their content or privacy practices. We encourage visitors to read the privacy statements of every website they visit.
            </p>
          </section>

          {/* Section 8: Changes */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-[#20201D]">
              8. Changes to This Privacy Policy
            </h2>
            <p>
              We reserve the right to update this policy at any time. When updated, the revised date at the top of this document will be modified accordingly. We encourage users to periodically check this page for any revisions.
            </p>
          </section>

          {/* Section 9: Contact */}
          <section className="space-y-3 pt-6 border-t border-[#DAD4C9]">
            <h2 className="font-serif text-2xl text-[#20201D] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#77746C]" />
              <span>9. Contact Information</span>
            </h2>
            <p>
              If you have any questions or concerns regarding this Privacy Policy or your data, please contact:
            </p>
            <div className="font-mono text-xs sm:text-sm bg-[#EBE5DA] p-4 rounded border border-[#DAD4C9] space-y-1">
              <div><strong>Name:</strong> Aayush Kumar Singh</div>
              <div><strong>Email:</strong> <a href="mailto:aayushsinghrajput2002@gmail.com" className="text-[#E65336] underline">aayushsinghrajput2002@gmail.com</a></div>
              <div><strong>Location:</strong> Kathmandu, Nepal</div>
              <div><strong>Website:</strong> https://www.aayushkumarsingh.com.np</div>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
