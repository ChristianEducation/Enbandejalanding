"use client";

import { Check, Mail, MessageCircle } from "lucide-react";
import { LeadForm } from "./lead-form";
import { track } from "@/lib/analytics";

export function LeadSection() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <section id="contacto" className="relative overflow-hidden bg-brand-900 py-20 text-cream md:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[.82fr_1.18fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.12em] text-brand-200">
            Conversemos
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-5xl">
            Cuéntame cómo funciona hoy tu casino y te muestro cómo se vería en
            EnBandeja.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-brand-100">
            Agenda una demo breve para revisar tu operación y definir qué
            modalidad corresponde.
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
              Definir qué modalidad corresponde a tu operación
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-100 underline"
              >
                <MessageCircle className="h-4 w-4" />
                Hablar por WhatsApp
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-100 underline">
                <Mail className="h-4 w-4" />
                {email}
              </a>
            )}
          </div>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}
