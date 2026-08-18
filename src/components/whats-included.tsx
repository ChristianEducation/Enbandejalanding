"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const items = [
  "Portal mobile first para apoderados.",
  "Pago online integrado.",
  "Consolidado de producción para cocina.",
  "Control digital de entrega.",
  "Anulaciones y ausencias configurables.",
  "Pagos externos y pendientes cuando la operación lo necesite.",
  "Administración, reportes y exportación.",
  "Configuración inicial, carga de alumnos y puesta en marcha.",
  "Hosting, soporte y mantenimiento incluidos en la mensualidad.",
];

export function WhatsIncluded() {
  const reduced = useReducedMotion();

  return (
    <section className="included-section">
      <div className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">Qué incluye EnBandeja</p>
          <h2>El producto base, sin funciones escondidas.</h2>
        </div>

        <ul className="included-grid">
          {items.map((item, index) => (
            <motion.li
              key={item}
              className="included-item"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: (index % 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="check">
                <Check aria-hidden="true" />
              </span>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
