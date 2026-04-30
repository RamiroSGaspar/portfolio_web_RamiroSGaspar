"use client"

import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/lib/i18n"

type Skill = {
  name: string
  iconUrl?: string
  iconNode?: React.ReactNode
  invert?: boolean
}

const pillClass =
  "flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/50 border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300"

function SkillPill({ skill }: { skill: Skill }) {
  return (
    <div className={pillClass}>
      {skill.iconUrl ? (
        <img
          src={skill.iconUrl || "/placeholder.svg"}
          alt=""
          aria-hidden="true"
          className={`w-5 h-5 ${skill.invert ? "invert" : ""}`}
        />
      ) : (
        skill.iconNode
      )}
      <span className="text-sm font-medium text-zinc-200">{skill.name}</span>
    </div>
  )
}

const ExcelIcon = (
  <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M28 4H10C8.9 4 8 4.9 8 6V42C8 43.1 8.9 44 10 44H38C39.1 44 40 43.1 40 42V16L28 4Z" fill="#21A366" />
    <path d="M28 4V16H40L28 4Z" fill="#107C41" />
    <path d="M16 22L20 28L16 34H24L28 28L24 22H16Z" fill="white" />
    <path opacity="0.5" d="M16 22L20 28L16 34H24L28 28L24 22H16Z" fill="#107C41" />
  </svg>
)

const UbuntuIcon = (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="#DD4814" />
    <circle cx="5.5" cy="12" r="2.2" fill="white" />
    <circle cx="18.5" cy="12" r="2.2" fill="white" />
    <circle cx="12" cy="5.5" r="2.2" fill="white" />
    <circle cx="12" cy="12" r="1.8" fill="white" />
  </svg>
)

const languages: Skill[] = [
  { name: "Python", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "SQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "JavaScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
]

const analysis: Skill[] = [
  { name: "Pandas", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "NumPy", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
  { name: "Matplotlib", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg" },
  { name: "Jupyter", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
  { name: "Excel", iconNode: ExcelIcon },
]

const tools: Skill[] = [
  { name: "Git", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
  { name: "VSCode", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Ubuntu", iconNode: UbuntuIcon },
]

export function SkillsSection() {
  const { t } = useLanguage()
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-3">{t("skills.languages")}</h4>
        <div className="flex flex-wrap gap-3">
          {languages.map((s) => (
            <SkillPill key={s.name} skill={s} />
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h4 className="font-semibold mb-3">{t("skills.analysis")}</h4>
        <div className="flex flex-wrap gap-3">
          {analysis.map((s) => (
            <SkillPill key={s.name} skill={s} />
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h4 className="font-semibold mb-3">{t("skills.tools")}</h4>
        <div className="flex flex-wrap gap-3">
          {tools.map((s) => (
            <SkillPill key={s.name} skill={s} />
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h4 className="font-semibold mb-3">{t("skills.languagesSpoken")}</h4>
        <div className="flex flex-wrap gap-3">
          <div className={pillClass}>
            <span className="text-sm font-medium text-zinc-200">{t("skills.spanish")}</span>
            <span className="text-xs text-orange-400">· {t("skills.spanish.level")}</span>
          </div>
          <div className={pillClass}>
            <span className="text-sm font-medium text-zinc-200">{t("skills.english")}</span>
            <span className="text-xs text-orange-400">· {t("skills.english.level")}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
