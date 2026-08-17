import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hay lockfiles sueltos fuera del proyecto (ej. C:\package-lock.json)
  // que hacen que Turbopack infiera mal la raíz del workspace.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
