export type Service = {
  title: string
  description: string
  capabilities: string[]
}

export const SERVICES: Service[] = [
  {
    title: "Backend & API Engineering",
    description: "Design and delivery of production-grade server-side systems.",
    capabilities: [
      "ASP.NET Core web APIs",
      "Node.js Fastify services",
      "RESTful API design and documentation",
      "PostgreSQL query optimisation and schema design",
      "Authentication and authorisation systems",
      "SignalR real-time features",
      "Entity Framework Core migrations",
    ],
  },
  {
    title: "Full-Stack Product Builds",
    description: "End-to-end feature delivery across the full application stack.",
    capabilities: [
      "Next.js App Router applications",
      "React component systems",
      "Blazor Server and WebAssembly",
      "Turborepo monorepo architecture",
      "TypeScript throughout",
      "Responsive, accessible UI implementation",
    ],
  },
  {
    title: "AI Feature Integration",
    description: "Production AI features integrated into existing or greenfield products.",
    capabilities: [
      "Anthropic Claude API integration",
      "OpenAI embeddings and semantic search",
      "pgvector similarity search",
      "AI chatbot systems with domain constraints",
      "Retrieval-augmented generation pipelines",
      "Streaming response implementation",
    ],
  },
  {
    title: "Cloud & DevOps",
    description: "Cloud infrastructure, containerisation, and automated deployment pipelines.",
    capabilities: [
      "Azure App Services, Service Bus, Redis Cache, Key Vault",
      "Docker containerisation",
      "Kubernetes orchestration",
      "Terraform infrastructure as code",
      "GitHub Actions CI/CD pipelines",
      "Zero-downtime deployment strategies",
    ],
  },
]

export const ENGAGEMENT_MODEL =
  "I work on a contract or project basis. Engagements typically run 4–12 weeks. I communicate in English, work asynchronously across time zones, and deliver documented, tested, production-ready code."

export const POSITIONING_STATEMENT =
  "I take on select contract and freelance engagements in backend engineering, full-stack SaaS builds, AI feature development, and cloud deployment. Particularly experienced with Azure infrastructure and African payment systems (M-Pesa, Pesapal)."

// Page and UI labels used by the services page (kept as exports to avoid hardcoded strings in JSX)
export const PAGE_TITLE = "Services"
export const HEADING_WHAT_I_BUILD = "What I build"
export const HEADING_HOW_I_WORK = "How I work"
export const HEADING_GET_IN_TOUCH = "Get in touch"
export const CONTACT_BODY = "To discuss an engagement, reach out directly."
export const CONTACT_EMAIL = "edogola4@gmail.com"
export const CONTACT_LINKEDIN_TEXT = "LinkedIn"
export const CONTACT_LINKEDIN_URL =
  "https://linkedin.com/in/brandon-ogola-b77063232"
