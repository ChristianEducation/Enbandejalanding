# Plan de lanzamiento — tareas ejecutables

## Alcance

Este backlog termina cuando la marca, demo y landing están listas para producción. Las mejoras posteriores al lanzamiento quedan fuera del spec.

Cada tarea produce un entregable comprobable. `Deps` indica dependencias obligatorias. Los gates requieren aprobación humana antes de continuar.

## Fase 0 — Baseline y decisiones iniciales

- [x] **T001 — Registrar baseline visual y técnico.** Capturar la landing actual en 375, 768, 1024 y 1440 px; registrar Lighthouse y recorrido del formulario. `Deps: —`
  - **Aceptación:** existen capturas comparables, métricas iniciales y descripción del flujo actual.
- [x] **T002 — Inventariar el sistema actual.** Documentar secciones, tokens, tipografías, iconos, motion y componentes que se conservan o reemplazan. `Deps: T001`
  - **Aceptación:** cada sección tiene decisión conservar/evolucionar/reemplazar.
- [x] **T003 — Cerrar objetivo de conversión.** Confirmar CTA primario, CTA de demo, datos imprescindibles del lead y qué sucede después del envío. `Deps: T001`
  - **Aceptación:** existe un único CTA primario y una expectativa postenvío inequívoca.

## Fase 1 — Marca y dirección visual

- [x] **T101 — Definir territorio visual.** Cerrar atributos, antiatributos, referencias y criterios de diferenciación. `Deps: T002`
  - **Aceptación:** la dirección se describe como confiable, operacional, cercana, adulta y especializada.
- [x] **T102 — Explorar tres direcciones de logo.** Desarrollar monograma modular EB, bandeja ordenada y flujo coordinado usando Prompt A1 como referencia, no como arte final. `Deps: T101`
  - **Aceptación:** cada ruta se muestra en color, monocromo, 16 px, header y app icon.
- [x] **T103 — Seleccionar y refinar el logo.** Elegir una ruta y reconstruirla como vector limpio. `Deps: T102`
  - **Aceptación:** símbolo reconocible a 16 px, sin detalles frágiles ni apariencia de stock.
- [x] **T104 — Definir sistema visual.** Cerrar paleta semántica, tipografías, escala de espacio, radios, bordes, sombras e iconografía. `Deps: T103`
  - **Aceptación:** pares de texto cumplen WCAG AA y existen tokens para landing y demo.
- [x] **T105 — Preparar kit de marca.** Exportar logo horizontal, isotipo, compacta, monocromática, fondos claro/oscuro, favicon y app icon. `Deps: T104`
  - **Aceptación:** SVG finales y raster requeridos están listos y se ven bien en tamaños objetivo.
- [x] **G1 — Aprobar marca y sistema visual.** Aprobado por el propietario el 13-07-2026 con el candidato 1 revisado de Gemini como dirección oficial de lanzamiento. `Deps: T101–T105`

## Fase 2 — Diseño funcional de la demo

- [x] **T201 — Cerrar identidad ficticia y disclaimer.** Validar un nombre no confundible con una institución relevante y redactar el aviso de demostración. `Deps: —`
  - **Aceptación:** ningún nombre, dominio o dato parece pertenecer a una entidad real.
- [x] **T202 — Construir dataset semilla.** Definir cursos, alumnos, cinco días de menú, alternativas, pedidos, pagos y observaciones ficticias. `Deps: T201`
  - **Aceptación:** el dataset cubre los tres recorridos sin PII ni datos ambiguamente reales.
- [x] **T203 — Modelar el pedido conectado.** Definir estados y eventos Apoderado → Administración → Cocina, incluido reinicio. `Deps: T202`
  - **Aceptación:** cada acción tiene estado anterior, acción y consecuencia visible.
- [x] **T204 — Diseñar flujo Apoderado.** Wireframes responsive de alumno, menú semanal, selección, resumen, pasarela ficticia, confirmación y estado. `Deps: T202,T203,G1`
  - **Aceptación:** el happy path se completa sin pedir datos reales.
- [x] **T205 — Diseñar flujo Administración.** Wireframes responsive de resumen, filtros, pedidos, trazabilidad, excepciones y consolidado automático. `Deps: T202,T203,G1`
  - **Aceptación:** puede localizarse y validar el pedido recién creado.
- [x] **T206 — Diseñar flujo Cocina.** Wireframes responsive de totales, menús, cursos, observaciones y preparación/entrega. `Deps: T202,T203,G1`
  - **Aceptación:** la confirmación administrativa altera un total visible; Cocina registra preparación y entrega.
- [x] **T207 — Diseñar shell y navegación.** Selector de rol, disclaimer persistente, reinicio, retorno a landing y CTA contextual. `Deps: T204–T206`
  - **Aceptación:** la persona siempre conoce rol, contexto ficticio y salida.
- [x] **T208 — Redactar microcopy de demo.** Labels, ayudas, estados, errores, confirmaciones y tour opcional. `Deps: T204–T207`
  - **Aceptación:** toda simulación se identifica como tal y ninguna acción promete procesamiento real.
- [x] **T209 — Revisar accesibilidad de wireframes.** Teclado, foco, zoom 200 %, orden de lectura, touch y móvil horizontal. `Deps: T204–T208`
  - **Aceptación:** no quedan interacciones dependientes solo de hover, color o gesto.
- [x] **G2 — Aprobar dataset, recorridos y wireframes.** Aprobado por el propietario el 13-07-2026 sin cambios: identidad ficticia, perfiles demostrativos, pedido de cuatro almuerzos y recorrido conectado. `Deps: T201–T209`

## Fase 3 — Construcción de la demo

- [x] **T301 — Crear base de `/demo`.** Implementar ruta, metadata, shell, disclaimer, selector de rol, retorno y reinicio. `Deps: G1,G2`
  - **Aceptación:** la ruta funciona directamente, es responsive y deja claro que es ficticia.
- [x] **T302 — Implementar estado local conectado.** Dataset tipado, acciones, persistencia de sesión y restauración del estado semilla. `Deps: T203,T301`
  - **Aceptación:** reiniciar produce siempre el mismo estado inicial y no hay red remota.
- [x] **T303 — Implementar experiencia Apoderado.** Construir el flujo completo aprobado. `Deps: T204,T302`
  - **Aceptación:** se confirma un pedido ficticio y se obtiene estado/número de demostración.
- [x] **T304 — Implementar experiencia Administración.** Construir dashboard, detalle, trazabilidad, supervisión de excepciones y consolidado automático. `Deps: T205,T302`
  - **Aceptación:** el pedido pagado de T303 aparece sincronizado sin aprobación individual; Administración solo supervisa.
- [x] **T305 — Implementar experiencia Cocina.** Construir listado, agrupaciones, observaciones y estados operacionales. `Deps: T206,T302`
  - **Aceptación:** el total cambia automáticamente después de T303 y puede marcarse preparación/entrega.
- [x] **T306 — Integrar continuidad entre roles.** Completar sincronización, indicaciones contextuales y cambio de rol. `Deps: T303–T305`
  - **Aceptación:** el recorrido completo puede demostrarse sin recargar ni perder estado.
- [x] **T307 — Integrar CTA y atribución.** Conectar cada rol con contacto y origen diferenciado. `Deps: T301,T306`
  - **Aceptación:** el formulario recibe un `ref` distinguible desde cada rol.
- [x] **T308 — Aplicar interacción y motion.** Estados hover/focus/pressed/disabled, transiciones y reduced-motion. `Deps: T303–T307`
  - **Aceptación:** motion no bloquea interacción, no causa reflow y tiene alternativa equivalente.
- [x] **T309 — QA funcional de demo.** Probar happy path, reinicio, navegación directa, cambio de rol y ausencia de acciones reales. `Deps: T306–T308`
  - **Aceptación:** cero bloqueadores funcionales y cero PII.
- [x] **T310 — QA responsive y accesible de demo.** Probar 375/768/1024/1440, landscape, teclado, lector de pantalla y zoom 200 %. `Deps: T308,T309`
  - **Aceptación:** sin scroll horizontal, foco perdido, targets menores a 44 px ni contenido inaccesible.
- [x] **G3 — Aprobar demo funcional.** Cerrado el 14-07-2026: flujo automático, supervisión por excepción, entrega configurable, QA funcional/responsive y build aprobados. `Deps: T301–T310`

## Fase 4 — Assets de lanzamiento

- [x] **T401 — Capturar pantallas desde la demo.** Producir captura Apoderado 9:19, Administración 16:10 y Cocina 16:10. `Deps: G3`
  - **Aceptación:** muestran estados útiles, datos ficticios y la misma UI que puede explorarse.
- [x] **T402 — Crear composición de tres roles.** Conectar las capturas en una pieza Apoderado → Administración → Cocina. `Deps: T401`
  - **Aceptación:** se entiende el flujo sin depender de un párrafo largo.
- [x] **T403 — Producir recurso editorial del problema.** Generar con Prompt A3 o resolver vectorialmente; revisar artefactos y veracidad. `Deps: G1`
  - **Aceptación:** comunica fragmentación, no parece stock/IA genérica y no contiene marcas o datos reales.
- [x] **T404 — Diseñar Open Graph.** Componer logo, titular real y capturas usando Prompt A4 como guía. `Deps: T402,G1`
  - **Aceptación:** versión 1200×630 legible en recortes de WhatsApp y LinkedIn, sin texto generado.
- [x] **T405 — Optimizar y documentar assets.** Exportar AVIF/WebP, tamaños responsive, dimensiones, alt text y captions. `Deps: T401–T404`
  - **Aceptación:** todos los assets tienen propósito, peso razonable y tratamiento accesible.

## Fase 5 — Landing final

- [x] **T501 — Cerrar arquitectura y copy.** Aprobar hero, orden de secciones, beneficios, microcaso, FAQ, formulario y mensajes de privacidad. `Deps: T003,G1,G3`
  - **Aceptación:** el recorrido completo cuenta una historia sin duplicación innecesaria.
- [x] **T502 — Rediseñar header y hero.** Incorporar marca, promesa orientada a resultado, captura real, CTA principal y CTA de demo. `Deps: T401,T501`
  - **Aceptación:** producto, público, beneficio y siguiente paso se comprenden en cinco segundos.
- [x] **T503 — Rediseñar problema y solución.** Sustituir repetición de tarjetas por composición narrativa y flujo de tres roles. `Deps: T402,T403,T501`
  - **Aceptación:** las dos secciones tienen composiciones distintas y el flujo es evidente.
- [x] **T504 — Integrar preview de demo.** Mostrar roles, alcance y CTA a `/demo`. `Deps: G3,T402,T501`
  - **Aceptación:** la demo se descubre antes del formulario y no se presenta como producto universal cerrado.
- [x] **T505 — Rediseñar implementación y credibilidad.** Simplificar los tres pasos, desarrollar cifras verificadas y agregar microcaso solo si está aprobado factual y públicamente. `Deps: T501`
  - **Aceptación:** no aparecen clientes, logos, testimonios ni cifras no autorizadas.
- [x] **T506 — Rediseñar resultados y FAQ.** Priorizar 3–4 resultados y responder adaptación, datos, soporte y tiempos. `Deps: T501`
  - **Aceptación:** cada beneficio conecta con una evidencia o situación concreta.
- [x] **T507 — Optimizar contacto y formulario.** Implementar variante aprobada conservando validación, persistencia, honeypot, rate limit y origen. `Deps: T003,T501`
  - **Aceptación:** explica duración, compromiso, uso de datos y siguiente paso; el backend sigue intacto funcionalmente.
- [x] **T508 — Integrar sistema visual y assets.** Aplicar tokens, logo, favicon, capturas, Open Graph y footer legal. `Deps: T405,T502–T507`
  - **Aceptación:** no quedan placeholders, mockups ilustrativos ni estilos heredados incoherentes.
- [x] **T509 — Integrar motion de landing.** Mantener pocos momentos orquestados, estados de interacción y reduced-motion. `Deps: T502–T508`
  - **Aceptación:** el motion refuerza narrativa y no crea scroll-jacking o CLS.
- [x] **G4 — Aprobar landing completa.** Aprobado por el usuario el 14-07-2026; se autorizó una mejora visual adicional dentro del cierre de G5. `Deps: T501–T509`

## Fase 6 — QA y lanzamiento

- [ ] **T601 — Verificar formulario end-to-end.** Probar éxito real, validaciones, errores, rate limit, honeypot y origen desde landing/demo. `Deps: G4,T307`
  - **Aceptación:** el lead válido queda persistido una sola vez y todos los fallos tienen recuperación clara.
- [x] **T602 — Ejecutar auditoría responsive.** Landing y demo en 375/768/1024/1440, landscape, textos largos y zoom 200 %. `Deps: G4`
  - **Aceptación:** sin overflow, solapamientos, contenido oculto ni targets pequeños.
- [x] **T603 — Ejecutar auditoría accesible.** Semántica, headings, alt, labels, contraste, teclado, foco, anuncios y reduced-motion. `Deps: G4`
  - **Aceptación:** cero violaciones críticas/serias automatizadas y recorrido esencial manual completo.
- [x] **T604 — Ejecutar auditoría de rendimiento.** Lighthouse, bundle, fuentes, imágenes, LCP, INP y CLS en landing y demo. `Deps: G4`
  - **Aceptación:** objetivos LCP ≤2,5 s, INP <200 ms y CLS <0,1 o desviación documentada y aprobada.
- [x] **T605 — Verificar SEO y previews.** Title, description, canonical, robots, favicon, datos estructurados verificables y Open Graph. `Deps: T404,T508`
  - **Aceptación:** previews correctos y ninguna metadata inventada.
- [x] **T606 — Revisar contenido, privacidad y veracidad.** Copy final, promesas, datos ficticios, información sensible y enlaces legales. `Deps: G4`
  - **Aceptación:** cero PII, cero afirmaciones no verificadas y política/enlaces válidos.
- [x] **T607 — Ejecutar build y smoke test de producción.** Compilar, iniciar artefacto y probar rutas principales y API. `Deps: T601–T606`
  - **Aceptación:** build exitoso, landing, `/demo`, anclas y formulario operativos.
- [x] **T608 — Resolver bloqueadores y repetir checks afectados.** `Deps: T607`
  - **Aceptación:** no quedan defectos críticos o altos; los medios aceptados están documentados.
- [ ] **G5 — Aprobar “listo para lanzar”.** `Deps: T601–T608`

## Definition of Done

- Marca final aplicada y favicon correcto.
- Landing profesional, responsive y sin placeholders.
- Demo navegable con tres roles y estado conectado.
- Capturas de la demo integradas en landing y Open Graph.
- Formulario real probado end-to-end.
- Privacidad, veracidad, accesibilidad, rendimiento y SEO verificados.
- Build de producción exitoso.
- Cero bloqueadores críticos o altos.

## Fuera de este spec

- Analítica avanzada y dashboards de conversión.
- A/B testing de titulares o formularios.
- Evolución de la demo después del lanzamiento.
- Login, pagos, backend o personalización real de la demo.
- Nuevos roles, módulos o integraciones.
- Dark mode.
- Casos, logos o testimonios aún no autorizados.
- Optimización continua de SEO y contenido postlanzamiento.

