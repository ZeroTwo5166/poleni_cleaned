"use client"

import { createContext, useContext, useEffect, useState } from "react"

export type Locale = "da" | "en"

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType>({
  locale: "da",
  setLocale: () => {},
})

export function useLocale() {
  return useContext(LocaleContext)
}

export default function LocaleProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [locale, setLocaleState] = useState<Locale>("da")

  useEffect(() => {
    const stored = localStorage.getItem("poleni-locale") as Locale | null
    if (stored) {
      setLocaleState(stored)
      document.documentElement.lang = stored
    }
  }, [])

  function setLocale(next: Locale) {
    setLocaleState(next)
    localStorage.setItem("poleni-locale", next)
    document.documentElement.lang = next
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}
