import React from 'react'

export type OutcomeCardProps = {
  metric: string
  value: string
  context: string
}

export default function OutcomeCard({ metric, value, context }: OutcomeCardProps) {
  return (
    <div className="border rounded p-4">
      <div className="text-sm text-neutral-500">{metric}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
      <div className="text-sm text-neutral-600 mt-2">{context}</div>
    </div>
  )
}
