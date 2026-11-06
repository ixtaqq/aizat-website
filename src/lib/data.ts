export const profile = {
  name: "Aizat Taqqiyudin",
  firstName: "Aizat",
  lastName: "Taqqiyudin",
  role: "AI Engineer · Python and TypeScript · RAG, LLM evaluation and generative AI applications",
  location: "Putrajaya, Malaysia",
  email: "aizattaqq@gmail.com",
  phone: "+6017 284 0608",
  phoneHref: "tel:+60172840608",
  cv: "/Aizat-Taqqiyudin-CV.pdf",
  github: "https://github.com/ixtaqq",
  linkedin: "https://www.linkedin.com/in/aizattaqq/",
  photo: "/aizat.jpg",
  sketch: "/aizat-sketch.png",
  availability: "Open to work — AI Engineer, Applied AI Engineer or LLM application roles in Malaysia, remote APAC or Singapore",
  contactIntro: "For opportunities, collaborations, or a conversation about software and markets.",
  tagline:
    "I build generative AI and LLM applications in Python and TypeScript, and I'm looking for AI Engineer, Applied AI Engineer or LLM application roles.",
} as const;

export const about = {
  paragraphs: [
    "I'm a software engineer building generative AI and LLM applications. My main project, Goldirham Filings, answers questions about SEC filings with cited passages and is served over MCP. It has a dev/test evaluation set and a CI check that fails when retrieval quality drops. I also built and use two Telegram briefing services, Goldirham Stack and Goldirham Lens.",
    "Before that I spent two years as a UI/UX designer at GFIS, so I care about the whole product — from the Postgres schema and the CI pipeline to the interface people actually touch. I hold a Bachelor of Computer Science (Software Engineering) from UNITEN, and I still live at the intersection of code and capital.",
  ],
  links: [
    { text: "Goldirham Filings", href: "https://github.com/ixtaqq/goldirham-filings" },
    { text: "Goldirham Stack", href: "https://goldirham-stack.vercel.app/" },
    { text: "Goldirham Lens", href: "https://goldirham-lens.vercel.app/" },
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
    role: "UI/UX Designer",
    company: "GFIS (M) Sdn. Bhd.",
    location: "Cyberjaya, Malaysia",
    period: "2022.09 — 2024.11",
    duration: "2 years 3 months",
    badge: "Engineering",
    highlights: [
      "Developed an internal web application alongside the main development team.",
      "Designed and built the admin dashboard for an internal project.",
      "Built interactive interface components (forms, buttons, animations) and deployed builds to Vercel for testing.",
      "Designed accessible interfaces that followed the company brand, working with the developers.",
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
      "Wrote, tested and debugged web application code with senior developers using Next.js, Strapi, MongoDB and Django.",
      "Helped design and build user interfaces.",
    ],
  },
];

export type SkillGroup = {
  label: string;
  icon: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { label: "AI & LLMs", icon: "sparkles", items: ["Generative AI", "Retrieval-Augmented Generation (RAG)", "Hybrid and semantic search", "Vector databases (pgvector)", "Embeddings", "Reciprocal rank fusion", "Chunking", "LLM retrieval and answer evaluation (Recall@k, MRR, citation precision, abstention)", "Prompt engineering", "Guardrails", "Model Context Protocol (MCP) servers", "Structured output with Pydantic and Zod", "Multi-model routing and cost control", "Prompt-injection mitigation"] },
  { label: "Model Providers", icon: "sparkles", items: ["Anthropic", "OpenAI", "Groq", "OpenRouter", "Ollama (local models)"] },
  { label: "Languages", icon: "code", items: ["Python", "TypeScript", "JavaScript", "SQL"] },
  { label: "Backend & Data", icon: "database", items: ["PostgreSQL", "pgvector", "Supabase", "SQLAlchemy", "Alembic", "FastAPI", "Node.js", "pandas", "REST APIs", "Webhooks"] },
  { label: "Testing & DevOps", icon: "tool", items: ["pytest", "Hypothesis", "Vitest", "Playwright", "mypy", "ruff", "CI/CD (GitHub Actions)", "Docker", "Semgrep", "Vercel", "Render"] },
  { label: "Frontend", icon: "layers", items: ["Next.js", "React", "Tailwind CSS", "UI/UX design"] },
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
    title: "Goldirham Filings",
    year: "2026",
    category: "LLM App",
    description:
      "A Retrieval-Augmented Generation (RAG) system, served as a Model Context Protocol (MCP) server, that answers questions about 96 10-K and 10-Q filings from 12 AI-infrastructure companies. Every answer sentence cites a filing passage, or the system says the filings don't answer the question.",
    details: [
      "The MCP server exposes five read-only tools for coverage, search, passage lookup, answers and filing comparison.",
      "A rate-limited EDGAR client with retries, an inline-XBRL parser that splits filings by Item heading, and section-aware chunking. Hypothesis property tests check that every chunk's offsets map back to its exact source text.",
      "Retrieval merges Postgres full-text search and pgvector semantic search with reciprocal rank fusion. Fiscal-period scoping resolves phrases like \"most recent 10-Q\", so a question about a quarter that isn't indexed gets an abstention instead of another quarter's numbers.",
      "Guardrails in code check every answer: they drop citations to passages the model never received, remove uncited sentences and flag numbers missing from the cited passages. Everything runs locally on Ollama, so there is no API cost.",
      "An evaluation harness on a 68-question golden set with a stratified dev/test split (Recall@10, MRR, citation precision, abstention rate), with every change logged as kept or reverted. The golden set hasn't been hand-checked yet, so its metrics are provisional.",
      "Rejected a cross-encoder reranker because MRR rose only 0.5 points (the bar was 3), Recall@10 fell from 0.740 to 0.677, and each query took 3.5 s longer.",
      "A CI retrieval gate on a committed fixture corpus fails any change that lowers Recall@10 or MRR by more than 0.02; removing vector search dropped Recall@10 from 0.769 to 0.654 and failed the build.",
    ],
    tech: ["Python", "MCP", "PostgreSQL", "pgvector", "Ollama (qwen3, nomic-embed-text)", "SQLAlchemy", "Alembic", "Pydantic", "pytest", "Hypothesis", "mypy (strict)", "ruff", "Docker", "GitHub Actions"],
    url: null,
    github: "https://github.com/ixtaqq/goldirham-filings",
    preview: null,
    highlight: "A CI gate fails any change that lowers Recall@10 or MRR by more than 0.02. Metrics are provisional until the golden set is hand-checked.",
  },
  {
    title: "Goldirham Stack",
    year: "2026",
    category: "Web App",
    description:
      "A personal AI-infrastructure news and filings digest that I built and run for my own work. Each day it pulls 68 RSS feeds and the 8-K, 10-K and 10-Q filings of 35 companies, classifies news into 10 sectors, and sends a personalised Telegram digest at a set local time.",
    details: [
      "Splits model work by cost: a free keyword filter and a fast model (about $0.0005 per filing) decide which SEC filings matter, and a strong model (about $0.01 each) extracts numbers from those only. Production runs on Groq.",
      "The same fast/strong split handles news classification and synthesis, and responses are cached by input hash so a re-run doesn't call the model again.",
      "SEC extracts first appeared on 3 Nov 2026, and their accuracy hasn't been measured yet.",
      "Every model response is validated with a Zod schema, and untrusted article text goes to the model as escaped JSON to reduce prompt-injection risk. Optional stages fail on their own without stopping the pipeline.",
      "Deduplicates by URL and Jaccard similarity; optional pgvector embedding matching is built but off in production.",
      "Idempotent per-user delivery with atomic claims, jittered retries, and optional Slack and email copies sent after Telegram.",
      "The Supabase backend has 41 migrations, row-level security on every table and automated data retention. CI runs lint, 630+ Vitest unit and integration tests, migration checks, a dependency audit and blocking Semgrep.",
    ],
    tech: ["TypeScript", "Node.js", "Supabase (Postgres, pgvector)", "Groq and OpenAI APIs", "Zod", "Vitest", "Docker", "GitHub Actions", "Render", "Vercel"],
    url: "https://goldirham-stack.vercel.app/",
    github: "https://github.com/ixtaqq/ai-infra-digest",
    preview: "/goldirham-stack-site-preview.png",
    highlight: "A keyword filter and a fast model (about $0.0005 per filing) pick the SEC filings that matter; the strong model (about $0.01 each) only reads those.",
  },
  {
    title: "Goldirham Lens",
    year: "2026",
    category: "Web App",
    description:
      "A daily market research briefing. Each morning a Python service collects crypto, US and Bursa Malaysia market data, computes indicators, setups and portfolio state, and sends one Telegram briefing before 08:00 Malaysia time.",
    details: [
      "Runs on GitHub Actions and Vercel, with no server to maintain.",
      "An optional summary from Claude cannot add numbers of its own; every figure comes from the analysis code.",
      "Analysis and composition are pure functions of one input snapshot, so any briefing can be rebuilt byte for byte from its stored inputs, and backtests reuse the production decision code.",
      "Two scheduled triggers and one database claim per day make a missed or doubled briefing unlikely. A dead-man's switch reports missed runs, a reduced briefing goes out when the database is down, and a delivery state machine holds partly sent messages instead of sending them twice.",
      "260+ tests, including PostgreSQL integration and golden-file tests; strict typing, import contracts, automated backups with restore drills, and 12 architecture decision records.",
    ],
    tech: ["Python", "FastAPI", "SQLAlchemy (async)", "Alembic", "pandas", "Anthropic API", "pytest", "Hypothesis", "mypy", "Vercel", "Supabase", "Next.js"],
    url: "https://goldirham-lens.vercel.app/",
    github: null,
    preview: "/goldirham-lens-site-preview.png",
    highlight: "Any briefing can be rebuilt byte for byte from its stored inputs, and the optional Claude summary can't add numbers of its own.",
  },
  {
    title: "Goldirham Insight",
    year: "2026",
    category: "Web App",
    description:
      "An investment research site covering 234 assets across AI infrastructure, growth funds and crypto, with 26 scored assets. Crypto quotes are live and stock data is simulated, and each price is labelled as coming from a market feed or a simulation.",
    details: [
      "Only crypto quotes are live, from CoinGecko. Stock quotes and stock chart history are simulated because no Finnhub key is set, and simulated figures are marked as such.",
      "26 assets carry editorial scores for upside, safety and AI exposure. None has been reviewed yet, so each one shows \"Not reviewed\".",
      "Provider calls have 5-second timeouts, caching, shared in-flight requests and per-minute rate limits. Failed or invalid responses fall back to a labelled simulation, and stale prices are marked.",
      "CI on GitHub Actions runs lint, tests, type checks, a build, smoke tests and a Playwright suite.",
    ],
    tech: ["Next.js", "React", "TypeScript (strict)", "Tailwind CSS", "Playwright", "Vercel"],
    url: "https://goldirham-insight.vercel.app/",
    github: "https://github.com/ixtaqq/Goldirham-Insight",
    preview: "/goldirham-insight-preview.png",
    highlight: "Every price says whether it came from a market feed or a simulation. Only crypto quotes are live.",
  },
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
    degree: "Bachelor of Computer Science (Software Engineering)",
    school: "Universiti Tenaga Nasional (UNITEN)",
    period: "2019 — 2022",
    award: "CGPA 3.4 · Dean's List (Semester 1)",
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
    name: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    year: "2026",
    file: "/certificates/intro-to-mcp.pdf",
  },
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
