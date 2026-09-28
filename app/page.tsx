import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Phone, ScanLine, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/hero-section'
import { PortfolioGallery } from '@/components/portfolio-gallery'
import { StudioSection } from '@/components/studio-section'
import { ReviewsSection } from '@/components/reviews-section'
import { FaqSection } from '@/components/faq-section'
import { SectionHeader } from '@/components/section-header'
import { Reveal } from '@/components/motion/reveal'
import { siteConfig } from '@/lib/site-config'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <section className="section-space relative overflow-hidden"><div className="absolute left-0 top-1/3 hidden size-80 rounded-full bg-primary/8 blur-[100px] sm:block" aria-hidden="true" /><div className="container-shell relative"><SectionHeader eyebrow="Sélection d'œuvres" title="Chaque pièce raconte une histoire unique" description="Découvrez une sélection de projets en réalisme, fineline, couleur et cover, dessinés pour la morphologie et l'histoire de chaque client." /><PortfolioGallery variant="teaser" limit={6} /></div></section>
      <div className="section-divider" />
      <section id="salon" className="section-space bg-surface/55"><div className="container-shell"><SectionHeader eyebrow="À propos du studio" title="18 ans d'expérience, sans jamais se répéter" /><StudioSection variant="teaser" /><Reveal className="mt-12 text-center"><Button asChild variant="outline" size="lg"><Link href="/studio">Découvrir le studio <ArrowRight /></Link></Button></Reveal></div></section>
      <section className="section-space relative overflow-hidden"><div className="absolute right-0 top-1/4 hidden size-[28rem] rounded-full bg-wine/20 blur-[120px] sm:block" aria-hidden="true" /><div className="container-shell relative"><Reveal className="glow-wine grid overflow-hidden rounded-3xl border border-white/10 bg-card/75 lg:grid-cols-2"><div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14"><span className="eyebrow mb-5">Outil interactif</span><h2 className="text-balance text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl">Visualisez votre tatouage avant de vous lancer</h2><p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">Importez votre photo et le motif souhaité, puis ajustez sa position, sa taille, son angle et son intensité avant d&apos;enregistrer l&apos;aperçu.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg"><Link href="/essai-virtuel"><ScanLine /> Commencer l&apos;essayage</Link></Button><span className="inline-flex items-center gap-2 px-2 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-primary" /> Vos images restent privées</span></div></div><div className="relative min-h-[24rem] lg:min-h-[32rem]"><Image src="/images/portfolio-3.jpg" alt="Aperçu de l'outil d'essayage virtuel" fill className="bg-muted object-cover" sizes="(max-width: 1024px) 100vw, 50vw" /><div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent lg:bg-gradient-to-r" /></div></Reveal></div></section>
      <section id="avis" className="section-space border-y border-white/10 bg-surface/60"><div className="container-shell"><SectionHeader eyebrow="Expériences clients" title="Une confiance construite projet après projet" align="center" /><ReviewsSection limit={3} /></div></section>
      <section className="section-space"><div className="container-shell"><SectionHeader eyebrow="Questions fréquentes" title="Tout savoir avant de commencer" align="center" /><FaqSection /></div></section>
      <section className="pb-20 sm:pb-24 lg:pb-32"><div className="container-shell"><Reveal className="relative overflow-hidden rounded-3xl border border-primary/20 bg-[linear-gradient(135deg,rgba(118,31,45,.38),rgba(19,16,16,.9)_55%,rgba(214,173,106,.12))] px-6 py-14 text-center shadow-[0_30px_100px_-45px_rgba(118,31,45,.9)] sm:px-10 lg:py-20"><div className="ambient-grid absolute inset-0 opacity-40" /><div className="relative"><span className="eyebrow mb-5">Votre prochain projet</span><h2 className="text-balance text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl">Une idée en tête ? Parlons-en.</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">Partagez votre histoire et vos inspirations avec Olivier pour commencer ensemble le travail de création.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild size="lg"><Link href="/rendez-vous">Demander un rendez-vous <ArrowRight /></Link></Button><Button asChild variant="outline" size="lg"><a href={`tel:${siteConfig.phone}`}><Phone />{siteConfig.phoneDisplay}</a></Button></div><div className="mt-7 inline-flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="size-4 text-primary" />{siteConfig.address.street}, {siteConfig.address.city}</div></div></Reveal></div></section>
    </div>
  )
}
