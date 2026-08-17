# EnBandeja Landing - Guia para Retomar

Usar este archivo al iniciar una nueva sesion de trabajo.

## Antes de cambiar algo

1. Leer `docs/ENBANDEJA_SESSION_CONTEXT.md`.
2. Revisar los archivos principales:
   - `src/components/hero.tsx`
   - `src/components/platform-story.tsx`
   - `src/components/pricing-section.tsx`
   - `src/components/site-header.tsx`
   - `src/app/globals.css`
3. Si el usuario adjunta screenshots, comparar contra el estado actual antes de modificar.

## Criterios de diseno

- Mantener una landing B2B premium, calida y profesional.
- Usar motion con intencion: scroll, entrada, parallax, microinteracciones.
- No usar estetica gamer, oscura, infantil ni demasiado juguetona.
- Evitar decoracion generica tipo blobs/orbs.
- Evitar que el hero se corte en la primera vista.
- Evitar que el timeline sticky se suelte antes del ultimo paso.
- Mantener mobile usable, sin sticky largo si se vuelve incomodo.

## Criterios de contenido

Mantener o reforzar estos mensajes:

- Software a medida para operaciones de alimentacion escolar.
- Plataforma modular que conecta familias, cocina, administracion y finanzas.
- Se conversa primero, luego se define y cotiza.
- Cotizacion segun modulos, implementacion y acompanamiento.
- Puede existir mensualidad o pago unico.
- Promesa: 7 dias habiles para construccion, implementacion y comienzo de marcha blanca.

## Validacion minima antes de responder

Ejecutar:

```powershell
npx.cmd tsc --noEmit
```

Si el cambio afecta build, rutas, Next, metadata, imagenes o componentes client/server, ejecutar tambien:

```powershell
npm.cmd run build
```

Nota: el build puede requerir red por Google Fonts.

## Si se trabaja en visual QA

Verificar al menos:

- Desktop ancho tipo 1440x900.
- Desktop bajo tipo 1366x768.
- Mobile aproximado 390x844.
- Hero completo en primera vista.
- Header no tapa contenido.
- Timeline de pasos sincronizado con scroll.
- CTA de contacto visible y claro.

## Ultimo estado conocido

La landing fue considerada muy buena por el usuario. Los cambios pendientes esperables probablemente seran ajustes finos visuales, no reestructuracion completa.
