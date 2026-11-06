"use client"

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion"
import { useSpotlight } from "@/lib/useSpotlight"

interface Props {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  /** Optional scroll-entrance variant — lets this double as the reveal element. */
  variants?: Variants
}

// 3D tilt plus a cursor-following glow. Use on standalone panels, not
// edge-to-edge grid cells: the tilt detaches them from shared borders.
export default function TiltCard({
  children,
  className,
  style,
  variants,
}: Props) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const smoothX = useSpring(x, { stiffness: 140, damping: 18 })
  const smoothY = useSpring(y, { stiffness: 140, damping: 18 })

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-7deg", "7deg"])

  const { ref: spotRef, onMouseMove: spotMove } = useSpotlight<HTMLDivElement>()

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
    spotMove(e)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={spotRef}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.015 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
        ...style,
      }}
      className={`spotlight ${className ?? ""}`}
    >
      {children}
    </motion.div>
  )
}
