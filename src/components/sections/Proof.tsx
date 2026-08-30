import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { familyLabels, programs, type ProgramFamily } from "@/data/programs";
import { testimonials } from "@/data/testimonials";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const order: ProgramFamily[] = ["cardio", "dance", "strength", "wellness"];

/**
 * Social proof.
 *
 * `testimonials` is empty — no real quote has been supplied and inventing one
 * would be a fabricated endorsement. Until the client provides them, this
 * section shows the proof the brand genuinely has: the breadth of the
 * methodology catalogue, straight from the official material. The testimonial
 * branch below is complete and takes over the moment the array fills.
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
    <Section tone="raised">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal>
          <Eyebrow>O catálogo</Eyebrow>
          <Heading level={2} size="display-lg" className="mt-5">
            Uma grade inteira
            <span className="block text-volt-400">num só método.</span>
          </Heading>
          <p className="mt-6 text-pretty leading-relaxed text-muted">
            Quatro frentes de treino cobrindo o dia inteiro de uma academia — do cardio de alta
            intensidade ao trabalho de mobilidade e longevidade. Cada uma com metodologia,
            identidade visual e formação próprias.
          </p>
        </Reveal>

        <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2" stagger={0.07}>
          {order.map((family) => {
            const items = programs.filter((p) => p.family === family);
            const accent = items[0].accentInk;
            return (
              <RevealItem as="li" key={family}>
                <Card className="h-full rounded-lg p-5" style={{ ["--accent" as string]: accent }}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg text-chalk">{familyLabels[family]}</h3>
                    <span className="font-display text-2xl leading-none text-[var(--accent)]">
                      {items.length}
                    </span>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {items.map((p) => (
                      <Badge as="li" key={p.slug} tone="outline" className="px-2.5 py-1 font-display-italic text-[var(--accent)]">
                        {p.name}
                      </Badge>
                    ))}
                  </ul>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
