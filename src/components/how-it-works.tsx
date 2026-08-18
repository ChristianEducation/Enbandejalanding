"use client";

import { Building2, ChefHat, PackageCheck, UserRound } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const pasos = [
  {
    icon: UserRound,
    label: "Apoderados",
    text: "Seleccionan alumno, días y menú; realizan la compra y reciben confirmación.",
  },
  {
    icon: ChefHat,
    label: "Cocina",
    text: "Ve cuántos almuerzos preparar y la información necesaria para la jornada.",
  },
  {
    icon: PackageCheck,
    label: "Entrega",
    text: "Busca al estudiante, confirma la entrega y evita registros duplicados.",
  },
  {
    icon: Building2,
    label: "Administración",
    text: "Centraliza pedidos, pagos, pendientes, anulaciones y reportes.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <section id="como-funciona" className="steps-section">
      <div className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">Cómo funciona</p>
          <h2>De la elección de la familia a la entrega, en cuatro pasos.</h2>
        </div>

        <ol className="steps-grid">
          {pasos.map(({ icon: Icon, label, text }, index) => (
            <motion.li
              key={label}
              className="step-card"
              initial={reduced ? false : { opacity: 0, y: 36, rotate: index % 2 === 0 ? -1.4 : 1.4, scale: 0.96 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.46, delay: index * 0.09, ease }}
            >
              <div className="flex items-center">
                <span className="step-icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{label}</h3>
              <p>{text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
