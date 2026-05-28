import React from 'react'
import { getAllArticles, getArticle } from '../../../lib/mdx'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import MDX_COMPONENTS from '../../../lib/mdx-components'
import { ArticleFrontmatter } from '../../../types/content'
import { generatePageMetadata } from '../../../lib/metadata'
import { articleSchema } from '../../../lib/schema'

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  const all = await getAllArticles()
  return all.map((a: ArticleFrontmatter) => ({ slug: a.slug }))
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
  const fm: ArticleFrontmatter = art.frontmatter
  const jsonLd = articleSchema({ title: fm.title, description: fm.description, date: fm.date, url: `https://brandonogola.dev/writing/${params.slug}` })

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">{fm.title}</h1>
      <div className="mt-2 text-sm text-gray-500">{fm.date}</div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mt-8 prose max-w-none">
        <MDXRemote source={art.content} components={MDX_COMPONENTS} />
      </article>
    </main>
  )
}
