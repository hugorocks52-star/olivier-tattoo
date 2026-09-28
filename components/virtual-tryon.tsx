'use client'

import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Camera, Download, Eye, EyeOff, FlipHorizontal, FlipVertical, Info, LoaderCircle, Minus, PencilRuler, Plus, Redo2, RefreshCcw, RotateCcw, RotateCw, Send, Undo2, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Reveal } from '@/components/motion/reveal'
import { TattooImageEditor } from '@/components/tattoo-image-editor'
import { cn } from '@/lib/utils'

interface Transform {
  x: number
  y: number
  scaleX: number
  scaleY: number
  rotation: number
  opacity: number
  contrast: number
  blendMode: string
}

const defaultTransform: Transform = { x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, opacity: 0.85, contrast: 1, blendMode: 'multiply' }
const blendModes = [
  { value: 'multiply', label: 'Peau réaliste' },
  { value: 'overlay', label: 'Superposition' },
  { value: 'darken', label: 'Assombrir' },
  { value: 'soft-light', label: 'Lumière douce' },
  { value: 'normal', label: 'Normal' },
]

function prepareUploadedImage(file: File, maxDimension: number) {
  return new Promise<string>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const image = new window.Image()
    image.decoding = 'async'
    image.onload = () => {
      try {
        const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))
        const context = canvas.getContext('2d')
        if (!context) throw new Error('Canvas unavailable')
        context.imageSmoothingEnabled = true
        context.imageSmoothingQuality = 'high'
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/webp', 0.86))
      } catch {
        reject(new Error('Image processing failed'))
      } finally {
        URL.revokeObjectURL(objectUrl)
      }
    }
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Image decoding failed'))
    }
    image.src = objectUrl
  })
}

export function VirtualTryon() {
  const [bodyImage, setBodyImage] = useState<string | null>(null)
  const [tattooImage, setTattooImage] = useState<string | null>(null)
  const [originalTattooImage, setOriginalTattooImage] = useState<string | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [processingUpload, setProcessingUpload] = useState<'body' | 'tattoo' | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [transform, setTransform] = useState<Transform>(defaultTransform)
  const [history, setHistory] = useState<Transform[]>([defaultTransform])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [showBefore, setShowBefore] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const bodyInputRef = useRef<HTMLInputElement>(null)
  const tattooInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const pushHistory = useCallback((nextTransform: Transform) => {
    setHistory((current) => [...current.slice(0, historyIndex + 1), nextTransform].slice(-20))
    setHistoryIndex((current) => Math.min(current + 1, 19))
  }, [historyIndex])

  const updateTransform = useCallback((updates: Partial<Transform>) => {
    const next = { ...transform, ...updates }
    setTransform(next)
    pushHistory(next)
  }, [pushHistory, transform])

  const undo = () => {
    if (historyIndex === 0) return
    const nextIndex = historyIndex - 1
    setHistoryIndex(nextIndex)
    setTransform(history[nextIndex])
  }

  const redo = () => {
    if (historyIndex >= history.length - 1) return
    const nextIndex = historyIndex + 1
    setHistoryIndex(nextIndex)
    setTransform(history[nextIndex])
  }

  const reset = () => {
    setTransform(defaultTransform)
    setHistory([defaultTransform])
    setHistoryIndex(0)
  }

  const readImage = async (file: File, type: 'body' | 'tattoo') => {
    setProcessingUpload(type)
    setUploadError(null)
    try {
      const image = await prepareUploadedImage(file, type === 'body' ? 1600 : 1200)
      if (type === 'body') {
        setBodyImage(image)
        setStep(2)
      } else {
        setTattooImage(image)
        setOriginalTattooImage(image)
        reset()
        setStep(3)
      }
    } catch {
      setUploadError("Cette image n'a pas pu être chargée. Essayez un fichier JPG, PNG ou WebP plus léger.")
    } finally {
      setProcessingUpload(null)
    }
  }

  const startDrag = (clientX: number, clientY: number) => {
    if (!tattooImage) return
    setIsDragging(true)
    setDragStart({ x: clientX - transform.x, y: clientY - transform.y })
  }

  const moveDrag = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return
    setTransform((current) => ({ ...current, x: clientX - dragStart.x, y: clientY - dragStart.y }))
  }, [dragStart, isDragging])

  const endDrag = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)
    pushHistory(transform)
  }, [isDragging, pushHistory, transform])

  const handleExport = () => {
    if (!containerRef.current || !bodyImage) return
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) return
    canvas.width = containerRef.current.clientWidth
    canvas.height = containerRef.current.clientHeight
    const body = new window.Image()
    body.onload = () => {
      context.drawImage(body, 0, 0, canvas.width, canvas.height)
      const download = () => {
        const link = document.createElement('a')
        link.download = 'tattoo-lounge-preview.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
      }
      if (!tattooImage) return download()
      const tattoo = new window.Image()
      tattoo.onload = () => {
        context.save()
        context.globalAlpha = transform.opacity
        context.globalCompositeOperation = transform.blendMode as GlobalCompositeOperation
        context.filter = `contrast(${transform.contrast})`
        context.translate(canvas.width / 2 + transform.x, canvas.height / 2 + transform.y)
        context.rotate((transform.rotation * Math.PI) / 180)
        context.scale(transform.scaleX, transform.scaleY)
        const width = tattoo.width * 0.3
        const height = tattoo.height * 0.3
        context.drawImage(tattoo, -width / 2, -height / 2, width, height)
        context.restore()
        download()
      }
      tattoo.src = tattooImage
    }
    body.src = bodyImage
  }

  const tattooStyle: React.CSSProperties = {
    position: 'absolute', left: '50%', top: '50%',
    transform: `translate(calc(-50% + ${transform.x}px), calc(-50% + ${transform.y}px)) rotate(${transform.rotation}deg) scaleX(${transform.scaleX}) scaleY(${transform.scaleY})`,
    opacity: transform.opacity,
    mixBlendMode: transform.blendMode as React.CSSProperties['mixBlendMode'],
    filter: `contrast(${transform.contrast})`,
    maxWidth: '60%', maxHeight: '60%', width: 'auto', height: 'auto',
    cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none', pointerEvents: 'auto', touchAction: 'none',
  }

  const secondaryButton = 'border-white/10 bg-white/[0.025] hover:border-primary/30'

  return (
    <Reveal>
      <div className="mb-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-primary/20 bg-primary/[0.055] p-4"><Info className="mt-0.5 size-4 shrink-0 text-primary" /><p className="text-xs leading-6 text-muted-foreground"><strong className="text-foreground">Cet outil fournit uniquement une simulation visuelle.</strong> Le rendu réel varie selon la peau, la zone du corps et la technique utilisée. Vos images restent dans votre navigateur.</p></div>
      {uploadError && <div className="mb-6 max-w-3xl rounded-xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">{uploadError}</div>}

      <div className="mb-8 flex items-center gap-2 sm:gap-4">
        {[{ num: 1, label: 'Votre photo' }, { num: 2, label: 'Votre motif' }, { num: 3, label: 'Les réglages' }].map(({ num, label }) => <div key={num} className="flex items-center gap-2 sm:gap-3"><span className={cn('grid size-8 place-items-center rounded-full border text-xs font-bold transition-[background-color,border-color,color,box-shadow]', step >= num ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_25px_-8px_rgba(214,173,106,.8)]' : 'border-white/10 text-muted-foreground')}>{num}</span><span className={cn('hidden text-xs sm:inline', step >= num ? 'text-foreground' : 'text-muted-foreground')}>{label}</span>{num < 3 && <span className="h-px w-5 bg-white/10 sm:w-10" />}</div>)}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_19rem]">
        <div>
          <div
            ref={containerRef}
            className="glow-wine relative h-[28rem] overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.055),transparent_70%)] sm:h-[36rem]"
            onMouseMove={(event) => moveDrag(event.clientX, event.clientY)} onMouseUp={endDrag} onMouseLeave={endDrag}
            onTouchMove={(event) => moveDrag(event.touches[0].clientX, event.touches[0].clientY)} onTouchEnd={endDrag}
          >
            {bodyImage ? <Image src={bodyImage} alt="Photo du corps sélectionnée" fill unoptimized sizes="100vw" className="object-contain" /> : <div className="absolute inset-0 grid place-items-center p-6"><div className="max-w-sm text-center"><span className="mx-auto grid size-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.035] text-muted-foreground"><Upload className="size-7" /></span><h3 className="mt-5 text-lg font-bold">Ajoutez une photo de la zone à tatouer</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">Pour un meilleur résultat, utilisez une photo claire, de face et sans ombre marquée.</p><div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row"><Button onClick={() => bodyInputRef.current?.click()} disabled={processingUpload !== null}>{processingUpload === 'body' ? <LoaderCircle className="animate-spin" /> : <Upload />}{processingUpload === 'body' ? 'Préparation…' : 'Choisir une photo'}</Button><Button variant="outline" onClick={() => cameraInputRef.current?.click()} disabled={processingUpload !== null}><Camera /> Utiliser la caméra</Button></div></div></div>}
            {tattooImage && bodyImage && !showBefore && <Image src={tattooImage} alt="Motif de tatouage sélectionné" width={800} height={800} unoptimized style={tattooStyle} onMouseDown={(event) => startDrag(event.clientX, event.clientY)} onTouchStart={(event) => startDrag(event.touches[0].clientX, event.touches[0].clientY)} draggable={false} />}
            {bodyImage && <span className={cn('absolute left-4 top-4 rounded-full border px-3 py-1 text-[0.65rem] sm:backdrop-blur-xl', showBefore ? 'border-white/10 bg-black/70 text-white/70 sm:bg-black/40' : 'border-primary/25 bg-background/90 text-primary sm:bg-primary/15')}>{showBefore ? 'Avant' : tattooImage ? 'Après' : 'Photo de base'}</span>}
          </div>

          {bodyImage && <div className="mt-3 flex flex-wrap gap-2"><Button size="sm" variant="outline" className={secondaryButton} onClick={() => bodyInputRef.current?.click()}><Upload /> Changer la photo</Button>{tattooImage && <><Button size="sm" variant="outline" className={secondaryButton} onClick={handleExport}><Download /> Enregistrer</Button><Button size="sm" variant="outline" className={secondaryButton} onClick={() => setShowBefore((current) => !current)}>{showBefore ? <Eye /> : <EyeOff />}{showBefore ? 'Voir avec le tatouage' : 'Avant / après'}</Button><Button size="sm" variant="outline" className={secondaryButton} onClick={reset}><RefreshCcw /> Réinitialiser</Button></>}</div>}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-card/60 p-4">
            <h3 className="mb-3 text-sm font-bold">Votre motif</h3>
            {tattooImage ? <div><Image src={tattooImage} alt="Motif importé" width={400} height={160} unoptimized className="h-28 w-full rounded-xl bg-white/[0.025] object-contain p-2" /><div className="mt-2 grid gap-2"><Button size="sm" className="w-full" onClick={() => setIsEditorOpen(true)}><PencilRuler /> Détourer et retoucher</Button><Button variant="outline" size="sm" className="w-full" onClick={() => tattooInputRef.current?.click()} disabled={processingUpload !== null}>Changer le motif</Button></div></div> : <button onClick={() => tattooInputRef.current?.click()} disabled={processingUpload !== null} className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-white/15 py-8 text-xs text-muted-foreground transition hover:border-primary/35 hover:text-primary disabled:pointer-events-none disabled:opacity-50">{processingUpload === 'tattoo' ? <LoaderCircle className="size-5 animate-spin" /> : <Upload className="size-5" />}{processingUpload === 'tattoo' ? 'Préparation du motif…' : 'Importer un PNG ou JPG'}</button>}
          </div>

          <Tabs defaultValue="transform" className="rounded-2xl border border-white/10 bg-card/60 p-3">
            <TabsList className="grid h-10 w-full grid-cols-3 bg-white/[0.035]"><TabsTrigger value="transform">Position</TabsTrigger><TabsTrigger value="appearance">Rendu</TabsTrigger><TabsTrigger value="tools">Outils</TabsTrigger></TabsList>
            <TabsContent value="transform" className="space-y-6 px-1 py-4">
              <ControlLabel label="Rotation" value={`${transform.rotation}°`}><Slider min={-180} max={180} value={[transform.rotation]} onValueChange={([value]) => updateTransform({ rotation: value })} /></ControlLabel>
              <div className="flex gap-2"><Button size="sm" variant="outline" className="flex-1" onClick={() => updateTransform({ rotation: transform.rotation - 15 })}><RotateCcw /> −15°</Button><Button size="sm" variant="outline" className="flex-1" onClick={() => updateTransform({ rotation: transform.rotation + 15 })}><RotateCw /> +15°</Button></div>
              <ControlLabel label="Taille" value={`${Math.round(Math.abs(transform.scaleX) * 100)} %`}><div className="flex items-center gap-3"><Button variant="outline" size="icon-sm" onClick={() => updateTransform({ scaleX: Math.sign(transform.scaleX) * Math.max(0.1, Math.abs(transform.scaleX) - 0.1), scaleY: Math.sign(transform.scaleY) * Math.max(0.1, Math.abs(transform.scaleY) - 0.1) })}><Minus /></Button><Slider min={0.1} max={3} step={0.05} value={[Math.abs(transform.scaleX)]} onValueChange={([value]) => updateTransform({ scaleX: Math.sign(transform.scaleX) * value, scaleY: Math.sign(transform.scaleY) * value })} /><Button variant="outline" size="icon-sm" onClick={() => updateTransform({ scaleX: Math.sign(transform.scaleX) * Math.min(3, Math.abs(transform.scaleX) + 0.1), scaleY: Math.sign(transform.scaleY) * Math.min(3, Math.abs(transform.scaleY) + 0.1) })}><Plus /></Button></div></ControlLabel>
              <div className="flex gap-2"><Button size="sm" variant="outline" className="flex-1" onClick={() => updateTransform({ scaleX: -transform.scaleX })}><FlipHorizontal /> Horizontal</Button><Button size="sm" variant="outline" className="flex-1" onClick={() => updateTransform({ scaleY: -transform.scaleY })}><FlipVertical /> Vertical</Button></div>
            </TabsContent>
            <TabsContent value="appearance" className="space-y-6 px-1 py-4">
              <ControlLabel label="Opacité" value={`${Math.round(transform.opacity * 100)} %`}><Slider min={0.1} max={1} step={0.05} value={[transform.opacity]} onValueChange={([value]) => updateTransform({ opacity: value })} /></ControlLabel>
              <ControlLabel label="Intensité" value={`${Math.round(transform.contrast * 100)} %`}><Slider min={0.5} max={2} step={0.05} value={[transform.contrast]} onValueChange={([value]) => updateTransform({ contrast: value })} /></ControlLabel>
              <label className="block text-xs text-muted-foreground">Mode de fusion<select value={transform.blendMode} onChange={(event) => updateTransform({ blendMode: event.target.value })} className="mt-2 h-10 w-full rounded-lg border border-white/10 bg-[#151111] px-3 text-foreground focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20">{blendModes.map((mode) => <option key={mode.value} value={mode.value}>{mode.label}</option>)}</select></label>
            </TabsContent>
            <TabsContent value="tools" className="space-y-2 px-1 py-4"><div className="flex gap-2"><Button variant="outline" className="flex-1" onClick={undo} disabled={historyIndex === 0}><Undo2 /> Annuler</Button><Button variant="outline" className="flex-1" onClick={redo} disabled={historyIndex >= history.length - 1}><Redo2 /> Rétablir</Button></div><Button variant="outline" className="w-full" onClick={reset}><RefreshCcw /> Tout réinitialiser</Button><Button className="w-full" onClick={handleExport} disabled={!bodyImage}><Download /> Enregistrer l&apos;aperçu</Button><Button asChild variant="secondary" className="w-full"><Link href="/rendez-vous"><Send /> Envoyer au studio</Link></Button></TabsContent>
          </Tabs>

          <div className="flex gap-2"><Button variant="outline" className="flex-1" onClick={undo} disabled={historyIndex === 0}><Undo2 /> Annuler</Button><Button variant="outline" className="flex-1" onClick={redo} disabled={historyIndex >= history.length - 1}><Redo2 /> Rétablir</Button></div>
        </aside>
      </div>

      <input ref={bodyInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; event.currentTarget.value = ''; if (file) void readImage(file, 'body') }} aria-label="Importer une photo du corps" />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="user" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; event.currentTarget.value = ''; if (file) void readImage(file, 'body') }} aria-label="Prendre une photo avec la caméra" />
      <input ref={tattooInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; event.currentTarget.value = ''; if (file) void readImage(file, 'tattoo') }} aria-label="Importer un motif de tatouage" />
      {tattooImage && originalTattooImage && <TattooImageEditor imageSrc={tattooImage} originalSrc={originalTattooImage} open={isEditorOpen} onOpenChange={setIsEditorOpen} onSave={setTattooImage} />}
    </Reveal>
  )
}

function ControlLabel({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return <div><div className="mb-3 flex items-center justify-between text-xs"><span className="text-muted-foreground">{label}</span><span className="text-foreground">{value}</span></div>{children}</div>
}
