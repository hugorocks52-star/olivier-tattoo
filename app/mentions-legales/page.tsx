import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/page-header'
import { breadcrumbSchema } from '@/lib/schema'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = { title: 'Mentions légales', robots: { index: false, follow: true }, alternates: { canonical: '/mentions-legales' } }

export default function LegalPage() {
  return <div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Mentions légales', path: '/mentions-legales' }])) }} /><PageHeader eyebrow="Informations légales" title="Mentions légales" breadcrumb="Mentions légales" /><section className="section-space"><div className="legal-copy mx-auto max-w-3xl space-y-4 px-5 text-sm leading-8 text-muted-foreground sm:px-8"><div><h2>Éditeur du site</h2><p>{siteConfig.name}<br />{siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}<br />Téléphone : {siteConfig.phoneDisplay}</p><p className="mt-3 text-xs italic">La forme juridique, le numéro SIRET/RCS et le responsable de la publication sont à compléter avant la mise en ligne définitive.</p></div><div><h2>Hébergement</h2><p>Le nom, l&apos;adresse et les coordonnées de l&apos;hébergeur sont à compléter avant la publication définitive.</p></div><div><h2>Propriété intellectuelle</h2><p>L&apos;ensemble des contenus présents sur ce site, incluant les textes, photographies, dessins et réalisations de tatouage, appartient à {siteConfig.name} ou à leurs auteurs. Toute reproduction ou utilisation commerciale sans autorisation écrite est interdite.</p></div><div><h2>Responsabilité</h2><p>{siteConfig.name} s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées, mais ne saurait être tenu responsable d&apos;un usage différent de ces informations ou d&apos;erreurs éventuelles.</p></div><div><h2>Contact</h2><p>Pour toute question relative au site, appelez le {siteConfig.phoneDisplay} ou utilisez le <Link href="/rendez-vous" className="text-primary hover:underline">formulaire de rendez-vous</Link>.</p></div></div></section></div>
}
