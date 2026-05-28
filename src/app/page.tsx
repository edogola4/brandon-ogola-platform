import React from 'react'
import Hero from '../components/marketing/Hero'
import MetricsStrip from '../components/marketing/MetricsStrip'
import TrustMarquee from '../components/marketing/TrustMarquee'
import ExpertiseGrid from '../components/marketing/ExpertiseGrid'
import AvailabilityCTA from '../components/marketing/AvailabilityCTA'
import GitHubActivity from '../components/marketing/GitHubActivity'
import { personSchema } from '../lib/schema'
import { generatePageMetadata } from '../lib/metadata'

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Brandon Ogola — Full-Stack Software Engineer',
    description: 'Full-stack software engineer based in Nairobi, Kenya. Specialising in SaaS systems, AI integrations, and cloud-native infrastructure.',
    path: '/',
  })
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
      />

      <Hero />

      <MetricsStrip />

      <TrustMarquee />

      <ExpertiseGrid />

      {/* TODO: Issue #14 — SelectedCaseStudies (requires MDX content) */}

      {/* TODO: Issue #17 — WritingPreview (requires MDX content) */}

      {/* Issue #11 — GitHubActivity */}
      {/* GitHub activity feed (client-side) */}
      <GitHubActivity />

      {/* Issue #18 — AI assistant */}
      {/* AIAssistant provides a client-side chat interface to the Claude-based assistant */}
      <React.Suspense fallback={null}>
        {React.createElement(require('../components/marketing/AIAssistant').default)}
      </React.Suspense>

      <AvailabilityCTA />
    </>
  )
}
