import { PageView } from "@/components/PageView";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { FaqList } from "@/components/Faq";
import { answeredFaqs, faqsByTopic } from "@/data/faqs";
import { site } from "@/data/site";
import { buildMetadata, JsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Perguntas frequentes — Work Up Fit",
  description:
    "Como funciona a certificação Work Up Fit, quem pode se certificar, quais metodologias existem e como uma academia se torna parceira.",
  path: "/faq",
});

const groups = [
  { id: "geral", title: "Sobre a Work Up Fit", topic: "geral" as const },
  { id: "certificacao", title: "Sobre a certificação", topic: "certificacao" as const },
  { id: "academia", title: "Para academias", topic: "academia" as const },
];

export default function FaqPage() {
  return (
    <>
      <PageView title="FAQ" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Início", item: site.url },
                { "@type": "ListItem", position: 2, name: "FAQ", item: `${site.url}/faq` },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: answeredFaqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ],
        }}
      />

      <PageHero
        eyebrow="FAQ"
        crumbs={[{ label: "Início", href: "/" }, { label: "FAQ" }]}
        title={
          <>
            Perguntas
            <span className="block text-volt-400">frequentes.</span>
          </>
        }
        lead="O que já está definido, respondemos aqui. O que ainda está em definição, dizemos com todas as letras — e avisamos você assim que fechar."
      />

      <Section>
        <div className="flex flex-col gap-14 md:gap-18">
          {groups.map((g) => (
            <Reveal key={g.id}>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:gap-14">
                <Heading level={2} size="display-sm" id={g.id}>
                  {g.title}
                </Heading>
                <FaqList faqs={faqsByTopic(g.topic)} />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCta
        title={
          <>
            Ficou com
            <span className="block text-volt-400">alguma dúvida?</span>
          </>
        }
        body="Fale direto com a nossa equipe. Respondemos o que der para responder hoje — e avisamos quando o resto estiver definido."
        primary={{ label: "Falar com a Work Up Fit", href: "/contato" }}
        secondary={{ label: "Ver as certificações", href: "/certificacoes" }}
        location="faq_final"
      />
    </>
  );
}
