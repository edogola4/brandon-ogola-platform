import Link from 'next/link'
import { EXPERTISE_AREAS } from '../../content/data/expertise'

const AREA_LINKS: Record<string, string> = {
  'Backend & API Engineering': '/services',
  'Full-Stack Product Builds': '/services',
  'AI Feature Integration': '/case-studies/riggs-london-kenya',
  'Cloud & DevOps': '/services',
  'African Payment Systems': '/case-studies/riggs-london-kenya',
  'Enterprise Architecture': '/case-studies/smartschedule-healthcare',
}

export default function ExpertiseGrid() {
  return (
    <section aria-labelledby="expertise-heading" className="max-w-6xl mx-auto px-4 py-12 border-b border-neutral-100">
      <h2
        id="expertise-heading"
        className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6"
      >
        Areas of expertise
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXPERTISE_AREAS.map((area) => {
          const href = AREA_LINKS[area.title]
          const content = (
            <>
              <h3 className="text-sm font-semibold text-neutral-900">{area.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed flex-1">{area.description}</p>
              {href && (
                <span className="mt-1 text-xs font-medium text-neutral-400 group-hover:text-neutral-900 transition-colors inline-flex items-center gap-1">
                  {href.startsWith('/case-studies') ? 'See case study' : 'View services'}
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </>
          )

          return href ? (
            <Link
              key={area.title}
              href={href}
              className="group border border-neutral-200 rounded-lg p-5 flex flex-col gap-2 hover:border-neutral-400 transition-colors"
            >
              {content}
            </Link>
          ) : (
            <div
              key={area.title}
              className="border border-neutral-200 rounded-lg p-5 flex flex-col gap-2"
            >
              {content}
            </div>
          )
        })}
      </div>
    </section>
  )
}
