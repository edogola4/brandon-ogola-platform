import React from 'react'

export type MetricCalloutProps = {
  metric: string
  value: string
  context?: string
}

export default function MetricCallout({ metric, value, context }: MetricCalloutProps) {
  return (
    <aside className="border-l-4 border-accent-500 bg-neutral-50 p-4 rounded">
      <div className="text-sm font-medium text-neutral-700">{metric}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
      {context ? <div className="mt-1 text-sm text-neutral-600">{context}</div> : null}
    </aside>
  )
}
