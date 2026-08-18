"use client";

import Image from "next/image";
import { ArrowRight, ChefHat, ClipboardCheck, UserRound } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { track } from "@/lib/analytics";

const perspectives = [
  { icon: UserRound, label: "Elección simple para familias" },
  { icon: ChefHat, label: "Producción y entrega para cocina" },
  { icon: ClipboardCheck, label: "Visión consolidada para administración" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function DemoPreview() {
  const reduced = useReducedMotion();

  return (
    <section className="demo-preview-section">
      <div className="section-shell demo-preview-grid">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="eyebrow">Demo navegable</p>
          <h2>No te lo contamos. Pruébalo.</h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
            La demo muestra un producto base completo: cómo se conectan
            familias, cocina y administración. Los datos son ficticios; los
            módulos e integraciones se definen con cada cliente.
          </p>
          <ul className="demo-preview-list">
            {perspectives.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className="icon">
                  <Icon aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
          <a
            href="/demo?ref=landing-preview"
            className="button-primary mt-8"
            onClick={() => track("demo_open")}
          >
            Ver demo <ArrowRight aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div
          className="demo-preview-frame"
          initial={reduced ? false : { opacity: 0, y: 32, x: 24, rotate: 1.2, scale: 0.96 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.1, ease }}
        >
          <Image
            src="/assets/flujo-tres-roles.webp"
            alt="Familias, cocina y administración conectadas en EnBandeja"
            width={1600}
            height={1000}
            sizes="(min-width:1440px) 760px, (min-width:1024px) 54vw, 96vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
