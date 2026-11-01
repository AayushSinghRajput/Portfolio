import { useState } from 'react';
import Hero from '@/components/Hero';
import Introduction from '@/components/Introduction';
import SelectedWork from '@/components/SelectedWork';
import Playground from '@/components/Playground';
import TechnicalExpertise from '@/components/TechnicalExpertise';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import About from '@/components/About';
import FeaturedBlog from '@/components/FeaturedBlog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ArchitecturalLoader from '@/components/loader/ArchitecturalLoader';

const Index = () => {
  const [loading, setLoading] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("aks_loader_seen");
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem("aks_loader_seen", "true");
    setLoading(false);
  };

  return (
    <>
      {loading && <ArchitecturalLoader onComplete={handleLoaderComplete} />}

      {/* Primary Homepage SEO */}
      <SEOHead
        title="Aayush Kumar Singh | Full-Stack Developer & AI Engineer"
        description="Computer Engineering graduate building scalable full-stack applications, AI-powered products, backend systems and interactive digital experiences."
        keywords="Aayush Kumar Singh, Full-Stack Developer, AI Engineer, Computer Engineering, React, Next.js, FastAPI, Node.js, RAG pipelines, ChromaDB, Three.js, Creative Technology, Kathmandu, Nepal"
        canonical="/"
        ogType="website"
      />

      <Hero />
      <Introduction />
      <SelectedWork />
      <Playground />
      <TechnicalExpertise />
      <ExperienceTimeline />
      <About />
      <FeaturedBlog />
      <Contact />
      <Footer />
    </>
  );
};

export default Index;
