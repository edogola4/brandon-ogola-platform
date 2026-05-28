import React from 'react'
import ContactForm from '../../components/contact/ContactForm'

import { generatePageMetadata } from '../../lib/metadata'

export function generateMetadata() {
  return generatePageMetadata({
    title: 'Contact',
    description: 'Get in touch to discuss a contract or freelance software engineering engagement.',
    path: '/contact',
  })
}

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Contact</h1>
      <ContactForm />
    </main>
  )
}
