import { School, Store, Building2, Truck, CalendarCheck } from "lucide-react";

const PERFILES = [
  { icon: Store, texto: "Casinos escolares" },
  { icon: School, texto: "Concesionarios dentro de colegios" },
  { icon: Building2, texto: "Colegios con casino propio" },
  { icon: Truck, texto: "Empresas de alimentación escolar" },
  { icon: CalendarCheck, texto: "Casinos con pedidos recurrentes y operación diaria" },
];

export function AudienceSection() {
  return (
    <section className="border-y border-line bg-surface py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          ¿Para quién es EnBandeja?
        </h2>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {PERFILES.map(({ icon: Icon, texto }) => (
            <li
              key={texto}
              className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-800"
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {texto}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
