import Link from 'next/link'
import { ArrowLeft, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return <div className="container-shell flex min-h-[78vh] items-center justify-center pt-28"><div className="max-w-lg text-center"><span className="mx-auto grid size-16 place-items-center rounded-2xl border border-primary/20 bg-primary/10 text-primary"><SearchX className="size-7" /></span><p className="eyebrow mt-7">Erreur 404</p><h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.035em] sm:text-5xl">Cette page n&apos;existe pas</h1><p className="mt-5 text-sm leading-7 text-muted-foreground">L&apos;adresse a peut-être changé. Revenez à l&apos;accueil ou découvrez le portfolio.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild><Link href="/"><ArrowLeft /> Retour à l&apos;accueil</Link></Button><Button asChild variant="outline"><Link href="/portfolio">Voir le portfolio</Link></Button></div></div></div>
}
