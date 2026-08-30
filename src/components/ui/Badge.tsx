import { cn } from "@/lib/utils";

/** Pill label. `accent` inherits whatever `--accent` is in scope. */
export function Badge({
  children,
  className,
  tone = "neutral",
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "accent" | "neutral" | "outline";
  as?: React.ElementType;
}) {
  const tones = {
    accent:
      "border-[color-mix(in_oklab,var(--accent)_40%,transparent)] bg-[color-mix(in_oklab,var(--accent)_16%,transparent)] text-[var(--accent)]",
    neutral: "border-ink-600 bg-ink-800/70 text-chalk-dim",
    outline: "border-ink-600 bg-transparent text-muted",
  } as const;

  return (
    <Tag
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm",
        tones[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
