import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { ContactSection } from '@/components/contact-section'
import { breadcrumbSchema } from '@/lib/schema'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = { title: 'Contact & accès', description: `Adresse, téléphone, horaires et accès à ${siteConfig.name}, ${siteConfig.address.city}.`, alternates: { canonical: '/contact' } }

export default function ContactPage() {
  return <div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Contact', path: '/contact' }])) }} /><PageHeader eyebrow="Restons en contact" title="Contact & accès" description="Pour une question rapide, appelez le studio. Pour présenter un projet complet, utilisez le formulaire de rendez-vous." breadcrumb="Contact" /><section className="section-space"><div className="container-shell"><ContactSection /></div></section></div>
}
