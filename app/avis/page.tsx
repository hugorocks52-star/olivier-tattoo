import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ReviewsSection } from '@/components/reviews-section'
import { breadcrumbSchema } from '@/lib/schema'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = { title: 'Avis clients', description: `${siteConfig.rating.value}/5 sur ${siteConfig.rating.count} avis Google pour Tattoo Lounge.`, alternates: { canonical: '/avis' } }

export default function ReviewsPage() {
  return <div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Avis', path: '/avis' }])) }} /><PageHeader eyebrow="Expériences réelles" title="Ce que disent nos clients" description={`${siteConfig.rating.value.toLocaleString('fr-FR')}/5 sur ${siteConfig.rating.count} avis publiés sur Google.`} breadcrumb="Avis" /><section className="section-space"><div className="container-shell"><ReviewsSection /></div></section></div>
}
