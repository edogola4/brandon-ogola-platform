import logger from './logger'

export type RouteHandler = (req: Request) => Promise<Response>

/**
 * Wraps a Next.js App Router route handler with structured request/response logging.
 * Attaches a requestId, route label, method, status code, and duration to every entry.
 * Errors are logged at error level; all other outcomes at info level.
 */
/** Strip newlines and control characters from a string before logging to prevent log injection */
function sanitiseForLog(value: string): string {
  return value.replace(/[\r\n\t\x00-\x1f\x7f]/g, '_')
}

export function withApiLogger(route: string, handler: RouteHandler): RouteHandler {
  return async (req: Request): Promise<Response> => {
    const requestId = crypto.randomUUID().slice(0, 8)
    const method = sanitiseForLog(req.method)
    const safeRoute = sanitiseForLog(route)
    const start = Date.now()
    const log = logger.child({ requestId, route: safeRoute, method })

    log.info('request received')

    try {
      const res = await handler(req)
      const durationMs = Date.now() - start
      const status = res.status

      if (status >= 500) {
        log.error({ status, durationMs }, 'request failed')
      } else if (status >= 400) {
        log.warn({ status, durationMs }, 'request rejected')
      } else {
        log.info({ status, durationMs }, 'request completed')
      }

      return res
    } catch (err) {
      const durationMs = Date.now() - start
      log.error({ durationMs, err }, 'unhandled exception in route handler')
      // Re-throw so Next.js error boundaries still function correctly
      throw err
    }
  }
}
