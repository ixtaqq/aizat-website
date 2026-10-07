export const profile = {
  name: "Aizat Taqqiyudin",
  firstName: "Aizat",
  lastName: "Taqqiyudin",
  role: "Software Engineer · Full-Stack & Applied AI",
  location: "Putrajaya, Malaysia",
  email: "aizattaqq@gmail.com",
  phone: "+6017 284 0608",
  phoneHref: "tel:+60172840608",
  cv: "/Aizat-Taqqiyudin-CV.pdf",
  github: "https://github.com/ixtaqq",
  linkedin: "https://www.linkedin.com/in/aizattaqq/",
  photo: "/aizat.jpg",
  sketch: "/aizat-sketch.png",
  availability: "Open to work — Applied AI, full-stack AI product and TypeScript backend roles in Malaysia, remote APAC or Singapore",
  contactIntro: "For opportunities, collaborations, or a conversation about software and markets.",
  tagline:
    "I build AI features the way a backend engineer would — validated outputs, tested pipelines, cost controls and safe retries. Not demos.",
} as const;

export const about = {
  paragraphs: [
    "I'm a software engineer who builds and runs production LLM applications. Since 2025 I've been building Goldirham Stack independently — a live AI-infrastructure intelligence platform that ingests news and SEC filings every day, routes work between fast and strong models, validates every model output, and delivers personalised digests to Telegram.",
    "Before that I spent two years as a UI/UX designer at GFIS, so I care about the whole product — from the Postgres schema and the CI pipeline to the interface people actually touch. I hold a Bachelor of Computer Science (Software Engineering) from UNITEN, and I still live at the intersection of code and capital.",
  ],
  links: [
    { text: "Goldirham Stack", href: "https://goldirham-stack.vercel.app/" },
    { text: "UNITEN", href: "https://www.uniten.edu.my/" },
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
    role: "Independent Software Engineer — Applied AI",
    company: "Goldirham (self-directed product work)",
    location: "Remote · Putrajaya, Malaysia",
    period: "2025 — now",
    duration: "ongoing",
    badge: "Applied AI",
    highlights: [
      "Built and operate Goldirham Stack, a production pipeline that ingests 68 news feeds and SEC 8-K/10-K/10-Q filings for 35 companies daily and delivers a personalised digest to each Telegram user at their local time.",
      "Designed two-tier LLM routing (fast model for classification, strong model for synthesis) and a three-pass SEC extraction pipeline; a free keyword filter and a cheap flagging model cut cost per filing from ~$0.01 to ~$0.0005.",
      "Validated every LLM response against Zod schemas, added prompt-injection guardrails for untrusted article text, and cached responses by content hash to avoid redundant spend.",
      "Implemented semantic deduplication with OpenAI embeddings in pgvector, with automatic fallback to Jaccard matching.",
      "Made delivery reliable with idempotent per-user claims, jittered retries, Slack and email fallbacks, and a Dockerised webhook server running as an unprivileged user.",
      "Built the Supabase/Postgres backend (36 migrations, row-level security, full-text search, automated retention) with CI running type checks, Vitest suites, a dependency audit and Semgrep.",
      "Also built Goldirham Insight, an AI-era investment research desk with a 3-factor scoring model and source-labeled market data.",
    ],
  },
  {
    role: "UI/UX Designer",
    company: "GFIS (M) Sdn. Bhd.",
    location: "Cyberjaya, Malaysia",
    period: "2022.09 — 2024.11",
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
    period: "2022.06 — 2022.09",
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
  { label: "AI & LLM", icon: "sparkles", items: ["LLM APIs (OpenAI, Groq, OpenRouter)", "Multi-model routing", "Structured outputs with Zod validation", "Embeddings & semantic search", "Prompt-injection mitigation", "Token & cost tracking"] },
  { label: "Languages", icon: "code", items: ["TypeScript", "JavaScript", "SQL", "HTML", "CSS"] },
  { label: "Backend & Data", icon: "database", items: ["Node.js", "PostgreSQL", "Supabase", "pgvector", "Row-level security", "REST APIs", "Webhooks", "MongoDB"] },
  { label: "Testing & DevOps", icon: "tool", items: ["Vitest", "GitHub Actions CI/CD", "Docker", "Semgrep", "Render", "Vercel", "Git"] },
  { label: "Frontend & Design", icon: "layers", items: ["Next.js", "React", "Tailwind CSS", "Chart.js", "UI/UX design", "Figma"] },
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
  highlight: string | null;
};

export const projectGroups = [
  { period: "2026", title: "AI & market intelligence", years: ["2026"] },
  { period: "2025", title: "Web apps", years: ["2025"] },
  { period: "2021–2022", title: "University work", years: ["2021 – 2022"] },
] as const;

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
    github: "https://github.com/ixtaqq/chess",
    preview: "/chess-site-preview.png",
    highlight: null,
  },
  {
    title: "Goldirham Stack",
    year: "2026",
    category: "Web App",
    description:
      "A production LLM pipeline for the AI infrastructure age — it reads 68 news feeds and SEC filings from 35 companies every day and delivers a personalised morning briefing to each Telegram user.",
    details: [
      "Two-tier LLM routing: a fast model (gpt-oss-20b) classifies, a strong model (gpt-oss-120b) synthesises.",
      "Three-pass SEC extraction — free keyword pre-filter, cheap flagging model, then strong-model extraction only on flagged 8-K/10-K/10-Q filings.",
      "Every model response is validated against Zod schemas; untrusted article text is passed as fenced data with prompt-injection guardrails; responses are cached by content hash.",
      "Semantic deduplication with OpenAI embeddings in pgvector, falling back to Jaccard matching.",
      "Reliable delivery: idempotent per-user claims, jittered retries, Slack and email fallbacks, and a Dockerised webhook server.",
      "Supabase/Postgres backend with 36 migrations and row-level security; CI runs type checks, Vitest suites, a dependency audit and Semgrep.",
    ],
    tech: [
      "TypeScript",
      "Node.js 22",
      "Groq / OpenAI",
      "Zod",
      "Supabase",
      "pgvector",
      "Vitest",
      "Docker",
      "GitHub Actions",
      "Telegram Bot API",
      "SEC EDGAR",
    ],
    url: "https://goldirham-stack.vercel.app/",
    github: "https://github.com/ixtaqq/ai-infra-digest",
    preview: "/goldirham-stack-site-preview.png",
    highlight: "Two-tier LLM routing cut the cost of analysing an SEC filing from ~$0.01 to ~$0.0005.",
  },
  {
    title: "Goldirham Insight",
    year: "2026",
    category: "Web App",
    description:
      "An AI-era investment research desk tracking the companies and assets powering the AI build-out — 26 assets across utilities, AI companies, mega-caps, ETFs and crypto, each scored on upside, safety and AI exposure with source-labeled market data.",
    details: [
      "26 researched assets across 5 categories, compared like-for-like on a 3-factor model: upside, safety and AI exposure.",
      "Every quote and chart is labeled by source — CoinGecko for crypto, Finnhub for stocks, with clearly marked simulated fallbacks.",
      "Interactive research radar, scorecards, searchable research library with category filters and ranking by any factor.",
      "Resilient market data: 5-second provider timeouts, validated and cached quotes, stale-price indicators and automatic retries.",
      "CI on GitHub Actions runs lint, mocked-provider regression tests, typecheck, build, smoke tests and a dependency audit.",
    ],
    tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Lightweight Charts", "CoinGecko", "Finnhub", "GitHub Actions", "Vercel"],
    url: "https://goldirham-insight.vercel.app/",
    github: "https://github.com/ixtaqq/Goldirham-Insight",
    preview: "/goldirham-insight-preview.png",
    highlight: "26 assets across 5 categories, scored on upside, safety and AI exposure — every quote labeled by its source.",
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
    highlight: null,
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
    period: "2019 — 2022",
    award: "Dean's List (Sem 1)",
  },
  {
    degree: "Foundation in Computer Science",
    school: "Universiti Tenaga Nasional (UNITEN)",
    period: "2018 — 2019",
  },
  {
    degree: "Accounting Stream (SPM)",
    school: "SMK Putrajaya Presint 16(1)",
    period: "2014 — 2017",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  file: string;
};

export const certifications: Certification[] = [
  {
    name: "Claude 101",
    issuer: "Anthropic",
    year: "2026",
    file: "/certificates/claude-101.pdf",
  },
];

export const extracurricular = [
  "Regional Chess Tournament (MSSM Catur)",
  "Machine Design Exhibition — UNITEN",
  "World Bank Youth Summit",
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
] as const;
