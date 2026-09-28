'use client'

import { useCallback, useRef, useState } from 'react'
import { Check, Crop, Eraser, ImageMinus, LoaderCircle, RotateCcw, Undo2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

type EditorTool = 'background' | 'crop' | 'erase'
type ImageStatus = 'loading' | 'ready' | 'error'

interface Point {
  x: number
  y: number
}

interface CropSelection extends Point {
  width: number
  height: number
}

interface TattooImageEditorProps {
  imageSrc: string
  originalSrc: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (image: string) => void
}

const maxImageDimension = 1600

export function TattooImageEditor({ imageSrc, originalSrc, open, onOpenChange, onSave }: TattooImageEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawingRef = useRef(false)
  const lastPointRef = useRef<Point | null>(null)
  const cropStartRef = useRef<Point | null>(null)
  const [tool, setTool] = useState<EditorTool>('background')
  const [brushSize, setBrushSize] = useState(36)
  const [tolerance, setTolerance] = useState(54)
  const [cropSelection, setCropSelection] = useState<CropSelection | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 1, height: 1 })
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [imageStatus, setImageStatus] = useState<ImageStatus>('loading')

  const drawSource = useCallback((source: string, resetHistory = false) => {
    const canvas = canvasRef.current
    if (!canvas) return
    setImageStatus('loading')
    const image = new window.Image()
    image.onload = () => {
      const scale = Math.min(1, maxImageDimension / Math.max(image.naturalWidth, image.naturalHeight))
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))
      setCanvasSize({ width: canvas.width, height: canvas.height })
      const context = canvas.getContext('2d')
      if (!context) return
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
      setImageStatus('ready')
      setCropSelection(null)
      if (resetHistory) {
        const snapshot = canvas.toDataURL('image/png')
        setHistory([snapshot])
        setHistoryIndex(0)
      }
    }
    image.onerror = () => setImageStatus('error')
    image.src = source
  }, [])

  const setCanvasNode = useCallback((node: HTMLCanvasElement | null) => {
    canvasRef.current = node
    if (!node || !open) return
    window.requestAnimationFrame(() => {
      if (canvasRef.current === node) drawSource(imageSrc, true)
    })
  }, [drawSource, imageSrc, open])

  const snapshot = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const next = canvas.toDataURL('image/png')
    setHistory((current) => [...current.slice(0, historyIndex + 1), next].slice(-12))
    setHistoryIndex((current) => Math.min(current + 1, 11))
  }, [historyIndex])

  const restoreSnapshot = (source: string) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const image = new window.Image()
    image.onload = () => {
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      setCanvasSize({ width: image.naturalWidth, height: image.naturalHeight })
      canvas.getContext('2d')?.drawImage(image, 0, 0)
      setCropSelection(null)
    }
    image.src = source
  }

  const undo = () => {
    if (historyIndex <= 0) return
    const nextIndex = historyIndex - 1
    setHistoryIndex(nextIndex)
    restoreSnapshot(history[nextIndex])
  }

  const restoreOriginal = () => {
    drawSource(originalSrc, true)
  }

  const getCanvasPoint = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const bounds = canvas.getBoundingClientRect()
    return {
      x: Math.max(0, Math.min(canvas.width, (event.clientX - bounds.left) * (canvas.width / bounds.width))),
      y: Math.max(0, Math.min(canvas.height, (event.clientY - bounds.top) * (canvas.height / bounds.height))),
    }
  }

  const eraseBetween = (from: Point, to: Point) => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const bounds = canvas.getBoundingClientRect()
    context.save()
    context.globalCompositeOperation = 'destination-out'
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineWidth = brushSize * (canvas.width / bounds.width)
    context.beginPath()
    context.moveTo(from.x, from.y)
    context.lineTo(to.x, to.y)
    context.stroke()
    context.restore()
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const point = getCanvasPoint(event)
    event.currentTarget.setPointerCapture(event.pointerId)
    drawingRef.current = true
    if (tool === 'erase') {
      lastPointRef.current = point
      eraseBetween(point, { x: point.x + 0.01, y: point.y + 0.01 })
    }
    if (tool === 'crop') {
      cropStartRef.current = point
      setCropSelection({ ...point, width: 0, height: 0 })
    }
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return
    const point = getCanvasPoint(event)
    if (tool === 'erase' && lastPointRef.current) {
      eraseBetween(lastPointRef.current, point)
      lastPointRef.current = point
    }
    if (tool === 'crop' && cropStartRef.current) {
      setCropSelection({
        x: cropStartRef.current.x,
        y: cropStartRef.current.y,
        width: point.x - cropStartRef.current.x,
        height: point.y - cropStartRef.current.y,
      })
    }
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return
    drawingRef.current = false
    lastPointRef.current = null
    cropStartRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    if (tool === 'erase') snapshot()
  }

  const removeBackground = () => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { willReadFrequently: true })
    if (!canvas || !context) return
    setIsProcessing(true)
    window.requestAnimationFrame(() => {
      const { width, height } = canvas
      const imageData = context.getImageData(0, 0, width, height)
      const pixels = imageData.data
      const sampleSize = Math.max(2, Math.min(20, Math.floor(Math.min(width, height) * 0.025)))
      const corners = [[0, 0], [width - sampleSize, 0], [0, height - sampleSize], [width - sampleSize, height - sampleSize]]
      let red = 0
      let green = 0
      let blue = 0
      let samples = 0

      for (const [startX, startY] of corners) {
        for (let y = startY; y < startY + sampleSize; y += 1) {
          for (let x = startX; x < startX + sampleSize; x += 1) {
            const index = (y * width + x) * 4
            red += pixels[index]
            green += pixels[index + 1]
            blue += pixels[index + 2]
            samples += 1
          }
        }
      }

      const background = [red / samples, green / samples, blue / samples]
      const visited = new Uint8Array(width * height)
      const queue = new Int32Array(width * height)
      let head = 0
      let tail = 0
      const matchesBackground = (pixelIndex: number) => {
        const offset = pixelIndex * 4
        const distance = Math.sqrt(
          (pixels[offset] - background[0]) ** 2 +
          (pixels[offset + 1] - background[1]) ** 2 +
          (pixels[offset + 2] - background[2]) ** 2,
        )
        return distance <= tolerance
      }
      const enqueue = (pixelIndex: number) => {
        if (visited[pixelIndex] || !matchesBackground(pixelIndex)) return
        visited[pixelIndex] = 1
        queue[tail] = pixelIndex
        tail += 1
      }

      for (let x = 0; x < width; x += 1) {
        enqueue(x)
        enqueue((height - 1) * width + x)
      }
      for (let y = 0; y < height; y += 1) {
        enqueue(y * width)
        enqueue(y * width + width - 1)
      }

      while (head < tail) {
        const pixelIndex = queue[head]
        head += 1
        pixels[pixelIndex * 4 + 3] = 0
        const x = pixelIndex % width
        const y = Math.floor(pixelIndex / width)
        if (x > 0) enqueue(pixelIndex - 1)
        if (x < width - 1) enqueue(pixelIndex + 1)
        if (y > 0) enqueue(pixelIndex - width)
        if (y < height - 1) enqueue(pixelIndex + width)
      }

      context.putImageData(imageData, 0, 0)
      snapshot()
      setIsProcessing(false)
    })
  }

  const applyCrop = () => {
    const canvas = canvasRef.current
    if (!canvas || !cropSelection) return
    const x = Math.round(Math.max(0, Math.min(cropSelection.x, cropSelection.x + cropSelection.width)))
    const y = Math.round(Math.max(0, Math.min(cropSelection.y, cropSelection.y + cropSelection.height)))
    const width = Math.round(Math.min(canvas.width - x, Math.abs(cropSelection.width)))
    const height = Math.round(Math.min(canvas.height - y, Math.abs(cropSelection.height)))
    if (width < 10 || height < 10) return
    const temporary = document.createElement('canvas')
    temporary.width = width
    temporary.height = height
    temporary.getContext('2d')?.drawImage(canvas, x, y, width, height, 0, 0, width, height)
    canvas.width = width
    canvas.height = height
    setCanvasSize({ width, height })
    canvas.getContext('2d')?.drawImage(temporary, 0, 0)
    setCropSelection(null)
    snapshot()
  }

  const save = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    onSave(canvas.toDataURL('image/png'))
    onOpenChange(false)
  }

  const cropOverlay = (() => {
    if (!cropSelection) return undefined
    return {
      left: `${(Math.min(cropSelection.x, cropSelection.x + cropSelection.width) / canvasSize.width) * 100}%`,
      top: `${(Math.min(cropSelection.y, cropSelection.y + cropSelection.height) / canvasSize.height) * 100}%`,
      width: `${(Math.abs(cropSelection.width) / canvasSize.width) * 100}%`,
      height: `${(Math.abs(cropSelection.height) / canvasSize.height) * 100}%`,
    }
  })()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto border-white/10 bg-card/95 p-0 backdrop-blur-2xl sm:max-w-5xl">
        <DialogHeader className="border-b border-white/10 px-5 py-4 pr-14">
          <DialogTitle className="text-xl">Retoucher le motif</DialogTitle>
          <DialogDescription>Supprimez le fond, recadrez ou effacez les parties inutiles. Le traitement reste sur votre appareil.</DialogDescription>
        </DialogHeader>

        <div className="grid min-h-0 lg:grid-cols-[1fr_17rem]">
          <div className="relative grid min-h-[24rem] place-items-center overflow-hidden bg-[linear-gradient(45deg,rgba(255,255,255,.035)_25%,transparent_25%),linear-gradient(-45deg,rgba(255,255,255,.035)_25%,transparent_25%),linear-gradient(45deg,transparent_75%,rgba(255,255,255,.035)_75%),linear-gradient(-45deg,transparent_75%,rgba(255,255,255,.035)_75%)] bg-[length:24px_24px] bg-[position:0_0,0_12px,12px_-12px,-12px_0] p-4 sm:min-h-[34rem]">
            <div className="relative inline-flex max-h-[65vh] max-w-full">
              <canvas
                ref={setCanvasNode}
                className={cn('max-h-[65vh] max-w-full touch-none object-contain transition-opacity', imageStatus === 'ready' ? 'opacity-100' : 'opacity-0', tool === 'erase' && 'cursor-crosshair', tool === 'crop' && 'cursor-crosshair')}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                aria-label="Zone de retouche du motif"
              />
              {tool === 'crop' && cropOverlay && <span className="pointer-events-none absolute border-2 border-primary bg-primary/10 shadow-[0_0_0_9999px_rgba(0,0,0,.55)]" style={cropOverlay} />}
            </div>
            {imageStatus === 'loading' && <div className="absolute inset-0 grid place-items-center"><div className="flex items-center gap-2 rounded-xl border border-white/10 bg-background/80 px-4 py-3 text-sm text-muted-foreground backdrop-blur"><LoaderCircle className="size-4 animate-spin text-primary" /> Chargement du motif…</div></div>}
            {imageStatus === 'error' && <div className="absolute inset-0 grid place-items-center p-6"><div className="max-w-xs text-center"><p className="text-sm font-semibold">Impossible d&apos;afficher ce motif.</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Le fichier est peut-être endommagé ou dans un format non pris en charge.</p><Button variant="outline" size="sm" className="mt-4" onClick={() => drawSource(imageSrc, true)}>Réessayer</Button></div></div>}
          </div>

          <aside className="space-y-5 border-t border-white/10 p-4 lg:border-l lg:border-t-0">
            <div>
              <p className="mb-2 text-xs font-semibold text-muted-foreground">Outil</p>
              <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
                <ToolButton active={tool === 'background'} onClick={() => setTool('background')} icon={<ImageMinus />} label="Supprimer le fond" />
                <ToolButton active={tool === 'crop'} onClick={() => setTool('crop')} icon={<Crop />} label="Recadrer" />
                <ToolButton active={tool === 'erase'} onClick={() => setTool('erase')} icon={<Eraser />} label="Effacer" />
              </div>
            </div>

            {tool === 'background' && <div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.025] p-3"><Control label="Tolérance" value={`${tolerance}`}><Slider min={12} max={120} value={[tolerance]} onValueChange={([value]) => setTolerance(value)} /></Control><p className="text-xs leading-5 text-muted-foreground">Idéal pour un fond blanc ou uni. Augmentez la tolérance si un halo subsiste.</p><Button className="w-full" onClick={removeBackground} disabled={isProcessing || imageStatus !== 'ready'}>{isProcessing ? <LoaderCircle className="animate-spin" /> : <ImageMinus />}{isProcessing ? 'Détourage…' : 'Supprimer le fond'}</Button></div>}

            {tool === 'crop' && <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.025] p-3"><p className="text-xs leading-5 text-muted-foreground">Glissez sur l&apos;image pour sélectionner la zone à conserver.</p><Button className="w-full" onClick={applyCrop} disabled={!cropSelection || Math.abs(cropSelection.width) < 10 || Math.abs(cropSelection.height) < 10}><Crop /> Appliquer le recadrage</Button></div>}

            {tool === 'erase' && <div className="space-y-4 rounded-xl border border-white/10 bg-white/[0.025] p-3"><Control label="Taille du pinceau" value={`${brushSize} px`}><Slider min={8} max={120} value={[brushSize]} onValueChange={([value]) => setBrushSize(value)} /></Control><p className="text-xs leading-5 text-muted-foreground">Passez le pinceau sur les éléments à rendre transparents.</p></div>}

            <div className="grid gap-2">
              <Button variant="outline" onClick={undo} disabled={historyIndex <= 0}><Undo2 /> Annuler la dernière retouche</Button>
              <Button variant="ghost" onClick={restoreOriginal} disabled={imageStatus === 'loading'}><RotateCcw /> Restaurer l&apos;original</Button>
            </div>
          </aside>
        </div>

        <DialogFooter className="m-0 border-white/10 bg-background/70">
          <DialogClose asChild><Button variant="outline">Annuler</Button></DialogClose>
          <Button onClick={save} disabled={imageStatus !== 'ready'}><Check /> Utiliser ce motif</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function ToolButton({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return <Button type="button" variant={active ? 'secondary' : 'outline'} className={cn('justify-start', active && 'border-primary/35 bg-primary/10 text-primary')} onClick={onClick}>{icon}{label}</Button>
}

function Control({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return <div><div className="mb-3 flex items-center justify-between text-xs"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>{children}</div>
}
