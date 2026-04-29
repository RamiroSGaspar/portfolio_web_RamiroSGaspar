import data from "@/data/portfolio.json"

export type BlogPost = {
  id: number
  title: string
  description: string
  date: string
  tags: string[]
  image?: string
}

export type ProjectTimelineItem = {
  phase: string
  description: string
  status: "completed" | "in-progress" | "pending"
  date: string
}

export type Project = {
  id: number
  title: string
  description: string
  fullDescription: string
  tags: string[]
  technologies: string[]
  status: string
  startDate: string
  endDate: string | null
  githubUrl?: string | null
  demoUrl?: string | null
  images: string[]
  features: string[]
  timeline: ProjectTimelineItem[]
  challenges: {
    challenge: string
    challengeDate: string
    solution: string
    solutionDate: string
  }[]
  learnings: string[]
  futureUpdates: string
  updateHistory: { version: string; date: string; changes: string[] }[]
}

export type EventItem = {
  id: number
  title: string
  tags: string[]
  eventName: string
  eventLogo: string
  eventDate: string
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
  duration: string
  image: string
  description: string
  responsibilities: string[]
  achievements: string[]
  skills: string[]
  gallery?: string[]
}

export const blogPosts = data.blogPosts as BlogPost[]
export const projects = data.projects as unknown as Project[]
export const events = data.events as unknown as EventItem[]
export const experiences = data.experiences as unknown as Experience[]

export function getTagColor(tag: string): string {
  switch (tag) {
    case "Proyecto":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
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
