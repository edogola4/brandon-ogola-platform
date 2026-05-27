import Hero from '../components/marketing/Hero'
import MetricsStrip from '../components/marketing/MetricsStrip'
import TrustMarquee from '../components/marketing/TrustMarquee'
import ExpertiseGrid from '../components/marketing/ExpertiseGrid'
import AvailabilityCTA from '../components/marketing/AvailabilityCTA'
import GitHubActivity from '../components/marketing/GitHubActivity'

export default function Page() {
  return (
    <>
      <Hero />

      <MetricsStrip />

      <TrustMarquee />

      <ExpertiseGrid />

      {/* TODO: Issue #14 — SelectedCaseStudies (requires MDX content) */}

      {/* TODO: Issue #17 — WritingPreview (requires MDX content) */}

      {/* Issue #11 — GitHubActivity */}
      {/* GitHub activity feed (client-side) */}
      <GitHubActivity />

      <AvailabilityCTA />
    </>
  )
}
