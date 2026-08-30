import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const steps = [
  {
    title: "Escolha sua certificação",
    body: "Comece pela metodologia que combina com o seu perfil de aula e com o público que você já atende.",
  },
  {
    title: "Aprenda a metodologia",
    body: "Você recebe o conteúdo do programa: estrutura da aula, técnica, progressões e condução de turma.",
  },
  {
    title: "Complete sua formação",
    body: "A formação prática coloca o método no corpo — porque aula coletiva se aprende conduzindo.",
  },
  {
    title: "Receba sua certificação",
    body: "Concluída a avaliação, você recebe a certificação Work Up Fit na metodologia, com validação pública.",
  },
  {
    title: "Leve o método para suas aulas",
    body: "Você passa a aplicar a metodologia nas suas turmas e entra na rede de instrutores certificados.",
  },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28">
          <Eyebrow>Como funciona</Eyebrow>
          <Heading level={2} size="display-lg" className="mt-5">
            Cinco passos
            <span className="block text-volt-400">até dar a sua aula.</span>
          </Heading>
          <p className="mt-6 text-pretty leading-relaxed text-muted">
            O percurso é o mesmo em todas as metodologias. O que muda é o conteúdo do programa —
            e o tipo de turma que você vai conduzir.
          </p>
        </Reveal>

        <RevealGroup as="ol" className="relative" stagger={0.09}>
          <span
            aria-hidden="true"
            className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-gradient-to-b from-volt-400/70 via-ink-600 to-transparent"
          />
          {steps.map((s, i) => (
            <RevealItem as="li" key={s.title} className="relative flex gap-5 pb-9 last:pb-0">
              <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border border-ink-500 bg-ink-800 font-display text-base text-volt-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-1.5">
                <h3 className="font-display text-xl text-chalk md:text-2xl">{s.title}</h3>
                <p className="mt-1.5 max-w-lg text-pretty leading-relaxed text-muted">{s.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
