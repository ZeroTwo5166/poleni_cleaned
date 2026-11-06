import type { Metadata } from "next"
import { Space_Grotesk, Public_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/shared/navbar"
import Footer from "@/components/shared/footer"
import ThemeProvider from "@/components/shared/themeProvider"
import LocaleProvider from "@/components/shared/localeProvider"
import Preloader from "@/components/shared/preloader"
import AmbientBackground from "@/components/shared/ambientBackground"
import ClockCursor from "@/components/shared/clockCursor"
import ScrollToTop from "@/components/shared/scrollToTop"
import LegalBar from "@/components/shared/legalBar"

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
})

const body = Public_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Poleni – Transparent pricing. No contracts. More customers.",
  description:
    "We help Danish businesses grow through websites and marketing. Fixed prices, no hidden fees, no lock-in contracts.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-sans antialiased`}
      >
        {/* Warms up the connection for the Calendly booking iframes. */}
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="preconnect" href="https://assets.calendly.com" />

        <LocaleProvider>
          <ThemeProvider>
            <Preloader />
            <AmbientBackground />
            <ClockCursor />
            <div className="relative z-[5]">
              <Navbar />
              <main>
                <ScrollToTop />
                {children}
              </main>
              <Footer />
            </div>
            <LegalBar />
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  )
}
