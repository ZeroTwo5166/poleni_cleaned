"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr"
import ParallaxImage from "@/components/shared/parallaxImage"
import TiltCard from "@/components/shared/tiltCard"
import { fadeUp, staggerContainer, viewport } from "@/lib/animationVariants"
import { useT } from "@/lib/i18n/useT"

const caseMeta = [
  {
    initials: "CN",
    image:
      "https://r4pr9pzkx7.ufs.sh/f/aSsRCWKGHkXJQ5K4KcYzsL9rcI3tEbHl2Wd1ATjp4QFRPvfV",
    href: null,
  },
  {
    initials: "MN",
    image:
      "https://r4pr9pzkx7.ufs.sh/f/aSsRCWKGHkXJzYYdnPZs9QSLCK7uZRrceti8MTa6YgNoqxGz",
    href: "https://maiya.dk/",
  },
  {
    initials: "ML",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    href: "https://mightyloyalty.dk",
  },
]

export default function OurWork() {
  const t = useT()
  const cases = t.ourWork.cases.map((c, i) => ({ ...c, ...caseMeta[i] }))

  return (
    <section className="relative py-28 lg:py-36 px-6">
      <div className="max-w-page mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
            {t.ourWork.eyebrow}
          </span>

          <h2 className="font-display font-medium tracking-tightest text-4xl md:text-5xl mt-5 text-ink">
            {t.ourWork.heading}
          </h2>

          <p className="text-lg mt-5 leading-relaxed text-ink-soft">
            {t.ourWork.subtext}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          style={{ perspective: 1200 }}
        >
          {cases.map((c) => {
            const cardContent = (
              <>
                <div className="w-full h-56 relative overflow-hidden rule-bottom">
                  <ParallaxImage
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full"
                  />
                  <div className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center bg-accent">
                    <span className="text-xs font-bold text-surface">
                      {c.initials}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-semibold mb-2 uppercase tracking-wide text-ink-faint">
                    {c.title}
                  </p>

                  <h3 className="text-lg font-semibold mb-3 text-ink">
                    {c.headline}
                  </h3>

                  <p className="text-sm leading-relaxed mb-4 flex-1 text-ink-faint">
                    {c.text}
                  </p>

                  {c.href && (
                    <div className="mt-auto pt-4 rule-top flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-accent">
                        {t.ourWork.visitSite}
                      </p>
                      <ArrowUpRight
                        className="text-accent"
                        size={12}
                        weight="bold"
                      />
                    </div>
                  )}
                </div>
              </>
            )

            return (
              <TiltCard
                key={c.title}
                variants={fadeUp}
                className="panel group flex flex-col cursor-default"
              >
                {c.href ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col h-full"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div className="flex flex-col h-full">{cardContent}</div>
                )}
              </TiltCard>
            )
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-16 pt-10 rule-top flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <p className="text-base text-ink-soft">{t.ourWork.ctaText}</p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium text-sm w-fit transition-all duration-200 hover:opacity-85 hover:scale-[1.02] active:scale-[0.97] bg-accent text-surface"
          >
            {t.ourWork.ctaButton}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
