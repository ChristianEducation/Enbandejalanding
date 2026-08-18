/**
 * Helper mínimo de medición comercial — sin SDK de analytics instalado.
 *
 * Empuja a `window.dataLayer` si existe (patrón estándar de Google Tag
 * Manager) para no atar la landing a un proveedor específico todavía;
 * conectar dataLayer a GTM/GA4 real es una decisión de negocio pendiente,
 * no algo que resolver acá. En dev, solo lo deja en consola.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export type AnalyticsEvent =
  | "hero_demo_click"
  | "hero_plans_click"
  | "whatsapp_click"
  | "demo_open"
  | "pricing_view"
  | "lead_form_start"
  | "lead_form_submit"
  | "cafeteria_interest"
  | "multicolegio_interest";

export function track(event: AnalyticsEvent, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  if (window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  } else if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event, params ?? {});
  }
}
