"use client"

import { useLanguage } from "@/lib/i18n"
import { getProjectStatusConfig, type ProjectStatus } from "@/lib/portfolio-data"

type Props = {
  status?: ProjectStatus
  /**
   * Optional override. If provided, replaces the default i18n label while
   * keeping the dot color from `status`. Pass `{ es, en }` for bilingual.
   */
  customLabel?: string | { es: string; en: string }
  className?: string
}

export function StatusDot({ status, customLabel, className = "" }: Props) {
  const { t, lang } = useLanguage()
  const config = getProjectStatusConfig(status)
  if (!config) return null

  const label =
    typeof customLabel === "string"
      ? customLabel
      : customLabel
        ? customLabel[lang]
        : t(config.labelKey)

  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium text-zinc-400 ${className}`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {config.ping && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping ${config.dot}`}
          />
        )}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${config.dot}`} />
      </span>
      <span>{label}</span>
    </span>
  )
}
