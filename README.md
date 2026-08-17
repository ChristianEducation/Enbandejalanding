# EnBandeja — Landing

Landing de captación de leads para EnBandeja: software a medida para
casinos escolares y concesionarios de alimentación. El formulario
guarda leads reales en Supabase (Postgres) vía Prisma, con validación
en frontend y backend, honeypot anti-spam y rate-limiting.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 ·
Prisma 6 · Supabase · GSAP + ScrollTrigger · Resend (opcional).

## Cómo correr local

```bash
npm install
cp .env.example .env   # y completar valores (ver abajo)
npm run dev            # http://localhost:3000
```

`npm run build` compila producción (incluye `prisma generate`).

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `DATABASE_URL` | Sí | Conexión Postgres vía **transaction pooler** de Supabase (puerto 6543, `?pgbouncer=true&connection_limit=1`). Usa el rol dedicado `landing_writer`. |
| `DIRECT_URL` | Sí | Conexión por session pooler (puerto 5432). Solo la usa Prisma para introspección/migraciones. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Correo institucional visible junto al formulario y en el footer. Si está vacío, no se muestra (no hay fallback hardcodeado). |
| `NEXT_PUBLIC_SITE_URL` | No | URL pública (ej. `https://enbandeja.app`) para OG tags. |
| `RESEND_API_KEY` | No | API key de Resend para notificar leads nuevos por correo. Sin ella, la notificación se omite y el guardado funciona igual. |
| `NOTIFY_EMAIL_TO` | No | Correo que recibe la notificación de lead nuevo. |
| `NOTIFY_EMAIL_FROM` | No | Remitente verificado en Resend. Default: sandbox `onboarding@resend.dev`. |
| `IP_HASH_SALT` | Recomendada | Sal para hashear la IP (rate-limiting). Cualquier string aleatorio largo. |

> El pooler de este proyecto es `aws-1-sa-east-1.pooler.supabase.com`
> (ojo: `aws-1`, no `aws-0` — el clúster equivocado da error
> "tenant/user not found").

## Base de datos

La tabla `public.leads` vive en el proyecto Supabase **Enbandeja**
(`uwquwjmiofixzugttals`), creada por la migración `create_leads_table`.
Tiene RLS activado sin acceso público: la API anónima de Supabase no
puede leerla ni escribirla. La app escribe server-side con el rol
`landing_writer` (permisos mínimos: `SELECT`/`INSERT` solo en `leads`).

### Cómo consultar los leads

Desde el SQL Editor de Supabase (o cualquier cliente Postgres):

```sql
-- Leads nuevos, más recientes primero
select nombre, casino_colegio, ciudad, email, whatsapp,
       gestion_actual, origen, created_at
from public.leads
where estado = 'nuevo'
order by created_at desc;

-- ¿Qué campaña convierte? (origen = query param ?ref= de la URL)
select origen, count(*) as leads
from public.leads
group by origen
order by leads desc;

-- Marcar un lead como contactado
update public.leads set estado = 'contactado' where id = '<uuid>';
```

Estados: `nuevo` → `contactado` → `cerrado`.

### Origen del lead (`?ref=`)

Cada mensaje personalizado a un prospecto puede llevar su propio ref:
`https://enbandeja.app/?ref=andino`. Ese valor queda en la columna
`origen`; sin `ref`, queda `landing-enbandeja`.

## Anti-spam

- **Honeypot**: campo oculto `sitio_web`. Si un bot lo rellena, la API
  responde éxito falso y no guarda nada.
- **Rate-limiting**: máximo 3 envíos por hora por email o IP (hasheada
  con SHA-256 + sal, columna `ip_hash`), chequeado contra la propia
  tabla `leads` — sin infraestructura extra.

## Notificación por correo (Resend)

Función aislada en [src/lib/notify.ts](src/lib/notify.ts). Se activa
sola cuando `RESEND_API_KEY` y `NOTIFY_EMAIL_TO` están configuradas;
si Resend falla, solo se loguea — el lead ya quedó guardado. Para
producción: verificar el dominio en [resend.com/domains](https://resend.com/domains)
y usar un `NOTIFY_EMAIL_FROM` de ese dominio.

## Deploy en Vercel

1. Subir el repo a GitHub e importarlo en Vercel (framework: Next.js,
   sin configuración especial — `npm run build` ya incluye
   `prisma generate`).
2. Cargar todas las variables de entorno del `.env` en
   Project → Settings → Environment Variables.
3. Conectar el dominio (ej. `enbandeja.app`) en Project → Settings →
   Domains y setear `NEXT_PUBLIC_SITE_URL` acorde.

## Cambiar el correo de contacto

Editar `NEXT_PUBLIC_CONTACT_EMAIL` en Vercel (o `.env` local) y
redeployar. No hay ningún correo hardcodeado en el código.

## Capturas de pantalla reales (pendiente)

Los dos mockups ilustrativos son espacios reservados:

- [src/components/phone-mock.tsx](src/components/phone-mock.tsx) —
  app del apoderado (`/home`), proporción 9:19.
- [src/components/desktop-mock.tsx](src/components/desktop-mock.tsx) —
  dashboard de cocina (`/cocina`), proporción 16:10.

Cuando existan las capturas: guardarlas en `/public` y pasar
`imageSrc="/captura.png"` en los dos puntos de uso —
`<PhoneMock />` en [src/components/hero.tsx](src/components/hero.tsx) y
`<DesktopMock />` en
[src/components/solution-section.tsx](src/components/solution-section.tsx).
El marco y el layout no cambian.
