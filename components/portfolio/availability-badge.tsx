"use client"

import { useLanguage } from "@/lib/i18n"

export function AvailabilityBadge() {
  const { t } = useLanguage()
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-medium"
      role="status"
      aria-label={t("profile.availability")}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
      </span>
      <span>{t("profile.availability")}</span>
    </div>
  )
}
