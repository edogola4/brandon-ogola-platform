# ADR-006: pnpm over npm and yarn

## Status
Accepted

## Context
Package manager choice affects install speed, disk usage, and monorepo support. npm has no symlink-based deduplication. yarn v1 is in maintenance mode.

## Decision
pnpm as the sole package manager. pnpm-lock.yaml committed. .npmrc set to enforce pnpm usage.

## Consequences
- Faster installs via content-addressable store
- Strict dependency resolution prevents phantom dependencies
- pnpm-workspace.yaml supports future monorepo expansion if needed
- All contributors must have pnpm installed — documented in CONTRIBUTING.md
