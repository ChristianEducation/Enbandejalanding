const faqs = [
  [
    "¿Es una plataforma estándar o un desarrollo desde cero?",
    "Es un trabajo a medida sobre una base modular. No partimos de una hoja en blanco ni imponemos un sistema cerrado: conversamos tu operación, elegimos los módulos necesarios y configuramos reglas, accesos, pagos, reportes e implementación según tu realidad.",
  ],
  [
    "¿Cómo se procesan los pagos?",
    "La plataforma se conecta con la pasarela acordada para cada cliente. En la demo solo se representa una respuesta ficticia aprobada; no hay cobros reales.",
  ],
  [
    "¿Las familias necesitan crear una cuenta?",
    "No necesariamente. El acceso puede configurarse con cuenta, código, OTP, integración o un recorrido directo, según la realidad del establecimiento.",
  ],
  [
    "¿Cómo se registra la entrega?",
    "Puede configurarse con QR, ticket impreso, búsqueda, listados o el método que ya utiliza tu equipo.",
  ],
  [
    "¿Cómo se define el precio?",
    "Depende de los módulos, la implementación y el acompañamiento posterior. Puede trabajarse con implementación más mensualidad, o con un pago único y entrega acordada si quieres mantener la solución en tus manos.",
  ],
  [
    "¿La demo muestra el producto definitivo?",
    "La demo permite recorrer un caso ficticio y entender el ciclo. Los módulos, reglas, datos e integraciones se definen con cada cliente.",
  ],
];

export function FaqSection() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="eyebrow">Preguntas frecuentes</p>
        <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-ink sm:text-5xl">
          Lo importante, antes de conversar.
        </h2>
        <div className="mt-10 divide-y divide-line border-y border-line">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-5">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-ink">
                {q}
                <span className="text-2xl font-normal text-brand-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-2 pr-10 leading-relaxed text-ink-soft">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
