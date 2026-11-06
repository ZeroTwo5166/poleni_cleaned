// Prices in DKK. Display copy for each item lives in lib/i18n/translations.ts.
export const WEBSITE_TYPES = [
  { id: "static", price: 4000 },
  { id: "dynamic", price: 10000 },
  { id: "ecommerce", price: 18000 },
  { id: "custom", price: null },
] as const

export type WebsiteTypeId = (typeof WEBSITE_TYPES)[number]["id"]

export const ADDONS = [
  { id: "google", price: 4500 },
  { id: "meta", price: 3500 },
  { id: "seo", price: 3500 },
] as const

export type AddonId = (typeof ADDONS)[number]["id"]
