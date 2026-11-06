"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useT } from "@/lib/i18n/useT"

interface Props {
  pct: number
  message: string
}

export default function GrowthMeter({ pct, message }: Props) {
  const t = useT()
  return (
    <div className="panel p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-ink">
          {t.calculator.growthPotential}
        </p>
        <motion.span
          key={pct}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="tabular text-2xl font-semibold text-ink"
        >
          {pct}%
        </motion.span>
      </div>

      <div className="h-1.5 overflow-hidden mb-3 bg-line">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-ink-soft"
        >
          {message}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
