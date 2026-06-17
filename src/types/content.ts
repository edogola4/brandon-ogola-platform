import { z } from 'zod'

export const CaseStudyFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  client: z.string(),
  date: z.string(),
  status: z.enum(['live', 'in-development', 'archived']),
  tags: z.array(z.string()),
  stack: z.array(z.string()),
  outcomes: z.array(z.object({ metric: z.string(), value: z.string(), context: z.string() })),
  liveUrl: z.string().url().optional(),
  tagline: z.string().optional(),
  decisions: z.array(z.object({ choice: z.string(), reasoning: z.string() })).optional(),
  readingTime: z.number().optional(),
})

export const ArticleFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()),
  readingTime: z.number().optional(),
  canonical: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
})

export type CaseStudyFrontmatter = z.infer<typeof CaseStudyFrontmatterSchema>
export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>
