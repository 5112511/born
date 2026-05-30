import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const teenDir = path.join(root, "teen");
const imgRe = /\.(png|jpe?g|webp|gif|avif)$/i;

if (!fs.existsSync(teenDir)) {
  fs.mkdirSync(teenDir, { recursive: true });
}

const files = fs
  .readdirSync(teenDir)
  .filter((name) => imgRe.test(name))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));

const manifestPath = path.join(teenDir, "manifest.json");
fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2) + "\n", "utf8");
console.log(`teen/manifest.json ← ${files.length} image(s)`);
files.forEach((f) => console.log(`  · ${f}`));
