"use client"

import { useMemo, useRef, useState } from "react"
import { LanguageProvider } from "@/lib/i18n"
import { type BlogPost, blogPosts, events, experiences, projects } from "@/lib/portfolio-data"
import { LanguageToggle } from "./language-toggle"
import { NeuralNetworkBackground } from "./neural-network-background"
import { ProfileCard } from "./profile-card"
import { InfoTabs } from "./info-tabs"
import { BlogSection } from "./blog-section"
import { ProjectModal } from "./modals/project-modal"
import { EventModal } from "./modals/event-modal"
import { ExperienceModal } from "./modals/experience-modal"
import { ImageLightbox } from "./modals/image-lightbox"

type SectionKey = "about" | "skills" | "experience" | "education" | "contact"

function PortfolioInner() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<SectionKey>("about")
  const [blogFilter, setBlogFilter] = useState("all")
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const [selectedExperienceId, setSelectedExperienceId] = useState<number | null>(null)
  const [profileImageOpen, setProfileImageOpen] = useState(false)
  const [galleryImage, setGalleryImage] = useState<string | null>(null)

  const handleContactClick = () => {
    setActiveSection("contact")
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const handlePostClick = (post: BlogPost) => {
    if (post.tags.includes("Proyecto")) {
      const project = projects.find((p) => p.id === post.id)
      if (project) setSelectedProjectId(project.id)
    } else if (post.tags.includes("Evento")) {
      const event = events.find((e) => e.id === post.id)
      if (event) setSelectedEventId(event.id)
    } else if (post.tags.includes("Experiencia")) {
      const exp = experiences.find((e) => e.id === post.id)
      if (exp) setSelectedExperienceId(exp.id)
    }
  }

  const closeModal = () => {
    setSelectedProjectId(null)
    setSelectedEventId(null)
    setSelectedExperienceId(null)
  }

  const currentProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) ?? null,
    [selectedProjectId],
  )
  const currentEvent = useMemo(
    () => events.find((e) => e.id === selectedEventId) ?? null,
    [selectedEventId],
  )
  const currentExperience = useMemo(
    () => experiences.find((e) => e.id === selectedExperienceId) ?? null,
    [selectedExperienceId],
  )

  return (
    <div className="dark min-h-screen bg-black relative overflow-x-hidden">
      <NeuralNetworkBackground />
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px]" />
      </div>

      <LanguageToggle />

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-3xl flex flex-col gap-6">
        <ProfileCard
          onContactClick={handleContactClick}
          onProfileImageClick={() => setProfileImageOpen(true)}
        />
        <InfoTabs
          ref={contentRef}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <BlogSection
          posts={blogPosts}
          filter={blogFilter}
          onFilterChange={setBlogFilter}
          onPostClick={handlePostClick}
        />
      </main>

      {currentProject && <ProjectModal project={currentProject} onClose={closeModal} />}
      {currentEvent && <EventModal event={currentEvent} onClose={closeModal} />}
      {currentExperience && (
        <ExperienceModal
          experience={currentExperience}
          onClose={closeModal}
          onPhotoClick={setGalleryImage}
        />
      )}

      {profileImageOpen && (
        <ImageLightbox src="/profile.jpeg" alt="Ramiro Sebastian Gaspar" onClose={() => setProfileImageOpen(false)} />
      )}
      {galleryImage && <ImageLightbox src={galleryImage} onClose={() => setGalleryImage(null)} />}
    </div>
  )
}

export function Portfolio() {
  return (
    <LanguageProvider>
      <PortfolioInner />
    </LanguageProvider>
  )
}
