"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Monitor,
  FileText,
  ShoppingCart,
  Lightning,
  Megaphone,
} from "@phosphor-icons/react/dist/ssr"
import {
  WEBSITE_TYPES,
  ADDONS,
  type WebsiteTypeId,
  type AddonId,
} from "@/lib/pricing"
import { useT } from "@/lib/i18n/useT"

interface Props {
  websiteType: WebsiteTypeId | null
  activeAddons: Set<AddonId>
}

const TYPE_ICONS: Record<WebsiteTypeId, typeof Monitor> = {
  static: Monitor,
  dynamic: FileText,
  ecommerce: ShoppingCart,
  custom: Lightning,
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

export default function DeviceMockup({ websiteType, activeAddons }: Props) {
  const t = useT()
  const site = websiteType
    ? (WEBSITE_TYPES.find((wt) => wt.id === websiteType) ?? null)
    : null
  const activeAddonsList = ADDONS.filter((a) => activeAddons.has(a.id))
  const SiteIcon = site ? TYPE_ICONS[site.id] : Megaphone
  const growthPct = Math.round((activeAddons.size / 3) * 100)

  const renderPreview = () => {
    switch (websiteType) {
      case "static":
        return (
          <div className="flex flex-col gap-2">
            <motion.div
              variants={itemVariants}
              className="h-14 flex items-center justify-center bg-line"
            >
              <div className="w-6 h-6 rounded-full bg-accent" />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="h-2 w-3/4 bg-line-strong"
            />
            <motion.div
              variants={itemVariants}
              className="h-1.5 w-full bg-line"
            />
            <motion.div
              variants={itemVariants}
              className="h-1.5 w-5/6 bg-line"
            />
            <motion.div
              variants={itemVariants}
              className="h-5 w-20 mt-1 bg-accent"
            />
          </div>
        )

      case "dynamic":
        return (
          <div className="flex flex-col gap-2">
            <motion.div
              variants={itemVariants}
              className="h-10 flex items-center px-2 justify-between bg-line"
            >
              <div className="h-2 w-1/3 bg-line-strong" />
              <div className="h-4 w-10 bg-accent" />
            </motion.div>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1].map((i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-1.5 flex flex-col gap-1.5 border border-line"
                >
                  <div className="h-8 w-full bg-line" />
                  <div className="h-1.5 w-full bg-line-strong" />
                  <div className="h-1.5 w-2/3 bg-line" />
                </motion.div>
              ))}
            </div>
            <motion.div
              variants={itemVariants}
              className="h-1.5 w-1/3 self-center mt-1 bg-line"
            />
          </div>
        )

      case "ecommerce":
        return (
          <div className="flex flex-col gap-2">
            <motion.div
              variants={itemVariants}
              className="h-6 flex items-center px-2.5 bg-line"
            >
              <div className="w-1.5 h-1.5 rounded-full mr-2 bg-line-strong" />
              <div className="h-1.5 w-1/3 bg-line-strong" />
            </motion.div>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-1.5 flex flex-col gap-1 border border-line"
                >
                  <div className="h-8 w-full bg-line" />
                  <div className="h-1.5 w-2/3 bg-line-strong" />
                  <div className="h-1.5 w-1/3 bg-accent" />
                </motion.div>
              ))}
            </div>
          </div>
        )

      case "custom":
        return (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 grid-rows-2 gap-2 h-24">
              <motion.div
                variants={itemVariants}
                className="col-span-2 row-span-2 border border-line-strong"
                style={{ background: "var(--accent-soft)" }}
              />
              <motion.div className="bg-line" variants={itemVariants} />
              <motion.div
                variants={itemVariants}
                style={{ background: "var(--amber-soft)" }}
              />
            </div>
            <motion.div
              variants={itemVariants}
              className="h-1.5 w-1/2 bg-line-strong"
            />
            <motion.div
              variants={itemVariants}
              className="h-1.5 w-1/3 bg-line"
            />
          </div>
        )

      default:
        return (
          <div className="flex flex-col gap-2">
            <motion.div
              variants={itemVariants}
              className="p-2 flex items-end justify-between gap-1.5 h-16 border border-line"
            >
              {[40, 70, 50, 90, 65].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05 * i,
                    ease: "easeOut",
                  }}
                  className="flex-1 bg-accent"
                />
              ))}
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="h-1.5 w-2/3 bg-line-strong"
            />
            <motion.div
              variants={itemVariants}
              className="h-1.5 w-1/2 bg-line"
            />
          </div>
        )
    }
  }

  return (
    <div className="panel p-6">
      <p className="text-xs uppercase tracking-widest font-semibold mb-6 text-ink-faint">
        {t.deviceMockup.livePreview}
      </p>

      <div className="mx-auto w-full max-w-[300px]">
        <div className="relative rounded-[2rem] border-[8px] overflow-hidden bg-surface-raised border-line-strong">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full z-10 bg-surface-raised" />

          <div className="h-[550px] overflow-hidden relative pt-10 bg-surface">
            <div className="flex items-center justify-between px-4 py-3 rule-bottom">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-[11px] font-medium tracking-tightest text-ink">
                  Poleni
                </span>
              </div>
              <div className="flex gap-2">
                {t.deviceMockup.navLabels.map((l) => (
                  <span key={l} className="text-[9px] text-ink-faint">
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-4 py-4">
              <div className="flex items-center gap-1.5 mb-2.5">
                <SiteIcon className="text-accent" size={14} weight="light" />
                <span className="text-[11px] font-semibold text-ink">
                  {site
                    ? t.pricing.websiteTypes[site.id].label
                    : t.deviceMockup.marketingOnly}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={websiteType ?? "none"}
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                >
                  {renderPreview()}
                </motion.div>
              </AnimatePresence>

              <div className="mt-3 w-full py-2 bg-accent">
                <p className="text-[11px] text-center font-semibold text-surface">
                  {t.deviceMockup.cta}
                </p>
              </div>
            </div>

            <div className="mx-4 h-px mb-3 bg-line" />

            <div className="px-4">
              <p className="text-[9px] uppercase tracking-wider font-medium mb-2 text-ink-faint">
                {t.deviceMockup.activeServices}
              </p>
              <div className="flex flex-col gap-1.5">
                <AnimatePresence>
                  {activeAddonsList.length === 0 ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[11px] text-ink-faint"
                    >
                      {t.deviceMockup.noServicesYet}
                    </motion.p>
                  ) : (
                    activeAddonsList.map((addon) => (
                      <motion.div
                        key={addon.id}
                        initial={{ opacity: 0, x: -8, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        exit={{ opacity: 0, x: -8, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center justify-between px-3 py-2 border border-line"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span className="text-[11px] font-medium text-ink-soft">
                            {t.pricing.addons[addon.id].label}
                          </span>
                        </div>
                        <span className="tabular text-[10px] font-semibold text-ink-faint">
                          {addon.price.toLocaleString("da-DK")} kr
                        </span>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="px-4 mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase tracking-wider font-medium text-ink-faint">
                  {t.deviceMockup.growthPotential}
                </span>
                <span className="tabular text-[11px] font-semibold text-ink">
                  {growthPct}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden bg-line">
                <motion.div
                  className="h-full bg-accent"
                  animate={{ width: `${growthPct}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center py-3 bg-surface-raised">
            <div className="w-16 h-1 rounded-full bg-line-strong" />
          </div>
        </div>
      </div>
    </div>
  )
}
