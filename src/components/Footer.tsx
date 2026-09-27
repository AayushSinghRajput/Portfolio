import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { socialLinks } from "../assets/assets";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Skills", href: "/skills" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Education", href: "/education" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 border-t border-border/80 bg-background/80">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            
            {/* Brand Section */}
            <div className="space-y-4">
              <Link to="/" className="text-2xl font-extrabold text-gradient inline-block">
                Aayush Kumar Singh
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Full Stack Developer & ML Engineer building scalable web
                applications, RAG pipelines, and intelligent software architectures.
              </p>
              <div className="flex space-x-3 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl glass-card border border-border/70 hover:scale-110 hover:border-primary/50 text-foreground transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-foreground">Navigation</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {footerLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-foreground">Get In Touch</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Open to full-time engineering roles, high-impact contract projects, and research collaborations.
              </p>
              <div>
                <a
                  href="mailto:aayushsinghrajput2002@gmail.com"
                  className="text-cyan-400 hover:underline text-sm font-medium"
                >
                  aayushsinghrajput2002@gmail.com
                </a>
              </div>
              <Button asChild size="sm" className="gradient-primary text-primary-foreground font-semibold rounded-xl">
                <Link to="/contact">Let's Work Together</Link>
              </Button>
            </div>

          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border/60 gap-4">
            <div className="text-xs text-muted-foreground">
              © {currentYear} Aayush Kumar Singh. All rights reserved.
            </div>

            {/* Scroll to Top Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="border-border/60 hover:bg-muted/40 rounded-xl text-xs gap-1.5"
            >
              <ArrowUp size={14} />
              <span>Back to Top</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
