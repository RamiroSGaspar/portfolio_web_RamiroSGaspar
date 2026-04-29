"use client"

import { ArrowRight, Briefcase, Calendar } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import type { Experience } from "@/lib/portfolio-data"

type Props = {
  experience: Experience
  onOpen: (experience: Experience) => void
}

/**
 * Mid-impact card. Horizontal layout, less prominent than projects.
 * Smart Brevity: role · company + duration + 1-line lead.
 */
export function ExperienceCard({ experience, onOpen }: Props) {
  const { t } = useLanguage()
  const lead =
    experience.shortDescription ??
    experience.description.split(". ").slice(0, 1).join(". ").replace(/\.+$/, "") + "."
  const dateRange = `${experience.startDate} — ${experience.endDate}`

  const handleClick = () => onOpen(experience)
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onOpen(experience)
    }
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKey}
      className="group flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 transition-all duration-300 hover:border-green-500/40 hover:bg-zinc-900/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60 cursor-pointer"
    >
      <div className="flex-shrink-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
          <img
            src={experience.image || "/placeholder.svg"}
            alt={experience.company}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 rounded-md border border-green-500/30 bg-green-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-400">
            <Briefcase className="w-3 h-3" aria-hidden="true" />
            {t("tag.experience")}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500">
            <Calendar className="w-3 h-3" aria-hidden="true" />
            {dateRange}
            <span className="text-zinc-600">·</span>
            <span>{experience.duration}</span>
          </span>
        </div>

        <h3 className="text-base font-semibold text-zinc-100 group-hover:text-green-300 transition-colors leading-snug text-pretty">
          {experience.title}
          <span className="text-zinc-500 font-normal"> · {experience.company}</span>
        </h3>

        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">{lead}</p>

        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-400/90 mt-auto pt-1">
          {t("work.details")}
          <ArrowRight
            className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  )
}
