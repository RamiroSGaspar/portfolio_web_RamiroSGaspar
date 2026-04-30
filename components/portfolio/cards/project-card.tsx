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
      className="group relative flex flex-col overflow-hidden rounded-xl border border-orange-500/30 bg-zinc-900/60 transition-all duration-300 hover:border-orange-400/60 hover:shadow-[0_0_25px_-8px_rgba(251,146,60,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 cursor-pointer"
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

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-orange-500/40 bg-orange-500/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-orange-400">
            {t("tag.project")}
          </span>
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <StatusDot status={project.status} customLabel={project.statusLabel} />
            {dateLabel && <span>{dateLabel}</span>}
          </div>
        </div>

        <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-orange-300 transition-colors leading-snug text-pretty">
          {project.title}
        </h3>

        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
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
        )}

        <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 mt-auto">
          <div className="flex items-center gap-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
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
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-orange-400 hover:bg-orange-500/15 hover:text-orange-300 transition-colors"
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
