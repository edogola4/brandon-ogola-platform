# Copilot instructions for brandon-ogola-platform

This file helps Copilot CLI sessions understand how to build, run, and reason about this repository.

## Build, test, and lint commands
- Development server: `pnpm dev` (starts Next.js dev server on :3000)
- Production build: `pnpm build` and run with `pnpm start`
- Type checking: `pnpm tsc --noEmit` (README) — CI uses `pnpm typecheck` if present
- Linting: `pnpm lint` (README / CI runs `pnpm lint --if-present`). If no `lint` script exists, run ESLint directly: `npx eslint . --ext .ts,.tsx`.
- Tests: No test runner is configured in the repository. If tests are added, follow existing patterns (prefer lightweight runners compatible with Next.js, e.g. Vitest or Playwright for E2E). To run a single unit test, use the test runner's focused flag (example: `vitest -t "pattern"` or `jest -t "pattern"`).

## High-level architecture (big picture)
- Next.js App Router (React Server Components by default). See docs/architecture/ADR-001-nextjs-app-router.md for rationale.
- Language: TypeScript (strict) — types enforced; prefer `pnpm tsc --noEmit` or CI typecheck step.
- Styling: Tailwind CSS v4 with custom design tokens (see ADRs for token decisions).
- Content: MDX-based content with validated front-matter (project docs reference Zod for front-matter validation).
- Persistence and search: PostgreSQL + pgvector for semantic search (ADR docs describe vector decision).
- AI integrations: Anthropic / OpenAI used for assistant and embeddings.
- Deployment & CI: Deployed to Vercel. CI workflows in .github/workflows run install, typecheck, lint, and build (use --if-present so scripts may be optional).

## Key conventions and repository-specific patterns
- App Router / RSC mental model: assume server components by default; client components must include `"use client"` at the top.
- No Pages Router: routes, metadata, and route-level data fetching follow App Router conventions (look at docs/architecture ADRs).
- Strict TypeScript configuration: prefer explicit typing and avoid relying on implicit any. Use `pnpm tsc --noEmit` locally to verify.
- Branch & commit conventions: feature/*, fix/*, chore/* branch prefixes and Conventional Commits (see CONTRIBUTING.md).
- Environment: copy `.env.example` → `.env.local`. Required env vars are listed in README (DATABASE_URL, GITHUB_TOKEN, SENDGRID_API_KEY, ANTHROPIC_API_KEY, OPENAI_API_KEY). Never commit `.env.local`.
- ADRs are authoritative for major decisions: consult docs/architecture/*.md when unsure about trade-offs (Tailwind tokens, pgvector, App Router, pnpm usage, Vercel deployment).
- CI uses `--if-present` for optional scripts; do not assume a script exists even if referenced in docs — prefer running the explicit command if you need it.

## Files and locations to inspect when reasoning about behavior
- Entry points: `src/app/` (App Router routes and layout)
- Components: `src/components/` (marketing, layout, UI primitives)
- PostCSS / Tailwind config: `postcss.config.mjs`, `tailwind.config` (check project root)
- Docs & ADRs: `docs/architecture/` (authoritative design decisions)
- CI: `.github/workflows/*`

---

If you want, configure MCP servers for this repository (example: Playwright for E2E testing or a browser-based renderer). Would you like me to configure any MCP servers now?
