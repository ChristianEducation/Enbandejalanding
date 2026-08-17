import { Rocket, Search, SlidersHorizontal } from "lucide-react";

const steps = [
  { icon: Search, n: "01", title: "Entendemos la operación", text: "Revisamos actores, pedidos, pagos, producción y entrega tal como funcionan hoy." },
  { icon: SlidersHorizontal, n: "02", title: "Configuramos el flujo", text: "Definimos módulos, reglas, accesos, pasarela y modalidades de entrega con tu equipo." },
  { icon: Rocket, n: "03", title: "Validamos en conjunto", text: "Probamos el recorrido acordado, ajustamos prioridades y preparamos su adopción en terreno." },
];

export function HowItWorks() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="section-kicker">Implementación acompañada</p>
        <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">Primero entendemos cómo funciona tu operación.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, n, title, text }) => <article key={n} className="premium-card rounded-[1.5rem] p-6"><div className="flex items-center justify-between"><Icon className="h-6 w-6 text-brand-700" /><span className="text-sm font-bold text-warm-700">{n}</span></div><h3 className="mt-8 font-display text-xl font-bold text-ink">{title}</h3><p className="mt-3 leading-relaxed text-ink-soft">{text}</p></article>)}
        </div>
      </div>
    </section>
  );
}
