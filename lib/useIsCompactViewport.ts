"use client"

import { useEffect, useState } from "react"

/**
 * True on narrow (<1024px) or short (<820px) viewports — laptops with
 * limited browser chrome, tablets, and phones. Used to fall back from
 * pinned/scroll-jacked layouts to normal document flow, since the pin
 * technique assumes a section's content fits within one viewport height.
 */
export function useIsCompactViewport() {
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px), (max-height: 820px)")
    const update = () => setIsCompact(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])

  return isCompact
}
