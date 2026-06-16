'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ExternalLink } from '../ui'
import type { GitHubEvent } from '../../lib/github'

const REPO_LABELS: Record<string, string> = {
  'brandon-ogola-platform': 'Personal platform',
  'smartschedule-healthcare': 'SmartSchedule Healthcare',
  'edogola4': 'GitHub profile',
}

function repoLabel(fullName: string): string {
  const short = fullName.split('/')[1] ?? fullName
  return REPO_LABELS[short] ?? short
}

function relativeTimeFromIso(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  const mins = Math.floor(diff / 60)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

function truncate(input: string, max = 72): string {
  if (input.length <= max) return input
  return `${input.slice(0, Math.max(0, max - 1))}…`
}

function SkeletonRow() {
  return (
    <div className="flex items-start gap-3 animate-pulse py-3">
      <div className="flex-1 space-y-2">
        <div className="w-40 h-3 bg-neutral-200 rounded" />
        <div className="w-56 h-3 bg-neutral-200 rounded" />
      </div>
      <div className="w-12 h-3 bg-neutral-200 rounded mt-1 shrink-0" />
    </div>
  )
}

function EventRow({ ev }: { ev: GitHubEvent }) {
  const [relative, setRelative] = React.useState(() => relativeTimeFromIso(ev.createdAt))

  React.useEffect(() => {
    const id = setInterval(() => setRelative(relativeTimeFromIso(ev.createdAt)), 60_000)
    return () => clearInterval(id)
  }, [ev.createdAt])

  return (
    <div className="flex items-start gap-3 py-3 border-b border-neutral-100 last:border-0">
      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-neutral-900">{repoLabel(ev.repo)}</div>
        {ev.message && (
          <div className="text-sm text-neutral-500 mt-0.5 truncate">{truncate(ev.message)}</div>
        )}
        <div className="mt-1">
          <ExternalLink href={ev.url} className="text-xs text-neutral-400">
            View on GitHub
          </ExternalLink>
        </div>
      </div>
      <time dateTime={ev.createdAt} className="text-xs text-neutral-400 mt-0.5 shrink-0">
        {relative}
      </time>
    </div>
  )
}

export default function GitHubActivity() {
  const { data, isLoading, isError } = useQuery<GitHubEvent[]>({
    queryKey: ['githubActivity'],
    queryFn: async () => {
      const res = await fetch('/api/github')
      if (!res.ok) return []
      return (await res.json()) as GitHubEvent[]
    },
    staleTime: 1000 * 60 * 60,
  })

  if (!isLoading && (isError || !data || data.length === 0)) return null

  return (
    <section
      aria-labelledby="github-heading"
      className="max-w-6xl mx-auto px-4 py-12 border-b border-neutral-100"
    >
      <h2
        id="github-heading"
        className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6"
      >
        Currently building
      </h2>

      {isLoading ? (
        <div className="divide-y divide-neutral-100">
          {[1, 2, 3].map((i) => <SkeletonRow key={i} />)}
        </div>
      ) : (
        <div>
          {(data ?? []).slice(0, 5).map((ev) => (
            <EventRow key={ev.id} ev={ev} />
          ))}
        </div>
      )}
    </section>
  )
}
