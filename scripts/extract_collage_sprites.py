"""Extract individual collage elements from black-background sprite sheets."""
from __future__ import annotations

import json
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ELEMENT_DIR = ROOT / "element"
OUT_DIR = ELEMENT_DIR / "slices"

SHEETS = [
    "0BA9A553848CBE4E65016C9F04BB1B06.png",
    "3A4DC7C1D22BA36AD40B5C5F78B04120.png",
    "D5EE22C16285FC6214C2C3FD1D2267AB.png",
    "DBE77B1CDF4EE9DCCC1EB70B3278846A.png",
]

BLOCK_SIZE = 32
MIN_BLOCK_COUNT = 4
PADDING = 8
MAX_SLICES = 14
MIN_DIM = 40


def is_content(r: int, g: int, b: int, a: int = 255) -> bool:
    if a < 16:
        return False
    return r + g + b > 72


def block_grid(img: Image.Image) -> tuple[list[list[bool]], int, int]:
    w, h = img.size
    px = img.load()
    cols = (w + BLOCK_SIZE - 1) // BLOCK_SIZE
    rows = (h + BLOCK_SIZE - 1) // BLOCK_SIZE
    grid = [[False] * cols for _ in range(rows)]

    for by in range(rows):
        for bx in range(cols):
            x0 = bx * BLOCK_SIZE
            y0 = by * BLOCK_SIZE
            x1 = min(x0 + BLOCK_SIZE, w)
            y1 = min(y0 + BLOCK_SIZE, h)
            hits = 0
            total = 0
            for y in range(y0, y1):
                for x in range(x0, x1):
                    total += 1
                    p = px[x, y]
                    if len(p) == 4:
                        r, g, b, a = p
                    else:
                        r, g, b = p
                        a = 255
                    if is_content(r, g, b, a):
                        hits += 1
            if hits / max(total, 1) > 0.06:
                grid[by][bx] = True
    return grid, rows, cols


def find_regions(grid: list[list[bool]], rows: int, cols: int) -> list[dict]:
    visited = [[False] * cols for _ in range(rows)]
    regions: list[dict] = []

    for by in range(rows):
        for bx in range(cols):
            if not grid[by][bx] or visited[by][bx]:
                continue
            q: deque[tuple[int, int]] = deque([(by, bx)])
            visited[by][bx] = True
            min_y = max_y = by
            min_x = max_x = bx
            count = 0
            while q:
                cy, cx = q.popleft()
                count += 1
                min_y = min(min_y, cy)
                max_y = max(max_y, cy)
                min_x = min(min_x, cx)
                max_x = max(max_x, cx)
                for ny, nx in ((cy - 1, cx), (cy + 1, cx), (cy, cx - 1), (cy, cx + 1)):
                    if ny < 0 or ny >= rows or nx < 0 or nx >= cols:
                        continue
                    if not grid[ny][nx] or visited[ny][nx]:
                        continue
                    visited[ny][nx] = True
                    q.append((ny, nx))
            if count >= MIN_BLOCK_COUNT:
                regions.append(
                    {
                        "min_y": min_y,
                        "max_y": max_y,
                        "min_x": min_x,
                        "max_x": max_x,
                        "blocks": count,
                    }
                )
    return regions


def save_region(img: Image.Image, region: dict, dest: Path) -> bool:
    w, h = img.size
    x0 = max(0, region["min_x"] * BLOCK_SIZE - PADDING)
    y0 = max(0, region["min_y"] * BLOCK_SIZE - PADDING)
    x1 = min(w, (region["max_x"] + 1) * BLOCK_SIZE + PADDING)
    y1 = min(h, (region["max_y"] + 1) * BLOCK_SIZE + PADDING)
    rw, rh = x1 - x0, y1 - y0
    if rw < MIN_DIM or rh < MIN_DIM:
        return False

    src = img.crop((x0, y0, x1, y1)).convert("RGBA")
    px = src.load()
    for y in range(rh):
        for x in range(rw):
            r, g, b, a = px[x, y]
            if not is_content(r, g, b, a):
                px[x, y] = (0, 0, 0, 0)
            else:
                px[x, y] = (r, g, b, 255)
    src.save(dest, "PNG")
    return True


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest: list[dict] = []

    for sheet in SHEETS:
        src_path = ELEMENT_DIR / sheet
        if not src_path.exists():
            print(f"Missing {src_path}")
            continue
        prefix = sheet[:8].lower()
        print(f"Processing {sheet} ...")
        img = Image.open(src_path).convert("RGBA")
        grid, rows, cols = block_grid(img)
        regions = sorted(find_regions(grid, rows, cols), key=lambda r: r["blocks"], reverse=True)

        idx = 0
        for region in regions:
            if idx >= MAX_SLICES:
                break
            name = f"{prefix}_{idx}.png"
            dest = OUT_DIR / name
            if save_region(img, region, dest):
                manifest.append({"file": f"element/slices/{name}", "sheet": prefix, "index": idx})
                idx += 1
        print(f"  -> {idx} slices")

    (OUT_DIR / "manifest.json").write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8"
    )
    print(f"Done. Output: {OUT_DIR}")


if __name__ == "__main__":
    main()
