import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { breadcrumbSchema } from '@/lib/schema'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Mentions légales',
  robots: { index: false, follow: true },
  alternates: { canonical: '/mentions-legales' },
}

export default function MentionsLegalesPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Mentions légales', path: '/mentions-legales' }])
          ),
        }}
      />
      <PageHeader eyebrow="Informations légales" title="Mentions légales" breadcrumb="Mentions légales" />
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-muted-foreground text-sm leading-relaxed">
          <div>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">Éditeur du site</h2>
            <p>
              {siteConfig.name}
              <br />
              {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}
              <br />
              Téléphone : {siteConfig.phoneDisplay}
            </p>
            <p className="mt-3 text-xs italic">
              Forme juridique, numéro SIRET/RCS et responsable de la publication à compléter par le studio avant mise
              en ligne définitive.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">Hébergement</h2>
            <p className="text-xs italic">Nom, adresse et contact de l&apos;hébergeur à compléter par le studio.</p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, photographies, illustrations, réalisations de
              tatouage) est la propriété de {siteConfig.name} et/ou de ses auteurs, sauf mention contraire. Toute
              reproduction, représentation ou diffusion, totale ou partielle, sans autorisation préalable, est
              interdite.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">Responsabilité</h2>
            <p>
              {siteConfig.name} s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées sur ce site
              mais ne saurait être tenu responsable des erreurs, omissions ou résultats qui pourraient être obtenus
              par un usage différent de ces informations.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">Contact</h2>
            <p>
              Pour toute question relative au site, contactez le studio au {siteConfig.phoneDisplay} ou via le{' '}
              <a href="/rendez-vous" className="text-gold hover:underline">
                formulaire de contact
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
