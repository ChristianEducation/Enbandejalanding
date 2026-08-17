# Gate 3 — Sistema visual y motion

Estado: cerrado por autoauditoría.

## Concepto

`Editorial operacional`: claridad de una plataforma B2B, calidez de un servicio humano y precisión de una operación diaria.

UI/UX Pro Max sugirió un patrón de operaciones en tiempo real, navy, azul y superficies claras. Se conserva esa base, pero se descartan su degradado indigo-violeta, Inter, métricas de hero y estética mobile-enterprise porque diluyen la identidad de EnBandeja.

## Color

- `ink`: navy profundo para titulares y navegación.
- `ink-soft`: azul grisáceo para texto secundario.
- `paper`: crema casi blanco para superficie principal.
- `mist`: azul muy claro para separar capítulos.
- `blue`: azul de acción.
- `coral`: acento de marca, estados seleccionados y detalles de énfasis.
- `success`, `warning`, `danger`: reservados para estados funcionales.

Reglas:

- No usar blanco o negro puros como base.
- Coral ocupa menos del 10% de la interfaz.
- El color nunca comunica un estado sin texto o iconografía.
- Todos los pares de texto deben cumplir WCAG AA.

## Tipografía

- Titulares: Lexend, por continuidad de marca, con peso 600–700.
- Cuerpo: Source Sans 3, por legibilidad y tono humano.
- Etiquetas: Source Sans 3 semibold en mayúsculas con tracking moderado.
- Escala fluida con `clamp()`.
- Medida máxima: 70 caracteres para párrafos.

## Retícula y ritmo

- Contenedor amplio: hasta 1440 px con gutters fluidos.
- Texto de lectura: 620–720 px.
- Retícula de 12 columnas en desktop; composición adaptada, no encogida, en móvil.
- Escala espacial basada en 8 px.
- Secciones alternan densidad: hero expansivo, ciclo concentrado, fotografía amplia, cierre compacto.

## Superficies

- Radio de 16–28 px según escala.
- Borde fino tintado.
- Sombras suaves y largas solo donde indiquen profundidad real.
- Blur únicamente en la superficie flotante del hero o navegación.
- No anidar tarjetas visuales.

## Fotografía

- Documental editorial, luz natural, actividad creíble.
- Contexto chileno o latinoamericano contemporáneo.
- Adultos y equipos operativos como sujetos principales.
- Menores solo de fondo y no identificables.
- Sin logos, texto artificial, manos deformes ni interfaces generadas dentro de la foto.
- Las interfaces se superponen en código para mantener legibilidad y autenticidad.

## Movimiento

- Duraciones: 160–240 ms para feedback; 450–700 ms para entradas.
- Curva principal: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Firma: mensaje → contexto humano → plataforma conectada.
- Scroll: revela relaciones y progreso, no decora.
- Transform y opacity como propiedades principales.
- Todas las experiencias tienen alternativa estática.

## Iconografía

- Lucide, trazo consistente.
- Tamaños definidos: 16, 20, 24 y 32 px.
- No usar emojis como iconos.

## Criterios de cierre

- El sistema se reconoce como EnBandeja sin depender del logo.
- La fotografía y el producto tienen pesos complementarios.
- No hay huellas evidentes de diseño genérico generado por IA.
- La experiencia es legible y funcional en 375, 768, 1024 y 1440 px.
- Los tokens permiten implementar sin colores ni espaciados arbitrarios.

