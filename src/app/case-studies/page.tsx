import React from 'react'
import { getAllCaseStudies } from '../../lib/mdx'
import Link from 'next/link'
import { Tag, Badge } from '../../components/ui'
import { generatePageMetadata } from '../../lib/metadata'
import { formatDate, formatStatus } from '../../lib/content-utils'

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Case Studies',
    description: 'Engineering case studies covering SaaS architecture, AI integrations, fintech systems, and cloud infrastructure.',
    path: '/case-studies',
  })
}

export default async function CaseStudiesPage() {
  const items = await getAllCaseStudies()

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Case Studies</h1>
      <p className="mt-3 text-neutral-600 max-w-2xl">
        Production engineering work across fintech, healthcare, and enterprise SaaS — covering architecture decisions, implementation details, and measured outcomes.
      </p>

      {items.length === 0 ? (
        <p className="mt-8 text-neutral-600">Case studies coming soon.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((c) => {
            const { label, variant } = formatStatus(c.status)
            return (
              <article
                key={c.slug}
                className="border border-neutral-200 rounded-lg p-5 hover:border-neutral-400 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold leading-snug">
                      <Link
                        href={`/case-studies/${c.slug}`}
                        className="hover:underline"
                      >
                        {c.title}
                      </Link>
                    </h2>
                    <p className="mt-1.5 text-sm text-neutral-600 line-clamp-2">{c.summary}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="text-xs text-neutral-400">{c.client}</span>
                      <span className="text-xs text-neutral-300" aria-hidden="true">·</span>
                      <span className="text-xs text-neutral-400">{formatDate(c.date)}</span>
                      {c.readingTime && (
                        <>
                          <span className="text-xs text-neutral-300" aria-hidden="true">·</span>
                          <span className="text-xs text-neutral-400">{c.readingTime} min read</span>
                        </>
                      )}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.tags.map((t) => <Tag key={t} label={t} />)}
                    </div>
                  </div>
                  <div className="shrink-0 pt-0.5">
                    <Badge variant={variant} className="whitespace-nowrap">{label}</Badge>
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
