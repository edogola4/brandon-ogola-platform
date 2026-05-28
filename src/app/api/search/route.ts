import { semanticSearch } from '@/lib/search'
import logger from '@/lib/logger'
import { withApiLogger } from '@/lib/api-logger'

async function handler(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url)
    const q = url.searchParams.get('q') ?? ''

    if (!q || q.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Query parameter 'q' is required" }), {
        status: 422,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      })
    }

    if (q.length > 200) {
      return new Response(JSON.stringify({ error: 'Query too long' }), {
        status: 422,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      })
    }

    const results = await semanticSearch(q)
    logger.info({ queryLength: q.length, resultCount: results.length }, 'semantic search completed')

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    })
  } catch (err) {
    logger.error({ err }, 'unhandled error in /api/search')
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    })
  }
}

export const GET = withApiLogger('/api/search', handler)
