import React from 'react'
import { getAllCaseStudies, getCaseStudy } from '../../../lib/mdx'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import MDX_COMPONENTS from '../../../lib/mdx-components'
import { Tag, Badge } from '../../../components/ui'
import { generatePageMetadata } from '../../../lib/metadata'
import { formatDate, formatStatus } from '../../../lib/content-utils'

type Params = { params: Promise<{ slug: string }> }
type MDXOptions = NonNullable<React.ComponentProps<typeof MDXRemote>['options']>['mdxOptions']
type RehypePlugins = NonNullable<NonNullable<MDXOptions>['rehypePlugins']>

const REHYPE_PLUGINS: RehypePlugins = [
  rehypeSlug,
  [rehypePrettyCode, { theme: 'github-light', keepBackground: false }],
]
const REMARK_PLUGINS = [remarkGfm]

export async function generateStaticParams() {
  const all = await getAllCaseStudies()
  return all.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params
  const cs = await getCaseStudy(slug)
  if (!cs) return {}
  const fm = cs.frontmatter
  return generatePageMetadata({
    title: fm.title,
    description: fm.summary,
    path: `/case-studies/${slug}`,
    ogType: 'article',
    publishedTime: fm.date,
    tags: fm.tags ?? [],
  })
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const cs = await getCaseStudy(slug)
  if (!cs) notFound()
  const fm = cs.frontmatter
  const { label, variant } = formatStatus(fm.status)

  // Build prev/next navigation from all case studies sorted by date desc
  const all = await getAllCaseStudies()
  const currentIndex = all.findIndex((c) => c.slug === slug)
  const prev = currentIndex < all.length - 1 ? all[currentIndex + 1] : null
  const next = currentIndex > 0 ? all[currentIndex - 1] : null

  const isProjected = fm.status === 'in-development'

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      {/* Back nav */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Case Studies
        </Link>
      </nav>

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

        {/* Outcomes strip */}
        {fm.outcomes.length > 0 && (
          <div className="mt-6">
            <div className="text-xs font-medium uppercase tracking-wide text-neutral-400 mb-3">
              {isProjected ? 'Target outcomes' : 'Outcomes'}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {fm.outcomes.map((o) => (
                <div key={o.metric} className="border border-neutral-200 rounded-lg px-3 py-3 bg-neutral-50">
                  <div className="text-xs text-neutral-400 leading-snug">{o.metric}</div>
                  <div className="text-xl font-bold text-neutral-900 mt-1">{o.value}</div>
                  {isProjected && (
                    <div className="text-xs text-amber-600 mt-0.5">Projected</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stack */}
        {fm.stack.length > 0 && (
          <div className="mt-6 pt-6 border-t border-neutral-100">
            <div className="text-xs font-medium uppercase tracking-wide text-neutral-400 mb-2">Stack</div>
            <div className="flex flex-wrap gap-1.5">
              {fm.stack.map((s) => <Tag key={s} label={s} />)}
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <article className="mt-8 mdx-body">
        <MDXRemote
          source={cs.content}
          components={MDX_COMPONENTS}
          options={{ mdxOptions: { remarkPlugins: REMARK_PLUGINS, rehypePlugins: REHYPE_PLUGINS } }}
        />
      </article>

      {/* Prev / Next navigation */}
      <nav
        aria-label="Case study navigation"
        className="mt-12 pt-8 border-t border-neutral-100 flex items-center justify-between gap-4"
      >
        <div>
          {prev && (
            <Link
              href={`/case-studies/${prev.slug}`}
              className="group inline-flex flex-col gap-0.5"
            >
              <span className="text-xs text-neutral-400 group-hover:text-neutral-600 transition-colors inline-flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Previous
              </span>
              <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors line-clamp-1">
                {prev.title}
              </span>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link
              href={`/case-studies/${next.slug}`}
              className="group inline-flex flex-col gap-0.5 items-end"
            >
              <span className="text-xs text-neutral-400 group-hover:text-neutral-600 transition-colors inline-flex items-center gap-1">
                Next
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors line-clamp-1">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </nav>

    </main>
  )
}
