import Link from "next/link";
import { cn } from "@/lib/utils";
import { Mark } from "./Mark";
import { Wordmark } from "./Wordmark";

/**
 * The brand lock-up, proportioned from the official artwork rather than by eye.
 * Measured on `public/brand/logo-mockup.jpg`, where symbol and wordmark appear
 * together: the wordmark is 0.508× the symbol's height, the gap between them is
 * 0.033×, and the two are optically centred on the same line.
 *
 * Everything derives from `--mark-h`, so the lock-up keeps those ratios at any
 * size — set that one value to scale the whole thing.
 */
export function Logo({
  className,
  href = "/",
  markClassName,
  wordmarkClassName,
}: {
  className?: string;
  href?: string | null;
  markClassName?: string;
  wordmarkClassName?: string;
}) {
  const content = (
    <>
      <Mark
        // At header size the artwork's hairline lands under half a pixel and
        // reads as a smudge; 1.5 restores presence without closing the gaps
        // where the three triangles cross.
        weight={1.5}
        className={cn("h-[var(--mark-h)] shrink-0 text-chalk", markClassName)}
      />
      <Wordmark className={cn("h-[calc(var(--mark-h)*0.508)] text-chalk", wordmarkClassName)} />
    </>
  );

  const classes = cn(
    "inline-flex items-center gap-[calc(var(--mark-h)*0.033)] [--mark-h:2.25rem] md:[--mark-h:2.5rem]",
    className,
  );

  if (!href) return <span className={classes}>{content}</span>;

  return (
    <Link href={href} className={cn(classes, "rounded-md")} aria-label="Work Up Fit — página inicial">
      {content}
    </Link>
  );
}
