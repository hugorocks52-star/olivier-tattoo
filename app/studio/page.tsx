import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@heroui/styles'
import { PageHeader } from '@/components/page-header'
import { StudioSection } from '@/components/studio-section'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Le studio',
  description:
    "Tattoo Lounge, studio de tatouage à Auvers-sur-Oise depuis 18 ans. Découvrez Olivier, son approche et les spécialités du studio.",
  alternates: { canonical: '/studio' },
}

export default function StudioPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: 'Accueil', path: '/' }, { name: 'Le studio', path: '/studio' }])),
        }}
      />
      <PageHeader
        eyebrow="Le studio"
        title="18 ans de passion & d'expertise"
        breadcrumb="Le studio"
      />
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StudioSection variant="full" />
          <div className="mt-16 text-center">
            <Link href="/rendez-vous" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              Prendre rendez-vous avec Olivier
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
