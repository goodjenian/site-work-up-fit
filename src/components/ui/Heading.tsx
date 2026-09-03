import { cn } from "@/lib/utils";

type Level = 1 | 2 | 3 | 4;
type Size = "hero" | "display-xl" | "display-lg" | "display-md" | "display-sm" | "calm-lg" | "calm-md";

const sizeClass: Record<Size, string> = {
  hero: "text-hero",
  "display-xl": "text-display-xl",
  "display-lg": "text-display-lg",
  "display-md": "text-display-md",
  "display-sm": "text-display-sm",
  "calm-lg": "text-calm-lg",
  "calm-md": "text-calm-md",
};

/**
 * Two registers, deliberately far apart.
 *
 * `display` is the condensed uppercase voice the wordmark is drawn in — for
 * the hero and for names. `calm` is the body face at large size in sentence
 * case, for section openers. Setting every heading in the loud register makes
 * a page read as noise; alternating gives the quiet ones somewhere to land.
 */
export function Heading({
  level = 2,
  size = "display-md",
  tone = "display",
  italic = false,
  className,
  children,
  id,
}: {
  level?: Level;
  size?: Size;
  tone?: "display" | "calm";
  italic?: boolean;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  const face =
    tone === "calm"
      ? "font-sans font-medium"
      : italic
        ? "font-display-italic"
        : "font-display";

  return (
    <Tag id={id} className={cn(face, sizeClass[size], "text-balance text-chalk", className)}>
      {children}
    </Tag>
  );
}
