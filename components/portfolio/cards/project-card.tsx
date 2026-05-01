"use client"

import type React from "react"
import { ArrowUpRight, ExternalLink, Github, ImageIcon } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import type { Project } from "@/lib/portfolio-data"
import { StatusDot } from "./status-dot"

type Props = {
  project: Project
  onOpen: (project: Project) => void
}

/**
 * High-impact card. Smart Brevity: title + 1-line lead + stack chips + actions.
 * Detailed content lives inside the modal.
 *
 * Layout contract — every project card is identical in structure regardless of
 * which optional fields are present. This guarantees grid symmetry:
 *
 *   [ image                     ]   ← fixed aspect 16/9
 *   [ PROYECTO            date  ]   ← row 1 of meta
 *   [ ● status                  ]   ← row 2 of meta (own line, never wraps)
 *   [ title (2 lines reserved)  ]
 *   [ description (2 lines)     ]
 *   [ stack chips (1 row)       ]
 *   [ ─────────── footer ───────]   ← always pinned to bottom (mt-auto)
 */
export function ProjectCard({ project, onOpen }: Props) {
  const { t } = useLanguage()
  const dateLabel = project.dateLabel ?? project.startDate ?? ""
  const stack = project.technologies?.slice(0, 4) ?? []

  const handleClick = () => onOpen(project)
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onOpen(project)
    }
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKey}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-orange-500/30 bg-zinc-900/60 transition-all duration-300 hover:border-orange-400/60 hover:shadow-[0_0_25px_-8px_rgba(251,146,60,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 cursor-pointer"
    >
      <div className="aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-orange-500/15 via-zinc-900 to-zinc-950 flex items-center justify-center">
        {project.images?.[0] ? (
          <img
            src={project.images[0] || "/placeholder.svg"}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <ImageIcon className="w-12 h-12 text-orange-500/40" aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Meta row 1: tag + date. Always single-line. */}
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-orange-500/40 bg-orange-500/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-orange-400">
            {t("tag.project")}
          </span>
          {dateLabel && (
            <span className="text-xs text-zinc-500 whitespace-nowrap">{dateLabel}</span>
          )}
        </div>

        {/* Meta row 2: status on its own line so length never affects layout. */}
        {(project.status || project.statusLabel) && (
          <StatusDot status={project.status} customLabel={project.statusLabel} />
        )}

        <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-orange-300 transition-colors leading-snug text-pretty line-clamp-2 min-h-[3.25rem]">
          {project.title}
        </h3>

        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {project.description}
        </p>

        {/* Stack: reserve 1-row height even when empty for grid alignment. */}
        <div className="flex flex-wrap items-start gap-1.5 pt-1 min-h-[1.75rem]">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-zinc-700/60 bg-zinc-800/50 px-2 py-0.5 text-[11px] font-medium text-zinc-300"
            >
              {tech}
            </span>
          ))}
          {(project.technologies?.length ?? 0) > stack.length && (
            <span className="text-[11px] text-zinc-500 px-1 py-0.5">
              +{(project.technologies?.length ?? 0) - stack.length}
            </span>
          )}
        </div>

        {/* Footer: always pinned to bottom and same min-height with or without chips. */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-zinc-800/80 min-h-[2.75rem]">
          <div className="flex items-center gap-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700/60 bg-zinc-800/40 px-2.5 py-1 text-xs font-semibold text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                aria-label={`${t("work.viewGithub")} - ${project.title}`}
              >
                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                {t("work.viewGithub")}
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-md border border-orange-500/40 bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-orange-300 hover:border-orange-400/60 hover:bg-orange-500/20 hover:text-orange-200 transition-colors"
                aria-label={`${t("work.viewDemo")} - ${project.title}`}
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                {t("work.viewDemo")}
              </a>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-400 group-hover:translate-x-0.5 transition-transform">
            {t("work.viewProject")}
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  )
}
