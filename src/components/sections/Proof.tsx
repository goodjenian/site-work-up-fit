import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { familyLabels, programs, type ProgramFamily } from "@/data/programs";
import { testimonials } from "@/data/testimonials";
import { Card } from "@/components/ui/Card";

const order: ProgramFamily[] = ["cardio", "dance", "strength", "wellness"];

/**
 * Social proof.
 *
 * `testimonials` is empty — no real quote has been supplied and inventing one
 * would be a fabricated endorsement. Until the client provides them, this
 * shows the proof the brand genuinely has: the whole catalogue, as a
 * typographic index. The testimonial branch below is complete and takes over
 * the moment the array fills.
 */
export function Proof() {
  if (testimonials.length > 0) {
    return (
      <Section tone="raised">
        <Reveal className="max-w-2xl">
          <Eyebrow>Quem já faz parte</Eyebrow>
          <Heading level={2} size="display-lg" className="mt-5">
            A palavra é de quem
            <span className="block text-volt-400">dá a aula.</span>
          </Heading>
        </Reveal>
        <RevealGroup as="ul" className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem as="li" key={t.id}>
              <Card as="figure" className="flex h-full flex-col p-6">
                <blockquote className="flex-1 text-pretty leading-relaxed text-chalk-dim">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-ink-600 pt-4">
                  <span className="block font-semibold text-chalk">{t.name}</span>
                  <span className="block text-sm text-muted">
                    {t.role}
                    {t.city ? ` · ${t.city}` : ""}
                  </span>
                </figcaption>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    );
  }

  return (
    <section className="section-y bg-void">
      <Container>
        <Reveal className="max-w-3xl">
          <Heading level={2} size="display-lg">
            Quatro frentes.
            <span className="block text-volt-400">Onze jeitos de mover uma turma.</span>
          </Heading>
        </Reveal>

        {/* An index, not a card grid: each frente is a line, and the programmes
            inside it are the links. Hairlines do the work a border would. */}
        <RevealGroup as="ul" className="mt-14 border-t border-white/12 md:mt-20" stagger={0.07}>
          {order.map((family) => {
            const items = programs.filter((p) => p.family === family);
            const accent = items[0].accentInk;
            return (
              <RevealItem
                as="li"
                key={family}
                className="border-b border-white/12"
                style={{ ["--accent" as string]: accent }}
              >
                <div className="flex flex-col gap-4 py-8 md:flex-row md:items-baseline md:gap-12 md:py-10">
                  <h3 className="font-display text-index text-chalk md:basis-[38%]">
                    {familyLabels[family]}
                  </h3>
                  <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-2.5 md:flex-1">
                    {items.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/certificacoes/${p.slug}`}
                          className="font-display-italic text-xl leading-none text-chalk-dim transition-colors hover:text-[var(--accent)] md:text-2xl"
                        >
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
