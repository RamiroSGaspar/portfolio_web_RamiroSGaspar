"use client"

import { useRef, useState } from "react"
import { LanguageProvider } from "@/lib/i18n"
import type { EventItem, Experience, Project } from "@/lib/portfolio-data"
import { LanguageToggle } from "./language-toggle"
import { NeuralNetworkBackground } from "./neural-network-background"
import { ProfileCard } from "./profile-card"
import { InfoTabs } from "./info-tabs"
import { WorkSection } from "./work-section"
import { ProjectModal } from "./modals/project-modal"
import { EventModal } from "./modals/event-modal"
import { ExperienceModal } from "./modals/experience-modal"
import { ImageLightbox } from "./modals/image-lightbox"

type SectionKey = "about" | "skills" | "experience" | "education" | "contact"

function PortfolioInner() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<SectionKey>("about")
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null)
  const [activeExperience, setActiveExperience] = useState<Experience | null>(null)
  const [profileImageOpen, setProfileImageOpen] = useState(false)
  const [galleryImage, setGalleryImage] = useState<string | null>(null)

  const handleContactClick = () => {
    setActiveSection("contact")
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const closeAll = () => {
    setActiveProject(null)
    setActiveEvent(null)
    setActiveExperience(null)
  }

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
        <WorkSection
          onProjectClick={setActiveProject}
          onExperienceClick={setActiveExperience}
          onEventClick={setActiveEvent}
        />
      </main>

      {activeProject && <ProjectModal project={activeProject} onClose={closeAll} />}
      {activeEvent && <EventModal event={activeEvent} onClose={closeAll} />}
      {activeExperience && (
        <ExperienceModal
          experience={activeExperience}
          onClose={closeAll}
          onPhotoClick={setGalleryImage}
        />
      )}

      {profileImageOpen && (
        <ImageLightbox
          src="/profile.jpeg"
          alt="Ramiro Sebastian Gaspar"
          onClose={() => setProfileImageOpen(false)}
        />
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
