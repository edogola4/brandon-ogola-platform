import { contactSchema, type ContactFormData } from '../../../lib/schemas/contact'
import logger from '../../../lib/logger'
import { withApiLogger } from '../../../lib/api-logger'

// Simple in-memory rate limit store. TODO: replace with Redis or Vercel KV for multi-instance deployments
const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>()
const LIMIT = 3
const WINDOW_MS = 60 * 60 * 1000 // 1 hour

async function sha256Hex(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

function jsonResponse(obj: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      ...extraHeaders,
    },
  })
}

async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { Allow: 'POST' } })
  }

  try {
    const forwarded = String(request.headers.get('x-forwarded-for') ?? '')
    // request.ip is not standard on Next.js Request; prefer header but fallback to empty
    const idx = forwarded.indexOf(',')
    const first = idx >= 0 ? forwarded.slice(0, idx) : forwarded
    const ipRaw = first.trim()
    const hashedIp = ipRaw ? await sha256Hex(ipRaw) : 'unknown'

    const now = Date.now()
    const entry = RATE_LIMIT_MAP.get(hashedIp)
    if (!entry || now > entry.resetAt) {
      RATE_LIMIT_MAP.set(hashedIp, { count: 1, resetAt: now + WINDOW_MS })
    } else {
      if (entry.count >= LIMIT) {
        const retryAfterSec = Math.ceil((entry.resetAt - now) / 1000)
        logger.warn({ route: '/api/contact' }, 'contact rate limit reached')
        return jsonResponse({ error: 'Too many requests', retryAfter: retryAfterSec }, 429)
      }
      RATE_LIMIT_MAP.set(hashedIp, { count: entry.count + 1, resetAt: entry.resetAt })
    }

    const body = await request.json()
    const parsed = contactSchema.safeParse(body)
    if (!parsed.success) {
      const flattened = parsed.error.flatten()
      logger.warn({ route: '/api/contact', fieldErrors: Object.keys(flattened.fieldErrors) }, 'contact form validation failed')
      return jsonResponse({ errors: flattened }, 422)
    }

    const data: ContactFormData = parsed.data

    // send emails but do not let failures block response
    import('../../../lib/email').then(async (mod) => {
      const { sendInquiryNotification, sendInquiryAcknowledgement } = mod
      await Promise.allSettled([sendInquiryNotification(data), sendInquiryAcknowledgement(data)])
    }).catch((err) => {
      logger.error({ err }, 'failed to import email module')
    })

    logger.info({ route: '/api/contact', projectType: data.projectType }, 'inquiry received')
    return jsonResponse({ id: crypto.randomUUID(), message: 'Inquiry received' }, 201)
  } catch (e) {
    logger.error({ err: e }, 'unhandled error in /api/contact')
    return jsonResponse({ error: 'Something went wrong' }, 200)
  }
}

export const POST = withApiLogger('/api/contact', handler)
