"use client"

import { Mail, Github, Linkedin } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export function ContactSection() {
  const { t } = useLanguage()
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Mail className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
        <a
          href="mailto:gapsar.sebastian@gmail.com"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          gapsar.sebastian@gmail.com
        </a>
      </div>
      <div className="flex items-center gap-3">
        <Github className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
        <a
          href="https://github.com/RamiroSGaspar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          github.com/RamiroSGaspar
        </a>
      </div>
      <div className="flex items-center gap-3">
        <Linkedin className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
        <a
          href="https://www.linkedin.com/in/ramiro-sebastian-gaspar-b41697317"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {t("contact.linkedin")}
        </a>
      </div>
    </div>
  )
}
