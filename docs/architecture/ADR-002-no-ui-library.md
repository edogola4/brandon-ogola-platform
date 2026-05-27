# ADR-002: Hand-built primitive components over UI library

## Status
Accepted

## Context
shadcn/ui, MUI, and Chakra UI introduce significant bundle overhead, opinionated styling that conflicts with a custom design system, and abstraction layers that make performance optimisation harder. For a single-engineer project with a fixed design language, the tradeoff is not favourable.

## Decision
All UI components are hand-built in src/components/ui/. No shadcn, MUI, Chakra, or Radix UI installed as a component library. Radix primitives (headless) may be used for complex accessibility patterns (dialogs, dropdowns) if needed.

## Consequences
- Full control over bundle size and styling
- No dependency on third-party component release cycles
- More upfront engineering work for primitive components
- Easier to enforce design token consistency across all components
