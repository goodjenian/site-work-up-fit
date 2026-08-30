import { site } from "@/data/site";

/**
 * Joins a route onto the site's public URL.
 *
 * `new URL("/faq", base)` looks equivalent but silently drops any path on the
 * base, so a site served from a subdirectory (GitHub Pages project sites, a
 * staging prefix) would emit canonicals and sitemap entries pointing at the
 * domain root.
 *
 * The trailing slash mirrors `trailingSlash: true` in next.config.ts. Without
 * it the sitemap would advertise `/faq` while the page itself declares `/faq/`
 * as canonical — two URLs for one page. Paths that name a file (`/sitemap.xml`)
 * keep their exact form.
 */
export function absoluteUrl(path = "/") {
  const base = site.url.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  if (suffix === "/") return `${base}/`;
  const isFile = /\.[a-z0-9]+$/i.test(suffix);
  return `${base}${suffix}${isFile || suffix.endsWith("/") ? "" : "/"}`;
}
