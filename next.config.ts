import type { NextConfig } from "next";

/**
 * The site is deployed as a static export to GitHub Pages, which serves a
 * project site from a subdirectory — hence `basePath`. Leave the env var unset
 * for a root domain and everything collapses back to "/".
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // The repo lives inside a parent folder that also has a package.json; pin the
  // root so Next stops inferring the wrong workspace.
  turbopack: { root: __dirname },
  output: "export",
  basePath: basePath || undefined,
  // Static hosts serve `/about/index.html` for `/about/`, not for `/about`.
  trailingSlash: true,
  images: {
    // A static export has no optimiser. Variants are built by
    // `scripts/optimize-images.mjs` and picked by `image-loader.ts`; these
    // width lists must stay in sync with the WIDTHS array in both.
    loader: "custom",
    loaderFile: "./image-loader.ts",
    deviceSizes: [640, 750, 828, 1080, 1254],
    imageSizes: [256, 384],
  },
  poweredByHeader: false,
};

export default nextConfig;
