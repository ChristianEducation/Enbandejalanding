import type { Metadata } from "next";
import { DemoExperience } from "./demo-experience";

export const metadata: Metadata = {
  title: "Demo interactiva | EnBandeja",
  description:
    "Explora una operación escolar ficticia desde las vistas de Apoderado, Administración y Cocina.",
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return <DemoExperience />;
}
