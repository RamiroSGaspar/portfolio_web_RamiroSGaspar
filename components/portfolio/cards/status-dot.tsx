"use client"

import { useLanguage } from "@/lib/i18n"
import { getProjectStatusConfig, type ProjectStatus } from "@/lib/portfolio-data"

type Props = {
  status?: ProjectStatus
  className?: string
}

export function StatusDot({ status, className = "" }: Props) {
  const { t } = useLanguage()
  const config = getProjectStatusConfig(status)
  if (!config) return null

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
      <span>{t(config.labelKey)}</span>
    </span>
  )
}
