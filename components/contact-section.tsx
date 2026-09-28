import { Camera, Clock3, ExternalLink, MapPin, Navigation, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { siteConfig } from '@/lib/site-config'
import { Stagger, StaggerItem } from '@/components/motion/reveal'

export function ContactSection() {
  const today = new Date().getDay()
  return (
    <Stagger className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
      <StaggerItem className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <Card className="border-white/10 bg-card/55 py-0"><CardContent className="flex gap-4 p-6"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><MapPin className="size-5" /></span><div><h3 className="font-bold">Adresse du studio</h3><address className="mt-2 text-sm not-italic leading-7 text-muted-foreground">{siteConfig.address.street}<br />{siteConfig.address.postalCode} {siteConfig.address.city}<br />{siteConfig.address.region}, {siteConfig.address.country}</address><a href={siteConfig.mapsQuery} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"><Navigation className="size-3.5" /> Obtenir l&apos;itinéraire</a></div></CardContent></Card>
        <Card className="border-white/10 bg-card/55 py-0"><CardContent className="flex gap-4 p-6"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Phone className="size-5" /></span><div><h3 className="font-bold">Téléphone</h3><a href={`tel:${siteConfig.phone}`} className="mt-2 block text-sm text-muted-foreground hover:text-primary">{siteConfig.phoneDisplay}</a><Button asChild size="sm" className="mt-4"><a href={`tel:${siteConfig.phone}`}><Phone /> Appeler le studio</a></Button></div></CardContent></Card>
        <Card className="border-white/10 bg-card/55 py-0 sm:col-span-2 lg:col-span-1"><CardContent className="flex gap-4 p-6"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Clock3 className="size-5" /></span><div className="flex-1"><h3 className="mb-3 font-bold">Horaires d&apos;ouverture</h3><table className="w-full text-sm" aria-label="Horaires du studio"><tbody>{siteConfig.hours.map(({ day, hours }, index) => { const dayIndex = index === 6 ? 0 : index + 1; const isToday = dayIndex === today; return <tr key={day} className={isToday ? 'text-primary' : 'text-muted-foreground'}><td className="py-1.5 font-medium">{day}</td><td className="py-1.5 text-right">{hours}</td>{isToday && <td className="w-20 py-1.5 text-right text-[0.65rem]">Aujourd&apos;hui</td>}</tr> })}</tbody></table></div></CardContent></Card>
        <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary sm:col-span-2 lg:col-span-1"><span className="inline-flex items-center gap-2"><Camera className="size-4" /> Instagram du studio</span><ExternalLink className="size-4" /></a>
      </StaggerItem>
      <StaggerItem className="relative min-h-[32rem] overflow-hidden rounded-3xl border border-white/10 bg-card shadow-2xl shadow-black/25">    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.82901858488!2d2.166292477045582!3d49.07088467136174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e65efab780a069%3A0xd2cbf26c4e74142e!2s37%20Rue%20du%20G%C3%A9n%C3%A9ral%20de%20Gaulle%2C%2095430%20Auvers-sur-Oise!5e0!3m2!1sen!2sfr!4v1790611547132!5m2!1sen!2sfr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title="Map of 37 Rue du Général de Gaulle, Auvers-sur-Oise"
      /><div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_90px_20px_rgba(9,7,7,.5)]" /><Button asChild variant="outline" className="absolute bottom-4 right-4 bg-background/90 sm:backdrop-blur-xl"><a href={siteConfig.mapsQuery} target="_blank" rel="noreferrer">Ouvrir dans Maps <ExternalLink /></a></Button></StaggerItem>
    </Stagger>
  )
}

