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
  /*
    Near-uniform black. The old navy steps were doing the work that photography
    and type should do, and every boundary read as a seam. `raised` keeps a
    whisper of separation for sections that sit back to back.
  */
  const tones = {
    base: "bg-void",
    raised: "bg-ink-950",
    deep: "bg-void",
  } as const;

  return (
    <Tag id={id} className={cn("section-y relative", tones[tone], className)} {...rest}>
      {bleed ? children : <Container className={innerClassName}>{children}</Container>}
    </Tag>
  );
}
