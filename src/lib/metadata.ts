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
  const ogImageType = ogType === 'article' ? (path.startsWith('/writing') ? 'article' : 'case-study') : 'page'
  const ogImage = `https://brandonogola.dev/og?title=${encodeURIComponent(fullTitle)}&description=${encodeURIComponent(description)}&type=${ogImageType}`

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
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      ...(publishedTime && { publishedTime }),
      ...(tags && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  }
}
