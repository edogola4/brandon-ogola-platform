'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ExternalLink } from '../ui'
import type { GitHubEvent } from '../../lib/github'

function truncate(input: string, max = 72): string {
  if (input.length <= max) return input
  return `${input.slice(0, Math.max(0, max - 1))}…`
}

function relativeTimeFromIso(iso: string): string {
  const then = new Date(iso)
  const now = new Date()
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  const mins = Math.floor(diff / 60)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.floor(months / 12)
  return `${years}y ago`
}

export default function GitHubActivity() {
  const { data, isLoading, isError } = useQuery<GitHubEvent[]>({
    queryKey: ['githubActivity'],
    queryFn: async () => {
      const res = await fetch('/api/github')
      if (!res.ok) return []
      const json = (await res.json()) as GitHubEvent[]
      return json
    },
    staleTime: 1000 * 60 * 60,
  })

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 animate-pulse">
            <div className="w-16 h-4 bg-gray-200 rounded" />
            <div className="flex-1">
              <div className="w-48 h-4 bg-gray-200 rounded mb-2" />
              <div className="w-32 h-3 bg-gray-200 rounded" />
            </div>
            <div className="w-20 h-3 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (isError || !data || data.length === 0) return null

  return (
    <div className="space-y-3">
      {data.slice(0, 10).map((ev) => (
        <EventRow key={ev.id} ev={ev} />
      ))}
    </div>
  )
}

function EventRow({ ev }: { ev: GitHubEvent }) {
  const [relative, setRelative] = React.useState<string>('')

  React.useEffect(() => {
    setRelative(relativeTimeFromIso(ev.createdAt))
    const id = setInterval(() => setRelative(relativeTimeFromIso(ev.createdAt)), 60_000)
    return () => clearInterval(id)
  }, [ev.createdAt])

  const typeLabel = ev.type === 'PushEvent' ? 'push' : ev.type === 'CreateEvent' ? 'branch' : 'pull request'

  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-baseline gap-3">
          <span className="text-xs font-mono text-gray-500">{typeLabel}</span>
          <div className="font-medium">{ev.repo}</div>
        </div>
        <div className="text-sm text-gray-600 mt-1">{truncate(ev.message)}</div>
      </div>
      <div className="ml-4 text-sm text-gray-500 text-right">
        <div className="mb-2">{relative || ev.createdAt}</div>
        <ExternalLink href={ev.url}>{`Open ${typeLabel} on ${ev.repo}`}</ExternalLink>
      </div>
    </div>
  )
}
