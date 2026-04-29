"use client"

import { useLanguage } from "@/lib/i18n"

export function AboutSection() {
  const { t } = useLanguage()
  const hl = "text-orange-500 font-semibold"

  return (
    <div className="space-y-4 text-justify">
      <p className="text-muted-foreground leading-relaxed">
        {t("about.p1.prefix")}
        <span className={hl}>{t("about.p1.field")}</span>
        {t("about.p1.in")}
        <span className={hl}>{t("about.p1.uni")}</span>
        {t("about.p1.tools")}
        <span className={hl}>{t("about.p1.python")}</span>
        {t("about.p1.sep1")}
        <span className={hl}>{t("about.p1.sql")}</span>
        {t("about.p1.sep2")}
        <span className={hl}>{t("about.p1.pandas")}</span>
        {t("about.p1.body")}
      </p>
      <p className="text-muted-foreground leading-relaxed">{t("about.p2")}</p>
      <p className="text-muted-foreground leading-relaxed">{t("about.p3")}</p>
      <p className="text-muted-foreground leading-relaxed">{t("about.p4")}</p>
    </div>
  )
}
