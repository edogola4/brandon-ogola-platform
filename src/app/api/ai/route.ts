import { getGeminiClient, ASSISTANT_SYSTEM_PROMPT } from '@/lib/gemini'
import logger from '@/lib/logger'
import { withApiLogger } from '@/lib/api-logger'

type Role = 'user' | 'assistant'

type ChatMessage = {
  role: Role
  content: string
}

const DAILY_LIMIT = 50

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405 })
  }

  try {
    const body = await request.json() as { messages?: ChatMessage[]; sessionId?: string }
    const messages = body.messages ?? []

    // Extract client IP
    const forwardedHeader = request.headers.get('x-forwarded-for')
    const realIpHeader = request.headers.get('x-real-ip')
    let firstForwarded: string | undefined
    if (forwardedHeader && forwardedHeader.length > 0) {
      const parts = forwardedHeader.split(',')
      if (parts[0]) firstForwarded = parts[0].trim()
    }
    const ip = firstForwarded ?? realIpHeader ?? '127.0.0.1'

    const dateStr = new Date().toISOString().slice(0, 10)
    const hash = await hashString(ip + '|' + dateStr)
    const key = `ai:${hash}`

    // Rate limit check
    const now = Date.now()
    const entry = rateLimitMap.get(key)
    if (entry && entry.resetAt > now) {
      if (entry.count >= DAILY_LIMIT) {
        logger.warn({ route: '/api/ai' }, 'daily rate limit reached')
        return Response.json({ error: 'Daily message limit reached. Email edogola4@gmail.com for direct contact.' }, { status: 429 })
      }
    } else {
      const tomorrow = new Date()
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1)
      tomorrow.setUTCHours(0, 0, 0, 0)
      rateLimitMap.set(key, { count: 0, resetAt: tomorrow.getTime() })
    }

    // Validation
    const errors: string[] = []
    if (!Array.isArray(messages) || messages.length < 1) {
      errors.push('messages must be a non-empty array')
    } else {
      const last = messages[messages.length - 1]
      if (!last || last.role !== 'user') errors.push('last message must be role:user')
      for (const [i, m] of messages.entries()) {
        if (typeof m.content !== 'string' || m.content.trim().length === 0) {
          errors.push(`messages[${i}].content must be a non-empty string`)
        } else if (m.content.length > 500) {
          errors.push(`messages[${i}].content must be under 500 characters`)
        }
      }
    }

    if (errors.length > 0) {
      return Response.json({ errors }, { status: 422 })
    }

    // Increment rate limit count
    const current = rateLimitMap.get(key) ?? { count: 0, resetAt: Date.now() + 86400000 }
    current.count += 1
    rateLimitMap.set(key, current)

    const gemini = getGeminiClient()
    if (!gemini) {
      logger.warn('GEMINI_API_KEY not configured — returning fallback response')
      return new Response('AI assistant is not configured. Email edogola4@gmail.com directly.', {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    }

    const model = gemini.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: ASSISTANT_SYSTEM_PROMPT,
    })

    // Build Gemini chat history (all messages except the last user message)
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }))

    const lastMessage = messages[messages.length - 1]

    try {
      const chat = model.startChat({ history })
      const result = await chat.sendMessageStream(lastMessage?.content ?? '')

      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result.stream) {
              const text = chunk.text()
              if (text) {
                controller.enqueue(new TextEncoder().encode(text))
              }
            }
            controller.close()
          } catch (streamErr) {
            logger.error({ err: streamErr }, 'gemini stream error')
            controller.enqueue(
              new TextEncoder().encode("I'm having trouble responding right now. Email edogola4@gmail.com directly.")
            )
            controller.close()
          }
        },
      })

      return new Response(readableStream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
        },
      })
    } catch (err) {
      logger.error({ err }, 'gemini initialisation error')
      return new Response("I'm having trouble responding right now. Email edogola4@gmail.com directly.", {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    }
  } catch (err) {
    logger.error({ err }, 'unhandled error in /api/ai')
    return new Response("I'm having trouble responding right now. Please email edogola4@gmail.com directly.", {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
}

export const POST = withApiLogger('/api/ai', handler)
