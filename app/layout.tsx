import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { MotionConfig } from 'motion/react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PageTransition } from '@/components/motion/page-transition'
import { siteConfig } from '@/lib/site-config'
import { localBusinessSchema, websiteSchema } from '@/lib/schema'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | ${siteConfig.tagline}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: ['tatoueur Auvers-sur-Oise', "salon de tatouage Val-d'Oise", 'cover tatouage', 'tatouage réalisme', 'piercing', 'Tattoo Lounge'],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: 'website',
    locale: 'fr_FR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: '/images/hero-bg.jpg', width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: { card: 'summary_large_image', title: `${siteConfig.name} | ${siteConfig.tagline}`, description: siteConfig.description, images: ['/images/hero-bg.jpg'] },
  icons: {
    icon: [
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = { colorScheme: 'dark', themeColor: '#090707', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" dir="ltr" className={`dark ${inter.variable} ${playfair.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }} />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
          Aller au contenu principal
        </a>
        <MotionConfig reducedMotion={process.env.NODE_ENV === 'production' ? 'user' : 'never'}>
          <SiteHeader />
          <main id="main-content"><PageTransition>{children}</PageTransition></main>
          <SiteFooter />
        </MotionConfig>
        <Analytics />
      </body>
    </html>
  )
}
