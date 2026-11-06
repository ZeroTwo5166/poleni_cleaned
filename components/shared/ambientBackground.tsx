"use client"

import GalaxyBackground from "./galaxyBackground"
import RisingParticles from "./risingParticles"
import { useTheme } from "./themeProvider"

// Dark theme: WebGL star field. Light theme: soft glow plus rising particles.
export default function AmbientBackground() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="grain" style={{ position: "fixed", inset: 0, zIndex: 0 }}>
      {isDark ? (
        <GalaxyBackground />
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(1100px 560px at 50% -8%, var(--accent-soft), transparent 62%)",
            }}
          />
          <RisingParticles />
        </>
      )}
    </div>
  )
}
