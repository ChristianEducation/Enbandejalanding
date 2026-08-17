# Gate 4 — Assets de lanzamiento

Fecha de producción y revisión: 14-07-2026.

## Resultado

Se completó el paquete visual previsto para la landing y sus derivados finales fueron integrados en el código público durante la Fase 5. Las capturas proceden de la demo funcional aprobada y conservan sus datos ficticios, su aviso de configuración y el recorrido completo entre roles.

## Entregables

- Captura Apoderado 9:19: identificación progresiva por ciclo, curso y estudiante.
- Captura Administración 16:10: visión general de la operación en un solo lugar.
- Captura Cocina 16:10: producción y entrega dentro del mismo flujo.
- Composición Apoderado → Administración → Cocina, basada exclusivamente en las capturas reales de la demo.
- Ilustración editorial vectorial del problema operacional: información fragmentada que converge en un flujo ordenado.
- Pieza Open Graph 1200 × 630 con marca, propuesta de valor y vistas reales de la demo.
- Fuentes editables SVG/PNG y derivados WebP/AVIF optimizados.

## Decisiones de producción

- El recurso editorial se resolvió como SVG determinista para evitar texto inventado, artefactos de IA o una interfaz ficticia que pudiera confundirse con producto real.
- Las capturas no incluyen personas, información personal, clientes reales ni marcas de terceros.
- La pieza de tres roles no promete un flujo universal: muestra una demostración configurable y conserva el aviso correspondiente dentro de la interfaz.
- Open Graph usa el logotipo aprobado de EnBandeja y texto compuesto, no texto generado dentro de una imagen.
- El lenguaje comercial pone el foco en coordinación, visibilidad y adaptación; los detalles técnicos obvios del procesamiento no se presentan como propuesta de valor.

## QA visual y técnico

- Proporciones objetivo verificadas: Apoderado 9:19; Administración y Cocina 16:10; Open Graph 1200 × 630.
- Renderizado de los tres SVG validado mediante exportación PNG.
- Versiones WebP y AVIF generadas para uso responsive.
- Legibilidad revisada en la composición completa y en Open Graph.
- Alt text, uso decorativo y captions definidos en `asset-manifest.md`.
- No se detectaron datos reales, acciones reales de pago ni comprobantes de transferencia.

## Estado

T401–T405 y T501–T509 están terminadas. Los assets se usan en hero, problema, flujo, preview de demo y metadata social. El hito `G4` de `tasks.md` queda pendiente exclusivamente del visto bueno visual del usuario sobre la landing completa.
