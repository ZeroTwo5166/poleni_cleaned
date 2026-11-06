"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import CountUp from "@/components/shared/countUp"
import { useT } from "@/lib/i18n/useT"

const statValues = [
  { value: 0, prefix: "", suffix: " kr." },
  { value: 0, prefix: "", suffix: " mdr." },
  { value: 24, prefix: "< ", suffix: "t" },
]

export default function Hero() {
  const t = useT()
  const carousel = t.hero.carousel
  const stats = statValues.map((v, i) => ({
    ...v,
    label: t.hero.stats[i].label,
  }))
  const [carouselIdx, setCarouselIdx] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const panelY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const fadeOut = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0])

  useEffect(() => {
    const t = setInterval(
      () => setCarouselIdx((i) => (i + 1) % carousel.length),
      1800,
    )
    return () => clearInterval(t)
  }, [carousel.length])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center pt-28 pb-20 px-6 overflow-hidden"
    >
      <motion.div
        style={{ opacity: fadeOut }}
        className="relative z-10 max-w-page mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        <motion.div style={{ y: textY }} className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-soft-pulse bg-accent" />
            <span className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
              {t.hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-medium tracking-tightest leading-[0.98]
                       text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-ink"
          >
            {t.hero.headline1}
            <br />
            {t.hero.headline2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg lg:text-xl max-w-md mt-6 leading-relaxed text-ink-soft"
          >
            {t.hero.subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start gap-3 mt-10"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="block px-7 py-3.5 font-medium text-sm text-center transition-opacity duration-200 hover:opacity-85 bg-accent text-surface"
              >
                {t.hero.ctaPrimary}
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/calculator"
                className="block px-7 py-3.5 font-medium text-sm text-center border transition-colors duration-200 border-line-strong text-ink"
              >
                {t.hero.ctaSecondary}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: panelY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="lg:col-span-5 panel p-7"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
              {t.hero.building}
            </span>
            <div className="h-6 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={carouselIdx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="tabular text-sm font-semibold text-accent"
                >
                  {carousel[carouselIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex items-baseline justify-between py-4 ${i !== 0 ? "rule-top" : ""}`}
              >
                <span className="text-sm text-ink-soft">{stat.label}</span>
                <span className="tabular text-2xl font-semibold text-ink">
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 rule-top flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 animate-soft-pulse bg-amber" />
            <p className="text-xs leading-relaxed text-ink-faint">
              {t.hero.promoText}
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div
        className="absolute bottom-8 left-6 lg:left-auto lg:right-6 flex items-center gap-2 cursor-pointer"
        onClick={() =>
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          })
        }
      >
        <span className="text-xs tracking-widest uppercase font-medium text-ink-faint">
          {t.hero.scrollDown}
        </span>
        <div className="w-8 h-px bg-line-strong" />
      </div>
    </section>
  )
}
