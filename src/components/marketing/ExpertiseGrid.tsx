import { EXPERTISE_AREAS } from '../../content/data/expertise'

export default function ExpertiseGrid() {
  return (
    <section aria-labelledby="expertise-heading" className="max-w-6xl mx-auto px-4 py-12 border-b border-neutral-100">
      <h2
        id="expertise-heading"
        className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6"
      >
        Areas of expertise
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXPERTISE_AREAS.map((area) => (
          <div
            key={area.title}
            className="border border-neutral-200 rounded-lg p-5 flex flex-col gap-2"
          >
            <h3 className="text-sm font-semibold text-neutral-900">{area.title}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">{area.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
