import Link from 'next/link'

/**
 * Availability CTA section.
 */
export default function AvailabilityCTA() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 border-t border-neutral-100">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold">Available for contract and freelance engagements</h2>
        <p className="mt-3 text-neutral-700">Particularly experienced in .NET backend systems, Next.js full-stack builds, AI integrations, and African payment infrastructure.</p>
        <div className="mt-6">
          <Link href="/services" className="text-sm font-medium underline">View services</Link>
        </div>
      </div>
    </section>
  )
}
