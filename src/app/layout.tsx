import './globals.css'
import type { Metadata } from 'next'
import SkipLink from '../components/layout/SkipLink'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import QueryProvider from '../components/providers/QueryProvider'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://brandonogola.dev'),
  title: {
    default: 'Brandon Ogola — Software Engineer',
    template: '%s — Brandon Ogola',
  },
  description:
    'Full-stack software engineer based in Nairobi, Kenya. Backend APIs, SaaS products, AI integrations, and Azure cloud infrastructure. Available for employment and contract engagements.',
  authors: [{ name: 'Brandon Ogola', url: 'https://brandonogola.dev' }],
  creator: 'Brandon Ogola',
  openGraph: {
    siteName: 'Brandon Ogola',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://brandonogola.dev/writing/feed.xml',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <SkipLink />
        <Header />
        <main id="main-content" role="main" className="pt-16">
          <QueryProvider>{children}</QueryProvider>
        </main>
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
