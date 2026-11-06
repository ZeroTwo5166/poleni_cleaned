"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CurrencyDollar,
  CheckCircle,
  ChartBar,
  Confetti,
} from "@phosphor-icons/react"
import { useT } from "@/lib/i18n/useT"

const requirementIcons = [CurrencyDollar, CheckCircle, ChartBar]

export default function PartnershipPage() {
  const t = useT()
  const requirements = t.partnership.requirements.map((text, i) => ({
    text,
    icon: requirementIcons[i],
  }))

  const [form, setForm] = useState({
    business: "",
    revenue: "",
    product: "",
    tracking: "",
    email: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault()
    setLoading(true)
    // Not wired to a backend yet; only simulates a submit.
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  const inputClass =
    "w-full px-4 py-3 border text-sm outline-none transition-colors duration-200 bg-surface-raised border-line text-ink"

  return (
    <main className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-page mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-20"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
            {t.partnership.eyebrow}
          </span>
          <h1 className="font-display font-medium tracking-tightest leading-[1.02] text-5xl md:text-7xl mt-5 text-ink">
            {t.partnership.headline1}
            <br />
            <span className="text-accent">{t.partnership.headlineAccent}</span>
          </h1>
          <p className="text-lg md:text-xl mt-6 leading-relaxed max-w-2xl text-ink-soft">
            {t.partnership.subtext}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="panel p-8 mb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-6 text-ink-faint">
            {t.partnership.requirementsLabel}
          </p>
          <div className="flex flex-col gap-4">
            {requirements.map((r) => {
              const Icon = r.icon
              return (
                <div key={r.text} className="flex items-center gap-4">
                  <Icon
                    size={22}
                    weight="light"
                    className="shrink-0 text-accent"
                  />
                  <p className="text-sm text-ink-soft">{r.text}</p>
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-16"
        >
          <h2 className="font-display font-medium tracking-tightest text-2xl mb-8 text-ink">
            {t.partnership.howItWorksHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line">
            {t.partnership.steps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex items-start gap-4 p-6 bg-surface"
              >
                <span className="tabular text-xs font-bold shrink-0 mt-0.5 text-accent">
                  {s.step}
                </span>
                <div>
                  <p className="text-sm font-semibold mb-1 text-ink">
                    {s.title}
                  </p>
                  <p className="text-xs leading-relaxed text-ink-faint">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="panel p-8 md:p-12"
        >
          <h2 className="font-display font-medium tracking-tightest text-2xl mb-2 text-ink">
            {t.partnership.applyHeading}
          </h2>
          <p className="text-sm mb-8 text-ink-faint">
            {t.partnership.applySub}
          </p>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <Confetti
                  size={44}
                  weight="light"
                  className="mx-auto mb-4 text-accent"
                />
                <h3 className="text-xl font-bold mb-2 text-ink">
                  {t.partnership.successTitle}
                </h3>
                <p className="text-sm text-ink-soft">
                  {t.partnership.successTextPre}{" "}
                  <span className="text-ink">{form.email}</span>{" "}
                  {t.partnership.successTextPost}
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-ink-faint">
                      {t.partnership.businessNameLabel}
                    </label>
                    <input
                      name="business"
                      value={form.business}
                      onChange={handleChange}
                      placeholder={t.partnership.businessNamePlaceholder}
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-ink-faint">
                      {t.partnership.revenueLabel}
                    </label>
                    <select
                      name="revenue"
                      value={form.revenue}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">
                        {t.partnership.revenueSelectPlaceholder}
                      </option>
                      <option value="20-30k">
                        {t.partnership.revenueOptions[0]}
                      </option>
                      <option value="30-50k">
                        {t.partnership.revenueOptions[1]}
                      </option>
                      <option value="50-100k">
                        {t.partnership.revenueOptions[2]}
                      </option>
                      <option value="100k+">
                        {t.partnership.revenueOptions[3]}
                      </option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-ink-faint">
                    {t.partnership.productLabel}
                  </label>
                  <input
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    placeholder={t.partnership.productPlaceholder}
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-ink-faint">
                    {t.partnership.trackingLabel}
                  </label>
                  <textarea
                    name="tracking"
                    value={form.tracking}
                    onChange={handleChange}
                    placeholder={t.partnership.trackingPlaceholder}
                    rows={3}
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-ink-faint">
                    {t.partnership.emailLabel}
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t.partnership.emailPlaceholder}
                    className={inputClass}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={
                    loading ||
                    !form.business ||
                    !form.revenue ||
                    !form.product ||
                    !form.tracking ||
                    !form.email
                  }
                  className="w-full py-4 font-semibold mt-2 transition-opacity duration-200 hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed bg-accent text-surface"
                >
                  {loading ? t.partnership.sending : t.partnership.submit}
                </button>

                <p className="text-xs text-center text-ink-faint">
                  {t.partnership.footNote}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  )
}
