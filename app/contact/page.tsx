"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  Clock,
  Check,
  X,
  ArrowClockwise,
  CalendarBlank,
} from "@phosphor-icons/react"
import { useT } from "@/lib/i18n/useT"

type FormState = "idle" | "loading" | "success" | "error"

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL

const infoIcons = [EnvelopeSimple, Phone, MapPin, Clock]

export default function ContactPage() {
  const t = useT()
  const [formState, setFormState] = useState<FormState>("idle")
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const contactInfo = t.contact.infoItems.map((item, i) => ({
    ...item,
    icon: infoIcons[i],
    href:
      i === 0
        ? `mailto:${item.value}`
        : i === 1
          ? `tel:${item.value.replace(/\s/g, "")}`
          : "#",
  }))

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [calendlySrc, setCalendlySrc] = useState<string | null>(null)
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const [calendlyKey, setCalendlyKey] = useState(0)

  // Plain iframe rather than Calendly's widget.js, which throws on remount in SPAs.
  useEffect(() => {
    if (!isCalendarOpen) return
    setCalendlyLoaded(false)
    const domain = window.location.hostname
    setCalendlySrc(
      `${CALENDLY_URL}?embed_domain=${domain}&embed_type=Inline&hide_gdpr_banner=1`,
    )
  }, [isCalendarOpen, calendlyKey])

  useEffect(() => {
    if (!isCalendarOpen) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsCalendarOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [isCalendarOpen])

  function refreshCalendly() {
    setCalendlyLoaded(false)
    setCalendlyKey((k) => k + 1)
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setFormState("success")
        setForm({ name: "", email: "", phone: "", message: "" })
      } else {
        setFormState("error")
      }
    } catch {
      setFormState("error")
    }
  }

  const inputClass =
    "w-full px-4 py-3.5 text-sm outline-none border transition-colors duration-200 bg-surface-raised border-line text-ink"
  const labelClass =
    "text-xs font-medium uppercase tracking-wider mb-2 block text-ink-soft"

  return (
    <main className="relative min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-page mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
            {t.contact.eyebrow}
          </span>
          <h1 className="font-display font-medium tracking-tightest leading-[1.05] text-5xl md:text-6xl mt-5 text-ink">
            {t.contact.headline1}
            <br />
            <span className="text-accent">{t.contact.headlineAccent}</span>
          </h1>
          <p className="text-lg mt-6 leading-relaxed text-ink-soft">
            {t.contact.subtext}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="panel p-8">
              <h2 className="text-xl font-semibold mb-1 text-ink">
                {t.contact.formHeading}
              </h2>
              <p className="text-sm mb-6 text-ink-soft">{t.contact.formSub}</p>

              <AnimatePresence mode="wait">
                {formState === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <div
                      className="w-14 h-14 flex items-center justify-center mb-4"
                      style={{
                        background: "var(--accent-soft)",
                        border: "1px solid var(--accent-line)",
                      }}
                    >
                      <Check size={22} weight="bold" className="text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-ink">
                      {t.contact.successTitle}
                    </h3>
                    <p className="text-sm max-w-xs text-ink-soft">
                      {t.contact.successText}
                    </p>
                    <button
                      onClick={() => setFormState("idle")}
                      className="mt-6 px-6 py-2.5 border text-sm transition-colors duration-200 border-line text-ink-soft"
                    >
                      {t.contact.sendAnother}
                    </button>
                  </motion.div>
                )}

                {formState !== "success" && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <div>
                      <label className={labelClass}>
                        {t.contact.nameLabel}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder={t.contact.namePlaceholder}
                        className={inputClass}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>
                          {t.contact.emailLabel}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder={t.contact.emailPlaceholder}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          {t.contact.phoneLabel}
                          <span className="ml-1 normal-case font-normal text-ink-faint">
                            {t.contact.phoneOptional}
                          </span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder={t.contact.phonePlaceholder}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        {t.contact.messageLabel}
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder={t.contact.messagePlaceholder}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {formState === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-3 border"
                        style={{
                          background: "var(--danger-soft)",
                          borderColor: "var(--danger)",
                        }}
                      >
                        <p
                          className="text-sm"
                          style={{ color: "var(--danger)" }}
                        >
                          {t.contact.errorText}
                        </p>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={formState === "loading"}
                      className="w-full py-4 font-semibold text-sm transition-opacity duration-200 hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed bg-accent text-surface"
                    >
                      {formState === "loading" ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="block w-4 h-4 border-2 rounded-full"
                            style={{
                              borderColor: "rgba(0,0,0,0.2)",
                              borderTopColor: "var(--bg)",
                            }}
                          />
                          {t.contact.sending}
                        </span>
                      ) : (
                        t.contact.submit
                      )}
                    </button>

                    <p className="text-xs text-center -mt-1 text-ink-faint">
                      {t.contact.disclaimer}
                    </p>

                    <div className="flex items-center gap-3 my-1">
                      <div className="flex-1 h-px bg-line" />
                      <span className="text-xs text-ink-faint">
                        {t.contact.or}
                      </span>
                      <div className="flex-1 h-px bg-line" />
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCalendarOpen(true)}
                      className="w-full py-4 text-sm font-semibold flex items-center justify-center gap-2 border transition-colors duration-200 border-line-strong text-ink"
                    >
                      <CalendarBlank size={16} weight="light" />
                      {t.contact.bookInstead}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <div className="panel">
              {contactInfo.map((item, i) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-4 p-5 ${i !== 0 ? "rule-top" : ""} ${item.href === "#" ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center shrink-0 border border-line">
                      <Icon size={16} weight="light" className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs mb-0.5 text-ink-faint">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-ink">
                        {item.value}
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>

            <div className="panel p-6">
              <h3 className="font-semibold mb-4 text-ink">
                {t.contact.nextStepsHeading}
              </h3>
              <div className="flex flex-col gap-4">
                {t.contact.nextSteps.map((item, i) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="tabular text-xs font-bold shrink-0 mt-0.5 text-accent">
                      0{i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{
                border: "1px solid var(--accent-line)",
                background: "var(--accent-soft)",
              }}
            >
              <div className="w-2 h-2 rounded-full shrink-0 animate-soft-pulse bg-accent" />
              <p className="text-sm text-ink-soft">
                <span className="font-medium text-ink">
                  {t.contact.trustNotePre}{" "}
                </span>
                {t.contact.trustNotePost}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isCalendarOpen && (
          <motion.div
            key="calendar-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60"
            onClick={() => setIsCalendarOpen(false)}
          >
            <motion.div
              key="calendar-modal"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl border overflow-hidden border-line bg-surface-raised"
            >
              <div className="flex items-center justify-between gap-3 px-6 py-5 rule-bottom">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {t.contact.modalTitle}
                  </p>
                  <p className="text-xs mt-0.5 text-ink-soft">
                    {t.contact.modalSub}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={refreshCalendly}
                    disabled={!calendlyLoaded}
                    title={t.contact.reload}
                    aria-label={t.contact.reload}
                    className="w-8 h-8 flex items-center justify-center border transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-line text-ink-faint"
                  >
                    <ArrowClockwise
                      size={16}
                      weight="light"
                      className={!calendlyLoaded ? "animate-spin" : ""}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen(false)}
                    title={t.contact.close}
                    aria-label={t.contact.close}
                    className="w-8 h-8 flex items-center justify-center border transition-colors duration-200 border-line text-ink-faint"
                  >
                    <X size={16} weight="light" />
                  </button>
                </div>
              </div>

              <div className="relative h-[min(70vh,620px)]">
                {!calendlyLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 bg-surface">
                    <span
                      className="block w-6 h-6 border-2 rounded-full animate-spin border-line"
                      style={{ borderTopColor: "var(--accent)" }}
                    />
                  </div>
                )}
                {calendlySrc && (
                  <iframe
                    key={calendlyKey}
                    src={calendlySrc}
                    onLoad={() => setCalendlyLoaded(true)}
                    title={t.contact.modalTitle}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      display: "block",
                    }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
