import Image from "next/image";
import { ArrowRight, ChefHat, ClipboardCheck, UserRound } from "lucide-react";

const perspectives = [
  { icon: UserRound, label: "Elección simple para familias" },
  { icon: ChefHat, label: "Producción y entrega para cocina" },
  { icon: ClipboardCheck, label: "Visión consolidada para administración" },
];

export function DemoPreview() {
  return (
    <section className="bg-surface-warm py-20 md:py-28">
      <div className="mx-auto grid max-w-[92rem] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
        <div>
          <p className="eyebrow">Demo navegable</p>
          <h2 className="mt-5 max-w-xl font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
            Recorre una operación de ejemplo sin imaginar el flujo.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            La demo muestra cómo se conectan las perspectivas principales. Los
            módulos, datos, reglas e integraciones se definen con cada cliente.
          </p>
          <ul className="mt-7 grid gap-3 text-ink-soft">
            {perspectives.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
          <a
            href="/demo?ref=landing-preview"
            className="soft-press mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-900 px-7 font-semibold text-white"
          >
            Explorar operación de ejemplo <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-line bg-surface p-2 shadow-mock">
          <Image
            src="/assets/flujo-tres-roles.webp"
            alt="Familias, cocina y administración conectadas en EnBandeja"
            width={1600}
            height={1000}
            sizes="(min-width:1440px) 760px, (min-width:1024px) 54vw, 96vw"
            className="w-full rounded-[1.25rem]"
          />
        </div>
      </div>
    </section>
  );
}
