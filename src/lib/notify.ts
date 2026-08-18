import type { LeadData } from "./lead-schema";

/**
 * Notificación por correo de lead nuevo, vía Resend.
 *
 * Función aislada a propósito: si no hay RESEND_API_KEY o
 * NOTIFY_EMAIL_TO configurados, no hace nada. Si Resend falla, solo se
 * loguea — el guardado del lead en la base de datos nunca depende de
 * esto (el lead ya está persistido cuando se llama).
 */
export async function notifyNewLead(lead: LeadData & { origen: string }): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  if (!apiKey || !to) return;

  const from = process.env.NOTIFY_EMAIL_FROM || "EnBandeja <onboarding@resend.dev>";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    await resend.emails.send({
      from,
      to,
      subject: `Nuevo lead: ${lead.empresa}`,
      html: `
        <h2>Nuevo lead desde la landing</h2>
        <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td><b>Nombre</b></td><td>${esc(lead.nombre)}</td></tr>
          <tr><td><b>Empresa / concesionaria</b></td><td>${esc(lead.empresa)}</td></tr>
          <tr><td><b>Email</b></td><td>${esc(lead.email)}</td></tr>
          <tr><td><b>WhatsApp</b></td><td>${esc(lead.whatsapp)}</td></tr>
          <tr><td><b>Cantidad de colegios</b></td><td>${lead.cantidadColegios}</td></tr>
          <tr><td><b>¿Tiene cafetería?</b></td><td>${lead.tieneCafeteria ? "Sí" : "No"}</td></tr>
          <tr><td><b>Mensaje</b></td><td>${lead.mensaje ? esc(lead.mensaje) : "—"}</td></tr>
          <tr><td><b>Origen</b></td><td>${esc(lead.origen)}</td></tr>
        </table>
      `,
    });
  } catch (error) {
    console.error("[notify] No se pudo enviar la notificación de lead nuevo:", error);
  }
}
