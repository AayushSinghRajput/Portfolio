import {
  Code,
  Database,
  Globe,
  Zap,
  Brain,
  Cpu,
  GitBranch,
  Server,
  Smartphone,
  Palette,
  Terminal,
  Rocket,
  BookOpen,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Sparkles,
  ShoppingCart,
  Users,
  Scale,
  Briefcase,
  Trophy,
  Leaf,
} from "lucide-react";
import nexalarisCertificate from "./nexalaris_certificate.png";
import davCertificate from "./DAV.jpg";
import janakpurCertificate from "./Janakpur.jpg";

export const highlights = [
  {
    icon: Code,
    title: "Frontend Development",
    description:
      "Crafting responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks like Tailwind CSS.",
  },
  {
    icon: Database,
    title: "Backend Development",
    description:
      "Building robust server-side applications with Node.js, Express, FastAPI and RESTful API design.",
  },
  {
    icon: Globe,
    title: "Full Stack Solutions",
    description:
      "End-to-end application development from database design to user interface — including auth, payments, and cloud deployment.",
  },
  {
    icon: Brain,
    title: "ML & AI Engineering",
    description:
      "Building intelligent systems with RAG pipelines, LLM integration, vector databases (ChromaDB), and NLP-powered applications.",
  },
  {
    icon: Cpu,
    title: "AI-Integrated Products",
    description:
      "Shipping production-ready AI features — from facial analysis with MobileNet to legal chatbots trained on real document corpora.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Optimizing applications for speed and scalability — 40% load time improvements via code splitting and query optimization.",
  },
];

export const skillTags = [
  // Languages
  "JavaScript",
  "TypeScript",
  "Python",
  // Frontend
  "React",
  "Next.js",
  "Tailwind CSS",
  "Bootstrap",
  // Backend
  "Node.js",
  "Express",
  "FastAPI",
  // Databases
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "ChromaDB",
  // AI / ML
  "RAG",
  "LLM Integration",
  "NLP",
  "scikit-learn",
  "MobileNet",
  "Semantic Search",
  // Tools & Concepts
  "Git / GitHub",
  "Docker",
  "RESTful APIs",
  "JWT Auth",
  "Vercel",
];

export const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 90 },
      { name: "Next.js", level: 75 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "FastAPI", level: 75 },
      { name: "RESTful APIs", level: 75 },
      { name: "Authentication", level: 80 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "MongoDB", level: 90 },
      { name: "MySQL", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "ChromaDB", level: 70 },
      { name: "Database Design", level: 80 },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: GitBranch,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 70 },
      { name: "Vercel / Render", level: 85 },
      { name: "Agile / Scrum", level: 80 },
      { name: "API Documentation", level: 75 },
    ],
  },
  {
    title: "AI / ML",
    icon: Brain,
    color: "from-violet-500 to-fuchsia-500",
    skills: [
      { name: "RAG Pipelines", level: 75 },
      { name: "LLM Integration", level: 75 },
      { name: "NLP", level: 70 },
      { name: "scikit-learn", level: 65 },
      { name: "MobileNet", level: 65 },
    ],
  },
];

export const techIcons = [
  { name: "React", icon: Globe, color: "text-blue-400" },
  { name: "Node.js", icon: Server, color: "text-green-400" },
  { name: "MongoDB", icon: Database, color: "text-green-500" },
  { name: "JavaScript", icon: Code, color: "text-yellow-400" },
  { name: "TypeScript", icon: Code, color: "text-blue-500" },
  { name: "Python", icon: Terminal, color: "text-yellow-500" },
  { name: "FastAPI", icon: Rocket, color: "text-teal-400" },
  { name: "Next.js", icon: Smartphone, color: "text-gray-300" },
  { name: "Express", icon: Zap, color: "text-purple-400" },
  { name: "Git", icon: GitBranch, color: "text-orange-400" },
  { name: "Tailwind CSS", icon: Palette, color: "text-blue-500" },
  { name: "RAG / LLM", icon: Brain, color: "text-violet-400" },
  { name: "ChromaDB", icon: Cpu, color: "text-fuchsia-400" },
  { name: "scikit-learn", icon: BookOpen, color: "text-orange-300" },
];

export const bottomStats = [
  { number: "2+", label: "Internships Completed" },
  { number: "10+", label: "Projects Shipped" },
  { number: "3+", label: "AI / ML Systems Built" },
  { number: "24/7", label: "Learning Mode" },
];

export const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/AayushSinghRajput",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/aayush-singh-rajput-7314b7279/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:aayushsinghrajput2002@gmail.com",
    label: "Email",
  },
];

export const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "aayushsinghrajput2002@gmail.com",
    link: "mailto:aayushsinghrajput2002@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+977 980-5981168",
    link: "tel:+9779805981168",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Kathmandu, Nepal",
    link: null,
  },
];

export const ContactSocialLinks = [
  {
    icon: Github,
    name: "GitHub",
    url: "https://github.com/AayushSinghRajput",
    color: "hover:text-gray-400",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/aayush-singh-rajput-7314b7279/",
    color: "hover:text-blue-400",
  },
  {
    icon: Twitter,
    name: "Twitter",
    url: "https://x.com/AayushSing003",
    color: "hover:text-sky-400",
  },
];

export type ExperienceType = "Internship" | "Hackathon";

export interface ProjectInfo {
  appName: string;
  description: string;
  features?: string[];
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  type: ExperienceType;
  icon: React.ElementType;
  description: string;
  achievements: string[];
  technologies: string[];
  gradient: string;
  websiteUrl?: string;
  certificateImage?: string;
  badge?: string;
  projectInfo?: ProjectInfo;
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Web & Mobile Application Development Intern",
    company: "Nexalaris Tech Pvt. Ltd.",
    location: "Onsite",
    period: "January 2026 – April 2026",
    type: "Internship",
    icon: Briefcase,
    description:
      "Led a team of 4 interns delivering AI-integrated software in Agile/Scrum sprints. Built a production e-commerce platform and contributed to mobile app QA across multiple release cycles.",
    achievements: [
      "Led Team Sphinx (4 interns) with daily standups and stakeholder communication",
      "Built Himalayan Bodhi Spices e-commerce platform with Next.js, TypeScript, Tailwind CSS, and Framer Motion",
      "Reduced layout inconsistencies across 10+ pages and improved mobile responsiveness",
      "Designed and documented REST API endpoints for the platform",
      "Performed UI, functional, and regression testing on Subhyatra mobile app (React Native), logging 20+ bugs across 3 release cycles",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Native",
      "REST APIs",
      "Git",
      "Agile/Scrum",
    ],
    gradient: "from-violet-500 to-purple-500",
    websiteUrl: "https://nexalaris.com",
    certificateImage: nexalarisCertificate,
  },
  {
    id: 2,
    title: "Frontend Developer Intern",
    company: "BlueFox Pvt. Ltd.",
    location: "Onsite",
    period: "November 2024 – December 2024",
    type: "Internship",
    icon: Briefcase,
    description:
      "Built a full-stack web application from scratch and improved performance by 40% through code splitting and query optimization. Designed and documented REST APIs for a 3-developer team.",
    achievements: [
      "Built 1 full-stack web application from scratch using React, Node.js, Express, and MongoDB",
      "Improved page load performance by 40% via code splitting and query optimization",
      "Designed and documented REST APIs for a 3-developer team",
      "Managed codebase via Git branching and code reviews",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
      "Git",
    ],
    gradient: "from-blue-500 to-cyan-500",
    websiteUrl: "https://bluefox.com.np/about/",
  },
  {
    id: 3,
    title: "Full-Stack Developer",
    company: "Janakpur Hackathon 2.0",
    location: "Onsite",
    period: "December 2025",
    type: "Hackathon",
    icon: Trophy,
    badge: "1st Runner Up 🏆",
    description:
      "Built 'Anonymous Incident Reporting and Evidence Vault' — a civic-tech platform empowering citizens to report incidents anonymously and connect with relevant NGOs, featuring an AI legal chatbot powered by RAG and Nepal's Constitution 2072.",
    achievements: [
      "Achieved 1st Runner Up position among all participating teams",
      "Built a complete full-stack web application within 24 hours",
      "Implemented an AI-powered legal chatbot using LangChain and RAG",
      "Developed anonymous reporting system with category-based NGO matching",
    ],
    technologies: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "FastAPI",
      "LangChain",
      "RAG",
      "Git",
    ],
    gradient: "from-purple-500 to-pink-500",
    websiteUrl: "https://www.facebook.com/profile.php?id=61580937292918",
    certificateImage: janakpurCertificate,
    projectInfo: {
      appName: "Anonymous Incident Reporting and Evidence Vault",
      description:
        "A secure platform for citizens to report incidents anonymously, submit evidence, and get matched with NGOs based on incident category. Includes an AI legal chatbot trained on Nepal's Constitution 2072 and a real-time notification system.",
      features: [
        "Anonymous incident reporting with evidence upload",
        "AI-powered legal chatbot based on Nepal Constitution 2072",
        "NGO directory categorized by expertise areas",
        "Secure communication channel between reporters and NGOs",
        "Real-time notification system",
        "Admin dashboard for report management",
      ],
    },
  },
  {
    id: 4,
    title: "Mobile App Developer",
    company: "DAV Codefest 2025",
    location: "Onsite",
    period: "July 2025",
    type: "Hackathon",
    icon: Leaf,
    badge: "Top 15",
    description:
      "Built SMART KRISHI — an AI-powered agriculture platform for farmers with real-time crop tracking, a digital marketplace, machinery rental, and crop disease prediction via image analysis.",
    achievements: [
      "Built a full mobile application using React Native within hackathon timeframe",
      "Implemented AI-based crop disease prediction via image uploads",
      "Designed a real-time crop monitoring dashboard for farmers",
      "Showcased to industry judges and received positive feedback",
    ],
    technologies: [
      "React Native",
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
      "Git",
    ],
    gradient: "from-green-500 to-emerald-500",
    certificateImage: davCertificate,
    projectInfo: {
      appName: "SMART KRISHI",
      description:
        "An AI-driven agriculture platform giving farmers real-time crop growth tracking, timely insights, a digital marketplace to connect directly with buyers, machinery rental services, and AI-based crop disease prediction through image uploads.",
    },
  },
];

export const projects = [
  // ── Web Development ──────────────────────────────────────────
  {
    id: 1,
    title: "Employee Management System",
    description:
      "Full-stack HR platform covering attendance, leave workflows, and automated payslip generation for 50+ employee profiles, reducing manual HR effort by an estimated 60%.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Inngest",
      "JWT",
      "TypeScript",
      "Tailwind CSS",
    ],
    icon: Users,
    github: "https://github.com/AayushSinghRajput/EMS.git",
    demo: "https://ems-one-tawny.vercel.app/login",
    gradient: "from-blue-500 to-indigo-500",
    category: "Web Development",
  },
  {
    id: 2,
    title: "GreenCart",
    description:
      "Full-stack e-commerce grocery platform with end-to-end shopping workflows including cart management, multi-address support, and dual payment processing (Cash on Delivery + Stripe).",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Stripe",
      "Cloudinary",
      "Tailwind CSS",
    ],
    icon: ShoppingCart,
    github: "https://github.com/AayushSinghRajput/GreenCart---Grocery-WebApp.git",
    demo: "https://green-cart-grocery-web-app.vercel.app",
    gradient: "from-emerald-500 to-teal-500",
    category: "Web Development",
  },
  {
    id: 3,
    title: "Thumblify",
    description:
      "React app integrating Google Gemini for real-time AI thumbnail generation, interactive previews, style/color controls, and Cloudinary-backed storage and management.",
    technologies: [
      "React",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Gemini",
      "Cloudinary",
    ],
    icon: Sparkles,
    github: "https://github.com/AayushSinghRajput/Thumblify.git",
    demo: "https://thumblify-six-flame.vercel.app",
    gradient: "from-violet-500 to-fuchsia-500",
    category: "Web Development",
  },

  // ── AI / ML ───────────────────────────────────────────────────
  {
    id: 4,
    title: "SmartPrep AI",
    description:
      "Full-stack learning platform with a Next.js frontend and FastAPI backend supporting PDF uploads, multi-document ingestion, automated assessments, and RAG-powered study material generation — cutting manual study prep time by 70%.",
    technologies: [
      "Next.js",
      "FastAPI",
      "MongoDB",
      "ChromaDB",
      "RAG",
      "LLM",
      "NLP",
      "Cloudinary",
    ],
    icon: BookOpen,
    github: "https://github.com/AayushSinghRajput/SmartPrep-AI.git",
    demo: "#",
    gradient: "from-amber-500 to-orange-500",
    category: "AI / ML",
  },
  {
    id: 5,
    title: "AI Facial Analysis & Skincare Advisor",
    description:
      "AI-powered facial analysis system that detects skin types (oily, dry, acne-prone, healthy) from image input and generates personalised skincare and cosmetic product recommendations.",
    technologies: [
      "React",
      "Bootstrap",
      "Node.js",
      "Express",
      "MongoDB",
      "Flask",
      "TensorFlow",
      "OpenCV",
      "MobileNet",
    ],
    icon: Zap,
    github: "https://github.com/AayushSinghRajput/minor-project.git",
    demo: "https://minor-project-frontend-murex.vercel.app/",
    gradient: "from-green-500 to-emerald-500",
    category: "AI / ML",
  },
  {
    id: 6,
    title: "Civic-Tech Legal Chatbot",
    description:
      "Hackathon runner-up project — a civic-tech platform featuring an AI legal chatbot trained on Nepal Constitution 2072 using RAG, real-time notifications, and an NGO categorisation system for incident response.",
    technologies: ["RAG", "LLM", "ChromaDB", "Next.js", "FastAPI", "MongoDB"],
    icon: Scale,
    github: "https://github.com/AayushSinghRajput/Janakpur_Hackathon.git",
    demo: "#",
    gradient: "from-rose-500 to-pink-600",
    category: "AI / ML",
  },
];
