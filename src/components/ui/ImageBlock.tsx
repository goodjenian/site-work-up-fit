import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Editorial image frame: fixed crop, brand radius and a gradient scrim so text
 * can sit over the illustration without losing contrast.
 *
 * The official artwork puts faces near the top, so the default object position
 * is `top` — cropping from the centre decapitates most of the eleven pieces.
 */
export function ImageBlock({
  src,
  alt,
  className,
  ratio = "square",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  scrim = "bottom",
  position = "top",
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: "square" | "portrait" | "landscape" | "wide" | "ultrawide";
  priority?: boolean;
  sizes?: string;
  scrim?: "bottom" | "corner" | "none";
  position?: "top" | "center";
}) {
  const ratios = {
    square: "aspect-square",
    portrait: "aspect-4/5",
    landscape: "aspect-4/3",
    wide: "aspect-16/9",
    ultrawide: "aspect-16/10",
  } as const;

  const scrims = {
    bottom: "bg-gradient-to-t from-ink-950/70 via-transparent to-transparent",
    corner: "bg-gradient-to-tr from-ink-950/70 via-transparent to-transparent",
    none: "",
  } as const;

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-ink-800", ratios[ratio], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", position === "top" ? "object-top" : "object-center")}
      />
      {scrim !== "none" && (
        <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", scrims[scrim])} />
      )}
    </div>
  );
}
