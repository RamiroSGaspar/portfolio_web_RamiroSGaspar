"use client"

import { Separator } from "@/components/ui/separator"
import {
  BookOpen,
  Calendar,
  ExternalLink,
  ImageIcon,
  Linkedin,
  MapPin,
  Sparkles,
  Tag,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { type EventItem, getTagColor, translateTag } from "@/lib/portfolio-data"
import { ModalShell } from "./modal-shell"

type Props = { event: EventItem; onClose: () => void }

export function EventModal({ event, onClose }: Props) {
  const { t } = useLanguage()

  return (
    <ModalShell variant="purple" onClose={onClose}>
      <div className="p-4 sm:p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-purple-500/30 bg-zinc-900/50 flex items-center justify-center flex-shrink-0">
            <img
              src={event.eventLogo || "/placeholder.svg"}
              alt={event.eventName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium border ${getTagColor(
                    tag,
                  )}`}
                >
                  <Tag className="w-3 h-3" aria-hidden="true" />
                  {translateTag(tag, t)}
                </span>
              ))}
            </div>
            <h2 className="text-3xl font-bold text-zinc-100 text-pretty">{event.eventName}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {event.eventDate}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                {event.location}
              </span>
            </div>
          </div>
        </div>

        <Separator className="bg-purple-500/20" />

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-zinc-100">{t("modal.event.about")}</h3>
          <p className="text-zinc-300 leading-relaxed">{event.fullDescription}</p>
        </section>

        {event.photos.length > 0 && (
          <>
            <Separator className="bg-purple-500/20" />
            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-purple-400" aria-hidden="true" />
                {t("modal.event.gallery")}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {event.photos.map((photo, idx) => (
                  <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-purple-500/20">
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`${event.eventName} ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        <Separator className="bg-purple-500/20" />
        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-zinc-100">{t("modal.event.highlights")}</h3>
          <ul className="space-y-2">
            {event.highlights.map((h, idx) => (
              <li key={idx} className="flex items-start gap-3 text-zinc-300">
                <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>

        {event.socialPosts.length > 0 && (
          <>
            <Separator className="bg-purple-500/20" />
            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-purple-400" aria-hidden="true" />
                {t("modal.event.social")}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {event.socialPosts.map((post, idx) => (
                  <a
                    key={idx}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square rounded-lg overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                  >
                    <img
                      src={post.preview || "/placeholder.svg"}
                      alt={`${post.platform} post`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-medium flex items-center gap-2">
                        {t("modal.event.viewOn")} {post.platform}
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </>
        )}

        <Separator className="bg-purple-500/20" />
        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" aria-hidden="true" />
            {t("modal.event.learnings")}
          </h3>
          <div className="p-4 rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent">
            <p className="text-zinc-300 leading-relaxed">{event.learnings}</p>
          </div>
        </section>

        <Separator className="bg-purple-500/20" />
        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-purple-400" aria-hidden="true" />
            {t("modal.event.networking")}
          </h3>
          <div className="p-4 rounded-lg border border-purple-500/20 bg-zinc-900/30">
            <p className="text-zinc-300">{event.connections}</p>
          </div>
        </section>
      </div>
    </ModalShell>
  )
}
