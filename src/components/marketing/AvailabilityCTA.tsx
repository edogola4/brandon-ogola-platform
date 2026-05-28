import Link from 'next/link'
import { Button } from '../ui'

export default function AvailabilityCTA() {
  return (
    <section aria-labelledby="cta-heading" className="max-w-6xl mx-auto px-4 py-16">
      <div className="max-w-2xl">
        <h2
          id="cta-heading"
          className="text-2xl font-semibold text-neutral-900"
        >
          Open to contract and freelance engagements
        </h2>
        <p className="mt-3 text-neutral-600 leading-relaxed">
          Particularly experienced in .NET backend systems, Next.js full-stack builds,
          AI integrations, and African payment infrastructure.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button asChild variant="primary" size="lg" className="w-full sm:w-auto justify-center">
            <Link href="/contact">Get in touch</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto justify-center">
            <Link href="/services">View services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
