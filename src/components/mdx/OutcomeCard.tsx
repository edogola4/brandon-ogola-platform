import React from 'react'

export type OutcomeCardProps = {
  metric: string
  value: string
  context: string
}

export default function OutcomeCard({ metric, value, context }: OutcomeCardProps) {
  return (
    <div className="not-prose border border-neutral-200 rounded-lg p-5 flex flex-col gap-1">
      <div className="text-xs font-medium uppercase tracking-wide text-neutral-400">{metric}</div>
      <div className="text-3xl font-bold text-neutral-900">{value}</div>
      <div className="text-sm text-neutral-500 leading-snug">{context}</div>
    </div>
  )
}
