import React from 'react'

export type Trend = 'up' | 'down' | 'neutral'

export type MetricCardProps = {
  label: string
  value: string
  context?: string
  trend?: Trend
}

function TrendIndicator({ trend }: { trend: Trend }) {
  if (trend === 'neutral') return null
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center ${
        trend === 'up' ? 'text-emerald-600' : 'text-red-600'
      }`}
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        {trend === 'up' ? (
          <path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M7 3v8M3 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </span>
  )
}

export function MetricCard({ label, value, context, trend = 'neutral' }: MetricCardProps) {
  const valueColor = trend === 'up' ? 'text-emerald-700' : trend === 'down' ? 'text-red-600' : 'text-neutral-900'

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-5 flex flex-col gap-2">
      <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</div>
      <div className={`flex items-center gap-1.5 text-3xl font-bold ${valueColor}`}>
        {value}
        <TrendIndicator trend={trend} />
      </div>
      {context && (
        <div className="text-xs text-neutral-500 leading-snug">{context}</div>
      )}
    </div>
  )
}

export default MetricCard
