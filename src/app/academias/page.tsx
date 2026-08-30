import { PageView } from "@/components/PageView";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { LeadForm } from "@/components/forms/LeadForm";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FaqList } from "@/components/Faq";
import { familyLabels, getProgram, programs, type ProgramFamily } from "@/data/programs";
import { faqsByTopic } from "@/data/faqs";
import { site } from "@/data/site";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { Card } from "@/components/ui/Card";

export const metadata = buildMetadata({
  title: "Para academias — licencie as metodologias Work Up Fit",
  description:
    "Leve as aulas coletivas Work Up Fit para a sua academia: onze metodologias prontas para a grade, aplicadas por instrutores certificados. Fale com a nossa equipe.",
  path: "/academias",
});

const how = [
  { n: "01", t: "Conversa inicial", b: "Entendemos a estrutura da unidade, o perfil dos alunos e a grade que você já tem." },
  { n: "02", t: "Seleção de metodologias", b: "Escolhemos juntos quais programas fazem sentido para o seu público e o seu espaço." },
  { n: "03", t: "Instrutores certificados", b: "Sua equipe se certifica na metodologia — ou conectamos você a instrutores já formados." },
  { n: "04", t: "Aula na grade", b: "A metodologia entra no quadro de horários com identidade, material e suporte contínuos." },
];

const order: ProgramFamily[] = ["cardio", "dance", "strength", "wellness"];

export default function AcademiasPage() {
  const hero = getProgram("bike")!;

  return (
    <div style={{ ["--accent" as string]: "#FC5454" } as React.CSSProperties}>
      <PageView title="Para academias" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: site.url },
            { "@type": "ListItem", position: 2, name: "Para academias", item: `${site.url}/academias` },
          ],
        }}
      />

      <PageHero
        eyebrow="Para academias"
        accent="#FC5454"
        crumbs={[{ label: "Início", href: "/" }, { label: "Para academias" }]}
        title={
          <>
            Leve uma nova experiência
            <span className="block text-[#FC5454]">de fitness para sua academia.</span>
          </>
        }
        lead="Onze metodologias de aula coletiva prontas para entrar na grade — com identidade própria, material de apoio e instrutores formados no método."
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ImageBlock
              src={hero.image}
              alt={hero.alt}
              ratio="landscape"
              priority
              sizes="(min-width: 1024px) 46vw, 92vw"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow className="text-[#FC5454]">Por que licenciar</Eyebrow>
            <Heading level={2} size="display-md" className="mt-5">
              Aula coletiva é o que faz o aluno voltar.
            </Heading>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              Uma turma cria vínculo que a sala de musculação sozinha não cria. O aluno marca o
              horário, reconhece as pessoas e volta pela experiência — não só pelo equipamento.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted">
              A Work Up Fit entrega essa experiência pronta: metodologia desenvolvida, identidade
              visual definida e formação para a sua equipe. Você não precisa criar um programa do
              zero nem depender de um professor específico para manter a aula viva.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="raised">
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-[#FC5454]">Como funciona a parceria</Eyebrow>
          <Heading level={2} size="display-md" className="mt-5">
            Da primeira conversa à aula na grade.
          </Heading>
        </Reveal>
        <RevealGroup as="ol" className="mt-12 grid gap-4 md:grid-cols-4" stagger={0.07}>
          {how.map((s) => (
            <RevealItem as="li" key={s.n}>
              <Card className="flex h-full flex-col rounded-lg p-5">
                <span className="font-display text-xs tracking-[0.2em] text-[#FC5454]">{s.n}</span>
                <h3 className="mt-2.5 font-display text-lg text-chalk">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.b}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <Reveal className="max-w-2xl">
          <Eyebrow className="text-[#FC5454]">O catálogo</Eyebrow>
          <Heading level={2} size="display-md" className="mt-5">
            Monte a grade que a sua unidade precisa.
          </Heading>
          <p className="mt-5 text-pretty leading-relaxed text-muted">
            Do cardio de alta intensidade ao trabalho de mobilidade e longevidade — programas para
            todos os horários e todos os perfis de aluno.
          </p>
        </Reveal>

        <RevealGroup as="ul" className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {order.map((family) => {
            const items = programs.filter((p) => p.family === family);
            return (
              <RevealItem as="li" key={family}>
                <Card className="h-full rounded-lg p-5" style={{ ["--accent" as string]: items[0].accentInk }}>
                  <h3 className="font-display text-lg text-chalk">{familyLabels[family]}</h3>
                  <ul className="mt-3.5 space-y-1.5">
                    {items.map((p) => (
                      <li key={p.slug} className="font-display-italic text-xl leading-none text-[var(--accent)]">
                        {p.name}
                      </li>
                    ))}
                  </ul>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <Section tone="deep" id="fale-conosco">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <Eyebrow className="text-[#FC5454]">Fale com a gente</Eyebrow>
            <Heading level={2} size="display-md" className="mt-5">
              Quero falar com a Work Up Fit.
            </Heading>
            <p className="mt-5 text-pretty leading-relaxed text-muted">
              Conte sobre a sua academia e a gente volta com uma proposta de grade — quais
              metodologias fazem sentido, como formar a equipe e por onde começar.
            </p>
            <div className="mt-9">
              <FaqList faqs={faqsByTopic("academia")} />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="p-6 md:p-8">
              <LeadForm
                profile="academia"
                formId="form-academia"
                source="/academias"
                submitLabel="Quero falar com a Work Up Fit"
              />
            </Card>
          </Reveal>
        </div>
      </Section>

      <FinalCta
        title={
          <>
            Sua grade pode
            <span className="block text-volt-400">começar este mês.</span>
          </>
        }
        body="Fale com a nossa equipe e descubra quais metodologias Work Up Fit combinam com o seu público."
        primary={{ label: "Falar com a Work Up Fit", href: "/academias#fale-conosco" }}
        secondary={{ label: "Ver as metodologias", href: "/certificacoes" }}
        location="academias_final"
      />
    </div>
  );
}
