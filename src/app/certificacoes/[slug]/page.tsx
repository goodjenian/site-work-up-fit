import Link from "next/link";
import { notFound } from "next/navigation";
import { PageView } from "@/components/PageView";
import { ProgramCard } from "@/components/ProgramCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FaqList } from "@/components/Faq";
import { familyLabels, getProgram, programs } from "@/data/programs";
import { faqsByTopic } from "@/data/faqs";
import { site } from "@/data/site";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ImageBlock } from "@/components/ui/ImageBlock";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return {};
  return buildMetadata({
    title: `${program.name} — certificação Work Up Fit`,
    description: `${program.summary} ${program.pillars.join(" · ")}. Certificação Work Up Fit para profissionais de Educação Física.`,
    path: `/certificacoes/${program.slug}`,
    image: program.keyVisual,
  });
}

const steps = [
  { n: "01", t: "Escolha", b: "Você escolhe esta metodologia como ponto de partida da sua formação." },
  { n: "02", t: "Conteúdo", b: "Recebe o material do programa: estrutura da aula, técnica e progressões." },
  { n: "03", t: "Prática", b: "Participa da formação prática e conduz a aula na frente da turma." },
  { n: "04", t: "Avaliação", b: "É avaliado na condução e na execução do método." },
  { n: "05", t: "Certificação", b: "Recebe a certificação Work Up Fit em " },
];

export default async function ProgramPage({ params }: Params) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const related = programs.filter((p) => p.family === program.family && p.slug !== program.slug).slice(0, 3);
  const fallbackRelated = programs.filter((p) => p.slug !== program.slug).slice(0, 3);
  const suggestions = related.length > 0 ? related : fallbackRelated;
  const faqs = faqsByTopic("certificacao");

  return (
    <div style={{ ["--accent" as string]: program.accentInk } as React.CSSProperties}>
      <PageView title={`Certificação ${program.name}`} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Início", item: site.url },
                { "@type": "ListItem", position: 2, name: "Certificações", item: `${site.url}/certificacoes` },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: program.name,
                  item: `${site.url}/certificacoes/${program.slug}`,
                },
              ],
            },
            /* Course: only fields we actually know. No price, no duration, no
               schedule — those have not been defined. */
            {
              "@type": "Course",
              name: `Certificação Work Up Fit ${program.name}`,
              description: program.summary,
              inLanguage: "pt-BR",
              image: `${site.url}${program.image}`,
              url: `${site.url}/certificacoes/${program.slug}`,
              provider: { "@type": "Organization", name: site.name, url: site.url },
            },
          ],
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-ink-950 pt-28 md:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 h-[30rem]"
          style={{
            backgroundImage:
              "radial-gradient(50% 60% at 30% 10%, color-mix(in oklab, var(--accent) 24%, transparent) 0%, transparent 70%)",
          }}
        />
        <Container className="relative">
          <nav aria-label="Trilha de navegação" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-chalk">Início</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/certificacoes" className="transition-colors hover:text-chalk">
                  Certificações
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-chalk-dim">{program.name}</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-14 lg:pb-24">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {familyLabels[program.family]}
              </p>
              <h1 className="mt-4 font-display-italic text-[clamp(4rem,11vw,8.5rem)] leading-[0.85] text-[var(--accent)]">
                {program.name}
              </h1>
              <ul className="mt-6 flex flex-wrap gap-2">
                {program.pillars.map((p) => (
                  <Badge as="li" key={p}>
                    {p}
                  </Badge>
                ))}
              </ul>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-chalk-dim">
                {program.summary}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink
                  href={`/contato?perfil=profissional&programa=${program.slug}`}
                  size="lg"
                  variant="accent"
                  analyticsName="quero_me_certificar"
                  analyticsLocation={`programa_${program.slug}`}
                >
                  Quero me certificar
                </ButtonLink>
                <ButtonLink
                  href="/certificacoes"
                  variant="secondary"
                  size="lg"
                  analyticsName="ver_outras_metodologias"
                  analyticsLocation={`programa_${program.slug}`}
                >
                  Ver outras metodologias
                </ButtonLink>
              </div>
            </div>

            <ImageBlock
              src={program.image}
              alt={program.alt}
              ratio="portrait"
              priority
              sizes="(min-width: 1024px) 44vw, 92vw"
              className="sm:aspect-square lg:aspect-4/5"
            />
          </div>
        </Container>
      </section>

      {/* PARA QUEM É / O QUE VOCÊ VAI APRENDER */}
      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Para quem é</Eyebrow>
            <Heading level={2} size="display-md" className="mt-5">
              Feita para quem conduz turma.
            </Heading>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              A certificação {program.name} é voltada a profissionais de Educação Física e
              estudantes em formação que querem conduzir aulas coletivas — seja para ampliar o
              repertório na academia onde já atuam, seja para entrar numa nova frente de trabalho.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted">
              Não é preciso ter experiência prévia nesta metodologia: a formação parte do zero e
              termina com você conduzindo a aula.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow>O que você vai aprender</Eyebrow>
            <Heading level={2} size="display-md" className="mt-5">
              A aula por dentro.
            </Heading>
            <ul className="mt-6 space-y-3.5">
              {program.whatToExpect.map((item) => (
                <li key={item} className="flex items-start gap-3 text-chalk-dim">
                  <svg
                    viewBox="0 0 16 16"
                    className="mt-1 size-4 shrink-0 text-[var(--accent)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 8.5l3.2 3.2L13 5" />
                  </svg>
                  <span className="text-pretty leading-relaxed">{item}</span>
                </li>
              ))}
              <li className="flex items-start gap-3 text-chalk-dim">
                <svg
                  viewBox="0 0 16 16"
                  className="mt-1 size-4 shrink-0 text-[var(--accent)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8.5l3.2 3.2L13 5" />
                </svg>
                <span className="text-pretty leading-relaxed">
                  Condução de turma: comando, correção e leitura da sala
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ESTRUTURA DA FORMAÇÃO */}
      <Section>
        <Reveal className="max-w-2xl">
          <Eyebrow>Estrutura da formação</Eyebrow>
          <Heading level={2} size="display-md" className="mt-5">
            Como a certificação {program.name} acontece.
          </Heading>
        </Reveal>

        <RevealGroup as="ol" className="mt-12 grid gap-4 md:grid-cols-5" stagger={0.06}>
          {steps.map((s) => (
            <RevealItem as="li" key={s.n}>
              <Card className="flex h-full flex-col rounded-lg p-5">
                <span className="font-display text-xs tracking-[0.2em] text-[var(--accent)]">
                  {s.n}
                </span>
                <h3 className="mt-2.5 font-display text-lg text-chalk">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.b}
                  {s.n === "05" && <span className="text-chalk-dim">{program.name}</span>}
                  {s.n === "05" && ", com página pública de validação."}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>

        {/*
          Format, workload and level come from `program.details`, which is null
          for every programme until the client confirms it. We say so plainly
          instead of printing a number nobody has approved.
        */}
        {program.details ? (
          <Reveal delay={0.1}>
            <dl className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                { k: "Formato", v: program.details.format },
                { k: "Carga horária", v: `${program.details.workloadHours} horas` },
                { k: "Nível", v: program.details.level },
              ].map((d) => (
                <Card key={d.k} className="rounded-lg p-5">
                  <dt className="text-xs uppercase tracking-[0.14em] text-muted">{d.k}</dt>
                  <dd className="mt-2 font-display text-xl text-chalk">{d.v}</dd>
                </Card>
              ))}
            </dl>
          </Reveal>
        ) : (
          <Reveal delay={0.1}>
            <Card className="mt-12 flex flex-col gap-4 rounded-lg p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
              <div>
                <p className="font-display text-lg text-chalk">
                  Formato, carga horária e datas em definição
                </p>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
                  Estamos fechando o calendário da primeira turma de {program.name}. Entre na lista
                  e avisamos assim que as inscrições abrirem.
                </p>
              </div>
              <ButtonLink
                href={`/contato?perfil=profissional&programa=${program.slug}`}
                variant="secondary"
                className="shrink-0"
                analyticsName="entrar_na_lista"
                analyticsLocation={`programa_${program.slug}`}
              >
                Entrar na lista
              </ButtonLink>
            </Card>
          </Reveal>
        )}
      </Section>

      {/* KEY VISUAL OFICIAL */}
      <Section tone="deep" className="overflow-hidden">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <Eyebrow>Identidade</Eyebrow>
            <Heading level={2} size="display-md" className="mt-5">
              {program.name} tem cara própria.
            </Heading>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              Cada metodologia Work Up Fit tem sua própria identidade visual — cor, energia e
              linguagem. É o que faz o aluno reconhecer a aula antes mesmo de entrar na sala, e o
              que dá à academia uma grade com marca.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageBlock
              src={program.keyVisual}
              alt={`Peça oficial da metodologia ${program.name} da Work Up Fit.`}
              ratio="portrait"
              scrim="none"
              position="center"
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="mx-auto w-full max-w-md border border-ink-600"
            />
          </Reveal>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="raised">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28">
            <Eyebrow>FAQ</Eyebrow>
            <Heading level={2} size="display-md" className="mt-5">
              Dúvidas sobre a certificação
            </Heading>
          </Reveal>
          <Reveal delay={0.08}>
            <FaqList faqs={faqs} openFirst />
          </Reveal>
        </div>
      </Section>

      {/* RELACIONADAS */}
      <Section>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Continue explorando</Eyebrow>
            <Heading level={2} size="display-md" className="mt-5">
              {related.length > 0 ? `Outras de ${familyLabels[program.family]}` : "Outras metodologias"}
            </Heading>
          </div>
          <ButtonLink href="/certificacoes" variant="secondary" analyticsName="ver_todas" analyticsLocation={`programa_${program.slug}`}>
            Ver todas
          </ButtonLink>
        </Reveal>

        <RevealGroup as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {suggestions.map((p) => (
            <RevealItem as="li" key={p.slug} className="h-full">
              <ProgramCard program={p} location={`programa_${program.slug}_relacionadas`} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </div>
  );
}
