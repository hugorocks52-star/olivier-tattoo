import { LoaderCircle } from 'lucide-react'

export default function Loading() {
  return <div className="flex min-h-[65vh] items-center justify-center"><div className="flex items-center gap-3 text-sm text-muted-foreground"><LoaderCircle className="size-5 animate-spin text-primary" /> Chargement en cours</div></div>
}
