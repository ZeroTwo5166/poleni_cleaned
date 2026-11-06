# Poleni

Marketing website for Poleni, a Danish agency selling websites and online marketing at fixed prices. The site is available in Danish and English and has a light and a dark theme.

Built with Next.js (App Router), React, Tailwind CSS and Framer Motion. Contact form emails are sent through [Resend](https://resend.com), and meetings are booked through an embedded [Calendly](https://calendly.com) page.

## Project structure

```
app/                Routes (one folder per page) and the /api/contact endpoint
components/home/    Sections used on the home page
components/shared/  Layout pieces used across pages (navbar, footer, backgrounds, cursor)
lib/                Pricing data, animation presets, hooks
lib/i18n/           All site copy (Danish + English) and the useT() hook
```

All visible text lives in `lib/i18n/translations.ts`. Prices live in `lib/pricing.ts`. Colors and other design tokens are CSS variables in `app/globals.css`, exposed to Tailwind in `tailwind.config.js`.

## Requirements

- Node.js 20.9 or newer
- npm

## Install and run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

Other scripts:

| Command                | What it does                     |
| ---------------------- | -------------------------------- |
| `npm run build`        | Production build                 |
| `npm start`            | Serve the production build       |
| `npm run lint`         | ESLint                           |
| `npm run format`       | Format all files with Prettier   |
| `npm run format:check` | Check formatting without writing |

## Environment variables

| Variable                   | Used by                    | Description                                                                                      |
| -------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------ |
| `RESEND_API_KEY`           | `app/api/contact/route.ts` | Resend API key                                                                                   |
| `CONTACT_FROM_EMAIL`       | `app/api/contact/route.ts` | Sender address, e.g. `Poleni Kontakt <kontakt@poleni.dk>`. Its domain must be verified in Resend |
| `CONTACT_TO_EMAIL`         | `app/api/contact/route.ts` | Inbox that receives contact form submissions                                                     |
| `NEXT_PUBLIC_CALENDLY_URL` | Home and contact pages     | Calendly event URL to embed, e.g. `https://calendly.com/<user>/30min`                            |

`NEXT_PUBLIC_` variables are inlined into the browser bundle at build time, so you need to redeploy after changing one.

## Deploy on Vercel

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository. Vercel detects Next.js automatically, so the default build settings work as-is.
3. Under **Settings → Environment Variables**, add the four variables above for the Production (and, if you want, Preview) environment.
4. Deploy. Every later push to the default branch deploys to production.

To use a custom domain, add it under **Settings → Domains**.
