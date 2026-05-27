export const PROFESSIONAL_SUMMARY: string =
  "Brandon Ogola is a full-stack software engineer based in Nairobi, Kenya, with 2+ years of hands-on experience delivering production systems across fintech, healthcare, and SaaS domains. He specialises in scalable backend architecture, AI-integrated product features, and cloud-native infrastructure on Azure and AWS.\n\nHis work spans the full delivery lifecycle — from RESTful API design and database optimisation to CI/CD automation and zero-downtime deployment. He has built and integrated real-world payment systems (M-Pesa, Pesapal), AI-powered features (Anthropic Claude, OpenAI embeddings), and enterprise SaaS platforms using ASP.NET Core, Next.js, and Blazor."

export type TimelineType = 'employment' | 'education' | 'freelance'

export type TimelineEntry = {
  period: string
  role: string
  organisation: string
  location: string
  type: TimelineType
}

export const ENGINEERING_TIMELINE: TimelineEntry[] = [
  {
    period: 'Nov 2025 — Jan 2026',
    role: 'Software Engineer',
    organisation: 'Cognativ Technology Limited',
    location: 'Nairobi, Kenya',
    type: 'employment'
  },
  {
    period: 'May 2025 — Oct 2025',
    role: 'Freelance Full-Stack Developer',
    organisation: 'Self-Employed',
    location: 'Remote',
    type: 'freelance'
  },
  {
    period: 'Nov 2024 — Apr 2025',
    role: 'Operations Intern',
    organisation: 'Alliance Bioversity CIAT',
    location: 'Nairobi, Kenya',
    type: 'employment'
  },
  {
    period: 'Oct 2023 — Oct 2024',
    role: 'Freelance Full-Stack Developer',
    organisation: 'Self-Employed',
    location: 'Remote',
    type: 'freelance'
  },
  {
    period: 'Jun 2023 — Sep 2023',
    role: 'Software Developer Intern',
    organisation: 'REAL BIZ Digital',
    location: 'Nairobi, Kenya',
    type: 'employment'
  },
  {
    period: '2023 — 2024',
    role: 'Software Engineering Program',
    organisation: 'ALX Africa',
    location: 'Remote',
    type: 'education'
  },
  {
    period: 'Jun 2022 — Dec 2022',
    role: 'Software Development Bootcamp',
    organisation: 'Moringa School',
    location: 'Nairobi, Kenya',
    type: 'education'
  },
  {
    period: '2021 — 2025',
    role: 'BSc Computer Science',
    organisation: 'University of Nairobi',
    location: 'Nairobi, Kenya',
    type: 'education'
  }
]

export type DomainDepth = { domain: string; detail: string }

export const DOMAINS_OF_DEPTH: DomainDepth[] = [
  {
    domain: 'Fintech Systems',
    detail:
      "African payment infrastructure including M-Pesa STK Push, Pesapal, webhook handling, idempotency patterns, and payment state machines."
  },
  {
    domain: 'Healthcare SaaS',
    detail:
      'Enterprise appointment scheduling platform with microservices, CQRS/Event Sourcing, HIPAA-aligned design, and Azure cloud infrastructure.'
  },
  {
    domain: 'E-commerce Infrastructure',
    detail:
      'Mobile-first e-commerce with semantic product search, AI-powered guidance, real-time notifications, and Shopify inventory sync.'
  },
  {
    domain: 'Enterprise Tooling',
    detail:
      'Internal automation systems for research organisations — API design, data pipelines, PostgreSQL integration, and technical documentation.'
  },
  {
    domain: 'AI Integrations',
    detail:
      'Production AI features using Anthropic Claude and OpenAI embeddings — chatbots, semantic search, RAG pipelines, and streaming responses.'
  }
]

export type CurrentFocus = {
  project: string
  description: string
  status: string
  expectedMVP: string
}

export const CURRENT_FOCUS: CurrentFocus = {
  project: 'SmartSchedule Healthcare',
  description:
    "An AI-powered SaaS platform targeting 40% reduction in healthcare appointment no-shows and 50% administrative efficiency gains for East African healthcare providers.",
  status: 'In active development',
  expectedMVP: 'Q2 2026'
}

export type Availability = {
  status: string
  location: string
  openTo: string[]
}

export const AVAILABILITY: Availability = {
  status: 'Available for contract and freelance engagements',
  location: 'Nairobi, Kenya',
  openTo: ['Remote', 'Hybrid', 'On-site globally']
}
