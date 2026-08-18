# Tareas — landing comercial v2

Cada tarea referencia archivos reales del repo. Criterio de aceptación
verificable al final de cada una.

## T01 — Limpieza de código huérfano

- Eliminar `src/components/{problem-section,solution-section,how-it-works,
  audience-section,benefits-section,desktop-mock,phone-mock}.tsx`.
- Eliminar `src/lib/gsap.ts` y las deps `gsap`/`@gsap/react` de
  `package.json`.
- **Acceptance:** `npx tsc --noEmit` sin errores de imports rotos.

## T02 — Migración Supabase + Prisma (esquema de leads)

- `apply_migration` en proyecto `uwquwjmiofixzugttals`: renombrar
  `casino_colegio`→`empresa`, agregar `cantidad_colegios integer not null
  default 1`, `tiene_cafeteria boolean not null default false`,
  `utm_json jsonb`, renombrar `gestion_actual`→`mensaje` y volverla
  nullable, eliminar columna `ciudad` (o dejarla nullable sin usar, más
  simple: eliminarla).
- Actualizar `prisma/schema.prisma` acorde.
- **Acceptance:** `list_tables`/`execute_sql` confirma columnas nuevas;
  `prisma generate` sin errores.

## T03 — `lead-schema.ts`

- Reescribir con los campos de la spec §8: `nombre, empresa, email,
  whatsapp, cantidadColegios (1-9), tieneCafeteria (boolean, default
  false), mensaje (opcional)`.
- Mantener `normalizeWhatsapp` y `sanitizeOrigen` tal cual.
- **Acceptance:** tipos exportados usados sin error por `lead-form.tsx` y
  `route.ts`.

## T04 — `route.ts` + `notify.ts`

- Ajustar `prisma.lead.create` a los campos nuevos.
- Aceptar `utm` opcional en el body, guardarlo en `utm_json`.
- Actualizar plantilla de correo en `notify.ts` con los campos nuevos.
- **Acceptance:** build pasa; revisar manualmente que el mapeo de campos
  sea 1:1 con el schema.

## T05 — `lead-form.tsx`

- Campos nuevos: input numérico "Cantidad de colegios", toggle/checkbox
  "¿Tiene cafetería?", textarea "Mensaje" (opcional, sin mínimo de
  caracteres). Quitar "Ciudad".
- Botón: "Agendar una demo".
- Capturar UTMs desde `window.location.search` igual que `origen` (sin
  `useSearchParams()`/Suspense — ver gotcha en memoria de proyecto).
- Disparar `track("lead_form_start")` en el primer `onChange` y
  `track("lead_form_submit")` en submit exitoso.
- **Acceptance:** build; prueba manual de envío real guarda fila con
  columnas nuevas correctas en Supabase, luego se borra el registro de
  prueba.

## T06 — `src/lib/analytics.ts` (nuevo)

- `track(event: string, params?: Record<string, unknown>)`.
- **Acceptance:** cero dependencias nuevas en `package.json`.

## T07 — Hero (`hero.tsx`)

- H1: "El casino escolar, en un solo lugar." Subtítulo, CTA primario
  "Agendar una demo" (`track("hero_demo_click")`), CTA secundario "Ver
  planes" (ancla a pricing, `track("hero_plans_click")`). Microcopy: sin
  comisión / implementación acompañada / para casinos y concesionarias.
- **Acceptance:** copy coincide literal con DOCX §6 "Hero".

## T08 — Problema (`problem-section.tsx`, nuevo)

- Título "Menos planillas, comprobantes y listas separadas." + párrafo
  del DOCX §6 "Problema". Sin dramatizar, sin grid de 9 dolores (eso era
  v1) — un bloque breve.
- **Acceptance:** copy coincide literal con DOCX.

## T09 — Cómo funciona (`how-it-works.tsx`, nuevo, 4 pasos)

- Apoderados / Cocina / Entrega / Administración, copy exacto del DOCX
  §6 "Cómo funciona". Reemplaza visualmente al ciclo de 6 pasos
  `#ciclo` — decidir si se retira `#ciclo` de `platform-story.tsx` o se
  fusiona (ver T10).
- **Acceptance:** 4 pasos, sin párrafos largos, responsive 390px sin
  overflow horizontal.

## T10 — `platform-story.tsx`

- Retirar la sección `#ciclo` (6 pasos) — sustituida por T09.
- Ajustar copy de `#plataforma` (tabs Familias/Cocina/Administración) a
  terminología del DOCX si difiere.
- Evaluar si `#modulos` (composición de nodos "Modular por diseño")
  duplica "Qué incluye EnBandeja" (T11) — si es redundante, retirarla.
- Mantener `#implementacion` pero validar que el copy de plazo diga
  "7–10 días hábiles" (DOCX), no "7 días hábiles" (dato viejo de la v2
  de Codex — corregir en todos los lugares donde aparezca "7 dias
  habiles").
- **Acceptance:** grep de "7 dias habiles" / "7 días hábiles" en `src/`
  devuelve cero resultados; solo "7–10 días hábiles".

## T11 — Qué incluye EnBandeja (bloque nuevo)

- Lista simple (no tabla técnica) con los 9 ítems del DOCX §6 "Qué
  incluye EnBandeja". Vive en `platform-story.tsx` o componente propio
  según lo que quede más limpio tras T10.
- **Acceptance:** los 9 ítems presentes, sin iconografía "premium
  feature" (checkmarks simples, coherente con el resto del sitio).

## T12 — `demo-preview.tsx`

- Copy: "No te lo contamos. Pruébalo." CTA "Ver demo" +
  `track("demo_open")` al clic.
- **Acceptance:** copy actualizado, enlace a `/demo` intacto.

## T13 — `demo-experience.tsx` (badges)

- Auditar las pantallas actuales del flujo (identificación, menú,
  revisión, pago, cocina, entrega, administración) y agregar badge
  "Incluido en EnBandeja Almuerzos" donde corresponda.
- Si existen pantallas de cafetería o vista multicolegio en el flujo
  actual, agregar badges "Módulo Cafetería"/"Multicolegio"; si no
  existen, documentarlo en el resumen final como pendiente (no inventar
  pantallas nuevas fuera de este spec).
- **Acceptance:** build pasa; recorrido completo probado manualmente sin
  romper el flujo ficticio existente.

## T14 — `pricing-section.tsx`

- Reescribir con las 3 modalidades exactas (`decisions.md`), tabla de
  escalamiento multicolegio, regla de colegio adicional visible, sin
  "desde". CTA por modalidad: "Agendar una demo" (no "Comprar").
  `track("pricing_view")` vía `IntersectionObserver` al entrar en
  viewport, `track("cafeteria_interest")` / `track("multicolegio_interest")`
  en hover/click de esas tarjetas.
- **Acceptance:** precios coinciden número por número con `decisions.md`;
  cero instancias de "Plan 1/2/3", "Esencial", "Completo".

## T15 — Bloque Multicolegio

- "Una sola concesionaria. Varios colegios. Una visión consolidada." +
  párrafo del DOCX §6. Puede vivir dentro de T14 o como bloque propio.
- **Acceptance:** copy literal del DOCX.

## T16 — `faq-section.tsx`

- Reemplazar las 6 preguntas actuales por las 6 del DOCX §6 "Preguntas
  frecuentes" (contenido distinto al FAQ v1 que ya existe en el repo).
- **Acceptance:** copy 1:1 con el DOCX.

## T17 — `lead-section.tsx`

- CTA final: "Cuéntame cómo funciona hoy tu casino y te muestro cómo se
  vería en EnBandeja." + apoyo "Agenda una demo breve...". Agregar CTA
  WhatsApp directo (`https://wa.me/<NEXT_PUBLIC_WHATSAPP_NUMBER>`,
  `track("whatsapp_click")`).
- **Acceptance:** WhatsApp solo se renderiza si la env var está definida
  (mismo patrón que `NEXT_PUBLIC_CONTACT_EMAIL`), documentar la env var
  en `.env.example`.

## T18 — `site-header.tsx`

- Revisar labels de navegación contra la arquitectura nueva (T04 del
  archivo README): probablemente "Cómo funciona", "Planes", "Demo",
  WhatsApp, "Agendar una demo".
- **Acceptance:** anclas apuntan a ids reales existentes tras T07-T17.

## T19 — SEO

- `src/app/sitemap.ts`, `src/app/robots.ts` nuevos.
- `layout.tsx`: title/description con positioning nuevo, JSON-LD
  `Organization` (+ opcional `Service`), OG copy exacto del DOCX §6
  "Social/WhatsApp".
- **Acceptance:** `/sitemap.xml` y `/robots.txt` responden 200 en local;
  JSON-LD válido (revisar estructura manualmente, sin URL de validación
  externa).

## T20 — Validación final

- `npx tsc --noEmit`.
- `npm run build`.
- Revisión responsive 390/430/768/1440 (hero, pricing, multicolegio,
  formulario, demo badges).
- Grep de frases prohibidas: "Plan 1", "Plan 2", "Plan 3", "el cliente es
  dueño de su plataforma", "7 dias habiles" (sin corregir a 7-10),
  nombres de competidores (OrderEAT, EZ School Apps, HotLunch) fuera de
  `specs/`.
- **Acceptance:** build exitoso, cero coincidencias de frases prohibidas
  en `src/`.
