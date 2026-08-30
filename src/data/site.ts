/**
 * Single source of truth for site-wide facts.
 *
 * IMPORTANT — nothing here may be invented. Fields whose real value has not
 * been supplied by the client are left as `null` and every component that
 * consumes them must handle the null case by omitting the element (never by
 * inventing a placeholder that reads as real).
 */

export const site = {
  name: "Work Up Fit",
  legalName: "Work Up Fit",
  tagline: "Movimento que conecta",
  description:
    "Work Up Fit é uma certificadora brasileira de metodologias fitness coletivas. Formamos instrutores e levamos experiências de treino em grupo para academias de todo o Brasil.",
  /** Set to the production domain before go-live. Used for canonical + OG. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://workupfit.com.br",
  locale: "pt-BR",
  country: "BR",

  /** Contact — not yet supplied. Do not invent. */
  contact: {
    email: null as string | null,
    whatsapp: null as string | null,
    phone: null as string | null,
    city: null as string | null,
  },

  /** Social — not yet supplied. Links render only when the URL exists. */
  social: {
    instagram: null as string | null,
    youtube: null as string | null,
    linkedin: null as string | null,
  },
} as const;

export type Site = typeof site;
