import React from 'react'
import { getAllCaseStudies } from '../../lib/mdx'
import Link from 'next/link'
import { Tag, Badge, Button } from '../../components/ui'
import { generatePageMetadata } from '../../lib/metadata'
import { formatDate, formatStatus } from '../../lib/content-utils'
import { CASE_STUDIES_PAGE } from '../../content/data/home'

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Case Studies',
    description:
      'Engineering case studies from production systems: M-Pesa e-commerce, healthcare SaaS on Azure, and enterprise automation. Architecture decisions, implementation details, and measured outcomes.',
    path: '/case-studies',
  })
}

export default async function CaseStudiesPage() {
  const items = await getAllCaseStudies()

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Home
        </Link>
      </nav>

      <h1 className="text-3xl font-bold">Case Studies</h1>
      <p className="mt-3 text-neutral-600 max-w-2xl">
        {CASE_STUDIES_PAGE.intro}
      </p>

      {items.length === 0 ? (
        <p className="mt-8 text-neutral-600">Case studies coming soon.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((c) => {
            const { label, variant } = formatStatus(c.status)
            const firstOutcome = c.outcomes[0]
            return (
              <article
                key={c.slug}
                className="border border-neutral-200 rounded-lg p-5 flex flex-col gap-3 hover:border-neutral-400 transition-colors"
              >
                {/* Title + badge */}
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-sm font-semibold text-neutral-900 leading-snug">
                    {c.title}
                  </h2>
                  <Badge variant={variant} className="whitespace-nowrap shrink-0">{label}</Badge>
                </div>

                {/* Summary */}
                <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 flex-1">{c.summary}</p>

                {/* Key outcome */}
                {firstOutcome && (
                  <div className="border border-neutral-100 rounded-md px-3 py-2 bg-neutral-50">
                    <div className="text-xs text-neutral-400 uppercase tracking-wide">{firstOutcome.metric}</div>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className={`text-lg font-bold ${c.status === 'in-development' ? 'text-neutral-500' : 'text-neutral-900'}`}>
                        {firstOutcome.value}
                      </span>
                      {c.status === 'in-development' && (
                        <span className="text-xs text-neutral-400 font-normal">(target)</span>
                      )}
                    </div>
                    {firstOutcome.context && (
                      <div className="text-xs text-neutral-400 leading-snug mt-0.5">{firstOutcome.context}</div>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {c.tags.slice(0, 3).map((t) => <Tag key={t} label={t} />)}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1 border-t border-neutral-100">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/case-studies/${c.slug}`} className="inline-flex items-center gap-1.5">
                      Read case study
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </Button>
                  {c.liveUrl && (
                    <Button asChild variant="ghost" size="sm">
                      <a href={c.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                        View live
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path d="M14 3h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="sr-only">opens in new tab</span>
                      </a>
                    </Button>
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>{c.client}</span>
                  <div className="flex items-center gap-2">
                    {c.readingTime && <span>{c.readingTime} min read</span>}
                    <span>{formatDate(c.date)}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </main>
  )
}
