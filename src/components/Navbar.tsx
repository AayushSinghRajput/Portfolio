import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X, FileDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_ITEMS } from "@/data/navigation";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Handle escape key to close menu & restore focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        toggleButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false);
    if (location.pathname === "/") {
      e.preventDefault();
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      if (location.hash) {
        window.history.pushState(null, "", "/");
      }
    }
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#") && location.pathname === "/") {
      const targetId = href.replace("/#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        const lenis = window.__lenis;
        if (lenis) {
          lenis.scrollTo(elem, { offset: -70 });
        } else {
          elem.scrollIntoView({ behavior: "smooth" });
        }
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F5F1E8]/90 backdrop-blur-md border-b border-[#DAD4C9] py-3 shadow-sm"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Identity / Monogram */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
            aria-label="Aayush Kumar Singh — Home"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-tight text-[#20201D] group-hover:text-[#E65336] transition-colors">
              Aayush Kumar Singh
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7 text-sm font-sans"
          >
            {NAV_ITEMS.map((item) => {
              const isAnchor = item.href.startsWith("/#");
              return isAnchor && location.pathname === "/" ? (
                <a
                  key={item.name}
                  href={item.href.replace("/", "")}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="relative text-[#5E5B54] hover:text-[#20201D] transition-colors py-1 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
                >
                  <span className="text-[10px] font-mono text-[#77746C] mr-1">
                    {item.number}
                  </span>
                  <span>{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E65336] transition-all duration-200 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="relative text-[#5E5B54] hover:text-[#20201D] transition-colors py-1 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
                >
                  <span className="text-[10px] font-mono text-[#77746C] mr-1">
                    {item.number}
                  </span>
                  <span>{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E65336] transition-all duration-200 group-hover:w-full" />
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Resume & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase text-[#20201D] bg-[#E9E3D8] hover:bg-[#20201D] hover:text-[#F5F1E8] border border-[#DAD4C9] rounded transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
              aria-label="Download Resume (PDF)"
            >
              <FileDown className="w-3.5 h-3.5 text-[#E65336]" aria-hidden="true" />
              <span>Resume</span>
            </a>

            <button
              ref={toggleButtonRef}
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[#20201D] hover:text-[#E65336] border border-[#DAD4C9] bg-[#E9E3D8] rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-panel"
            ref={menuRef}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-30 bg-[#F5F1E8] pt-28 px-6 pb-12 flex flex-col justify-between overflow-y-auto lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="space-y-6">
              <span className="text-xs font-mono tracking-widest text-[#77746C] uppercase">
                Directory / Navigation
              </span>
              <nav className="flex flex-col space-y-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="flex items-baseline justify-between py-2 border-b border-[#DAD4C9] text-[#20201D] hover:text-[#E65336] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
                  >
                    <span className="font-serif text-3xl sm:text-4xl">{item.name}</span>
                    <span className="font-mono text-xs text-[#77746C]">{item.number}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-8 border-t border-[#DAD4C9] flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#5E5B54]">
                <span>Kathmandu, Nepal</span>
                <span className="text-[#8A9367]">Available for roles</span>
              </div>
              <div className="flex gap-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 text-xs font-mono uppercase bg-[#20201D] text-[#F5F1E8] rounded border border-[#20201D]"
                >
                  Download Resume (PDF)
                </a>
                <a
                  href="mailto:aayushsinghrajput2002@gmail.com"
                  className="px-4 py-3 text-xs font-mono uppercase bg-[#E9E3D8] text-[#20201D] rounded border border-[#DAD4C9] flex items-center justify-center"
                  aria-label="Send Email"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;