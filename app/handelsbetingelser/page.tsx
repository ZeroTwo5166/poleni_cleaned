"use client"

import { motion } from "framer-motion"
import { fadeUp, viewport } from "@/lib/animationVariants"
import { useT } from "@/lib/i18n/useT"

export default function TermsPage() {
  const t = useT()

  return (
    <main className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
            {t.terms.eyebrow}
          </span>

          <h1 className="font-display font-medium tracking-tightest text-4xl md:text-5xl mt-5 text-ink">
            {t.terms.heading}
          </h1>

          <p className="text-base max-w-xl mx-auto mt-5 text-ink-soft">
            {t.terms.subtext}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="panel p-6 md:p-10"
        >
          <div className="flex flex-col gap-8">
            {t.terms.sections.map((section, i) => (
              <div
                key={section.title}
                className={i !== 0 ? "pt-8 rule-top" : ""}
              >
                <h2 className="text-lg font-bold mb-3 text-ink">
                  {section.title}
                </h2>

                {"body" in section &&
                  section.body?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-relaxed mb-3 last:mb-0 text-ink-soft"
                    >
                      {paragraph}
                    </p>
                  ))}

                {"list" in section && section.list && (
                  <ul className="flex flex-col gap-2 mt-1">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-accent" />
                        <span className="text-sm leading-relaxed text-ink-soft">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-8 text-center"
        >
          <p className="text-xs text-ink-faint">{t.terms.lastUpdated}</p>

          <p className="text-xs mt-2 text-ink-faint">
            {t.terms.questionsText}{" "}
            <a
              href="mailto:kontakt@poleni.dk"
              className="font-medium text-accent"
            >
              kontakt@poleni.dk
            </a>
          </p>
        </motion.div>
      </div>
    </main>
  )
}
