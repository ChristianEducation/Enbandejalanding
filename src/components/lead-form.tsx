"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Loader2, AlertCircle, Send } from "lucide-react";
import {
  leadSchema,
  validateField,
  sanitizeOrigen,
  extractUtm,
  type LeadFieldName,
} from "@/lib/lead-schema";
import { track } from "@/lib/analytics";

type FieldErrors = Partial<Record<LeadFieldName, string>>;
type Status = "idle" | "loading" | "success" | "error";

const EMPTY = {
  nombre: "",
  empresa: "",
  email: "",
  whatsapp: "",
  cantidadColegios: "1",
  mensaje: "",
};

export function LeadForm() {
  const [values, setValues] = useState<Record<Exclude<LeadFieldName, "tieneCafeteria">, string>>(
    EMPTY,
  );
  const [tieneCafeteria, setTieneCafeteria] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef(false);

  function markStarted() {
    if (!startedRef.current) {
      startedRef.current = true;
      track("lead_form_start");
    }
  }

  function setValue(name: Exclude<LeadFieldName, "tieneCafeteria">, value: string) {
    markStarted();
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) {
      setErrors((e) => ({ ...e, [name]: validateField(name, value) ?? undefined }));
    }
  }

  function handleBlur(name: Exclude<LeadFieldName, "tieneCafeteria">) {
    if (values[name].trim() === "" && name !== "mensaje") return;
    setErrors((e) => ({ ...e, [name]: validateField(name, values[name]) ?? undefined }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setServerError(null);

    const parsed = leadSchema.safeParse({ ...values, tieneCafeteria });
    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as LeadFieldName;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      const firstField = Object.keys(nextErrors)[0];
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstField}"]`)
        ?.focus();
      return;
    }

    setStatus("loading");
    try {
      // Se lee ?ref= y las UTMs recién al enviar (no en el render) para
      // no depender de useSearchParams()/Suspense — ese boundary
      // provocaba un bug de streaming SSR en Next 16 que dejaba el
      // formulario huérfano fuera del árbol del DOM.
      const searchParams = new URLSearchParams(window.location.search);
      const origen = sanitizeOrigen(searchParams.get("ref"));
      const utm = extractUtm(searchParams);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          origen,
          utm,
          sitio_web: honeypotRef.current?.value ?? "",
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        errors?: FieldErrors;
      };

      if (res.ok && data.ok) {
        track("lead_form_submit");
        setStatus("success");
        return;
      }

      if (data.errors) setErrors(data.errors);
      setServerError(
        data.error ??
          "No pudimos enviar tus datos. Intenta de nuevo en unos minutos.",
      );
      setStatus("error");
    } catch {
      setServerError(
        "No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-brand-200 bg-brand-50 p-8 text-center sm:p-10"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-600" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl font-bold text-ink">
          Recibimos tu solicitud
        </h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-soft">
          Gracias por contarnos sobre tu operación. Te contactaremos pronto
          por WhatsApp o correo para agendar tu demo.
        </p>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Nombre"
          name="nombre"
          autoComplete="name"
          placeholder="Tu nombre y apellido"
          value={values.nombre}
          error={errors.nombre}
          onChange={setValue}
          onBlur={handleBlur}
        />
        <Field
          label="Empresa / concesionaria"
          name="empresa"
          autoComplete="organization"
          placeholder="Nombre del casino, colegio o concesionaria"
          value={values.empresa}
          error={errors.empresa}
          onChange={setValue}
          onBlur={handleBlur}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="nombre@colegio.cl"
          value={values.email}
          error={errors.email}
          onChange={setValue}
          onBlur={handleBlur}
        />
        <Field
          label="WhatsApp"
          name="whatsapp"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+56 9 1234 5678"
          hint="Formato chileno: +56 9 seguido de 8 dígitos."
          value={values.whatsapp}
          error={errors.whatsapp}
          onChange={setValue}
          onBlur={handleBlur}
        />
        <Field
          label="Cantidad de colegios"
          name="cantidadColegios"
          type="number"
          inputMode="numeric"
          placeholder="1"
          value={values.cantidadColegios}
          error={errors.cantidadColegios}
          onChange={setValue}
          onBlur={handleBlur}
        />

        <div className="flex items-end pb-1.5">
          <label className="flex min-h-12 cursor-pointer items-center gap-3 text-sm font-semibold text-ink">
            <input
              type="checkbox"
              name="tieneCafeteria"
              checked={tieneCafeteria}
              onChange={(e) => {
                markStarted();
                setTieneCafeteria(e.target.checked);
                if (e.target.checked) track("cafeteria_interest");
              }}
              className="h-5 w-5 shrink-0 rounded border-line text-brand-600 focus:ring-2 focus:ring-brand-500/30"
            />
            ¿Tu casino también tiene cafetería?
          </label>
        </div>

        <Field
          label="Mensaje"
          name="mensaje"
          as="textarea"
          placeholder="Cuéntanos brevemente cómo opera hoy tu casino (opcional)"
          value={values.mensaje}
          error={errors.mensaje}
          onChange={setValue}
          onBlur={handleBlur}
          className="sm:col-span-2"
        />
      </div>

      {/* Honeypot anti-spam: invisible para personas. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="sitio_web">No completar este campo</label>
        <input
          ref={honeypotRef}
          type="text"
          id="sitio_web"
          name="sitio_web"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {serverError && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-800"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>{serverError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex min-h-13 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-700 px-8 text-base font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Enviando…
          </>
        ) : (
          <>
            <Send className="h-4.5 w-4.5" aria-hidden="true" />
            Agendar una demo
          </>
        )}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-ink-soft">
        Usaremos tus datos solo para responder esta solicitud. No envies
        informacion de estudiantes ni datos sensibles.{" "}
        <a href="/privacidad" className="font-semibold text-brand-700 underline underline-offset-2">
          Ver politica de privacidad
        </a>
        .
      </p>
    </form>
  );
}

/* ─────────────────────────── Campo del formulario ─────────────────────── */

type FieldProps = {
  label: string;
  name: Exclude<LeadFieldName, "tieneCafeteria">;
  value: string;
  error?: string;
  onChange: (name: Exclude<LeadFieldName, "tieneCafeteria">, value: string) => void;
  onBlur: (name: Exclude<LeadFieldName, "tieneCafeteria">) => void;
  as?: "input" | "textarea";
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "numeric";
  placeholder?: string;
  hint?: string;
  className?: string;
};

function Field({
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
  as = "input",
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
  hint,
  className = "",
}: FieldProps) {
  const required = name !== "mensaje";
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  const baseClasses = `mt-1.5 w-full rounded-xl border bg-white px-4 text-base text-ink placeholder:text-ink-soft/55 transition-colors duration-150 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${
    error ? "border-red-400" : "border-line"
  }`;

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-semibold text-ink">
        {label} {required && <span className="text-warm-700" aria-hidden="true">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => onBlur(name)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`${baseClasses} resize-y py-3`}
        />
      ) : (
        <input
          id={name}
          name={name}
          required={required}
          type={type}
          min={type === "number" ? 1 : undefined}
          max={type === "number" ? 9 : undefined}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => onBlur(name)}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={`${baseClasses} min-h-12`}
        />
      )}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
