import Link from 'next/link'
import { Button, Typography } from '../components/ui'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found — Brandon Ogola',
}

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <Typography variant="caption" className="font-mono">404</Typography>
        <Typography as="h1" variant="h1" className="mt-3">Page not found</Typography>
        <Typography variant="lead" className="mt-4 text-neutral-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </Typography>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="primary" size="md">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild variant="ghost" size="md">
            <Link href="/case-studies">View case studies</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
