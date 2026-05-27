export type GitHubEvent = {
  id: string
  type: 'PushEvent' | 'CreateEvent' | 'PullRequestEvent'
  repo: string
  message: string
  url: string
  createdAt: string
}

export async function fetchGitHubActivity(): Promise<GitHubEvent[]> {
  try {
    const res = await fetch('/api/github')
    if (!res.ok) return []
    const data = (await res.json()) as GitHubEvent[]
    if (!Array.isArray(data)) return []
    return data
  } catch (e) {
    return []
  }
}
