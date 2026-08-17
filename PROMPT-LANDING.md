# Prompt de la landing — contenido, formulario, diseño y motion

> Este es el prompt funcional completo de la landing. `CLAUDE.md`
> tiene el contexto de negocio y las reglas del proyecto; este
> archivo tiene el detalle de qué construir.

## Requisitos funcionales del formulario (no negociables)

1. El formulario debe persistir de verdad en una tabla `leads` en
   Supabase vía Prisma — nunca un toast de éxito falso sin guardar
   nada.
2. Validación real en frontend (campos requeridos, formato email,
   formato WhatsApp chileno +56) y en backend (API route con
   validación server-side, no confiar solo en el cliente).
3. Estados reales: cargando, éxito, error (con mensaje claro si falla
   el guardado).
4. Anti-spam básico: honeypot field oculto + algún tipo de
   rate-limiting simple (dado que es serverless en Vercel sin
   infraestructura adicional, lo más simple es chequear contra la
   propia tabla `leads` — por ejemplo, mismo email/IP en la última
   hora — en vez de traer Redis/Upstash solo para esto; no
   sobre-ingenierizar).
5. ID único (uuid) y timestamp por lead.
6. Los datos deben quedar accesibles: notificación por correo
   automática (si hay Resend configurado) y/o instrucciones claras en
   el README de cómo consultar la tabla `leads` en Supabase (SQL de
   ejemplo incluido).
7. Capturar el origen del lead vía query param (ej. `?ref=andino`,
   `?ref=alliance`) en el campo `origen` de la tabla — el usuario va a
   mandar mensajes personalizados a varios prospectos distintos y
   quiere saber cuál convierte. Si no hay `ref` en la URL, usar
   `'landing-enbandeja'` como default.

### Esquema sugerido para la tabla `leads`

```
id              uuid (pk, default gen_random_uuid())
created_at      timestamptz (default now())
nombre          text (required)
casino_colegio  text (required)
ciudad          text (required)
email           text (required)
whatsapp        text (required)
gestion_actual  text (required) -- "¿Cómo gestionan hoy los pedidos?"
origen          text (default 'landing-enbandeja')
estado          text (default 'nuevo') -- nuevo/contactado/cerrado
```

## Estructura de contenido de la landing

### 1. Hero
- Título: **Software a medida para casinos escolares**
- Subtítulo: Ordenamos pedidos, pagos, menús, comprobantes y reportes
  en una plataforma simple, adaptada a la operación real de cada
  casino.
- CTA principal (ancla al formulario): **Solicitar una revisión
  gratuita**
- CTA secundario (texto o botón ghost): Ver cómo funcionaría en mi
  casino
- Texto de apoyo bajo los CTA: Primera versión operativa en 7 días,
  usando una base ya probada y ajustada a tu flujo de trabajo.

### 2. Problema
Dolor concreto, en lista o grid de íconos + texto corto:
- Pedidos por WhatsApp
- Comprobantes por correo
- Transferencias difíciles de conciliar
- Nombres de alumnos y cursos escritos a mano
- Menús enviados en PDF o imagen
- Cocina sin lista clara del día
- Apoderados preguntando por pagos o pedidos
- Reportes mensuales hechos a mano
- Planes mensuales y almuerzos ocasionales mezclados

Frase clave: Si tu casino depende de WhatsApp, transferencias y
planillas para operar todos los días, tarde o temprano se vuelve
difícil de controlar.

### 3. Solución
Portal propio del casino, con: menú diario o semanal, pedidos de
apoderados, datos del alumno y curso, registro de pagos o
comprobantes, pedidos ocasionales y planes mensuales, listado diario
para cocina, reportes por fecha/curso/alumno, panel administrativo.

Importante: no decir "todo incluido siempre" — decir que se adapta
según la operación de cada casino.

### 4. Cómo funciona (3 pasos)
1. **Revisamos tu operación actual** — Vemos cómo reciben pedidos,
   pagos, menús y comprobantes hoy.
2. **Adaptamos el portal a tu casino** — Configuramos menús, cursos,
   horarios, reportes y flujo de pedidos.
3. **Comienzan a operar** — En una semana pueden tener una primera
   versión funcionando para pedidos y reportes.

### 5. Para quién es
Casinos escolares · Concesionarios dentro de colegios · Colegios con
casino propio · Empresas de alimentación escolar · Casinos con
pedidos recurrentes y operación diaria.

### 6. Beneficios (grid corto)
Menos tiempo revisando comprobantes · Menos errores con alumnos y
cursos · Pedidos más ordenados · Cocina con información clara · Mejor
control de pagos · Reportes más simples · Apoderados con canal claro ·
Menos dependencia de WhatsApp y Excel.

### 7. Experiencia / credibilidad

**Dato verificado a usar tal cual (real, no inflado — no cambiar los
números):**

> "3 operaciones de alimentación funcionando hoy — dos casinos
> escolares que atienden a casi 1.900 estudiantes en total, y una
> operación industrial en minería."

Origen del número: 2 colegios reales (~1000 y ~900 estudiantes,
1000+900=1900) + 1 operación minera real, las 3 plataformas
construidas por el equipo detrás de EnBandeja y en uso real hoy.

**Reglas para esta sección — no negociables:**
- Nunca redondear hacia arriba ni inventar un número de clientes
  distinto a 3. "Más de X" solo si X es literalmente cierto.
- No decir "clientes de EnBandeja" — decir "el equipo detrás de
  EnBandeja" o similar, porque esas 3 relaciones son anteriores al
  rebranding a EnBandeja como marca.
- **No mostrar logos ni nombrar las empresas todavía** — el usuario no
  ha pedido autorización a esos 3 clientes para usar su nombre/logo
  públicamente. Si en una sesión futura confirma que ya tiene
  autorización, recién ahí se agregan logos reales — nunca simulados.
- Esta frase debe aparecer **dos veces**: una versión corta cerca del
  hero (ver "Mejores prácticas" en `CLAUDE.md`) y esta versión
  completa aquí en la sección de credibilidad.

**No inventar clientes, cifras ni logos más allá de lo de arriba.** Si
no hay logos reales que mostrar todavía, no simular ninguno.

### 8. CTA final + Formulario
Título: ¿Tu casino todavía recibe pedidos por WhatsApp, correo o
transferencia manual?
Texto: Podemos revisar tu caso y mostrarte cómo se vería una primera
versión operativa para tu casino.
Botón: Quiero revisar mi caso

Formulario (componente crítico, debe funcionar de principio a fin):
- Nombre (required)
- Casino / Colegio (required)
- Ciudad (required)
- Email (required, validado)
- WhatsApp (required, formato +56)
- ¿Cómo gestionan hoy los pedidos? (textarea, required)
- Honeypot oculto (anti-spam)
- Botón "Enviar" con estado de carga
- Mensaje de confirmación claro post-envío (no solo un checkmark
  genérico — confirmar que fue recibido y que se contactará pronto)

También mostrar correo institucional visible fuera del formulario,
vía variable de entorno (no hardcodear ningún dominio de ejemplo en
el código — ni siquiera como fallback).

## Tono de escritura

Claro, directo, comercial, sin tecnicismos innecesarios. No mencionar
IA. No sonar a plantilla genérica. Frases concretas sobre operación
real.

Usar frases como:
- Software a medida para casinos escolares.
- Primera versión operativa en 7 días.
- Ordena pedidos, pagos, menús y reportes en un solo lugar.
- Deja atrás WhatsApp, correos y planillas para gestionar almuerzos.
- Adaptamos el sistema a la forma real de trabajar de tu casino.

Evitar por completo:
- "La mejor plataforma del mercado"
- "Automatizamos todo con IA"
- "Aumenta tus ventas 300%"
- "Sistema completo en 7 días" (la promesa correcta es "primera
  versión operativa en 7 días")
- "Software revolucionario"
- "Solución integral 360"

## Motion y scroll

Usar GSAP + ScrollTrigger (`gsap`, `@gsap/react`) para animaciones
ligadas al scroll. No usar Three.js ni objetos 3D — peso y
complejidad innecesarios frente al público objetivo (directores de
colegio, encargados de casino, no audiencia técnica).

Motion con propósito, no decorativo por defecto. Máximo 2-3 momentos
orquestados, no animación dispersa en cada elemento:
1. **Hero al cargar** — secuencia de entrada del título, subtítulo y
   CTA (stagger sutil, sin exagerar).
2. **Sección "Problema"** — reveal escalonado de los ítems de dolor a
   medida que entran en viewport (ScrollTrigger con `toggleActions`),
   sensación de acumulación de caos que luego se resuelve.
3. **Sección "Cómo funciona"** — los 3 pasos se arman en secuencia
   mientras se scrollea (pin + timeline con ScrollTrigger), reforzando
   la idea de proceso ordenado — conecta con la propuesta de valor
   (orden vs. caos).

No animar cada card, ícono o línea de texto — eso es lo que hace que
un sitio se sienta genérico/"hecho con IA". Reservar el efecto más
notorio para "Cómo funciona".

Respetar `prefers-reduced-motion`: degradar a fade-in simple sin
scroll-jacking. `gsap.registerPlugin(ScrollTrigger)` una sola vez,
usar `useGSAP` de `@gsap/react` para cleanup automático en Next.js.

## Dirección visual

- Limpio, confiable, moderno, cercano a colegios — no infantil, no
  corporativo frío.
- Colores asociados a comida, orden y confianza (evitar paletas SaaS
  genéricas de morado/gradiente).
- Debe verse serio para directores de colegio y administradores de
  casino, no para consumidores finales.
- Tipografía legible, jerarquía clara, mobile-first real (muchos
  apoderados y encargados de casino entran desde el celular).
- Evitar plantillas visuales que se vean "hechas con IA" — cuidar esto
  especialmente, es un dolor identificado en la competencia.

## Requisitos técnicos adicionales

- Totalmente responsive, probar especialmente en mobile (viewport
  angosto).
- SEO básico: title, meta description, OG tags con el mensaje de
  posicionamiento.
- Performance razonable: sin librerías pesadas innecesarias.
- Variables de entorno documentadas en `.env.example` (Supabase
  URL/key, email destino de notificación, dominio de contacto, etc.)
- README con: cómo correr local, cómo desplegar en Vercel, cómo
  consultar los leads guardados en Supabase (SQL de ejemplo), cómo
  cambiar el correo de contacto.
- Google Analytics u otro tracking NO es prioridad para la primera
  versión — omitir salvo que se pida explícitamente.

## Criterio de éxito de la primera pantalla

En menos de 5 segundos, alguien debe entender: qué es EnBandeja, para
quién es, qué problema resuelve, y por qué vale la pena dejar sus
datos.

## Entregable esperado

Landing completa, desplegable en Vercel, con formulario que guarda
leads de verdad en Supabase y confirma su recepción. No entregar una
versión "bonita pero sin backend" — si hay que priorizar entre pulir
visualmente y que el formulario funcione end-to-end, priorizar que
funcione (pero ver "funcional Y atractiva" en `CLAUDE.md` — no es
excusa para descuidar el diseño).
