"use client"

import { useEffect, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

type Variant = "blue" | "purple" | "green"

type Props = {
  variant: Variant
  onClose: () => void
  children: ReactNode
  maxWidthClass?: string
}

const variantClasses: Record<Variant, { border: string; shadow: string; close: string }> = {
  blue: {
    border: "border-blue-500/30",
    shadow: "shadow-[0_0_50px_rgba(59,130,246,0.2)]",
    close: "hover:text-blue-400 hover:bg-blue-500/10",
  },
  purple: {
    border: "border-purple-500/30",
    shadow: "shadow-[0_0_50px_rgba(168,85,247,0.3)]",
    close: "hover:text-purple-400 hover:bg-purple-500/10",
  },
  green: {
    border: "border-green-500/30",
    shadow: "shadow-[0_0_50px_rgba(34,197,94,0.2)]",
    close: "hover:text-green-400 hover:bg-green-500/10",
  },
}

export function ModalShell({ variant, onClose, children, maxWidthClass = "max-w-4xl" }: Props) {
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

  const v = variantClasses[variant]
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full ${maxWidthClass} max-h-[90vh] overflow-y-auto bg-zinc-950 border ${v.border} rounded-2xl ${v.shadow}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-4 right-4 z-10 text-zinc-400 ${v.close}`}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </Button>
        {children}
      </div>
    </div>
  )
}
