"use client";

import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Check,
  ChefHat,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  Layers3,
  PackageCheck,
  Settings2,
  ShoppingBasket,
  UserRound,
} from "lucide-react";
import {
  AnimatePresence,
  type MotionValue,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

const steps = [
  {
    icon: ClipboardList,
    label: "Planificar",
    text: "Menús, cupos y reglas definidos para cada establecimiento.",
  },
  {
    icon: ShoppingBasket,
    label: "Elegir",
    text: "Las familias acceden con la modalidad acordada y eligen por día.",
  },
  {
    icon: CreditCard,
    label: "Pagar",
    text: "La pasarela de cada cliente responde y el pedido sigue su curso.",
  },
  {
    icon: ChefHat,
    label: "Producir",
    text: "Cocina trabaja con cantidades, estados y prioridades visibles.",
  },
  {
    icon: PackageCheck,
    label: "Entregar",
    text: "QR, ticket, búsqueda o el método que ya funciona en terreno.",
  },
  {
    icon: CircleDollarSign,
    label: "Controlar",
    text: "Administración consolida operación, excepciones y finanzas.",
  },
];

const roles = [
  {
    id: "familias",
    label: "Familias",
    icon: UserRound,
    title: "Elegir debería sentirse simple.",
    text: "Identificación del estudiante, menú por día, revisión y pago en un flujo breve. Con cuenta, código o acceso directo, según la operación.",
    image: "/assets/portal-apoderado-900x1900.webp",
    photo: "/images/family-portal-v2.webp",
    kind: "phone",
  },
  {
    id: "cocina",
    label: "Cocina",
    icon: ChefHat,
    title: "Producir con una visión compartida.",
    text: "Cantidades, preparación, listo para entrega y entrega registrada, sin cambiar la lógica de terreno que hace funcionar al equipo.",
    image: "/assets/cocina-1600x1000.webp",
    photo: "/images/kitchen-operations-v2.webp",
    kind: "desktop",
  },
  {
    id: "administracion",
    label: "Administración",
    icon: Building2,
    title: "Controlar sin perseguir información.",
    text: "Una visión consolidada de establecimientos, ventas y excepciones para coordinar la operación y actuar donde realmente hace falta.",
    image: "/assets/administracion-1600x1000.webp",
    photo: "/images/multisite-operations-v2.webp",
    kind: "desktop",
  },
];

const implementation = [
  ["01", "Levantamiento", "Revisamos actores, reglas, pagos, producción y entrega."],
  ["02", "Configuración", "Definimos módulos, accesos, integraciones y prioridades."],
  ["03", "Validación", "Probamos el flujo con tu equipo antes de llevarlo a terreno."],
  ["04", "Acompañamiento", "Medimos, ajustamos y sostenemos la adopción operacional."],
];

export function PlatformStory() {
  const [active, setActive] = useState(roles[0]);
  const reduced = useReducedMotion();
  const cycleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cycleRef,
    offset: ["start 62%", "end 64%"],
  });
  const scaleX = useTransform(scrollYProgress, [0.08, 0.9], [0, 1]);

  return (
    <>
      <section id="ciclo" ref={cycleRef} className="cycle-section">
        <div className="section-shell cycle-sticky">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Un ciclo, una sola fuente de verdad</p>
              <h2>De la planificación a la entrega, sin perder el hilo.</h2>
            </div>
            <p>
              Cada paso alimenta al siguiente. Lo importante no es automatizar
              lo obvio, sino darle continuidad y visibilidad a toda la operación.
            </p>
          </div>
          <div className="cycle-track">
            <div className="cycle-line" aria-hidden="true">
              <motion.span style={reduced ? { scaleX: 1 } : { scaleX }} />
            </div>
            {steps.map(({ icon, label, text }, index) => (
              <CycleStep
                key={label}
                icon={icon}
                index={index}
                label={label}
                progress={scrollYProgress}
                reduced={!!reduced}
                text={text}
              />
            ))}
          </div>
        </div>
      </section>

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

      <section id="modulos" className="modular-section">
        <div className="section-shell modular-grid">
          <div className="modular-copy">
            <p className="eyebrow">Modular por diseño</p>
            <h2>Una base sólida. La configuración que tu operación necesita.</h2>
            <p>
              EnBandeja no parte de una hoja en blanco. Los módulos comparten
              una misma arquitectura y se configuran según reglas, accesos,
              pasarelas, establecimientos y logística.
            </p>
            <ul>
              <li><Check aria-hidden="true" /> Portal para familias</li>
              <li><Check aria-hidden="true" /> Cocina y producción</li>
              <li><Check aria-hidden="true" /> Administración y finanzas</li>
              <li><Check aria-hidden="true" /> POS, kiosco e integraciones</li>
            </ul>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.94, y: 28 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55 }}
            className="module-composition"
            aria-label="Módulos conectados de EnBandeja"
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.86 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.55 }}
              transition={{ duration: 0.45, delay: 0.06 }}
              className="module-core"
            >
              <Settings2 aria-hidden="true" />
              <strong>EnBandeja</strong>
              <span>Núcleo operacional</span>
            </motion.div>
            {["path-a", "path-b", "path-c", "path-d"].map((path, index) => (
              <motion.div
                key={path}
                className={`module-path ${path}`}
                aria-hidden="true"
                initial={reduced ? false : { opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.42, delay: 0.18 + index * 0.06 }}
              />
            ))}
            {[
              { className: "node-a", icon: Layers3, label: "Familias" },
              { className: "node-b", icon: ChefHat, label: "Cocina" },
              { className: "node-c", icon: Building2, label: "Administración" },
              { className: "node-d", icon: CircleDollarSign, label: "Finanzas" },
            ].map(({ className, icon: Icon, label }, index) => (
              <motion.div
                key={label}
                className={`module-node ${className}`}
                initial={reduced ? false : { opacity: 0, y: index < 2 ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.38, delay: 0.28 + index * 0.07 }}
              >
                <Icon aria-hidden="true" /> {label}
              </motion.div>
            ))}
          </motion.div>
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
              <span>Promesa de partida</span>
              <strong>7 dias habiles</strong>
              <p>Construccion, implementacion y comienzo de marcha blanca.</p>
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

type CycleStepProps = {
  icon: LucideIcon;
  index: number;
  label: string;
  progress: MotionValue<number>;
  reduced: boolean;
  text: string;
};

function CycleStep({ icon: Icon, index, label, progress, reduced, text }: CycleStepProps) {
  const start = 0.08 + index * 0.135;
  const mid = start + 0.08;
  const end = Math.min(start + 0.18, 0.96);
  const opacity = useTransform(progress, [0, mid, end], [1, 1, 1]);
  const y = useTransform(progress, [0, start, mid, end], [0, 0, -20, -14]);
  const x = useTransform(progress, [0, start, mid, end], [0, 0, index % 2 === 0 ? -12 : 12, index % 2 === 0 ? -8 : 8]);
  const scale = useTransform(progress, [0, start, mid, end], [1, 1, 1.07, 1.035]);
  const rotate = useTransform(progress, [0, start, mid, end], [0, 0, index % 2 === 0 ? -2.4 : 2.4, index % 2 === 0 ? -0.8 : 0.8]);
  const iconY = useTransform(progress, [0, start, mid, end], [0, 0, -18, -10]);
  const iconScale = useTransform(progress, [0, start, mid, end], [1, 1, 1.18, 1.08]);
  const iconRotate = useTransform(progress, [0, start, mid, end], [0, 0, index % 2 === 0 ? -10 : 10, index % 2 === 0 ? -3 : 3]);

  return (
    <motion.article
      className="cycle-step"
      style={reduced ? undefined : { opacity, y, x, scale, rotate }}
    >
      <div className="cycle-number">{String(index + 1).padStart(2, "0")}</div>
      <motion.span className="cycle-icon-wrap" style={reduced ? undefined : { y: iconY, scale: iconScale, rotate: iconRotate }}>
        <Icon aria-hidden="true" />
      </motion.span>
      <h3>{label}</h3>
      <p>{text}</p>
    </motion.article>
  );
}
