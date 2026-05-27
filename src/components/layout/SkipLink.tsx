'use client'

import React from 'react'

/**
 * Skip link for keyboard users. Visible on focus.
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 inline-block rounded-sm bg-neutral-900 text-white px-3 py-1 text-sm"
    >
      Skip to main content
    </a>
  )
}
