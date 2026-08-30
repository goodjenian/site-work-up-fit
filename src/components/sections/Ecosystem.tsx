import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

const chain = [
  {
    step: "Metodologia",
    body: "A Work Up Fit desenvolve o programa: a sequência, a música, a progressão e o material de aula.",
  },
  {
    step: "Instrutor",
    body: "O profissional de Educação Física se certifica e passa a aplicar o método nas suas turmas.",
  },
  {
    step: "Academia",
    body: "A unidade licencia a metodologia e coloca a aula na grade, com instrutores certificados.",
  },
  {
    step: "Aluno",
    body: "Quem treina encontra uma experiência reconhecível — a mesma aula, com a mesma identidade.",
  },
  {
    step: "Comunidade",
    body: "Turmas, instrutores e academias formam uma rede que sustenta o método e o faz crescer.",
  },
];

export function Ecosystem() {
  return (
    <Section id="ecossistema">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow>O que é a Work Up Fit</Eyebrow>
          <Heading level={2} size="display-lg" className="mt-5">
            Não vendemos aulas.
            <span className="block text-volt-400">Formamos quem dá a aula.</span>
          </Heading>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted">
            A Work Up Fit é uma certificadora de metodologias fitness. Criamos programas de aula
            coletiva, certificamos os instrutores que os aplicam e licenciamos esses programas para
            academias. Cada elo depende e fortalece o seguinte.
          </p>
        </Reveal>
      </div>

      <RevealGroup as="ol" className="mt-14 grid gap-4 md:mt-16 md:grid-cols-5">
        {chain.map((c, i) => (
          <RevealItem as="li" key={c.step} className="relative">
            <Card className="flex h-full flex-col rounded-lg p-5 transition-colors duration-300 hover:border-ink-500">
              <span className="font-display text-xs tracking-[0.2em] text-volt-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2.5 font-display text-xl text-chalk">{c.step}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
            </Card>
            {i < chain.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -bottom-2.5 left-1/2 hidden -translate-x-1/2 text-ink-500 md:block md:-right-3.5 md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2 md:translate-x-0"
              >
                <svg viewBox="0 0 16 16" className="size-4 rotate-90 md:rotate-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 8h11M9 4l4 4-4 4" />
                </svg>
              </span>
            )}
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
