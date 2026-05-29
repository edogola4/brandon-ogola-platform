import React from 'react'

export default function OutcomeGrid({
  children,
  cols = 3,
}: {
  children: React.ReactNode
  cols?: 2 | 3 | 4
}) {
  const colClass =
    cols === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : cols === 2
        ? 'sm:grid-cols-2'
        : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={`not-prose grid grid-cols-1 ${colClass} gap-4 my-8`}>
      {children}
    </div>
  )
}
