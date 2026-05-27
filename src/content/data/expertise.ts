export type ExpertiseArea = {
  title: string
  description: string
}

export const EXPERTISE_AREAS: ExpertiseArea[] = [
  {
    title: 'Backend & API Engineering',
    description:
      'ASP.NET Core, Node.js Fastify, RESTful API design, PostgreSQL optimisation, authentication systems, SignalR'
  },
  {
    title: 'Full-Stack Product Builds',
    description:
      'Next.js App Router, React, Blazor Server and WebAssembly, Turborepo monorepo architecture'
  },
  {
    title: 'AI Feature Integration',
    description:
      'Anthropic Claude API, OpenAI embeddings, semantic search via pgvector, retrieval-augmented generation'
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Azure App Services, Service Bus, Redis Cache, Key Vault, Docker, Kubernetes, Terraform, GitHub Actions'
  },
  {
    title: "African Payment Systems",
    description:
      'M-Pesa Daraja API, Pesapal, STK Push integration, callback handling, idempotency patterns'
  },
  {
    title: 'Enterprise Architecture',
    description:
      'Microservices, CQRS and Event Sourcing, clean architecture, SOLID principles, TDD'
  }
]
