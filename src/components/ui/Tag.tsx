import React from 'react'

/**
 * Props for Tag component
 */
export type TagProps = {
  /** Label text */
  label: string
}

/**
 * Technology Tag used on case studies
 */
export function Tag({ label }: TagProps) {
  return (
    <span className="inline-block font-mono text-xs text-neutral-800 bg-neutral-50 border border-neutral-200 rounded px-2 py-0.5">{label}</span>
  )
}

export default Tag
