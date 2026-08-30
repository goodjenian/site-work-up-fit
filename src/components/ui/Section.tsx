import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Section({
  id,
  className,
  innerClassName,
  children,
  tone = "base",
  as: Tag = "section",
  bleed = false,
  ...rest
}: {
  id?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  /** Alternating background rhythm. */
  tone?: "base" | "raised" | "deep";
  as?: React.ElementType;
  /** Skip the container — the section handles its own width. */
  bleed?: boolean;
} & React.HTMLAttributes<HTMLElement>) {
  const tones = {
    base: "bg-ink-900",
    raised: "bg-ink-850",
    deep: "bg-ink-950",
  } as const;

  return (
    <Tag id={id} className={cn("section-y relative", tones[tone], className)} {...rest}>
      {bleed ? children : <Container className={innerClassName}>{children}</Container>}
    </Tag>
  );
}
