import React from 'react'
import { getAllArticles, getArticle } from '../../../lib/mdx'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import MDX_COMPONENTS from '../../../lib/mdx-components'
import { Tag } from '../../../components/ui'
import { generatePageMetadata } from '../../../lib/metadata'
import { articleSchema } from '../../../lib/schema'
import { formatDate } from '../../../lib/content-utils'

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  const all = await getAllArticles()
  return all.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Params) {
  const art = await getArticle(params.slug)
  if (!art) return {}
  const fm = art.frontmatter
  return generatePageMetadata({
    title: fm.title,
    description: fm.description,
    path: `/writing/${params.slug}`,
    ogType: 'article',
    publishedTime: fm.date,
    tags: fm.tags ?? [],
  })
}

export default async function ArticlePage({ params }: Params) {
  const art = await getArticle(params.slug)
  if (!art) notFound()
  const fm = art.frontmatter
  const jsonLd = articleSchema({
    title: fm.title,
    description: fm.description,
    date: fm.date,
    url: `https://brandonogola.dev/writing/${params.slug}`,
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
        <MDXRemote source={art.content} components={MDX_COMPONENTS} />
      </article>
    </main>
  )
}
