import { Check, Mail } from "lucide-react";
import { LeadForm } from "./lead-form";

export function LeadSection() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <section id="contacto" className="relative overflow-hidden bg-brand-900 py-20 text-cream md:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[.82fr_1.18fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.12em] text-brand-200">
            Conversemos
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl">
            Veamos como deberia funcionar en tu operacion.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-100">
            Revisamos tu realidad actual y definimos que modulos, integraciones
            y etapas tienen sentido para comenzar.
          </p>
          <ul className="mt-7 space-y-3 text-brand-100">
            <li className="flex gap-3">
              <Check className="h-5 w-5 text-warm-50" />
              Entender actores, pagos, produccion y entrega
            </li>
            <li className="flex gap-3">
              <Check className="h-5 w-5 text-warm-50" />
              Identificar que conviene conectar primero
            </li>
            <li className="flex gap-3">
              <Check className="h-5 w-5 text-warm-50" />
              Acordar un siguiente paso realista
            </li>
          </ul>
          {email && (
            <a href={`mailto:${email}`} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-100 underline">
              <Mail className="h-4 w-4" />
              {email}
            </a>
          )}
        </div>

        <LeadForm />
      </div>
    </section>
  );
}
