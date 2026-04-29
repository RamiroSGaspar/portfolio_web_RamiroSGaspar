"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Calendar, Layers, BookOpen, Github } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import {
  type EventItem,
  type Experience,
  type Project,
  events,
  experiences,
  projects,
  sortByDateDesc,
} from "@/lib/portfolio-data"
import { ProjectCard } from "./cards/project-card"
import { ExperienceCard } from "./cards/experience-card"
import { EventCard } from "./cards/event-card"

type Filter = "all" | "Proyecto" | "Experiencia" | "Evento"

type Props = {
  onProjectClick: (project: Project) => void
  onExperienceClick: (experience: Experience) => void
  onEventClick: (event: EventItem) => void
}

const PROJECTS_INITIAL = 4
const EXPERIENCES_INITIAL = 3
const EVENTS_INITIAL = 4
const PAGE_STEP = 4

export function WorkSection({ onProjectClick, onExperienceClick, onEventClick }: Props) {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<Filter>("all")
  const [projectsShown, setProjectsShown] = useState(PROJECTS_INITIAL)
  const [experiencesShown, setExperiencesShown] = useState(EXPERIENCES_INITIAL)
  const [eventsShown, setEventsShown] = useState(EVENTS_INITIAL)

  const sortedProjects = useMemo(() => sortByDateDesc(projects), [])
  const sortedExperiences = useMemo(() => sortByDateDesc(experiences), [])
  const sortedEvents = useMemo(() => sortByDateDesc(events), [])

  const showProjects = filter === "all" || filter === "Proyecto"
  const showExperiences = filter === "all" || filter === "Experiencia"
  const showEvents = filter === "all" || filter === "Evento"

  const filterButtons: { label: string; value: Filter; count: number; activeClass: string }[] = [
    {
      label: t("work.filter.all"),
      value: "all",
      count: sortedProjects.length + sortedExperiences.length + sortedEvents.length,
      activeClass:
        "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 border-0 text-white shadow-[0_0_10px_rgba(251,146,60,0.3)]",
    },
    {
      label: t("work.filter.projects"),
      value: "Proyecto",
      count: sortedProjects.length,
      activeClass:
        "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 border-0 text-white shadow-[0_0_10px_rgba(251,146,60,0.3)]",
    },
    {
      label: t("work.filter.experiences"),
      value: "Experiencia",
      count: sortedExperiences.length,
      activeClass:
        "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 border-0 text-white shadow-[0_0_10px_rgba(34,197,94,0.3)]",
    },
    {
      label: t("work.filter.events"),
      value: "Evento",
      count: sortedEvents.length,
      activeClass:
        "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 border-0 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]",
    },
  ]

  const inactiveClass =
    "hover:bg-orange-500/10 border-orange-500/25 hover:border-orange-500/40 text-zinc-400 hover:text-orange-400 transition-all duration-300"

  return (
    <Card className="border-orange-500/15 backdrop-blur-xl bg-zinc-950/95 shadow-[0_0_25px_-12px_rgba(251,146,60,0.2)] hover:shadow-[0_0_35px_-12px_rgba(251,146,60,0.25)] transition-shadow duration-300">
      <CardContent className="p-4 sm:p-6 space-y-6">
        <header className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.2)]">
            <BookOpen className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-100">{t("work.title")}</h2>
            <p className="text-sm text-zinc-500">{t("work.subtitle")}</p>
          </div>
        </header>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter">
          {filterButtons.map((btn) => (
            <Button
              key={btn.value}
              variant={filter === btn.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(btn.value)}
              className={`text-xs px-3 ${filter === btn.value ? btn.activeClass : inactiveClass}`}
            >
              <span>{btn.label}</span>
              <span
                className={`ml-1.5 text-[10px] ${
                  filter === btn.value ? "text-white/70" : "text-zinc-500"
                }`}
              >
                {btn.count}
              </span>
            </Button>
          ))}
        </div>

        {showProjects && (
          <SectionGroup
            icon={<Layers className="w-4 h-4 text-orange-400" aria-hidden="true" />}
            title={t("work.section.projects")}
            lead={t("work.section.projects.lead")}
            count={sortedProjects.length}
          >
            {sortedProjects.length === 0 ? (
              <EmptyProjects />
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  {sortedProjects.slice(0, projectsShown).map((p) => (
                    <ProjectCard key={p.id} project={p} onOpen={onProjectClick} />
                  ))}
                </div>
                {sortedProjects.length > projectsShown && (
                  <ShowMoreButton
                    onClick={() => setProjectsShown((n) => n + PAGE_STEP)}
                    label={`${t("work.viewMore")} (${sortedProjects.length - projectsShown})`}
                    color="orange"
                  />
                )}
              </>
            )}
          </SectionGroup>
        )}

        {showExperiences && (
          <SectionGroup
            icon={<Briefcase className="w-4 h-4 text-green-400" aria-hidden="true" />}
            title={t("work.section.experiences")}
            lead={t("work.section.experiences.lead")}
            count={sortedExperiences.length}
          >
            {sortedExperiences.length === 0 ? (
              <EmptyState text={t("work.empty.experiences")} />
            ) : (
              <>
                <div className="grid gap-3">
                  {sortedExperiences.slice(0, experiencesShown).map((e) => (
                    <ExperienceCard key={e.id} experience={e} onOpen={onExperienceClick} />
                  ))}
                </div>
                {sortedExperiences.length > experiencesShown && (
                  <ShowMoreButton
                    onClick={() => setExperiencesShown((n) => n + PAGE_STEP)}
                    label={`${t("work.viewMore")} (${sortedExperiences.length - experiencesShown})`}
                    color="green"
                  />
                )}
              </>
            )}
          </SectionGroup>
        )}

        {showEvents && (
          <SectionGroup
            icon={<Calendar className="w-4 h-4 text-purple-400" aria-hidden="true" />}
            title={t("work.section.events")}
            lead={t("work.section.events.lead")}
            count={sortedEvents.length}
            muted
          >
            {sortedEvents.length === 0 ? (
              <EmptyState text={t("work.empty.events")} />
            ) : (
              <>
                <div className="grid gap-2">
                  {sortedEvents.slice(0, eventsShown).map((ev) => (
                    <EventCard key={ev.id} event={ev} onOpen={onEventClick} />
                  ))}
                </div>
                {sortedEvents.length > eventsShown && (
                  <ShowMoreButton
                    onClick={() => setEventsShown((n) => n + PAGE_STEP)}
                    label={`${t("work.viewMore")} (${sortedEvents.length - eventsShown})`}
                    color="purple"
                  />
                )}
              </>
            )}
          </SectionGroup>
        )}
      </CardContent>
    </Card>
  )
}

function SectionGroup({
  icon,
  title,
  lead,
  count,
  muted = false,
  children,
}: {
  icon: React.ReactNode
  title: string
  lead: string
  count: number
  muted?: boolean
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-3 border-b border-zinc-800/80 pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <h3
            className={`text-sm font-semibold uppercase tracking-wider ${
              muted ? "text-zinc-500" : "text-zinc-300"
            }`}
          >
            {title}
          </h3>
          <span className="text-xs text-zinc-600">({count})</span>
        </div>
        <p className="hidden sm:block text-xs text-zinc-500 truncate">{lead}</p>
      </div>
      {children}
    </section>
  )
}

function ShowMoreButton({
  onClick,
  label,
  color,
}: {
  onClick: () => void
  label: string
  color: "orange" | "green" | "purple"
}) {
  const colorClass =
    color === "orange"
      ? "border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:border-orange-500/50"
      : color === "green"
        ? "border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50"
        : "border-purple-500/30 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500/50"

  return (
    <div className="flex justify-center pt-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onClick}
        className={`text-xs bg-transparent ${colorClass}`}
      >
        {label}
      </Button>
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/30 p-4 text-center">
      <p className="text-sm text-zinc-500">{text}</p>
    </div>
  )
}

function EmptyProjects() {
  const { t } = useLanguage()
  return (
    <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
      <p className="text-sm text-zinc-300">{t("work.empty.projects")}</p>
      <Button
        variant="outline"
        size="sm"
        asChild
        className="border-orange-500/40 text-orange-400 hover:bg-orange-500/10 hover:border-orange-400 bg-transparent flex-shrink-0"
      >
        <a
          href="https://github.com/RamiroSGaspar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
          GitHub
        </a>
      </Button>
    </div>
  )
}
