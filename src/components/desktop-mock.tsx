import Image from "next/image";

/**
 * ESPACIO RESERVADO PARA CAPTURA REAL.
 *
 * Mock ilustrativo del dashboard de cocina (/cocina): lista clara del
 * día. Cuando exista la captura real: pasar `imageSrc` (archivo en
 * /public, proporción 16:10) y se muestra dentro del mismo marco de
 * navegador sin tocar el layout.
 */
export function DesktopMock({ imageSrc }: { imageSrc?: string }) {
  return (
    <div className="w-full" data-mock="cocina-dashboard">
      <div className="overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-mock ring-1 ring-line/70">
        {/* Barra de navegador */}
        <div className="flex items-center gap-1.5 border-b border-line bg-[linear-gradient(180deg,#ffffff,#f4f8fd)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="ml-3 hidden h-5 flex-1 rounded-md bg-white sm:block" />
        </div>
        <div className="relative aspect-[16/10]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="Pantalla real del dashboard de cocina de EnBandeja"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          ) : (
            <Illustration />
          )}
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-ink-soft">
        Vista ilustrativa del listado diario para cocina
      </p>
    </div>
  );
}

function Illustration() {
  return (
    <div aria-hidden="true" className="absolute inset-0 flex bg-[linear-gradient(180deg,#f4f8fd,#fbfdff)] text-[10px]">
      {/* Sidebar */}
      <div className="hidden w-1/5 flex-col gap-2 bg-[linear-gradient(180deg,#17385f,#132238)] p-3 sm:flex">
        <div className="mb-2 h-7 w-7 rounded-xl bg-brand-500/90 shadow-soft" />
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-6 rounded-lg ${i === 2 ? "bg-brand-700" : "bg-white/10"}`}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="flex-1 p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-[13px] font-semibold text-ink">
              Cocina — listado del día
            </div>
            <div className="mt-1 h-1.5 w-24 rounded-full bg-line" />
          </div>
          <div className="rounded-full bg-warm-50 px-3 py-1.5 font-semibold text-warm-700 ring-1 ring-warm-600/10">
            Hoy
          </div>
        </div>

        {/* Totales por menú */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: "Almuerzo del día", n: "86" },
            { label: "Vegetariano", n: "14" },
            { label: "Ocasionales", n: "9" },
          ].map((c) => (
            <div key={c.label} className="rounded-xl border border-line bg-white p-2 shadow-[0_10px_24px_-20px_rgb(19_34_56/0.45)]">
              <div className="font-display text-base font-bold text-brand-700">
                {c.n}
              </div>
              <div className="mt-0.5 leading-tight text-ink-soft">{c.label}</div>
            </div>
          ))}
        </div>

        {/* Tabla por curso */}
        <div className="mt-3 overflow-hidden rounded-xl border border-line bg-white shadow-[0_12px_26px_-22px_rgb(19_34_56/0.52)]">
          <div className="grid grid-cols-4 gap-2 border-b border-line bg-cream px-2.5 py-1.5 font-semibold text-ink-soft">
            <span>Curso</span>
            <span className="col-span-2">Menú</span>
            <span className="text-right">Cant.</span>
          </div>
          {["1°A", "1°B", "2°A", "3°C"].map((curso, i) => (
            <div
              key={curso}
              className="grid grid-cols-4 items-center gap-2 border-b border-line/60 px-2.5 py-1.5 last:border-0"
            >
              <span className="font-semibold text-ink">{curso}</span>
              <span className="col-span-2">
                <span className="block h-1.5 w-4/5 rounded-full bg-line" />
              </span>
              <span className="text-right font-semibold text-brand-700">
                {[24, 18, 27, 21][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
