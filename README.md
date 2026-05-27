# brandon-ogola-platform

Source for [brandonogola.dev](https://brandonogola.dev) — personal engineering brand and consulting platform.

## Stack

- **Framework**: Next.js 16 App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 with custom design tokens
- **Content**: MDX with Zod-validated front matter
- **Database**: PostgreSQL with pgvector
- **AI**: Anthropic Claude API, OpenAI embeddings
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## Prerequisites

- Node.js 20+
- pnpm 10+
- PostgreSQL 15+ with pgvector extension

## Local development

```bash
git clone https://github.com/edogola4/brandon-ogola-platform.git
cd brandon-ogola-platform
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `GITHUB_TOKEN` | Yes | GitHub API token for activity feed |
| `SENDGRID_API_KEY` | Yes | SendGrid API key for contact form emails |
| `ANTHROPIC_API_KEY` | Yes | Anthropic Claude API key for AI assistant |
| `OPENAI_API_KEY` | Yes | OpenAI API key for embeddings and semantic search |

Never commit `.env.local`. All production secrets are stored in Vercel environment variables.

## Commands

```bash
pnpm dev          # start development server
pnpm build        # production build
pnpm lint         # run ESLint
pnpm tsc --noEmit # type check without emitting
```

## Architecture

Architecture decisions are documented in [docs/architecture/](./docs/architecture/).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branching strategy, commit conventions, and the definition of done.
