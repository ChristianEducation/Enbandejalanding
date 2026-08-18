"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { track } from "@/lib/analytics";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -42]);
  const windowY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -82]);
  const windowRotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -2.5]);
  const noteY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -32]);
  const enter = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 34, scale: 0.985 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.72, delay, ease },
  });

  return (
    <section id="inicio" ref={heroRef} className="hero-v2">
      <div className="hero-v2-grid">
        <div className="hero-v2-copy">
          <motion.p {...enter(0)} className="eyebrow">
            Para casinos escolares y concesionarias
          </motion.p>
          <motion.h1 {...enter(0.08)}>
            El casino escolar, <em>en un solo lugar</em>.
          </motion.h1>
          <motion.p {...enter(0.16)} className="hero-v2-lead">
            Centraliza pedidos, pagos, cocina y entregas en una plataforma
            configurada a tu forma de operar.
          </motion.p>
          <motion.div {...enter(0.24)} className="hero-v2-actions">
            <motion.a
              href="#contacto"
              className="button-primary"
              whileHover={reduced ? undefined : { y: -3, scale: 1.025 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              onClick={() => track("hero_demo_click")}
            >
              Agendar una demo <ArrowRight aria-hidden="true" />
            </motion.a>
            <motion.a
              href="#planes"
              className="button-secondary"
              whileHover={reduced ? undefined : { y: -3, scale: 1.02 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              onClick={() => track("hero_plans_click")}
            >
              Ver planes
            </motion.a>
          </motion.div>
          <motion.p {...enter(0.32)} className="hero-v2-proof">
            Sin comisión de EnBandeja por transacción · Implementación
            acompañada · Para casinos escolares y concesionarias
          </motion.p>
        </div>

        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.94, x: 58, rotate: 1.5 }}
          animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease }}
          className="hero-v2-visual"
          style={reduced ? undefined : { y: visualY }}
        >
          <Image
            src="/images/hero-cafeteria-v2.webp"
            alt="Equipo de alimentacion escolar coordinando el servicio de almuerzo"
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="hero-v2-photo"
          />
          <motion.div
            className="hero-product-window"
            aria-label="Vista de administracion de EnBandeja"
            initial={reduced ? false : { opacity: 0, y: 46, x: -22, rotate: -2.5, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
            transition={{ duration: 0.72, delay: 0.36, ease }}
            style={reduced ? undefined : { y: windowY, rotate: windowRotate }}
          >
            <div className="product-window-bar">
              <span />
              <span />
              <span />
              <strong>Operacion en vivo</strong>
            </div>
            <div className="product-window-screen">
              <Image
                src="/assets/administracion-1600x1000.webp"
                alt="Panel general de la plataforma EnBandeja"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 82vw"
                className="object-cover object-top"
              />
            </div>
          </motion.div>
          <motion.div
            className="hero-flow-note"
            aria-hidden="true"
            initial={reduced ? false : { opacity: 0, x: 36, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.5, ease }}
            style={reduced ? undefined : { y: noteY }}
          >
            <span>Familias</span>
            <i />
            <span>Cocina</span>
            <i />
            <span>Administracion</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
