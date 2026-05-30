/**
 * Zero-dependency PNG sprite extractor for black-background collage sheets.
 * Usage: node scripts/extract-collage-sprites-standalone.mjs
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

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

const BLOCK_SIZE = 16;
const MIN_BLOCK_COUNT = 6;
const PADDING = 6;
const MAX_SLICES = 18;
const MIN_DIM = 36;
const CONTENT_SUM = 95;
const BLOCK_FILL = 0.14;
const ERODE_PASSES = 2;
const LARGE_REGION_BLOCKS = 120;

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : c >>> 1;
  }
  return (c ^ 0xffffffff) >>> 0;
}

function readPng(filePath) {
  const file = fs.readFileSync(filePath);
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  if (!sig.every((b, i) => file[i] === b)) {
    throw new Error(`Not a PNG: ${filePath}`);
  }
  let offset = 8;
  let width = 0;
  let height = 0;
  const idatParts = [];

  while (offset < file.length) {
    const len = file.readUInt32BE(offset);
    const type = file.toString("ascii", offset + 4, offset + 8);
    const dataStart = offset + 8;
    const dataEnd = dataStart + len;
    const chunkData = file.subarray(dataStart, dataEnd);

    if (type === "IHDR") {
      width = chunkData.readUInt32BE(0);
      height = chunkData.readUInt32BE(4);
      const bitDepth = chunkData[8];
      const colorType = chunkData[9];
      if (bitDepth !== 8 || colorType !== 6) {
        throw new Error(`Unsupported PNG format in ${filePath}`);
      }
    } else if (type === "IDAT") {
      idatParts.push(chunkData);
    } else if (type === "IEND") {
      break;
    }
    offset = dataEnd + 4;
  }

  const compressed = Buffer.concat(idatParts);
  const inflated = zlib.inflateSync(compressed);
  const stride = width * 4;
  const pixels = Buffer.alloc(width * height * 4);
  let src = 0;

  for (let y = 0; y < height; y++) {
    const filter = inflated[src++];
    const rowStart = y * stride;
    for (let x = 0; x < width; x++) {
      const i = rowStart + x * 4;
      const r = inflated[src++];
      const g = inflated[src++];
      const b = inflated[src++];
      const a = inflated[src++];
      if (filter === 0) {
        pixels[i] = r;
        pixels[i + 1] = g;
        pixels[i + 2] = b;
        pixels[i + 3] = a;
      } else if (filter === 1) {
        const left = x > 0 ? pixels[i - 4] : 0;
        pixels[i] = (r + left) & 0xff;
        pixels[i + 1] = (g + (x > 0 ? pixels[i - 3] : 0)) & 0xff;
        pixels[i + 2] = (b + (x > 0 ? pixels[i - 2] : 0)) & 0xff;
        pixels[i + 3] = (a + (x > 0 ? pixels[i - 1] : 0)) & 0xff;
      } else if (filter === 2) {
        const up = y > 0 ? pixels[i - stride] : 0;
        pixels[i] = (r + up) & 0xff;
        pixels[i + 1] = (g + (y > 0 ? pixels[i + 1 - stride] : 0)) & 0xff;
        pixels[i + 2] = (b + (y > 0 ? pixels[i + 2 - stride] : 0)) & 0xff;
        pixels[i + 3] = (a + (y > 0 ? pixels[i + 3 - stride] : 0)) & 0xff;
      } else if (filter === 3) {
        const left = x > 0 ? pixels[i - 4] : 0;
        const up = y > 0 ? pixels[i - stride] : 0;
        pixels[i] = (r + Math.floor((left + up) / 2)) & 0xff;
        pixels[i + 1] = (g + Math.floor(((x > 0 ? pixels[i - 3] : 0) + (y > 0 ? pixels[i + 1 - stride] : 0)) / 2)) & 0xff;
        pixels[i + 2] = (b + Math.floor(((x > 0 ? pixels[i - 2] : 0) + (y > 0 ? pixels[i + 2 - stride] : 0)) / 2)) & 0xff;
        pixels[i + 3] = (a + Math.floor(((x > 0 ? pixels[i - 1] : 0) + (y > 0 ? pixels[i + 3 - stride] : 0)) / 2)) & 0xff;
      } else if (filter === 4) {
        const leftR = x > 0 ? pixels[i - 4] : 0;
        const leftG = x > 0 ? pixels[i - 3] : 0;
        const leftB = x > 0 ? pixels[i - 2] : 0;
        const leftA = x > 0 ? pixels[i - 1] : 0;
        const upR = y > 0 ? pixels[i - stride] : 0;
        const upG = y > 0 ? pixels[i + 1 - stride] : 0;
        const upB = y > 0 ? pixels[i + 2 - stride] : 0;
        const upA = y > 0 ? pixels[i + 3 - stride] : 0;
        const ulR = x > 0 && y > 0 ? pixels[i - 4 - stride] : 0;
        const ulG = x > 0 && y > 0 ? pixels[i - 3 - stride] : 0;
        const ulB = x > 0 && y > 0 ? pixels[i - 2 - stride] : 0;
        const ulA = x > 0 && y > 0 ? pixels[i - 1 - stride] : 0;
        pixels[i] = (r + paeth(leftR, upR, ulR)) & 0xff;
        pixels[i + 1] = (g + paeth(leftG, upG, ulG)) & 0xff;
        pixels[i + 2] = (b + paeth(leftB, upB, ulB)) & 0xff;
        pixels[i + 3] = (a + paeth(leftA, upA, ulA)) & 0xff;
      } else {
        throw new Error(`Unsupported PNG filter ${filter}`);
      }
    }
  }

  return { width, height, data: pixels };
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function writePng(filePath, width, height, data) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const raw = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const row = y * (1 + width * 4);
    raw[row] = 0;
    data.copy(raw, row + 1, y * width * 4, (y + 1) * width * 4);
  }
  const compressed = zlib.deflateSync(raw, { level: 9 });

  const chunks = [
    makeChunk("IHDR", ihdr),
    makeChunk("IDAT", compressed),
    makeChunk("IEND", Buffer.alloc(0)),
  ];
  fs.writeFileSync(filePath, Buffer.concat([signature, ...chunks]));
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcBuf), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function isContent(r, g, b, a = 255) {
  if (a < 20) return false;
  const sum = r + g + b;
  if (sum <= CONTENT_SUM) return false;
  return Math.max(r, g, b) > 32;
}

function erodeGrid(grid, rows, cols, passes = ERODE_PASSES) {
  let current = grid.map((row) => row.slice());
  for (let pass = 0; pass < passes; pass++) {
    const next = Array.from({ length: rows }, () => Array(cols).fill(false));
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (!current[y][x]) continue;
        let neighbors = 0;
        for (const [dy, dx] of [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]) {
          const ny = y + dy;
          const nx = x + dx;
          if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && current[ny][nx]) neighbors++;
        }
        if (neighbors >= 5) next[y][x] = true;
      }
    }
    current = next;
  }
  return current;
}

function splitLargeRegion(png, region) {
  const { width: w, data } = png;
  const x0 = region.minX * BLOCK_SIZE;
  const y0 = region.minY * BLOCK_SIZE;
  const x1 = Math.min(w, (region.maxX + 1) * BLOCK_SIZE);
  const y1 = Math.min(png.height, (region.maxY + 1) * BLOCK_SIZE);
  const rw = x1 - x0;
  const rh = y1 - y0;
  const sub = Buffer.alloc(rw * rh * 4);
  for (let y = 0; y < rh; y++) {
    for (let x = 0; x < rw; x++) {
      const si = (w * (y0 + y) + (x0 + x)) * 4;
      const di = (rw * y + x) * 4;
      sub[di] = data[si];
      sub[di + 1] = data[si + 1];
      sub[di + 2] = data[si + 2];
      sub[di + 3] = data[si + 3];
    }
  }
  const subPng = { width: rw, height: rh, data: sub };
  const { grid, rows, cols } = blockGrid(subPng, { extraErode: 1, fill: 0.18, sum: 110 });
  const inner = findRegions(grid, rows, cols).filter((r) => r.blocks >= 4);
  return inner.map((r) => ({
    minY: region.minY + r.minY,
    maxY: region.minY + r.maxY,
    minX: region.minX + r.minX,
    maxX: region.minX + r.maxX,
    blocks: r.blocks,
  }));
}

function blockGrid(png, opts = {}) {
  const blockSize = opts.blockSize || BLOCK_SIZE;
  const fill = opts.fill ?? BLOCK_FILL;
  const sumThreshold = opts.sum ?? CONTENT_SUM;
  const extraErode = opts.extraErode || 0;
  const { width: w, height: h, data } = png;
  const cols = Math.ceil(w / blockSize);
  const rows = Math.ceil(h / blockSize);
  const grid = Array.from({ length: rows }, () => Array(cols).fill(false));

  for (let by = 0; by < rows; by++) {
    for (let bx = 0; bx < cols; bx++) {
      const x0 = bx * blockSize;
      const y0 = by * blockSize;
      const x1 = Math.min(x0 + blockSize, w);
      const y1 = Math.min(y0 + blockSize, h);
      let hits = 0;
      let total = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          total++;
          const i = (w * y + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a >= 20 && r + g + b > sumThreshold && Math.max(r, g, b) > 32) hits++;
        }
      }
      if (hits / Math.max(total, 1) > fill) grid[by][bx] = true;
    }
  }
  return {
    grid: erodeGrid(grid, rows, cols, ERODE_PASSES + extraErode),
    rows,
    cols,
    blockSize,
  };
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

  const out = Buffer.alloc(rw * rh * 4);
  for (let y = 0; y < rh; y++) {
    for (let x = 0; x < rw; x++) {
      const si = (w * (y0 + y) + (x0 + x)) * 4;
      const di = (rw * y + x) * 4;
      const r = data[si];
      const g = data[si + 1];
      const b = data[si + 2];
      const a = data[si + 3];
      if (isContent(r, g, b, a)) {
        out[di] = r;
        out[di + 1] = g;
        out[di + 2] = b;
        out[di + 3] = 255;
      } else {
        out[di + 3] = 0;
      }
    }
  }

  writePng(destPath, rw, rh, out);
  return true;
}

function main() {
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
    const png = readPng(srcPath);
    const { grid, rows, cols } = blockGrid(png);
    let regions = findRegions(grid, rows, cols);

    const expanded = [];
    for (const region of regions) {
      if (region.blocks >= LARGE_REGION_BLOCKS) {
        expanded.push(...splitLargeRegion(png, region));
      } else {
        expanded.push(region);
      }
    }
    regions = expanded.sort((a, b) => b.blocks - a.blocks);

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

main();
