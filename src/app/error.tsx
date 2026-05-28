'use client'

import Link from 'next/link'
import { Button, Typography } from '../components/ui'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <Typography variant="caption" className="font-mono">Error</Typography>
        <Typography as="h1" variant="h1" className="mt-3">Something went wrong</Typography>
        <Typography variant="lead" className="mt-4 text-neutral-600">
          An unexpected error occurred. If this persists, email{' '}
          <a
            href="mailto:edogola4@gmail.com"
            className="underline hover:text-neutral-900 transition-colors"
          >
            edogola4@gmail.com
          </a>
          .
        </Typography>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="primary" size="md" onClick={() => reset()}>
            Try again
          </Button>
          <Button asChild variant="ghost" size="md">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
