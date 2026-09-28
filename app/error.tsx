'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return <div className="container-shell flex min-h-[78vh] items-center justify-center pt-28"><div className="max-w-lg text-center"><span className="mx-auto grid size-16 place-items-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive"><AlertTriangle className="size-7" /></span><p className="eyebrow mt-7">Erreur inattendue</p><h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.035em]">Un problème est survenu</h1><p className="mt-5 text-sm leading-7 text-muted-foreground">Réessayez. Si le problème persiste, contactez directement le studio.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button onClick={reset}><RotateCcw /> Réessayer</Button><Button asChild variant="outline"><Link href="/">Retour à l&apos;accueil</Link></Button></div></div></div>
}
