import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ContactSection } from '@/components/contact-section'
import { breadcrumbSchema } from '@/lib/schema'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Contact & accès',
  description: `Adresse, téléphone et horaires de Tattoo Lounge : ${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}.`,
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Contact', path: '/contact' }])),
        }}
      />
      <PageHeader eyebrow="Nous trouver" title="Contact & accès" breadcrumb="Contact" />
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactSection />
        </div>
      </section>
    </div>
  )
}
