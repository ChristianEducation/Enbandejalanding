"use client";

import Image from "next/image";
import { ArrowRight, Building2, ChefHat, UserRound } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const roles = [
  {
    id: "familias",
    label: "Familias",
    icon: UserRound,
    title: "Elegir debería sentirse simple.",
    text: "Seleccionan alumno, días y menú, realizan la compra y reciben confirmación. Con cuenta, código o acceso directo, según la operación.",
    image: "/assets/portal-apoderado-900x1900.webp",
    photo: "/images/family-portal-v2.webp",
    kind: "phone",
  },
  {
    id: "cocina",
    label: "Cocina",
    icon: ChefHat,
    title: "Producir con una visión compartida.",
    text: "Consolidado diario, cantidades a preparar y la información necesaria para la jornada, sin cambiar la lógica de terreno que hace funcionar al equipo.",
    image: "/assets/cocina-1600x1000.webp",
    photo: "/images/kitchen-operations-v2.webp",
    kind: "desktop",
  },
  {
    id: "administracion",
    label: "Administración",
    icon: Building2,
    title: "Controlar sin perseguir información.",
    text: "Pedidos, pagos, pendientes, anulaciones, menús, precios, horarios y reportes centralizados, con exportación cuando la necesitas.",
    image: "/assets/administracion-1600x1000.webp",
    photo: "/images/multisite-operations-v2.webp",
    kind: "desktop",
  },
];

const implementation = [
  ["01", "Entendemos tu operación", "Colegios, menús, pagos, reglas y forma actual de trabajo."],
  ["02", "Configuramos EnBandeja", "Adaptamos parámetros, menús, horarios, precios, nómina y módulos correspondientes."],
  ["03", "Probamos contigo", "Validamos el flujo de apoderados, cocina, entrega y administración."],
  ["04", "Pasamos a producción", "Capacitación y puesta en marcha acompañada."],
];

export function PlatformStory() {
  const [active, setActive] = useState(roles[0]);
  const reduced = useReducedMotion();

  return (
    <>
      <section id="plataforma" className="roles-section">
        <div className="section-shell">
          <div className="section-heading">
            <p className="eyebrow">Una plataforma, distintas perspectivas</p>
            <h2>Cada persona ve lo que necesita. Toda la operación permanece conectada.</h2>
          </div>
          <div className="role-tabs" role="tablist" aria-label="Perspectivas de la plataforma">
            {roles.map((role) => {
              const Icon = role.icon;
              const selected = active.id === role.id;
              return (
                <button
                  key={role.id}
                  id={`role-tab-${role.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="role-panel"
                  onClick={() => setActive(role)}
                  className={selected ? "is-active" : ""}
                >
                  <Icon aria-hidden="true" /> {role.label}
                </button>
              );
            })}
          </div>
          <div id="role-panel" role="tabpanel" aria-labelledby={`role-tab-${active.id}`} className="role-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="role-panel-inner"
              >
                <div className="role-copy">
                  <span>0{roles.findIndex((role) => role.id === active.id) + 1}</span>
                  <h3>{active.title}</h3>
                  <p>{active.text}</p>
                  <a href="/demo?ref=roles">
                    Recorrer esta perspectiva <ArrowRight aria-hidden="true" />
                  </a>
                </div>
                <div className="role-visual">
                  <Image src={active.photo} alt="" fill sizes="(min-width: 1024px) 48vw, 100vw" className="role-photo" />
                  <motion.div
                    className={`role-screen role-screen-${active.kind}`}
                    initial={reduced ? false : { opacity: 0, y: active.kind === "phone" ? 30 : 16, x: active.kind === "phone" ? 20 : 34 }}
                    animate={{ opacity: 1, y: active.kind === "phone" ? "-50%" : 0, x: 0 }}
                    transition={{ duration: 0.34 }}
                  >
                    <Image
                      src={active.image}
                      alt={`Interfaz de ${active.label} en EnBandeja`}
                      fill
                      sizes={active.kind === "phone" ? "260px" : "(min-width: 1024px) 520px, 75vw"}
                      className="object-cover object-top"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section id="implementacion" className="implementation-section">
        <div className="section-shell implementation-grid">
          <div>
            <p className="eyebrow">Implementación acompañada</p>
            <h2>Primero entendemos cómo funciona tu operación.</h2>
            <motion.div
              className="implementation-promise"
              initial={reduced ? false : { opacity: 0, y: 28, rotate: -1.5, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.52, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>Objetivo para un colegio</span>
              <strong>7–10 días hábiles</strong>
              <p>Desde que contamos con antecedentes, nómina y credenciales necesarias. Multicolegio puede requerir más tiempo.</p>
            </motion.div>
          </div>
          <ol>
            {implementation.map(([n, title, text], index) => (
              <motion.li
                key={n}
                initial={reduced ? false : { opacity: 0, x: index % 2 === 0 ? 72 : -46, y: 20, rotate: index % 2 === 0 ? 1.2 : -1.2 }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>{n}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
