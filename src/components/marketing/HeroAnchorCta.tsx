'use client'

import { HERO } from '../../content/data/home'

export default function HeroAnchorCta() {
  return (
    <button
      type="button"
      onClick={() => {
        document.getElementById('ai-heading')?.scrollIntoView({ behavior: 'smooth' })
      }}
      className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
    >
      {HERO.anchorCta.label}
      <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
