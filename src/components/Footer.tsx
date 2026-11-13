import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUp, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";

export const Footer: React.FC = () => {
  const location = useLocation();

  const scrollToTop = () => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (location.pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          const lenis = window.__lenis;
          if (lenis) {
            lenis.scrollTo(element, { offset: -70 });
          } else {
            element.scrollIntoView({ behavior: "smooth" });
          }
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-[#DAD4C9] bg-[#E9E3D8]/40 pt-16 pb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid */}
        <div className="grid md:grid-cols-12 gap-8 items-start justify-between">
          {/* Col 1: Identity & Positioning (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  scrollToTop();
                  if (location.hash) {
                    window.history.pushState(null, "", "/");
                  }
                }
              }}
              className="font-serif text-3xl text-[#20201D] hover:text-[#E65336] transition-colors inline-block"
            >
              Aayush Kumar Singh
            </Link>
            <p className="text-sm text-[#5E5B54] font-sans leading-relaxed max-w-sm">
              Computer Engineering Graduate • Full-Stack Developer • AI-Integrated Software Engineer. Building scalable systems and interactive digital experiences.
            </p>
            <div className="font-mono text-xs text-[#77746C]">
              Kathmandu, Nepal // LAT 27.7172° N, LON 85.3240° E
            </div>
          </div>

          {/* Col 2: Navigation Directory (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono text-[10px] text-[#77746C] uppercase tracking-widest block">
              DIRECTORY // SITEMAP
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="text-[#5E5B54] hover:text-[#20201D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
                >
                  {item.number} {item.name}
                </Link>
              ))}
              <Link
                to="/projects"
                className="text-[#5E5B54] hover:text-[#20201D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
              >
                08 Projects Archive
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E65336] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
              >
                Resume PDF ↗
              </a>
            </div>
          </div>

          {/* Col 3: Direct Connect & Back-to-Top (3 cols) */}
          <div className="md:col-span-3 space-y-4 md:text-right flex flex-col md:items-end justify-between h-full">
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-[#77746C] uppercase tracking-widest block">
                CONNECT
              </span>
              <div className="flex items-center md:justify-end gap-2.5">
                <a
                  href="https://github.com/AayushSinghRajput"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#FFFFFF] border border-[#DAD4C9] rounded hover:border-[#20201D] text-[#20201D] transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/aayush-kumar-singh-ce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#FFFFFF] border border-[#DAD4C9] rounded hover:border-[#20201D] text-[#20201D] transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/AayushSing003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#FFFFFF] border border-[#DAD4C9] rounded hover:border-[#20201D] text-[#20201D] transition-colors"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="mailto:aayushsinghrajput2002@gmail.com"
                  className="p-2 bg-[#FFFFFF] border border-[#DAD4C9] rounded hover:border-[#20201D] text-[#20201D] transition-colors"
                  aria-label="Email Aayush"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#5E5B54] hover:text-[#20201D] border border-[#DAD4C9] bg-[#FFFFFF] px-3 py-1.5 rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#E65336]" />
            </button>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 border-t border-[#DAD4C9] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#77746C]">
          <span>
            © {currentYear} Aayush Kumar Singh. All rights reserved.
          </span>
          <div className="flex items-center gap-4 text-xs font-mono">
            <Link
              to="/privacy-policy"
              className="text-[#5E5B54] hover:text-[#20201D] underline-offset-4 hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-[#DAD4C9]">•</span>
            <Link
              to="/terms"
              className="text-[#5E5B54] hover:text-[#20201D] underline-offset-4 hover:underline transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
