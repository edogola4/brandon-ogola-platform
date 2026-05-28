import Link from 'next/link'
import { Button } from '../ui'

export default function AvailabilityCTA() {
  return (
    <section aria-labelledby="cta-heading" className="max-w-6xl mx-auto px-4 py-16 border-t border-neutral-100">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Available now
        </p>
        <h2
          id="cta-heading"
          className="mt-3 text-2xl font-semibold text-neutral-900"
        >
          Looking for a contract engineer?
        </h2>
        <p className="mt-3 text-neutral-600 leading-relaxed">
          I take on select engagements in backend API engineering, full-stack SaaS builds,
          AI feature integration, and cloud infrastructure. Typical engagements run 4–12 weeks.
          Based in Nairobi, Kenya — remote-first.
        </p>
        <div className="mt-6">
          <Button asChild variant="primary" size="lg">
            <Link href="/contact">Start a conversation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
