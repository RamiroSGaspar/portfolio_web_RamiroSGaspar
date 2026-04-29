"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Calendar, ImageIcon, Tag } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { type BlogPost, getTagColor, translateTag } from "@/lib/portfolio-data"

type Props = {
  posts: BlogPost[]
  filter: string
  onFilterChange: (f: string) => void
  onPostClick: (post: BlogPost) => void
}

export function BlogSection({ posts, filter, onFilterChange, onPostClick }: Props) {
  const { t } = useLanguage()

  const filterButtons = [
    { label: t("blog.filter.all"), value: "all" },
    { label: t("blog.filter.projects"), value: "Proyecto" },
    { label: t("blog.filter.events"), value: "Evento" },
    { label: t("blog.filter.experiences"), value: "Experiencia" },
  ]

  const getFilterButtonClass = (value: string) => {
    if (filter === value) {
      switch (value) {
        case "all":
          return "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 border-0 text-white shadow-[0_0_10px_rgba(251,146,60,0.3)]"
        case "Proyecto":
          return "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 border-0 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]"
        case "Evento":
          return "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 border-0 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]"
        case "Experiencia":
          return "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 border-0 text-white shadow-[0_0_10px_rgba(34,197,94,0.3)]"
      }
    }
    return "hover:bg-orange-500/10 border-orange-500/25 hover:border-orange-500/40 text-zinc-400 hover:text-orange-400 hover:shadow-[0_0_8px_rgba(251,146,60,0.15)] transition-all duration-300"
  }

  const filtered = filter === "all" ? posts : posts.filter((p) => p.tags.includes(filter))

  return (
    <Card className="border-orange-500/15 backdrop-blur-xl bg-zinc-950/95 shadow-[0_0_25px_-12px_rgba(251,146,60,0.2)] hover:shadow-[0_0_35px_-12px_rgba(251,146,60,0.25)] transition-shadow duration-300">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.2)]">
            <BookOpen className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-100">{t("blog.title")}</h2>
            <p className="text-sm text-zinc-500">{t("blog.subtitle")}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filter posts">
          {filterButtons.map((btn) => (
            <Button
              key={btn.value}
              variant={filter === btn.value ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(btn.value)}
              className={`text-xs px-3 ${getFilterButtonClass(btn.value)}`}
            >
              <Tag className="w-3 h-3 mr-1" aria-hidden="true" />
              {btn.label}
            </Button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((post) => (
            <Card
              key={post.id}
              className="bg-zinc-900/50 border border-zinc-800 hover:border-orange-500/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(251,146,60,0.15)] cursor-pointer group p-0 gap-0"
              onClick={() => onPostClick(post)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onPostClick(post)
                }
              }}
            >
              <div className="aspect-video w-full bg-gradient-to-br from-orange-500/20 to-zinc-900 flex items-center justify-center overflow-hidden rounded-t-xl">
                {post.image ? (
                  <img src={post.image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-12 h-12 text-orange-500/40" aria-hidden="true" />
                )}
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Calendar className="w-3 h-3" aria-hidden="true" />
                  <span>{post.date}</span>
                </div>
                <h3 className="font-semibold text-zinc-200 group-hover:text-orange-400 transition-colors text-pretty">
                  {post.title}
                </h3>
                <p className="text-sm text-zinc-500 line-clamp-2">{post.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getTagColor(
                        tag,
                      )}`}
                    >
                      <Tag className="w-3 h-3" aria-hidden="true" />
                      {translateTag(tag, t)}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-orange-400 font-medium pt-2">
                  <span>{t("blog.readMore")}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </div>
              </div>
            </Card>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="mt-6 p-8 rounded-lg border border-orange-500/20 bg-orange-500/5 text-center">
            <p className="text-zinc-400">{t("blog.empty")}</p>
          </div>
        )}
        <div className="mt-6 p-4 rounded-lg border border-orange-500/20 bg-orange-500/5 text-center">
          <p className="text-sm text-zinc-400">{t("blog.note")}</p>
        </div>
      </CardContent>
    </Card>
  )
}
