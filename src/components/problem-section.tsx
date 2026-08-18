"use client";

import { motion, useReducedMotion } from "motion/react";

export function ProblemSection() {
  const reduced = useReducedMotion();

  return (
    <section id="problema" className="problem-section">
      <div className="section-shell">
        <motion.div
          className="section-heading"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">El problema</p>
          <h2>Menos planillas, comprobantes y listas separadas.</h2>
        </motion.div>
        <motion.p
          className="problem-lead"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Si tu operación todavía depende de transferencias, comprobantes por
          WhatsApp o correo, nóminas manuales y listas separadas para cocina
          y entrega, EnBandeja reúne el proceso en un solo flujo.
        </motion.p>
      </div>
    </section>
  );
}
