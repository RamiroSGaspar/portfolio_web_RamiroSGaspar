"use client"

import { forwardRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Briefcase,
  Code2,
  GraduationCap,
  Mail,
  UserCircle2,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { AboutSection } from "./sections/about-section"
import { SkillsSection } from "./sections/skills-section"
import { ExperienceSection } from "./sections/experience-section"
import { EducationSection } from "./sections/education-section"
import { ContactSection } from "./sections/contact-section"

type SectionKey = "about" | "skills" | "experience" | "education" | "contact"

type Props = {
  initialSection?: SectionKey
  activeSection?: SectionKey
  onSectionChange?: (section: SectionKey) => void
}

export const InfoTabs = forwardRef<HTMLDivElement, Props>(function InfoTabs(
  { initialSection = "about", activeSection: controlled, onSectionChange },
  ref,
) {
  const { t } = useLanguage()
  const [internal, setInternal] = useState<SectionKey>(initialSection)
  const active = controlled ?? internal

  const handleChange = (key: SectionKey) => {
    if (onSectionChange) onSectionChange(key)
    else setInternal(key)
  }

  const sections: { key: SectionKey; label: string; icon: React.ReactNode; render: () => React.ReactNode }[] = [
    { key: "about", label: t("section.about"), icon: <UserCircle2 className="w-4 h-4" />, render: () => <AboutSection /> },
    { key: "skills", label: t("section.skills"), icon: <Code2 className="w-4 h-4" />, render: () => <SkillsSection /> },
    { key: "experience", label: t("section.experience"), icon: <Briefcase className="w-4 h-4" />, render: () => <ExperienceSection /> },
    { key: "education", label: t("section.education"), icon: <GraduationCap className="w-4 h-4" />, render: () => <EducationSection /> },
    { key: "contact", label: t("section.contact"), icon: <Mail className="w-4 h-4" />, render: () => <ContactSection /> },
  ]

  const current = sections.find((s) => s.key === active) ?? sections[0]

  return (
    <Card
      ref={ref}
      className="border-orange-500/15 backdrop-blur-xl bg-zinc-950/95 shadow-[0_0_25px_-12px_rgba(251,146,60,0.2)] hover:shadow-[0_0_35px_-12px_rgba(251,146,60,0.25)] transition-shadow duration-300"
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6" role="tablist" aria-label="Profile sections">
          {sections.map((s) => (
            <Button
              key={s.key}
              variant={active === s.key ? "default" : "outline"}
              size="sm"
              role="tab"
              aria-selected={active === s.key}
              onClick={() => handleChange(s.key)}
              className={
                active === s.key
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 shadow-[0_0_10px_rgba(251,146,60,0.3)] hover:shadow-[0_0_15px_rgba(251,146,60,0.4)] transition-all duration-300 border-0 text-white font-semibold text-xs px-3"
                  : "hover:bg-orange-500/10 border-orange-500/25 hover:border-orange-500/40 text-zinc-400 hover:text-orange-400 hover:shadow-[0_0_8px_rgba(251,146,60,0.15)] transition-all duration-300 text-xs px-3"
              }
            >
              {s.icon}
              <span className="ml-1.5">{s.label}</span>
            </Button>
          ))}
        </div>
        <div className="animate-in fade-in duration-300" role="tabpanel" key={current.key}>
          <h2 className="text-2xl font-bold mb-4 text-zinc-100">{current.label}</h2>
          <div className="text-zinc-200">{current.render()}</div>
        </div>
      </CardContent>
    </Card>
  )
})
