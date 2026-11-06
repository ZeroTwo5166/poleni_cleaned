"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface Props {
  src: string
  alt: string
  className?: string
}

// Scales the image up slightly and drifts it vertically as the frame scrolls
// through the viewport.
export default function ParallaxImage({ src, alt, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.18 }}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
