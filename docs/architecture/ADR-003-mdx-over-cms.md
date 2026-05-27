# ADR-003: MDX file-based content over headless CMS

## Status
Accepted

## Context
Content volume is low (3 case studies, ~10 articles at launch). A headless CMS (Sanity, Contentful) introduces API dependencies, additional cost, and operational complexity that is not justified at this scale.

## Decision
All content authored as MDX files in src/content/. Front matter validated via Zod at build time. Content pre-rendered via generateStaticParams().

## Consequences
- Zero CMS cost or API dependency
- Content versioned in Git alongside code
- Build fails on invalid front matter — errors caught before deployment
- Migration to a CMS is straightforward if content volume grows significantly: the Zod schema and lib/mdx.ts interface remain the same, only the data source changes
