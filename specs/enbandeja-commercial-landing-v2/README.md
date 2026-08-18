# EnBandeja — Landing comercial v2

Spec ejecutable para reposicionar la landing de EnBandeja de "desarrollo a
medida" a "producto vertical especializado" con catálogo comercial de tres
modalidades fijas, siguiendo `EnBandeja_Producto_Precios_Landing_v1.docx`
(fuente comercial definitiva) y `EnBandeja_Landing_Comercial_Master_Prompt_v2.md`
(traducción a requisitos de landing).

## 1. Objetivo comercial

- **Conversión esperada:** lead calificado (formulario) o clic a WhatsApp,
  con intención de agendar una demo/diagnóstico — no compra automática.
- **Público objetivo:** dueños/administradores de casinos escolares de un
  colegio, y concesionarias que operan más de un colegio (multicolegio).
- **Resultado esperado en el visitante** (≤30s): entender qué es EnBandeja,
  para quién es, qué problema resuelve, cómo funciona, qué incluye el
  producto base, qué cambia con cafetería o multicolegio, cuánto cuesta,
  cómo probarlo y cómo agendar.

## 2. Fuente de verdad

`EnBandeja_Producto_Precios_Landing_v1.docx` (raíz del repo). Ante cualquier
contradicción con este spec o con `EnBandeja_Landing_Comercial_Master_Prompt_v2.md`,
manda el DOCX. Precios, nombres de modalidad y reglas de alcance se citan
textuales de la sección 4 y 6 del DOCX — ver `decisions.md`.

## 3. Estado actual (auditoría real, 2026-07-27)

### Rutas
- `/` — `src/app/page.tsx`: `SiteHeader → Hero → PlatformStory → DemoPreview
  → PricingSection → FaqSection → LeadSection → SiteFooter`.
- `/demo` — `src/app/demo/page.tsx` + `demo-experience.tsx` (650 líneas):
  recorrido Apoderado → Administración → Cocina, 100% ficticio.
- `/privacidad` — `src/app/privacidad/page.tsx`.
- `/api/leads` — `src/app/api/leads/route.ts`: persiste en Supabase vía
  Prisma, honeypot, rate-limit (3/hora por email o IP hasheada).

### Componentes activos (importados desde `page.tsx` o sus hijos)
`hero.tsx`, `platform-story.tsx` (contiene 4 secciones: `#ciclo`,
`#plataforma`, `#modulos`, `#implementacion`), `demo-preview.tsx`,
`pricing-section.tsx`, `faq-section.tsx`, `lead-section.tsx` (+
`lead-form.tsx`), `site-header.tsx`, `site-footer.tsx`, `logo.tsx`.

### Componentes huérfanos (no importados por nadie — confirmado por grep)
`problem-section.tsx`, `solution-section.tsx`, `how-it-works.tsx`,
`audience-section.tsx`, `benefits-section.tsx`, `desktop-mock.tsx`,
`phone-mock.tsx`. Son remanentes de la landing v1 (narrativa "software a
medida", pre-reposicionamiento). Se eliminan en esta spec — dejarlos viola
la regla "evita duplicación" del prompt de ejecución.

### Sistema de diseño
`src/app/globals.css` (~1560 líneas): tokens Tailwind `@theme` (`brand-*`,
`ink`, `cream`, `line`, `warm-*`) + variables CSS propias (`--navy`, `--blue`,
`--coral`, `--paper`) + clases hechas a mano (`.hero-v2`, `.cycle-section`,
`.pricing-*`, etc.). Motion: `motion/react` (Framer Motion) en todos los
componentes activos; `src/lib/gsap.ts` y las deps `gsap`/`@gsap/react` en
`package.json` están muertas (nadie las importa) — se eliminan.

### Backend de leads
`src/lib/lead-schema.ts` (zod) + `prisma/schema.prisma` (modelo `Lead`,
mapea tabla `leads` en Supabase, proyecto `uwquwjmiofixzugttals`). Campos
actuales: `nombre, casinoColegio, ciudad, email, whatsapp, gestionActual,
origen, estado, ipHash`. No coinciden con los campos que pide el DOCX
(sección "Captura de leads" del master prompt) — ver sección 8 de este
documento.

### SEO / analytics (gaps confirmados)
No existe `sitemap.ts` ni `robots.ts` en `src/app/`. No existe ningún
helper de analytics ni integración (`gtag`, `dataLayer`, Plausible,
PostHog) en el repo. `layout.tsx` tiene metadata/OG básicos sin
`schema.org`. `NEXT_PUBLIC_SITE_URL` sigue vacío en `.env` — sin esto,
`metadataBase` cae a `localhost:3000`.

## 4. Arquitectura final de la landing

Orden definitivo de secciones en `/` (reemplaza el orden actual):

1. **Hero** (`hero.tsx`) — reescrito con copy del DOCX.
2. **Problema** (`problem-section.tsx`, resucitado/reescrito) — "Menos
   planillas, comprobantes y listas separadas."
3. **Cómo funciona** (nuevo `how-it-works.tsx`, 4 pasos) — Apoderados →
   Cocina → Entrega → Administración. Reemplaza el ciclo de 6 pasos
   `#ciclo` dentro de `platform-story.tsx`.
4. **Una plataforma para toda la operación** (`#plataforma` dentro de
   `platform-story.tsx`, se mantiene la mecánica de tabs Familias/Cocina/
   Administración — se ajusta copy a las 4 perspectivas del DOCX).
5. **Qué incluye EnBandeja** (nuevo bloque dentro de `platform-story.tsx`
   o componente propio — lista simple, no tabla técnica).
6. **Demo navegable** (`demo-preview.tsx`, copy ajustado: "No te lo
   contamos. Pruébalo.").
7. **Planes / Pricing** (`pricing-section.tsx`, reescrito con las 3
   modalidades exactas + regla multicolegio + tabla de escalamiento).
8. **Multicolegio** (bloque propio, puede vivir dentro de
   `pricing-section.tsx` o `platform-story.tsx` — "Una sola concesionaria.
   Varios colegios. Una visión consolidada.").
9. **FAQ** (`faq-section.tsx`, contenido reescrito 1:1 con el DOCX).
10. **CTA final + formulario** (`lead-section.tsx` + `lead-form.tsx`,
    campos y copy nuevos).

Se elimina el módulo "Modular por diseño" (`#modulos`, composición de
nodos) de `platform-story.tsx` si duplica el mensaje de "Qué incluye" —
decisión tomada en gate de implementación, ver `decisions.md`.

## 5. Copy

Ver `EnBandeja_Producto_Precios_Landing_v1.docx` sección 6 ("Copy listo
para la landing") — es la fuente literal. No se parafrasea el H1, subtítulo,
CTAs, "Cómo funciona" ni FAQ. Este spec no los vuelve a transcribir para
evitar una segunda fuente que pueda desincronizarse; implementar leyendo
el DOCX directamente en cada tarea.

## 6. Modalidades comerciales

Ver `decisions.md` — tabla exacta de precios, reglas y ejemplos de
escalamiento, citada textual del DOCX secciones 1 y 4.

## 7. Demo

`demo-experience.tsx` gana:
- Badge **"Incluido en EnBandeja Almuerzos"** en todo el flujo de almuerzos
  (identificación, menú, revisión, pago, cocina, entrega).
- Badge **"Módulo Cafetería"** en cualquier pantalla de cafetería (si
  existe hoy en el flujo — confirmar en auditoría de tareas).
- Badge **"Multicolegio"** en vista consolidada / selector de colegio (si
  existe hoy).
- No ocultar reportes, anulaciones, pendientes ni pagos externos.

## 8. Captura de leads

Formulario reescrito (`lead-form.tsx` + `lead-schema.ts` + migración
Supabase vía MCP + `route.ts` + `notify.ts`):

| Campo | Tipo | Requerido |
|---|---|---|
| Nombre | texto | sí |
| Empresa / concesionaria | texto (reemplaza `casinoColegio`) | sí |
| Email | email | sí |
| WhatsApp | tel (+56, reutiliza `normalizeWhatsapp`) | sí |
| Cantidad de colegios | número (1–9) | sí |
| ¿Tiene cafetería? | boolean (sí/no) | opcional, default `false` |
| Mensaje | textarea (reemplaza `gestionActual`, ya no required) | opcional |

Se elimina `ciudad` (no lo pide el DOCX; formulario breve). Migración
Supabase: renombrar `casino_colegio`→`empresa`, agregar
`cantidad_colegios int not null default 1` y `tiene_cafeteria boolean not
null default false`, volver `gestion_actual` (→ renombrar `mensaje`)
nullable. CTA del botón: **Agendar una demo**. Se agrega CTA WhatsApp
directo (`https://wa.me/<número>`, número vía env var nueva
`NEXT_PUBLIC_WHATSAPP_NUMBER`).

## 9. Analytics

Nuevo `src/lib/analytics.ts`: helper mínimo sin dependencias nuevas —
`track(event, params)` que hace `window.dataLayer?.push(...)` si existe
(no se instala GA4 ni ningún SDK) y `console.debug` en dev. Eventos
exactos: `hero_demo_click, hero_plans_click, whatsapp_click, demo_open,
pricing_view (IntersectionObserver), lead_form_start, lead_form_submit,
cafeteria_interest, multicolegio_interest`. UTMs (`utm_source, utm_medium,
utm_campaign, utm_content`) se leen de `window.location.search` al enviar
el formulario (mismo patrón que `origen`/`ref` ya usado en `lead-form.tsx`
— sin `useSearchParams()`/Suspense, por el bug ya documentado en memoria
de proyecto) y se guardan en una columna nueva `utm_json jsonb` opcional.

## 10. SEO

- `src/app/sitemap.ts` y `src/app/robots.ts` nuevos (Next.js metadata
  routes).
- `layout.tsx`: title/description actualizados al positioning nuevo,
  `schema.org` `Organization` + `Product`/`Service` vía JSON-LD.
- OG copy exacto del DOCX sección 6 ("EnBandeja — El casino escolar, en un
  solo lugar...").
- Mantener `NEXT_PUBLIC_SITE_URL` como pendiente de decisión del usuario
  (no se puede definir sin el dominio real) — documentar en pendientes.

## 11. Diseño

Se conserva: paleta navy/blue/coral sobre paper cream, `motion/react`,
screenshots reales (`/public/images/*`, `/public/assets/*`), estructura de
`platform-story.tsx` (tabs de roles), mecánica de tarjetas/pricing-panel
existente. Se simplifica: copy abstracto de "ciclo de 6 pasos" →
"cómo funciona" de 4 pasos tal como pide el DOCX; se remueve
"Modular por diseño" si es redundante con "Qué incluye".

## 12. Responsive

Validar en 390 / 430 / 768 / 1440 — especialmente tabla de precios
(colapsa a columna única <768px, ya existe ese patrón en
`pricing-items`/`pricing-grid`), reglas multicolegio legibles, y badges de
demo sin romper layout de `demo-experience.tsx` en 390px.

## 13. Implementación técnica

Ver `tasks.md`.

## 14. Acceptance criteria

Ver `tasks.md` (criterio por tarea).

## 15. Fuera de alcance

- No se toca el flujo de datos ficticios de la demo (identidad
  `Colegio Modelo EnBandeja`, `DEM-1042`, etc.) salvo agregar los badges.
- No se define `NEXT_PUBLIC_SITE_URL` real (requiere dominio del usuario).
- No se configura `RESEND_API_KEY` real (requiere credencial del usuario).
- No se integra GHL/webhook real — solo se deja la captura desacoplada
  (Supabase ya funciona; no se agrega otra integración sin pedirla).
- No se rediseña el logo/brand kit — ya está congelado (`decisions.md`
  del spec anterior, D006).
- No se prueba envío real de WhatsApp Business API — solo enlace `wa.me`.
