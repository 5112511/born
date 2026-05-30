/**
 * Extract individual collage elements from black-background sprite sheets.
 * Usage: node scripts/extract-collage-sprites.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PNG } from "pngjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ELEMENT_DIR = path.join(ROOT, "element");
const OUT_DIR = path.join(ELEMENT_DIR, "slices");

const SHEETS = [
  "0BA9A553848CBE4E65016C9F04BB1B06.png",
  "3A4DC7C1D22BA36AD40B5C5F78B04120.png",
  "D5EE22C16285FC6214C2C3FD1D2267AB.png",
  "DBE77B1CDF4EE9DCCC1EB70B3278846A.png",
];

const BLOCK_SIZE = 32;
const MIN_BLOCK_COUNT = 4;
const PADDING = 8;
const MAX_SLICES = 14;
const MIN_DIM = 40;

function isContent(r, g, b, a = 255) {
  if (a < 16) return false;
  return r + g + b > 72;
}

function loadPng(filePath) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(new PNG())
      .on("parsed", function () {
        resolve(this);
      })
      .on("error", reject);
  });
}

function blockGrid(png) {
  const { width: w, height: h, data } = png;
  const cols = Math.ceil(w / BLOCK_SIZE);
  const rows = Math.ceil(h / BLOCK_SIZE);
  const grid = Array.from({ length: rows }, () => Array(cols).fill(false));

  for (let by = 0; by < rows; by++) {
    for (let bx = 0; bx < cols; bx++) {
      const x0 = bx * BLOCK_SIZE;
      const y0 = by * BLOCK_SIZE;
      const x1 = Math.min(x0 + BLOCK_SIZE, w);
      const y1 = Math.min(y0 + BLOCK_SIZE, h);
      let hits = 0;
      let total = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          total++;
          const i = (w * y + x) << 2;
          if (isContent(data[i], data[i + 1], data[i + 2], data[i + 3])) hits++;
        }
      }
      if (hits / Math.max(total, 1) > 0.06) grid[by][bx] = true;
    }
  }
  return { grid, rows, cols };
}

function findRegions(grid, rows, cols) {
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const regions = [];

  for (let by = 0; by < rows; by++) {
    for (let bx = 0; bx < cols; bx++) {
      if (!grid[by][bx] || visited[by][bx]) continue;
      const q = [[by, bx]];
      visited[by][bx] = true;
      let minY = by;
      let maxY = by;
      let minX = bx;
      let maxX = bx;
      let count = 0;

      while (q.length) {
        const [cy, cx] = q.pop();
        count++;
        minY = Math.min(minY, cy);
        maxY = Math.max(maxY, cy);
        minX = Math.min(minX, cx);
        maxX = Math.max(maxX, cx);
        for (const [ny, nx] of [
          [cy - 1, cx],
          [cy + 1, cx],
          [cy, cx - 1],
          [cy, cx + 1],
        ]) {
          if (ny < 0 || ny >= rows || nx < 0 || nx >= cols) continue;
          if (!grid[ny][nx] || visited[ny][nx]) continue;
          visited[ny][nx] = true;
          q.push([ny, nx]);
        }
      }

      if (count >= MIN_BLOCK_COUNT) {
        regions.push({ minY, maxY, minX, maxX, blocks: count });
      }
    }
  }
  return regions;
}

function saveRegion(png, region, destPath) {
  const { width: w, height: h, data } = png;
  const x0 = Math.max(0, region.minX * BLOCK_SIZE - PADDING);
  const y0 = Math.max(0, region.minY * BLOCK_SIZE - PADDING);
  const x1 = Math.min(w, (region.maxX + 1) * BLOCK_SIZE + PADDING);
  const y1 = Math.min(h, (region.maxY + 1) * BLOCK_SIZE + PADDING);
  const rw = x1 - x0;
  const rh = y1 - y0;
  if (rw < MIN_DIM || rh < MIN_DIM) return false;

  const out = new PNG({ width: rw, height: rh });
  for (let y = 0; y < rh; y++) {
    for (let x = 0; x < rw; x++) {
      const si = (w * (y0 + y) + (x0 + x)) << 2;
      const di = (rw * y + x) << 2;
      const r = data[si];
      const g = data[si + 1];
      const b = data[si + 2];
      const a = data[si + 3];
      if (isContent(r, g, b, a)) {
        out.data[di] = r;
        out.data[di + 1] = g;
        out.data[di + 2] = b;
        out.data[di + 3] = 255;
      } else {
        out.data[di + 3] = 0;
      }
    }
  }

  fs.writeFileSync(destPath, PNG.sync.write(out));
  return true;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const manifest = [];

  for (const sheet of SHEETS) {
    const srcPath = path.join(ELEMENT_DIR, sheet);
    if (!fs.existsSync(srcPath)) {
      console.warn(`Missing ${srcPath}`);
      continue;
    }
    const prefix = sheet.slice(0, 8).toLowerCase();
    console.log(`Processing ${sheet} ...`);
    const png = await loadPng(srcPath);
    const { grid, rows, cols } = blockGrid(png);
    const regions = findRegions(grid, rows, cols).sort((a, b) => b.blocks - a.blocks);

    let idx = 0;
    for (const region of regions) {
      if (idx >= MAX_SLICES) break;
      const name = `${prefix}_${idx}.png`;
      const dest = path.join(OUT_DIR, name);
      if (saveRegion(png, region, dest)) {
        manifest.push({ file: `element/slices/${name}`, sheet: prefix, index: idx });
        idx++;
      }
    }
    console.log(`  -> ${idx} slices`);
  }

  fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  console.log(`Done. Output: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
