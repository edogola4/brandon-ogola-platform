import Link from 'next/link'
import { Badge } from '../../components/ui'
import { generatePageMetadata } from '../../lib/metadata'
import {
  PROFESSIONAL_SUMMARY,
  ENGINEERING_TIMELINE,
  DOMAINS_OF_DEPTH,
  CURRENT_FOCUS,
  AVAILABILITY
} from '../../content/data/about'

export function generateMetadata() {
  return generatePageMetadata({
    title: 'About',
    description: 'Full-stack software engineer based in Nairobi, Kenya. 2+ years delivering production systems in fintech, healthcare, and SaaS.',
    path: '/about',
  })
}

export default function AboutPage() {
  const paragraphs = PROFESSIONAL_SUMMARY.split('\n\n')

  const borderClass = (type: string) =>
    type === 'employment' ? 'border-emerald-200' : type === 'education' ? 'border-sky-200' : 'border-amber-200'

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold">About</h1>

      <section className="mt-6">
        {paragraphs.map((p, i) => (
          <p key={i} className="mb-4 text-neutral-700">
            {p}
          </p>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Experience & Education</h2>
        <div className="mt-4 space-y-4">
          {ENGINEERING_TIMELINE.map((item) => (
            <div key={item.period} className={`pl-4 border-l-4 ${borderClass(item.type)} py-2`}>
              <div className="text-sm text-neutral-500">{item.period}</div>
              <div className="text-lg font-medium">{item.role}</div>
              <div className="text-sm text-neutral-600">{item.organisation} — {item.location}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Areas of depth</h2>
        <div className="mt-4 space-y-4">
          {DOMAINS_OF_DEPTH.map((d) => (
            <div key={d.domain}>
              <div className="text-sm font-medium">{d.domain}</div>
              <p className="text-neutral-700 mt-1">{d.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Currently building</h2>
        <div className="mt-4">
          <h3 className="text-lg font-medium">
            <Link href="/case-studies/smartschedule-healthcare" className="underline">{CURRENT_FOCUS.project}</Link>
          </h3>
          <p className="text-neutral-700 mt-2">{CURRENT_FOCUS.description}</p>
          <div className="mt-3 flex items-center gap-3">
            <Badge variant="default">{CURRENT_FOCUS.status}</Badge>
            <div className="text-sm text-neutral-600">Expected MVP: {CURRENT_FOCUS.expectedMVP}</div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Availability</h2>
        <p className="mt-3 text-lg text-neutral-700">{AVAILABILITY.status}</p>
        <div className="mt-2 text-neutral-600">Location: {AVAILABILITY.location}</div>
        <div className="mt-1 text-neutral-600">Open to: {AVAILABILITY.openTo.join(', ')}</div>
        <div className="mt-4">
          <Link href="/services" className="text-sm font-medium underline">View services</Link>
        </div>
      </section>
    </div>
  )
}
