# ADR-001: Next.js 15 App Router over Pages Router

## Status
Accepted

## Context
The platform requires server components for performance, streaming for AI assistant responses, and route-based code splitting. Pages Router does not support React Server Components natively and requires additional setup for streaming.

## Decision
Use Next.js App Router exclusively. No Pages Router files.

## Consequences
- React Server Components available by default — client components opt-in with "use client"
- Streaming responses supported natively via React Suspense
- generateStaticParams() replaces getStaticPaths() for MDX content pre-rendering
- Learning curve for engineers unfamiliar with RSC mental model
- Some older Next.js ecosystem packages may not support App Router yet
