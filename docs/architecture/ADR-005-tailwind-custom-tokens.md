# ADR-005: Tailwind CSS with custom design tokens over CSS Modules

## Status
Accepted

## Context
The platform requires a systematic design language with consistent spacing, typography, and colour. CSS Modules provide scoping but do not enforce design token usage. Tailwind with a custom config enforces token usage at the class level.

## Decision
Tailwind CSS with all design tokens defined in tailwind.config.ts. No arbitrary values in className attributes. No CSS Modules. CSS custom properties in globals.css for values not expressible in Tailwind config.

## Consequences
- All spacing, colour, and typography decisions traceable to tailwind.config.ts
- Arbitrary Tailwind values (e.g. w-[347px]) are ESLint-flagged
- Consistent visual output across all components without runtime overhead
