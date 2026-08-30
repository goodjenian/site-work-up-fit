import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/data/navigation";
import { site } from "@/data/site";

const socialLinks = [
  { key: "instagram", label: "Instagram", href: site.social.instagram },
  { key: "youtube", label: "YouTube", href: site.social.youtube },
  { key: "linkedin", label: "LinkedIn", href: site.social.linkedin },
].filter((s): s is { key: string; label: string; href: string } => Boolean(s.href));

export function Footer() {
  return (
    <footer className="border-t border-ink-600/70 bg-ink-950">
      <Container className="py-14 md:py-18">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-muted">
              Certificadora brasileira de metodologias fitness coletivas. Formamos instrutores e
              levamos experiências de treino em grupo para academias de todo o país.
            </p>

            {socialLinks.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {socialLinks.map((s) => (
                  <li key={s.key}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center rounded-full border border-ink-600 px-4 text-sm text-chalk-dim transition-colors hover:border-volt-400 hover:text-chalk"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Rodapé" className="grid gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="font-display text-sm tracking-[0.14em] text-chalk">{group.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted transition-colors hover:text-chalk"
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

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-600/70 pt-7 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Todos os direitos reservados.
          </p>
          <p className="text-xs">
            As metodologias Work Up Fit são aplicadas por profissionais de Educação Física
            certificados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
