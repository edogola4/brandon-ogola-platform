import { Pool } from 'pg'
import { generateEmbedding } from './openai'
import logger from './logger'

export interface SearchResult {
  title: string
  slug: string
  contentType: 'case-study' | 'article'
  excerpt: string
  similarity: number
}

const databaseUrl = process.env.DATABASE_URL
// max:1 prevents connection exhaustion on Vercel serverless — each invocation gets one connection
const pool = databaseUrl ? new Pool({ connectionString: databaseUrl, max: 1, idleTimeoutMillis: 10_000 }) : null

export async function semanticSearch(query: string): Promise<SearchResult[]> {
  if (!query || query.length === 0) return []
  if (!pool) return []

  try {
    const embedding = await generateEmbedding(query)
    const vectorString = `[${embedding.join(',')}]`

    const sql = `
      SELECT
        title,
        slug,
        content_type,
        chunk,
        1 - (embedding <=> $1::vector) AS similarity
      FROM content_embeddings
      WHERE 1 - (embedding <=> $1::vector) > 0.65
      ORDER BY embedding <=> $1::vector
      LIMIT 8
    `

    const res = await pool.query(sql, [vectorString])
    const rows = res.rows as Array<Record<string, unknown>>

    const results: SearchResult[] = rows.map((r) => {
      const title = typeof r.title === 'string' ? r.title : String(r.title ?? '')
      const slug = typeof r.slug === 'string' ? r.slug : String(r.slug ?? '')
      const contentType = r.content_type === 'article' ? 'article' : 'case-study'
      const chunk = typeof r.chunk === 'string' ? r.chunk : String(r.chunk ?? '')
      const similarity = typeof r.similarity === 'number' ? r.similarity : Number(r.similarity ?? 0)

      return {
        title,
        slug,
        contentType,
        excerpt: chunk.slice(0, 300),
        similarity,
      }
    })

    return results
  } catch (err) {
    logger.error({ err }, 'semantic search failed')
    return []
  }
}
