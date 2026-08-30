import { PageView } from "@/components/PageView";
import { PageHero } from "@/components/sections/PageHero";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { getProgram, programs } from "@/data/programs";
import { site } from "@/data/site";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { ImageBlock } from "@/components/ui/ImageBlock";
import { Card } from "@/components/ui/Card";

export const metadata = buildMetadata({
  title: "Quem somos — Work Up Fit",
  description:
    "A Work Up Fit é uma certificadora brasileira de metodologias fitness coletivas. Conheça a nossa forma de entender o exercício em grupo: conexão, pertencimento e longevidade.",
  path: "/quem-somos",
});

const values = [
  {
    t: "Aula coletiva no centro",
    b: "Tudo o que fazemos nasce de uma pergunta: como fazer uma sala inteira se mover junto? Não somos uma plataforma de treino individual.",
  },
  {
    t: "Método brasileiro",
    b: "Metodologia pensada aqui, com a linguagem e a realidade das academias brasileiras. Sem tradução de material importado.",
  },
  {
    t: "O instrutor no comando",
    b: "A tecnologia ajuda, mas quem conduz a turma é gente. Formamos profissionais — não substituímos ninguém por um vídeo.",
  },
  {
    t: "Movimento para a vida inteira",
    b: "Do treino de alta intensidade ao trabalho de mobilidade e equilíbrio. Fitness que continua fazendo sentido aos 60.",
  },
];

export default function QuemSomosPage() {
  const a = getProgram("dance")!;
  const b = getProgram("life")!;

  return (
    <>
      <PageView title="Quem somos" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: site.url },
            { "@type": "ListItem", position: 2, name: "Quem somos", item: `${site.url}/quem-somos` },
          ],
        }}
      />

      <PageHero
        eyebrow="Quem somos"
        crumbs={[{ label: "Início", href: "/" }, { label: "Quem somos" }]}
        title={
          <>
            O exercício em grupo
            <span className="block text-volt-400">é um encontro.</span>
          </>
        }
        lead="A Work Up Fit nasceu de uma convicção simples: treinar junto muda o treino. E quem faz esse encontro acontecer é o instrutor à frente da turma."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
          <Reveal>
            <Heading level={2} size="display-md">
              Uma certificadora, não uma academia.
            </Heading>
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted">
              <p>
                A Work Up Fit desenvolve metodologias de aula coletiva, forma os profissionais de
                Educação Física que as aplicam e licencia esses programas para academias. Somos a
                camada de método que roda dentro da unidade — não a unidade.
              </p>
              <p>
                São onze programas, divididos em quatro frentes de treino, cobrindo do cardio de
                alta intensidade ao trabalho de mobilidade e longevidade. Cada um com estrutura de
                aula, progressão, identidade visual e formação próprias.
              </p>
              <p>
                O que une todos eles é a mesma ideia: o exercício como forma de conexão. Uma turma
                que se reconhece, um instrutor que conduz, e a sensação — rara e específica — de
                fazer parte de algo.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <ImageBlock src={a.image} alt={a.alt} ratio="portrait" scrim="none" className="rounded-lg" sizes="(min-width:1024px) 22vw, 45vw" />
            <ImageBlock src={b.image} alt={b.alt} ratio="portrait" scrim="none" className="mt-10 rounded-lg" sizes="(min-width:1024px) 22vw, 45vw" />
          </Reveal>
        </div>
      </Section>

      <Section tone="raised">
        <Reveal className="max-w-2xl">
          <Eyebrow>No que acreditamos</Eyebrow>
          <Heading level={2} size="display-md" className="mt-5">
            Quatro convicções que sustentam o método.
          </Heading>
        </Reveal>
        <RevealGroup as="ul" className="mt-12 grid gap-4 sm:grid-cols-2" stagger={0.07}>
          {values.map((v) => (
            <RevealItem as="li" key={v.t}>
              <Card className="h-full rounded-lg p-6">
                <div className="h-0.5 w-9 bg-volt-400" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl text-chalk">{v.t}</h3>
                <p className="mt-2.5 text-pretty leading-relaxed text-muted">{v.b}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Ecosystem />

      <Section tone="deep">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">O catálogo</Eyebrow>
          <Heading level={2} size="display-md" className="mt-5">
            Onze metodologias, uma marca.
          </Heading>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-3">
            {programs.map((p) => (
              <li
                key={p.slug}
                className="font-display-italic text-3xl leading-none md:text-4xl"
                style={{ color: p.accentInk }}
              >
                {p.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <FinalCta />
    </>
  );
}
