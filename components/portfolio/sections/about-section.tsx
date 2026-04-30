"use client"

import { useLanguage } from "@/lib/i18n"

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <div className="space-y-4 text-justify">
      <p className="text-muted-foreground leading-relaxed">
        {t("about.p1.prefix")}
        <span className="text-orange-500 font-semibold">{t("about.p1.field")}</span>
        {t("about.p1.body")}
      </p>
      <p className="text-muted-foreground leading-relaxed">{t("about.p2")}</p>
      <p className="text-muted-foreground leading-relaxed">{t("about.p3")}</p>
      <p className="text-muted-foreground leading-relaxed">{t("about.p4")}</p>
    </div>
  )
}
