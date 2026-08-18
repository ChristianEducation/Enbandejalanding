# Decisiones — landing comercial v2

Citas textuales de `EnBandeja_Producto_Precios_Landing_v1.docx`
(fuente de verdad). Cualquier discrepancia futura se resuelve releyendo
el DOCX, no este archivo.

## Precios finales (DOCX §1, tabla "Precios finales")

| Modalidad | Implementación | Mensualidad | Cobertura |
|---|---|---|---|
| EnBandeja Almuerzos | $690.000 | $119.000/mes | 1 colegio |
| EnBandeja + Cafetería | $890.000 | $139.000/mes | 1 colegio |
| EnBandeja Multicolegio | $1.190.000 | $179.000/mes | 2 colegios |
| Colegio adicional | +$250.000 | +$30.000/mes | por colegio |
| Módulo Cafetería en Multicolegio | +$200.000 | +$20.000/mes | por operación |

## Tabla de escalamiento multicolegio (DOCX §4, "Ejemplos de escalamiento")

| Colegios | Implementación | Mensualidad |
|---|---|---|
| 2 | $1.190.000 | $179.000/mes |
| 3 | $1.440.000 | $209.000/mes |
| 4 | $1.690.000 | $239.000/mes |
| 5 | $1.940.000 | $269.000/mes |

Regla (DOCX §1): "cada colegio adicional replica los módulos activos del
plan y suma $250.000 de implementación + $30.000/mes."

## Nomenclatura obligatoria (DOCX §8, master prompt §"REGLAS PARA MOSTRAR PRECIOS")

Únicamente: **EnBandeja Almuerzos**, **EnBandeja + Cafetería**,
**EnBandeja Multicolegio**. Prohibido: "Plan 1/2/3", "Esencial",
"Operación completa", "Completo".

## Reglas de presentación de precios (DOCX §8)

- Mostrar implementación + mensualidad siempre juntas.
- Nunca "desde" en las 3 modalidades principales — precio fijo por alcance.
- Regla de colegio adicional visible en el bloque Multicolegio.
- No "el cliente es dueño de su plataforma" → usar "plataforma configurada
  a tu operación" / "tu operación en EnBandeja" (DOCX §5: la definición
  jurídica de propiedad queda en contrato, el código sigue siendo parte
  del producto EnBandeja).
- No mencionar competidores en la landing pública (OrderEAT, EZ School
  Apps y HotLunch son benchmarks internos, DOCX §3 — "SECCIÓN INTERNA,
  no publicar literalmente").
- No vender IA/automatización genérica.
- No negociar precio visualmente ni "contacta para precio" en las 3
  modalidades base.

## Qué incluye la mensualidad (DOCX §5)

Hosting y BD, respaldos y monitoreo básico, soporte técnico y corrección
de incidencias, mantenimiento y actualizaciones del producto base, ajustes
menores de configuración, subdominio de operación EnBandeja.

## Qué NO incluye / se cotiza aparte (DOCX §5)

Comisiones de la pasarela de pago, billetera/saldo prepagado, POS/kiosco
presencial + hardware, ERP/contabilidad/inventario avanzado,
integraciones externas no contempladas, desarrollos específicos fuera del
producto base, migraciones de datos complejas.

## Condiciones comerciales (DOCX §5)

- Implementación: 50% al inicio, 50% al pasar a producción.
- Mensualidad: comienza desde la puesta en producción.
- Plazo estándar 1 colegio: 7–10 días hábiles desde antecedentes/nómina/
  credenciales completas. Multicolegio: puede requerir más tiempo.
- Precios de catálogo no se negocian en la conversación comercial.

## Demo (DOCX §7)

Producto base completo + badges — no simula 3 tiers de funciones
crecientes. Badges: "Incluido en EnBandeja Almuerzos" / "Módulo
Cafetería" / "Multicolegio". No ocultar reportes/anulaciones/pendientes
para forzar upsell — son parte del producto base Almuerzos.

## Decisión de implementación D-V2-001 — eliminación de código huérfano

`problem-section.tsx`, `solution-section.tsx`, `how-it-works.tsx`,
`audience-section.tsx`, `benefits-section.tsx`, `desktop-mock.tsx`,
`phone-mock.tsx` no están importados por ningún archivo activo
(confirmado por grep, 2026-07-27). Se eliminan al iniciar la
implementación; el nuevo `how-it-works.tsx` (4 pasos) se crea desde cero
con ese mismo nombre de archivo.

**Why:** el prompt de ejecución exige "evita duplicación" y "reutiliza
componentes existentes" — dejar 7 archivos muertos con narrativa vieja
("software a medida") contradice directamente el reposicionamiento a
"producto vertical" que es el objetivo de esta spec.

## Decisión de implementación D-V2-002 — migración de esquema de leads

Los campos actuales (`casinoColegio`, `ciudad`, `gestionActual`
obligatorio) no coinciden con el formulario que pide el DOCX/master
prompt (`Empresa/concesionaria`, `Cantidad de colegios`, `¿Tiene
cafetería?`, `Mensaje` opcional, sin ciudad). Se migra la tabla `leads`
en Supabase (proyecto `uwquwjmiofixzugttals`) vía `apply_migration`,
alterando columnas en vez de crear tabla nueva, para no perder el
histórico de leads ya capturados.

**Why:** "Reutilizar backend existente cuando corresponda" (prompt de
ejecución) — el backend (Prisma + Supabase + honeypot + rate-limit) es
sólido y no se reescribe, solo se ajustan las columnas de contenido.

## Decisión de implementación D-V2-003 — analytics sin dependencias

Se implementa un helper propio (`src/lib/analytics.ts`) que hace
`window.dataLayer?.push()` si `dataLayer` existe, sin instalar ningún SDK
(GA4, Segment, PostHog). El prompt de ejecución dice explícitamente "No
agregar dependencias sin necesidad" y el master prompt no exige un
proveedor específico — solo eventos limpios y soporte de UTMs.

**Why:** evita atar la landing a un proveedor de analytics que el usuario
no ha elegido todavía; conectar `dataLayer` a GTM/GA4 real es una
decisión de negocio pendiente, no técnica.
