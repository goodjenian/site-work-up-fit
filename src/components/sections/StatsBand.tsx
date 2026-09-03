import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * The numbers band.
 *
 * Three entries, not four. The reference fills this row with reach figures —
 * gyms, countries, instructors, years — and Work Up Fit has none of them yet:
 * no certification has been issued. What is on the wall here is only what the
 * official material actually proves, which is the shape of the catalogue.
 * A fourth tile would have to be invented, so there isn't one.
 */
const facts = [
  { above: "Certificações em", value: "11", below: "metodologias" },
  { above: "Divididas em", value: "4", below: "frentes de treino" },
  { above: "Desenvolvido no", value: "BR", below: "método brasileiro" },
];

export function StatsBand() {
  return (
    <section className="section-y bg-void">
      <Container>
        <Reveal>
          <Heading level={2} tone="calm" size="calm-lg" className="mx-auto max-w-2xl text-center">
            Um método inteiro, pronto para entrar na grade.
          </Heading>
        </Reveal>

        <RevealGroup
          as="dl"
          className="mt-16 grid gap-12 sm:grid-cols-3 md:mt-20"
          stagger={0.08}
        >
          {facts.map((f) => (
            <RevealItem key={f.below} className="text-center">
              <dt className="text-xs uppercase tracking-[0.16em] text-muted">{f.above}</dt>
              <dd>
                <span className="mt-4 block font-display text-stat text-volt-400">{f.value}</span>
                <span className="mt-3 block text-sm text-chalk-dim">{f.below}</span>
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
