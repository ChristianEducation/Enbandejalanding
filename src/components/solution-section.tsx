import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function SolutionSection() {
  return (
    <section id="solucion" className="py-20 md:py-28">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="section-kicker">Una operación conectada</p>
            <h2 className="mt-5 max-w-xl font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
              Del pedido a la entrega, sin perder el hilo
            </h2>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">
              Cada equipo trabaja desde la perspectiva que necesita, mientras la operación conserva una visión común. La plataforma se configura alrededor de las reglas, excepciones y logística de cada casino.
            </p>
            <a href="/demo?ref=landing-flow" className="mt-6 inline-flex min-h-12 items-center gap-2 font-semibold text-brand-700 transition-colors hover:text-brand-900">
              Recorrer la demo interactiva <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[2rem] border border-line bg-surface p-2 shadow-mock sm:p-3">
          <Image
            src="/assets/flujo-tres-roles.webp"
            alt="Flujo conectado entre Apoderado, Administración y Cocina"
            width={1600}
            height={900}
            sizes="(min-width:1440px) 1360px, 96vw"
            className="w-full rounded-[1.45rem]"
          />
        </div>
      </div>
    </section>
  );
}
