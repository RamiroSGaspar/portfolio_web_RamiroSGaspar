"use client"

import { Languages } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className="fixed top-4 right-4 z-40 flex items-center gap-1 rounded-full border border-orange-500/30 bg-zinc-950/80 backdrop-blur-md p-1 shadow-[0_0_15px_rgba(251,146,60,0.15)]"
      role="group"
      aria-label="Language switcher"
    >
      <Languages className="w-3.5 h-3.5 text-orange-400/80 ml-2" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLang("es")}
        aria-pressed={lang === "es"}
        aria-label="Cambiar a español"
        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
          lang === "es"
            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-[0_0_8px_rgba(251,146,60,0.35)]"
            : "text-zinc-400 hover:text-orange-400"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        aria-label="Switch to English"
        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
          lang === "en"
            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-[0_0_8px_rgba(251,146,60,0.35)]"
            : "text-zinc-400 hover:text-orange-400"
        }`}
      >
        EN
      </button>
    </div>
  )
}
