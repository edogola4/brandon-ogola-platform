import { TESTIMONIALS } from '../../content/data/testimonials'

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="max-w-6xl mx-auto px-4 py-12 border-b border-neutral-100"
    >
      <h2
        id="testimonials-heading"
        className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-6"
      >
        What people say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="border border-neutral-200 rounded-lg p-5 flex flex-col gap-4 border-l-4 border-l-neutral-900"
          >
            <blockquote className="flex-1">
              <p className="text-sm text-neutral-600 leading-relaxed italic">{t.quote}</p>
            </blockquote>
            <figcaption>
              <div className="text-sm font-semibold text-neutral-900">{t.name}</div>
              <div className="text-xs text-neutral-400 mt-0.5">
                {t.title} · {t.company}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
