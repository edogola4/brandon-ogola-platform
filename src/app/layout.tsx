import './globals.css'
import SkipLink from '../components/layout/SkipLink'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export const metadata = {
  title: 'Brandon Ogola — Software Engineer',
  description:
    'Full-stack software engineer specialising in SaaS systems, AI integrations, and cloud-native infrastructure. Based in Nairobi, Kenya.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <SkipLink />
        <Header />
        <main id="main-content" role="main" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
