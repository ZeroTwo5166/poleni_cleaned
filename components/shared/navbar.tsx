"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { Sun, Moon, List, X, ArrowUpRight } from "@phosphor-icons/react"
import { useTheme } from "./themeProvider"
import { useT } from "@/lib/i18n/useT"

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const t = useT()
  const isDark = theme === "dark"

  return (
    <button
      onClick={toggleTheme}
      aria-label={t.nav.themeToggle}
      className="w-9 h-9 flex items-center justify-center border border-line hover:border-line-strong text-ink-soft transition-colors duration-200"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          {isDark ? (
            <Sun size={16} weight="light" />
          ) : (
            <Moon size={16} weight="light" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const t = useT()

  const links = [
    { label: t.nav.services, href: "/services" },
    { label: t.nav.calculator, href: "/calculator" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ]

  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  function handleLogoClick(e: React.MouseEvent) {
    e.preventDefault()
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/")
    }
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center transition-colors duration-300"
        style={{
          background: scrolled ? "var(--navbar-bg)" : "transparent",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-accent"
          style={{ scaleX: progressScaleX }}
        />

        <div className="w-full max-w-page mx-auto px-6 flex items-center justify-between">
          <a
            href="/"
            onClick={handleLogoClick}
            className="font-display font-medium tracking-tightest text-lg text-ink"
          >
            Poleni
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 text-sm transition-colors duration-200 ${isActive ? "text-ink" : "text-ink-faint"}`}
                >
                  {link.label}
                  <span
                    className="absolute left-0 -bottom-0.5 h-px bg-accent transition-all duration-300"
                    style={{ width: isActive ? "100%" : "0%" }}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-accent text-surface transition-colors duration-200"
              >
                {t.nav.cta}
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </motion.div>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center justify-center w-9 h-9 text-ink"
              aria-label={t.nav.openMenu}
            >
              {menuOpen ? (
                <X size={20} weight="light" />
              ) : (
                <List size={20} weight="light" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col pt-[68px] px-6 md:hidden bg-surface"
          >
            <nav className="flex flex-col gap-1 mt-10">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rule-bottom"
                >
                  <Link
                    href={link.href}
                    className={`font-display block py-5 text-3xl tracking-tightest ${pathname === link.href ? "text-accent" : "text-ink"}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8"
            >
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-4 text-center font-medium bg-accent text-surface"
              >
                {t.nav.cta}
                <ArrowUpRight size={16} weight="bold" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
