export const profile = {
  name: "Aizat Taqqiyudin",
  firstName: "Aizat",
  lastName: "Taqqiyudin",
  role: "Software Developer",
  location: "Putrajaya, Malaysia",
  email: "aizattaqq@gmail.com",
  phone: "+6017 284 0608",
  phoneHref: "tel:+60172840608",
  cv: "/Aizat-Taqqiyudin-CV.pdf",
  github: "https://github.com/ixtaqq",
  linkedin: "https://www.linkedin.com/in/aizattaqq/",
  photo: "/aizat.jpg",
  currentCompany: "GFIS (M) Sdn. Bhd.",
  tagline:
    "Crafting intuitive interfaces and clean code — building user-friendly, accessible, and meaningful products.",
} as const;

export const about = {
  paragraphs: [
    "I'm a software developer with a Bachelor of Computer Science (Software Engineering) and hands-on industry experience across multiple programming languages.",
    "I live at the intersection of code and capital—passionate about building clean, efficient software while exploring the world of investing and financial markets. Whether it's shipping a feature or analyzing a market trend, I bring curiosity and analytical thinking to everything I do.",
  ],
} as const;

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  badge: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    role: "UI/UX Designer",
    company: "GFIS (M) Sdn. Bhd.",
    location: "Cyberjaya, Malaysia",
    period: "Sep 2022 – Nov 2024",
    duration: "2 years 3 months",
    badge: "Engineering",
    highlights: [
      "Actively involved in developing the internal-use web application alongside the main development team.",
      "Deployed apps via Vercel for testing and staging purposes.",
      "Contributed to designing and developing an intuitive admin dashboard for an internal project, focusing on enhancing user experience.",
      "Crafted interactive elements — buttons, forms, and animations — to enhance user engagement and satisfaction.",
      "Designed visually appealing and user-friendly interfaces that adhere to brand guidelines and accessibility standards.",
    ],
  },
  {
    role: "Junior Software Developer",
    company: "GFIS Sdn. Bhd.",
    location: "Cyberjaya, Malaysia",
    period: "Jun 2022 – Sep 2022",
    duration: "3 months",
    badge: "Internship",
    highlights: [
      "Collaborated with senior developers to write clean and maintainable code for web applications.",
      "Learned new languages such as Next.js, Strapi, MongoDB, and Django.",
      "Contributed to the design and development of user interfaces, enhancing user experiences.",
      "Engaged in coding, testing, and debugging software applications while learning from experienced developers.",
    ],
  },
];

export type SkillGroup = {
  label: string;
  icon: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { label: "Languages", icon: "code", items: ["HTML", "CSS", "JavaScript", "TypeScript"] },
  { label: "Frameworks & Libraries", icon: "layers", items: ["Next.js", "React.js", "Django", "Strapi"] },
  { label: "Databases", icon: "database", items: ["MongoDB"] },
  { label: "Tools & Deployment", icon: "tool", items: ["Vercel", "Git", "GitHub"] },
  { label: "Workflow", icon: "workflow", items: ["Agile", "Figma"] },
  { label: "Soft Skills", icon: "star", items: ["Problem Solving", "Communication", "Strategic Planning"] },
  { label: "Languages Spoken", icon: "globe", items: ["Malay", "English"] },
];

export type Project = {
  title: string;
  year: string;
  category: string;
  description: string;
  details: string[];
  tech: string[];
  url: string | null;
  github: string | null;
  preview: string | null;
};

export const projects: Project[] = [
  {
    title: "Chess",
    year: "2025",
    category: "Web App",
    description:
      "A browser-based chess platform for playing chess online, featuring a fully interactive board rendered dynamically with JavaScript.",
    details: [
      "Interactive chess board with full piece movement and game rules enforced.",
      "Dynamic rendering — the board loads client-side for a smooth, responsive experience.",
      "Deployed and publicly accessible via Vercel.",
    ],
    tech: ["JavaScript", "Next.js", "Vercel"],
    url: "https://chess-pi-one.vercel.app/",
    github: "https://github.com/ixtaqq/Chess",
    preview: "/chess-preview.png",
  },
  {
    title: "Goldirham",
    year: "2025",
    category: "Web App",
    description:
      "A financial research platform covering AI utilities, mega-cap compounders, semiconductors, thematic ETFs and crypto — each with upside / safety / AI-exposure scores, real-time charts and live prices.",
    details: [
      "26 researched assets across 5 categories with a 3-factor scoring model.",
      "Live market pulse with real-time price data and percentage changes.",
      "Deep-dive investment theses on AI utility companies powering the AI era.",
    ],
    tech: ["Next.js", "TypeScript", "Vercel"],
    url: "https://goldirham.vercel.app/",
    github: "https://github.com/ixtaqq/Goldirham",
    preview: "/goldirham-preview.png",
  },
  {
    title: "Goldirham Stack",
    year: "2026",
    category: "Web App",
    description:
      "Daily intelligence platform for the AI infrastructure age — collects, analyzes and digests AI infrastructure news, SEC filings and earnings call transcripts into a single morning briefing.",
    details: [
      "Collects 68 RSS feeds and analyzes them with two-tier AI routing.",
      "Extracts SEC filings from 35 companies via two-pass extraction.",
      "Mines earnings call transcripts from 15 companies with guidance-delta tracking.",
      "Delivers a curated morning digest to Telegram plus a live analytics dashboard.",
    ],
    tech: [
      "TypeScript",
      "Two-Tier AI (8B + 70B)",
      "Telegram Bot API",
      "Slack + Gmail",
      "Supabase",
      "pgvector + Embeddings",
      "Chart.js",
      "SEC EDGAR",
      "Yahoo Finance",
      "GitHub Actions",
    ],
    url: "https://goldirham-stack.vercel.app/",
    github: null,
    preview: "/goldirham-stack-preview.png",
  },
  {
    title: "Destination Alarm System",
    year: "2021 – 2022",
    category: "Mobile App",
    description:
      "A GPS-based mobile application that alerts users before reaching their destination, helping public transport riders avoid missing their stop due to distractions or delays.",
    details: [
      "Location tracking with reminder notifications that fire ahead of arrival.",
      "Map-based distance monitoring for real-time awareness.",
      "User registration functionality to improve accessibility and user experience.",
    ],
    tech: ["Android Development", "GPS Tracking", "Location-Based Services"],
    url: null,
    github: null,
    preview: null,
  },
];

export type Education = {
  degree: string;
  school: string;
  period: string;
  award?: string;
};

export const education: Education[] = [
  {
    degree: "Bachelor's Degree in Computer Science (Software Engineering)",
    school: "Universiti Tenaga Nasional (UNITEN)",
    period: "2019 – 2022",
    award: "Dean's List (Sem 1)",
  },
  {
    degree: "Foundation in Computer Science",
    school: "Universiti Tenaga Nasional (UNITEN)",
    period: "2018 – 2019",
  },
  {
    degree: "Accounting Stream (SPM)",
    school: "SMK Putrajaya Presint 16(1)",
    period: "2014 – 2017",
  },
];

export const extracurricular = [
  "Regional Chess Tournament (MSSM Catur)",
  "Machine Design Exhibition — UNITEN",
  "World Bank Youth Summit",
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;
