"use client"

import { Separator } from "@/components/ui/separator"
import { Award, Briefcase, Calendar, CheckCircle2, ImageIcon, MapPin, TrendingUp } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import type { Experience } from "@/lib/portfolio-data"
import { ModalShell } from "./modal-shell"

type Props = {
  experience: Experience
  onClose: () => void
  onPhotoClick: (src: string) => void
}

export function ExperienceModal({ experience, onClose, onPhotoClick }: Props) {
  const { t } = useLanguage()

  return (
    <ModalShell variant="green" onClose={onClose}>
      <div className="p-4 sm:p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
          <img
            src={experience.image || "/placeholder.svg"}
            alt={experience.company}
            className="w-24 h-24 rounded-lg object-cover border-2 border-green-500/30"
          />
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium border border-green-500/40 bg-green-500/10 text-green-400">
                <Briefcase className="w-3 h-3" aria-hidden="true" />
                {experience.type}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-zinc-100 text-pretty">{experience.title}</h2>
            <div className="space-y-1 text-zinc-400">
              <p className="text-lg font-medium text-zinc-300">{experience.company}</p>
              <p className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                {experience.location}
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {experience.startDate} - {experience.endDate} · {experience.duration}
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-green-500/20" />

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-zinc-100">{t("modal.exp.description")}</h3>
          <p className="text-zinc-300 leading-relaxed">{experience.description}</p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" aria-hidden="true" />
            {t("modal.exp.responsibilities")}
          </h3>
          <ul className="space-y-2">
            {experience.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2 text-zinc-300">
                <span className="text-green-400 mt-1" aria-hidden="true">
                  •
                </span>
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </section>

        {experience.achievements && experience.achievements.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" aria-hidden="true" />
              {t("modal.exp.achievements")}
            </h3>
            <ul className="space-y-2">
              {experience.achievements.map((achievement, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-zinc-300 p-3 bg-green-500/5 border border-green-500/20 rounded-lg"
                >
                  <Award className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-zinc-100">{t("modal.exp.skills")}</h3>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg text-sm font-medium text-green-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {experience.gallery && experience.gallery.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-orange-400" aria-hidden="true" />
              {t("modal.exp.gallery")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {experience.gallery.map((photo, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onPhotoClick(photo)}
                  className="aspect-video overflow-hidden rounded-lg border border-zinc-700 hover:border-orange-500/50 transition-all duration-300 cursor-pointer max-h-48"
                  aria-label={`Open photo ${idx + 1}`}
                >
                  <img
                    src={photo || "/placeholder.svg"}
                    alt=""
                    className="w-full h-full object-contain bg-zinc-900/50 hover:scale-105 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </ModalShell>
  )
}
