export const PROFESSIONAL_SUMMARY: string =
  "Brandon Ogola is a full-stack software engineer based in Nairobi, Kenya. He started at Moringa School in 2022, building his full-stack foundation in JavaScript, TypeScript, React, and Node.js, while simultaneously completing a BSc in Computer Science at the University of Nairobi — covering data structures, algorithms, distributed systems, and computer networks.\n\nHis first professional role was at REAL BIZ Digital in 2023, delivering across three client projects and increasing user engagement by 25%. He deepened his low-level programming and system design through the ALX Software Engineering Program, building 15+ projects in C, Linux/Unix, and distributed systems.\n\nFrom there he built Riggs London Kenya — a solo production e-commerce platform integrating M-Pesa STK Push, Pesapal, an Anthropic Claude AI chatbot, pgvector semantic search, and real-time notifications. He then joined Alliance Bioversity CIAT automating workflows for a 12-person team, and most recently Cognativ Technology, where he cut API response times by 35% and achieved 80% test coverage on the SmartSaaS enterprise platform. He is currently architecting SmartSchedule Healthcare — an enterprise SaaS on .NET and Azure targeting the healthcare scheduling problem."

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
    organisation: 'Alliance Bioversity International and CIAT',
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
      'Production-grade African payment systems including M-Pesa STK Push, Pesapal, webhook handling, idempotency patterns, and payment state machines — built and shipped on Riggs London Kenya.'
  },
  {
    domain: 'Healthcare SaaS',
    detail:
      'Enterprise appointment scheduling SaaS on .NET and Azure with microservices, CQRS/Event Sourcing, ML.NET prediction, HIPAA-aligned design, and full Terraform IaC across three environments.'
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
      'Production AI features using Anthropic Claude and OpenAI embeddings — AI chatbot with domain constraints, pgvector semantic search, RAG pipelines, and streaming responses. Shipped on a live e-commerce platform.'
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
