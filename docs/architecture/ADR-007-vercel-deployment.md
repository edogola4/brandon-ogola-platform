# ADR-007: Vercel for frontend deployment

## Status
Accepted

## Context
The platform is a Next.js application. Deployment options include Vercel, self-hosted (Docker + VPS), Railway, and AWS Amplify.

## Decision
Deploy to Vercel. Preview deployments on every PR. Production deployment on merge to main via GitHub Actions.

## Consequences
- Zero-config Next.js deployment with automatic edge optimisation
- Preview URLs generated per PR — enables visual review before merge
- Vercel Analytics available without additional instrumentation
- Vendor lock-in to Vercel edge runtime for any edge-specific features
- Cost scales with usage — acceptable at current traffic projections
