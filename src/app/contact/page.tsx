import React from 'react'
import ContactForm from '../../components/contact/ContactForm'

export function generateMetadata() {
  return {
    title: 'Contact — Brandon Ogola',
    description: 'Get in touch to discuss a contract or freelance software engineering engagement.',
  }
}

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Contact</h1>
      <ContactForm />
    </main>
  )
}
