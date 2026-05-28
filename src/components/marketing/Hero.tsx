import Link from 'next/link'
import { Button } from '../ui'
import { HERO } from '../../content/data/home'

/**
 * Hero section — server component. All copy sourced from src/content/data/home.ts
 */
export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{HERO.title}</h1>
        <p className="mt-4 text-lg text-neutral-700">{HERO.subtitle}</p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
          <Button asChild variant="primary">
            <Link href={HERO.primaryCta.href} className="inline-block">{HERO.primaryCta.label}</Link>
          </Button>

          <Button asChild variant="ghost">
            <Link href={HERO.secondaryCta.href} className="inline-block">{HERO.secondaryCta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
