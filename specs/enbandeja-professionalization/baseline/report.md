# Baseline — 12 de julio de 2026

## Capturas

Se registraron estados inmediatos y asentados en 375×812, 768×1024, 1024×768 y 1440×1000. Las versiones `-settled` esperan 2,5 segundos para permitir que termine la entrada del hero.

## Lighthouse local

| Categoría | Resultado |
|---|---:|
| Rendimiento | 69 |
| Accesibilidad | 96 |
| Buenas prácticas | 100 |
| SEO | 100 |

| Métrica | Resultado |
|---|---:|
| FCP | 1,0 s |
| LCP | 7,9 s |
| TBT | 300 ms |
| CLS | 0 |
| Speed Index | 3,0 s |

El reporte fuente está en `lighthouse.json`.

## Conservar

- Propuesta específica y comprensible una vez asentado el hero.
- Paleta confiable y cálida, lejos del morado SaaS genérico.
- Lexend + Source Sans 3: accesibles y apropiadas.
- Prueba social verificable y temprana.
- Formulario real, claro y consistente.
- Mockups preparados para recibir capturas reales.

## Evolucionar

- Hero orientado a resultado operacional y demo real.
- Prueba social con mejor contexto, sin inflar cifras.
- Problema, beneficios y credibilidad para evitar tarjetas repetidas.
- Solución explicada como flujo entre roles.
- Formulario con tiempo, compromiso, privacidad y siguiente paso explícitos.
- Símbolo de marca más propietario y robusto como favicon.

## Reemplazar o corregir

- Mockups ilustrativos por capturas de la demo HTML.
- Grandes vacíos verticales asociados al pin de “Cómo funciona”.
- Estado inicial invisible del hero en capturas sin espera.
- Opacidad excesivamente baja de los pasos durante captura full-page.
- Contraste insuficiente detectado por Lighthouse.
- LCP local de 7,9 s y TBT de 300 ms.

## Riesgos

1. La entrada GSAP puede dejar contenido esencial temporalmente invisible en automatización, redes lentas o ejecución interrumpida.
2. El pin de escritorio genera una huella vertical demasiado grande.
3. La repetición de tarjetas reduce diferenciación y ritmo.
4. Los mockups ilustrativos explican, pero no demuestran producto navegable.
5. Falta una imagen social representativa.

