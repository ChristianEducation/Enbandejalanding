# Gate 2 — Patrones visuales y de interacción

Estado: cerrado por autoauditoría.

## Fuentes evaluadas

- Referencias estratégicas compartidas por el usuario: LunchPad, Cashless Cafeteria, SchoolBitez y HotLunch.
- 21st.dev: `Flux Card Hero`.
- 21st.dev: `Glassmorphism Trust Hero`.
- Recomendaciones de UI/UX Pro Max para una landing B2B de operaciones.

## Qué se toma

### De Flux Card Hero

- El producto como elemento principal del hero.
- Superposición controlada de vistas para comunicar versatilidad.
- Una sola transición narrativa entre roles, no un carrusel autónomo permanente.
- Profundidad mediante capas con jerarquía clara.

### De Glassmorphism Trust Hero

- Retícula amplia de doce columnas.
- Superposición puntual de una superficie translúcida sobre fotografía.
- Entrada inicial orquestada.

### De las referencias del sector

- Contexto humano que permita comprender dónde se usa el producto.
- Separación clara entre familias, operación y administración.
- Explicación del ciclo completo, no una lista aislada de funcionalidades.
- Implementación, migración y acompañamiento como señales de madurez.

## Qué no se toma

- Gradientes de texto.
- Métricas inventadas para rellenar el hero.
- Logos de clientes no autorizados.
- Carruseles que cambien solos cada tres segundos.
- Glassmorphism en todas las secciones.
- Navegación flotante que compita con el contenido.
- Estética oscura y genérica de producto de inteligencia artificial.
- Tarjetas repetidas con icono, título y párrafo.

## Patrón final

Dirección: `editorial operacional`.

- Fondo cálido y luminoso.
- Navy como tinta principal; coral como señal de acción, no decoración constante.
- Fotografía documental latinoamericana y pantallas reales del producto.
- Composición asimétrica con grandes áreas de respiración.
- Detalles inspirados en bandejas, rutas y estados mediante líneas, recortes y marcos.
- Una firma visual recordable: el ciclo operacional se extiende por la página y conecta las vistas de cada rol.

## Uso de movimiento

- Entrada del hero con secuencia breve.
- Revelado del producto después del mensaje.
- Progreso del ciclo conectado al scroll.
- Transición cruzada en las vistas por rol.
- Estados de formulario y acordeón con feedback.
- Sin rebotes, movimiento infinito, parallax intenso ni animación de propiedades de layout.
- `prefers-reduced-motion` obligatorio.

## Decisión sobre 21st

Los componentes se usan como referencias estructurales, no como plantillas pegadas. Su código y dependencias solo se incorporarían si aportaran una interacción que el sistema propio no puede resolver con menor complejidad. La identidad, copy, tokens y accesibilidad permanecen bajo control de EnBandeja.

## Criterios de cierre

- La referencia es reconocible en calidad, no en copia literal.
- El hero comunica producto y contexto humano en una sola composición.
- La landing no parece un catálogo de componentes.
- El movimiento aporta comprensión.
- El sistema es coherente con la marca aprobada.

