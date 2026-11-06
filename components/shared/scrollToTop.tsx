"use client"

import { useEffect } from "react"

export default function ScrollToTop() {
  useEffect(() => {
    // Always start at the top instead of the browser's restored position.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [])

  return null
}
