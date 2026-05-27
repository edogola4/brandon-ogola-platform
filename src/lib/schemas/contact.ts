import { z } from 'zod'

export const PROJECT_TYPES = [
  'Backend Engineering',
  'Full-Stack Build',
  'AI Integration',
  'Cloud & DevOps',
  'Other',
] as const

export const BUDGET_RANGES = ['Under $5k', '$5k–$15k', '$15k–$50k', '$50k+', 'Not sure'] as const
export const TIMELINES = ['ASAP', '1–3 months', '3–6 months', 'Exploring'] as const

export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  projectType: z.enum(PROJECT_TYPES as unknown as [string, ...string[]]),
  brief: z.string().min(20).max(1000),
  budgetRange: z.enum(BUDGET_RANGES as unknown as [string, ...string[]]).optional(),
  timeline: z.enum(TIMELINES as unknown as [string, ...string[]]).optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export type ProjectType = (typeof PROJECT_TYPES)[number]
export type BudgetRange = (typeof BUDGET_RANGES)[number]
export type Timeline = (typeof TIMELINES)[number]
