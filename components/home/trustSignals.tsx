"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import CountUp from "@/components/shared/countUp"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"
import { useT } from "@/lib/i18n/useT"

const statValues = [
  { value: 6, prefix: "", suffix: "+" },
  { value: 0, prefix: "", suffix: " kr." },
  { value: 24, prefix: "< ", suffix: "t" },
  { value: 0, prefix: "", suffix: " mdr." },
]

export default function TrustSignals() {
  const t = useT()
  const trustStats = statValues.map((v, i) => ({
    ...v,
    label: t.trustSignals.stats[i].label,
  }))

  return (
    <section className="relative py-28 lg:py-36 px-6">
      <div className="max-w-page mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
            {t.trustSignals.eyebrow}
          </span>

          <h2 className="font-display font-medium tracking-tightest text-4xl md:text-5xl mt-5 text-ink">
            {t.trustSignals.heading}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-px mb-16 bg-line"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {t.trustSignals.testimonials.map((tm) => (
            <motion.div
              key={tm.author}
              variants={fadeUp}
              className="p-7 flex flex-col justify-between gap-6 bg-surface"
            >
              <p className="text-sm leading-relaxed text-ink-soft">
                &quot;{tm.quote}&quot;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center shrink-0 bg-accent">
                  <span className="text-xs font-bold text-surface">
                    {tm.author
                      .split(" ")
                      .map((w) => w[0])
                      .join("")}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-ink">{tm.author}</p>
                  <p className="text-xs text-ink-faint">{tm.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px mb-16 bg-line"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {trustStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="p-6 text-center bg-surface"
            >
              <p className="tabular text-3xl font-semibold mb-1 tracking-tight text-ink">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center"
        >
          <p className="text-sm mb-6 text-ink-faint">
            {t.trustSignals.ctaText}
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold transition-all duration-200 hover:opacity-85 hover:scale-[1.02] active:scale-[0.97] bg-accent text-surface"
          >
            {t.trustSignals.ctaButton}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
