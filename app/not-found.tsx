import Link from 'next/link'
import { buttonVariants } from '@heroui/styles'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">Erreur 404</p>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
          Cette page n&apos;existe pas
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-10">
          La page que vous recherchez a peut-être été déplacée ou n&apos;existe plus. Retrouvez le portfolio ou
          prenez rendez-vous avec Olivier.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className={buttonVariants({ variant: 'primary', size: 'md' })}>
            Retour à l&apos;accueil
          </Link>
          <Link href="/portfolio" className={buttonVariants({ variant: 'outline', size: 'md' })}>
            Voir le portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
