import React from 'react'
import ServiceCard from '../../components/marketing/ServiceCard'
import { ExternalLink } from '../../components/ui'
import { generatePageMetadata } from '../../lib/metadata'
import {
  SERVICES,
  ENGAGEMENT_MODEL,
  POSITIONING_STATEMENT,
  PAGE_TITLE,
  HEADING_WHAT_I_BUILD,
  HEADING_HOW_I_WORK,
  HEADING_GET_IN_TOUCH,
  CONTACT_BODY,
  CONTACT_EMAIL,
  CONTACT_LINKEDIN_TEXT,
  CONTACT_LINKEDIN_URL,
} from '../../content/data/services'

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Services',
    description: 'Contract and freelance software engineering engagements — backend APIs, full-stack SaaS builds, AI integrations, and cloud infrastructure.',
    path: '/services',
  })
}

export default function ServicesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <section className="mb-10">
        <h1 className="text-3xl font-bold">{PAGE_TITLE}</h1>
        <p className="mt-4 text-lg text-gray-700">{POSITIONING_STATEMENT}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold">{HEADING_WHAT_I_BUILD}</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <section className="mb-10">
        <h2 className="text-2xl font-semibold">{HEADING_HOW_I_WORK}</h2>
        <p className="mt-4 text-gray-700">{ENGAGEMENT_MODEL}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">{HEADING_GET_IN_TOUCH}</h2>
        <p className="mt-4 text-gray-700">{CONTACT_BODY}</p>
        <div className="mt-4 flex flex-col gap-2">
          <ExternalLink href={`mailto:${CONTACT_EMAIL}`} className="text-sm">
            {CONTACT_EMAIL}
          </ExternalLink>
          <ExternalLink href={CONTACT_LINKEDIN_URL} className="text-sm">
            {CONTACT_LINKEDIN_TEXT}
          </ExternalLink>
        </div>
      </section>
    </main>
  )
}
