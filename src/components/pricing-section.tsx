"use client";

import { ArrowRight, CalendarClock, Check, ChefHat, Layers3, WalletCards } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { track } from "@/lib/analytics";

const modalidades = [
  {
    id: "almuerzos",
    nombre: "EnBandeja Almuerzos",
    implementacion: "$690.000",
    mensualidad: "$119.000",
    cobertura: "1 colegio",
    texto: "Digitaliza el circuito completo del almuerzo en un solo colegio.",
    features: {
      items: [
        "Portal de apoderados mobile first",
        "Pago online integrado",
        "Cocina, entrega y anulaciones",
        "Administración, reportes y exportación",
      ],
    },
  },
  {
    id: "cafeteria",
    nombre: "EnBandeja + Cafetería",
    implementacion: "$890.000",
    mensualidad: "$139.000",
    cobertura: "1 colegio",
    texto: "Para colegios que además administran venta anticipada de cafetería.",
    features: {
      leadIn: "Todo lo de EnBandeja Almuerzos, más:",
      items: [
        "Catálogo de productos de cafetería",
        "Compra anticipada para recreos u horarios",
        "Control de preparación y entrega",
      ],
    },
    event: "cafeteria_interest" as const,
  },
  {
    id: "multicolegio",
    nombre: "EnBandeja Multicolegio",
    implementacion: "$1.190.000",
    mensualidad: "$179.000",
    cobertura: "2 colegios",
    texto: "Para concesionarias que operan más de un colegio.",
    features: {
      leadIn: "Todo lo de EnBandeja Almuerzos, más:",
      items: [
        "Datos y operación separados por colegio",
        "Panel consolidado para el operador",
        "Reportes por colegio y visión general",
      ],
    },
    event: "multicolegio_interest" as const,
  },
];

const mensualidadIncluye = [
  "Hosting y base de datos",
  "Respaldos y monitoreo",
  "Soporte técnico e incidencias",
  "Mantenimiento y actualizaciones",
  "Subdominio de operación",
];

export function PricingSection() {
  const reduced = useReducedMotion();
  const revealY = reduced ? 0 : 26;

  return (
    <section id="planes" className="pricing-section">
      <div className="section-shell pricing-grid">
        <motion.div
          className="pricing-copy"
          initial={reduced ? false : { opacity: 0, y: revealY }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Inversión flexible</p>
          <h2>Elige la modalidad que corresponde a tu operación.</h2>
          <p>
            La modalidad no depende de qué funciones premium quieres, sino de
            cómo opera tu casino: un colegio con almuerzos, un colegio con
            almuerzos y cafetería, o una concesionaria con más de un colegio.
            Sin comisión de EnBandeja por transacción.
          </p>
          <motion.div
            className="pricing-promise"
            initial={reduced ? false : { opacity: 0, x: -42, y: 16, rotate: -1.5 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <CalendarClock aria-hidden="true" />
            <div>
              <strong>7–10 días hábiles</strong>
              <span>Para un colegio, desde antecedentes y credenciales completas.</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="pricing-panel"
          initial={reduced ? false : { opacity: 0, y: 46, x: 30, rotate: 1.8, scale: 0.96 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.48, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pricing-panel-head">
            <WalletCards aria-hidden="true" />
            <div>
              <strong>Qué incluye la mensualidad</strong>
              <span>Además del módulo de tu modalidad</span>
            </div>
          </div>

          <div className="pricing-options">
            {mensualidadIncluye.map((item, index) => (
              <motion.article
                key={item}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.36, delay: index * 0.05 }}
              >
                <span>{item}</span>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="section-shell pricing-items">
        {modalidades.map(({ id, nombre, implementacion, mensualidad, cobertura, texto, features, event }, index) => (
          <motion.article
            key={id}
            initial={reduced ? false : { opacity: 0, y: 42, x: index === 1 ? 0 : index === 0 ? -28 : 28, rotate: index === 1 ? 0 : index === 0 ? -1.6 : 1.6, scale: 0.96 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.42, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onViewportEnter={index === 0 ? () => track("pricing_view") : undefined}
            onMouseEnter={event ? () => track(event) : undefined}
          >
            {id === "multicolegio" ? (
              <Layers3 aria-hidden="true" />
            ) : id === "cafeteria" ? (
              <ChefHat aria-hidden="true" />
            ) : (
              <WalletCards aria-hidden="true" />
            )}
            <h3>{nombre}</h3>
            <p>{texto}</p>
            <p className="pricing-item-coverage">{cobertura}</p>

            <div className="pricing-card-price">
              <strong>{mensualidad}</strong>
              <span>/mes</span>
            </div>
            <p className="pricing-card-implementation">
              + <strong>{implementacion}</strong> implementación (pago único)
            </p>

            <ul className="pricing-card-features">
              {features.leadIn && <li className="is-lead-in">{features.leadIn}</li>}
              {features.items.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <a href="#contacto" className="pricing-item-cta">
              Conversemos de esta modalidad <ArrowRight aria-hidden="true" />
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
