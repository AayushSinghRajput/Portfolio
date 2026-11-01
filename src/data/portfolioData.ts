import tuitionmasterImg from "@/assets/projects/tuitionmaster.webp";
import smartprepAiImg from "@/assets/projects/smartprep-ai.webp";
import navanexaImg from "@/assets/projects/navanexa.webp";
import bookkeepingImg from "@/assets/projects/bookkeeping.webp";

export interface CaseStudyProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  stack: string[];
  role: string;
  highlights: string[];
  architectureOverview: string;
  keyContributions: string[];
  metricsOrScope: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  isPublicSafeSummary?: boolean;
  schematicType: "marketplace" | "rag-pipeline" | "payment-flow" | "ledger-accounting";
}

export const FEATURED_PROJECTS: CaseStudyProject[] = [
  {
    id: "tuitionmaster",
    slug: "tuitionmaster",
    title: "TuitionMaster",
    category: "EdTech / AI Matchmaking",
    tagline: "Intelligent Marketplace Connecting Students and Tutors",
    description:
      "A full-stack educational marketplace platform connecting students with vetted educators through algorithmic and AI-assisted matchmaking, location-based discovery, and structured scheduling.",
    stack: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "AI Integrations"],
    role: "Founder & Full-Stack Architect",
    image: tuitionmasterImg,
    highlights: [
      "AI Tutor Matching Engine: Profiles, subject matrices, and student requirements mapped automatically",
      "Tutor Discovery & Filtering: Location-aware search and verified instructor qualification filters",
      "Marketplace Architecture: Dedicated portals for students, instructors, and platform administrators",
      "Admin & Review Workflows: Automated verification queues and credential auditing",
    ],
    architectureOverview:
      "Engineered with a high-performance Next.js and TypeScript frontend interfacing with a resilient Node.js / MongoDB backend. The system integrates intelligent vector matching to correlate student learning gaps with instructor subject mastery.",
    keyContributions: [
      "Designed database schemas for student demand, tutor availability schedules, and matching criteria",
      "Implemented secure JWT authentication and role-based access control across multi-tier accounts",
      "Built responsive, accessible interfaces for seamless mobile and desktop bookings",
    ],
    metricsOrScope: "Production platform serving students and educators in Nepal (tuitionmaster.guru)",
    githubUrl: "https://github.com/AayushSinghRajput/tutionmaster",
    liveUrl: "https://tuitionmaster.guru",
    schematicType: "marketplace",
  },
  {
    id: "smartprep-ai",
    slug: "smartprep-ai",
    title: "SmartPrep AI",
    category: "Generative AI / EdTech",
    tagline: "RAG-Powered Entrance Exam Preparation Engine",
    description:
      "A high-throughput exam preparation platform for engineering and medical entrance aspirants, using Retrieval-Augmented Generation (RAG) and ChromaDB to synthesize syllabus-grounded assessments directly from complex textbooks.",
    stack: ["Next.js", "FastAPI", "MongoDB", "OpenAI APIs", "ChromaDB", "Python"],
    role: "AI & Full-Stack Engineer",
    image: smartprepAiImg,
    highlights: [
      "RAG & Vector Retrieval: Dense passage embedding with ChromaDB vector store",
      "Dynamic Assessment Engine: Automated MCQ and mock test generation from ingested study materials",
      "PDF-Based Semantic Retrieval: Ingestion and chunking of high-density technical textbooks",
      "Instant Explanations: Contextual answer justification citing source textbook sections",
    ],
    architectureOverview:
      "Decoupled architecture combining a responsive Next.js frontend with an asynchronous Python / FastAPI backend. Textbooks are parsed, chunked with semantic overlap, embedded via OpenAI text embeddings, and indexed into ChromaDB for low-latency similarity queries.",
    keyContributions: [
      "Designed the RAG ingestion pipeline: PDF parsing, chunking strategy, and vector collection indexing",
      "Engineered prompt-chaining templates to enforce strict zero-hallucination factual bounds",
      "Created asynchronous FastAPI endpoints handling document uploads and real-time streaming answers",
    ],
    metricsOrScope: "Cuts exam prep assessment synthesis time by an estimated 70% compared to manual compilation",
    githubUrl: "https://github.com/AayushSinghRajput/SmartPrep-AI.git",
    liveUrl: "https://smartprepai-three.vercel.app",
    schematicType: "rag-pipeline",
  },
  {
    id: "navanexa",
    slug: "navanexa",
    title: "NavaNexa / nchat",
    category: "Fintech & Payment Systems",
    tagline: "Resilient Financial Workflows & Payment Gateway Integration",
    description:
      "Enterprise digital solutions and high-reliability financial workflow modules engineered at NavaNexa, integrating regional payment gateway APIs, automated KYC verification sequences, and P2P/P2M transaction pipelines.",
    stack: ["React", "Node.js", "REST APIs", "PostgreSQL", "Payment Gateways", "Docker"],
    role: "Full-Stack Developer",
    image: navanexaImg,
    highlights: [
      "Payment Gateway Integration: CityPay and Fonepay API protocols implemented with idempotent webhooks",
      "KYC Onboarding Workflows: Multi-step identity verification pipeline and document validation",
      "P2P & P2M Transaction Flows: Reliable ledger updates and atomic balance operations",
      "Subscription Billing: Recurring payment schedules and transactional event dispatchers",
    ],
    architectureOverview:
      "Constructed strictly around ACID compliance, transactional atomicity, and idempotent API consumers. Gateway webhooks are validated with cryptographic signatures, logged to immutable audit tables, and routed through reconciliation queues.",
    keyContributions: [
      "Architected webhook handlers with cryptographic signature checks and replay attack protection",
      "Standardized error recovery strategies to ensure transactions never terminate in an ambiguous state",
      "Implemented modular React component systems for high-trust financial interfaces",
    ],
    metricsOrScope: "Production enterprise fintech architecture engineered at NavaNexa [Public-safe summary]",
    githubUrl: undefined, // Internal / Proprietary
    liveUrl: "https://www.navanexa.com",
    isPublicSafeSummary: true,
    schematicType: "payment-flow",
  },
  {
    id: "bookkeeping-system",
    slug: "bookkeeping-system",
    title: "Bookkeeping System",
    category: "Financial Software / Backend",
    tagline: "Internal Financial Ledger & Double-Entry Accounting Engine for NavaNexa",
    description:
      "An internal financial software engine engineered for NavaNexa to securely record, track, and balance organizational monetary flows. Designed from first principles around strict double-entry ledger rules, database transaction locks, and append-only journal tables.",
    stack: ["Backend Architecture", "Node.js", "PostgreSQL", "REST APIs", "Docker"],
    role: "Backend Architect & Developer",
    image: bookkeepingImg,
    highlights: [
      "Financial Workflow Design: Invoicing, accounts payable, accounts receivable, and cashflow ledgers",
      "Double-Entry Accounting: Mathematical balance guarantees across debit and credit journal entries",
      "Payment Integrations: Automated statement reconciliation and transaction event processing",
      "Business Logic Hardening: Strict audit logs, state-machine transaction lifecycles, and rollback safety",
    ],
    architectureOverview:
      "A ledger-first backend architecture utilizing PostgreSQL transaction locks and append-only journal tables. Balances are derived from reconciled journal records rather than mutable counters, preventing drift and ensuring complete auditability.",
    keyContributions: [
      "Conducted formal domain research into accounting standards and ledger integrity requirements",
      "Engineered database constraints, foreign-key relationships, and indexing for high-query audit logs",
      "Created RESTful endpoints allowing client applications to generate balance sheets and income reports",
    ],
    metricsOrScope: "Core financial engine ensuring 100% debit-credit ledger parity for internal operations",
    githubUrl: undefined, // Internal Company Platform
    liveUrl: "https://npay.nchat.chat/login",
    isPublicSafeSummary: true,
    schematicType: "ledger-accounting",
  },
];

export interface ExpertiseCategory {
  domain: string;
  code: string;
  description: string;
  skills: string[];
}

export const TECHNICAL_EXPERTISE: ExpertiseCategory[] = [
  {
    domain: "Full-Stack Engineering",
    code: "DOM-01",
    description: "End-to-end interface and application engineering spanning reactive client UIs, high-concurrency API servers, and relational/document databases.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "RESTful APIs",
      "React Native",
    ],
  },
  {
    domain: "AI & Machine Learning",
    code: "DOM-02",
    description: "Production LLM integration, retrieval-augmented generation (RAG), and vector database engineering.",
    skills: [
      "Generative AI",
      "LLM APIs",
      "RAG Pipelines",
      "ChromaDB",
      "Semantic Search",
      "Prompt Engineering",
      "scikit-learn",
      "MobileNet",
    ],
  },
  {
    domain: "Technical SEO & Documentation",
    code: "DOM-03",
    description: "Driving organic discovery through semantic web architecture, JSON-LD schemas, and authoring rigorous developer documentation.",
    skills: [
      "Technical & On-Page SEO",
      "JSON-LD Schema Markup",
      "Core Web Vitals",
      "Google Search Console & GA4",
      "API & REST Documentation",
      "Long-Form Technical Writing",
      "Search Intent Analysis",
    ],
  },
  {
    domain: "Tools & Infrastructure",
    code: "DOM-04",
    description: "Development environments, version control, containerization, and cloud deployment pipelines.",
    skills: ["Git", "GitHub", "Docker", "Linux", "Postman", "AWS", "Vercel"],
  },
];

export interface TimelineEntry {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: "Experience" | "Education" | "Honor";
  badge?: string;
  scope: string;
  highlights: string[];
  techStack: string[];
}

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: "tuitionmaster-role",
    role: "Founder & Product Development",
    organization: "TuitionMaster",
    location: "Kathmandu, Nepal",
    period: "June 2025 – Present",
    type: "Experience",
    badge: "Startup Founder",
    scope: "Conceptualized, engineered, and launched an educational marketplace connecting tutors and students with algorithmic matching.",
    highlights: [
      "Spearheaded product discovery, requirements gathering, and complete full-stack web architecture",
      "Engineered automated matching workflows to align student needs with qualified tutors",
      "Deployed and maintained live production platform at tuitionmaster.guru",
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "AI Integrations"],
  },
  {
    id: "navanexa-role",
    role: "Full-Stack Developer Intern",
    organization: "NavaNexa Tech",
    location: "Kathmandu, Nepal",
    period: "July 2025 – Present",
    type: "Experience",
    badge: "Fintech Workflows",
    scope: "Engineered secure backend integrations, payment gateway adapters, and identity verification sequences for fintech platforms.",
    highlights: [
      "Integrated regional payment gateways (CityPay, Fonepay) with verified webhook processing",
      "Implemented KYC verification flows and multi-step customer onboarding sequences",
      "Architected transactional data schemas ensuring transaction auditability and rollback safety",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "REST APIs", "Gateway Integrations"],
  },
  {
    id: "nexalaris-role",
    role: "Web & Mobile App Development Internship (AI Integration)",
    organization: "Nexalaris Tech Pvt. Ltd.",
    location: "Onsite // Kathmandu, Nepal",
    period: "January 2026 – April 2026",
    type: "Experience",
    badge: "Team Lead",
    scope: "Led Team Sphinx (4 interns) in Agile/Scrum sprints delivering production e-commerce and mobile app QA.",
    highlights: [
      "Built Himalayan Bodhi Spices e-commerce platform with Next.js, TypeScript, and Tailwind CSS",
      "Streamlined layout consistency across 10+ pages, achieving smooth responsive transitions",
      "Performed functional and regression testing on Subhyatra React Native app, logging 20+ release bugs",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "React Native", "REST APIs", "Agile/Scrum"],
  },
  {
    id: "hackathon-janakpur",
    role: "Full-Stack Developer — Civic-Tech Legal Chatbot",
    organization: "Janakpur Hackathon 2.0",
    location: "Janakpur, Nepal",
    period: "December 2025",
    type: "Experience",
    badge: "1st Runner-Up 🏆",
    scope: "Engineered 'Anonymous Incident Reporting and Evidence Vault' featuring an AI legal assistant trained on Nepal's Constitution 2072 within 24 hours.",
    highlights: [
      "Awarded 1st Runner-Up out of all competing national engineering teams",
      "Architected an AI-powered legal chatbot using LangChain and RAG on Nepal Constitution 2072",
      "Implemented anonymous incident reporting system with category-based NGO matching and encrypted vault",
    ],
    techStack: ["React", "FastAPI", "LangChain", "RAG", "MongoDB", "ChromaDB", "Tailwind CSS"],
  },
  {
    id: "bluefox-role",
    role: "Frontend Developer Intern",
    organization: "BlueFox Pvt. Ltd.",
    location: "Kathmandu, Nepal",
    period: "November 2024 – December 2024",
    type: "Experience",
    badge: "Frontend Engineering",
    scope: "Built responsive web interfaces, interactive modules, and optimized client-side state handling.",
    highlights: [
      "Engineered modular React component systems adhering to strict accessibility and responsive standards",
      "Optimized client-side rendering performance and collaborated with backend teams on API contracts",
      "Collaborated on responsive design implementations and cross-browser consistency across core client portals",
    ],
    techStack: ["JavaScript", "React", "CSS3 / Tailwind", "REST APIs"],
  },
  {
    id: "education-degree",
    role: "B.E. in Computer Engineering",
    organization: "Tribhuvan University — IOE Purwanchal Campus",
    location: "Dharan, Nepal",
    period: "2022 – 2026 (Graduated)",
    type: "Education",
    badge: "Degree Foundation",
    scope: "Four-year intensive engineering curriculum covering systems architecture, algorithms, and computational theory.",
    highlights: [
      "Core Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Artificial Intelligence, Computer Networks",
      "Active participant and team lead in campus tech initiatives and competitive hackathons",
      "Strong foundation bridging low-level computer systems with high-level AI applications",
    ],
    techStack: ["C/C++", "Python", "Data Structures", "Algorithms", "AI", "DBMS"],
  },
  {
    id: "aws-fellowship",
    role: "AWS Fellowship 2025 Cohort 1",
    organization: "Amazon Web Services",
    location: "Selective Program",
    period: "October 2025",
    type: "Honor",
    badge: "Fellowship Selection",
    scope: "Selected for prestigious AWS fellowship cohort focused on cloud architecture, scalable distributed systems, and modern AI deployments.",
    highlights: [
      "Selected among competitive applicants based on software engineering and cloud competencies",
      "Explored scalable cloud architectures, serverless design patterns, and containerized deployments",
      "Completed focused curriculum on AWS core services, distributed computing, and cloud-native AI integration",
    ],
    techStack: ["AWS", "Cloud Architecture", "Serverless", "DevOps"],
  },
];

export interface AdditionalProject {
  id: string;
  title: string;
  category: "Web Development" | "AI / ML";
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  badge?: string;
}

export const ADDITIONAL_PROJECTS: AdditionalProject[] = [
  {
    id: "civic-tech-legal-chatbot",
    title: "Civic-Tech Legal Chatbot & Incident Vault",
    category: "AI / ML",
    description: "Hackathon runner-up platform featuring an AI legal assistant trained on Nepal Constitution 2072 using RAG, anonymous incident reporting, and an NGO categorization system.",
    stack: ["RAG", "LLM", "ChromaDB", "FastAPI", "React", "MongoDB"],
    githubUrl: "https://github.com/AayushSinghRajput/Janakpur_Hackathon.git",
    badge: "1st Runner-Up 🏆",
  },
  {
    id: "ai-facial-analysis",
    title: "AI Facial Analysis & Skincare Advisor",
    category: "AI / ML",
    description: "Computer vision and deep learning system that analyzes facial skin types and synthesizes personalized skincare recommendations.",
    stack: ["MobileNet", "TensorFlow", "OpenCV", "Flask", "React", "MongoDB"],
    githubUrl: "https://github.com/AayushSinghRajput/minor-project.git",
    liveUrl: "https://minor-project-frontend-murex.vercel.app/",
    badge: "Academic Minor Project",
  },
  {
    id: "employee-management-system",
    title: "Employee Management System (EMS)",
    category: "Web Development",
    description: "Full-stack HR and workforce platform managing attendance, leave workflows, and automated payslip generation with asynchronous job processing.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Inngest", "JWT"],
    githubUrl: "https://github.com/AayushSinghRajput/EMS.git",
    liveUrl: "https://ems-one-tawny.vercel.app/login",
  },
  {
    id: "greencart",
    title: "GreenCart Grocery E-Commerce",
    category: "Web Development",
    description: "End-to-end grocery e-commerce platform supporting cart management, multi-address fulfillment, and dual payment checkout (Stripe and COD).",
    stack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "Cloudinary"],
    githubUrl: "https://github.com/AayushSinghRajput/GreenCart---Grocery-WebApp.git",
    liveUrl: "https://green-cart-grocery-web-app.vercel.app",
  },
];

