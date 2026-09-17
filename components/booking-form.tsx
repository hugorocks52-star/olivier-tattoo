'use client'

import { useRef, useState } from 'react'
import { Upload, CheckCircle, X } from 'lucide-react'
import { TextField, Label, Input, TextArea, FieldError, Checkbox, Button, Alert } from '@heroui/react'
import { cn } from '@/lib/utils'
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
  /** honeypot — left empty by real visitors */
  website: string
}

const initialForm: FormData = {
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  typeProjet: '',
  style: '',
  zone: '',
  taille: '',
  description: '',
  budget: '',
  periode: '',
  consent: false,
  website: '',
}

const styles = ['Réalisme', 'Noir & gris', 'Couleur', 'Fineline', 'Géométrique', 'Mandala', 'Cover-up', 'Aquarelle', 'Pas encore décidé(e)']
const zones = ['Bras', 'Avant-bras', 'Épaule', 'Poignet', 'Main', 'Cou', 'Dos', 'Torse', 'Côtes', 'Jambe', 'Mollet', 'Cheville', 'Pied', 'Autre']
const tailles = ['Très petit (< 5 cm)', 'Petit (5-10 cm)', 'Moyen (10-20 cm)', 'Grand (20-30 cm)', 'Très grand (> 30 cm)']
const budgets = ['Moins de 100 €', '100 – 200 €', '200 – 400 €', '400 – 700 €', 'Plus de 700 €', 'À définir avec Olivier']
const typesProjet = ['Nouveau tatouage', 'Cover-up', 'Retouche / finition', 'Piercing', 'Consultation seulement']

export function BookingForm() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [refImages, setRefImages] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const fileRef = useRef<HTMLInputElement>(null)

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleImages = (files: FileList | null) => {
    if (!files) return
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setRefImages((prev) => [...prev.slice(0, 4), e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, refImages }),
      })
      if (!res.ok) throw new Error('submission_failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const selectClass =
    'w-full bg-input border border-border text-foreground text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none'
  const selectLabelClass = 'block text-xs tracking-wider uppercase text-muted-foreground mb-1.5'

  if (status === 'success') {
    return (
      <Reveal className="rounded-lg bg-card border border-gold/30 p-10 text-center">
        <CheckCircle size={48} className="text-gold mx-auto mb-4" />
        <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Demande envoyée !</h3>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          Merci pour votre message. Olivier prendra contact avec vous dans les meilleurs délais pour discuter de
          votre projet et fixer un rendez-vous selon vos disponibilités.
        </p>
        <Button
          variant="outline"
          size="md"
          className="mt-6"
          onPress={() => {
            setStatus('idle')
            setForm(initialForm)
            setRefImages([])
          }}
        >
          Nouvelle demande
        </Button>
      </Reveal>
    )
  }

  return (
    <Reveal>
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Honeypot — hidden from real visitors, bots tend to fill every field */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir ce champ</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update('website', e.target.value)}
        />
      </div>

      <div>
        <h3 className="font-serif text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">Vos coordonnées</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField isRequired value={form.prenom} onChange={(v) => update('prenom', v)}>
            <Label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1.5">Prénom</Label>
            <Input placeholder="Votre prénom" fullWidth />
            <FieldError className="text-destructive text-xs mt-1" />
          </TextField>
          <TextField value={form.nom} onChange={(v) => update('nom', v)}>
            <Label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1.5">Nom</Label>
            <Input placeholder="Votre nom" fullWidth />
          </TextField>
          <TextField isRequired type="email" value={form.email} onChange={(v) => update('email', v)}>
            <Label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1.5">E-mail</Label>
            <Input placeholder="votre@email.fr" fullWidth />
            <FieldError className="text-destructive text-xs mt-1" />
          </TextField>
          <TextField type="tel" value={form.telephone} onChange={(v) => update('telephone', v)}>
            <Label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1.5">Téléphone</Label>
            <Input placeholder="06 00 00 00 00" fullWidth />
          </TextField>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">Votre projet</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="typeProjet" className={selectLabelClass}>Type de projet *</label>
            <select
              id="typeProjet"
              required
              value={form.typeProjet}
              onChange={(e) => update('typeProjet', e.target.value)}
              className={selectClass}
            >
              <option value="">Sélectionner…</option>
              {typesProjet.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="style" className={selectLabelClass}>Style souhaité</label>
            <select id="style" value={form.style} onChange={(e) => update('style', e.target.value)} className={selectClass}>
              <option value="">Sélectionner…</option>
              {styles.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="zone" className={selectLabelClass}>Zone du corps</label>
            <select id="zone" value={form.zone} onChange={(e) => update('zone', e.target.value)} className={selectClass}>
              <option value="">Sélectionner…</option>
              {zones.map((z) => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="taille" className={selectLabelClass}>Taille approximative</label>
            <select id="taille" value={form.taille} onChange={(e) => update('taille', e.target.value)} className={selectClass}>
              <option value="">Sélectionner…</option>
              {tailles.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="budget" className={selectLabelClass}>Budget indicatif</label>
            <select id="budget" value={form.budget} onChange={(e) => update('budget', e.target.value)} className={selectClass}>
              <option value="">Sélectionner…</option>
              {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <TextField value={form.periode} onChange={(v) => update('periode', v)}>
            <Label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1.5">Période souhaitée</Label>
            <Input placeholder="Ex : Septembre, week-end…" fullWidth />
          </TextField>
        </div>
        <TextField isRequired value={form.description} onChange={(v) => update('description', v)} className="mt-4">
          <Label className="block text-xs tracking-wider uppercase text-muted-foreground mb-1.5">Description du projet</Label>
          <TextArea
            rows={5}
            placeholder="Décrivez votre idée : motif, ambiance, signification, inspirations…"
            fullWidth
            className="resize-none"
          />
          <FieldError className="text-destructive text-xs mt-1" />
        </TextField>
      </div>

      <div>
        <h3 className="font-serif text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">Images de référence</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Ajoutez des photos d&apos;inspiration ou l&apos;aperçu créé dans l&apos;outil d&apos;essayage virtuel (facultatif).
        </p>
        <div className="flex flex-wrap gap-3">
          {refImages.map((img, i) => (
            <div key={i} className="relative w-20 h-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Référence ${i + 1}`} className="w-full h-full rounded-md object-cover" />
              <button
                type="button"
                onClick={() => setRefImages((prev) => prev.filter((_, j) => j !== i))}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label={`Supprimer l'image ${i + 1}`}
              >
                <X size={10} />
              </button>
            </div>
          ))}
          {refImages.length < 5 && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-20 h-20 border border-dashed border-border text-muted-foreground hover:border-gold hover:text-foreground transition-colors flex flex-col items-center justify-center gap-1"
              aria-label="Ajouter une image"
            >
              <Upload size={16} />
              <span className="text-xs">Ajouter</span>
            </button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleImages(e.target.files)}
          aria-label="Images de référence"
        />
      </div>

      <Checkbox isSelected={form.consent} onChange={(v) => update('consent', v)} isRequired>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Content className="font-normal text-muted-foreground text-sm leading-relaxed">
          J&apos;accepte que les informations saisies dans ce formulaire soient utilisées par Tattoo Lounge pour me
          recontacter dans le cadre de ma demande de rendez-vous. *
        </Checkbox.Content>
      </Checkbox>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isDisabled={!form.consent || status === 'sending' || !form.prenom || !form.email || !form.typeProjet || !form.description}
          isPending={status === 'sending'}
        >
          {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'}
        </Button>
        <p className="text-muted-foreground text-xs leading-relaxed max-w-xs">
          L&apos;envoi de ce formulaire ne constitue pas une confirmation de rendez-vous. Olivier vous recontactera
          pour valider votre projet et ses disponibilités.
        </p>
      </div>

      {status === 'error' && (
        <Alert status="danger">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Une erreur s&apos;est produite</Alert.Title>
            <Alert.Description>Veuillez réessayer ou nous appeler directement.</Alert.Description>
          </Alert.Content>
        </Alert>
      )}
    </form>
    </Reveal>
  )
}
