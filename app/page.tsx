"use client"

import { useEffect, useState } from "react"
import { ArrowClockwise, Check } from "@phosphor-icons/react"
import Hero from "@/components/home/hero"
import Calculator from "@/components/home/calculator"
import Problem from "@/components/home/problem"
import OurWork from "@/components/home/ourWork"
import TrustSignals from "@/components/home/trustSignals"
import Solution from "@/components/home/solution"
import Process from "@/components/home/process"
import { useT } from "@/lib/i18n/useT"

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL

export default function HomePage() {
  const t = useT()
  // Plain iframe rather than Calendly's widget.js, which throws on remount in SPAs.
  const [calendlySrc, setCalendlySrc] = useState<string | null>(null)
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const [calendlyKey, setCalendlyKey] = useState(0)

  useEffect(() => {
    setCalendlyLoaded(false)
    const domain = window.location.hostname
    setCalendlySrc(
      `${CALENDLY_URL}?embed_domain=${domain}&embed_type=Inline&hide_gdpr_banner=1`,
    )
  }, [calendlyKey])

  function refreshCalendly() {
    setCalendlyLoaded(false)
    setCalendlyKey((k) => k + 1)
  }

  return (
    <>
      <Hero />

      <div className="relative z-20">
        <Problem />
        <OurWork />
        <TrustSignals />
        <Solution />
        <Calculator />
        <Process />

        <section className="w-full px-6 py-28 lg:py-36">
          <div className="max-w-page mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="panel p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-xs uppercase tracking-widest font-semibold text-ink-faint">
                  {t.homeGuarantee.eyebrow}
                </span>
              </div>

              <h2 className="font-display font-medium tracking-tightest leading-[1.05] text-3xl md:text-4xl mb-4 text-ink">
                {t.homeGuarantee.headline1}{" "}
                <span className="text-accent">
                  {t.homeGuarantee.headlineAccent}
                </span>
              </h2>

              <p className="text-base leading-relaxed text-ink-soft">
                {t.homeGuarantee.bodyPre}{" "}
                <span className="text-ink font-semibold">
                  {t.homeGuarantee.bodyHighlight}
                </span>{" "}
                {t.homeGuarantee.bodyPost}
              </p>

              <div className="mt-8 pt-6 rule-top">
                <p className="text-xs uppercase tracking-widest font-semibold mb-4 text-ink-faint">
                  {t.homeGuarantee.checksHeading}
                </p>
                <ul className="flex flex-col gap-3">
                  {t.homeGuarantee.checks.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft"
                    >
                      <Check
                        size={14}
                        weight="bold"
                        className="shrink-0 mt-1 text-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="panel flex flex-col">
              <div className="flex items-center justify-between gap-3 px-6 py-5 rule-bottom">
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {t.homeGuarantee.bookMeeting}
                  </p>
                  <p className="text-xs mt-0.5 text-ink-soft">
                    {t.homeGuarantee.bookMeetingSub}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={refreshCalendly}
                  disabled={!calendlyLoaded}
                  title={t.homeGuarantee.reload}
                  aria-label={t.homeGuarantee.reload}
                  className="shrink-0 w-8 h-8 flex items-center justify-center border transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border-line text-ink-faint"
                >
                  <ArrowClockwise
                    size={16}
                    weight="light"
                    className={!calendlyLoaded ? "animate-spin" : ""}
                  />
                </button>
              </div>

              <div className="relative h-[480px]">
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
                    title={t.homeGuarantee.bookMeeting}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      display: "block",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
