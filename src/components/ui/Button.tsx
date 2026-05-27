import React from 'react'

/**
 * Button variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'

/**
 * Button sizes
 */
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * Props for Button component.
 */
export type ButtonProps = {
  /** Visual variant */
  variant?: ButtonVariant
  /** Size */
  size?: ButtonSize
  /** Loading state */
  loading?: boolean
  /** Disabled state */
  disabled?: boolean
  /** When true, renders child element as the interactive element */
  asChild?: boolean
  /** Layout-only class overrides */
  className?: string
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void
  /** Children */
  children?: React.ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-accent-600 text-white hover:bg-accent-700 focus-visible:ring-accent-500',
  secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:ring-neutral-300',
  ghost: 'bg-transparent text-accent-600 hover:bg-neutral-50 focus-visible:ring-accent-200',
  destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500'
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

/** Accessible spinner used during loading */
function Spinner() {
  return (
    <span aria-hidden="true" className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  )
}

/**
 * Button primitive. Uses composition via asChild when requested. Width is locked during loading to avoid layout shifts.
 */
export function Button({ variant = 'primary', size = 'md', loading = false, disabled = false, asChild = false, className = '', onClick, children }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
  const classes = `${base} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`.trim()

  // Content wrapper keeps layout width during loading: content becomes invisible but occupies space
  const content = <span className={loading ? 'opacity-0' : undefined}>{children}</span>

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement>>
    // Do not attempt to read child.props.* (unsafe across arbitrary element types).
    // Instead override className and handlers on the cloned element.
    return React.cloneElement(child, {
      className: classes,
      'aria-disabled': disabled || loading,
      onClick: (e: React.MouseEvent) => {
        if (disabled || loading) {
          e.preventDefault()
          return
        }
        onClick?.(e)
      }
    })
  }

  return (
    <button type="button" className={classes} disabled={disabled || loading} onClick={onClick}>
      <span className="relative inline-flex items-center">
        {content}
        {loading && <span className="absolute inset-0 flex items-center justify-center"><Spinner /></span>}
      </span>
    </button>
  )
}

export default Button
