import React from 'react'
import { Tag, ExternalLink } from '../../components/ui'
import {
  SKILLS,
  EXPERIENCE,
  EDUCATION,
  PROJECTS,
  CERTIFICATIONS,
  PROFESSIONAL_SUMMARY,
  PAGE_TITLE,
  HEADING_SUMMARY,
  HEADING_TECHNICAL,
  HEADING_EXPERIENCE,
  HEADING_EDUCATION,
  HEADING_PROJECTS,
  HEADING_CERTIFICATIONS,
} from '../../content/data/resume'
import { generatePageMetadata } from '../../lib/metadata'

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Resume',
    description:
      'Resume of Brandon Ogola — full-stack software engineer with experience in ASP.NET Core, Next.js, Azure, M-Pesa integrations, and AI features. Based in Nairobi, Kenya.',
    path: '/resume',
  })
}

export default function ResumePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 print:w-full print:mx-0">

      {/* Page header */}
      <div className="border-b border-neutral-100 pb-8 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-neutral-900">{PAGE_TITLE}</h1>
        <a
          href="/brandon-ogola-resume.pdf"
          download
          className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:border-neutral-500 hover:text-neutral-900 transition-colors print:hidden"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download PDF
        </a>
      </div>

      {/* Summary */}
      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {HEADING_SUMMARY}
        </h2>
        <p className="mt-4 text-neutral-700 leading-relaxed max-w-3xl">{PROFESSIONAL_SUMMARY}</p>
      </section>

      {/* Technical skills */}
      <section className="mt-10 border-t border-neutral-100 pt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {HEADING_TECHNICAL}
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((group) => (
            <div key={group.category}>
              <div className="text-xs font-medium uppercase tracking-wide text-neutral-400 mb-2">
                {group.category}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Tag key={item} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mt-10 border-t border-neutral-100 pt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {HEADING_EXPERIENCE}
        </h2>
        <div className="mt-6 space-y-0">
          {EXPERIENCE.map((e, i) => (
            <article
              key={`${e.company}-${e.period}`}
              className={i > 0 ? 'border-t border-neutral-100 pt-6 mt-6' : ''}
            >
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3 className="text-base font-semibold text-neutral-900">{e.title}</h3>
                <span className="text-neutral-300 select-none" aria-hidden="true">·</span>
                <span className="text-sm text-neutral-500">{e.company}</span>
              </div>
              <div className="mt-1 text-xs text-neutral-400">
                {e.location} · {e.period}
              </div>
              <ul className="mt-3 pl-5 list-disc space-y-1.5">
                {e.achievements.map((a) => (
                  <li key={a} className="text-sm text-neutral-700 leading-relaxed">{a}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-10 border-t border-neutral-100 pt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {HEADING_EDUCATION}
        </h2>
        <div className="mt-6 space-y-0">
          {EDUCATION.map((edu, i) => (
            <article
              key={`${edu.institution}-${edu.period}`}
              className={i > 0 ? 'border-t border-neutral-100 pt-6 mt-6' : ''}
            >
              <h3 className="text-base font-semibold text-neutral-900">{edu.degree}</h3>
              <div className="mt-1 text-xs text-neutral-400">
                {edu.institution} · {edu.location} · {edu.period}
              </div>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{edu.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mt-10 border-t border-neutral-100 pt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {HEADING_PROJECTS}
        </h2>
        <div className="mt-6 space-y-0">
          {PROJECTS.map((p, i) => (
            <article
              key={p.name}
              className={i > 0 ? 'border-t border-neutral-100 pt-6 mt-6' : ''}
            >
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-base font-semibold text-neutral-900">
                  {p.url ? (
                    <ExternalLink href={p.url} className="hover:text-neutral-600">
                      {p.name}
                    </ExternalLink>
                  ) : (
                    p.name
                  )}
                </h3>
                {p.period && (
                  <span className="text-xs text-neutral-400">{p.period}</span>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Tag key={s} label={s} />
                ))}
              </div>
              <ul className="mt-3 pl-5 list-disc space-y-1.5">
                {p.highlights.map((h) => (
                  <li key={h} className="text-sm text-neutral-700 leading-relaxed">{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mt-10 border-t border-neutral-100 pt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {HEADING_CERTIFICATIONS}
        </h2>
        <ul className="mt-6 pl-5 list-disc space-y-2">
          {CERTIFICATIONS.map((c) => (
            <li key={c} className="text-sm text-neutral-700 leading-relaxed">{c}</li>
          ))}
        </ul>
      </section>

    </main>
  )
}
