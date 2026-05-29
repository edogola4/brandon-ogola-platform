import CodeBlock from '../components/mdx/CodeBlock'
import MetricCallout from '../components/mdx/MetricCallout'
import TechStack from '../components/mdx/TechStack'
import OutcomeCard from '../components/mdx/OutcomeCard'
import OutcomeGrid from '../components/mdx/OutcomeGrid'
import ArchitectureDiagram from '../components/mdx/ArchitectureDiagram'
import React from 'react'

// MDX components mapping. Cast each component to a generic ComponentType to satisfy TS without using `any`.
export const MDX_COMPONENTS: Record<string, React.ComponentType<unknown>> = {
  pre: CodeBlock as unknown as React.ComponentType<unknown>,
  MetricCallout: MetricCallout as unknown as React.ComponentType<unknown>,
  TechStack: TechStack as unknown as React.ComponentType<unknown>,
  OutcomeCard: OutcomeCard as unknown as React.ComponentType<unknown>,
  OutcomeGrid: OutcomeGrid as unknown as React.ComponentType<unknown>,
  ArchitectureDiagram: ArchitectureDiagram as unknown as React.ComponentType<unknown>,
}

export default MDX_COMPONENTS
