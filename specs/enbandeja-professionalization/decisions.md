# Decisiones de lanzamiento

## D001 — Objetivo de conversión

- **CTA primario:** Solicitar una revisión gratuita.
- **CTA exploratorio:** Explorar una operación de ejemplo.
- **Conversión principal:** lead válido persistido.
- **Demo sin barrera:** no se pedirán datos para entrar en `/demo`.

## D002 — Expectativa del CTA

Antes del formulario se comunicará revisión sin costo y sin compromiso; respuesta por WhatsApp o correo; revisión de la operación actual; y promesa correcta de “primera versión operativa en 7 días”, no “sistema completo”.

## D003 — Datos del lead

El lanzamiento conservará la capacidad de capturar nombre, casino/colegio, ciudad, email, WhatsApp y gestión actual. En G4 se elegirá entre formulario actual mejor explicado o presentación progresiva de los mismos datos. Persistencia, validación, honeypot, rate limit y `ref` son invariantes.

## D004 — Territorio visual

### Debe sentirse

Confiable, operacional, cercano, adulto, especializado y ordenado sin ser frío.

### No debe sentirse

Infantil, restaurante genérico, SaaS futurista, corporativo bancario distante ni plantilla de tarjetas generada por IA.

### Dirección base

- Luz, no dark mode por defecto.
- Azul profundo para confianza y estructura.
- Crema tintado como superficie humana.
- Coral restringido a calidez, fricción o énfasis secundario.
- Verde/ámbar/rojo solo para estados operacionales.
- Lexend + Source Sans 3 se conservan inicialmente.
- Variación visual 6/10, motion 4/10 y densidad 5/10.

## D005 — Principio de marca

El logo debe representar “la operación organizada en un solo lugar”, no solo comida. Debe funcionar en favicon, app y contexto B2B.

Direcciones:

1. Monograma modular EB — recomendada.
2. Bandeja ordenada.
3. Flujo coordinado.

## D006 — Escritura y dirección seleccionada

- Escritura oficial: `EnBandeja`.
- Wordmark base: Lexend SemiBold con ajuste óptico.
- Dirección oficial de lanzamiento: versión revisada del candidato 1 de Gemini, aprobada el 13-07-2026.
- Construcción: monograma `EB` sólido; `E` azul profundo, `B` coral y bandeja inferior azul de curva contenida.
- Sin degradados, contenedor exterior ni tagline integrado.
- Variantes obligatorias: color, monocromática, invertida, horizontal, vertical y favicon simplificado.
- El concepto queda congelado para este spec. Cualquier rediseño posterior queda fuera del alcance de lanzamiento.

## D007 — Gate 1 aprobado

El sistema de marca y su dirección visual quedan aprobados. El kit vectorial de `brand-kit/` es la fuente de trabajo para la demo y la landing; su integración en producto comienza en los gates posteriores.

## D008 — Gate 2 aprobado

El 13-07-2026 se aprobaron sin cambios:

- La identidad ficticia `Colegio Modelo EnBandeja`.
- Los perfiles `Estudiante Demo 01–12`.
- El pedido principal `DEM-1042`, compuesto por cuatro almuerzos y un total ficticio de `$16.800`.
- El recorrido conectado Apoderado → Administración → Cocina.
- Los wireframes responsive, la simulación local de una pasarela genérica y las reglas de accesibilidad documentadas en `gate-2/`.

### D009 — Pago por pasarela del cliente y entrega configurable

La demo no representa transferencias ni comprobantes. Cada implementación se integra con la pasarela de pago acordada para el cliente; en la demo solo se simula una respuesta aprobada sin datos bancarios ni cobro. Un pago aprobado confirma y sincroniza automáticamente el pedido con Cocina. Administración supervisa trazabilidad y excepciones, sin aprobar pedidos individualmente. Cocina completa el ciclo registrando la entrega; QR es el ejemplo interactivo, pero ticket impreso, búsqueda manual, listados o el flujo vigente del casino se presentan como alternativas configurables. Todos los módulos, reglas, estados e integraciones mostrados son ficticios y se definen con cada operación.

### D010 — Cierres operativos globales opcionales

La demo no exige un cierre manual. Si un casino necesita una hora de corte, generación definitiva de producción o cierre por día/periodo, se configura como acción global sobre el conjunto operacional, nunca como confirmación pedido por pedido. La demo lo explica, pero no lo simula como requisito universal.

Estas decisiones quedan congeladas como entrada de implementación para G3.
