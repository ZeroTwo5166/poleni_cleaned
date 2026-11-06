"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkle, Check } from "@phosphor-icons/react"
import { useT } from "@/lib/i18n/useT"

type Tab = "websites" | "marketing"

export default function ServicesPage() {
  const t = useT()
  const [tab, setTab] = useState<Tab>("websites")
  const list = tab === "websites" ? t.services.websites : t.services.marketing

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-page mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
            {t.services.eyebrow}
          </span>
          <h1 className="font-display font-medium tracking-tightest leading-[1.05] text-5xl md:text-6xl mt-5 text-ink">
            {t.services.headline1}
            <br />
            <span className="text-accent">{t.services.headlineAccent}</span>
          </h1>
          <p className="text-lg mt-6 leading-relaxed text-ink-soft">
            {t.services.subtext}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-6 mb-14 rule-bottom"
        >
          {(["websites", "marketing"] as Tab[]).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setTab(tabKey)}
              className="relative pb-4 text-sm font-medium transition-colors duration-200"
              style={{
                color:
                  tab === tabKey ? "var(--text-primary)" : "var(--text-muted)",
              }}
            >
              {t.services.tabs[tabKey]}
              <span
                className="absolute left-0 -bottom-px h-0.5 transition-all duration-300 bg-accent"
                style={{ width: tab === tabKey ? "100%" : "0%" }}
              />
            </button>
          ))}
        </motion.div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px mb-16 bg-line"
        >
          {list.map((service) => (
            <div
              key={service.name}
              className="relative flex flex-col p-7 bg-surface"
            >
              {(service as { popular?: boolean }).popular && (
                <span className="absolute top-0 right-0 px-3 py-1.5 text-xs font-semibold bg-accent text-surface">
                  {t.services.popularBadge}
                </span>
              )}

              <span className="text-xs uppercase tracking-widest font-semibold mb-4 text-ink-faint">
                {service.delivery}
              </span>

              <h3 className="font-semibold text-lg mb-2 text-ink">
                {service.name}
              </h3>
              <p className="text-sm leading-relaxed mb-6 text-ink-faint">
                {service.desc}
              </p>

              <ul className="flex flex-col gap-2 mb-8 flex-1">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-ink-soft"
                  >
                    <Check
                      size={14}
                      weight="bold"
                      className="shrink-0 text-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="pt-5 rule-top">
                <div className="mb-4">
                  <p className="tabular text-3xl font-semibold text-ink">
                    {service.price}
                  </p>
                  <p className="text-xs mt-0.5 text-accent">{service.type}</p>
                </div>
                <Link
                  href="/contact"
                  className="block w-full py-3 text-center font-medium text-sm border transition-colors duration-200 border-line-strong text-ink"
                >
                  {t.services.getStarted}
                </Link>
              </div>
            </div>
          ))}
        </motion.div>

        {tab === "marketing" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16 p-6 flex items-start gap-4"
            style={{
              background: "var(--accent-soft)",
              border: "1px dashed var(--accent-line)",
            }}
          >
            <Sparkle
              size={20}
              weight="light"
              className="shrink-0 mt-0.5 text-accent"
            />
            <div>
              <h4 className="font-semibold mb-1 text-ink">
                {t.services.weeklyUpdateTitle}
              </h4>
              <p className="text-sm leading-relaxed text-ink-soft">
                {t.services.weeklyUpdateText}
              </p>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="panel mb-16"
        >
          <div className="p-6 rule-bottom">
            <h2 className="text-xl font-semibold text-ink">
              {t.services.tableTitle}
            </h2>
            <p className="text-sm mt-1 text-ink-faint">
              {t.services.tableSubtitle}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="rule-bottom">
                  {t.services.tableHeaders.map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-4 text-xs uppercase tracking-wider font-medium text-ink-faint"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...t.services.websites, ...t.services.marketing].map(
                  (service, i, arr) => (
                    <tr
                      key={service.name}
                      className={i !== arr.length - 1 ? "rule-bottom" : ""}
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-ink">
                          {service.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-ink-soft">
                          {service.includes.slice(0, 3).join(", ")}
                          {service.includes.length > 3 && "…"}
                        </p>
                      </td>
                      <td className="tabular px-6 py-4">
                        <span className="text-sm font-semibold text-ink">
                          {service.price}
                        </span>
                        <span className="text-xs ml-1 text-ink-faint">
                          {service.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-ink-soft">
                          {service.delivery}
                        </span>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="panel p-10 text-center"
        >
          <h2 className="font-display font-medium tracking-tightest text-3xl mb-4 text-ink">
            {t.services.ctaHeading}
          </h2>
          <p className="mb-8 max-w-md mx-auto text-ink-soft">
            {t.services.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 font-semibold transition-opacity duration-200 hover:opacity-85 text-center bg-accent text-surface"
            >
              {t.services.ctaPrimary}
            </Link>
            <Link
              href="/calculator"
              className="px-8 py-4 font-medium border transition-colors duration-200 text-center border-line-strong text-ink"
            >
              {t.services.ctaSecondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
