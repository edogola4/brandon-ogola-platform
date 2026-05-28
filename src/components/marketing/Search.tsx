'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { SearchResult } from '@/lib/search'

export default function Search() {
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const debounceRef = useRef<number | null>(null)

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (query.length < 2) {
      // do not search for queries shorter than 2 chars
      return
    }

    setIsLoading(true)
    debounceRef.current = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = (await res.json()) as SearchResult[]
        setResults(data)
        setHasSearched(true)
      } catch (err) {
        setResults([])
        setHasSearched(true)
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  return (
    <section aria-label="Semantic search">
      <label htmlFor="site-search" className="sr-only">
        Search case studies and articles
      </label>

      <div>
        <input
          id="site-search"
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search case studies and articles"
          aria-label="Search case studies and articles"
          className="w-full rounded border p-2"
        />
      </div>

      <div aria-live="polite" className="mt-2">
        {isLoading && <div>Searching...</div>}
        {!isLoading && hasSearched && (
          <div>
            {results.length > 0 ? (
              <div>
                <div className="mb-2">{results.length} results for your search</div>
                <ul role="list">
                  {results.map((r) => (
                    <li key={`${r.contentType}-${r.slug}`} role="listitem" className="mb-3">
                      <Link href={r.contentType === 'article' ? `/writing/${r.slug}` : `/case-studies/${r.slug}`}>
                        <a className="block">
                          <div className="font-medium">{r.title}</div>
                          <div className="text-sm text-muted-foreground">{r.contentType === 'article' ? 'Article' : 'Case Study'}</div>
                          <div className="text-sm">{r.excerpt.slice(0, 120)}</div>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>No results for "{query}"</div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
