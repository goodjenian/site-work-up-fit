import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ProgramCard } from "@/components/ProgramCard";
import { familyLabels, programs, type ProgramFamily } from "@/data/programs";
import { Badge } from "@/components/ui/Badge";

const familyOrder: ProgramFamily[] = ["cardio", "dance", "strength", "wellness"];

export function ProgramsShowcase({
  limit = 6,
  showAllLink = true,
}: {
  limit?: number;
  showAllLink?: boolean;
}) {
  const featured = programs.slice(0, limit);

  return (
    <Section id="certificacoes" tone="raised">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-2xl">
          <Eyebrow>Certificações</Eyebrow>
          <Heading level={2} size="display-lg" className="mt-5">
            Encontre a metodologia
            <span className="block text-volt-400">que combina com você.</span>
          </Heading>
          <p className="mt-5 text-pretty leading-relaxed text-muted">
            Onze programas divididos em quatro frentes de treino. Você pode se certificar em um — ou
            construir uma grade inteira.
          </p>
        </Reveal>

        {showAllLink && (
          <Reveal delay={0.1}>
            <ButtonLink
              href="/certificacoes"
              variant="secondary"
              analyticsName="ver_todas_certificacoes"
              analyticsLocation="home_certificacoes"
            >
              Ver as 11 metodologias
            </ButtonLink>
          </Reveal>
        )}
      </div>

      <Reveal delay={0.05} className="mt-8">
        <ul className="flex flex-wrap gap-2">
          {familyOrder.map((f) => {
            const count = programs.filter((p) => p.family === f).length;
            return (
              <li key={f}>
                <Badge className="gap-2 text-xs font-medium">
                  {familyLabels[f]}
                  <span className="text-muted">{count}</span>
                </Badge>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <RevealGroup
        as="ul"
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.06}
      >
        {featured.map((program) => (
          <RevealItem as="li" key={program.slug} className="h-full">
            <ProgramCard program={program} location="home_certificacoes" />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
