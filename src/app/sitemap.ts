import type { MetadataRoute } from 'next'
import { getAllCaseStudies, getAllArticles } from '@/lib/mdx'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://brandonogola.dev/', lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://brandonogola.dev/about', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://brandonogola.dev/services', lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://brandonogola.dev/case-studies', lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://brandonogola.dev/writing', lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://brandonogola.dev/resume', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://brandonogola.dev/contact', lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ]

  const caseStudies = await getAllCaseStudies()
  const articles = await getAllArticles()

  const csPages: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `https://brandonogola.dev/case-studies/${c.slug}`,
    lastModified: new Date(c.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const artPages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `https://brandonogola.dev/writing/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...csPages, ...artPages]
}
