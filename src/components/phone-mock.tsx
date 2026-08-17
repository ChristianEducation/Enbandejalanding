import Image from "next/image";

/**
 * ESPACIO RESERVADO PARA CAPTURA REAL.
 *
 * Mock ilustrativo de la app del Apoderado (pantalla /home, pedido
 * semanal). Cuando exista la captura real: pasar `imageSrc` (archivo
 * en /public, proporción 9:19) y este componente la muestra dentro del
 * mismo marco de teléfono sin tocar el layout.
 */
export function PhoneMock({ imageSrc }: { imageSrc?: string }) {
  return (
    <div className="relative mx-auto w-[270px] sm:w-[300px]" data-mock="apoderado-home">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2.35rem] border-[7px] border-brand-900 bg-cream shadow-mock ring-1 ring-white/80">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-brand-900"
        />
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Pantalla real del portal de pedidos de EnBandeja para apoderados"
            fill
            sizes="300px"
            className="object-cover"
            priority
          />
        ) : (
          <Illustration />
        )}
      </div>
      <p className="mt-3 text-center text-xs text-ink-soft">
        Vista ilustrativa del portal del apoderado
      </p>
    </div>
  );
}

function Illustration() {
  const dias = ["Lun", "Mar", "Mié", "Jue", "Vie"];
  return (
    <div aria-hidden="true" className="flex h-full flex-col bg-[linear-gradient(180deg,#f4f8fd,#fff9f4)] text-[10px]">
      {/* Barra superior */}
      <div className="flex items-center justify-between bg-[linear-gradient(145deg,#17385f,#235a9c)] px-4 pb-4 pt-9 text-cream">
        <div>
          <div className="h-2 w-16 rounded-full bg-cream/40" />
          <div className="mt-1.5 font-display text-[13px] font-semibold">
            Pedido semanal
          </div>
        </div>
        <div className="h-7 w-7 rounded-full bg-brand-500/80" />
      </div>

      {/* Selector de días */}
      <div className="flex gap-1.5 px-3 py-3.5">
        {dias.map((d, i) => (
          <div
            key={d}
            className={`flex-1 rounded-xl py-1.5 text-center font-semibold shadow-[0_1px_0_rgb(255_255_255/0.72)] ${
              i === 0 ? "bg-brand-600 text-white" : "bg-white/90 text-ink-soft"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Tarjetas de menú */}
      <div className="flex flex-col gap-2 px-3">
        {[
          { nombre: "Almuerzo del día", sel: true },
          { nombre: "Menú vegetariano", sel: false },
          { nombre: "Menú hipocalórico", sel: false },
        ].map((m) => (
          <div
            key={m.nombre}
            className={`rounded-2xl border bg-white/95 p-2.5 shadow-[0_10px_24px_-18px_rgb(19_34_56/0.45)] ${
              m.sel ? "border-brand-500 ring-1 ring-brand-500" : "border-line"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-ink">{m.nombre}</span>
              <span
                className={`h-4 w-4 rounded-full border ${
                  m.sel ? "border-brand-600 bg-brand-600" : "border-line bg-white"
                }`}
              />
            </div>
            <div className="mt-1.5 h-1.5 w-4/5 rounded-full bg-line" />
            <div className="mt-1 h-1.5 w-3/5 rounded-full bg-line" />
          </div>
        ))}
      </div>

      {/* Resumen y CTA */}
      <div className="mt-auto border-t border-line bg-white/95 px-3 py-3">
        <div className="flex items-center justify-between text-ink-soft">
          <span>Semana completa</span>
          <span className="font-semibold text-ink">5 almuerzos</span>
        </div>
        <div className="mt-2 rounded-xl bg-brand-700 py-2 text-center font-semibold text-white shadow-soft">
          Confirmar pedido
        </div>
      </div>
    </div>
  );
}
