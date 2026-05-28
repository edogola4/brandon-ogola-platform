import type { CaseStudyFrontmatter } from '../types/content'

const STATUS_LABELS: Record<CaseStudyFrontmatter['status'], string> = {
  live: 'Live',
  'in-development': 'In Development',
  archived: 'Archived',
}

const STATUS_VARIANTS: Record<CaseStudyFrontmatter['status'], 'success' | 'warning' | 'default'> = {
  live: 'success',
  'in-development': 'warning',
  archived: 'default',
}

export function formatStatus(status: CaseStudyFrontmatter['status']) {
  return {
    label: STATUS_LABELS[status],
    variant: STATUS_VARIANTS[status],
  }
}

/** Formats an ISO date string (YYYY-MM-DD) as "Month YYYY" — e.g. "April 2025" */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`)
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}
