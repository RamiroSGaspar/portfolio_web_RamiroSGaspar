"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Code,
  ExternalLink,
  Github,
  History,
  ImageIcon,
  Lightbulb,
  Rocket,
  Tag,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { type Project, translateTag } from "@/lib/portfolio-data"
import { ModalShell } from "./modal-shell"

type Props = { project: Project; onClose: () => void }

export function ProjectModal({ project, onClose }: Props) {
  const { t } = useLanguage()
  const inProgress = project.timeline.some((tl) => tl.status === "in-progress")
  const lastDate = project.timeline[project.timeline.length - 1]?.date
  const showFuture = project.timeline.some((tl) => tl.status === "in-progress" || tl.status === "pending")

  return (
    <ModalShell variant="blue" onClose={onClose} maxWidthClass="max-w-5xl">
      <div className="p-4 sm:p-6 md:p-8 space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium border border-blue-500/40 bg-blue-500/10 text-blue-400"
              >
                <Tag className="w-3 h-3" aria-hidden="true" />
                {translateTag(tag, t)}
              </span>
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 text-pretty">{project.title}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {t("modal.project.start")}: {project.timeline[0]?.date}
            </span>
            {inProgress ? (
              <span className="flex items-center gap-2 text-blue-400">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {t("modal.project.inProgress")}
              </span>
            ) : (
              <span className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                {t("modal.project.completed")}: {lastDate}
              </span>
            )}
          </div>
          <p className="text-lg text-zinc-400">{project.fullDescription}</p>
          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <Button
                variant="outline"
                className="border-blue-500/40 hover:border-blue-400 hover:bg-blue-500/10 text-blue-400 bg-transparent"
                asChild
              >
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" aria-hidden="true" />
                  {t("modal.project.viewGithub")}
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500"
                asChild
              >
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                  {t("modal.project.viewDemo")}
                </a>
              </Button>
            )}
          </div>
        </div>

        <Separator className="bg-blue-500/20" />

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-400" aria-hidden="true" />
            {t("modal.project.preview")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.slice(0, 2).map((img, idx) => (
              <img
                key={idx}
                src={img || "/placeholder.svg"}
                alt={`${project.title} screenshot ${idx + 1}`}
                className="w-full rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-colors"
              />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-400" aria-hidden="true" />
            {t("modal.project.stack")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm font-medium text-blue-400 hover:bg-blue-500/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <History className="w-5 h-5 text-blue-400" aria-hidden="true" />
            {t("modal.project.versions")}
          </h3>
          <div className="space-y-3">
            {project.updateHistory.map((update, idx) => (
              <div key={idx} className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-blue-400">{update.version}</span>
                  <span className="text-sm text-zinc-500">{update.date}</span>
                </div>
                <ul className="space-y-1">
                  {update.changes.map((change, changeIdx) => (
                    <li key={changeIdx} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-blue-400">•</span>
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" aria-hidden="true" />
            {t("modal.project.timeline")}
          </h3>
          <div className="space-y-4">
            {project.timeline.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-1" aria-hidden="true">
                  {item.status === "completed" && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                  {item.status === "in-progress" && <Clock className="w-6 h-6 text-blue-400 motion-safe:animate-pulse" />}
                  {item.status === "pending" && <Circle className="w-6 h-6 text-zinc-600" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-zinc-100">{item.phase}</h4>
                    <span className="text-xs text-zinc-500">{item.date}</span>
                  </div>
                  <p className="text-sm text-zinc-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-400" aria-hidden="true" />
            {t("modal.project.challenges")}
          </h3>
          <div className="space-y-4">
            {project.challenges.map((item, idx) => (
              <div key={idx} className="p-4 bg-zinc-900 border border-blue-500/20 rounded-lg space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-zinc-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    {item.challenge}
                  </p>
                  <span className="text-xs text-zinc-500 whitespace-nowrap">{item.challengeDate}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-zinc-400 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    {item.solution}
                  </p>
                  <span className="text-xs text-zinc-500 whitespace-nowrap">{item.solutionDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-400" aria-hidden="true" />
            {t("modal.project.learnings")}
          </h3>
          <ul className="space-y-2">
            {project.learnings.map((learning, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-zinc-300 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg"
              >
                <Lightbulb className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </section>

        {showFuture && (
          <section className="space-y-3">
            <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-blue-400" aria-hidden="true" />
              {t("modal.project.future")}
            </h3>
            <p className="text-zinc-300 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              {project.futureUpdates}
            </p>
          </section>
        )}
      </div>
    </ModalShell>
  )
}
