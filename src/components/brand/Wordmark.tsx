import { cn } from "@/lib/utils";
import { WORDMARK_VIEWBOX } from "./wordmark-path";

const [, , W, H] = WORDMARK_VIEWBOX.split(" ").map(Number);

/**
 * The brand lettering. Geometry lives in `BrandSprite`, referenced here with
 * `<use>` so the header and footer share one copy.
 *
 * Deliberately inline rather than an `<img>`: Next forces `unoptimized` on a
 * `.svg` src, which skips the custom image loader — and therefore skips the
 * `basePath` prefix — so the file 404s on a subdirectory deploy. Inlining
 * removes the URL from the problem entirely, and drops a request.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn("h-6 w-auto", className)}
      aria-hidden="true"
      focusable="false"
    >
      <use href="#wuf-wordmark" />
    </svg>
  );
}
