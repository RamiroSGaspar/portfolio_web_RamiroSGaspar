"use client"

import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/lib/i18n"

export function EducationSection() {
  const { t } = useLanguage()
  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-start">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
          <img src="/ucasal-logo.jpg" alt="UCASAL" className="w-full h-full object-contain p-1" />
        </div>
        <div>
          <h4 className="font-semibold">{t("edu.ucasal.title")}</h4>
          <p className="text-sm text-muted-foreground">{t("edu.ucasal.org")}</p>
          <p className="text-xs text-muted-foreground">{t("edu.ucasal.status")}</p>
        </div>
      </div>
      <Separator />
      <div className="flex gap-4 items-start">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white">
          <img
            src="/tec3-logo.jpeg"
            alt="Escuela Técnica N° 3139"
            className="w-full h-full object-contain p-1"
          />
        </div>
        <div>
          <h4 className="font-semibold">{t("edu.tec3.title")}</h4>
          <p className="text-sm text-muted-foreground">{t("edu.tec3.org")}</p>
          <p className="text-xs text-muted-foreground">{t("edu.tec3.status")}</p>
        </div>
      </div>
    </div>
  )
}
