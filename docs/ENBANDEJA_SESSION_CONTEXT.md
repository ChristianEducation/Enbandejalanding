# EnBandeja Landing - Contexto de Sesion

Ultima actualizacion: 2026-07-25

## Objetivo del proyecto

Landing page para EnBandeja, una agencia/plataforma que construye software a medida para casinos escolares, cafeterias escolares y operaciones de almuerzo escolar.

La pagina debe sentirse como un servicio B2B premium para educacion y food service: moderna, confiable, clara, calida y profesional. No debe sentirse gamer, infantil, demasiado playful ni demasiado generica.

## Direccion visual aprobada

- Estetica clara, limpia y profesional.
- Paleta base azul con acento coral/naranjo suave.
- Fondo claro tipo paper/cream con secciones suaves.
- Fotos reales de cocina escolar/familias/equipo en operacion.
- Interfaces de producto superpuestas con glassmorphism moderado.
- Motion visible y con mas presencia que una landing conservadora, pero sin rebote ni animaciones caricaturescas.
- Desktop y mobile deben sentirse cuidados; desktop no debe usar solo una parte de la pantalla.

## Mensajes importantes

- EnBandeja conecta familias, cocina, administracion y finanzas.
- Es modular y se configura alrededor de cada operacion.
- No se vende como plan cerrado.
- Primero se conversa y se entiende la operacion.
- Se cotiza segun modulos, implementacion y acompanamiento.
- Puede trabajarse con implementacion + mensualidad o pago unico y entrega.
- Promesa comercial visible: "7 dias habiles" para construccion, implementacion y comienzo de marcha blanca.

## Estado visual actual

La landing esta en buen estado general y el usuario indico que "ya esta muy buena la landing".

Ultimos ajustes aplicados:

- Hero compactado para que se vea completo al entrar en pantallas tipo 1366x768.
- Hero con parallax/motion mas notorio.
- Promesa de "7 dias habiles" agregada en hero, implementacion y pricing/inversion.
- Recuadro interno del hero con mas glassmorphism para que se vea mas la imagen de fondo.
- Timeline de pasos con sticky mas largo, sincronizado con scroll y movimiento por paso.
- Pricing/inversion convertido en seccion mas clara tipo pricing con motion.
- Header con accesos directos a Plataforma, Inversion, Demo, Consulta directa y Conversemos.

## Archivos principales tocados

- `src/components/hero.tsx`
- `src/components/platform-story.tsx`
- `src/components/pricing-section.tsx`
- `src/components/site-header.tsx`
- `src/app/globals.css`

## Secciones principales

- Header sticky con navegacion y CTA.
- Hero con texto, CTAs, promesa de 7 dias y visual de cafeteria + dashboard.
- Ciclo / workflow: planificar, elegir, pagar, producir, entregar, controlar.
- Perspectivas de plataforma: familias, cocina, administracion.
- Modulos: base operacional con nodos.
- Implementacion acompanada con promesa de partida.
- Pricing/Inversion flexible.
- Demo / lead / footer segun componentes existentes.

## Validaciones realizadas

Se corrio varias veces:

- `npx.cmd tsc --noEmit`
- `npm.cmd run build`

Ambos pasaron en la ultima validacion. El build requiere red para descargar Google Fonts via Next. El unico warning persistente fue:

- `metadataBase property in metadata export is not set... using "http://localhost:3000"`

Ese warning no bloquea el build.

## Notas de implementacion

- Se usa `motion/react` para animaciones.
- Se respeta `prefers-reduced-motion`.
- El timeline usa `useScroll` y `useTransform`.
- La seccion de ciclo tiene sticky largo en desktop y se desactiva en layouts menores.
- Evitar tocar partes no solicitadas si el usuario pide ajustes finos.

## Preferencias del usuario detectadas

- Prefiere que primero se diagnostique visualmente cuando algo se ve mal.
- Quiere motion mas expresivo, no demasiado conservador.
- Quiere que el hero se vea completo al entrar.
- Le gusta el concepto del hero actual, pero pide ajustes finos de proporcion y glass.
- Le importa mucho desktop y mobile.
- Quiere conservar claridad B2B, pero con mas vida visual.
