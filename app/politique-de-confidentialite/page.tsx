import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { breadcrumbSchema } from '@/lib/schema'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  robots: { index: false, follow: true },
  alternates: { canonical: '/politique-de-confidentialite' },
}

export default function PrivacyPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Accueil', path: '/' },
              { name: 'Politique de confidentialité', path: '/politique-de-confidentialite' },
            ])
          ),
        }}
      />
      <PageHeader
        eyebrow="Vos données"
        title="Politique de confidentialité"
        breadcrumb="Politique de confidentialité"
      />
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-muted-foreground text-sm leading-relaxed">
          <div>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">Données collectées</h2>
            <p>
              Lorsque vous utilisez le formulaire de demande de rendez-vous, {siteConfig.name} collecte les
              informations que vous saisissez volontairement : prénom, nom, e-mail, téléphone, ainsi que les détails
              de votre projet de tatouage (style, zone, taille, budget, description, images de référence le cas
              échéant). Ces informations sont utilisées exclusivement pour vous recontacter au sujet de votre demande.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">Mesure d&apos;audience</h2>
            <p>
              Ce site utilise Vercel Analytics, un outil de mesure d&apos;audience respectueux de la vie privée qui ne
              dépose pas de cookie et n&apos;identifie pas individuellement les visiteurs. Il permet uniquement de
              comprendre la fréquentation globale du site.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">Conservation et destinataires</h2>
            <p>
              Les informations transmises via le formulaire de contact sont adressées directement au studio et ne
              sont partagées avec aucun tiers à des fins commerciales. Elles sont conservées le temps nécessaire au
              traitement de votre demande.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit
              d&apos;accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit,
              contactez le studio au {siteConfig.phoneDisplay}.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl font-bold text-foreground mb-3">Cookies</h2>
            <p>
              Ce site peut utiliser des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire
              ou de traçage tiers n&apos;est déposé sans votre consentement.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
