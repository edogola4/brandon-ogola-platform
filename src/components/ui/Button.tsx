import React from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Native button type — only applies when asChild is false */
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  /** Render the single child element as the interactive element, forwarding styles */
  asChild?: boolean
  className?: string
  onClick?: (e: React.MouseEvent) => void
  children?: React.ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:     'bg-accent-600 text-white hover:bg-accent-700 focus-visible:ring-accent-500',
  secondary:   'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus-visible:ring-neutral-300',
  ghost:       'bg-transparent text-accent-600 hover:bg-neutral-50 focus-visible:ring-accent-200',
  destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

function Spinner() {
  return (
    <span aria-hidden="true" className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  asChild = false,
  className = '',
  onClick,
  children,
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
  const classes = `${base} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`.trim()
  const isDisabled = disabled || loading

  if (asChild && React.isValidElement(children)) {
    // Forward styles and disabled state onto the child element (e.g. next/link <a>, <a download>).
    // Never used for submit buttons — use type="submit" on Button directly instead.
    const child = children as React.ReactElement<React.HTMLAttributes<HTMLElement> & { disabled?: boolean }>
    return (
      <span className="relative inline-flex">
        {React.cloneElement(child, {
          className: `${classes} ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`.trim(),
          'aria-disabled': isDisabled,
        })}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Spinner />
          </span>
        )}
      </span>
    )
  }

  return (
    <button type={type} className={classes} disabled={isDisabled} onClick={onClick}>
      <span className="relative inline-flex items-center gap-2">
        <span className={loading ? 'opacity-0' : undefined}>{children}</span>
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </span>
        )}
      </span>
    </button>
  )
}

export default Button
