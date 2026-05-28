import React from 'react'

/**
 * Trend indicator types
 */
export type Trend = 'up' | 'down' | 'neutral'

/**
 * Props for MetricCard
 */
export type MetricCardProps = {
  /** Label text */
  label: string
  /** Value text */
  value: string
  /** Optional context text */
  context?: string
  /** Trend indicator */
  trend?: Trend
}

/**
 * MetricCard shows a metric value with a trend indicator.
 */
export function MetricCard({ label, value, context, trend = 'neutral' }: MetricCardProps) {
  const trendSymbol = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '—'
  const trendColor = trend === 'up' ? 'text-neutral-800' : trend === 'down' ? 'text-red-600' : 'text-neutral-700'

  return (
    <div className="bg-white border border-neutral-100 rounded-lg p-4">
      <div className="flex items-baseline gap-3">
        <div className="text-sm text-neutral-600">{label}</div>
        <div className={`text-2xl font-semibold ${trendColor}`}>{value}</div>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <span className={`${trendColor} font-medium`} aria-hidden>{trendSymbol}</span>
          <span className="text-neutral-500">{context}</span>
        </div>
      </div>
    </div>
  )
}

export default MetricCard
