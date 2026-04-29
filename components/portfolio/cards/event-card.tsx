"use client"

import { Calendar, ChevronRight, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import type { EventItem } from "@/lib/portfolio-data"

type Props = {
  event: EventItem
  onOpen: (event: EventItem) => void
}

/**
 * Low-impact card. Compact row — meant to be browsed casually.
 * Title + date + location, nothing more.
 */
export function EventCard({ event, onOpen }: Props) {
  const { t } = useLanguage()

  const handleClick = () => onOpen(event)
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onOpen(event)
    }
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKey}
      className="group flex items-center gap-3 rounded-lg border border-zinc-900 bg-zinc-950/60 p-3 transition-colors duration-200 hover:border-purple-500/30 hover:bg-zinc-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 cursor-pointer"
    >
      <div className="w-12 h-12 rounded-md overflow-hidden border border-zinc-800 bg-zinc-900 flex-shrink-0">
        <img
          src={event.eventLogo || "/placeholder.svg"}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[10px] font-medium uppercase tracking-wider text-purple-400/80">
            {t("tag.event")}
          </span>
        </div>
        <h3 className="text-sm font-medium text-zinc-200 group-hover:text-purple-300 transition-colors truncate">
          {event.eventName}
        </h3>
        <div className="flex items-center gap-3 text-[11px] text-zinc-500 mt-0.5">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" aria-hidden="true" />
            {event.eventDate}
          </span>
          <span className="inline-flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{event.location}</span>
          </span>
        </div>
      </div>

      <ChevronRight
        className="w-4 h-4 text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all flex-shrink-0"
        aria-hidden="true"
      />
    </article>
  )
}
