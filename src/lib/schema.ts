export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Brandon Ogola',
    jobTitle: 'Software Engineer',
    url: 'https://brandonogola.dev',
    sameAs: [
      'https://github.com/edogola4',
      'https://linkedin.com/in/brandon-ogola-b77063232',
    ],
    knowsAbout: [
      'ASP.NET Core', 'Next.js', 'TypeScript', 'PostgreSQL',
      'Azure', 'M-Pesa integration', 'AI integrations', 'Microservices',
    ],
    address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'KE' },
  }
}

export function articleSchema(article: {
  title: string
  description: string
  date: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: 'Brandon Ogola',
      url: 'https://brandonogola.dev',
    },
    url: article.url,
  }
}
