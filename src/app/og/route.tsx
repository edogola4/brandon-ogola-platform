import { ImageResponse } from 'next/og'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const title = (url.searchParams.get('title') ?? '').slice(0, 200)
  const description = (url.searchParams.get('description') ?? '').slice(0, 300)
  const type = (url.searchParams.get('type') ?? 'page') as 'page' | 'case-study' | 'article'

  const badgeText = type === 'case-study' ? 'Case Study' : type === 'article' ? 'Article' : ''

  return new ImageResponse(
    (
      <div style={{
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#ffffff',
        padding: '48px',
        boxSizing: 'border-box',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        color: '#000000',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Segoe UI Mono"', color: '#374151', fontSize: 20 }}>
            brandonogola.dev
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 80px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.05, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{title}</div>
            <div style={{ height: 24 }} />
            <div style={{ fontSize: 28, color: '#374151', lineHeight: 1.2, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{description}</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: '#374151', fontSize: 18 }}>{badgeText}</div>
          <div style={{ color: '#374151', fontSize: 18 }}>Brandon Ogola — Software Engineer</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { 'Cache-Control': 'public, max-age=86400' },
    }
  )
}
