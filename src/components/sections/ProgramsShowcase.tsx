import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProgramCard } from "@/components/ProgramCard";
import { programs } from "@/data/programs";

/**
 * Three programmes, staggered — not the whole catalogue.
 *
 * The reference shows a handful on the home page and sends you elsewhere for
 * the rest, and it is right to: a six-up grid of equal cards reads as a
 * product listing, while three offset ones read as an editorial spread. All
 * eleven live on /certificacoes, where a grid is the correct form.
 *
 * The offsets are margin, not transform, so nothing overlaps the next section.
 */
const offsets = ["", "lg:mt-16", "lg:mt-32"];

export function ProgramsShowcase({ limit = 3 }: { limit?: number }) {
  const featured = programs.slice(0, limit);

  return (
    <section id="certificacoes" className="section-y bg-void">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <Heading level={2} tone="calm" size="calm-lg">
              Metodologias criadas para encher uma sala de aula.
            </Heading>
          </Reveal>

          <Reveal delay={0.1}>
            <ButtonLink
              href="/certificacoes"
              variant="outline"
              size="sm"
              analyticsName="ver_todas_certificacoes"
              analyticsLocation="home_certificacoes"
            >
              Ver as 11 metodologias
            </ButtonLink>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8"
          stagger={0.08}
        >
          {featured.map((program, i) => (
            <RevealItem as="li" key={program.slug} className={offsets[i % offsets.length]}>
              <ProgramCard
                program={program}
                location="home_certificacoes"
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 88vw"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
