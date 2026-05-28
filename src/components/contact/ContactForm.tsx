'use client'

import React from 'react'
import { contactSchema, type ContactFormData, PROJECT_TYPES, BUDGET_RANGES, TIMELINES } from '../../lib/schemas/contact'
import { Button } from '../ui'

export default function ContactForm() {
  const [form, setForm] = React.useState<ContactFormData>({
    name: '',
    email: '',
    company: undefined,
    projectType: 'Other',
    brief: '',
    budgetRange: undefined,
    timeline: undefined,
  })

  const [errors, setErrors] = React.useState<Partial<Record<keyof ContactFormData, string[]>>>({})
  const [submitting, setSubmitting] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [rateLimitMsg, setRateLimitMsg] = React.useState<string | null>(null)

  function handleChange<K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) {
    setForm((s) => ({ ...s, [key]: value }))
    const shape = contactSchema.shape as Record<string, import('zod').ZodTypeAny>
    try {
      const fieldSchema = shape[key as string]
      if (fieldSchema) {
        // client-side single-field validation intentionally lightweight; main validation runs on submit
      }
    } catch {
      // ignore
    }
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
        if (json?.error) {
          setRateLimitMsg(String(json.error))
        }
      }
    } catch (err) {
      setRateLimitMsg('Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">Thanks for reaching out.</h1>
        <p className="mt-4 text-gray-700">I'll be in touch within 2 business days.</p>
      </div>
    )
  }

  return (
    <form className="mt-8 max-w-2xl space-y-6" onSubmit={handleSubmit} noValidate>
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

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-neutral-700 mb-1">Project type</label>
        <select
          id="projectType"
          name="projectType"
          value={form.projectType}
          onChange={(e) => handleChange('projectType', e.target.value as ContactFormData['projectType'])}
          className="w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
        >
          {PROJECT_TYPES.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
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
        <select
          id="budgetRange"
          name="budgetRange"
          value={form.budgetRange ?? ''}
          onChange={(e) => handleChange('budgetRange', e.target.value ? (e.target.value as ContactFormData['budgetRange']) : undefined)}
          className="w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
        >
          <option value="">Select</option>
          {BUDGET_RANGES.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.budgetRange && errors.budgetRange.length > 0 && (
          <div role="alert" className="text-sm text-red-600 mt-1">{errors.budgetRange[0]}</div>
        )}
      </div>

      <div>
        <label htmlFor="timeline" className="block text-sm font-medium text-neutral-700 mb-1">Timeline (optional)</label>
        <select
          id="timeline"
          name="timeline"
          value={form.timeline ?? ''}
          onChange={(e) => handleChange('timeline', e.target.value ? (e.target.value as ContactFormData['timeline']) : undefined)}
          className="w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
        >
          <option value="">Select</option>
          {TIMELINES.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
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
