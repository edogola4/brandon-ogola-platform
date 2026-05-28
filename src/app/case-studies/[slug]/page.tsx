import React from 'react'
import { getAllCaseStudies, getCaseStudy } from '../../../lib/mdx'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import MDX_COMPONENTS from '../../../lib/mdx-components'
import { Tag } from '../../../components/ui'
import { CaseStudyFrontmatter } from '../../../types/content'
import { generatePageMetadata } from '../../../lib/metadata'

type Params = { params: { slug: string } }

export async function generateStaticParams() {
  const all = await getAllCaseStudies()
  return all.map((c: CaseStudyFrontmatter) => ({ slug: c.slug }))
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
  const fm: CaseStudyFrontmatter = cs.frontmatter

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">{fm.title}</h1>
      <div className="mt-2 text-sm text-gray-500">{fm.client} · {fm.date} · {fm.status}</div>
      <div className="mt-4 flex flex-wrap gap-2">{fm.tags.map((t) => <Tag key={t} label={t} />)}</div>
      <article className="mt-8 prose max-w-none">
        <MDXRemote source={cs.content} components={MDX_COMPONENTS} />
      </article>
    </main>
  )
}
