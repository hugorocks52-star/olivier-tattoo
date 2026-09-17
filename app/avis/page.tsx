import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ReviewsSection } from '@/components/reviews-section'
import { breadcrumbSchema } from '@/lib/schema'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Avis clients',
  description: `Découvrez les avis de nos clients — ${siteConfig.rating.value}/5 sur ${siteConfig.rating.count} avis Google pour Tattoo Lounge à ${siteConfig.address.city}.`,
  alternates: { canonical: '/avis' },
}

export default function AvisPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Avis', path: '/avis' }])),
        }}
      />
      <PageHeader
        eyebrow="Témoignages"
        title="Ce que disent nos clients"
        description={`${siteConfig.rating.value}/5 sur ${siteConfig.rating.count} avis ${siteConfig.rating.provider}.`}
        breadcrumb="Avis"
      />
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewsSection />
        </div>
      </section>
    </div>
  )
}
