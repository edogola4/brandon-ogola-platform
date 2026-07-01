import React, { Suspense } from 'react'
import Hero from '../components/marketing/Hero'
import TrustMarquee from '../components/marketing/TrustMarquee'
import ExpertiseGrid from '../components/marketing/ExpertiseGrid'
import MetricsStrip from '../components/marketing/MetricsStrip'
import Testimonials from '../components/marketing/Testimonials'
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
    description:
      'Full-stack software engineer based in Nairobi, Kenya. Building backend APIs, SaaS products, and AI-integrated systems. Experienced in Azure, M-Pesa integrations, and cloud-native infrastructure.',
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

      <Testimonials />

      <Suspense fallback={
        <section className="max-w-6xl mx-auto px-4 py-12 border-b border-neutral-100">
          <div className="h-4 w-32 bg-neutral-100 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-40 bg-neutral-100 rounded-lg animate-pulse" />)}
          </div>
        </section>
      }>
        <SelectedCaseStudies />
      </Suspense>

      <Suspense fallback={
        <section className="max-w-6xl mx-auto px-4 py-12 border-b border-neutral-100">
          <div className="h-4 w-24 bg-neutral-100 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-36 bg-neutral-100 rounded-lg animate-pulse" />)}
          </div>
        </section>
      }>
        <WritingPreview />
      </Suspense>

      <GitHubActivity />

      <AvailabilityCTA />

      <AIAssistant />
    </>
  )
}
