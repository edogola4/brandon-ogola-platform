import React from 'react'

export type MetricCalloutProps = {
  metric: string
  value: string
  context?: string
}

export default function MetricCallout({ metric, value, context }: MetricCalloutProps) {
  return (
    <aside className="not-prose my-8 border-l-4 border-neutral-900 bg-neutral-50 px-5 py-4 rounded-r-lg">
      <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400">{metric}</div>
      <div className="mt-1 text-3xl font-bold text-neutral-900">{value}</div>
      {context ? <div className="mt-1 text-sm text-neutral-500 leading-relaxed">{context}</div> : null}
    </aside>
  )
}
