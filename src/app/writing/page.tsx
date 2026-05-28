import React from 'react'
import { getAllArticles } from '../../lib/mdx'
import Link from 'next/link'
import { Tag, ExternalLink } from '../../components/ui'
import { generatePageMetadata } from '../../lib/metadata'
import { formatDate } from '../../lib/content-utils'
import { WRITING_PAGE } from '../../content/data/home'

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Writing',
    description: 'Technical articles on backend engineering, AI integrations, cloud infrastructure, and system design.',
    path: '/writing',
  })
}

export default async function WritingPage() {
  const items = await getAllArticles()

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Writing</h1>
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-4">
        <p className="text-neutral-600 max-w-2xl">{WRITING_PAGE.intro}</p>
        <ExternalLink
          href="/writing/feed.xml"
          className="text-xs text-neutral-400 hover:text-neutral-700 shrink-0"
        >
          RSS feed
        </ExternalLink>
      </div>

      {items.length === 0 ? (
        <p className="mt-8 text-neutral-600">Articles coming soon.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((a) => (
            <article
              key={a.slug}
              className="border border-neutral-200 rounded-lg p-5 hover:border-neutral-400 transition-colors"
            >
              <h2 className="text-lg font-semibold leading-snug">
                <Link href={`/writing/${a.slug}`} className="hover:underline">{a.title}</Link>
              </h2>
              <p className="mt-1.5 text-sm text-neutral-600 line-clamp-2">{a.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="text-xs text-neutral-400">{formatDate(a.date)}</span>
                {a.readingTime && (
                  <>
                    <span className="text-xs text-neutral-300" aria-hidden="true">·</span>
                    <span className="text-xs text-neutral-400">{a.readingTime} min read</span>
                  </>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {a.tags.map((t) => <Tag key={t} label={t} />)}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
