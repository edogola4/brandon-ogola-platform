import React from 'react'
import ContactForm from '../../components/contact/ContactForm'
import { ExternalLink } from '../../components/ui'
import { generatePageMetadata } from '../../lib/metadata'

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Contact',
    description:
      'Get in touch to discuss a software engineering engagement or opportunity. Backend APIs, full-stack SaaS, AI integrations, and Azure infrastructure. Based in Nairobi, Kenya.',
    path: '/contact',
  })
}

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Contact</h1>

      <div className="mt-6 space-y-4">
        <p className="text-neutral-600 leading-relaxed">
          I read every message personally. If your project is a good fit I'll respond with specific thoughts, not a template.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <div className="flex items-center gap-2 text-neutral-500">
            <svg className="w-4 h-4 text-emerald-500 shrink-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8zm6-2v2.5l1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Responds within 1–2 business days
          </div>
          <div className="flex items-center gap-2 text-neutral-500">
            <svg className="w-4 h-4 text-neutral-400 shrink-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M2 4h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4zm0 0l6 5 6-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <ExternalLink href="mailto:edogola4@gmail.com" className="text-neutral-600 hover:text-neutral-900">edogola4@gmail.com</ExternalLink>
          </div>
          <div className="flex items-center gap-2 text-neutral-500">
            <svg className="w-4 h-4 text-neutral-400 shrink-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5 7v4M5 5v.5M8 11V7c0-1 .5-1.5 1.5-1.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <ExternalLink href="https://linkedin.com/in/brandon-ogola-b77063232" className="text-neutral-600 hover:text-neutral-900">LinkedIn</ExternalLink>
          </div>
        </div>
      </div>

      <ContactForm />
    </main>
  )
}
