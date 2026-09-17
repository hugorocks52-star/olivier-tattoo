'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import {
  Upload, Camera, Download, Send, RotateCcw, RotateCw,
  FlipHorizontal, FlipVertical, Minus, Plus, Eye, EyeOff,
  Undo2, Redo2, RefreshCcw, Info
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/reveal'

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

const defaultTransform: Transform = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
  opacity: 0.85,
  contrast: 1,
  blendMode: 'multiply',
}

const BLEND_MODES = [
  { value: 'multiply', label: 'Peau (Multiply)' },
  { value: 'overlay', label: 'Overlay' },
  { value: 'darken', label: 'Assombrir' },
  { value: 'soft-light', label: 'Lumière douce' },
  { value: 'normal', label: 'Normal' },
]

export function VirtualTryon() {
  const [bodyImage, setBodyImage] = useState<string | null>(null)
  const [tattooImage, setTattooImage] = useState<string | null>(null)
  const [transform, setTransform] = useState<Transform>(defaultTransform)
  const [history, setHistory] = useState<Transform[]>([defaultTransform])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [showBefore, setShowBefore] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState<'transform' | 'appearance' | 'tools'>('transform')
  const [step, setStep] = useState<1 | 2 | 3>(1)

  const bodyInputRef = useRef<HTMLInputElement>(null)
  const tattooInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const tattooRef = useRef<HTMLImageElement>(null)

  const pushHistory = useCallback((t: Transform) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1)
      newHistory.push(t)
      return newHistory.slice(-20) // keep last 20
    })
    setHistoryIndex((prev) => Math.min(prev + 1, 19))
  }, [historyIndex])

  const updateTransform = useCallback((updates: Partial<Transform>) => {
    const next = { ...transform, ...updates }
    setTransform(next)
    pushHistory(next)
  }, [transform, pushHistory])

  const undo = () => {
    if (historyIndex > 0) {
      const idx = historyIndex - 1
      setHistoryIndex(idx)
      setTransform(history[idx])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const idx = historyIndex + 1
      setHistoryIndex(idx)
      setTransform(history[idx])
    }
  }

  const reset = () => {
    setTransform(defaultTransform)
    setHistory([defaultTransform])
    setHistoryIndex(0)
  }

  const handleBodyUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setBodyImage(e.target?.result as string)
      setStep(2)
    }
    reader.readAsDataURL(file)
  }

  const handleTattooUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setTattooImage(e.target?.result as string)
      reset()
      setStep(3)
    }
    reader.readAsDataURL(file)
  }

  // Mouse dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tattooImage) return
    setIsDragging(true)
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y })
  }

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    setTransform((prev) => ({ ...prev, x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }))
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
      pushHistory(transform)
    }
  }, [isDragging, transform, pushHistory])

  // Touch dragging
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!tattooImage) return
    const touch = e.touches[0]
    setIsDragging(true)
    setDragStart({ x: touch.clientX - transform.x, y: touch.clientY - transform.y })
  }

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return
    const touch = e.touches[0]
    setTransform((prev) => ({ ...prev, x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y }))
  }, [isDragging, dragStart])

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
      pushHistory(transform)
    }
  }, [isDragging, transform, pushHistory])

  // Export
  const handleExport = () => {
    const container = containerRef.current
    if (!container) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    const bodyImg = new window.Image()
    bodyImg.crossOrigin = 'anonymous'
    bodyImg.onload = () => {
      ctx.drawImage(bodyImg, 0, 0, canvas.width, canvas.height)

      if (tattooImage) {
        const tattooImg = new window.Image()
        tattooImg.crossOrigin = 'anonymous'
        tattooImg.onload = () => {
          ctx.save()
          ctx.globalAlpha = transform.opacity
          ctx.globalCompositeOperation = transform.blendMode as GlobalCompositeOperation
          ctx.filter = `contrast(${transform.contrast})`
          ctx.translate(canvas.width / 2 + transform.x, canvas.height / 2 + transform.y)
          ctx.rotate((transform.rotation * Math.PI) / 180)
          ctx.scale(transform.scaleX, transform.scaleY)
          const w = tattooImg.width * 0.3
          const h = tattooImg.height * 0.3
          ctx.drawImage(tattooImg, -w / 2, -h / 2, w, h)
          ctx.restore()

          const link = document.createElement('a')
          link.download = 'apercu-tatouage-tattoolounge.png'
          link.href = canvas.toDataURL('image/png')
          link.click()
        }
        tattooImg.src = tattooImage
      } else {
        const link = document.createElement('a')
        link.download = 'apercu-tattoolounge.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
      }
    }
    if (bodyImage) bodyImg.src = bodyImage
  }

  const tattooStyle: React.CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: `translate(calc(-50% + ${transform.x}px), calc(-50% + ${transform.y}px)) rotate(${transform.rotation}deg) scaleX(${transform.scaleX}) scaleY(${transform.scaleY})`,
    opacity: transform.opacity,
    mixBlendMode: transform.blendMode as React.CSSProperties['mixBlendMode'],
    filter: `contrast(${transform.contrast})`,
    maxWidth: '60%',
    maxHeight: '60%',
    width: 'auto',
    height: 'auto',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: 'none',
    pointerEvents: 'auto',
    touchAction: 'none',
  }

  return (
    <Reveal>
        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-4 bg-gold/5 border border-gold/20 mb-10 max-w-3xl w-full">
          <Info size={16} className="text-gold mt-0.5 shrink-0" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            <strong className="text-foreground">Simulation visuelle uniquement.</strong> Le rendu réel d&apos;un tatouage sur la peau peut différer
            de cette prévisualisation, selon la texture et la couleur de votre peau, la zone du corps et la technique utilisée.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-4 mb-10">
          {[
            { num: 1, label: 'Votre photo' },
            { num: 2, label: 'Votre motif' },
            { num: 3, label: 'Ajustez' },
          ].map(({ num, label }) => (
            <div key={num} className="flex items-center gap-2">
              <div className={cn(
                'w-7 h-7 flex items-center justify-center text-xs font-bold border',
                step >= num
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border'
              )}>
                {num}
              </div>
              <span className={cn('text-xs tracking-wider uppercase hidden sm:inline', step >= num ? 'text-foreground' : 'text-muted-foreground')}>
                {label}
              </span>
              {num < 3 && <div className="h-px w-6 bg-border" />}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Canvas area */}
          <div className="flex-1 min-h-0">
            <div
              ref={containerRef}
              className="media-frame relative bg-surface border border-border"
              style={{ height: '500px' }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Body image */}
              {bodyImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={bodyImage}
                  alt="Zone de corps sélectionnée"
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ opacity: showBefore ? 1 : 1 }}
                />
              ) : (
                /* Upload prompt */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="flex flex-col items-center gap-3 text-center p-8">
                    <Upload size={40} className="text-muted-foreground/50" />
                    <p className="text-muted-foreground text-sm">Importez une photo de votre corps pour commencer</p>
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => bodyInputRef.current?.click()}
                        className="rounded-md px-4 py-2 bg-primary text-primary-foreground text-sm tracking-wide hover:bg-primary/90 transition-colors"
                      >
                        Importer une photo
                      </button>
                      <button
                        onClick={() => cameraInputRef.current?.click()}
                        className="px-4 py-2 bg-transparent text-foreground text-sm border border-border hover:border-gold transition-colors flex items-center gap-2"
                      >
                        <Camera size={14} />
                        Prendre une photo
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tattoo overlay */}
              {tattooImage && bodyImage && !showBefore && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  ref={tattooRef}
                  src={tattooImage}
                  alt="Motif de tatouage"
                  style={tattooStyle}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  draggable={false}
                />
              )}

              {/* Before/after label */}
              {showBefore && bodyImage && (
                <div className="absolute top-3 left-3 rounded-md bg-background/80 px-2 py-1 text-xs tracking-wider uppercase text-muted-foreground">
                  Avant
                </div>
              )}
              {!showBefore && bodyImage && tattooImage && (
                <div className="absolute top-3 left-3 rounded-md bg-primary/80 px-2 py-1 text-xs tracking-wider uppercase text-primary-foreground">
                  Après
                </div>
              )}
            </div>

            {/* Quick actions below canvas */}
            {bodyImage && (
              <div className="flex flex-wrap gap-2 mt-3">
                <button onClick={() => bodyInputRef.current?.click()} className="px-3 py-2 text-xs border border-border text-muted-foreground hover:border-gold hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Upload size={12} /> Changer la photo
                </button>
                {tattooImage && (
                  <>
                    <button onClick={handleExport} className="px-3 py-2 text-xs border border-border text-muted-foreground hover:border-gold hover:text-foreground transition-colors flex items-center gap-1.5">
                      <Download size={12} /> Enregistrer l&apos;aperçu
                    </button>
                    <button onClick={() => setShowBefore(!showBefore)} className="px-3 py-2 text-xs border border-border text-muted-foreground hover:border-gold hover:text-foreground transition-colors flex items-center gap-1.5">
                      {showBefore ? <Eye size={12} /> : <EyeOff size={12} />}
                      {showBefore ? 'Voir avec tatouage' : 'Avant / Après'}
                    </button>
                    <button onClick={reset} className="px-3 py-2 text-xs border border-border text-muted-foreground hover:border-gold hover:text-foreground transition-colors flex items-center gap-1.5">
                      <RefreshCcw size={12} /> Réinitialiser
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Controls sidebar */}
          <div className="lg:w-72 flex flex-col gap-4">
            {/* Upload tattoo */}
            <div className="bg-card border border-border p-4">
              <h3 className="text-foreground text-sm font-medium tracking-wider uppercase mb-3">Votre motif</h3>
              {tattooImage ? (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tattooImage} alt="Motif importé" className="w-full h-24 object-contain bg-surface" />
                  <button
                    onClick={() => tattooInputRef.current?.click()}
                    className="mt-2 w-full py-2 text-xs border border-border text-muted-foreground hover:border-gold hover:text-foreground transition-colors"
                  >
                    Changer le motif
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => tattooInputRef.current?.click()}
                  className="w-full py-6 border border-dashed border-border text-muted-foreground text-sm flex flex-col items-center gap-2 hover:border-gold hover:text-foreground transition-colors"
                >
                  <Upload size={18} />
                  Importer PNG / JPG
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-card border border-border">
              <div className="flex border-b border-border" role="tablist">
                {([
                  { key: 'transform', label: 'Position' },
                  { key: 'appearance', label: 'Rendu' },
                  { key: 'tools', label: 'Outils' },
                ] as const).map(({ key, label }) => (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={activeTab === key}
                    onClick={() => setActiveTab(key)}
                    className={cn(
                      'flex-1 py-2.5 text-xs tracking-wider uppercase transition-colors',
                      activeTab === key ? 'text-gold border-b border-gold' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="p-4 space-y-4">
                {activeTab === 'transform' && (
                  <>
                    {/* Rotation */}
                    <div>
                      <label className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>Rotation</span>
                        <span className="text-foreground">{transform.rotation}°</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={-180}
                          max={180}
                          value={transform.rotation}
                          onChange={(e) => updateTransform({ rotation: Number(e.target.value) })}
                          className="flex-1 accent-gold"
                          aria-label="Rotation"
                        />
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => updateTransform({ rotation: transform.rotation - 15 })} className="flex-1 py-1.5 text-xs border border-border text-muted-foreground hover:border-gold hover:text-foreground transition-colors flex items-center justify-center gap-1">
                          <RotateCcw size={11} /> -15°
                        </button>
                        <button onClick={() => updateTransform({ rotation: transform.rotation + 15 })} className="flex-1 py-1.5 text-xs border border-border text-muted-foreground hover:border-gold hover:text-foreground transition-colors flex items-center justify-center gap-1">
                          <RotateCw size={11} /> +15°
                        </button>
                      </div>
                    </div>

                    {/* Scale */}
                    <div>
                      <label className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>Taille</span>
                        <span className="text-foreground">{Math.round(Math.abs(transform.scaleX) * 100)}%</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateTransform({ scaleX: Math.sign(transform.scaleX) * Math.max(0.1, Math.abs(transform.scaleX) - 0.1), scaleY: Math.sign(transform.scaleY) * Math.max(0.1, Math.abs(transform.scaleY) - 0.1) })} className="p-1.5 border border-border text-muted-foreground hover:border-gold hover:text-foreground transition-colors">
                          <Minus size={12} />
                        </button>
                        <input
                          type="range"
                          min={0.1}
                          max={3}
                          step={0.05}
                          value={Math.abs(transform.scaleX)}
                          onChange={(e) => updateTransform({ scaleX: Math.sign(transform.scaleX) * Number(e.target.value), scaleY: Math.sign(transform.scaleY) * Number(e.target.value) })}
                          className="flex-1 accent-gold"
                          aria-label="Taille"
                        />
                        <button onClick={() => updateTransform({ scaleX: Math.sign(transform.scaleX) * Math.min(3, Math.abs(transform.scaleX) + 0.1), scaleY: Math.sign(transform.scaleY) * Math.min(3, Math.abs(transform.scaleY) + 0.1) })} className="p-1.5 border border-border text-muted-foreground hover:border-gold hover:text-foreground transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Flip */}
                    <div>
                      <span className="text-xs text-muted-foreground block mb-2">Symétrie</span>
                      <div className="flex gap-2">
                        <button onClick={() => updateTransform({ scaleX: -transform.scaleX })} className="flex-1 py-2 text-xs border border-border text-muted-foreground hover:border-gold hover:text-foreground transition-colors flex items-center justify-center gap-1.5">
                          <FlipHorizontal size={13} /> Horizontal
                        </button>
                        <button onClick={() => updateTransform({ scaleY: -transform.scaleY })} className="flex-1 py-2 text-xs border border-border text-muted-foreground hover:border-gold hover:text-foreground transition-colors flex items-center justify-center gap-1.5">
                          <FlipVertical size={13} /> Vertical
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'appearance' && (
                  <>
                    {/* Opacity */}
                    <div>
                      <label className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>Opacité</span>
                        <span className="text-foreground">{Math.round(transform.opacity * 100)}%</span>
                      </label>
                      <input
                        type="range"
                        min={0.1}
                        max={1}
                        step={0.05}
                        value={transform.opacity}
                        onChange={(e) => updateTransform({ opacity: Number(e.target.value) })}
                        className="w-full accent-gold"
                        aria-label="Opacité"
                      />
                    </div>

                    {/* Contrast */}
                    <div>
                      <label className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>Intensité noir</span>
                        <span className="text-foreground">{Math.round(transform.contrast * 100)}%</span>
                      </label>
                      <input
                        type="range"
                        min={0.5}
                        max={2}
                        step={0.05}
                        value={transform.contrast}
                        onChange={(e) => updateTransform({ contrast: Number(e.target.value) })}
                        className="w-full accent-gold"
                        aria-label="Intensité"
                      />
                    </div>

                    {/* Blend mode */}
                    <div>
                      <label className="text-xs text-muted-foreground block mb-2">Mode de fusion</label>
                      <select
                        value={transform.blendMode}
                        onChange={(e) => updateTransform({ blendMode: e.target.value })}
                        className="w-full bg-surface border border-border text-foreground text-sm px-3 py-2 focus:outline-none focus:border-gold"
                        aria-label="Mode de fusion"
                      >
                        {BLEND_MODES.map((m) => (
                          <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {activeTab === 'tools' && (
                  <>
                    <div className="flex gap-2">
                      <button
                        onClick={undo}
                        disabled={historyIndex === 0}
                        className="flex-1 py-2.5 text-xs border border-border text-muted-foreground hover:border-gold hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Undo2 size={13} /> Annuler
                      </button>
                      <button
                        onClick={redo}
                        disabled={historyIndex >= history.length - 1}
                        className="flex-1 py-2.5 text-xs border border-border text-muted-foreground hover:border-gold hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Redo2 size={13} /> Rétablir
                      </button>
                    </div>

                    <button
                      onClick={reset}
                      className="w-full py-2.5 text-xs border border-border text-muted-foreground hover:border-gold hover:text-foreground transition-colors flex items-center justify-center gap-1.5"
                    >
                      <RefreshCcw size={13} /> Tout réinitialiser
                    </button>

                    <button
                      onClick={handleExport}
                      disabled={!bodyImage}
                      className="rounded-md w-full py-2.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download size={13} /> Enregistrer l&apos;aperçu
                    </button>

                    <Link
                      href="/rendez-vous"
                      className="rounded-md w-full py-2.5 text-xs bg-gold text-background hover:bg-gold/90 transition-colors flex items-center justify-center gap-1.5 font-medium"
                    >
                      <Send size={13} /> Envoyer mon projet au salon
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Undo/Redo always visible */}
            <div className="flex gap-2">
              <button onClick={undo} disabled={historyIndex === 0} className="flex-1 py-2 text-xs border border-border text-muted-foreground hover:border-gold hover:text-foreground disabled:opacity-30 transition-colors flex items-center justify-center gap-1">
                <Undo2 size={12} /> Annuler
              </button>
              <button onClick={redo} disabled={historyIndex >= history.length - 1} className="flex-1 py-2 text-xs border border-border text-muted-foreground hover:border-gold hover:text-foreground disabled:opacity-30 transition-colors flex items-center justify-center gap-1">
                <Redo2 size={12} /> Rétablir
              </button>
            </div>
          </div>
        </div>

        {/* Hidden file inputs */}
        <input
          ref={bodyInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleBodyUpload(f) }}
          aria-label="Importer une photo du corps"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleBodyUpload(f) }}
          aria-label="Prendre une photo avec la caméra"
        />
        <input
          ref={tattooInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleTattooUpload(f) }}
          aria-label="Importer un motif de tatouage"
        />
    </Reveal>
  )
}
