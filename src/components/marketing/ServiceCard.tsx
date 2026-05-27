import React from 'react'

/**
 * Props for ServiceCard
 */
export type ServiceCardProps = {
  title: string
  description: string
  capabilities: string[]
}

/**
 * ServiceCard
 *
 * Server component that renders a single service offering with a subtle border,
 * descriptive text and a list of capabilities using a monospace style for items.
 */
export default function ServiceCard({
  title,
  description,
  capabilities,
}: ServiceCardProps) {
  return (
    <article className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <ul className="mt-4 space-y-2">
        {capabilities.map((capability) => (
          <li key={capability} className="text-sm font-mono text-gray-700">{capability}</li>
        ))}
      </ul>
    </article>
  )
}
