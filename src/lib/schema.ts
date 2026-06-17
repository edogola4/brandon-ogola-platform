export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Brandon Ogola',
    jobTitle: 'Full-Stack Software Engineer',
    description:
      'Full-stack software engineer based in Nairobi, Kenya. Specialising in backend APIs, SaaS products, AI integrations, and Azure cloud infrastructure.',
    url: 'https://brandonogola.dev',
    email: 'edogola4@gmail.com',
    sameAs: [
      'https://github.com/edogola4',
      'https://linkedin.com/in/brandon-ogola-b77063232',
    ],
    knowsAbout: [
      'ASP.NET Core',
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'Azure',
      'M-Pesa integration',
      'AI integrations',
      'Microservices',
      'pgvector',
      'Anthropic Claude',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressCountry: 'KE',
    },
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
    '@type': 'TechArticle',
    headline: article.title,
    description: article.description,
    image: `https://brandonogola.dev/og?title=${encodeURIComponent(article.title)}&description=${encodeURIComponent(article.description)}&type=article`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: 'Brandon Ogola',
      url: 'https://brandonogola.dev',
      sameAs: [
        'https://github.com/edogola4',
        'https://linkedin.com/in/brandon-ogola-b77063232',
      ],
    },
    publisher: {
      '@type': 'Person',
      name: 'Brandon Ogola',
      url: 'https://brandonogola.dev',
    },
    url: article.url,
    mainEntityOfPage: article.url,
  }
}
