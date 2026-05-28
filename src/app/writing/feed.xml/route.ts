import { getAllArticles } from '@/lib/mdx'

function rfc2822(dateStr: string) {
  const d = new Date(dateStr)
  return d.toUTCString()
}

export async function GET() {
  const articles = await getAllArticles()

  const items = articles
    .map((a) => `
      <item>
        <title>${escapeXml(a.title)}</title>
        <description>${escapeXml(a.description)}</description>
        <link>https://brandonogola.dev/writing/${a.slug}</link>
        <guid>https://brandonogola.dev/writing/${a.slug}</guid>
        <pubDate>${rfc2822(a.date)}</pubDate>
      </item>
    `)
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Brandon Ogola — Writing</title>
      <link>https://brandonogola.dev/writing</link>
      <description>Technical articles on backend engineering, AI integrations, cloud infrastructure, and system design</description>
      <language>en</language>
      ${items}
    </channel>
  </rss>`

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
