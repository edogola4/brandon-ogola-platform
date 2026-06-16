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

function AreaIcon({ title }: { title: string }) {
  const cls = 'w-5 h-5 text-neutral-400 shrink-0'
  switch (title) {
    case 'Backend & API Engineering':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6 8l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'Full-Stack Product Builds':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    case 'AI Feature Integration':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V6a4 4 0 0 1 4-4z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'Cloud & DevOps':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M18 10a6 6 0 1 0-11.6 2A4 4 0 1 0 7 20h11a4 4 0 0 0 1-7.87A6 6 0 0 0 18 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      )
    case 'African Payment Systems':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M6 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )
    case 'Enterprise Architecture':
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="9" y="2" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="2" y="18" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="16" y="18" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 6v4M5 18v-4h14v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    default:
      return null
  }
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
              <AreaIcon title={area.title} />
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
