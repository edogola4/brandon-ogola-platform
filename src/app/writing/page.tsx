import React from 'react'
import { getAllArticles } from '../../lib/mdx'
import Link from 'next/link'
import { Tag } from '../../components/ui'
import { ArticleFrontmatter } from '../../types/content'

export const metadata = {
  title: 'Writing — Brandon Ogola',
  description: 'Technical articles on backend engineering, AI integrations, cloud infrastructure, and system design.',
}

export default async function WritingPage() {
  const items = await getAllArticles()
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Writing</h1>
      {items.length === 0 ? (
        <p className="mt-4 text-gray-700">Articles coming soon.</p>
      ) : (
        <div className="mt-6 space-y-6">
          {items.map((a: ArticleFrontmatter) => (
            <article key={a.slug} className="border rounded p-4">
              <h2 className="text-xl font-semibold"><Link href={`/writing/${a.slug}`}>{a.title}</Link></h2>
              <p className="mt-1 text-sm text-gray-600">{a.description}</p>
              <div className="mt-2 text-sm text-gray-500">{a.date}</div>
              <div className="mt-2 flex gap-2">{a.tags.map((t) => <Tag key={t} label={t} />)}</div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
