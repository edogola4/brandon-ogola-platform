import Link from 'next/link'
import { Button } from '../ui'
import { HERO } from '../../content/data/home'

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="max-w-6xl mx-auto px-4 pt-16 pb-14 border-b border-neutral-100"
    >
      <div className="max-w-2xl">

        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-snug tracking-tight text-neutral-900">
          {HERO.title}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-neutral-600">
          {HERO.subtitle}
        </p>

        <p className="mt-3 text-sm text-neutral-400">
          {HERO.location}
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button asChild variant="primary" size="lg" className="w-full sm:w-auto justify-center">
            <Link href={HERO.primaryCta.href}>{HERO.primaryCta.label}</Link>
          </Button>

          <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto justify-center">
            <Link href={HERO.secondaryCta.href}>{HERO.secondaryCta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
