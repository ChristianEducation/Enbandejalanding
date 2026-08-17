# Gate 7 — Auditoría de calidad

Estado: cerrado técnicamente. Revisión visual en navegador pendiente de autorización explícita para localhost.

## Veredicto anti-patterns

Pasa.

La nueva landing evita los indicadores principales de diseño genérico generado:

- No usa gradientes de texto.
- No usa una cuadrícula repetitiva de tarjetas con iconos.
- No usa métricas ficticias en el hero.
- No aplica glassmorphism como lenguaje global.
- No utiliza movimiento infinito ni rebotes.
- La fotografía y las interfaces reales construyen una narrativa específica del sector.

## Resultado

- Críticos: 0.
- Altos: 0 detectados en revisión estática y compilación.
- Medios: 2.
- Bajos: 2.

## Hallazgos

### Medio — Revisión visual multiplataforma pendiente

- Categoría: responsive y calidad visual.
- Impacto: la estructura está diseñada para 375, 768, 1024 y 1440 px, pero falta observar el render final en navegador.
- Acción: abrir la producción local únicamente cuando el usuario autorice explícitamente el uso de localhost.

### Medio — `metadataBase` sin dominio de producción

- Categoría: SEO.
- Impacto: Next.js usa `http://localhost:3000` como fallback para imágenes sociales.
- Acción: definir `NEXT_PUBLIC_SITE_URL` antes del despliegue.

### Bajo — Fuentes dependen de Google durante el build

- Categoría: reproducibilidad.
- Impacto: el build necesita red para descargar Lexend y Source Sans 3 si no están en caché.
- Acción futura: considerar fuentes autohospedadas.

### Bajo — PNG fuente conservados

- Categoría: mantenimiento.
- Impacto: aumentan el tamaño del repositorio, pero no se sirven en la landing.
- Acción futura: archivar o eliminar los originales después de la aprobación visual.

## Accesibilidad

- Un `h1` único y jerarquía de secciones coherente.
- Controles interactivos semánticos.
- Labels y relaciones ARIA en las perspectivas.
- Foco visible global.
- Touch targets de 44 px o más.
- Contraste fuerte sobre superficies claras y navy.
- Imágenes significativas con texto alternativo; fotos decorativas en los paneles con alt vacío.
- `prefers-reduced-motion` respetado en Motion y CSS.

## Rendimiento

- Fotografías convertidas a WebP y reducidas a 76–136 KB.
- `next/image` con `sizes`.
- Hero prioritario; resto bajo carga diferida de Next.
- Animaciones basadas principalmente en transform y opacity.
- No se añadió JavaScript de 21st ni un carrusel autónomo.

## Compilación

`npm run build`: exitosa.

- TypeScript: correcto.
- Generación estática: correcta.
- Rutas: `/`, `/demo`, `/privacidad`, `/icon.svg`, `/api/leads`.

## Positivo a preservar

- Mensaje especializado y directo.
- Fotografía humana conectada a producto real.
- Arquitectura modular explicada sin prometer desarrollo desde cero.
- Demo claramente ficticia.
- Copy comercial centrado en continuidad y control operacional.

