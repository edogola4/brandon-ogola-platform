import React from 'react'

/**
 * Badge variant types
 */
export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'

/**
 * Props for Badge component
 */
export type BadgeProps = {
  /** Variant */
  variant?: BadgeVariant
  /** Content */
  children?: React.ReactNode
  /** Layout-only classes */
  className?: string
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-800',
  success: 'bg-emerald-100 text-emerald-800',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-800',
  info: 'bg-sky-100 text-sky-800'
}

/**
 * Small badge component for semantic labelling
 */
export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const classes = `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${VARIANT_CLASSES[variant]} ${className}`.trim()
  return <span className={classes}>{children}</span>
}

export default Badge
