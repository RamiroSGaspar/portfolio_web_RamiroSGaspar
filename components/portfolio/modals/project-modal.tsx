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
  ListChecks,
  Rocket,
  Tag,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { type Project, translateTag } from "@/lib/portfolio-data"
import { StatusDot } from "../cards/status-dot"
import { ModalShell } from "./modal-shell"

type Props = { project: Project; onClose: () => void }

/**
 * Flexible modal: every section is optional and only renders when its data
 * is present in the project. Load what you have, skip the rest.
 */
export function ProjectModal({ project, onClose }: Props) {
  const { t } = useLanguage()

  const dateLabel = project.dateLabel ?? project.startDate ?? null
  const hasImages = (project.images?.length ?? 0) > 0
  const hasStack = (project.technologies?.length ?? 0) > 0
  const hasFeatures = (project.features?.length ?? 0) > 0
  const hasUpdateHistory = (project.updateHistory?.length ?? 0) > 0
  const hasTimeline = (project.timeline?.length ?? 0) > 0
  const hasChallenges = (project.challenges?.length ?? 0) > 0
  const hasLearnings = (project.learnings?.length ?? 0) > 0
  const futureUpdatesList = Array.isArray(project.futureUpdates)
    ? project.futureUpdates.filter((item) => item.trim().length > 0)
    : project.futureUpdates?.trim()
      ? [project.futureUpdates.trim()]
      : []
  const hasFuture = futureUpdatesList.length > 0

  return (
    <ModalShell variant="orange" onClose={onClose} maxWidthClass="max-w-5xl">
      <div className="p-4 sm:p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium border border-orange-500/40 bg-orange-500/10 text-orange-400"
              >
                <Tag className="w-3 h-3" aria-hidden="true" />
                {translateTag(tag, t)}
              </span>
            ))}
            <StatusDot status={project.status} customLabel={project.statusLabel} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 text-pretty">
            {project.title}
          </h2>

          {dateLabel && (
            <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {dateLabel}
                {project.endDate && project.endDate !== dateLabel && (
                  <span> — {project.endDate}</span>
                )}
              </span>
            </div>
          )}

          <div className="space-y-3 text-lg text-zinc-300 leading-relaxed">
            {(project.fullDescription ?? project.description)
              .split(/\n\n+/)
              .map((paragraph, idx) => (
                <p key={idx} className="text-pretty">
                  {paragraph}
                </p>
              ))}
          </div>

          {(project.githubUrl || project.demoUrl) && (
            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <Button
                  variant="outline"
                  className="border-orange-500/40 hover:border-orange-400 hover:bg-orange-500/10 text-orange-400 bg-transparent"
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
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500"
                  asChild
                >
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                    {t("modal.project.viewDemo")}
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>

        {hasImages && (
          <>
            <Separator className="bg-orange-500/20" />
            <section className="space-y-3">
              <SectionHeading icon={ImageIcon} label={t("modal.project.preview")} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images!.slice(0, 4).map((img, idx) => (
                  <img
                    key={idx}
                    src={img || "/placeholder.svg"}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="w-full rounded-lg border border-orange-500/20 hover:border-orange-400/40 transition-colors"
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {hasStack && (
          <>
            <Separator className="bg-orange-500/20" />
            <section className="space-y-3">
              <SectionHeading icon={Code} label={t("modal.project.stack")} />
              <div className="flex flex-wrap gap-2">
                {project.technologies!.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg text-sm font-medium text-orange-400 hover:bg-orange-500/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </>
        )}

        {hasFeatures && (
          <>
            <Separator className="bg-orange-500/20" />
            <section className="space-y-3">
              <SectionHeading icon={ListChecks} label={t("modal.project.features")} />
              <ul className="space-y-2">
                {project.features!.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-zinc-300">
                    <CheckCircle2
                      className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {hasUpdateHistory && (
          <>
            <Separator className="bg-orange-500/20" />
            <section className="space-y-3">
              <SectionHeading icon={History} label={t("modal.project.versions")} />
              <div className="space-y-3">
                {project.updateHistory!.map((update, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-orange-400">{update.version}</span>
                      <span className="text-sm text-zinc-500">{update.date}</span>
                    </div>
                    <ul className="space-y-1">
                      {update.changes.map((change, changeIdx) => (
                        <li
                          key={changeIdx}
                          className="flex items-start gap-2 text-sm text-zinc-300"
                        >
                          <span className="text-orange-400">•</span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {hasTimeline && (
          <>
            <Separator className="bg-orange-500/20" />
            <section className="space-y-3">
              <SectionHeading icon={Calendar} label={t("modal.project.timeline")} />
              <div className="space-y-4">
                {project.timeline!.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1" aria-hidden="true">
                      {item.status === "completed" && (
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      )}
                      {item.status === "in-progress" && (
                        <Clock className="w-6 h-6 text-orange-400 motion-safe:animate-pulse" />
                      )}
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
          </>
        )}

        {hasChallenges && (
          <>
            <Separator className="bg-orange-500/20" />
            <section className="space-y-3">
              <SectionHeading icon={AlertCircle} label={t("modal.project.challenges")} />
              <div className="space-y-4">
                {project.challenges!.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-zinc-900 border border-orange-500/20 rounded-lg space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-zinc-300 flex items-start gap-2">
                        <AlertCircle
                          className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        {item.challenge}
                      </p>
                      <span className="text-xs text-zinc-500 whitespace-nowrap">
                        {item.challengeDate}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-zinc-400 flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        {item.solution}
                      </p>
                      <span className="text-xs text-zinc-500 whitespace-nowrap">
                        {item.solutionDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {hasLearnings && (
          <>
            <Separator className="bg-orange-500/20" />
            <section className="space-y-3">
              <SectionHeading icon={Lightbulb} label={t("modal.project.learnings")} />
              <ul className="space-y-2">
                {project.learnings!.map((learning, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-zinc-300 p-3 bg-orange-500/5 border border-orange-500/20 rounded-lg"
                  >
                    <Lightbulb
                      className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        {hasFuture && (
          <>
            <Separator className="bg-orange-500/20" />
            <section className="space-y-3">
              <SectionHeading icon={Rocket} label={t("modal.project.future")} />
              <ul className="space-y-2 p-4 bg-orange-500/5 border border-orange-500/20 rounded-lg">
                {futureUpdatesList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-zinc-300">
                    <Rocket
                      className="w-4 h-4 text-orange-400 flex-shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </ModalShell>
  )
}

function SectionHeading({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  label: string
}) {
  return (
    <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
      <Icon className="w-5 h-5 text-orange-400" aria-hidden={true} />
      {label}
    </h3>
  )
}
