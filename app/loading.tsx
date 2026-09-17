import { Spinner } from '@heroui/react'

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spinner aria-label="Chargement" />
    </div>
  )
}
