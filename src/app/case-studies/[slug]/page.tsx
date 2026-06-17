import React from 'react'
import { getAllCaseStudies, getCaseStudy } from '../../../lib/mdx'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import MDX_COMPONENTS from '../../../lib/mdx-components'
import { Tag, Badge, Button } from '../../../components/ui'
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

/** Intent param per case study slug — used on the "Get in touch" CTA */
const CONTACT_INTENT: Record<string, string> = {
  'riggs-london-kenya':        'freelance',
  'chamabot-savings-automation': 'freelance',
  'smartschedule-healthcare':  'freelance',
  'alliance-bioversity-ciat':  'role',
}

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

  const all = await getAllCaseStudies()
  const currentIndex = all.findIndex((c) => c.slug === slug)
  const prev = currentIndex < all.length - 1 ? all[currentIndex + 1] : null
  const next = currentIndex > 0 ? all[currentIndex - 1] : null

  const isProjected = fm.status === 'in-development'

  const intent = CONTACT_INTENT[slug] ?? 'freelance'
  const contactHref = `/contact?intent=${intent}&project=${encodeURIComponent(fm.title)}`

  // Show first 3 outcomes in Layer 1 metric row
  const heroOutcomes = fm.outcomes.slice(0, 3)

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">

      {/* Breadcrumb */}
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

      {/* ── LAYER 1: Outcome ── */}
      <div className="border-b border-neutral-100 pb-10">

        {/* Title + badge */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold leading-snug">{fm.title}</h1>
          <Badge variant={variant} className="whitespace-nowrap shrink-0 mt-1">{label}</Badge>
        </div>

        {/* Tagline — plain-language outcome sentence */}
        {fm.tagline && (
          <p className="mt-4 text-lg text-neutral-600 leading-relaxed">{fm.tagline}</p>
        )}

        {/* Fallback to summary if no tagline yet */}
        {!fm.tagline && (
          <p className="mt-4 text-neutral-600 leading-relaxed">{fm.summary}</p>
        )}

        {/* Metric row */}
        {heroOutcomes.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {heroOutcomes.map((o) => (
              <div
                key={o.metric}
                className="border border-neutral-200 rounded-lg px-4 py-4 bg-neutral-50 flex flex-col gap-1"
              >
                <div className="text-xs font-medium uppercase tracking-wide text-neutral-400">{o.metric}</div>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-2xl font-bold ${isProjected ? 'text-neutral-500' : 'text-neutral-900'}`}>
                    {o.value}
                  </span>
                  {isProjected && (
                    <span className="text-xs text-neutral-400 font-normal">(target)</span>
                  )}
                </div>
                {o.context && (
                  <div className="text-xs text-neutral-400 leading-snug">{o.context}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA row */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {fm.liveUrl && (
            <Button asChild variant="primary" size="md">
              <a href={fm.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                View live
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M14 3h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="sr-only">opens in new tab</span>
              </a>
            </Button>
          )}
          <Button asChild variant={fm.liveUrl ? 'ghost' : 'primary'} size="md">
            <Link href={contactHref} className="inline-flex items-center gap-2">
              Get in touch
              <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Button>
        </div>

        {/* Meta + tags */}
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-400">
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
        <div className="mt-3 flex flex-wrap gap-1.5">
          {fm.tags.map((t) => <Tag key={t} label={t} />)}
        </div>
      </div>

      {/* ── LAYER 2: Architecture & decisions ── */}
      {fm.decisions && fm.decisions.length > 0 && (
        <div className="mt-10 pb-10 border-b border-neutral-100">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-5">Key decisions</h2>
          <ul className="space-y-4">
            {fm.decisions.map((d, i) => (
              <li key={i} className="border border-neutral-100 rounded-lg px-4 py-3 bg-neutral-50">
                <div className="text-sm font-semibold text-neutral-900">{d.choice}</div>
                <div className="mt-0.5 text-sm text-neutral-500 leading-relaxed">{d.reasoning}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Stack */}
      {fm.stack.length > 0 && (
        <div className="mt-8 pb-8 border-b border-neutral-100">
          <div className="text-xs font-medium uppercase tracking-wide text-neutral-400 mb-2">Stack</div>
          <div className="flex flex-wrap gap-1.5">
            {fm.stack.map((s) => <Tag key={s} label={s} />)}
          </div>
        </div>
      )}

      {/* Full architecture breakdown — MDX body */}
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
            <Link href={`/case-studies/${prev.slug}`} className="group inline-flex flex-col gap-0.5">
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
            <Link href={`/case-studies/${next.slug}`} className="group inline-flex flex-col gap-0.5 items-end">
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
