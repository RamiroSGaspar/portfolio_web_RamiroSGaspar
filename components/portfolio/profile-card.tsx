"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, MapPin, GraduationCap, Github, Linkedin, Download } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { AvailabilityBadge } from "./availability-badge"

const EMAIL = "gapsar.sebastian@gmail.com"
const GITHUB_URL = "https://github.com/RamiroSGaspar"
const LINKEDIN_URL = "https://www.linkedin.com/in/ramiro-sebastian-gaspar-b41697317"

type Props = {
  onContactClick: () => void
  onProfileImageClick: () => void
}

export function ProfileCard({ onContactClick, onProfileImageClick }: Props) {
  const { t } = useLanguage()
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <Card className="border-orange-500/20 backdrop-blur-xl bg-zinc-950/95 shadow-[0_0_30px_-12px_rgba(251,146,60,0.25)] hover:shadow-[0_0_40px_-12px_rgba(251,146,60,0.35)] transition-shadow duration-300">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onProfileImageClick}
            className="relative cursor-pointer group rounded-full"
            aria-label="Open profile photo"
          >
            <div className="absolute inset-0 rounded-full bg-orange-500 blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
            <Avatar className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-4 border-orange-500/60 shadow-[0_0_20px_rgba(251,146,60,0.3)] group-hover:border-orange-400 group-hover:shadow-[0_0_25px_rgba(251,146,60,0.4)] transition-all">
              <AvatarImage src="/profile.jpeg" alt="Ramiro Sebastian Gaspar" />
              <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white text-2xl sm:text-3xl font-bold">
                RG
              </AvatarFallback>
            </Avatar>
          </button>

          <AvailabilityBadge />

          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(251,146,60,0.4)] text-balance">
              Ramiro Sebastian Gaspar
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-orange-400 font-semibold">{t("profile.role")}</p>
            <p className="text-xs sm:text-sm text-zinc-500 text-pretty">{t("profile.tagline")}</p>
          </div>

          <div className="flex flex-col items-center gap-2 text-sm text-zinc-500">
            <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              <span>{t("profile.university")}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>{t("profile.location")}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              onClick={onContactClick}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 shadow-[0_0_15px_rgba(251,146,60,0.3)] hover:shadow-[0_0_20px_rgba(251,146,60,0.4)] transition-all duration-300 border-0 font-semibold text-white"
            >
              <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
              {t("profile.cta.contact")}
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-zinc-900/50 border-orange-500/40 hover:border-orange-400 hover:bg-orange-500/10 hover:shadow-[0_0_12px_rgba(251,146,60,0.25)] transition-all duration-300 text-orange-400 hover:text-orange-300"
              asChild
            >
              <a href="/api/download-cv" download="CV_RamiroSebastianGaspar.pdf">
                <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                {t("profile.cta.cv")}
              </a>
            </Button>
          </div>

          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-orange-500/10 hover:shadow-[0_0_10px_rgba(251,146,60,0.2)] hover:text-orange-400 transition-all duration-300"
              asChild
            >
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-orange-500/10 hover:shadow-[0_0_10px_rgba(251,146,60,0.2)] hover:text-orange-400 transition-all duration-300"
              asChild
            >
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-orange-500/10 hover:shadow-[0_0_10px_rgba(251,146,60,0.2)] hover:text-orange-400 transition-all duration-300"
                onClick={copyEmail}
                aria-label="Copy email"
              >
                <Mail className="w-5 h-5" />
              </Button>
              {emailCopied && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-top-2 duration-300 pointer-events-none">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs px-4 py-2 rounded-lg shadow-lg whitespace-nowrap font-medium backdrop-blur-sm border border-orange-400/30">
                    {t("profile.email.copied")}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
