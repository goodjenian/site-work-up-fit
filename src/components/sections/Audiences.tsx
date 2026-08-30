import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getProgram } from "@/data/programs";

const paths = [
  {
    key: "profissional",
    kicker: "Para profissionais",
    title: "Transforme sua experiência em novas possibilidades.",
    body: "Certifique-se numa metodologia própria, entre para uma rede de instrutores e amplie o tipo de aula que você consegue oferecer.",
    bullets: [
      "Metodologia pronta para aplicar na sua turma",
      "Certificação com validação pública",
      "Rede de instrutores certificados",
    ],
    cta: { label: "Quero me certificar", href: "/contato?perfil=profissional" },
    imageSlug: "fight",
    accent: "#37B7FF",
  },
  {
    key: "academia",
    kicker: "Para academias",
    title: "Leve novas experiências coletivas para seus alunos.",
    body: "Licencie metodologias completas, monte uma grade com identidade própria e conte com instrutores já formados no método.",
    bullets: [
      "Grade de aulas com identidade de marca",
      "Instrutores certificados na metodologia",
      "Programas para todos os perfis de aluno",
    ],
    cta: { label: "Quero conversar com a Work Up Fit", href: "/academias" },
    imageSlug: "life",
    accent: "#04C464",
  },
] as const;

export function Audiences() {
  return (
    <Section tone="raised" id="para-quem">
      <Reveal className="max-w-2xl">
        <Eyebrow>Para quem é</Eyebrow>
        <Heading level={2} size="display-lg" className="mt-5">
          Dois caminhos.
          <span className="block text-volt-400">O mesmo método.</span>
        </Heading>
      </Reveal>

      <RevealGroup as="ul" className="mt-12 grid gap-6 lg:grid-cols-2">
        {paths.map((p) => {
          const program = getProgram(p.imageSlug)!;
          return (
            <RevealItem as="li" key={p.key} className="h-full">
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-ink-600 bg-ink-800 transition-[border-color,box-shadow] duration-300 hover:border-[color-mix(in_oklab,var(--accent)_45%,var(--color-ink-600))] hover:shadow-[var(--shadow-lift)]"
                style={{ ["--accent" as string]: p.accent }}
              >
                <div className="relative aspect-16/9 overflow-hidden sm:aspect-21/9 lg:aspect-16/9">
                  <Image
                    src={program.image}
                    alt={program.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 92vw"
                    className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/45 to-transparent"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                    {p.kicker}
                  </p>
                  <h3 className="mt-3 text-balance font-display text-2xl leading-tight text-chalk md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-pretty leading-relaxed text-muted">{p.body}</p>

                  <ul className="mt-6 space-y-2.5">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-chalk-dim">
                        <svg
                          viewBox="0 0 16 16"
                          className="mt-0.5 size-4 shrink-0 text-[var(--accent)]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M3 8.5l3.2 3.2L13 5" />
                        </svg>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={p.cta.href}
                    className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 font-semibold text-ink-950 transition-[filter,transform] duration-200 hover:brightness-110 active:translate-y-px sm:w-auto sm:self-start"
                  >
                    {p.cta.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
