import data from "@/data/portfolio.json"

export type ProjectStatus = "planning" | "in-progress" | "completed" | "archived"

export type ProjectTimelineItem = {
  phase: string
  description: string
  status: "completed" | "in-progress" | "pending"
  date: string
}

/**
 * Project shape with most fields optional. The card and the modal render only
 * the sections that have data — load what you have, skip the rest.
 */
export type Project = {
  id: number
  title: string
  description: string
  tags: string[]
  fullDescription?: string
  technologies?: string[]
  status?: ProjectStatus
  dateLabel?: string
  dateIso?: string
  startDate?: string
  endDate?: string | null
  githubUrl?: string | null
  demoUrl?: string | null
  images?: string[]
  features?: string[]
  timeline?: ProjectTimelineItem[]
  challenges?: {
    challenge: string
    challengeDate: string
    solution: string
    solutionDate: string
  }[]
  learnings?: string[]
  futureUpdates?: string | string[]
  updateHistory?: { version: string; date: string; changes: string[] }[]
}

export type EventItem = {
  id: number
  title: string
  tags: string[]
  eventName: string
  eventLogo: string
  eventDate: string
  dateIso?: string
  location: string
  fullDescription: string
  highlights: string[]
  photos: string[]
  socialPosts: { platform: string; url: string; preview: string }[]
  learnings: string
  connections: string
}

export type Experience = {
  id: number
  title: string
  company: string
  type: string
  location: string
  workMode?: string
  startDate: string
  endDate: string
  dateIso?: string
  duration: string
  image: string
  description: string
  shortDescription?: string
  responsibilities: string[]
  achievements: string[]
  skills: string[]
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
