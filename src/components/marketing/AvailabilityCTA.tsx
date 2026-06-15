import Link from 'next/link'
import { Button } from '../ui'
import { AVAILABILITY_CTA } from '../../content/data/home'

export default function AvailabilityCTA() {
  return (
    <section aria-labelledby="cta-heading" className="max-w-6xl mx-auto px-4 py-16 border-t border-neutral-100">
      <div className="max-w-2xl">
        <h2
          id="cta-heading"
          className="text-2xl font-semibold text-neutral-900"
        >
          {AVAILABILITY_CTA.heading}
        </h2>
        <p className="mt-3 text-neutral-600 leading-relaxed">
          {AVAILABILITY_CTA.body}
        </p>
        <div className="mt-6">
          <Button asChild variant="primary" size="lg">
            <Link href={AVAILABILITY_CTA.cta.href}>{AVAILABILITY_CTA.cta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
