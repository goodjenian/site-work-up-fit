import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  dot = true,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]",
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]"
        />
      )}
      {children}
    </p>
  );
}
