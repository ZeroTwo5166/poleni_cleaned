"use client"

import { useRef, useCallback } from "react"

/**
 * Wires a mouse-tracking radial glow (see .spotlight in globals.css).
 * Spread the returned props onto the element carrying the "spotlight" class.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
  }, [])

  return { ref, onMouseMove }
}
