import React from 'react'
import { getAllCaseStudies } from '../../lib/mdx'
import Link from 'next/link'
import { Tag, Badge } from '../../components/ui'
import { CaseStudyFrontmatter } from '../../types/content'

import { generatePageMetadata } from '../../lib/metadata'

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
      {items.length === 0 ? (
        <p className="mt-4 text-gray-700">Case studies coming soon.</p>
      ) : (
        <div className="mt-6 space-y-6">
          {items.map((c: CaseStudyFrontmatter) => (
            <article key={c.slug} className="border rounded p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold"><Link href={`/case-studies/${c.slug}`}>{c.title}</Link></h2>
                  <p className="mt-1 text-sm text-gray-600">{c.summary}</p>
                  <div className="mt-2 text-sm text-gray-500">{c.client} · {c.date}</div>
                  <div className="mt-2 flex gap-2">
                    {c.tags.map((t) => <Tag key={t} label={t} />)}
                  </div>
                </div>
                <div className="ml-4">
                  <Badge>{c.status}</Badge>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
