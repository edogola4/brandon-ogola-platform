import pino from 'pino'

const isDev = process.env.NODE_ENV !== 'production'

const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  ...(isDev && {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true, ignore: 'pid,hostname', translateTime: 'SYS:HH:MM:ss' },
    },
  }),
  ...(!isDev && {
    // Production: plain JSON — Vercel captures stdout per invocation
    formatters: {
      level(label) {
        return { level: label }
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  }),
})

export default logger
