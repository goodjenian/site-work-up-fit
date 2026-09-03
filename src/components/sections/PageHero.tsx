import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  accent,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <section
      data-page-hero=""
      className={cn("relative overflow-hidden bg-void pt-28 pb-4 md:pt-36 md:pb-6", className)}
      style={accent ? ({ ["--accent" as string]: accent } as React.CSSProperties) : undefined}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 h-96 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(46% 60% at 26% 20%, color-mix(in oklab, var(--accent) 20%, transparent) 0%, transparent 70%)",
        }}
      />
      <Container className="relative">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Trilha de navegação" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
              {crumbs.map((c, i) => (
                <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-chalk">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-chalk-dim">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading level={1} size="display-lg" className="mt-5 max-w-4xl">
          {title}
        </Heading>
        {lead && (
          <div className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-chalk-dim">
            {lead}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
