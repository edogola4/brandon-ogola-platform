import React from 'react'

export default function OutcomeGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
      {children}
    </div>
  )
}
