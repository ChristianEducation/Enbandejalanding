import Image from "next/image";

const painPoints = [
  "Pedidos dispersos en mensajes",
  "Pagos separados de la operación",
  "Cocina trabajando con listados desactualizados",
  "Entregas difíciles de seguir",
];

export function ProblemSection() {
  return (
    <section id="problema" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="section-kicker">Cuando cada canal opera por separado</p>
        <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
          El problema no es una tarea: es la desconexión entre todas
        </h2>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.16fr_.84fr]">
          <Image
            src="/assets/problema-operacional.webp"
            alt="Composición conceptual de pedidos, pagos y cocina fragmentados"
            width={1600}
            height={1000}
            sizes="(min-width:1280px) 720px, (min-width:1024px) 58vw, 100vw"
            className="w-full rounded-[2rem] border border-line shadow-card"
          />
          <ol className="border-l border-warm-600/40 pl-7">
            {painPoints.map((text, index) => (
              <li key={text} className="relative py-5">
                <span className="absolute -left-[2.1rem] top-6 flex h-5 w-5 items-center justify-center rounded-full bg-warm-600 text-[10px] font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-lg font-semibold text-ink">{text}</p>
              </li>
            ))}
          </ol>
        </div>

        <blockquote className="mx-auto mt-12 max-w-4xl border-l-4 border-warm-600 bg-warm-50/60 p-6 text-xl font-medium leading-relaxed text-ink">
          Cuando el pago, el pedido y la producción no comparten el mismo estado, el equipo dedica tiempo a coordinar, corregir y aclarar información durante toda la jornada.
        </blockquote>
      </div>
    </section>
  );
}
