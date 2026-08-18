import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { getPrisma } from "@/lib/prisma";
import { leadSchema, sanitizeOrigen } from "@/lib/lead-schema";
import { notifyNewLead } from "@/lib/notify";

const MAX_LEADS_PER_HOUR = 3;

function hashIp(request: NextRequest): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT ?? "";
  return createHash("sha256").update(`${salt}${ip}`).digest("hex");
}

/** UTMs ya vienen filtradas por extractUtm() en el cliente; acá solo se
 * valida la forma antes de guardarlas como jsonb. */
function sanitizeUtm(value: unknown): Record<string, string> | null {
  if (!value || typeof value !== "object") return null;
  const out: Record<string, string> = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    if (!/^utm_(source|medium|campaign|content)$/.test(key)) continue;
    if (typeof raw === "string" && raw.trim()) out[key] = raw.trim().slice(0, 200);
  }
  return Object.keys(out).length > 0 ? out : null;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  // Honeypot: si un bot rellenó el campo oculto, respondemos como si
  // todo hubiera salido bien, pero no guardamos nada.
  if (typeof raw.sitio_web === "string" && raw.sitio_web.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !errors[field]) {
        errors[field] = issue.message;
      }
    }
    return NextResponse.json(
      { error: "Revisa los campos marcados.", errors },
      { status: 400 },
    );
  }

  const lead = parsed.data;
  const origen = sanitizeOrigen(raw.origen);
  const utm = sanitizeUtm(raw.utm);
  const ipHash = hashIp(request);
  const prisma = getPrisma();

  try {
    // Rate limiting simple contra la propia tabla: mismo email o misma
    // IP en la última hora. Suficiente para una landing sin traer
    // infraestructura extra (Redis, etc.).
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentCount = await prisma.lead.count({
      where: {
        createdAt: { gte: oneHourAgo },
        OR: [{ email: lead.email }, ...(ipHash ? [{ ipHash }] : [])],
      },
    });

    if (recentCount >= MAX_LEADS_PER_HOUR) {
      return NextResponse.json(
        {
          error:
            "Ya recibimos tus datos hace poco. Te contactaremos pronto — si necesitas agregar algo, escríbenos directamente.",
        },
        { status: 429 },
      );
    }

    const saved = await prisma.lead.create({
      data: {
        nombre: lead.nombre,
        empresa: lead.empresa,
        email: lead.email,
        whatsapp: lead.whatsapp,
        cantidadColegios: lead.cantidadColegios,
        tieneCafeteria: lead.tieneCafeteria,
        mensaje: lead.mensaje || null,
        origen,
        ipHash,
        utmJson: utm ?? undefined,
      },
      select: { id: true },
    });

    // Notificación por correo: fire-and-forget, nunca bloquea ni
    // revierte el guardado (ver src/lib/notify.ts).
    await notifyNewLead({ ...lead, origen });

    return NextResponse.json({ ok: true, id: saved.id }, { status: 201 });
  } catch (error) {
    console.error("[api/leads] Error guardando lead:", error);
    return NextResponse.json(
      {
        error:
          "No pudimos guardar tus datos por un problema técnico. Intenta de nuevo en unos minutos o escríbenos directamente.",
      },
      { status: 500 },
    );
  }
}
