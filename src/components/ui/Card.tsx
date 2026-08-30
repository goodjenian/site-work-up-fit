import { cn } from "@/lib/utils";

/**
 * The standard raised surface: border, background, shadow.
 *
 * Radius and padding come from the caller — `cn()` merges them over the
 * defaults — so one component covers everything from a 5px-padded stat tile to
 * a full-bleed image card, without a prop per variation.
 */
export function Card({
  className,
  children,
  interactive = false,
  as: Tag = "div",
  style,
}: {
  className?: string;
  children: React.ReactNode;
  /** Adds the lift-on-hover treatment, tinted with `--accent`. */
  interactive?: boolean;
  as?: React.ElementType;
  style?: React.CSSProperties;
}) {
  return (
    <Tag
      style={style}
      className={cn(
        "rounded-xl border border-ink-600 bg-ink-800 shadow-[var(--shadow-card)]",
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--accent)_45%,var(--color-ink-600))] hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
