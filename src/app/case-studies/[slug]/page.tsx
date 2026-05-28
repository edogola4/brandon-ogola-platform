import React from 'react'
import { getAllCaseStudies, getCaseStudy } from '../../../lib/mdx'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import MDX_COMPONENTS from '../../../lib/mdx-components'
import { Tag, Badge } from '../../../components/ui'
import { generatePageMetadata } from '../../../lib/metadata'
import { formatDate, formatStatus } from '../../../lib/content-utils'

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  const all = await getAllCaseStudies()
  return all.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Params) {
  const cs = await getCaseStudy(params.slug)
  if (!cs) return {}
  const fm = cs.frontmatter
  return generatePageMetadata({
    title: fm.title,
    description: fm.summary,
    path: `/case-studies/${params.slug}`,
    ogType: 'article',
    publishedTime: fm.date,
    tags: fm.tags ?? [],
  })
}

export default async function CaseStudyPage({ params }: Params) {
  const cs = await getCaseStudy(params.slug)
  if (!cs) notFound()
  const fm = cs.frontmatter
  const { label, variant } = formatStatus(fm.status)

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="border-b border-neutral-100 pb-8">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold leading-snug">{fm.title}</h1>
          <Badge variant={variant} className="whitespace-nowrap shrink-0 mt-1">{label}</Badge>
        </div>

        <p className="mt-4 text-neutral-600 leading-relaxed">{fm.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-400">
          <span>{fm.client}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(fm.date)}</span>
          {fm.readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{fm.readingTime} min read</span>
            </>
          )}
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {fm.tags.map((t) => <Tag key={t} label={t} />)}
        </div>

        {/* Stack */}
        {fm.stack.length > 0 && (
          <div className="mt-5">
            <div className="text-xs font-medium uppercase tracking-wide text-neutral-400 mb-2">Stack</div>
            <div className="flex flex-wrap gap-1.5">
              {fm.stack.map((s) => <Tag key={s} label={s} />)}
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <article className="mt-8 mdx-body">
        <MDXRemote source={cs.content} components={MDX_COMPONENTS} />
      </article>
    </main>
  )
}
