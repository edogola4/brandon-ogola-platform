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
export const INTENTS = ['freelance', 'role', 'general'] as const

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().max(100, 'Company name is too long').optional(),
  projectType: z.enum(PROJECT_TYPES as unknown as [string, ...string[]], { error: 'Please select a project type' }),
  brief: z.string().min(20, 'Please describe your project in at least 20 characters').max(1000, 'Brief must be under 1000 characters'),
  budgetRange: z.enum(BUDGET_RANGES as unknown as [string, ...string[]]).optional(),
  timeline: z.enum(TIMELINES as unknown as [string, ...string[]]).optional(),
  intent: z.enum(INTENTS as unknown as [string, ...string[]]).optional(),
  sourceProject: z.string().max(200).optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export type ProjectType = (typeof PROJECT_TYPES)[number]
export type BudgetRange = (typeof BUDGET_RANGES)[number]
export type Timeline = (typeof TIMELINES)[number]
export type Intent = (typeof INTENTS)[number]
