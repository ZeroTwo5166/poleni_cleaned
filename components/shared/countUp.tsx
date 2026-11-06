"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

interface Props {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

// Counts up from 0 the first time the number scrolls into view.
export default function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1.4,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) motionVal.set(value)
  }, [inView, value, motionVal])

  useEffect(() => {
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)))
    return () => unsub()
  }, [spring])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
