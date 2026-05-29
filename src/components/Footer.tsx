import { Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { quickLinks, socialLinks } from "../assets/assets";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gradient">
                Aayush Kumar Singh
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Full Stack Developer & ML Engineer building scalable web
                applications and intelligent AI systems.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg glass-card hover:scale-110 transition-transform hover:shadow-accent"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <div className="space-y-2">
                {quickLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-muted-foreground hover:text-accent transition-colors text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Get In Touch</h4>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Open to full-time roles, freelance projects, and
                  collaborations.
                </p>
                <a
                  href="mailto:aayushsinghrajput2002@gmail.com"
                  className="text-accent hover:text-accent-glow transition-colors"
                >
                  aayushsinghrajput2002@gmail.com
                </a>
              </div>
              <Button
                size="sm"
                className="gradient-primary hover:scale-105 transition-transform"
                onClick={() => scrollToSection("#contact")}
              >
                Let's Work Together
              </Button>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
            <div className="flex items-center space-x-2 text-muted-foreground text-sm mb-4 md:mb-0">
              <span>© {currentYear} Aayush Kumar Singh. Made with</span>
              <span>using React & TypeScript</span>
            </div>

            {/* Scroll to Top Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="hover:scale-105 transition-transform"
            >
              <ArrowUp size={16} className="mr-2" />
              Back to Top
            </Button>
          </div>

          {/* Tech Stack Credits */}
          <div className="text-center mt-8 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Built with React, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
