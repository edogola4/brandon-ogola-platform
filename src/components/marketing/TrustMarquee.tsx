import React from 'react'

const ITEMS = [
  'M-Pesa',
  'Pesapal',
  'Anthropic Claude',
  'OpenAI',
  'Azure',
  'AWS',
  'Docker',
  'Kubernetes',
  'Terraform',
  'PostgreSQL',
  'Redis',
  'ASP.NET Core',
  'Next.js',
  'TypeScript',
  'SignalR',
  'Shopify',
  'WhatsApp Business',
  "Africa's Talking",
  'SendGrid',
  'GitHub Actions',
  'Vercel',
  'Railway',
]

/**
 * Server component: pure CSS marquee, no JS.
 * Both groups are aria-hidden — content is decorative.
 * The outer div carries the accessible label for screen readers.
 */
export default function TrustMarquee(): React.ReactElement {
  return (
    <div
      aria-label="Technologies and integrations Brandon has worked with"
      className="w-full overflow-hidden border-b border-neutral-100 py-6 marquee-container"
    >
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="marquee-group">
            {ITEMS.map((it) => (
              <span key={it} className="inline-flex items-center">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  {it}
                </span>
                <span className="mx-4 text-neutral-300" aria-hidden="true">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
