'use client'

import Link from 'next/link'
import { Button } from '../ui'
import { HERO } from '../../content/data/home'

/**
 * Hero section — server component. All copy sourced from src/content/data/home.ts.
 */
export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="max-w-6xl mx-auto px-4 pt-16 pb-14 border-b border-neutral-100"
    >
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-snug tracking-tight text-neutral-900">
          {HERO.title}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-neutral-600">
          {HERO.subtitle}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button asChild variant="primary" size="lg" className="w-full sm:w-auto justify-center">
            <Link href={HERO.primaryCta.href}>{HERO.primaryCta.label}</Link>
          </Button>

          <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto justify-center">
            <Link href={HERO.secondaryCta.href}>{HERO.secondaryCta.label}</Link>
          </Button>
        </div>

        <div className="mt-5">
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
        </div>
      </div>
    </section>
  )
}
