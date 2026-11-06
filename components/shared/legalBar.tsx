"use client"

import { Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale, type Locale } from "./localeProvider"
import { useT } from "@/lib/i18n/useT"

const languages: { code: Locale; label: string; name: string }[] = [
  { code: "da", label: "DA", name: "Dansk" },
  { code: "en", label: "EN", name: "English" },
]

export default function LegalBar() {
  const pathname = usePathname()
  const { locale, setLocale } = useLocale()
  const t = useT()

  // Hidden on mobile; the footer already links to these pages.
  const legalLinks = [
    { href: "/handelsbetingelser", label: t.legalBar.terms },
    { href: "/privatliv", label: t.legalBar.privacy },
  ]

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <div className="flex items-center gap-0.5 px-1 py-1 bg-surface-raised border border-line">
        {legalLinks.map(({ href, label }) => {
          const isActive = pathname === href
          return (
            <Fragment key={href}>
              <Link
                href={href}
                className="hidden sm:inline-block px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap"
                style={{
                  color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                  background: isActive ? "var(--bg-hover)" : "transparent",
                }}
              >
                {label}
              </Link>
              <span className="hidden sm:block w-px h-3 bg-line" />
            </Fragment>
          )
        })}

        {/* The active language gets a filled chip because a color change
            alone was too low-contrast in light mode. */}
        <div className="flex items-center gap-0.5 px-0.5">
          {languages.map(({ code, label, name }) => (
            <button
              key={code}
              onClick={() => setLocale(code)}
              aria-pressed={locale === code}
              aria-label={name}
              className="px-2 py-1.5 text-xs font-semibold transition-colors duration-150"
              style={{
                color: locale === code ? "var(--bg)" : "var(--text-muted)",
                background: locale === code ? "var(--accent)" : "transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
