'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '../../content/data/navigation'

export default function HeaderClient() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // Apply scroll backdrop directly onto the server-rendered backdrop div
  useEffect(() => {
    const backdrop = document.getElementById('header-backdrop')
    function onScroll() {
      const isScrolled = window.scrollY > 8
      setScrolled(isScrolled)
      if (backdrop) {
        backdrop.className = isScrolled
          ? 'absolute inset-0 -z-10 transition-all duration-200 bg-white/90 backdrop-blur-sm border-b border-neutral-200'
          : 'absolute inset-0 -z-10 transition-all duration-200'
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on Escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav aria-label="Site navigation" className="flex items-center gap-4">
      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? 'font-semibold text-neutral-900'
                  : 'font-normal text-neutral-600 hover:text-neutral-900'
              }`}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile menu toggle */}
      <button
        type="button"
        className="md:hidden text-sm font-medium text-neutral-700 hover:text-neutral-900"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setOpen((s) => !s)}
      >
        {open ? 'Close' : 'Menu'}
      </button>

      {/* Mobile menu overlay */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            aria-hidden="true"
            className="fixed inset-0 top-16 z-30 bg-black/20"
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-neutral-200 shadow-sm"
          >
            <ul className="flex flex-col px-4 py-3 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-2 text-base ${
                      pathname === link.href
                        ? 'font-semibold text-neutral-900'
                        : 'font-normal text-neutral-600'
                    }`}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </nav>
  )
}
