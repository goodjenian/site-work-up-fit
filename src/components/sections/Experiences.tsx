import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getProgram } from "@/data/programs";
import { events } from "@/data/events";
import { ImageBlock } from "@/components/ui/ImageBlock";

const formats = [
  {
    title: "Formações presenciais",
    body: "O módulo prático acontece ao vivo, com a turma na sala — é assim que a condução de aula se aprende.",
  },
  {
    title: "Conteúdo online",
    body: "A parte teórica de cada metodologia fica disponível para estudar no seu ritmo, antes e depois da formação.",
  },
  {
    title: "Masterclasses",
    body: "Aulas abertas para conhecer uma metodologia por dentro antes de decidir em qual se certificar.",
  },
];

export function Experiences() {
  const p = getProgram("bike")!;
  const hasEvents = events.length > 0;

  return (
    <Section id="experiencias">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <ImageBlock
            src={p.image}
            alt={p.alt}
            ratio="landscape"
            scrim="corner"
            sizes="(min-width: 1024px) 46vw, 92vw"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <Eyebrow>Experiências e aulas</Eyebrow>
          <Heading level={2} size="display-lg" className="mt-5">
            Presencial onde
            <span className="block text-volt-400">o método acontece.</span>
          </Heading>
          <p className="mt-6 text-pretty leading-relaxed text-muted">
            Formação prática ao vivo, conteúdo online para estudar antes, e masterclasses abertas
            para conhecer a metodologia por dentro.
          </p>

          <ul className="mt-9 space-y-6">
            {formats.map((f) => (
              <li key={f.title} className="border-l-2 border-ink-600 pl-5">
                <h3 className="font-display text-lg text-chalk">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <ButtonLink
              href="/agenda"
              variant="secondary"
              size="lg"
              analyticsName="ver_agenda"
              analyticsLocation="home_experiencias"
            >
              {hasEvents ? "Ver agenda" : "Entrar na lista da próxima turma"}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
