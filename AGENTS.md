<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# aizat-website

Personal portfolio site for Aizat Taqqiyudin, deployed on Vercel.

## Tech stack

- **Framework**: Next.js 16 (App Router), React 19
- **Language**: TypeScript, strict mode
- **Styling**: Tailwind CSS 4 (`@tailwindcss/postcss`)
- **Animation**: `motion` (Framer Motion successor)
- **AI chat**: `@anthropic-ai/sdk` — `ANTHROPIC_API_KEY` env var required for `src/app/api/chat/route.ts`
- **PDF rendering**: `react-pdf` (resume viewer/modal)
- **Lint**: ESLint 9, flat config, `eslint-config-next`
- **Deployment**: Vercel

## Running it

```bash
npm install
npm run dev      # dev server, http://localhost:3000
npm run build    # production build
npm run start    # run production build
npm run lint      # eslint
```

Chat assistant route needs `ANTHROPIC_API_KEY` set in the environment (no `.env` committed — `.env*` is gitignored). Without it, `/api/chat` fails.

For agent-driven browser preview, `.claude/launch.json` defines the `aizat-website` dev server config (`npm run dev`, port 3000).

## What's set up so far

- `src/lib/data.ts` — single source of truth for all site content: profile, about, experience, skills, projects, education, extracurricular, nav. Edit here, not in components, to change content.
- `src/components/` — one component per section (Hero, Experience, Skills, Projects, Education, Contact, Footer, Nav) plus shared bits (`Reveal` for scroll animations, `SectionHeading`, `ResumeButton` / `ResumeModal` for the PDF viewer).
- `src/app/page.tsx` — assembles all sections in order.
- `src/app/api/chat/route.ts` — Anthropic-backed chat assistant; builds its system prompt dynamically from `src/lib/data.ts` so it stays in sync with site content.
- `src/app/api/resume/route.ts` — serves the resume PDF.
- `public/` — static assets: resume PDF, portrait, per-project preview images (`<slug>-preview.png`), PDF.js worker.
- Projects are added as entries in the `projects` array in `data.ts` (`title`, `year`, `category`, `description`, `details`, `tech`, `url`, `github`, `preview`) — `url`/`github`/`preview` are nullable when not applicable.
