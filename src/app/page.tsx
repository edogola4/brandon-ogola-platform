import React from 'react'
import Hero from '../components/marketing/Hero'
import TrustMarquee from '../components/marketing/TrustMarquee'
import ExpertiseGrid from '../components/marketing/ExpertiseGrid'
import MetricsStrip from '../components/marketing/MetricsStrip'
import SelectedCaseStudies from '../components/marketing/SelectedCaseStudies'
import WritingPreview from '../components/marketing/WritingPreview'
import AvailabilityCTA from '../components/marketing/AvailabilityCTA'
import GitHubActivity from '../components/marketing/GitHubActivity'
import AIAssistant from '../components/marketing/AIAssistant'
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

      <TrustMarquee />

      <ExpertiseGrid />

      <MetricsStrip />

      <SelectedCaseStudies />

      <WritingPreview />

      <GitHubActivity />

      <AvailabilityCTA />

      <AIAssistant />
    </>
  )
}
