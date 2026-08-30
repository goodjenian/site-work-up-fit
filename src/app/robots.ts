import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/url";

// Emitted at build time — the static export has no server to render it on
// request, and its content only changes when the site is rebuilt.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // A looked-up code is per-person and must stay out of search. The result
        // now lives on `?codigo=` rather than its own path.
        disallow: ["/validar-certificado?*"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
