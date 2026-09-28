'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { AlertCircle, CheckCircle2, Loader2, Upload, X } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Reveal } from '@/components/motion/reveal'

interface FormData {
  prenom: string
  nom: string
  email: string
  telephone: string
  typeProjet: string
  style: string
  zone: string
  taille: string
  description: string
  budget: string
  periode: string
  consent: boolean
  website: string
}

const initialForm: FormData = { prenom: '', nom: '', email: '', telephone: '', typeProjet: '', style: '', zone: '', taille: '', description: '', budget: '', periode: '', consent: false, website: '' }
const styles = ['Réalisme', 'Noir & gris', 'Couleur', 'Fineline', 'Géométrique', 'Mandala', 'Cover-up', 'Aquarelle', 'Pas encore décidé(e)']
const zones = ['Bras', 'Avant-bras', 'Épaule', 'Poignet', 'Main', 'Cou', 'Dos', 'Torse', 'Côtes', 'Jambe', 'Mollet', 'Cheville', 'Autre']
const sizes = ['Très petit, moins de 5 cm', 'Petit, de 5 à 10 cm', 'Moyen, de 10 à 20 cm', 'Grand, de 20 à 30 cm', 'Très grand, plus de 30 cm']
const budgets = ['Moins de 100 €', '100 à 200 €', '200 à 400 €', '400 à 700 €', 'Plus de 700 €', 'À définir ensemble']
const projectTypes = ['Nouveau tatouage', 'Cover-up', 'Retouche ou finition', 'Piercing', 'Consultation uniquement']

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <div className="space-y-2"><Label className="text-xs text-muted-foreground">{label}{required && <span className="mr-1 text-primary">*</span>}</Label>{children}</div>
}

export function BookingForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [refImages, setRefImages] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const fileRef = useRef<HTMLInputElement>(null)
  const update = <K extends keyof FormData>(field: K, value: FormData[K]) => setForm((current) => ({ ...current, [field]: value }))

  const handleImages = (files: FileList | null) => {
    if (!files) return
    Array.from(files).slice(0, 5 - refImages.length).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => setRefImages((current) => [...current, event.target?.result as string].slice(0, 5))
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.consent) return
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, refImages }) })
      if (!response.ok) throw new Error('submission_failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'h-12 border-white/10 bg-white/[0.035] px-4 focus-visible:border-primary/50 focus-visible:ring-primary/20'
  const selectClass = 'h-12 w-full appearance-none rounded-lg border border-white/10 bg-[#151111] px-4 text-sm text-foreground transition-colors focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/20'

  if (status === 'success') {
    return <Reveal className="glow-gold rounded-3xl border border-primary/25 bg-card/70 p-8 text-center sm:p-12"><span className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary"><CheckCircle2 className="size-8" /></span><h3 className="mt-5 text-2xl font-black">Votre demande a bien été envoyée</h3><p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-muted-foreground">Olivier vous recontactera après avoir étudié les informations afin d&apos;échanger sur le projet et fixer un rendez-vous.</p><Button variant="outline" className="mt-7" onClick={() => { setStatus('idle'); setForm(initialForm); setRefImages([]) }}>Nouvelle demande</Button></Reveal>
  }

  return (
    <Reveal>
      <form onSubmit={handleSubmit} className="surface-panel rounded-3xl p-5 sm:p-8 lg:p-10">
        <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="website">Ne pas remplir ce champ</label><input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => update('website', event.target.value)} /></div>

        <div className="mb-9 flex items-start justify-between gap-5 border-b border-white/10 pb-7"><div><span className="eyebrow mb-3">Formulaire de projet</span><h2 className="text-2xl font-black">Parlez-nous de votre idée</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Plus votre demande est précise, plus notre première réponse pourra l&apos;être.</p></div><span className="hidden rounded-full border border-white/10 px-3 py-1 text-[0.65rem] text-muted-foreground sm:block">3 minutes environ</span></div>

        <section>
          <h3 className="mb-5 text-sm font-bold text-foreground">1. Vos coordonnées</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Prénom" required><Input required value={form.prenom} onChange={(e) => update('prenom', e.target.value)} placeholder="Votre prénom" className={inputClass} /></Field>
            <Field label="Nom"><Input value={form.nom} onChange={(e) => update('nom', e.target.value)} placeholder="Votre nom" className={inputClass} /></Field>
            <Field label="E-mail" required><Input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="nom@exemple.fr" className={inputClass} /></Field>
            <Field label="Téléphone"><Input type="tel" value={form.telephone} onChange={(e) => update('telephone', e.target.value)} placeholder="06 00 00 00 00" className={inputClass} /></Field>
          </div>
        </section>

        <section className="mt-10 border-t border-white/10 pt-8">
          <h3 className="mb-5 text-sm font-bold text-foreground">2. Votre projet</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Type de projet" required><select required value={form.typeProjet} onChange={(e) => update('typeProjet', e.target.value)} className={selectClass}><option value="">Sélectionner</option>{projectTypes.map((item) => <option key={item}>{item}</option>)}</select></Field>
            <Field label="Style souhaité"><select value={form.style} onChange={(e) => update('style', e.target.value)} className={selectClass}><option value="">Sélectionner</option>{styles.map((item) => <option key={item}>{item}</option>)}</select></Field>
            <Field label="Zone du corps"><select value={form.zone} onChange={(e) => update('zone', e.target.value)} className={selectClass}><option value="">Sélectionner</option>{zones.map((item) => <option key={item}>{item}</option>)}</select></Field>
            <Field label="Taille approximative"><select value={form.taille} onChange={(e) => update('taille', e.target.value)} className={selectClass}><option value="">Sélectionner</option>{sizes.map((item) => <option key={item}>{item}</option>)}</select></Field>
            <Field label="Budget indicatif"><select value={form.budget} onChange={(e) => update('budget', e.target.value)} className={selectClass}><option value="">Sélectionner</option>{budgets.map((item) => <option key={item}>{item}</option>)}</select></Field>
            <Field label="Période souhaitée"><Input value={form.periode} onChange={(e) => update('periode', e.target.value)} placeholder="Par exemple : septembre ou un week-end" className={inputClass} /></Field>
          </div>
          <div className="mt-4"><Field label="Description du projet" required><Textarea required rows={6} value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Décrivez le motif, l'ambiance, sa signification et vos inspirations..." className="resize-none border-white/10 bg-white/[0.035] p-4 leading-7 focus-visible:border-primary/50 focus-visible:ring-primary/20" /></Field></div>
        </section>

        <section className="mt-10 border-t border-white/10 pt-8">
          <h3 className="text-sm font-bold text-foreground">3. Images de référence</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">Ajoutez jusqu&apos;à 5 inspirations, croquis ou aperçus issus de l&apos;essayage virtuel.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {refImages.map((image, index) => <div key={image.slice(0, 32) + index} className="relative size-24 overflow-hidden rounded-xl border border-white/10"><Image src={image} alt={`Référence ${index + 1}`} fill unoptimized className="object-cover" /><button type="button" onClick={() => setRefImages((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="absolute right-1 top-1 grid size-7 cursor-pointer place-items-center rounded-lg bg-black/70 text-white" aria-label="Supprimer cette image"><X className="size-3.5" /></button></div>)}
            {refImages.length < 5 && <button type="button" onClick={() => fileRef.current?.click()} className="grid size-24 cursor-pointer place-items-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] text-muted-foreground transition hover:border-primary/40 hover:text-primary"><span className="flex flex-col items-center gap-2 text-xs"><Upload className="size-5" /> Ajouter</span></button>}
          </div>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImages(e.target.files)} />
        </section>

        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4"><Checkbox id="consent" checked={form.consent} onCheckedChange={(checked) => update('consent', checked === true)} /><Label htmlFor="consent" className="cursor-pointer text-xs font-normal leading-6 text-muted-foreground">J&apos;accepte que les informations saisies soient utilisées par Tattoo Lounge pour étudier ma demande et me recontacter.</Label></div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center"><Button type="submit" size="lg" disabled={!form.consent || status === 'sending' || !form.prenom || !form.email || !form.typeProjet || !form.description}>{status === 'sending' ? <><Loader2 className="animate-spin" /> Envoi en cours</> : 'Envoyer ma demande'}</Button><p className="max-w-md text-xs leading-6 text-muted-foreground">L&apos;envoi du formulaire ne confirme pas le rendez-vous. Olivier vous recontactera pour valider le projet et ses disponibilités.</p></div>

        {status === 'error' && <Alert variant="destructive" className="mt-6 border-destructive/30 bg-destructive/5 p-4"><AlertCircle /><AlertTitle>La demande n&apos;a pas pu être envoyée</AlertTitle><AlertDescription>Réessayez ou contactez directement le studio par téléphone.</AlertDescription></Alert>}
      </form>
    </Reveal>
  )
}
