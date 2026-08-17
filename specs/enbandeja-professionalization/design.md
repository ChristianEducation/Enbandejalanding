# Diseño de solución

## 1. Principio rector

**Mostrar una operación conectada, no describir una lista de funciones.** La demo será producto demostrable, origen de capturas y principal diferenciador comercial.

## 2. Dirección visual

### Personalidad

- Confiable y serena.
- Operacional y precisa.
- Humana, no infantil.
- Especializada en alimentación escolar.
- Moderna sin códigos SaaS genéricos.

### Anti-patrones

- Gradientes morado/azul, neón o glow.
- Glassmorphism decorativo.
- Grids repetidos de tarjetas idénticas.
- Fotos de stock genéricas de estudiantes comiendo.
- Dashboards inventados como imagen.
- Exceso de pills, sombras y esquinas redondeadas.
- Íconos emoji o mezcla de familias.

### Logo recomendado

Explorar tres rutas y seleccionar una mediante gate:

1. **Monograma modular EB (recomendada):** la E y B se forman con módulos de bandeja/lista.
2. **Bandeja ordenada:** vista superior dividida en zonas que recuerdan una interfaz.
3. **Flujo coordinado:** tres entradas convergen en una bandeja/sistema.

El refinamiento final debe ser vectorial; una imagen generada solo sirve como referencia conceptual.

## 3. Arquitectura de la demo

### Ruta

`/demo` con navegación interna por rol. No iframe y no overlay sobre la landing.

### Shell común

- Marca de institución ficticia.
- Badge persistente “Entorno de demostración”.
- Selector de rol accesible.
- Acción “Reiniciar demo”.
- Enlace “Volver a EnBandeja”.
- CTA contextual hacia `/#contacto?ref=demo` o estrategia equivalente que preserve origen.

### Estado conceptual

```text
DemoState
├── activeRole
├── selectedStudent
├── weeklySelections
├── orders
├── paymentMethod
├── exceptionStatus
├── kitchenStatus
├── deliveryStatus
└── hasCompletedTour
```

El estado inicial será determinista. Las acciones modificarán una única fuente de verdad local. Reiniciar restaurará exactamente el dataset semilla.

### Dataset ficticio mínimo

- Institución: “Colegio Modelo EnBandeja” (identidad deliberadamente descriptiva y ficticia).
- Casino: “Casino Escolar Demo”.
- 6 cursos.
- 12 alumnos ficticios; solo uno interactivo en el flujo principal.
- 5 días de menú.
- 3 alternativas: menú del día, vegetariano y ocasional/especial.
- 8–12 pedidos semilla.
- Estados: pago ficticio aprobado, confirmado para Cocina, en preparación, listo para entrega y entregado.
- Observaciones alimentarias ficticias, redactadas sin sugerir diagnóstico médico real.

## 4. Recorridos

### Apoderado — happy path

```text
Inicio → Seleccionar alumno → Menú semanal → Elegir días
→ Revisar pedido → Simular pasarela aprobada → Crear pedido
→ Ver número y estado → Cambiar a Administración
```

### Administración — happy path

```text
Resumen → Pedidos pendientes → Abrir pedido recién creado
→ Supervisar sincronización → Revisar excepciones → Ver consolidado actualizado
→ Cambiar a Cocina
```

### Cocina — happy path

```text
Listado de hoy → Totales por menú → Agrupar por curso → Preparar
→ Marcar listo → Simular identificación por QR → Confirmar entrega
→ Ver observaciones → Marcar preparación → Confirmar actualización
```

### Recorrido guiado

Debe ser opcional, breve y descartable. No bloquear interacción con un modal largo. Puede usar señales contextuales de una línea y progreso 1/3, 2/3, 3/3.

## 5. Arquitectura de la landing futura

1. **Header:** logo, “Explorar demo” y CTA principal.
2. **Hero:** resultado operacional + producto real + dos CTA.
3. **Prueba temprana:** 3 operaciones / casi 1.900 estudiantes.
4. **Problema:** composición narrativa de canales fragmentados.
5. **Solución:** flujo visual apoderado → administración → cocina.
6. **Demo:** preview con tres roles y CTA a `/demo`.
7. **Implementación:** revisión, adaptación y primera versión.
8. **Microcaso:** contexto, cambio y evidencia autorizada.
9. **Resultados:** 3–4 beneficios jerarquizados, no 8 tarjetas iguales.
10. **FAQ de confianza:** datos, soporte, tiempos y adaptación.
11. **Contacto:** expectativa, privacidad y formulario optimizado.
12. **Footer:** identidad, contacto y enlaces legales.

## 6. Estrategia de imágenes

### Deben salir de HTML real

- Hero con portal del apoderado.
- Listado de cocina.
- Panel de administración.
- Composición de tres roles.
- Open Graph final, usando capturas reales.

### Pueden ser generadas

- Textura de marca.
- Ilustración conceptual del caos operacional.
- Fondo editorial abstracto.
- Exploraciones no finales del logo.

### Solo con material auténtico/autorizado

- Fotografía del equipo.
- Fotografía de una operación real.
- Retrato de cliente/testimonio.
- Logos de instituciones.

## 7. Estrategia de conversión de lanzamiento

- CTA primario: “Solicitar una revisión gratuita”.
- CTA exploratorio: “Explorar una operación de ejemplo”.
- CTA de demo: “Quiero verlo adaptado a mi casino”.
- La demo nunca debe bloquear el CTA ni solicitar datos para comenzar.
- Antes de implementar se elegirá una sola variante de formulario: actual mejorada o progresiva. Los experimentos comparativos quedan fuera del lanzamiento.
- El origen debe distinguir al menos `landing`, `hero-demo`, `demo-parent`, `demo-admin` y `demo-kitchen`.

## 8. Gates de aprobación

### Gate G1 — Marca

Se aprueba una ruta de logo, paleta y tipografía antes de producir assets finales.

### Gate G2 — UX demo

Se aprueban wireframes, dataset y recorridos antes de implementar estados conectados.

### Gate G3 — Demo funcional

Los tres roles completan el happy path y sincronizan estado antes de capturar pantallas.

### Gate G4 — Landing

Se aprueban hero, narrativa y formulario antes del pulido y motion.

### Gate G5 — Producción

Accesibilidad, rendimiento, SEO, formulario y trazabilidad superan QA.

## 9. Fuera del diseño de lanzamiento

- A/B testing o personalización por tráfico.
- Analítica avanzada.
- Extensión de la demo a nuevos módulos o roles.
- Integraciones reales de login, pago o backend.
- Dark mode.
- Iteraciones basadas en datos posteriores a publicación.
