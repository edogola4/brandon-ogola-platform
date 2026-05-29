import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import type { Metadata } from 'next'
import { getAllArticles, getArticle } from '../../../lib/mdx'
import MDX_COMPONENTS from '../../../lib/mdx-components'
import { Tag } from '../../../components/ui'
import { generatePageMetadata } from '../../../lib/metadata'
import { articleSchema } from '../../../lib/schema'
import { formatDate } from '../../../lib/content-utils'

type Params = { params: Promise<{ slug: string }> }
// Derive the rehypePlugins type from MDXRemote's own options prop — no subpath import needed.
type MDXOptions = NonNullable<React.ComponentProps<typeof MDXRemote>['options']>['mdxOptions']
type RehypePlugins = NonNullable<NonNullable<MDXOptions>['rehypePlugins']>

const REHYPE_PLUGINS: RehypePlugins = [
  rehypeSlug,
  [rehypePrettyCode, { theme: 'github-light', keepBackground: false }],
]

const REMARK_PLUGINS = [remarkGfm]

export async function generateStaticParams() {
  const all = await getAllArticles()
  return all.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const art = await getArticle(slug)
  if (!art) return {}
  const fm = art.frontmatter
  const base = generatePageMetadata({
    title: fm.title,
    description: fm.description,
    path: `/writing/${slug}`,
    ogType: 'article',
    publishedTime: fm.date,
    tags: fm.tags ?? [],
  })
  if (fm.canonical) {
    return { ...base, alternates: { ...base.alternates, canonical: fm.canonical } }
  }
  return base
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params
  const art = await getArticle(slug)
  if (!art) notFound()
  const fm = art.frontmatter
  const jsonLd = articleSchema({
    title: fm.title,
    description: fm.description,
    date: fm.date,
    url: `https://brandonogola.dev/writing/${slug}`,
  })

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="border-b border-neutral-100 pb-8">
        <h1 className="text-3xl font-bold leading-snug">{fm.title}</h1>
        <p className="mt-4 text-neutral-600 leading-relaxed">{fm.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-400">
          <span>{formatDate(fm.date)}</span>
          {fm.readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{fm.readingTime} min read</span>
            </>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {fm.tags.map((t) => <Tag key={t} label={t} />)}
        </div>
      </div>

      <article className="mt-8 mdx-body">
        <MDXRemote
          source={art.content}
          components={MDX_COMPONENTS}
          options={{ mdxOptions: { remarkPlugins: REMARK_PLUGINS, rehypePlugins: REHYPE_PLUGINS } }}
        />
      </article>

      <nav
        aria-label="Article navigation"
        className="mt-12 pt-8 border-t border-neutral-100"
      >
        <Link
          href="/writing"
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors inline-flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All articles
        </Link>
      </nav>
    </main>
  )
}
