import { z } from "zod";

/**
 * Validación compartida cliente/servidor del formulario de leads.
 * El servidor NUNCA confía solo en el cliente: la API route vuelve a
 * pasar todo por este mismo esquema.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Normaliza un WhatsApp chileno a formato +56 9 XXXX XXXX.
 * Acepta variantes: "9 1234 5678", "912345678", "+56912345678",
 * "56 9 1234 5678". Devuelve null si no es un móvil chileno válido.
 */
export function normalizeWhatsapp(value: string): string | null {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("56")) digits = digits.slice(2);
  if (!/^9\d{8}$/.test(digits)) return null;
  return `+56 ${digits.slice(0, 1)} ${digits.slice(1, 5)} ${digits.slice(5)}`;
}

export const leadSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre.")
    .max(120, "El nombre es demasiado largo."),
  empresa: z
    .string()
    .trim()
    .min(2, "Ingresa el nombre de tu casino, colegio o concesionaria.")
    .max(160, "El nombre es demasiado largo."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Ingresa tu correo.")
    .max(160, "El correo es demasiado largo.")
    .refine((v) => EMAIL_RE.test(v), "Ingresa un correo válido, ej: nombre@colegio.cl"),
  whatsapp: z
    .string()
    .trim()
    .min(1, "Ingresa tu WhatsApp.")
    .refine(
      (v) => normalizeWhatsapp(v) !== null,
      "Ingresa un WhatsApp chileno válido, ej: +56 9 1234 5678",
    )
    .transform((v) => normalizeWhatsapp(v) as string),
  cantidadColegios: z.coerce
    .number()
    .int("Ingresa un número entero.")
    .min(1, "Debe ser al menos 1 colegio.")
    .max(9, "Para más de 9 colegios, escríbenos directamente."),
  tieneCafeteria: z.coerce.boolean().default(false),
  mensaje: z
    .string()
    .trim()
    .max(2000, "El mensaje es demasiado largo.")
    .optional()
    .or(z.literal("")),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;

export type LeadFieldName = keyof LeadInput;

/** Valida un solo campo (para validación on-blur en el cliente). */
export function validateField(name: LeadFieldName, value: unknown): string | null {
  const result = leadSchema.shape[name].safeParse(value);
  if (result.success) return null;
  return result.error.issues[0]?.message ?? "Campo inválido.";
}

/** Sanitiza el origen capturado desde ?ref= — nunca confiar en la URL. */
export function sanitizeOrigen(value: unknown): string {
  if (typeof value !== "string") return "landing-enbandeja";
  const cleaned = value.trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9-_]{0,59}$/.test(cleaned)) return "landing-enbandeja";
  return cleaned;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

/** Extrae UTMs conocidas de un URLSearchParams; descarta el resto. */
export function extractUtm(params: URLSearchParams): Record<string, string> | null {
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value && value.trim()) out[key] = value.trim().slice(0, 200);
  }
  return Object.keys(out).length > 0 ? out : null;
}
