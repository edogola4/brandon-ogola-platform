'use client'

import React from 'react'

type CodeBlockProps = React.ComponentPropsWithoutRef<'pre'>

export default function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const preRef = React.useRef<HTMLPreElement>(null)

  async function handleCopy() {
    const text = preRef.current?.textContent ?? ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore — clipboard API unavailable
    }
  }

  return (
    <div className="not-prose relative my-6 rounded-lg border border-neutral-200 bg-neutral-50 overflow-hidden">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Copied' : 'Copy code'}
        className="absolute top-3 right-3 z-10 px-2 py-1 text-xs font-medium text-neutral-500 bg-white border border-neutral-200 rounded hover:border-neutral-400 hover:text-neutral-700 transition-colors"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre
        ref={preRef}
        {...props}
        className="overflow-x-auto px-5 py-5 text-sm leading-relaxed"
      >
        {children}
      </pre>
    </div>
  )
}
