/**
 * Pre-generates the responsive variants that `next/image` would normally build
 * on demand. A static export has no image optimiser, so without this every
 * visitor downloads the full-size original (1254px, ~320KB) no matter how small
 * it is drawn.
 *
 * Output is WebP, not AVIF. A custom loader returns a single URL with no
 * `<picture>` fallback, so the format has to be one essentially every browser
 * reads; WebP is ~98% supported against AVIF's ~95%. AVIF would be a further
 * ~30% smaller — a host with a real image optimiser should serve it and
 * negotiate per request.
 *
 * Widths must stay in sync with `images.deviceSizes`/`imageSizes` in
 * next.config.ts; the loader snaps a requested width up to the nearest file.
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const WIDTHS = [256, 384, 640, 750, 828, 1080, 1254];
const SRC_DIR = "public/programs";
const OUT_DIR = "public/programs/_opt";
const QUALITY = 78;

const [srcDir, outDir] = [SRC_DIR, OUT_DIR].map((p) => path.resolve(p));
await mkdir(outDir, { recursive: true });

const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
let written = 0;
let bytesIn = 0;
let bytesOut = 0;

for (const file of files) {
  const name = path.basename(file, path.extname(file));
  const input = path.join(srcDir, file);
  const meta = await sharp(input).metadata();
  bytesIn += (await stat(input)).size;

  // Never upscale: a variant wider than the source only costs bytes.
  const widths = WIDTHS.filter((w) => w <= meta.width);
  if (widths.at(-1) !== meta.width) widths.push(meta.width);

  for (const w of widths) {
    const out = path.join(outDir, `${name}-${w}.webp`);
    const info = await sharp(input).resize(w).webp({ quality: QUALITY }).toFile(out);
    bytesOut += info.size;
    written++;
  }
}

const mb = (n) => (n / 1024 / 1024).toFixed(2);
console.log(
  `${written} variants from ${files.length} sources — ` +
    `${mb(bytesIn)}MB in, ${mb(bytesOut)}MB out across all widths`,
);
