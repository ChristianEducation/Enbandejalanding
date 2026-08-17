# EnBandeja Landing — Contexto del proyecto

> Este archivo se lee automáticamente al iniciar una sesión de Claude
> Code en esta carpeta. Contiene el contexto de negocio y las reglas
> del proyecto. El detalle de qué construir (contenido, formulario,
> tono, motion, diseño) está en `PROMPT-LANDING.md` — leer ambos antes
> de codificar.

## Directiva de tokens (aplica a toda la sesión)

Prioriza respuestas concisas. No narres cada paso ni expliques lo
obvio. No releas archivos que no cambiaron. No generes explicaciones
largas cuando una frase basta. Actúa y reporta resultado, no proceso.

## Contexto de negocio

**EnBandeja** es una agencia/empresa (no un SaaS genérico) que crea
software a medida para casinos escolares y concesionarios de
alimentación, sobre una base de código ya probada (el producto
"Enbandeja", un sistema de pedidos/pagos/logística para casinos
escolares, construido en un repo hermano a este).

Modelo de negocio: cada cliente recibe su **propia instancia
independiente** del producto, adaptada a su operación (no un SaaS
multi-tenant compartido — eso es una fase futura, no la actual).

Pitch comercial ancla: **"primera versión operativa en 7 días"**
(nunca "sistema completo en 7 días" — la promesa correcta es una
primera versión funcional y ajustada a su flujo real).

Esta landing es el primer punto de contacto para prospectos que
reciben un mensaje personalizado (WhatsApp o correo) invitándolos a
visitarla. El objetivo NO es solo mostrar el producto — es **capturar
leads reales** (nombre, casino/colegio, ciudad, email, WhatsApp, cómo
gestionan hoy sus pedidos) para hacer seguimiento comercial manual
después.

Dominio: `.cl` está tomado — usar `.app` (ej. `enbandeja.app`) salvo
que se confirme lo contrario. Dejar el dominio de contacto como
variable de entorno, nunca hardcodeado en el código.

## Por qué este proyecto está separado del producto

Este repo es independiente del repo del producto Enbandeja (carpeta
hermana en el mismo disco). Es una decisión deliberada:
- Los leads son datos de venta/marketing, no datos de un tenant
  operativo — no deben vivir en la misma base de datos que clientes
  reales pagando.
- Deploys independientes — un cambio en la landing no debe poder
  afectar el build del producto, ni viceversa.
- Historial de Git separado — commits de copy/diseño no se mezclan
  con ingeniería del producto.

**No sigas las reglas de stack del producto Enbandeja** (versiones
exactas pineadas, Turborepo, etc.) — este es un proyecto Next.js
independiente y más simple, con su propio criterio de versiones
(usar versiones estables recientes de todo).

## Requisito no negociable: funcional Y atractiva

El objetivo real es capturar leads — el formulario debe persistir de
verdad, validar de verdad, manejar errores de verdad. Pero "funcional
no decorativa" no significa sosa: si hay que elegir en un conflicto
real, prioriza que funcione, pero eso no es excusa para entregar algo
plano. Debe verse profesional y confiable frente a directores de
colegio y administradores de casino — el público NO es técnico.

## Stack técnico

- Next.js 14+ (App Router), TypeScript
- Tailwind CSS
- Supabase (Postgres) para persistir leads
- Prisma como ORM
- Deploy en Vercel
- Resend (o similar) para notificación por correo de lead nuevo — si
  no hay API key disponible, dejar como función aislada y
  documentada, el guardado en base de datos debe funcionar sin
  depender de esto

**Antes de empezar a codificar:** confirmar con el usuario si ya
existe un proyecto de Supabase para reusar (mencionó un proyecto sin
uso que planea donar a esto) o si hay que crear uno nuevo — no asumir.

## Mejores prácticas aplicadas (investigación 2026, con fuentes)

Investigado antes de construir — ya reflejado en las decisiones de
`PROMPT-LANDING.md`, dejarlo como referencia de por qué:

- **Headline corto**: H1 bajo 8 palabras/44 caracteres — el título de
  esta landing ya cumple.
- **Menos campos = más conversión** (formularios de 3 campos ~25%,
  7+ campos <15%), pero el formulario de 6 campos se mantiene a
  propósito — cada campo califica al lead para el seguimiento
  comercial manual posterior, no es venta de un clic.
- **Un solo CTA convierte mejor que varios** (13.5% vs 10.5%). El CTA
  secundario del hero es solo un ancla de scroll, no una acción
  competidora — está bien tal como está, no agregar un tercero en
  ningún lado de la página.
- **Prueba social visible temprano**: ~83% confía más con señales de
  clientes reales visibles. Por eso la frase de credibilidad (ver
  `PROMPT-LANDING.md`, sección 7) debe tener también una versión
  corta cerca del hero — no esperar hasta el final de la página para
  mostrarla.
- **Mobile-first no negociable**: la mayoría de las visitas son
  mobile.

Fuentes: [SaaS Hero — landing page trends 2026](https://www.saashero.net/design/landing-page-design-inspiration-2026/), [Leadfeeder — landing page best practices 2026](https://www.leadfeeder.com/blog/conversion-optimization/landing-pages-convert/), [Growthspree — B2B SaaS benchmarks 2026](https://www.growthspreeofficial.com/blogs/b2b-saas-landing-page-best-practices-demo-conversion-2026).

## Skill de diseño a instalar antes de empezar a codificar

Instalar antes de generar cualquier componente visual — mejora
significativamente el resultado y ayuda a evitar el look genérico
"hecho con IA" que el usuario quiere evitar a toda costa:

**`ui-ux-pro-max-skill`** — diseño general (estilos, paletas,
tipografía, guías de UX), soporta Next.js + Tailwind nativamente:
```
npm install -g ui-ux-pro-max-cli
uipro init --ai claude
```
(correr desde la raíz de este proyecto)

Si falla al instalar, **no bloquear el trabajo por esto** — avisar al
usuario y continuar con las guías de diseño de `PROMPT-LANDING.md`
(Dirección visual, Motion y scroll).

## Imágenes / capturas de pantalla

**Estado al momento de escribir esto: NO hay capturas reales todavía.**
El plan es que el usuario capture screenshots reales de la app
Enbandeja (producto) en pantallas clave — probablemente después de un
pase de pulido UI/UX en la app del Apoderado, que es lo que más se
va a mostrar. Pantallas candidatas: `/home` (pedido semanal del
apoderado), `/resumen` (crédito y pago), `/confirmacion`, `/cocina`
(dashboard de cocina), reportes del operador.

**Mientras no existan:** construir toda la landing con espacios
claramente reservados para estas imágenes (contenedores con
proporción/tamaño definido, no genéricos), usando ilustraciones o
composiciones simples con la paleta del sitio en su lugar — nunca
fotos de stock de comida o gente genérica, eso se ve peor que no
tener imagen. Cuando el usuario traiga las capturas reales, deben
poder reemplazar esos espacios sin rehacer el layout.
