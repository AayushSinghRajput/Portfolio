import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import FeaturedBlog from '@/components/FeaturedBlog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const Index = () => {
  useEffect(() => {
    // Add intersection observer for smooth animation triggers
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        (el as HTMLElement).classList.add('animate-fadeInUp');
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground overflow-x-hidden min-h-screen">
      {/* Skip to Main Content Link for Keyboard Accessibility (WCAG) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* SEO Head for Homepage */}
      <SEOHead
        title="Aayush Kumar Singh | Full Stack Developer & ML Engineer"
        description="Full Stack Developer and ML Engineer based in Kathmandu, Nepal. Specialized in React, Next.js, Node.js, FastAPI, RAG pipelines, and Vector DBs. Hackathon runner-up."
        keywords="Aayush Kumar Singh, Full Stack Developer, ML Engineer, React, Next.js, FastAPI, RAG, ChromaDB, Nepal, Portfolio"
        canonical="https://www.aayushkumarsingh.com.np/"
        ogType="website"
      />

      <Navbar />
      
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <FeaturedBlog />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
