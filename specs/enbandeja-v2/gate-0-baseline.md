# EnBandeja V2 — Gate 0: línea base

Fecha: 25 de julio de 2026.

## Objetivo

Preservar y documentar el estado actual antes de reposicionar la landing como
plataforma modular especializada en casinos y servicios de alimentación
escolar.

Este gate no modifica la interfaz ni el comportamiento del producto.

## Estado técnico verificado

- Stack: Next.js 16.2.10, React 19.2, Tailwind CSS 4 y TypeScript 5.9.
- Motion 12.42.2 está instalado.
- GSAP 3.15 y `@gsap/react` 2.1 están instalados.
- Rutas actuales:
  - `/`
  - `/demo`
  - `/privacidad`
  - `/api/leads`
  - `/icon.svg`
- `npm run build`: exitoso el 25-07-2026.
- TypeScript: exitoso dentro del build.
- Generación estática: exitosa.
- No quedó un servidor local de EnBandeja ejecutándose después de la
  verificación.

## Línea base visual disponible

Existen capturas previas en:

- `specs/enbandeja-professionalization/baseline/`
- `specs/enbandeja-professionalization/gate-5/`

Breakpoints documentados previamente:

- 375 px
- 768 px
- 1024 px
- 1440 px

Última auditoría Lighthouse documentada:

| Categoría | Resultado |
|---|---:|
| Performance | 93 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Métricas registradas:

- FCP: 1,1 s
- LCP: 3,1 s
- TBT: 50 ms
- CLS: 0

Estas cifras pertenecen a la versión anterior y deberán volver a medirse
después del rediseño.

## Activos actuales preservados

- `administracion-1600x1000.webp`
- `cocina-1600x1000.webp`
- `portal-apoderado-900x1900.webp`
- `flujo-tres-roles.webp`
- `problema-operacional.webp`
- `open-graph.png`

No se eliminará ninguno hasta que los activos de V2 estén aprobados y
referenciados correctamente.

## Funcionalidad que debe preservarse

- Formulario de leads con validación frontend y backend.
- Persistencia de leads mediante Prisma y Supabase.
- Honeypot y rate limiting.
- Notificación opcional mediante Resend.
- Demo ficticia y navegable.
- Flujo del apoderado sin cuenta en la configuración demostrada.
- Vistas de Administración y Cocina.
- Entrega configurable mediante QR, ticket, búsqueda o listados.
- Declaración explícita de que pagos, datos y módulos de la demo son
  ficticios.
- Página de privacidad.
- Metadata y Open Graph.

## Decisiones anteriores que siguen vigentes

- La marca se escribe `EnBandeja`.
- Se conserva el monograma `EB` navy/coral sobre bandeja.
- No se representan comprobantes de transferencia.
- Cada cliente utiliza la pasarela acordada.
- No existe aprobación administrativa pedido por pedido.
- La confirmación del pedido ocurre automáticamente después de la respuesta
  aprobada de la pasarela.
- La demo no pretende representar una configuración universal.
- No se inventarán clientes, logos, cifras ni testimonios.

## Cambios estratégicos que pasan a Gate 1

- Reemplazar “software a medida” por “plataforma modular configurada”.
- Ampliar el relato desde tres vistas hacia el ciclo completo:
  familias, cocina, entrega, administración y finanzas.
- Incorporar POS, kiosco y billetera como módulos, no como promesa base.
- Dar mayor prioridad comercial a operadores multiestablecimiento.
- Explicar migración, capacitación, implementación y acompañamiento.
- Revisar o retirar la promesa “primera versión operativa en 7 días”.
- Actualizar README, metadata, FAQ y mensajes que todavía describen el modelo
  anterior.
- Mantener los agentes de WhatsApp y voz como capacidades o integraciones
  futuras, no como identidad central de EnBandeja.

## Deudas y riesgos detectados

### Configuración externa

- `NEXT_PUBLIC_SITE_URL` continúa pendiente para eliminar el fallback local de
  `metadataBase`.
- `NEXT_PUBLIC_CONTACT_EMAIL` continúa pendiente.
- Resend y destinatarios de notificación deben configurarse antes del
  lanzamiento.

### Repositorio Git

El directorio contiene una carpeta `.git` local vacía y Git asciende hasta un
repositorio padre en `C:\Users\alain`. Por seguridad no se creó una rama ni se
modificó la configuración global de Git.

Antes de trabajar con commits debe decidirse una de estas alternativas:

1. Inicializar EnBandeja como repositorio independiente.
2. Confirmar intencionalmente que pertenece al repositorio padre.
3. Conectar el repositorio remoto correcto si ya existe.

### Integración 21st.dev

- El servidor MCP está declarado en la configuración global.
- La variable de entorno se registró en el perfil Windows del propietario.
- La herramienta aún no estuvo disponible en la sesión que inició Gate 0.
- Debe validarse después del próximo reinicio antes de comenzar Gate 2.

## Criterios de cierre de Gate 0

- [x] Estado actual inventariado.
- [x] Activos anteriores localizados y preservados.
- [x] Funcionalidad crítica identificada.
- [x] Build de producción exitoso.
- [x] Procesos locales antiguos cerrados.
- [x] Deudas de configuración registradas.
- [x] Riesgo de estructura Git documentado sin intervenirlo.
- [x] Cambios estratégicos derivados hacia Gate 1.

## Resultado

Gate 0 completado. El proyecto actual constituye una línea base técnicamente
válida y puede comenzar Gate 1 sin modificar todavía la interfaz.
