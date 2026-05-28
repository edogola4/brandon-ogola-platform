import type { Metadata } from 'next'

interface PageMetadataInput {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article'
  publishedTime?: string
  tags?: string[]
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogType = 'website',
  publishedTime,
  tags,
}: PageMetadataInput): Metadata {
  const url = `https://brandonogola.dev${path}`
  const fullTitle = path === '/' ? title : `${title} — Brandon Ogola`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL('https://brandonogola.dev'),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'Brandon Ogola',
      type: ogType,
      ...(publishedTime && { publishedTime }),
      ...(tags && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  }
}
