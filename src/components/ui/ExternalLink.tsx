import React from 'react'

/**
 * Props for ExternalLink
 */
export type ExternalLinkProps = {
  /** Destination URL */
  href: string
  /** Optional classes for layout */
  className?: string
  /** Children content */
  children?: React.ReactNode
}

/**
 * ExternalLink opens href in a new tab, includes an accessible hint and a small icon.
 */
export function ExternalLink({ href, className = '', children }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}>
      <span>{children}</span>
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 3h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="sr-only">opens in new tab</span>
    </a>
  )
}

export default ExternalLink
