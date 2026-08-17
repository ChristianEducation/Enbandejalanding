# EnBandeja — Professionalization Spec

## Estado

**Ready for execution.** Esta carpeta define el alcance cerrado de lanzamiento para la marca, la demo interactiva y la landing. No contiene implementación ni backlog postlanzamiento.

## Objetivo

Transformar la landing actual en una experiencia B2B distintiva, verificable y orientada a conversión, usando una demo navegable como evidencia principal del producto.

## Documentos

- [requirements.md](requirements.md): alcance, requisitos y criterios globales.
- [design.md](design.md): arquitectura de experiencia, marca, demo y landing.
- [tasks.md](tasks.md): backlog atómico, ordenado por dependencias y gates.
- [assets.md](assets.md): inventario de recursos y prompts listos para producirlos.

## Decisiones tomadas

1. La demo vivirá en `/demo`, no dentro de un iframe.
2. Usará un colegio y personas completamente ficticias.
3. Permitirá cambiar entre Apoderado, Administración y Cocina.
4. Las acciones principales se reflejarán entre roles durante la sesión.
5. No tendrá pagos, autenticación ni persistencia remota reales.
6. Las capturas principales de la landing saldrán de la demo HTML real.
7. G1 aprobó el candidato 1 revisado: monograma `EB`, bandeja inferior y wordmark `EnBandeja`.
8. No se inventarán clientes, testimonios, certificaciones ni resultados.

## Orden de ejecución de lanzamiento

```text
Marca y dirección visual
        ↓
Modelo y UX de la demo
        ↓
Demo conectada y responsive
        ↓
Capturas y assets editoriales
        ↓
Rediseño de landing
        ↓
Accesibilidad, rendimiento y QA
        ↓
QA integral y lanzamiento
```

## Definition of Done global

- El visitante entiende producto, público y beneficio en menos de cinco segundos.
- Puede explorar un flujo completo sin entregar información real.
- La demo explica explícitamente que sus datos son ficticios.
- La landing demuestra el producto con interfaces reales y coherentes.
- La experiencia funciona a 375, 768, 1024 y 1440 px sin scroll horizontal.
- Todo el recorrido esencial es operable con teclado.
- Contraste y formularios cumplen WCAG 2.2 AA.
- `prefers-reduced-motion` dispone de una experiencia equivalente.
- Objetivos: LCP ≤ 2,5 s, INP < 200 ms y CLS < 0,1 en producción.
- El formulario de leads continúa persistiendo datos reales y conserva sus defensas actuales.
- El build de producción termina correctamente y no quedan defectos críticos o altos.

## Fuera del spec

Analítica avanzada, experimentos A/B, evolución posterior de la demo, dark mode, nuevas integraciones y optimización continua se gestionarán en un backlog futuro separado. No bloquean este lanzamiento.
