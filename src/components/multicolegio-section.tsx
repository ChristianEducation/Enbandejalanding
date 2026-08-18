"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function MulticolegioSection() {
  const reduced = useReducedMotion();

  return (
    <section id="multicolegio" className="multicolegio-section">
      <div className="section-shell" style={{ maxWidth: "56rem", marginInline: "auto" }}>
        <motion.p
          className="eyebrow"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.48, ease }}
        >
          Concesionarias
        </motion.p>
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.06, ease }}
        >
          Una sola concesionaria. Varios colegios. Una visión consolidada.
        </motion.h2>
        <motion.p
          className="multicolegio-lead"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.12, ease }}
        >
          Gestiona cada colegio por separado —alumnos, cursos, producción,
          pagos y entregas— y revisa la operación general desde un mismo
          panel.
        </motion.p>

        <motion.p
          className="multicolegio-note"
          initial={reduced ? false : { opacity: 0, y: 20, scale: 0.97 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.48, delay: 0.16, ease }}
        >
          Multicolegio parte en 2 colegios. Cada colegio adicional suma{" "}
          <strong>$250.000 de implementación + $30.000/mes</strong>. Si la
          operación multicolegio necesita Cafetería, se agrega{" "}
          <strong>$200.000 de implementación + $20.000/mes</strong> por
          operación.
        </motion.p>
        <a href="#contacto" className="multicolegio-cta">
          Hablar sobre mi operación multicolegio <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
