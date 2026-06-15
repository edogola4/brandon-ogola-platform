import React from 'react'

const ITEMS = [
  'ASP.NET Core',
  'C#',
  'Next.js',
  'TypeScript',
  'React',
  'Blazor',
  'Python',
  'Flask',
  'Fastify',
  'Node.js',
  'PostgreSQL',
  'pgvector',
  'Redis',
  'Prisma',
  'M-Pesa Daraja',
  'Pesapal',
  'WhatsApp Business',
  "Africa's Talking",
  'Anthropic Claude',
  'OpenAI',
  'Azure',
  'AWS',
  'Docker',
  'Kubernetes',
  'Terraform',
  'GitHub Actions',
  'Turborepo',
  'SignalR',
  'Shopify',
  'SendGrid',
]

export default function TrustMarquee(): React.ReactElement {
  return (
    <div
      aria-label="Technologies and integrations Brandon has worked with"
      className="w-full overflow-hidden border-b border-neutral-100 py-5 marquee-container"
    >
      <p className="sr-only">Technologies and integrations</p>
      <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 text-center mb-4">
        Technologies &amp; integrations
      </div>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-group">
            {ITEMS.map((it) => (
              <span key={it} className="inline-flex items-center">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  {it}
                </span>
                <span className="mx-3 text-neutral-300" aria-hidden="true">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
