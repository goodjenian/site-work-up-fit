/**
 * Post-build fixes for serving the export from a plain static host.
 *
 * 1. Writes `.nojekyll`. GitHub Pages runs Jekyll on a branch deploy, and
 *    Jekyll drops every path segment starting with `_` — which is `_next`
 *    (all the CSS and JS) and `programs/_opt` (every image). Without this the
 *    site goes up unstyled and blank. Doing it here, not by hand, because a
 *    hand-run `touch` does not survive the next `rm -rf out`. It already cost
 *    one broken deploy.
 *
 * 2. Gives the Open Graph card a real filename.
 *
 * `opengraph-image.tsx` exports to `out/opengraph-image` — no extension — and a
 * static host has only the extension to go on, so it serves the PNG as
 * `application/octet-stream` and crawlers drop it. Worse, the canonical helper
 * appends a trailing slash to any path without a dot, so `/opengraph-image/`
 * (a directory that does not exist) 404s.
 *
 * Copying it to `og.png` fixes both: correct MIME, and a path the URL helper
 * recognises as a file. Metadata points at `/og.png`; this only has to put the
 * bytes there.
 */
import { copyFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

await writeFile(path.resolve("out/.nojekyll"), "");

const from = path.resolve("out/opengraph-image");
const to = path.resolve("out/og.png");

try {
  await stat(from);
} catch {
  // The route is gone or was renamed — fail loudly rather than shipping a
  // silently broken social card.
  console.error(`postbuild: expected ${from} to exist. Did opengraph-image move?`);
  process.exit(1);
}

await copyFile(from, to);
console.log(`postbuild: .nojekyll + og.png written (${((await stat(to)).size / 1024).toFixed(0)}KB)`);
