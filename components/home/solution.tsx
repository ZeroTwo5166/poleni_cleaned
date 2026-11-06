"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Monitor,
  Target,
  DeviceMobile,
  Check,
} from "@phosphor-icons/react/dist/ssr"
import type { Icon as PhosphorIcon } from "@phosphor-icons/react/dist/lib/types"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"
import { useT } from "@/lib/i18n/useT"

const icons = [Monitor, Target, DeviceMobile]

interface ServiceCopy {
  title: string
  desc: string
  detail: string
  features: string[]
  icon: PhosphorIcon
  href: string
}

function ServiceRow({
  service,
  index,
}: {
  service: ServiceCopy
  index: number
}) {
  const t = useT()
  const dir = index % 2 === 0 ? -1 : 1
  const Icon = service.icon

  return (
    <motion.div
      initial={{ x: dir * 48, rotate: dir * 1.5, opacity: 0 }}
      whileInView={{ x: 0, rotate: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover="hover"
      className={`group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 py-10 ${index === 0 ? "" : "rule-top"}`}
    >
      <div className="lg:col-span-4 flex items-start gap-4">
        <motion.span
          variants={{ hover: { rotate: 8, scale: 1.12 } }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="shrink-0 mt-1 inline-flex"
        >
          <Icon className="text-accent" size={28} weight="light" />
        </motion.span>
        <div>
          <h3 className="text-2xl font-semibold text-ink">{service.title}</h3>
          <p className="text-sm font-medium mt-1 text-accent">{service.desc}</p>
        </div>
      </div>

      <div className="lg:col-span-5">
        <p className="text-sm leading-relaxed text-ink-faint">
          {service.detail}
        </p>
      </div>

      <div className="lg:col-span-3 flex flex-col justify-between gap-4">
        <ul className="flex flex-col gap-2">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-ink-soft"
            >
              <Check
                size={14}
                weight="bold"
                className="shrink-0 mt-1 text-accent"
              />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href={service.href}
          className="text-sm font-semibold w-fit text-ink"
        >
          {t.solution.learnMore}
        </Link>
      </div>
    </motion.div>
  )
}

export default function Solution() {
  const t = useT()
  const services = t.solution.services.map((s, i) => ({
    ...s,
    icon: icons[i],
    href: "/services",
  }))

  return (
    <section className="relative py-28 lg:py-36 px-6">
      <div className="max-w-page mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-2xl mb-16 lg:mb-20"
        >
          <motion.span
            variants={fadeUp}
            className="block text-xs uppercase tracking-widest font-semibold text-ink-faint"
          >
            {t.solution.eyebrow}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display font-medium tracking-tightest leading-[1.05] text-4xl md:text-5xl mt-5 text-ink"
          >
            {t.solution.headline1}{" "}
            <span className="text-accent">{t.solution.headlineAccent}</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg mt-5 leading-relaxed text-ink-soft"
          >
            {t.solution.subtext}
          </motion.p>
        </motion.div>

        <div>
          {services.map((service, i) => (
            <ServiceRow key={service.title} service={service} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-10 rule-top flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <p className="text-base text-ink-soft">{t.solution.ctaQuestion}</p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium text-sm w-fit transition-all duration-200 hover:opacity-85 hover:scale-[1.02] active:scale-[0.97] bg-accent text-surface"
          >
            {t.solution.ctaButton}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
