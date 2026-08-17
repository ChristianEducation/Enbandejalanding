# Catálogo de assets y prompts

## Reglas de producción

1. No generar texto final dentro de imágenes; se compone después con tipografía real.
2. No usar imágenes generadas para fingir pantallas del producto.
3. No mostrar estudiantes identificables.
4. No inventar logos, clientes, certificaciones ni documentos reales.
5. Revisar manos, utensilios, mobiliario, textos incidentales y lógica operacional.
6. Mantener azul profundo, crema y coral como territorio inicial; ajustar al Gate G1.

## Matriz

| ID | Asset | Fuente | Momento | Formato |
|---|---|---|---|---|
| A1 | Exploraciones de logo | Generación conceptual + redibujo vectorial | Fase 1 | Lámina 1:1 |
| A2 | Textura de marca | Generación o vector manual | Fase 4 | Tile SVG/PNG |
| A3 | Ilustración de problema | Generación + retoque | Fase 4 | 16:10 transparente |
| A4 | Open Graph | Capturas reales + composición | Fase 4 | 1200×630 |
| A5 | Portal apoderado | Captura demo real | Fase 4 | 9:19 |
| A6 | Administración | Captura demo real | Fase 4 | 16:10 |
| A7 | Cocina | Captura demo real | Fase 4 | 16:10 |
| A8 | Flujo tres roles | Composición de A5–A7 | Fase 4 | 3:1 o 16:9 |
| A9 | Favicon | Derivado vectorial del logo | Fase 1 | 16/32/48 |
| A10 | App icon | Derivado vectorial del logo | Fase 1 | 512×512 |
| A11 | Foto de equipo | Fotografía real autorizada | Opcional | 4:5 y 1:1 |
| A12 | Foto de operación | Fotografía real autorizada | Opcional | 16:10 |

## Prompt A1 — Exploración de logo

> Design a concept board with 12 distinct minimalist vector logo symbols for “EnBandeja”, a Chilean B2B software brand that organizes school cafeteria orders, payments, menus and kitchen reporting. Explore three territories equally: (1) a proprietary EB monogram constructed from modular tray or checklist shapes, (2) a top-view cafeteria tray organized like a digital interface, and (3) three operational flows converging into one orderly system. The symbols must remain recognizable at 16×16 pixels, use strong silhouettes, simple geometry and at most two flat colors. Brand mood: trustworthy, operational, warm, specialized, contemporary and adult. Deep navy, warm cream and restrained coral. Present black-and-white versions beside color versions on a clean grid. No wordmark, no generated text, no gradients, no shadows, no chef hat, no fork-and-spoon cliché, no school shield, no childish mascot, no 3D, no glassmorphism, no stock-logo appearance.

**Uso:** referencia solamente. Seleccionar conceptos y reconstruir el elegido en SVG.

## Prompt A2 — Textura de marca

> Create a subtle seamless vector pattern for EnBandeja inspired by cafeteria trays, menu grids, class lists, check marks and connected order flows. Use abstract modular geometry and thin consistent strokes. The pattern must feel calm, precise and premium, suitable behind web content at very low opacity. Deep navy and restrained coral on warm cream, with ample negative space. No repeated cutlery icons, no food illustrations, no emojis, no childish school motifs, no gradients, no shadows, no text. Deliver a clean square repeat tile with clearly matching edges.

**Control:** probar al 4–8 % de opacidad detrás de texto real.

## Prompt A3 — Problema operacional

> Editorial illustration of fragmented school cafeteria operations: WhatsApp-like messages, bank transfer receipts, spreadsheets, email notifications, handwritten student and class lists, and menu PDFs converge into a single overloaded administrative workspace. Communicate fragmentation and repetitive manual work without creating visual chaos. Refined contemporary flat editorial style, adult and trustworthy, with deep navy ink, warm cream, muted blue-gray and restrained coral used only for friction points. Leave a calm area for adjacent web copy. No readable personal data, no real brands, no real WhatsApp logo, no children, no cartoon style, no 3D, no floating SaaS cards, no purple gradients, no neon. Transparent or warm-cream background, horizontal 16:10 composition.

**Control:** eliminar cualquier texto accidental o documento que parezca real.

## Prompt A4 — Guía para Open Graph

> Create a premium editorial composition background for a 1200×630 social preview for EnBandeja. Reserve the left 45% as calm negative space for a real logo and headline to be added later. On the right, frame three supplied real product screenshots representing parent ordering, cafeteria administration and kitchen operations as one connected workflow. Use subtle depth, restrained shadows and a warm cream environment with deep navy and coral accents. The screenshots must remain unchanged and legible. No generated text, no invented UI, no people, no floating decorative analytics, no purple-blue gradient, no neon, no glassmorphism. Keep all important elements within a 90-pixel safe area.

**Uso:** ejecutar solo cuando existan A5–A7; aportar las capturas como referencias.

## Prompt A11 — Fotografía de equipo (brief, no generación)

> Retrato editorial auténtico del responsable o equipo de EnBandeja en un entorno de trabajo real. Luz natural, postura cercana y profesional, vestuario cotidiano cuidado, fondo relacionado con producto u operación sin datos sensibles. Evitar pose corporativa rígida, brazos cruzados, estudio blanco y estética de banco de imágenes. Capturar variantes horizontal, vertical y cuadrada; dejar espacio negativo para copy.

## Prompt A12 — Fotografía de operación (brief, no generación)

> Documentar una operación real de casino escolar con autorización: personal adulto revisando pedidos en tablet o computador, preparación ordenada de bandejas y listado diario visible sin datos personales. No fotografiar rostros de menores, nombres de alumnos, comprobantes, correos ni información sensible. Priorizar escenas que prueben uso del sistema, no fotografías genéricas de comida.

## Checklist de aprobación de assets generados

- [ ] Coherente con marca aprobada.
- [ ] No parece banco de imágenes ni arte genérico de IA.
- [ ] No contiene texto ilegible o inventado.
- [ ] No contiene PII ni marcas de terceros.
- [ ] Tiene propósito concreto en una sección definida.
- [ ] Mantiene legibilidad del contenido adyacente.
- [ ] Dispone de recorte móvil y desktop.
- [ ] Puede exportarse con peso razonable.
- [ ] Tiene alt text o se marca como decorativo.

