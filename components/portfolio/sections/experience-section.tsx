"use client"

import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/lib/i18n"

export function ExperienceSection() {
  const { t } = useLanguage()
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-start gap-4">
          <img
            src="/bewise-logo.jpeg"
            alt="Bewise"
            className="w-12 h-12 rounded-lg object-cover border border-orange-500/30"
          />
          <div className="flex-1">
            <h4 className="font-semibold">{t("experience.bewise.role")}</h4>
            <p className="text-sm text-muted-foreground">{t("experience.bewise.company")}</p>
            <p className="text-xs text-muted-foreground">{t("experience.bewise.dates")}</p>
          </div>
        </div>
        <ul className="space-y-1 text-sm text-muted-foreground ml-4">
          <li>• {t("experience.bewise.b1")}</li>
          <li>• {t("experience.bewise.b2")}</li>
          <li>• {t("experience.bewise.b3")}</li>
        </ul>
      </div>
      <Separator />
      <div className="space-y-3">
        <div className="flex items-start gap-4">
          <img
            src="/museo-guemes.jpeg"
            alt="Museo Güemes"
            className="w-12 h-12 rounded-lg object-cover border border-orange-500/30"
          />
          <div className="flex-1">
            <h4 className="font-semibold">{t("experience.museo.role")}</h4>
            <p className="text-sm text-muted-foreground">{t("experience.museo.company")}</p>
            <p className="text-xs text-muted-foreground">{t("experience.museo.dates")}</p>
          </div>
        </div>
        <ul className="space-y-1 text-sm text-muted-foreground ml-4">
          <li>• {t("experience.museo.b1")}</li>
          <li>• {t("experience.museo.b2")}</li>
          <li>• {t("experience.museo.b3")}</li>
        </ul>
      </div>
    </div>
  )
}
