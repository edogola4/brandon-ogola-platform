'use client'

import React from 'react'

export type CodeBlockProps = {
  children: string
  language?: string
}

export default function CodeBlock({ children, language }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <div className="relative">
      <pre className="overflow-auto"><code>{children}</code></pre>
      <button type="button" onClick={handleCopy} className="absolute top-2 right-2 px-2 py-1 text-xs border rounded">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
