"use client";

import { Boxes, CalendarClock, Handshake, LifeBuoy, WalletCards } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const items = [
  {
    icon: Boxes,
    title: "Modulos",
    text: "Portal para familias, cocina, administracion, pagos, reportes, POS, kiosco o integraciones segun lo que tu operacion necesita.",
  },
  {
    icon: Handshake,
    title: "Implementacion",
    text: "Levantamiento, configuracion, ajustes, pruebas con tu equipo y puesta en marcha acompanada.",
  },
  {
    icon: LifeBuoy,
    title: "Continuidad",
    text: "Soporte, mejoras, nuevos flujos y acompanamiento posterior si prefieres mantener una evolucion mensual.",
  },
];

const options = [
  {
    title: "Implementacion + mensualidad",
    text: "Para operar con soporte, ajustes continuos y evolucion del sistema en el tiempo.",
  },
  {
    title: "Pago unico y entrega",
    text: "Para proyectos donde prefieres dejar la solucion en tus manos, con alcances acordados desde el inicio.",
  },
];

export function PricingSection() {
  const reduced = useReducedMotion();
  const revealY = reduced ? 0 : 26;
  const revealX = reduced ? 0 : 24;

  return (
    <section id="inversion" className="pricing-section">
      <div className="section-shell pricing-grid">
        <motion.div
          className="pricing-copy"
          initial={reduced ? false : { opacity: 0, y: revealY }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow">Inversion flexible</p>
          <h2>Se conversa, se define y se cotiza segun tu operacion.</h2>
          <p>
            No vendemos un plan cerrado. Primero entendemos como funciona tu
            casino, que modulos conviene activar y que nivel de soporte necesitas
            despues de la puesta en marcha.
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
              <strong>7 dias habiles</strong>
              <span>Construccion, implementacion y comienzo de marcha blanca.</span>
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
              <strong>Dos formas de trabajarlo</strong>
              <span>Mensualidad o pago unico, segun el acuerdo.</span>
            </div>
          </div>

          <div className="pricing-options">
            {options.map((option, index) => (
              <motion.article
                key={option.title}
                initial={reduced ? false : { opacity: 0, x: index % 2 === 0 ? revealX : -revealX, y: 18, rotate: index % 2 === 0 ? 1 : -1 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.42,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span>{option.title}</span>
                <p>{option.text}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="section-shell pricing-items">
        {items.map(({ icon: Icon, title, text }, index) => (
          <motion.article
            key={title}
            initial={reduced ? false : { opacity: 0, y: 42, x: index === 1 ? 0 : index === 0 ? -28 : 28, rotate: index === 1 ? 0 : index === 0 ? -1.6 : 1.6, scale: 0.96 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.42,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Icon aria-hidden="true" />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
