import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const pillars = [
  {
    title: "Conexão",
    body: "Treinar junto muda o treino. A turma puxa, sustenta e celebra — e é por isso que as pessoas voltam.",
  },
  {
    title: "Pertencimento",
    body: "Cada metodologia cria um grupo com identidade própria. Você não entra numa aula: você entra numa turma.",
  },
  {
    title: "Longevidade",
    body: "Movimento que cabe na vida inteira. Do treino intenso ao trabalho de mobilidade e equilíbrio.",
  },
];

export function BrandPromise() {
  return (
    <Section tone="raised" className="overflow-hidden">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal>
          <Eyebrow>Nossa filosofia</Eyebrow>
          <Heading level={2} size="display-lg" className="mt-5">
            Movimento
            <span className="block text-volt-400">que conecta.</span>
          </Heading>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-pretty text-xl leading-relaxed text-chalk-dim md:text-2xl">
            Exercício não precisa ser sobre performance. Pode ser sobre estar junto.
          </p>
          <p className="mt-5 text-pretty leading-relaxed text-muted">
            A aula coletiva é o formato mais humano do fitness: alguém à frente conduzindo, uma sala
            inteira no mesmo ritmo, e a sensação — rara — de fazer parte. É esse encontro que a Work
            Up Fit transforma em método, ensina a instrutores e entrega para academias.
          </p>

          <RevealGroup as="ul" className="mt-10 grid gap-6 sm:grid-cols-3">
            {pillars.map((p) => (
              <RevealItem as="li" key={p.title}>
                <div className="h-0.5 w-9 bg-volt-400" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl text-chalk">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>
      </div>
    </Section>
  );
}
