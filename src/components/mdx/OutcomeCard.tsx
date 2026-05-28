import React from 'react'

export type OutcomeCardProps = {
  metric: string
  value: string
  context: string
  /** Mark outcome as a projection rather than a measured result */
  projected?: boolean
}

export default function OutcomeCard({ metric, value, context, projected }: OutcomeCardProps) {
  return (
    <div className="not-prose border border-neutral-200 rounded-lg p-5 flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs font-medium uppercase tracking-wide text-neutral-400">{metric}</div>
        {projected && (
          <span className="text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">Projected</span>
        )}
      </div>
      <div className="text-3xl font-bold text-neutral-900">{value}</div>
      <div className="text-sm text-neutral-500 leading-snug">{context}</div>
    </div>
  )
}
