"use client"

import { motion } from "framer-motion"
import { LockKey, Question, TrendDown } from "@phosphor-icons/react/dist/ssr"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"
import { useT } from "@/lib/i18n/useT"

const icons = [LockKey, Question, TrendDown]

export default function Problem() {
  const t = useT()
  const painPoints = t.problem.painPoints.map((p, i) => ({
    ...p,
    icon: icons[i],
  }))

  return (
    <section className="relative py-28 lg:py-36 px-6">
      <div className="max-w-page mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl mb-16 lg:mb-20"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
            {t.problem.eyebrow}
          </span>

          <h2 className="font-display font-medium tracking-tightest leading-[1.05] text-4xl md:text-5xl lg:text-6xl mt-5">
            <span className="text-ink">{t.problem.headline1}</span>
            <br />
            <span style={{ color: "var(--danger)" }}>
              {t.problem.headline2}
            </span>
          </h2>

          <p className="text-lg mt-6 leading-relaxed text-ink-soft">
            {t.problem.lead}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-3xl"
        >
          {painPoints.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover="hover"
                className={`flex items-start gap-6 py-8 pl-4 -ml-4 ${i !== 0 ? "rule-top" : ""}`}
              >
                <motion.span
                  variants={{ hover: { color: "var(--danger)" } }}
                  className="tabular text-sm shrink-0 pt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  0{i + 1}
                </motion.span>
                <motion.span
                  variants={{ hover: { x: [0, -3, 3, -2, 0] } }}
                  transition={{ duration: 0.4 }}
                  className="shrink-0 mt-0.5 inline-flex"
                >
                  <Icon
                    size={22}
                    weight="light"
                    style={{ color: "var(--danger)" }}
                  />
                </motion.span>
                <div>
                  <h3 className="text-lg font-semibold mb-1.5 text-ink">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed max-w-lg text-ink-faint">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-16 pt-8 rule-top flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <p className="text-base font-semibold shrink-0 text-ink">
            {t.problem.bottomLabel}
          </p>

          <div className="flex items-center gap-2 text-sm flex-wrap text-ink-faint">
            {t.problem.tags.map((label, i) => (
              <span key={label} className="flex items-center gap-2">
                {i !== 0 && <span className="w-3 h-px bg-line-strong" />}
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
