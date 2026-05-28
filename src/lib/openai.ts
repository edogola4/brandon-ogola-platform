import OpenAI from 'openai'

export const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

export async function generateEmbedding(text: string): Promise<number[]> {
  if (!openai) throw new Error('OpenAI API key not configured')

  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.replace(/\n/g, ' '),
  })
  const embedding = response.data[0]?.embedding
  if (!embedding) throw new Error('No embedding returned from OpenAI')
  return embedding
}
