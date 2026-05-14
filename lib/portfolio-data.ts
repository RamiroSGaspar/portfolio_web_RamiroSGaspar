import data from "@/data/portfolio.json"
import type { Language } from "@/lib/i18n"

export type ProjectStatus = "planning" | "in-progress" | "completed" | "archived"

/**
 * Any user-facing string in the portfolio data may be either a plain string
 * (same in both languages, e.g. proper nouns, dates that already work in both
 * locales) or a `{ es, en }` object. The `localize()` helper resolves both
 * shapes against the active language. Plain strings are kept for backwards
 * compatibility and to keep the JSON terse when a value doesn't need to be
 * translated.
 */
export type LocalizedString = string | { es: string; en: string }

export function localize(value: LocalizedString | undefined | null, lang: Language): string {
  if (value == null) return ""
  if (typeof value === "string") return value
  return value[lang] ?? value.es ?? ""
}

export function localizeList(
  values: LocalizedString[] | undefined,
  lang: Language,
): string[] {
  if (!values) return []
  return values.map((v) => localize(v, lang))
}

export type ProjectTimelineItem = {
  phase: LocalizedString
  description: LocalizedString
  status: "completed" | "in-progress" | "pending"
  date: LocalizedString
}

/**
 * Visual building block for a project description. Lets the modal render
 * sectioned, scannable copy (icon + heading + body) instead of plain text.
 * If a project provides `descriptionBlocks`, they replace the plain
 * `fullDescription` paragraph rendering.
 */
export type ProjectDescriptionBlock = {
  /** Maps to a Lucide icon. Defaults to "sparkles" if omitted. */
  icon?: "alert" | "sparkles" | "rocket" | "lightbulb" | "target" | "flag"
  title: LocalizedString
  body: LocalizedString
}

/**
 * Project shape with most fields optional. The card and the modal render only
 * the sections that have data — load what you have, skip the rest.
 */
export type Project = {
  id: number
  title: LocalizedString
  description: LocalizedString
  tags: string[]
  fullDescription?: LocalizedString
  descriptionBlocks?: ProjectDescriptionBlock[]
  technologies?: LocalizedString[]
  status?: ProjectStatus
  /**
   * Optional override for the status label. Keeps the dot color from `status`
   * but replaces the default text (e.g. show "En constante desarrollo"
   * instead of "En curso" for an actively-evolving project).
   */
  statusLabel?: string | { es: string; en: string }
  dateLabel?: LocalizedString
  dateIso?: string
  startDate?: LocalizedString
  endDate?: LocalizedString | null
  githubUrl?: string | null
  demoUrl?: string | null
  images?: string[]
  features?: LocalizedString[]
  timeline?: ProjectTimelineItem[]
  challenges?: {
    challenge: LocalizedString
    challengeDate: LocalizedString
    solution: LocalizedString
    solutionDate: LocalizedString
  }[]
  learnings?: LocalizedString[]
  futureUpdates?: LocalizedString | LocalizedString[]
  updateHistory?: { version: string; date: LocalizedString; changes: LocalizedString[] }[]
}

export type EventItem = {
  id: number
  title: LocalizedString
  tags: string[]
  eventName: LocalizedString
  eventLogo: string
  eventDate: LocalizedString
  dateIso?: string
  location: LocalizedString
  fullDescription: LocalizedString
  highlights: LocalizedString[]
  photos: string[]
  socialPosts: { platform: string; url: string; preview: string }[]
  learnings: LocalizedString
  connections: LocalizedString
}

export type Experience = {
  id: number
  title: LocalizedString
  /** Brand / company name — usually stays the same across languages. */
  company: string
  type: LocalizedString
  location: LocalizedString
  workMode?: LocalizedString
  startDate: LocalizedString
  endDate: LocalizedString
  dateIso?: string
  duration: LocalizedString
  image: string
  description: LocalizedString
  shortDescription?: LocalizedString
  responsibilities: LocalizedString[]
  achievements: LocalizedString[]
  skills: LocalizedString[]
  gallery?: string[]
}

export const projects = (data.projects as unknown as Project[]) ?? []
export const events = (data.events as unknown as EventItem[]) ?? []
export const experiences = (data.experiences as unknown as Experience[]) ?? []

/** Sort a list with optional `dateIso` field, descending (newest first). */
export function sortByDateDesc<T extends { dateIso?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    if (!a.dateIso && !b.dateIso) return 0
    if (!a.dateIso) return 1
    if (!b.dateIso) return -1
    return b.dateIso.localeCompare(a.dateIso)
  })
}

export function getTagColor(tag: string): string {
  switch (tag) {
    case "Proyecto":
      return "bg-orange-500/15 text-orange-400 border-orange-500/30"
    case "Evento":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30"
    case "Experiencia":
      return "bg-green-500/20 text-green-400 border-green-500/30"
    default:
      return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
  }
}

export function translateTag(tag: string, t: (key: any) => string): string {
  switch (tag) {
    case "Proyecto":
      return t("tag.project")
    case "Evento":
      return t("tag.event")
    case "Experiencia":
      return t("tag.experience")
    default:
      return tag
  }
}

export type StatusConfig = {
  dot: string
  ping: boolean
  labelKey:
    | "work.status.planning"
    | "work.status.in-progress"
    | "work.status.completed"
    | "work.status.archived"
}

export function getProjectStatusConfig(status?: ProjectStatus): StatusConfig | null {
  switch (status) {
    case "in-progress":
      return { dot: "bg-orange-400", ping: true, labelKey: "work.status.in-progress" }
    case "completed":
      return { dot: "bg-green-400", ping: false, labelKey: "work.status.completed" }
    case "planning":
      return { dot: "bg-yellow-400", ping: false, labelKey: "work.status.planning" }
    case "archived":
      return { dot: "bg-zinc-500", ping: false, labelKey: "work.status.archived" }
    default:
      return null
  }
}
