import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getProgram } from "@/data/programs";
import { Card } from "@/components/ui/Card";
import { ImageBlock } from "@/components/ui/ImageBlock";

const benefits = [
  { title: "Novas modalidades", body: "Onze programas prontos para entrar na grade, sem desenvolver metodologia do zero." },
  { title: "Instrutores certificados", body: "Profissionais formados na metodologia, prontos para conduzir a turma no padrão do método." },
  { title: "Experiência para o aluno", body: "Aula com identidade reconhecível — o aluno sabe o que vai encontrar antes de entrar na sala." },
  { title: "Diferenciação", body: "Uma grade que a academia da esquina não tem, com marca e linguagem próprias." },
  { title: "Metodologia viva", body: "Programas que evoluem, com material e atualização para a equipe da unidade." },
  { title: "Comunidade", body: "Turmas que criam vínculo — o formato de aula com maior poder de retenção." },
];

export function ForGyms() {
  const p = getProgram("lift")!;

  return (
    <Section tone="deep" id="academias" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(50% 50% at 85% 15%, rgb(252 84 84 / 0.13) 0%, transparent 70%)",
        }}
      />
      <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <Reveal>
          <Eyebrow className="text-[#FC5454]">Para academias</Eyebrow>
          <Heading level={2} size="display-lg" className="mt-5">
            Uma grade nova
            <span className="block text-[#FC5454]">sem começar do zero.</span>
          </Heading>
          <p className="mt-6 text-pretty leading-relaxed text-muted">
            A academia licencia a metodologia e passa a oferecê-la na grade, aplicada por
            instrutores certificados. Você entra com a estrutura e o público; a Work Up Fit entra
            com o método, o material e a formação.
          </p>

          <div className="mt-9">
            <ButtonLink
              href="/academias"
              size="lg"
              className="bg-[#FC5454] text-ink-950 shadow-[0_12px_34px_-14px_#FC5454] hover:bg-[#FF6C6C]"
              analyticsName="levar_para_academia"
              analyticsLocation="home_academias"
            >
              Quero levar a Work Up Fit para minha academia
            </ButtonLink>
          </div>

          <ImageBlock
            src={p.image}
            alt={p.alt}
            ratio="ultrawide"
            sizes="45vw"
            className="mt-12 hidden lg:block"
          />
        </Reveal>

        <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2" stagger={0.06}>
          {benefits.map((b) => (
            <RevealItem as="li" key={b.title}>
              <Card className="h-full rounded-lg bg-ink-800/70 p-5 transition-colors duration-300 hover:border-ink-500">
                <h3 className="font-display text-lg text-chalk">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
