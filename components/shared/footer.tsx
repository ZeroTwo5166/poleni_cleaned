"use client"

import Link from "next/link"
import {
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react/dist/ssr"
import { useT } from "@/lib/i18n/useT"

const socials = [
  { label: "LinkedIn", href: "#", icon: LinkedinLogo },
  { label: "Instagram", href: "#", icon: InstagramLogo },
  { label: "Facebook", href: "#", icon: FacebookLogo },
]

export default function Footer() {
  const t = useT()

  const quickLinks = [
    { label: t.footer.quickLinks.services, href: "/services" },
    { label: t.footer.quickLinks.calculator, href: "/calculator" },
    { label: t.footer.quickLinks.about, href: "/about" },
    { label: t.footer.quickLinks.privacy, href: "/privatliv" },
    { label: t.footer.quickLinks.terms, href: "/handelsbetingelser" },
  ]

  return (
    <>
      <style>{`
        .footer-link { color: var(--text-muted); transition: color 0.2s; }
        .footer-link:hover { color: var(--text-primary); }
        .footer-social { color: var(--text-muted); border: 1px solid var(--border); transition: color 0.2s, border-color 0.2s; }
        .footer-social:hover { color: var(--text-primary); border-color: var(--border-strong); }
      `}</style>

      <footer className="mt-32 rule-top">
        <div className="max-w-page mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-12">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="font-display font-medium text-xl tracking-tightest w-fit text-ink"
              >
                Poleni
              </Link>

              <p className="text-sm leading-relaxed max-w-xs text-ink-faint">
                {t.footer.tagline}
              </p>

              <div className="flex items-center gap-2 mt-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="footer-social w-9 h-9 flex items-center justify-center"
                  >
                    <s.icon size={16} weight="light" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
                {t.footer.quickLinksHeading}
              </p>

              <nav className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="footer-link text-sm w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
                {t.footer.contactHeading}
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="mailto:kontakt@poleni.dk"
                  className="footer-link text-sm w-fit"
                >
                  kontakt@poleni.dk
                </a>
                <a href="tel:+4542333995" className="footer-link text-sm w-fit">
                  +45 42 33 39 95
                </a>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 w-fit border border-line">
                <div className="w-1.5 h-1.5 rounded-full animate-soft-pulse bg-accent" />
                <span className="text-xs text-ink-faint">
                  {t.footer.noLockIn}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 rule-top flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-ink-faint">
              © {new Date().getFullYear()} Poleni. {t.footer.rights}
            </p>

            <p className="text-xs text-ink-faint">
              CVR: 46361571 · København, Danmark
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
