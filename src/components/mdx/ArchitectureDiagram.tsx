import React from 'react'

export type ArchitectureDiagramProps = {
  caption?: string
  children: React.ReactNode
}

export default function ArchitectureDiagram({ caption, children }: ArchitectureDiagramProps) {
  return (
    <figure role="img" aria-label={caption ?? 'Architecture diagram'} className="my-6">
      {children}
      {caption ? <figcaption className="mt-2 text-sm text-neutral-600">{caption}</figcaption> : null}
    </figure>
  )
}
