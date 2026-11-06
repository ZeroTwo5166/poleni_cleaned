"use client"

import { motion } from "framer-motion"
import {
  ChatCircleText,
  Crosshair,
  ChartLineUp,
} from "@phosphor-icons/react/dist/ssr"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"
import { useT } from "@/lib/i18n/useT"

const stepIcons = [ChatCircleText, Crosshair, ChartLineUp]

function spotlightMove(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
}

export default function Process() {
  const t = useT()
  const steps = t.process.steps.map((s, i) => ({ ...s, icon: stepIcons[i] }))

  return (
    <section className="relative py-28 lg:py-36 px-6">
      <div className="max-w-page mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-2xl mb-16 lg:mb-20"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
            {t.process.eyebrow}
          </span>

          <h2 className="font-display font-medium tracking-tightest leading-[1.05] text-4xl md:text-5xl mt-5 text-ink">
            {t.process.headline}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                variants={fadeUp}
                whileHover="hover"
                onMouseMove={spotlightMove}
                className="spotlight p-8 lg:p-10 flex flex-col gap-4 bg-surface-raised"
              >
                <motion.div
                  variants={{ hover: { rotate: -8, scale: 1.1 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="w-11 h-11 flex items-center justify-center shrink-0"
                  style={{
                    background: "var(--accent-soft)",
                    border: "1px solid var(--accent-line)",
                  }}
                >
                  <Icon className="text-accent" size={20} weight="light" />
                </motion.div>
                <h3 className="text-lg font-semibold mt-3 text-ink">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-faint">
                  {step.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
