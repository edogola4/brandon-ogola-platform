import React from 'react'

/**
 * Variant class mapping. All visual classes must come from Tailwind tokens.
 */
export const VARIANT_CLASSES = {
  h1: 'text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-neutral-900',
  h2: 'text-3xl md:text-4xl font-semibold leading-tight text-neutral-900',
  h3: 'text-2xl font-semibold leading-tight text-neutral-900',
  h4: 'text-xl font-medium text-neutral-900',
  p: 'text-base leading-relaxed text-neutral-800',
  lead: 'text-lg leading-relaxed text-neutral-800',
  small: 'text-sm text-neutral-700',
  mono: 'font-mono text-sm text-neutral-800',
  caption: 'text-xs text-neutral-600'
} as const

/**
 * Typography variants (keys of VARIANT_CLASSES)
 */
export type TypographyVariant = keyof typeof VARIANT_CLASSES

/**
 * Props for the Typography component.
 * @template T - element type to render as
 */
export type TypographyProps<T extends React.ElementType = 'p'> = {
  /** Typography variant */
  variant?: TypographyVariant
  /** Override rendered element */
  as?: T
  /** Layout only class overrides */
  className?: string
  /** Children */
  children?: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'children'>

/**
 * Polymorphic Typography component.
 * Renders semantic HTML and maps variants to Tailwind classes defined in VARIANT_CLASSES.
 */
export function Typography<T extends React.ElementType = 'p'>(props: TypographyProps<T>) {
  const { as, variant = 'p', className = '', children, ...rest } = props
  const Component = (as ?? (variant.startsWith('h') ? variant : variant === 'p' || variant === 'lead' ? 'p' : 'span')) as React.ElementType
  const classes = `${VARIANT_CLASSES[variant]} ${className}`.trim()
  return (
    <Component className={classes} {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}>
      {children}
    </Component>
  )
}

export default Typography
