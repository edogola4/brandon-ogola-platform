import { semanticSearch } from '@/lib/search'

export async function GET(req: Request) {
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

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    })
  } catch (err) {
    // Never expose raw errors; return empty array to keep API stable
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    })
  }
}
