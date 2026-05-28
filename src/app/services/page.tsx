import React from 'react'
import Link from 'next/link'
import ServiceCard from '../../components/marketing/ServiceCard'
import { Button, ExternalLink } from '../../components/ui'
import { generatePageMetadata } from '../../lib/metadata'
import {
  SERVICES,
  WORKING_PRINCIPLES,
  POSITIONING_STATEMENT,
  PAGE_TITLE,
  HEADING_WHAT_I_BUILD,
  HEADING_HOW_I_WORK,
  HEADING_SEE_THE_WORK,
  SEE_THE_WORK_BODY,
  SEE_THE_WORK_HREF,
  SEE_THE_WORK_LABEL,
  HEADING_GET_IN_TOUCH,
  CONTACT_BODY,
  CONTACT_CTA_LABEL,
  CONTACT_CTA_HREF,
  CONTACT_EMAIL,
  CONTACT_LINKEDIN_TEXT,
  CONTACT_LINKEDIN_URL,
} from '../../content/data/services'

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Services',
    description:
      'Contract and freelance software engineering engagements — backend APIs, full-stack SaaS builds, AI integrations, and cloud infrastructure.',
    path: '/services',
  })
}

export default function ServicesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">

      {/* Page header */}
      <section className="border-b border-neutral-100 pb-10">
        <h1 className="text-3xl font-bold text-neutral-900">{PAGE_TITLE}</h1>
        <p className="mt-4 text-lg text-neutral-600 max-w-2xl leading-relaxed">
          {POSITIONING_STATEMENT}
        </p>
      </section>

      {/* What I build */}
      <section className="mt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {HEADING_WHAT_I_BUILD}
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.title}
              title={s.title}
              description={s.description}
              capabilities={s.capabilities}
            />
          ))}
        </div>
      </section>

      {/* See the work */}
      <section className="mt-12 border border-neutral-200 rounded-lg p-6">
        <h2 className="text-sm font-semibold text-neutral-900">{HEADING_SEE_THE_WORK}</h2>
        <p className="mt-2 text-sm text-neutral-500 leading-relaxed max-w-xl">
          {SEE_THE_WORK_BODY}
        </p>
        <div className="mt-4">
          <Button asChild variant="secondary" size="sm">
            <Link href={SEE_THE_WORK_HREF}>{SEE_THE_WORK_LABEL}</Link>
          </Button>
        </div>
      </section>

      {/* How I work */}
      <section className="mt-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {HEADING_HOW_I_WORK}
        </h2>
        <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {WORKING_PRINCIPLES.map((p) => (
            <div key={p.label} className="border border-neutral-200 rounded-lg p-5">
              <dt className="text-sm font-semibold text-neutral-900">{p.label}</dt>
              <dd className="mt-1.5 text-sm text-neutral-500 leading-relaxed">{p.detail}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Get in touch */}
      <section className="mt-12 border-t border-neutral-100 pt-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {HEADING_GET_IN_TOUCH}
        </h2>
        <p className="mt-4 text-neutral-600 leading-relaxed max-w-xl">{CONTACT_BODY}</p>
        <div className="mt-6">
          <Button asChild variant="primary" size="md">
            <Link href={CONTACT_CTA_HREF}>{CONTACT_CTA_LABEL}</Link>
          </Button>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <ExternalLink href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-neutral-500">
            {CONTACT_EMAIL}
          </ExternalLink>
          <ExternalLink href={CONTACT_LINKEDIN_URL} className="text-sm text-neutral-500">
            {CONTACT_LINKEDIN_TEXT}
          </ExternalLink>
        </div>
      </section>

    </main>
  )
}
