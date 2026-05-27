import type { Metadata } from 'next'
import React from 'react'
import { Button, Tag, ExternalLink } from '../../components/ui'
import {
  SKILLS,
  EXPERIENCE,
  EDUCATION,
  PROJECTS,
  CERTIFICATIONS,
  PROFESSIONAL_SUMMARY,
  PAGE_TITLE,
  DOWNLOAD_PDF_TEXT,
  HEADING_SUMMARY,
  HEADING_TECHNICAL,
  HEADING_EXPERIENCE,
  HEADING_EDUCATION,
  HEADING_PROJECTS,
  HEADING_CERTIFICATIONS,
  DOWNLOAD_FILENAME,
  SEP,
} from '../../content/data/resume'

export function generateMetadata(): Metadata {
  return {
    title: 'Resume — Brandon Ogola',
    description:
      'Full-stack software engineer resume — 2+ years delivering production systems in fintech, healthcare, and SaaS. Based in Nairobi, Kenya.',
  }
}

export default function ResumePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 print:w-full print:mx-0">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{PAGE_TITLE}</h1>
        <Button variant="secondary" size="md" asChild className="print:hidden">
          <a href={DOWNLOAD_FILENAME} download>
            {DOWNLOAD_PDF_TEXT}
          </a>
        </Button>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">{HEADING_SUMMARY}</h2>
        <p className="mt-3 text-gray-700">{PROFESSIONAL_SUMMARY}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">{HEADING_TECHNICAL}</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((group) => (
            <div key={group.category}>
              <div className="text-xs uppercase tracking-wide text-gray-500">{group.category}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">{HEADING_EXPERIENCE}</h2>
        <div className="mt-4 space-y-6">
          {EXPERIENCE.map((e) => (
            <article key={`${e.company}${SEP}${e.period}`}>
              <h3 className="text-lg font-semibold">{e.title}{SEP}{e.company}</h3>
              <div className="text-sm text-gray-500">{e.location}{SEP}{e.period}</div>
              <ul className="mt-3 list-disc list-inside space-y-2">
                {e.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">{HEADING_EDUCATION}</h2>
        <div className="mt-4 space-y-4">
          {EDUCATION.map((edu) => (
            <article key={`${edu.institution}${edu.period}`}>
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <div className="text-sm text-gray-500">{edu.institution}{SEP}{edu.location}{SEP}{edu.period}</div>
              <p className="mt-2 text-gray-700">{edu.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold">{HEADING_PROJECTS}</h2>
        <div className="mt-4 space-y-6">
          {PROJECTS.map((p) => (
            <article key={p.name}>
              <h3 className="text-lg font-semibold">
                <ExternalLink href={p.url}>{p.name}</ExternalLink>
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                <Tag label={p.stack} />
                {p.period ? <div className="text-sm text-gray-500">{p.period}</div> : null}
              </div>
              <ul className="mt-3 list-disc list-inside space-y-2">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">{HEADING_CERTIFICATIONS}</h2>
        <ul className="mt-4 list-disc list-inside space-y-2">
          {CERTIFICATIONS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
