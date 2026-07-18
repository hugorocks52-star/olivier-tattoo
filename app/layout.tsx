import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tattoo Lounge — Salon de tatouage à Auvers-sur-Oise',
  description:
    'Tattoo Lounge, salon de tatouage et piercing à Auvers-sur-Oise. Réalisations personnalisées, covers, réalisme et fineline par Olivier. Note 4,7/5 sur 217 avis Google.',
  keywords: [
    'tatoueur Auvers-sur-Oise',
    'salon de tatouage Val-d\'Oise',
    'cover tatouage Auvers-sur-Oise',
    'tatouage réalisme 95',
    'Tattoo Lounge',
    'Olivier tatoueur',
  ],
  openGraph: {
    title: 'Tattoo Lounge — Salon de tatouage à Auvers-sur-Oise',
    description: 'Salon de tatouage et piercing professionnel. 4,7/5 sur 217 avis Google.',
    type: 'website',
    locale: 'fr_FR',
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Tattoo Lounge',
      description: 'Salon de tatouage et piercing',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '37 rue du Général-de-Gaulle',
        addressLocality: 'Auvers-sur-Oise',
        postalCode: '95430',
        addressCountry: 'FR',
      },
      telephone: '+33161031229',
      openingHours: ['Mo-Sa 10:00-19:00'],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.7',
        reviewCount: '217',
      },
      url: 'https://tattoolounge-olivier.fr',
    }),
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="antialiased font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
