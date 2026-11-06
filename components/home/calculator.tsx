"use client"

import { useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Monitor,
  FileText,
  ShoppingCart,
  Lightning,
  Check,
} from "@phosphor-icons/react/dist/ssr"
import {
  WEBSITE_TYPES,
  ADDONS,
  type WebsiteTypeId,
  type AddonId,
} from "@/lib/pricing"
import DeviceMockup from "./deviceMockup"
import GrowthMeter from "./growthMeter"
import { fadeUp, fadeLeft, fadeRight, viewport } from "@/lib/animationVariants"
import { useT } from "@/lib/i18n/useT"

const TYPE_ICONS: Record<WebsiteTypeId, typeof Monitor> = {
  static: Monitor,
  dynamic: FileText,
  ecommerce: ShoppingCart,
  custom: Lightning,
}

export default function Calculator() {
  const t = useT()
  const [websiteType, setWebsiteType] = useState<WebsiteTypeId | null>(null)
  const [activeAddons, setActiveAddons] = useState<Set<AddonId>>(new Set())

  const selectedSite = websiteType
    ? (WEBSITE_TYPES.find((t) => t.id === websiteType) ?? null)
    : null

  const monthlyTotal = useMemo(
    () =>
      ADDONS.filter((a) => activeAddons.has(a.id)).reduce(
        (sum, a) => sum + a.price,
        0,
      ),
    [activeAddons],
  )

  const growthCount = activeAddons.size
  const growthPct = Math.round((growthCount / 3) * 100)
  const growthMessage = t.pricing.growthMessages[growthCount as 0 | 1 | 2 | 3]

  const toggleAddon = useCallback((id: AddonId) => {
    setActiveAddons((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const toggleWebsiteType = useCallback((id: WebsiteTypeId) => {
    setWebsiteType((prev) => (prev === id ? null : id))
  }, [])

  return (
    <section id="calculator" className="relative py-28 lg:py-36 px-6">
      <div className="max-w-page mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
            {t.calculator.eyebrow}
          </span>

          <h2 className="font-display font-medium tracking-tightest leading-[1.05] text-4xl md:text-5xl mt-5 text-ink">
            {t.calculator.headline1}{" "}
            <span className="text-accent">{t.calculator.headlineAccent}</span>
          </h2>

          <p className="text-lg mt-5 leading-relaxed text-ink-soft">
            {t.calculator.subtext}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="flex flex-col gap-6">
              <div className="panel p-6">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-sm font-semibold text-ink">
                    {t.calculator.step1Title}
                  </p>
                  <span className="text-xs text-ink-faint">
                    {t.calculator.optional}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {WEBSITE_TYPES.map((type) => {
                    const isActive = websiteType === type.id
                    const Icon = TYPE_ICONS[type.id]
                    const copy = t.pricing.websiteTypes[type.id]

                    return (
                      <button
                        key={type.id}
                        onClick={() => toggleWebsiteType(type.id)}
                        className="relative p-4 border text-left transition-colors duration-150"
                        style={{
                          borderColor: isActive
                            ? "var(--accent-line)"
                            : "var(--border)",
                          background: isActive
                            ? "var(--accent-soft)"
                            : "transparent",
                        }}
                      >
                        <span className="flex flex-col gap-2">
                          <Icon
                            size={20}
                            weight="light"
                            style={{
                              color: isActive
                                ? "var(--accent)"
                                : "var(--text-muted)",
                            }}
                          />

                          <span
                            className="text-sm font-semibold"
                            style={{
                              color: isActive
                                ? "var(--accent)"
                                : "var(--text-primary)",
                            }}
                          >
                            {copy.label}
                          </span>

                          <span className="text-xs text-ink-faint">
                            {copy.desc}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="panel p-6">
                <p className="text-sm font-semibold mb-5 text-ink">
                  {t.calculator.step2Title}
                </p>

                <div className="flex flex-col gap-3">
                  {ADDONS.map((addon) => {
                    const isActive = activeAddons.has(addon.id)
                    const copy = t.pricing.addons[addon.id]

                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className="flex items-center gap-3 p-4 border transition-colors duration-150"
                        style={{
                          borderColor: isActive
                            ? "var(--accent-line)"
                            : "var(--border)",
                          background: isActive
                            ? "var(--accent-soft)"
                            : "transparent",
                        }}
                      >
                        <div
                          className="shrink-0 w-5 h-5 border flex items-center justify-center"
                          style={{
                            borderColor: isActive
                              ? "var(--accent)"
                              : "var(--border-strong)",
                            backgroundColor: isActive
                              ? "var(--accent)"
                              : "transparent",
                          }}
                        >
                          {isActive && (
                            <Check
                              className="text-surface"
                              size={12}
                              weight="bold"
                            />
                          )}
                        </div>

                        <div className="flex-1 text-left">
                          <p className="text-sm font-semibold text-ink">
                            {copy.label}
                          </p>
                          <p className="text-xs text-ink-faint">{copy.desc}</p>
                        </div>

                        <span className="tabular shrink-0 text-sm font-semibold text-ink-soft">
                          {addon.price.toLocaleString("da-DK")}{" "}
                          {t.pricing.perMonth}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <GrowthMeter pct={growthPct} message={growthMessage} />
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <div className="panel p-6">
                <p className="text-xs uppercase tracking-widest font-semibold mb-5 text-ink-faint">
                  {t.calculator.estimateLabel}
                </p>

                <div className="flex justify-between mb-4 pb-4 rule-bottom">
                  <div>
                    <p className="text-sm text-ink-soft">
                      {t.calculator.onceLabel}
                    </p>
                    <p className="text-xs text-ink-faint">
                      {selectedSite
                        ? t.pricing.websiteTypes[selectedSite.id].label
                        : t.calculator.notIncluded}
                    </p>
                  </div>

                  <p className="tabular text-2xl font-semibold text-ink">
                    {!selectedSite
                      ? "—"
                      : selectedSite.price
                        ? `${selectedSite.price.toLocaleString("da-DK")} kr`
                        : t.calculator.contactUs}
                  </p>
                </div>

                <div className="flex justify-between mb-6">
                  <div>
                    <p className="text-sm text-ink-soft">
                      {t.calculator.monthlyLabel}
                    </p>
                  </div>

                  <p className="tabular text-2xl font-semibold text-ink">
                    {`${monthlyTotal.toLocaleString("da-DK")} ${t.pricing.perMonth}`}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="block w-full py-3.5 text-center font-semibold transition-opacity duration-200 hover:opacity-85 bg-accent text-surface"
                >
                  {t.calculator.getQuote}
                </Link>
              </div>

              <DeviceMockup
                websiteType={websiteType}
                activeAddons={activeAddons}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
