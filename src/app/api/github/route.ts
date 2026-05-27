import type { NextRequest } from 'next/server'

type AllowedType = 'PushEvent' | 'CreateEvent' | 'PullRequestEvent'

type RawEvent = {
  id: string
  type: string
  repo: { name: string }
  payload?: any
  created_at: string
}

function truncateMessage(input: string, max = 72): string {
  if (input.length <= max) return input
  return `${input.slice(0, Math.max(0, max - 1))}…`
}

function apiCommitUrlToHtml(apiUrl: string): string {
  // convert https://api.github.com/repos/owner/repo/commits/sha -> https://github.com/owner/repo/commit/sha
  try {
    return apiUrl.replace('https://api.github.com/repos', 'https://github.com').replace('/commits/', '/commit/')
  } catch (e) {
    return apiUrl
  }
}

export async function GET(request: Request) {
  // Only allow GET
  if (request.method !== 'GET') {
    return new Response(null, { status: 405, headers: { Allow: 'GET' } })
  }

  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    })
  }

  try {
    const res = await fetch('https://api.github.com/users/edogola4/events', {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
    })

    if (res.status === 403) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
        },
      })
    }

    if (!res.ok) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
        },
      })
    }

    const data = (await res.json()) as RawEvent[]

    const filtered = data
      .filter((ev) => ev && (ev.type === 'PushEvent' || ev.type === 'CreateEvent' || ev.type === 'PullRequestEvent'))
      .slice(0, 50) // take some then map and slice later
      .map((ev) => {
        const base = {
          id: ev.id,
          type: ev.type as AllowedType,
          repo: ev.repo?.name ?? '',
          message: '',
          url: '',
          createdAt: ev.created_at,
        }

        if (ev.type === 'PushEvent') {
          const firstCommit = ev.payload?.commits && ev.payload.commits.length > 0 ? ev.payload.commits[0] : null
          const rawMessage = firstCommit?.message ?? ''
          const message = truncateMessage(String(rawMessage))
          let url = ''
          if (firstCommit?.url) url = apiCommitUrlToHtml(String(firstCommit.url))
          else if (ev.payload?.head) url = `https://github.com/${ev.repo?.name}/commit/${ev.payload.head}`

          return { ...base, message, url }
        }

        if (ev.type === 'CreateEvent') {
          const branch = ev.payload?.ref ?? ''
          const message = String(branch)
          const url = branch ? `https://github.com/${ev.repo?.name}/tree/${branch}` : `https://github.com/${ev.repo?.name}`
          return { ...base, message, url }
        }

        if (ev.type === 'PullRequestEvent') {
          const pr = ev.payload?.pull_request
          const message = pr?.title ?? ''
          const url = pr?.html_url ?? `https://github.com/${ev.repo?.name}`
          return { ...base, message: String(message), url }
        }

        return base
      })

    const result = filtered.slice(0, 10)

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (e) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      },
    })
  }
}
