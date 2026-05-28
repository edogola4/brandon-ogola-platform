import Link from 'next/link'
import { getAllCaseStudies } from '../../lib/mdx'
import { Tag, Badge } from '../ui'
import { formatDate, formatStatus } from '../../lib/content-utils'

export default async function SelectedCaseStudies() {
  const items = await getAllCaseStudies()
  if (items.length === 0) return null

  return (
    <section aria-labelledby="case-studies-heading" className="max-w-6xl mx-auto px-4 py-12 border-b border-neutral-100">
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id="case-studies-heading"
          className="text-xs font-semibold uppercase tracking-widest text-neutral-400"
        >
          Case studies
        </h2>
        <Link
          href="/case-studies"
          className="text-xs font-medium text-neutral-400 hover:text-neutral-900 transition-colors inline-flex items-center gap-1"
        >
          View all
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.slice(0, 3).map((c) => {
          const { label, variant } = formatStatus(c.status)
          return (
            <article
              key={c.slug}
              className="border border-neutral-200 rounded-lg p-5 flex flex-col gap-3 hover:border-neutral-400 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-neutral-900 leading-snug">
                  <Link href={`/case-studies/${c.slug}`} className="hover:underline">
                    {c.title}
                  </Link>
                </h3>
                <Badge variant={variant} className="shrink-0">{label}</Badge>
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 flex-1">{c.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.tags.slice(0, 3).map((t) => <Tag key={t} label={t} />)}
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>{c.client}</span>
                <span>{formatDate(c.date)}</span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
