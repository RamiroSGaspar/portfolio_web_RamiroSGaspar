"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

type Props = {
  src: string
  alt?: string
  onClose: () => void
}

export function ImageLightbox({ src, alt = "", onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] w-10 h-10 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-orange-500 border border-zinc-700 transition-all duration-200 flex items-center justify-center"
        aria-label="Close image"
      >
        <X className="w-5 h-5" />
      </button>
      <div className="relative w-auto h-auto max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full object-contain rounded-lg shadow-[0_0_50px_rgba(251,146,60,0.3)] border-2 border-orange-500/30"
        />
      </div>
    </div>
  )
}
