import { cn } from "@/lib/utils";

/**
 * The Work Up Fit symbol. Geometry lives in `BrandSprite` (rendered once in the
 * root layout); this only references it, so repeating the mark costs bytes, not
 * kilobytes.
 *
 * The viewBox matches the artwork's 0.762 width-to-height ratio, so size it by
 * height and leave the width automatic.
 *
 * `weight` thickens the outline optically. The drawn stroke is 1.1% of the
 * mark's height — right at display size, invisible in a header — so small
 * placements add weight while large ones stay faithful at 0.
 */
export function Mark({
  className,
  weight = 0,
  title,
}: {
  className?: string;
  /** Extra stroke over the traced outline, in viewBox units (100 = mark height). */
  weight?: number;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 76.24 100"
      className={cn("h-8 w-auto", className)}
      strokeWidth={weight}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <use href="#wuf-mark" />
    </svg>
  );
}
