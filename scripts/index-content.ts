#!/usr/bin/env tsx
import { Pool } from 'pg'
import crypto from 'crypto'
import { generateEmbedding } from '../src/lib/openai'
import { getAllCaseStudies, getAllArticles } from '../src/lib/mdx'

async function ensureSchema(pool: Pool) {
  const createExt = `CREATE EXTENSION IF NOT EXISTS vector;`

  const createTable = `
    CREATE TABLE IF NOT EXISTS content_embeddings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      content_type TEXT NOT NULL,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      chunk TEXT NOT NULL,
      content_hash TEXT NOT NULL,
      embedding vector(1536),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(slug, content_type)
    );
  `

  const createIndex = `
    CREATE INDEX IF NOT EXISTS content_embeddings_embedding_idx
    ON content_embeddings
    USING ivfflat (embedding vector_cosine_ops)
    WITH (lists = 10);
  `

  // IVFFlat requires at least lists*30 rows to be effective. Increase lists as content grows.

  await pool.query(createExt)
  await pool.query(createTable)
  await pool.query(createIndex)
}

interface ContentItem {
  slug: string
  title: string
  summary?: string
  description?: string
  tags?: string[]
}

function makeChunkTitle(item: ContentItem) {
  const tags = (item.tags ?? []).join(', ')
  const body = item.summary ?? item.description ?? ''
  return `${item.title}. ${body}. Tags: ${tags}`
}

async function main() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error('DATABASE_URL is not set. Cannot index content.')
    process.exit(1)
    return
  }

  const pool = new Pool({ connectionString: databaseUrl })

  try {
    await ensureSchema(pool)

    const caseStudies = await getAllCaseStudies()
    const articles = await getAllArticles()

    const items: Array<{ type: 'case-study' | 'article'; item: ContentItem }> = [
      ...caseStudies.map((c) => ({ type: 'case-study' as const, item: c as unknown as ContentItem })),
      ...articles.map((a) => ({ type: 'article' as const, item: a as unknown as ContentItem })),
    ]

    for (const entry of items) {
      const { type, item } = entry
      try {
        const chunk = makeChunkTitle(item)
        const hash = crypto.createHash('sha256').update(chunk).digest('hex')

        const existsRes = await pool.query(
          'SELECT content_hash FROM content_embeddings WHERE slug = $1 AND content_type = $2',
          [String(item.slug), type]
        )

        const existingHash = existsRes.rows.length > 0 ? String((existsRes.rows[0] as Record<string, unknown>).content_hash ?? '') : ''

        if (existingHash === hash) {
          console.log(`Skipped (unchanged): ${String(item.slug)}`)
          continue
        }

        const embedding = await generateEmbedding(chunk)
        const vectorString = `[${embedding.join(',')}]`

        await pool.query(
          `INSERT INTO content_embeddings (content_type, slug, title, chunk, content_hash, embedding)
           VALUES ($1, $2, $3, $4, $5, $6::vector)
           ON CONFLICT (slug, content_type) DO UPDATE
           SET title = EXCLUDED.title,
               chunk = EXCLUDED.chunk,
               content_hash = EXCLUDED.content_hash,
               embedding = EXCLUDED.embedding
          `,
          [type, String(item.slug), String(item.title), chunk, hash, vectorString]
        )

        console.log(`Indexed: ${type} ${String(item.slug)}`)
      } catch (err) {
        console.error('Error indexing item', item.slug, (err as Error).message)
        continue
      }
    }
  } finally {
    await pool.end()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
