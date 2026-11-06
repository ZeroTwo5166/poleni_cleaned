"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Diamond,
  Hexagon,
  Circle,
  MapPin,
  Code,
  Certificate,
} from "@phosphor-icons/react"
import CountUp from "@/components/shared/countUp"
import { useT } from "@/lib/i18n/useT"

const valueIcons = [Diamond, Hexagon, Circle]
const credentialIcons = [MapPin, Code, Certificate]
const statValues = [
  { value: 6, suffix: "+" },
  { value: 100, suffix: "%" },
  { value: 24, suffix: "h" },
  { value: 0, suffix: "" },
]

export default function AboutPage() {
  const t = useT()
  const values = t.about.values.map((v, i) => ({ ...v, icon: valueIcons[i] }))
  const credentials = t.about.credentials.map((text, i) => ({
    text,
    icon: credentialIcons[i],
  }))
  const stats = statValues.map((v, i) => ({
    ...v,
    label: t.about.stats[i].label,
  }))

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-page mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-24"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
            {t.about.eyebrow}
          </span>
          <h1 className="font-display font-medium tracking-tightest leading-[1.02] text-5xl md:text-7xl mt-5 text-ink">
            {t.about.headline1}
            <br />
            <span className="text-accent">{t.about.headlineAccent}</span>
          </h1>
          <p className="text-lg md:text-xl mt-6 leading-relaxed max-w-xl text-ink-soft">
            {t.about.subtext}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-28 pb-16 rule-bottom"
        >
          <div className="lg:col-span-7 flex flex-col gap-5">
            <span className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
              {t.about.founderEyebrow}
            </span>
            <h2 className="font-display font-medium tracking-tightest text-3xl md:text-4xl text-ink">
              {t.about.founderHeading}
            </h2>
            <div className="flex flex-col gap-4 text-base md:text-lg leading-relaxed text-ink-soft">
              {t.about.founderParas.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 panel p-8">
            <div className="w-16 h-16 flex items-center justify-center mb-6 font-display font-medium text-2xl bg-accent text-surface">
              P
            </div>
            <h3 className="font-semibold text-xl mb-1 text-ink">
              {t.about.founderCardTitle}
            </h3>
            <p className="text-sm mb-8 text-ink-faint">
              {t.about.founderCardRole}
            </p>

            <div className="flex flex-col gap-3">
              {credentials.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 py-3 rule-top"
                  >
                    <Icon
                      size={18}
                      weight="light"
                      className="shrink-0 text-accent"
                    />
                    <span className="text-sm font-medium text-ink-soft">
                      {item.text}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        <div className="mb-28">
          <h2 className="font-display font-medium tracking-tightest text-3xl mb-12 text-ink">
            {t.about.valuesHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 flex flex-col gap-4 bg-surface"
                >
                  <Icon size={28} weight="light" className="text-accent" />
                  <h3 className="text-xl font-semibold text-ink">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-faint">
                    {value.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-28 bg-line">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-8 text-center bg-surface"
            >
              <p className="tabular text-4xl font-semibold mb-2 tracking-tight text-ink">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="panel p-12 md:p-20 text-center"
        >
          <h2 className="font-display font-medium tracking-tightest text-4xl md:text-5xl mb-6 text-ink">
            {t.about.ctaHeading}
          </h2>
          <p className="mb-10 max-w-md mx-auto text-lg text-ink-soft">
            {t.about.ctaText}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-10 py-5 font-semibold transition-all duration-200 hover:opacity-85 hover:scale-[1.02] active:scale-[0.97] bg-accent text-surface"
            >
              {t.about.ctaPrimary}
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto px-10 py-5 font-semibold border transition-colors duration-200 border-line-strong text-ink"
            >
              {t.about.ctaSecondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
