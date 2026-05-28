import React from 'react'

export type ServiceCardProps = {
  title: string
  description: string
  capabilities: string[]
}

export default function ServiceCard({ title, description, capabilities }: ServiceCardProps) {
  return (
    <article className="border border-neutral-200 rounded-lg p-6 flex flex-col gap-4">
      <div>
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
        <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">{description}</p>
      </div>

      <div className="border-t border-neutral-100 pt-4">
        <ul className="space-y-2">
          {capabilities.map((capability) => (
            <li key={capability} className="flex items-start gap-2 text-sm text-neutral-700">
              <span className="mt-px text-neutral-300 select-none" aria-hidden="true">—</span>
              <span>{capability}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
