import { getAllCaseStudies, getAllArticles } from '@/lib/mdx'

export default async function sitemap() {
  const now = new Date()
  const staticPages = [
    '/',
    '/about',
    '/services',
    '/resume',
    '/contact',
    '/case-studies',
    '/writing',
  ].map((p) => ({ url: `https://brandonogola.dev${p}`, lastModified: now }))

  const caseStudies = await getAllCaseStudies()
  const articles = await getAllArticles()

  const csPages = caseStudies.map((c) => ({ url: `https://brandonogola.dev/case-studies/${c.slug}`, lastModified: new Date(c.date) }))
  const artPages = articles.map((a) => ({ url: `https://brandonogola.dev/writing/${a.slug}`, lastModified: new Date(a.date) }))

  return [...staticPages, ...csPages, ...artPages]
}
