"use client"

import { useEffect, useRef } from "react"

interface Particle {
  baseX: number
  y: number
  r: number
  speed: number
  swayAmp: number
  swaySpeed: number
  swayPhase: number
  hue: "accent" | "amber"
  opacity: number
  ox: number
  oy: number
}

// Light-theme background: soft particles that rise, sway, and move away
// from the cursor.
export default function RisingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    const ctxEl = canvasEl?.getContext("2d")
    if (!canvasEl || !ctxEl) return
    const canvas: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = ctxEl

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const REPEL_RADIUS = 150
    const REPEL_STRENGTH = 46

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let mouseX = -9999
    let mouseY = -9999
    let rafId = 0
    let accentRgb = "70,180,126"
    let amberRgb = "224,170,76"

    // Resolves a CSS color variable to "r,g,b" so it can be used in rgba().
    function readColor(varName: string, fallback: string) {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim()
      if (!raw) return fallback
      const probe = document.createElement("div")
      probe.style.color = raw
      document.body.appendChild(probe)
      const computed = getComputedStyle(probe).color
      document.body.removeChild(probe)
      const match = computed.match(/\d+/g)
      return match && match.length >= 3
        ? `${match[0]},${match[1]},${match[2]}`
        : fallback
    }

    function makeParticle(spawnAnywhere: boolean): Particle {
      const r = 2 + Math.random() * 11
      // Bigger = further away: slower, fainter, more sway.
      const depth = r / 13
      return {
        baseX: Math.random() * width,
        y: spawnAnywhere ? Math.random() * height : height + r * 2,
        r,
        speed: 0.12 + (1 - depth) * 0.55,
        swayAmp: 14 + depth * 34,
        swaySpeed: 0.0004 + Math.random() * 0.0006,
        swayPhase: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.12 ? "amber" : "accent",
        opacity: 0.12 + (1 - depth) * 0.34,
        ox: 0,
        oy: 0,
      }
    }

    function buildParticles() {
      width = window.innerWidth
      height = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.max(
        34,
        Math.min(70, Math.round((width * height) / 17000)),
      )
      particles = Array.from({ length: count }, () => makeParticle(true))
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        if (!reduceMotion) {
          p.y -= p.speed
          if (p.y < -p.r * 2) {
            Object.assign(p, makeParticle(false))
          }
        }

        const sway = reduceMotion
          ? 0
          : Math.sin(t * p.swaySpeed + p.swayPhase) * p.swayAmp
        const x = p.baseX + sway

        // Ease the cursor push back toward zero each frame.
        p.ox *= 0.9
        p.oy *= 0.9

        if (!reduceMotion) {
          const dx = x + p.ox - mouseX
          const dy = p.y + p.oy - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REPEL_RADIUS && dist > 0.001) {
            const push = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
            p.ox += (dx / dist) * push * 0.14
            p.oy += (dy / dist) * push * 0.14
          }
        }

        const drawX = x + p.ox
        const drawY = p.y + p.oy
        const rgb = p.hue === "amber" ? amberRgb : accentRgb

        const gradient = ctx.createRadialGradient(
          drawX,
          drawY,
          0,
          drawX,
          drawY,
          p.r,
        )
        gradient.addColorStop(0, `rgba(${rgb}, ${p.opacity})`)
        gradient.addColorStop(1, `rgba(${rgb}, 0)`)

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(drawX, drawY, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduceMotion) rafId = requestAnimationFrame(draw)
    }

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function onResize() {
      buildParticles()
      if (reduceMotion) draw(0)
    }

    accentRgb = readColor("--accent", accentRgb)
    amberRgb = readColor("--amber", amberRgb)
    buildParticles()
    window.addEventListener("resize", onResize)
    window.addEventListener("mousemove", onMouseMove, { passive: true })

    if (reduceMotion) {
      draw(0)
    } else {
      rafId = requestAnimationFrame(draw)
    }

    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
    />
  )
}
