'use client'

import React from 'react'
import { contactSchema, type ContactFormData, PROJECT_TYPES, BUDGET_RANGES, TIMELINES, type Intent } from '../../lib/schemas/contact'
import { Button } from '../ui'

/** Map intent param → most relevant projectType default */
function intentToProjectType(intent: Intent | undefined): ContactFormData['projectType'] {
  if (intent === 'role') return 'Other'
  return 'Full-Stack Build'
}

interface Props {
  intent?: Intent
  project?: string
}

export default function ContactForm({ intent, project }: Props) {
  const defaultBrief = project
    ? `Hi Brandon, I came across your ${project} case study and I'd like to talk about...`
    : ''

  const [form, setForm] = React.useState<ContactFormData>({
    name: '',
    email: '',
    company: undefined,
    projectType: intentToProjectType(intent),
    brief: defaultBrief,
    budgetRange: undefined,
    timeline: undefined,
    intent: intent ?? undefined,
    sourceProject: project ?? undefined,
  })

  const [errors, setErrors] = React.useState<Partial<Record<keyof ContactFormData, string[]>>>({})
  const [submitting, setSubmitting] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [rateLimitMsg, setRateLimitMsg] = React.useState<string | null>(null)

  function handleChange<K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) {
    setForm((s) => ({ ...s, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setRateLimitMsg(null)
    setSubmitting(true)
    setErrors({})

    const parsed = contactSchema.safeParse(form)
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors
      setErrors(flat)
      setSubmitting(false)
      const first = Object.keys(flat)[0]
      const el = document.querySelector(`[name="${first}"]`) as HTMLElement | null
      el?.focus()
      return
    }

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(parsed.data), headers: { 'Content-Type': 'application/json' } })
      if (res.status === 201) {
        setSuccess(true)
      } else if (res.status === 429) {
        const json = await res.json()
        const retryAfter = json.retryAfter ?? 0
        const mins = Math.ceil(retryAfter / 60)
        setRateLimitMsg(`Too many submissions. Please try again in ${mins} minutes.`)
      } else if (res.status === 422) {
        const json = await res.json()
        const errs = json.errors?.fieldErrors ?? {}
        setErrors(errs)
      } else {
        const json = await res.json()
        if (json?.error) setRateLimitMsg(String(json.error))
      }
    } catch {
      setRateLimitMsg('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="mt-8 max-w-2xl rounded-md border border-neutral-200 bg-neutral-50 px-6 py-8" role="status" aria-live="polite">
        <p className="text-lg font-semibold text-neutral-900">Thanks for reaching out.</p>
        <p className="mt-2 text-sm text-neutral-600">I'll review your inquiry and be in touch within 2 business days.</p>
      </div>
    )
  }

  return (
    <form className="mt-8 max-w-2xl space-y-6" onSubmit={handleSubmit} noValidate>

      {/* Hidden fields — carry context through to API even if brief is edited */}
      <input type="hidden" name="sourceProject" value={form.sourceProject ?? ''} />
      <input type="hidden" name="intent" value={form.intent ?? ''} />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
        />
        {errors.name && errors.name.length > 0 && (
          <div role="alert" className="text-sm text-red-600 mt-1">{errors.name[0]}</div>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
        />
        {errors.email && errors.email.length > 0 && (
          <div role="alert" className="text-sm text-red-600 mt-1">{errors.email[0]}</div>
        )}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-1">Company / Organisation (optional)</label>
        <input
          id="company"
          name="company"
          value={form.company ?? ''}
          onChange={(e) => handleChange('company', e.target.value || undefined)}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
        />
        {errors.company && errors.company.length > 0 && (
          <div role="alert" className="text-sm text-red-600 mt-1">{errors.company[0]}</div>
        )}
      </div>

      {/* Reason for contact — pre-selected from intent param, always editable */}
      <div>
        <label htmlFor="intent" className="block text-sm font-medium text-neutral-700 mb-1">Reason for contact</label>
        <div className="relative">
          <select
            id="intent"
            name="intent"
            value={form.intent ?? ''}
            onChange={(e) => handleChange('intent', (e.target.value as Intent) || undefined)}
            className="w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          >
            <option value="">Select a reason</option>
            <option value="freelance">Freelance or contract work</option>
            <option value="role">A role or opportunity</option>
            <option value="general">Just saying hi / something else</option>
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-500">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-neutral-700 mb-1">Project type</label>
        <div className="relative">
          <select
            id="projectType"
            name="projectType"
            value={form.projectType}
            onChange={(e) => handleChange('projectType', e.target.value as ContactFormData['projectType'])}
            className="w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          >
            {PROJECT_TYPES.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-500">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        {errors.projectType && errors.projectType.length > 0 && (
          <div role="alert" className="text-sm text-red-600 mt-1">{errors.projectType[0]}</div>
        )}
      </div>

      <div>
        <label htmlFor="brief" className="block text-sm font-medium text-neutral-700 mb-1">Project brief</label>
        <textarea
          id="brief"
          name="brief"
          placeholder="Describe what you need built, the problem it solves, and any relevant context."
          value={form.brief}
          onChange={(e) => handleChange('brief', e.target.value)}
          className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent min-h-[160px] resize-y"
        />
        {errors.brief && errors.brief.length > 0 && (
          <div role="alert" className="text-sm text-red-600 mt-1">{errors.brief[0]}</div>
        )}
      </div>

      <div>
        <label htmlFor="budgetRange" className="block text-sm font-medium text-neutral-700 mb-1">Budget range (optional)</label>
        <div className="relative">
          <select
            id="budgetRange"
            name="budgetRange"
            value={form.budgetRange ?? ''}
            onChange={(e) => handleChange('budgetRange', e.target.value ? (e.target.value as ContactFormData['budgetRange']) : undefined)}
            className="w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          >
            <option value="">Select</option>
            {BUDGET_RANGES.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-500">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        {errors.budgetRange && errors.budgetRange.length > 0 && (
          <div role="alert" className="text-sm text-red-600 mt-1">{errors.budgetRange[0]}</div>
        )}
      </div>

      <div>
        <label htmlFor="timeline" className="block text-sm font-medium text-neutral-700 mb-1">Timeline (optional)</label>
        <div className="relative">
          <select
            id="timeline"
            name="timeline"
            value={form.timeline ?? ''}
            onChange={(e) => handleChange('timeline', e.target.value ? (e.target.value as ContactFormData['timeline']) : undefined)}
            className="w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          >
            <option value="">Select</option>
            {TIMELINES.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-500">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        {errors.timeline && errors.timeline.length > 0 && (
          <div role="alert" className="text-sm text-red-600 mt-1">{errors.timeline[0]}</div>
        )}
      </div>

      {rateLimitMsg && (
        <div role="alert" className="text-sm text-red-600">{rateLimitMsg}</div>
      )}

      <div>
        <Button type="submit" loading={submitting}>
          Send inquiry
        </Button>
      </div>
    </form>
  )
}
