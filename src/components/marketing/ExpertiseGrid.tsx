import { EXPERTISE_AREAS } from '../../content/data/expertise'

/**
 * Expertise grid listing core areas.
 */
export default function ExpertiseGrid() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {EXPERTISE_AREAS.map((area) => (
          <div key={area.title}>
            <h3 className="text-lg font-semibold">{area.title}</h3>
            <p className="mt-2 text-neutral-700">{area.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
