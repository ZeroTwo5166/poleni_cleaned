"use client"

import Galaxy from "@/components/shared/galaxy"
import { useTheme } from "@/components/shared/themeProvider"

export default function GalaxyBackground() {
  const { theme } = useTheme()

  if (theme !== "dark") return null

  return (
    <div className="h-full w-full">
      <Galaxy
        mouseRepulsion
        mouseInteraction
        density={3}
        glowIntensity={0}
        saturation={0}
        hueShift={130}
        twinkleIntensity={0.3}
        rotationSpeed={0.1}
        repulsionStrength={2}
        autoCenterRepulsion={0}
        starSpeed={1}
        speed={1.2}
      />
    </div>
  )
}
