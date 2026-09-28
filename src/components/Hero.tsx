import { useState, useEffect } from "react";
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Terminal, FileText, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import profileAvatar from "@/assets/profile_image.png";

const ROLES = [
  "Full Stack Developer",
  "AI & ML Engineer",
  "Technical Writer & SEO Specialist",
  "FastAPI & RAG Builder",
  "Problem Solver & Innovator",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20 pb-12 sm:pt-24 md:pt-28"
    >
      {/* Dynamic Aurora & Mesh Background */}
      <div className="absolute inset-0 bg-gradient-hero"></div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.12, 0.22, 0.12],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 sm:w-[450px] sm:h-[450px] bg-accent/20 rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(5,10,24,0.7)_80%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Terminal whoami badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-xs sm:text-sm font-mono text-cyan-400 shadow-sm shadow-primary/20"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>$ whoami</span>
            <span className="text-muted-foreground">→</span>
            <span className="text-foreground font-semibold">aayush_kumar_singh</span>
            <span className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse ml-0.5" />
          </motion.div>

          {/* Profile Image with Glowing Aura & 3D Tilt Hover */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="mb-8 relative inline-block group"
          >
            <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-accent to-purple-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500 group-hover:blur-lg animate-pulse" />
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-background shadow-2xl transition-transform duration-300 group-hover:scale-105">
              <img
                src={profileAvatar}
                alt="Aayush Kumar Singh - Full Stack Developer & ML Engineer"
                className="w-full h-full object-cover object-center transform transition duration-500 group-hover:scale-110"
                loading="eager"
              />
            </div>
            {/* Status dot */}
            <div className="absolute bottom-1 right-2 sm:bottom-2 sm:right-3 flex items-center justify-center p-1 bg-background rounded-full">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-background"></span>
              </span>
            </div>
          </motion.div>

          {/* Main Headings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
              <span className="text-gradient">Aayush Kumar Singh</span>
            </h1>

            {/* Cycling Role with AnimatePresence */}
            <div className="h-10 sm:h-12 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="text-xl sm:text-2xl md:text-3xl font-semibold text-accent flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />
                  <span>{ROLES[roleIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed pt-2">
              Full Stack Developer crafting scalable web applications with{" "}
              <span className="text-foreground font-medium">React, Next.js, Node.js & FastAPI</span> — 
              extended into ML Engineering with{" "}
              <span className="text-cyan-400 font-medium">RAG pipelines, LangChain, & Vector DBs</span>. 
              Hackathon Runner-Up based in Kathmandu, Nepal.
            </p>
          </motion.div>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center items-center pt-8"
          >
            <Button
              size="lg"
              className="gradient-primary text-primary-foreground font-semibold px-8 py-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/30 group"
              onClick={() => scrollToSection("#projects")}
            >
              <Code2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 rounded-xl font-semibold border-primary/30 bg-background/50 backdrop-blur-sm hover:bg-primary/10 hover:border-primary/60 hover:scale-105 transition-all duration-300"
              onClick={() => scrollToSection("#contact")}
            >
              Get in Touch
            </Button>
          </motion.div>

          {/* Social Dock Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex justify-center items-center space-x-5 pt-8"
          >
            <a
              href="https://github.com/AayushSinghRajput"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="p-3 rounded-full glass-card hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:scale-125 hover:text-cyan-400 transition-all duration-300 shadow-md"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/aayush-kumar-singh-ce"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="p-3 rounded-full glass-card hover:border-blue-400/50 hover:bg-blue-500/10 hover:scale-125 hover:text-blue-400 transition-all duration-300 shadow-md"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="mailto:aayushsinghrajput2002@gmail.com"
              aria-label="Send email"
              className="p-3 rounded-full glass-card hover:border-red-400/50 hover:bg-red-500/10 hover:scale-125 hover:text-red-400 transition-all duration-300 shadow-md"
            >
              <Mail size={22} />
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="pt-12 hidden sm:flex justify-center cursor-pointer"
            onClick={() => scrollToSection("#about")}
          >
            <div className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-foreground transition-colors">
              <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
              <ArrowDown size={16} />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;