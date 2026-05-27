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
  'Railway'
]

/**
 * Server component: pure CSS marquee that duplicates the item list for a seamless loop.
 */
export default function TrustMarquee(): React.ReactElement {
  return (
    <div role="marquee" aria-label="Technologies and integrations Brandon has worked with" className="w-full overflow-hidden">
      <div className="marquee-track flex items-center" aria-hidden={false}>
        <div className="marquee-group flex items-center whitespace-nowrap">
          {ITEMS.map((it, idx) => (
            <span key={it + idx} className="inline-flex items-center">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">{it}</span>
              {idx !== ITEMS.length - 1 && (
                <span aria-hidden="true" className="mx-3 opacity-50 text-neutral-400">·</span>
              )}
            </span>
          ))}
        </div>

        <div aria-hidden="true" className="marquee-group flex items-center whitespace-nowrap">
          {ITEMS.map((it, idx) => (
            <span key={it + '-copy-' + idx} className="inline-flex items-center">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">{it}</span>
              {idx !== ITEMS.length - 1 && (
                <span aria-hidden="true" className="mx-3 opacity-50 text-neutral-400">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
