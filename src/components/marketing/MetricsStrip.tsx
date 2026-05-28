import { METRICS } from '../../content/data/metrics'
import { MetricCard } from '../ui'

export default function MetricsStrip() {
  return (
    <section aria-label="Key metrics" className="max-w-6xl mx-auto px-4 py-12 border-b border-neutral-100">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6">
        By the numbers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>
    </section>
  )
}
