# brandon-ogola-platform — AI Agent Handoff Document

## What this document is

This document gives a new AI agent (Amazon Q, Copilot, Cursor, or any other) full context
to continue work on this project without prior conversation history. Read it entirely before
taking any action.

---

## Project identity

**Repository**: https://github.com/edogola4/brandon-ogola-platform
**Local path**: /Users/brandon/brandon-ogola-platform
**Live domain**: brandonogola.dev (not yet deployed as of handoff)
**Owner**: Brandon Ogola — edogola4@gmail.com
**GitHub**: github.com/edogola4

**What it is**: A personal engineering brand and freelance consulting platform. Not a toy
portfolio. A production-grade platform built to the same standard as a commercial SaaS
product. It positions Brandon as a senior-level contract engineer specialising in scalable
SaaS architecture, AI integrations, and African payment systems.

---

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 App Router | Server Components by default, "use client" only where required |
| Language | TypeScript strict mode | noImplicitAny, strictNullChecks, noUncheckedIndexedAccess all true |
| Styling | Tailwind CSS 4 | Custom design tokens in tailwind.config.ts — no arbitrary values |
| Package manager | pnpm | pnpm-lock.yaml committed, use pnpm for all installs |
| Content | MDX via next-mdx-remote/rsc | Zod-validated front matter, build fails on invalid schema |
| Database | PostgreSQL with pgvector | For contact inquiries and semantic search embeddings |
| AI | Anthropic Claude claude-haiku-4-5 | Streaming chat assistant, server-side only |
| Embeddings | OpenAI text-embedding-3-small | For semantic content search via pgvector |
| Email | SendGrid | Contact form notifications and acknowledgements |
| State | TanStack Query | GitHub activity feed, wrapped in QueryProvider in layout.tsx |
| Analytics | Vercel Analytics | Cookieless, no consent banner required |
| Deployment | Vercel | Connected to main branch, preview on PR |
| CI/CD | GitHub Actions | ci.yml, preview.yml, production.yml, lighthouse.yml |

---

## Repository structure

```
brandon-ogola-platform/
├── src/
│   ├── app/
│   │   ├── (pages)/
│   │   │   ├── page.tsx                    — Homepage
│   │   │   ├── about/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── resume/page.tsx
│   │   │   ├── contact/page.tsx            — "use client", Zod form
│   │   │   ├── case-studies/
│   │   │   │   ├── page.tsx                — Case study index
│   │   │   │   └── [slug]/page.tsx         — SSG via generateStaticParams
│   │   │   └── writing/
│   │   │       ├── page.tsx                — Article index
│   │   │       ├── [slug]/page.tsx         — SSG via generateStaticParams
│   │   │       └── feed.xml/route.ts       — RSS 2.0 feed
│   │   ├── api/
│   │   │   ├── contact/route.ts            — POST, Zod validation, rate limited, SendGrid
│   │   │   ├── github/route.ts             — GET, proxies GitHub API, cached
│   │   │   ├── ai/route.ts                 — POST, Claude streaming, rate limited
│   │   │   └── search/route.ts             — GET, pgvector semantic search
│   │   ├── og/route.tsx                    — OG image generation via next/og
│   │   ├── sitemap.ts                      — Dynamic sitemap including MDX slugs
│   │   ├── robots.ts
│   │   └── layout.tsx                      — Root layout, QueryProvider, Analytics
│   ├── components/
│   │   ├── ui/                             — Primitive components (hand-built, no UI lib)
│   │   │   ├── Typography.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Tag.tsx
│   │   │   ├── ExternalLink.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── Header.tsx                  — Server Component + HeaderClient.tsx for scroll
│   │   │   ├── Footer.tsx                  — Server Component
│   │   │   └── SkipLink.tsx                — "use client", skip to main content
│   │   ├── marketing/
│   │   │   ├── Hero.tsx
│   │   │   ├── TrustMarquee.tsx            — Pure CSS animation, no JS
│   │   │   ├── MetricsStrip.tsx
│   │   │   ├── ExpertiseGrid.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── AvailabilityCTA.tsx
│   │   │   ├── GitHubActivity.tsx          — "use client", TanStack Query
│   │   │   ├── AIAssistant.tsx             — "use client", Claude streaming chat
│   │   │   └── Search.tsx                  — "use client", debounced semantic search
│   │   ├── mdx/
│   │   │   ├── CodeBlock.tsx               — "use client", copy-to-clipboard
│   │   │   ├── MetricCallout.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── OutcomeCard.tsx
│   │   │   └── ArchitectureDiagram.tsx
│   │   └── providers/
│   │       └── QueryProvider.tsx           — "use client", TanStack Query provider
│   ├── content/
│   │   ├── case-studies/
│   │   │   ├── riggs-london-kenya.mdx
│   │   │   ├── smartschedule-healthcare.mdx
│   │   │   └── alliance-bioversity-ciat.mdx
│   │   ├── writing/
│   │   │   ├── mpesa-nextjs-integration.mdx
│   │   │   └── pgvector-semantic-search.mdx
│   │   └── data/
│   │       ├── metrics.ts                  — Homepage MetricCard data
│   │       ├── expertise.ts                — ExpertiseGrid data
│   │       ├── navigation.ts               — NAV_LINKS array
│   │       ├── services.ts                 — SERVICES array + POSITIONING_STATEMENT
│   │       ├── about.ts                    — ENGINEERING_TIMELINE, DOMAINS_OF_DEPTH, etc.
│   │       └── resume.ts                   — SKILLS, EXPERIENCE, EDUCATION, PROJECTS
│   ├── lib/
│   │   ├── mdx.ts                          — getAllCaseStudies, getCaseStudy, getAllArticles, getArticle
│   │   ├── mdx-components.ts               — MDX_COMPONENTS object for MDXRemote
│   │   ├── anthropic.ts                    — Anthropic client + ASSISTANT_SYSTEM_PROMPT
│   │   ├── openai.ts                       — OpenAI client + generateEmbedding()
│   │   ├── search.ts                       — semanticSearch() via pgvector
│   │   ├── github.ts                       — GitHubEvent type + fetchGitHubActivity()
│   │   ├── email.ts                        — sendInquiryNotification, sendInquiryAcknowledgement
│   │   ├── metadata.ts                     — generatePageMetadata() helper
│   │   └── schema.ts                       — personSchema(), articleSchema() JSON-LD builders
│   ├── types/
│   │   └── content.ts                      — CaseStudyFrontmatterSchema, ArticleFrontmatterSchema
│   └── styles/
│       └── globals.css                     — Tailwind directives, marquee keyframes
├── scripts/
│   └── index-content.ts                    — Idempotent content indexing for pgvector
├── docs/
│   └── architecture/
│       ├── ADR-001-nextjs-app-router.md
│       ├── ADR-002-no-ui-library.md
│       ├── ADR-003-mdx-over-cms.md
│       ├── ADR-004-pgvector-over-vector-db.md
│       ├── ADR-005-tailwind-custom-tokens.md
│       ├── ADR-006-pnpm.md
│       └── ADR-007-vercel-deployment.md
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                          — type-check, lint, build on every PR
│   │   ├── preview.yml                     — Vercel preview on PR open
│   │   ├── production.yml                  — Deploy to production on merge to main
│   │   └── lighthouse.yml                  — Blocks merge if Lighthouse < 95
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── .env.example                            — All required env vars documented
├── next.config.ts                          — Security headers, poweredByHeader false
├── tailwind.config.ts                      — Full design token system
├── tsconfig.json                           — Strict mode
└── .eslintrc.json                          — @typescript-eslint/recommended, no-any as error
```

---

## Environment variables

All required. None committed to the repository. Set in Vercel dashboard for production.

```
ANTHROPIC_API_KEY        — Anthropic Claude API (AI assistant)
OPENAI_API_KEY           — OpenAI text-embedding-3-small (semantic search)
GITHUB_TOKEN             — GitHub API (activity feed, authenticated)
SENDGRID_API_KEY         — SendGrid (contact form emails)
DATABASE_URL             — PostgreSQL connection string (inquiries + pgvector embeddings)
```

---

## Branch and commit conventions

**Branching**: main (protected) → feature/* fix/* chore/* docs/*
**Commits**: Conventional Commits — feat: / fix: / chore: / docs: / refactor: / perf: / test:
**Branch protection**: currently disabled (billing issue during setup — re-enable before launch)

To re-enable branch protection:
```bash
gh api repos/edogola4/brandon-ogola-platform/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["CI"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1}' \
  --field restrictions=null
```

---

## Definition of done

An issue or task is complete only when ALL of the following are true:
- All acceptance criteria satisfied
- `pnpm tsc --noEmit` exits with code 0
- `pnpm lint` exits with zero warnings
- `pnpm build` completes successfully
- No regressions at 375px (mobile) and 1280px (desktop) viewports

---

## Design constraints — enforced throughout

**Never add:**
- Emojis anywhere in the UI
- Skill percentage bars or star ratings
- Hero images or avatars of the developer
- Gradient backgrounds, floating blobs, glassmorphism
- Typewriter effects, spinning cubes, terminal gimmicks
- "Hire me" or "available for work" language
- Pricing on any page
- Google Fonts (system font stack only)
- Any UI library (shadcn, MUI, Chakra, Radix component library)
- Inline styles
- TypeScript `any` types

**Always use:**
- `pnpm` for all package installs — never `npm install`
- Server Components by default — `"use client"` only where interactivity requires it
- `next/link` for internal navigation
- `ExternalLink` component from `src/components/ui` for external links
- Design tokens from `tailwind.config.ts` — no arbitrary Tailwind values
- `generatePageMetadata()` from `src/lib/metadata.ts` for all page metadata

---

## Current status of all GitHub issues

All 20 issues created and closed. The complete issue list is at:
https://github.com/edogola4/brandon-ogola-platform/issues?state=closed

| # | Title | Status |
|---|---|---|
| 1 | Repository scaffold and engineering governance setup | Closed |
| 2 | Next.js 15 App Router initialisation — TypeScript strict, Tailwind design tokens | Closed |
| 3 | ADR documentation — 7 initial architecture decisions | Closed |
| 4 | Primitive component library | Closed |
| 5 | Global layout — Header, Footer, navigation, skip link | Closed |
| 6 | Trust marquee | Closed |
| 7 | Homepage | Closed |
| 8 | About page | Closed |
| 9 | Services page | Closed |
| 10 | Resume page | Closed |
| 11 | GitHub activity integration | Closed |
| 12 | Contact page and inquiry API | Closed |
| 13 | MDX content pipeline | Closed |
| 14 | Case study — Riggs London Kenya | Closed |
| 15 | Case study — SmartSchedule Healthcare | Closed |
| 16 | Case study — Alliance Bioversity CIAT | Closed |
| 17 | Technical articles | Closed |
| 18 | AI engineering assistant | Closed |
| 19 | Semantic content search | Closed |
| 20 | Production deployment hardening | Closed |

---

## Outstanding issues at handoff

These were identified during local dev review and are partially or not yet fixed:

### 1. Floating circular AI assistant button — PARTIALLY FIXED
A fixed-position circular button from AIAssistant.tsx was rendering on all pages overlapping
content on the right edge. A fix was submitted but not visually verified as resolved.

**File to check**: src/components/marketing/AIAssistant.tsx
**Expected state**: No fixed-position floating button. The AI assistant should render inline
on the homepage only, below the AvailabilityCTA section, as a standard in-page section.
**Verify by**: checking that no element with `position: fixed` exists in AIAssistant.tsx

### 2. Contact form input styling — PARTIALLY FIXED
Form inputs rendered with no visible borders or background — appeared as plain text.
A fix was submitted adding Tailwind border and padding classes.

**File to check**: src/app/contact/page.tsx
**Expected state**: All inputs, selects, and textarea have visible borders (border-neutral-300),
padding (px-3 py-2), rounded corners, focus ring (focus:ring-2 focus:ring-neutral-900),
and labels with mb-1 spacing. Form container has max-w-xl or max-w-2xl.
**Verify by**: visiting /contact in the dev server

### 3. Footer nav "Case Studies" wrapping — PARTIALLY FIXED
"Case Studies" was wrapping to two lines in the footer centre column.
A fix was submitted but may not be fully resolved.

**File to check**: src/components/layout/Footer.tsx
**Expected state**: All 6 nav links (Home, Case Studies, Services, Writing, Resume, Contact)
sit on a single row in the footer centre column at 1280px viewport. Nav links have
`whitespace-nowrap`. Footer uses `grid-cols-[1fr_2fr_1fr]` or equivalent to give centre
column more width.
**Verify by**: checking footer at 1280px viewport width

### 4. Hero primary CTA button — FIXED
"View case studies" button was missing from the hero. Fix was applied and confirmed via
build passing. Visual verification pending.

**Expected state**: Two buttons side by side below the hero subheading —
"View case studies" (primary) and "Work with me" (ghost).

---

## How to run locally

```bash
# Clone
git clone https://github.com/edogola4/brandon-ogola-platform.git
cd brandon-ogola-platform

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Fill in all values in .env.local

# Run dev server
pnpm dev
# Open http://localhost:3000

# Type check
pnpm tsc --noEmit

# Build
pnpm build

# Run content indexing (requires DATABASE_URL and OPENAI_API_KEY)
npx tsx scripts/index-content.ts
```

---

## Deployment checklist (not yet done)

- [ ] Connect repo to Vercel at vercel.com
- [ ] Add all 5 environment variables in Vercel dashboard
- [ ] Add custom domain brandonogola.dev
- [ ] Verify DNS propagation
- [ ] Run Lighthouse on production domain (not preview URL) — all scores must be ≥ 95
- [ ] Run scripts/index-content.ts after DATABASE_URL and OPENAI_API_KEY are confirmed
- [ ] Submit sitemap to Google Search Console: https://brandonogola.dev/sitemap.xml
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Re-enable branch protection on main
- [ ] Verify contact form submits and both emails deliver
- [ ] Verify GitHub activity section renders with real data
- [ ] Verify AI assistant responds to a test question
- [ ] Verify RSS feed at https://brandonogola.dev/writing/feed.xml
- [ ] Verify OG images render in LinkedIn and Slack unfurl previews

---

## Rules for the continuing agent

1. **Always use pnpm** — never npm install or yarn
2. **Always run `pnpm tsc --noEmit && pnpm build` before committing** — both must pass
3. **Never commit secrets** — all API keys go in .env.local locally and Vercel dashboard in production
4. **No 'any' types** — ESLint is configured to error on @typescript-eslint/no-explicit-any
5. **No inline styles** — all styling via Tailwind classes referencing design tokens
6. **Server Components by default** — only add "use client" when the component requires
   browser APIs, event handlers, or React hooks
7. **No UI libraries** — all components are hand-built in src/components/ui/
8. **All data hardcoded in JSX is wrong** — data goes in src/content/data/*.ts files
9. **Content must be real** — no placeholder text, no lorem ipsum, no invented metrics
10. **All external links use ExternalLink component** — never raw anchor tags
11. **All internal links use next/link** — never raw anchor tags or window.location
12. **Commit directly to main while branch protection is disabled** — create feature branches
    once branch protection is re-enabled post billing fix
13. **API routes never return 500** — always handle errors gracefully and return
    appropriate 2xx or 4xx responses
14. **Rate limiting is in-memory** — acceptable for now, documented as TODO for Redis
    replacement in multi-instance production

---

## Content that still needs Brandon's personal input

The MDX case studies and articles were scaffolded by AI with the correct structure and
technical accuracy but the following sections need Brandon's personal voice and genuine
reflection — they cannot be written by an AI agent:

- **Lessons sections** in all three case studies — must be honest engineering reflection,
  not marketing copy
- **Engineering philosophy** section on the homepage — currently a placeholder, needs
  Brandon's actual working philosophy in his own words
- **Professional summary** paragraphs — currently sourced from CV verbatim, may want
  to rewrite in first person for the web context

These are content tasks, not engineering tasks. No code changes required.

---

## Contact and ownership

All code, content, and architecture decisions belong to Brandon Ogola.
GitHub: github.com/edogola4
Email: edogola4@gmail.com
LinkedIn: linkedin.com/in/brandon-ogola-b77063232