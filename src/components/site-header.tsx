import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="#inicio" aria-label="EnBandeja - inicio" className="site-logo">
          <Logo />
        </a>

        <nav aria-label="Navegacion principal" className="site-nav">
          <a href="#plataforma">Plataforma</a>
          <a href="#inversion">Inversion</a>
          <a href="/demo?ref=nav">Demo</a>
        </nav>

        <nav aria-label="Acciones principales" className="header-actions">
          <a href="#contacto" className="header-link">
            Consulta directa
          </a>
          <a href="#contacto" className="header-cta">
            Conversemos
          </a>
        </nav>
      </div>
    </header>
  );
}
