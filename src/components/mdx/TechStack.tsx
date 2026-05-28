import React from 'react'
import { Tag } from '../ui'

export type TechStackProps = {
  items: string[]
}

export default function TechStack({ items }: TechStackProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <Tag key={it} label={it} />
      ))}
    </div>
  )
}
