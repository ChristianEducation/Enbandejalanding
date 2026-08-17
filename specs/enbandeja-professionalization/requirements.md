# Requisitos

## 1. Resultado de negocio

### R-BIZ-01 — Comprensión inmediata

La primera pantalla debe comunicar qué es EnBandeja, para quién es, qué ordena y cuál es el próximo paso.

**Aceptación:** una persona ajena al proyecto puede responder esas cuatro preguntas después de observar el hero durante cinco segundos.

### R-BIZ-02 — Evidencia antes de captación

La landing debe mostrar producto verificable antes del formulario.

**Aceptación:** aparecen capturas provenientes de la demo real y un acceso visible a `/demo` antes del CTA final.

### R-BIZ-03 — Captación de baja fricción

El visitante debe conocer el costo, compromiso, duración y siguiente paso de la revisión antes de enviar sus datos.

**Aceptación:** el bloque de contacto explica qué ocurrirá y evita promesas ambiguas.

### R-BIZ-04 — Veracidad

Solo pueden utilizarse las tres operaciones y casi 1.900 estudiantes ya verificados. Clientes, cargos, fotografías y testimonios requieren autorización explícita.

## 2. Marca

### R-BRAND-01 — Territorio

La marca debe sentirse confiable, cercana, operacional y especializada; no infantil, gastronómica genérica ni SaaS futurista.

### R-BRAND-02 — Símbolo

El símbolo debe combinar orden digital y bandeja mediante una forma propietaria, reconocible a 16 px.

### R-BRAND-03 — Sistema completo

La marca final debe incluir logotipo horizontal, isotipo, versión compacta, monocromática, fondos claro/oscuro, favicon y app icon.

### R-BRAND-04 — Accesibilidad

Todas las combinaciones oficiales de marca deben documentar pares de color válidos y tamaños mínimos.

## 3. Demo

### R-DEMO-01 — Entrada y contexto

`/demo` debe explicar que es una operación ficticia y permitir elegir Apoderado, Administración o Cocina.

### R-DEMO-02 — Datos ficticios

La demo usará una institución no confundible con una entidad real. Ningún dato personal, dominio, RUT, transacción o medio de pago será real. La pasarela será una representación genérica y local.

### R-DEMO-03 — Flujo del apoderado

El usuario podrá seleccionar alumno, revisar menú semanal, escoger almuerzos, revisar resumen y simular un pago aprobado en una pasarela ficticia del cliente.

### R-DEMO-04 — Flujo administrativo

El usuario podrá revisar pedidos con pago ficticio aprobado, filtrar información, abrir un pedido, confirmarlo operativamente para Cocina y consultar un consolidado.

### R-DEMO-05 — Flujo de cocina

El usuario podrá consultar totales diarios, distribución por menú y curso, observaciones, estados de preparación y estado de entrega. La demo mostrará QR como ejemplo, aclarando que ticket impreso, búsqueda, listados u otros flujos son configurables.

### R-DEMO-06 — Continuidad entre roles

Un pago ficticio aprobado debe confirmar el pedido e incorporarlo automáticamente al consolidado de Cocina, sin aprobación administrativa individual. Preparación, listo y entregado deben reflejarse entre roles. Administración supervisa y gestiona excepciones.

### R-DEMO-07 — Sesión local

El estado se mantendrá durante la sesión y podrá reiniciarse desde una acción explícita. No se guardará remotamente.

### R-DEMO-08 — Conversión contextual

Cada rol debe ofrecer un CTA no intrusivo para solicitar una revisión adaptada al casino del visitante.

### R-DEMO-09 — Transparencia

Toda simulación de pago, pasarela, QR o entrega debe usar lenguaje como “Simular”, “Demostración” o “Dato ficticio”. Un aviso persistente aclarará que los módulos, reglas, estados e integraciones son ejemplos configurables según la operación y logística de cada cliente.

## 4. Landing

### R-LAND-01 — Hero

Debe priorizar el resultado operacional, mostrar producto real y ofrecer dos acciones jerarquizadas: solicitar revisión y explorar demo.

### R-LAND-02 — Narrativa

La secuencia recomendada será: hero, evidencia temprana, problema, flujo de solución, demo, proceso, caso/credibilidad, resultados, contacto.

### R-LAND-03 — Variedad compositiva

No más de dos secciones consecutivas pueden depender del mismo grid de tarjetas con ícono + texto.

### R-LAND-04 — Prueba social

La prueba autorizada debe aparecer cerca del hero y desarrollarse en una sección posterior sin duplicación literal innecesaria.

### R-LAND-05 — Formulario

Debe evaluarse una variante reducida o progresiva. Cualquier cambio conservará validación cliente/servidor, honeypot, rate limit, origen y persistencia.

### R-LAND-06 — Privacidad

El formulario debe explicar el uso de los datos y enlazar una política de privacidad válida antes de producción.

## 5. UX, accesibilidad y responsive

### R-UX-01 — Touch

Targets táctiles de al menos 44×44 px y separación mínima de 8 px.

### R-UX-02 — Teclado

Todo flujo esencial debe poder completarse sin mouse; el foco será visible y seguirá el orden visual.

### R-UX-03 — Formularios

Labels visibles, instrucciones persistentes para formatos complejos, errores junto al campo y foco al primer error.

### R-UX-04 — Estados

Cada acción asincrónica o simulada tendrá estado inicial, activo, cargando si corresponde, éxito y recuperación ante error.

### R-UX-05 — Motion

Motion de 150–300 ms para microinteracciones, transform/opacity, máximo dos momentos fuertes por vista y alternativa reduced-motion.

### R-UX-06 — Texto adaptable

La experiencia debe permanecer utilizable con zoom del 200 %, contenido largo y viewport móvil horizontal.

### R-UX-07 — Breakpoints

Validación explícita en 375, 768, 1024 y 1440 px, además de móvil horizontal.

## 6. Rendimiento y SEO

### R-PERF-01 — Imágenes

Imágenes raster en AVIF/WebP, dimensiones reservadas, `sizes` correcto y lazy load bajo el fold.

### R-PERF-02 — Demo

La demo no debe formar parte del bundle inicial de la landing.

### R-SEO-01 — Metadata

Landing y demo tendrán title, description, canonical y previews sociales propios. La demo se evaluará como `noindex` si su contenido no aporta una página de búsqueda útil.

### R-SEO-02 — Imagen social

La landing debe tener una imagen Open Graph de 1200×630 representativa, sin texto generado por IA.

## 7. Fuera del alcance de lanzamiento

- Login o cuentas reales.
- Pagos o integración con pasarela.
- Backend o base de datos para la demo.
- Carga real de comprobantes.
- Personalización por colegio en tiempo real.
- Panel completo de configuración.
- Dark mode obligatorio.
- Logos o nombres de clientes sin autorización.
- Fotografías con menores identificables.
- Analítica avanzada o experimentos A/B.
- Optimización continua posterior a publicación.
- Nuevos módulos o roles de la demo.
