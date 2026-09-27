import { useState } from "react";
import { GraduationCap, Award, BookOpen, ExternalLink, Calendar, MapPin, Sparkles, CheckCircle, Brain, CheckCircle2 } from "lucide-react";
import janakpurCert from "@/assets/Janakpur.jpg";
import davCert from "@/assets/DAV.jpg";
import nexalarisCert from "@/assets/nexalaris_certificate.png";
import scikitLearnCert from "@/assets/datacamp/supervised_learning_with_scikitlearn.jpg";
import unsupervisedCert from "@/assets/datacamp/unsupervised_learning_with_python.jpg";
import mlFundamentalsCert from "@/assets/datacamp/understanding_machine_learning.jpg";

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category: "AI / ML" | "Hackathon" | "Internship";
  badge: string;
  date: string;
  image: string;
  highlight: string;
  skills: string[];
}

const certificates: CertificateItem[] = [
  {
    id: "scikit-learn",
    title: "Supervised Learning with scikit-learn",
    issuer: "DataCamp",
    category: "AI / ML",
    badge: "DataCamp Certified",
    date: "Verified Credential",
    image: scikitLearnCert,
    highlight: "Trained predictive models, implemented cross-validation, hyperparameter tuning & classification/regression pipelines in Python.",
    skills: ["scikit-learn", "Classification", "Regression", "Model Validation", "Pipelines"],
  },
  {
    id: "unsupervised-learning",
    title: "Unsupervised Learning in Python",
    issuer: "DataCamp",
    category: "AI / ML",
    badge: "DataCamp Certified",
    date: "Verified Credential",
    image: unsupervisedCert,
    highlight: "Clustering with k-means & hierarchical methods, dimensionality reduction with PCA & t-SNE for high-dimensional feature analysis.",
    skills: ["PCA", "k-means Clustering", "t-SNE", "Dimension Reduction", "Feature Extraction"],
  },
  {
    id: "understanding-ml",
    title: "Understanding Machine Learning",
    issuer: "DataCamp",
    category: "AI / ML",
    badge: "DataCamp Certified",
    date: "Verified Credential",
    image: mlFundamentalsCert,
    highlight: "Comprehensive mastery of ML workflows, bias-variance tradeoff, model evaluation metrics, and supervised vs unsupervised architectures.",
    skills: ["ML Foundations", "Model Evaluation", "Bias-Variance", "Workflows"],
  },
  {
    id: "janakpur-hackathon",
    title: "1st Runner-Up — Janakpur Hackathon 2.0",
    issuer: "Janakpur Tech Community / Province 2",
    category: "Hackathon",
    badge: "Award Winner",
    date: "2024",
    image: janakpurCert,
    highlight: "Built an AI-powered legal assistance RAG chatbot on Nepal Constitution 2072 under 48 hours.",
    skills: ["RAG", "FastAPI", "React", "ChromaDB", "LangChain"],
  },
  {
    id: "nexalaris-internship",
    title: "Full Stack Internship Certificate",
    issuer: "Nexalaris Innovations",
    category: "Internship",
    badge: "Professional Experience",
    date: "2024",
    image: nexalarisCert,
    highlight: "Engineered scalable React/Node.js web modules, optimized state management & production REST APIs.",
    skills: ["React", "Node.js", "Express", "REST APIs", "State Management"],
  },
  {
    id: "dav-hackathon",
    title: "DAV Hackathon Participation",
    issuer: "DAV College of Management",
    category: "Hackathon",
    badge: "Hackathon Finalist",
    date: "2023",
    image: davCert,
    highlight: "Collaborated in high-intensity team sprint to deliver full-stack MVP under 24 hours.",
    skills: ["Full Stack MVP", "Team Leadership", "Rapid Prototyping"],
  },
];

const currentlyLearning = [
  { name: "LangGraph & Agentic Workflows", category: "AI / Multi-Agent", status: "Active Building" },
  { name: "Docker & Container Orchestration", category: "DevOps", status: "Hands-on Lab" },
  { name: "HyDE & Advanced RAG Retrieval", category: "Vector Search", status: "Research & Implementation" },
  { name: "High-Throughput FastAPI Architectures", category: "Backend", status: "Benchmarking" },
];

const CATEGORIES = ["All", "AI / ML", "Hackathon", "Internship"] as const;

const Education = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredCertificates =
    activeCategory === "All"
      ? certificates
      : certificates.filter((c) => c.category === activeCategory);

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-medium text-cyan-400 mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic & Honors</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Education & <span className="text-gradient">Certifications</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
              Engineering foundations, verified AI/ML credentials from DataCamp, and competitive hackathon accolades.
            </p>
            <div className="w-20 h-1 bg-gradient-primary mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 mb-16">
            {/* Education Degree Card - Left 7 cols */}
            <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-border/80 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
                      <GraduationCap size={28} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-cyan-400 border border-primary/30">
                        Bachelor's Degree
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-1">
                        B.E. in Computer Engineering
                      </h3>
                      <p className="text-sm font-medium text-accent">
                        Tribhuvan University — IOE Purwanchal Campus
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-6 pb-6 border-b border-border/50">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" />
                    Graduation: 2025
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary" />
                    Dharan, Nepal
                  </span>
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={14} className="text-primary" />
                    Faculty of Engineering
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Core Engineering Coursework
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      "Data Structures & Algorithms",
                      "Database Management Systems",
                      "Object Oriented Analysis & Design",
                      "Artificial Intelligence",
                      "Computer Networks",
                      "Operating Systems",
                    ].map((course, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-background/50 border border-border/50 text-xs font-medium text-foreground/85 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border/40 text-xs text-muted-foreground flex items-center justify-between">
                <span>Strong theoretical basis backed by practical software implementation</span>
                <span className="text-cyan-400 font-mono">IOE / TU</span>
              </div>
            </div>

            {/* Currently Exploring / Continuous Learning - Right 5 cols */}
            <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl border border-border/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Continuous Exploration
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Topics & tools actively being researched & implemented
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {currentlyLearning.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-background/50 border border-border/60 hover:border-amber-400/40 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {item.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.category}
                        </div>
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40 text-xs text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Updated regularly as new technical challenges emerge</span>
              </div>
            </div>
          </div>

          {/* Certifications & Accolades Showcase */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-400" />
                  Verified Credentials & Certificates
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Official certificates from DataCamp, professional software internships, and hackathons
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                      activeCategory === cat
                        ? "bg-primary border-primary text-primary-foreground shadow-sm shadow-primary/30"
                        : "glass-card border-border/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                    <span className="ml-1.5 text-[10px] opacity-75">
                      {cat === "All"
                        ? certificates.length
                        : certificates.filter((c) => c.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="glass-card rounded-2xl border border-border/80 overflow-hidden flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group"
                >
                  <div
                    className="relative h-48 overflow-hidden bg-muted/30 cursor-pointer"
                    onClick={() => setSelectedCert(cert)}
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                    
                    {/* Top Tag */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-black/60 backdrop-blur-md rounded-full text-cyan-300 border border-cyan-500/30">
                        {cert.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white drop-shadow">
                      <span className="font-semibold text-foreground/90">{cert.issuer}</span>
                      <span className="font-mono text-muted-foreground text-[11px] bg-background/70 px-2 py-0.5 rounded backdrop-blur-sm">
                        {cert.date}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        {cert.highlight}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {cert.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md bg-background/60 border border-border/60 text-[10px] font-medium text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors pt-3 border-t border-border/40 mt-auto"
                    >
                      <span>View full certificate</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Modal */}
          {selectedCert && (
            <div
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
              onClick={() => setSelectedCert(null)}
            >
              <div
                className="relative max-w-4xl max-h-[92vh] bg-background border border-border rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-3">
                  <div>
                    <h4 className="text-base font-bold text-foreground">
                      {selectedCert.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {selectedCert.issuer} • {selectedCert.date}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-3 py-1 bg-muted/80 hover:bg-muted text-foreground text-xs font-semibold rounded-full transition-colors"
                  >
                    ✕ Close
                  </button>
                </div>

                <div className="overflow-auto flex items-center justify-center">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Education;
