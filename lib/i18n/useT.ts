"use client"

import { useLocale } from "@/components/shared/localeProvider"
import { translations } from "./translations"

/** Returns the full translation dictionary for the current locale. */
export function useT() {
  const { locale } = useLocale()
  return translations[locale]
}
