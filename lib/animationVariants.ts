// Shared scroll-reveal variants. Each has an exit state so elements animate
// back out when scrolled away (see `viewport.once`).

import type { Variants } from "framer-motion"

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    filter: "blur(5px)",
    transition: { duration: 0.4, ease: [0.55, 0, 1, 0.45] },
  },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: -20,
    filter: "blur(5px)",
    transition: { duration: 0.4, ease: [0.55, 0, 1, 0.45] },
  },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 36, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: 20,
    filter: "blur(5px)",
    transition: { duration: 0.4, ease: [0.55, 0, 1, 0.45] },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

// Trigger at 15% visibility and replay on every pass.
export const viewport = { once: false, amount: 0.15 } as const
