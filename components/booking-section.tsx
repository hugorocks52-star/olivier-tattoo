'use client'

import { useState, useRef } from 'react'
import { Upload, CheckCircle, AlertCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

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
}

const styles = ['Réalisme', 'Noir & gris', 'Couleur', 'Fineline', 'Géométrique', 'Mandala', 'Cover-up', 'Aquarelle', 'Pas encore décidé(e)']
const zones = ['Bras', 'Avant-bras', 'Épaule', 'Poignet', 'Main', 'Cou', 'Dos', 'Torse', 'Côtes', 'Jambe', 'Mollet', 'Cheville', 'Pied', 'Autre']
const tailles = ['Très petit (< 5 cm)', 'Petit (5-10 cm)', 'Moyen (10-20 cm)', 'Grand (20-30 cm)', 'Très grand (> 30 cm)']
const budgets = ['Moins de 100 €', '100 – 200 €', '200 – 400 €', '400 – 700 €', 'Plus de 700 €', 'À définir avec Olivier']
const typesProjet = ['Nouveau tatouage', 'Cover-up', 'Retouche / finition', 'Piercing', 'Consultation seulement']

export function BookingSection() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [refImages, setRefImages] = useState<string[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const fileRef = useRef<HTMLInputElement>(null)

  const update = (field: keyof FormData, value: string | boolean) => {
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
    // Simulate form submission (replace with actual API call)
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
  }

  const inputClass = "w-full bg-surface border border-border text-foreground text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/60"
  const selectClass = "w-full bg-surface border border-border text-foreground text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors appearance-none"
  const labelClass = "block text-xs tracking-wider uppercase text-muted-foreground mb-1.5"

  return (
    <section id="rendez-vous" className="py-24 lg:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold opacity-70" aria-hidden="true" />
            <span className="text-gold text-xs tracking-[0.3em] uppercase font-medium">Projet</span>
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Parlez-moi de votre projet
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            Remplissez ce formulaire pour présenter votre projet à Olivier.
            Il vous recontactera dans les meilleurs délais pour valider votre demande et convenir d&apos;un rendez-vous.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-card border border-gold/30 p-10 text-center">
            <CheckCircle size={48} className="text-gold mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-foreground mb-3">Demande envoyée !</h3>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              Merci pour votre message. Olivier prendra contact avec vous dans les meilleurs délais
              pour discuter de votre projet et fixer un rendez-vous selon vos disponibilités.
            </p>
            <button onClick={() => { setStatus('idle'); setForm(initialForm); setRefImages([]) }} className="mt-6 px-6 py-3 border border-border text-muted-foreground hover:border-gold hover:text-foreground transition-colors text-sm tracking-wider uppercase">
              Nouvelle demande
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            {/* Identity */}
            <div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">Vos coordonnées</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prenom" className={labelClass}>Prénom *</label>
                  <input id="prenom" type="text" required value={form.prenom} onChange={(e) => update('prenom', e.target.value)} placeholder="Votre prénom" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="nom" className={labelClass}>Nom *</label>
                  <input id="nom" type="text" required value={form.nom} onChange={(e) => update('nom', e.target.value)} placeholder="Votre nom" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>E-mail *</label>
                  <input id="email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="votre@email.fr" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="telephone" className={labelClass}>Téléphone</label>
                  <input id="telephone" type="tel" value={form.telephone} onChange={(e) => update('telephone', e.target.value)} placeholder="06 00 00 00 00" className={inputClass} />
                </div>
              </div>
            </div>

            {/* Project */}
            <div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">Votre projet</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="typeProjet" className={labelClass}>Type de projet *</label>
                  <select id="typeProjet" required value={form.typeProjet} onChange={(e) => update('typeProjet', e.target.value)} className={selectClass}>
                    <option value="">Sélectionner…</option>
                    {typesProjet.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="style" className={labelClass}>Style souhaité</label>
                  <select id="style" value={form.style} onChange={(e) => update('style', e.target.value)} className={selectClass}>
                    <option value="">Sélectionner…</option>
                    {styles.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="zone" className={labelClass}>Zone du corps</label>
                  <select id="zone" value={form.zone} onChange={(e) => update('zone', e.target.value)} className={selectClass}>
                    <option value="">Sélectionner…</option>
                    {zones.map((z) => <option key={z} value={z}>{z}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="taille" className={labelClass}>Taille approximative</label>
                  <select id="taille" value={form.taille} onChange={(e) => update('taille', e.target.value)} className={selectClass}>
                    <option value="">Sélectionner…</option>
                    {tailles.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className={labelClass}>Budget indicatif</label>
                  <select id="budget" value={form.budget} onChange={(e) => update('budget', e.target.value)} className={selectClass}>
                    <option value="">Sélectionner…</option>
                    {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="periode" className={labelClass}>Période souhaitée</label>
                  <input id="periode" type="text" value={form.periode} onChange={(e) => update('periode', e.target.value)} placeholder="Ex : Septembre, week-end…" className={inputClass} />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="description" className={labelClass}>Description du projet *</label>
                <textarea
                  id="description"
                  required
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  rows={5}
                  placeholder="Décrivez votre idée : motif, ambiance, signification, inspirations…"
                  className={cn(inputClass, 'resize-none')}
                />
              </div>
            </div>

            {/* Reference images */}
            <div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-4 pb-3 border-b border-border">Images de référence</h3>
              <p className="text-muted-foreground text-sm mb-4">Ajoutez des photos d&apos;inspiration ou l&apos;aperçu créé dans l&apos;outil d&apos;essayage virtuel (facultatif).</p>
              <div className="flex flex-wrap gap-3">
                {refImages.map((img, i) => (
                  <div key={i} className="relative w-20 h-20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Référence ${i + 1}`} className="w-full h-full object-cover" />
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

            {/* Consent */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                role="checkbox"
                aria-checked={form.consent}
                onClick={() => update('consent', !form.consent)}
                className={cn(
                  'w-5 h-5 flex-shrink-0 border mt-0.5 flex items-center justify-center transition-colors',
                  form.consent ? 'bg-primary border-primary' : 'border-border'
                )}
              >
                {form.consent && <span className="text-primary-foreground text-xs">✓</span>}
              </button>
              <p className="text-muted-foreground text-sm leading-relaxed">
                J&apos;accepte que les informations saisies dans ce formulaire soient utilisées par Tattoo Lounge
                pour me recontacter dans le cadre de ma demande de rendez-vous. *
              </p>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="submit"
                disabled={!form.consent || status === 'sending' || !form.prenom || !form.email || !form.typeProjet || !form.description}
                className="px-8 py-4 bg-primary text-primary-foreground text-sm tracking-widest uppercase font-medium hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Envoi en cours…
                  </>
                ) : 'Envoyer ma demande'}
              </button>
              <p className="text-muted-foreground text-xs leading-relaxed max-w-xs">
                L&apos;envoi de ce formulaire ne constitue pas une confirmation de rendez-vous.
                Olivier vous recontactera pour valider votre projet et ses disponibilités.
              </p>
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle size={14} />
                Une erreur s&apos;est produite. Veuillez réessayer ou nous appeler directement.
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
