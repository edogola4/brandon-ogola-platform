import Link from 'next/link'
import HeaderClient from './HeaderClient'

/**
 * Server component: fixed header shell.
 * Background, blur, and border on scroll are applied by HeaderClient onto an
 * absolutely-positioned backdrop layer so the server component stays static.
 */
export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-40">
      {/* Backdrop layer — HeaderClient toggles visibility on scroll */}
      <div id="header-backdrop" className="absolute inset-0 -z-10 transition-all duration-200" />
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold">
            Brandon Ogola
          </Link>
          <HeaderClient />
        </div>
      </div>
    </header>
  )
}
