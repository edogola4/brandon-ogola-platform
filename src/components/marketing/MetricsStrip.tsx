import { METRICS } from '../../content/data/metrics'
import { MetricCard } from '../ui'

/**
 * Metrics strip showing key metrics in a responsive grid.
 */
export default function MetricsStrip() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>
    </section>
  )
}
