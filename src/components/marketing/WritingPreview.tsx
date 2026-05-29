import Link from 'next/link'
import { getAllArticles } from '../../lib/mdx'
import { Tag } from '../ui'
import { formatDate } from '../../lib/content-utils'

export default async function WritingPreview() {
  const items = await getAllArticles()
  if (items.length === 0) return null

  return (
    <section aria-labelledby="writing-heading" className="max-w-6xl mx-auto px-4 py-12 border-b border-neutral-100">
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id="writing-heading"
          className="text-xs font-semibold uppercase tracking-widest text-neutral-400"
        >
          Writing
        </h2>
        <Link
          href="/writing"
          className="text-xs font-medium text-neutral-400 hover:text-neutral-900 transition-colors inline-flex items-center gap-1"
        >
          All articles
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.slice(0, 3).map((a) => (
          <article
            key={a.slug}
            className="border border-neutral-200 rounded-lg p-5 flex flex-col gap-3 hover:border-neutral-400 transition-colors"
          >
            <h3 className="text-sm font-semibold text-neutral-900 leading-snug">
              <Link href={`/writing/${a.slug}`} className="hover:underline">
                {a.title}
              </Link>
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 flex-1">{a.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {a.tags.slice(0, 3).map((t) => <Tag key={t} label={t} />)}
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span>{formatDate(a.date)}</span>
              {a.readingTime && <span>{a.readingTime} min read</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
