import type { MetadataRoute } from "next";

// Sin NEXT_PUBLIC_SITE_URL definida, cae al mismo fallback que usa
// metadataBase en layout.tsx (localhost) — nunca se asume un dominio de
// producción no confirmado (ver CLAUDE.md: ".cl" está tomado, ".app" es
// plan pero no está confirmado todavía).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    // /demo es noindex (ver metadata en src/app/demo/page.tsx) — no se lista.
    { url: `${siteUrl}/privacidad`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
