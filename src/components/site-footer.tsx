import { Logo } from "./logo";

export function SiteFooter() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return (
    <footer className="border-t border-line bg-cream py-10">
      <div className="mx-auto flex max-w-[90rem] flex-col justify-between gap-8 px-5 sm:px-8 md:flex-row md:items-end">
        <div><Logo /><p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">Plataforma modular para conectar la operación de alimentación escolar.</p></div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {email && <a href={`mailto:${email}`} className="font-semibold text-brand-700">{email}</a>}
          <a href="/privacidad" className="text-ink-soft hover:text-ink">Privacidad</a>
          <a href="/demo" className="text-ink-soft hover:text-ink">Demo</a>
          <span className="text-ink-soft">© {new Date().getFullYear()} EnBandeja</span>
        </div>
      </div>
    </footer>
  );
}
