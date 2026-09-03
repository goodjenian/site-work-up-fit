import Link from "next/link";
import { Mark } from "@/components/brand/Mark";
import { Wordmark } from "@/components/brand/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";

const socialLinks = [
  { key: "instagram", label: "Instagram", href: site.social.instagram },
  { key: "youtube", label: "YouTube", href: site.social.youtube },
  { key: "linkedin", label: "LinkedIn", href: site.social.linkedin },
].filter((s): s is { key: string; label: string; href: string } => Boolean(s.href));

/**
 * Closing frame: a statement with its two routes out on the left, the index on
 * the right, and the lock-up set large across the bottom — the shape the
 * reference closes on, because a footer is the last thing that carries the
 * brand rather than the last thing that lists links.
 */
export function Footer() {
  return (
    <footer className="border-t border-white/12 bg-void">
      <Container className="py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)] lg:gap-20">
          <div>
            <p className="max-w-md text-pretty text-calm-md font-medium text-chalk">
              Formamos instrutores e levamos experiências de treino em grupo para academias de todo
              o Brasil.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href="/certificacoes"
                variant="light"
                size="sm"
                analyticsName="ver_certificacoes"
                analyticsLocation="footer"
              >
                Ver as metodologias
              </ButtonLink>
              <ButtonLink
                href="/contato"
                variant="outline"
                size="sm"
                analyticsName="falar_com_a_equipe"
                analyticsLocation="footer"
              >
                Falar com a equipe
              </ButtonLink>
            </div>

            {socialLinks.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {socialLinks.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted underline decoration-white/25 underline-offset-4 transition-colors hover:text-chalk"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Rodapé" className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">
                  {group.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-chalk-dim transition-colors hover:text-chalk"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* The lock-up set large, the way a masthead signs off. */}
        <div className="mt-20 border-t border-white/12 pt-10">
          <Link
            href="/"
            aria-label="Work Up Fit — página inicial"
            className="inline-flex items-center gap-[calc(var(--mark-h)*0.033)] [--mark-h:3rem] md:[--mark-h:4.5rem]"
          >
            <Mark weight={1} className="h-[var(--mark-h)] shrink-0 text-chalk" />
            <Wordmark className="h-[calc(var(--mark-h)*0.508)] text-chalk" />
          </Link>

          <div className="mt-8 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.legalName}. Todos os direitos reservados.
            </p>
            <p className="text-xs">
              As metodologias Work Up Fit são aplicadas por profissionais de Educação Física
              certificados.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
