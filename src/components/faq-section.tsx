"use client";

import { motion, useReducedMotion } from "motion/react";

const faqs = [
  [
    "¿EnBandeja es un desarrollo a medida?",
    "EnBandeja no se arma desde cero para cada colegio: partimos de una plataforma ya probada que personalizamos según tu operación — y si necesitas algo muy puntual fuera de eso, se conversa aparte. Por eso la primera versión puede estar lista en días, no meses.",
  ],
  [
    "¿Cobran comisión por cada pago?",
    "EnBandeja no cobra comisión por transacción. La pasarela de pago mantiene sus propios costos y comisiones.",
  ],
  [
    "¿Cómo se paga la implementación?",
    "50% al inicio y 50% al pasar a producción.",
  ],
  [
    "¿Cuánto tarda la implementación?",
    "Para un colegio, la puesta en marcha estándar apunta a 7–10 días hábiles desde que contamos con la información y accesos necesarios. Una operación multicolegio puede requerir más tiempo.",
  ],
  [
    "¿Necesito instalar algo o comprar hardware?",
    "No. Es una plataforma web. La entrega puede hacerse con QR desde el celular, ticket impreso, búsqueda manual u otro método — sin hardware adicional en el producto base.",
  ],
  [
    "¿Se integra con el sistema que ya usa el colegio?",
    "No por defecto. Si tu operación necesita una integración específica, se evalúa y cotiza aparte.",
  ],
  [
    "¿Incluye soporte?",
    "Sí. La mensualidad incluye hosting, base de datos, respaldos, mantenimiento, soporte técnico y corrección de incidencias.",
  ],
  [
    "¿Dónde se alojan los datos y qué tan seguros están?",
    "Tus datos se alojan en infraestructura en la nube, con respaldos periódicos para mantenerlos íntegros y disponibles. Los pagos se procesan a través de la pasarela que elijas — no quedan almacenados en nuestros servidores.",
  ],
  [
    "¿Hay permanencia mínima o puedo dejar de usar EnBandeja cuando quiera?",
    "No hay permanencia mínima: puedes dejar de operar en EnBandeja cuando lo necesites — lo que se detiene es la mensualidad del servicio. La plataforma y su código siguen siendo parte del producto EnBandeja.",
  ],
];

export function FaqSection() {
  const reduced = useReducedMotion();

  return (
    <section className="faq-section-v2">
      <div className="section-shell" style={{ maxWidth: "50rem", marginInline: "auto" }}>
        <div className="section-heading">
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2>Lo importante, antes de conversar.</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a], index) => (
            <motion.details
              key={q}
              className="faq-item"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <summary>
                <div className="faq-item-row">
                  {q}
                  <span className="plus">+</span>
                </div>
              </summary>
              <p>{a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
