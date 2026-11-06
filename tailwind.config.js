/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink: "var(--text-primary)",
        "ink-soft": "var(--text-secondary)",
        "ink-faint": "var(--text-muted)",
        surface: "var(--bg)",
        "surface-raised": "var(--bg-elevated)",
        line: "var(--border)",
        "line-strong": "var(--border-strong)",
        accent: "var(--accent)",
        "accent-strong": "var(--accent-strong)",
        amber: "var(--amber)",
      },
      maxWidth: {
        page: "1400px",
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
    },
  },
  plugins: [],
}
