'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@heroui/react'
import { buttonVariants } from '@heroui/styles'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">Erreur</p>
        <h1 className="font-serif text-4xl font-bold text-foreground mb-4 text-balance">
          Une erreur est survenue
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-10">
          Quelque chose s&apos;est mal passé de notre côté. Vous pouvez réessayer, ou nous contacter directement si le
          problème persiste.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="md" onPress={reset}>
            Réessayer
          </Button>
          <Link href="/" className={buttonVariants({ variant: 'outline', size: 'md' })}>
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
