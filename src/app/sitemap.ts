import type { MetadataRoute } from "next";
import { programs } from "@/data/programs";
import { posts } from "@/data/posts";
import { absoluteUrl } from "@/lib/url";

// Emitted at build time — the static export has no server to render it on
// request, and its content only changes when the site is rebuilt.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = absoluteUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/certificacoes"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: url("/academias"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/quem-somos"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/agenda"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: url("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/contato"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/validar-certificado"), lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: url("/politica-de-privacidade"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: url("/termos-de-uso"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // The blog index is only listed once it has something to show.
  if (posts.length > 0) {
    staticRoutes.push({
      url: url("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  const programRoutes: MetadataRoute.Sitemap = programs.map((p) => ({
    url: url(`/certificacoes/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: url(`/blog/${p.slug}`),
    lastModified: new Date(p.publishedAt),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...programRoutes, ...postRoutes];
}
