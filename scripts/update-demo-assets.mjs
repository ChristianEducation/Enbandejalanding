import sharp from "sharp";
import { resolve } from "node:path";

const root = process.cwd();
const gate4 = resolve(root, "specs/enbandeja-professionalization/gate-4");
const gate5 = resolve(root, "specs/enbandeja-professionalization/gate-5");
const publicAssets = resolve(root, "public/assets");

const portal = sharp(resolve(gate5, "portal-apoderado-mobile-source.png"))
  .resize({ width: 900 })
  .extract({ left: 0, top: 0, width: 900, height: 1900 });
await portal.clone().png().toFile(resolve(gate4, "portal-apoderado-9x19.png"));
await portal.clone().webp({ quality: 88 }).toFile(resolve(gate4, "portal-apoderado-900x1900.webp"));
await portal.clone().webp({ quality: 88 }).toFile(resolve(publicAssets, "portal-apoderado-900x1900.webp"));

for (const [source, pngName, webpName] of [
  ["administracion-final.png", "administracion-16x10.png", "administracion-1600x1000.webp"],
  ["cocina-final.png", "cocina-16x10.png", "cocina-1600x1000.webp"],
]) {
  const image = sharp(resolve(gate5, source)).resize(1600, 1000, { fit: "fill" });
  await image.clone().png().toFile(resolve(gate4, pngName));
  await image.clone().webp({ quality: 88 }).toFile(resolve(gate4, webpName));
  await image.clone().webp({ quality: 88 }).toFile(resolve(publicAssets, webpName));
}

await sharp(resolve(gate4, "flujo-tres-roles.svg")).png().toFile(resolve(gate4, "flujo-tres-roles.png"));
await sharp(resolve(gate4, "flujo-tres-roles.svg")).webp({ quality: 88 }).toFile(resolve(gate4, "flujo-tres-roles.webp"));
await sharp(resolve(gate4, "flujo-tres-roles.svg")).webp({ quality: 88 }).toFile(resolve(publicAssets, "flujo-tres-roles.webp"));

await sharp(resolve(gate4, "open-graph.svg")).png().toFile(resolve(gate4, "open-graph.png"));
await sharp(resolve(gate4, "open-graph.svg")).png().toFile(resolve(publicAssets, "open-graph.png"));
