import Link from 'next/link'
import HeaderClient from './HeaderClient'

/**
 * Server component: Header wrapper. Visual scroll behavior is handled in a small client child.
 */
export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-40">
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
