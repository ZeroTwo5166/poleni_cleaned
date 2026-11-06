"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useT } from "@/lib/i18n/useT"

export default function Preloader() {
  const t = useT()
  const words = t.preloader.words
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    if (!isHome) return
    if (index < words.length - 1) {
      const timer = setTimeout(() => setIndex((i) => i + 1), 450)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => setVisible(false), 500)
    return () => clearTimeout(timer)
  }, [index, isHome, words.length])

  if (!isHome || !visible) return null

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-0 z-[9999] bg-[#0a0b09] flex items-center justify-center"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={words[index]}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="font-display text-[#f3f4ef] font-medium text-6xl md:text-8xl lg:text-9xl
                       tracking-tightest select-none"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
