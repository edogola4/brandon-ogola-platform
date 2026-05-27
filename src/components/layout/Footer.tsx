import Link from 'next/link'
import { ExternalLink } from '../ui'

/**
 * Server component: footer with three-column layout on desktop and stacked mobile layout.
 */
export default function Footer() {
  const year = new Date().getFullYear()
  const navLinks: Array<{ label: string; href: string }> = [
    { label: 'Home', href: '/' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Services', href: '/services' },
    { label: 'Writing', href: '/writing' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <footer className="w-full border-t border-neutral-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-lg font-semibold">Brandon Ogola</div>
          </div>

          <nav className="flex items-center justify-center">
            <ul className="flex flex-wrap gap-4 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-4">
            <ExternalLink href="https://github.com/edogola4" className="text-sm" aria-label="GitHub - Brandon Ogola">GitHub</ExternalLink>
            <ExternalLink href="https://linkedin.com/in/brandon-ogola-b77063232" className="text-sm" aria-label="LinkedIn - Brandon Ogola">LinkedIn</ExternalLink>
            <ExternalLink href="mailto:edogola4@gmail.com" className="text-sm" aria-label="Email Brandon Ogola">Email</ExternalLink>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-neutral-600">
          © {year} Brandon Ogola. Built with Next.js. Deployed on Vercel.
        </div>
      </div>
    </footer>
  )
}
