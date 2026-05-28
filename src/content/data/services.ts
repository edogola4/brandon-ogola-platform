export type Service = {
  title: string
  description: string
  capabilities: string[]
}

export const SERVICES: Service[] = [
  {
    title: 'Backend & API Engineering',
    description: 'Design and delivery of production-grade server-side systems.',
    capabilities: [
      'ASP.NET Core web APIs',
      'Node.js Fastify services',
      'RESTful API design and documentation',
      'PostgreSQL query optimisation and schema design',
      'Authentication and authorisation systems',
      'SignalR real-time features',
      'Entity Framework Core migrations',
    ],
  },
  {
    title: 'Full-Stack Product Builds',
    description: 'End-to-end feature delivery across the full application stack.',
    capabilities: [
      'Next.js App Router applications',
      'React component systems',
      'Blazor Server and WebAssembly',
      'Turborepo monorepo architecture',
      'TypeScript throughout',
      'Responsive, accessible UI implementation',
    ],
  },
  {
    title: 'AI Feature Integration',
    description: 'Production AI features integrated into existing or greenfield products.',
    capabilities: [
      'Anthropic Claude API integration',
      'OpenAI embeddings and semantic search',
      'pgvector similarity search',
      'AI chatbot systems with domain constraints',
      'Retrieval-augmented generation pipelines',
      'Streaming response implementation',
    ],
  },
  {
    title: 'Cloud & DevOps',
    description: 'Cloud infrastructure, containerisation, and automated deployment pipelines.',
    capabilities: [
      'Azure App Services, Service Bus, Redis Cache, Key Vault',
      'Docker containerisation',
      'Kubernetes orchestration',
      'Terraform infrastructure as code',
      'GitHub Actions CI/CD pipelines',
      'Zero-downtime deployment strategies',
    ],
  },
]

export type WorkingPrinciple = {
  label: string
  detail: string
}

export const WORKING_PRINCIPLES: WorkingPrinciple[] = [
  {
    label: 'Contract or project basis',
    detail: 'Engagements typically run 4–12 weeks. Scope and deliverables are agreed upfront.',
  },
  {
    label: 'Async by default',
    detail: 'I work across time zones and communicate in English. Daily written updates, no timezone-dependent standups required.',
  },
  {
    label: 'Production-ready delivery',
    detail: 'All code is documented, tested, and deployed. Nothing handed over as a prototype unless explicitly scoped that way.',
  },
  {
    label: 'Direct engagement',
    detail: 'You work with me directly — no account managers, no handoffs to junior developers mid-engagement.',
  },
]

export const POSITIONING_STATEMENT =
  'I take on select contract and freelance engagements in backend engineering, full-stack SaaS builds, AI feature development, and cloud deployment. Particularly experienced with Azure infrastructure and African payment systems (M-Pesa, Pesapal).'

// Page labels
export const PAGE_TITLE = 'Services'
export const HEADING_WHAT_I_BUILD = 'What I build'
export const HEADING_HOW_I_WORK = 'How I work'
export const HEADING_SEE_THE_WORK = 'See the work'
export const SEE_THE_WORK_BODY = 'The case studies below cover the architecture decisions, implementation details, and measured outcomes from past engagements.'
export const SEE_THE_WORK_HREF = '/case-studies'
export const SEE_THE_WORK_LABEL = 'View case studies'
export const HEADING_GET_IN_TOUCH = 'Get in touch'
export const CONTACT_BODY =
  'Use the contact form to describe your project — what you need built, your timeline, and any relevant context. I respond within 2 business days.'
export const CONTACT_CTA_LABEL = 'Start a conversation'
export const CONTACT_CTA_HREF = '/contact'
export const CONTACT_EMAIL_LABEL = 'Prefer email?'
export const CONTACT_EMAIL = 'edogola4@gmail.com'
export const CONTACT_LINKEDIN_TEXT = 'Connect on LinkedIn'
export const CONTACT_LINKEDIN_URL = 'https://linkedin.com/in/brandon-ogola-b77063232'
