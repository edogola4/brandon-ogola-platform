'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * Client component handling scroll state and mobile navigation.
 */
export default function HeaderClient() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function handleLinkClick() {
    setOpen(false)
  }

  const navLinks: Array<{ label: string; href: string }> = [
    { label: 'Home', href: '/' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Services', href: '/services' },
    { label: 'Writing', href: '/writing' },
    { label: 'Resume', href: '/resume' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <nav className="flex items-center gap-4">
      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-sm ${pathname === link.href ? 'font-semibold' : 'font-normal'}`}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile menu */}
      <div className="md:hidden">
        <button
          type="button"
          className="text-sm font-medium"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((s) => !s)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        {open && (
          <div id="mobile-menu" ref={panelRef} className={`mt-2 w-screen left-0 right-0 bg-white shadow-sm` }>
            <ul className="flex flex-col p-4 gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block text-base ${pathname === link.href ? 'font-semibold' : 'font-normal'}`}
                    aria-current={pathname === link.href ? 'page' : undefined}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Scroll state indicator applied as backdrop on small inner wrapper via aria-hidden element */}
      <div aria-hidden className={`${scrolled ? 'backdrop-blur-sm border-b border-neutral-200 bg-white/60' : 'bg-transparent' } hidden md:block absolute inset-x-0 top-0 h-0`} />
    </nav>
  )
}
