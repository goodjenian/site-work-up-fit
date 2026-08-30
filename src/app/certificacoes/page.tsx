import { ProgramFilter } from "@/components/ProgramFilter";
import { PageHero } from "@/components/sections/PageHero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageView } from "@/components/PageView";
import { Container } from "@/components/ui/Container";
import { programs } from "@/data/programs";
import { faqsByTopic } from "@/data/faqs";
import { site } from "@/data/site";
import { buildMetadata, JsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Certificações — as 11 metodologias Work Up Fit",
  description:
    "Conheça as onze metodologias de aula coletiva da Work Up Fit: Fight, Aerobic, Burn, Bike, Dance, Flex, Jump, Life, Gap Core, Pilates e Lift. Certificação para profissionais de Educação Física.",
  path: "/certificacoes",
});

export default function CertificacoesPage() {
  return (
    <>
      <PageView title="Certificações" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: site.url },
            {
              "@type": "ListItem",
              position: 2,
              name: "Certificações",
              item: `${site.url}/certificacoes`,
            },
          ],
        }}
      />

      <PageHero
        eyebrow="Certificações"
        crumbs={[{ label: "Início", href: "/" }, { label: "Certificações" }]}
        title={
          <>
            Onze metodologias.
            <span className="block text-volt-400">Uma turma inteira no mesmo ritmo.</span>
          </>
        }
        lead="Cada programa Work Up Fit é uma aula coletiva completa: estrutura, progressão, música e condução. Escolha por onde começar — ou monte uma grade inteira."
      />

      <section className="section-y bg-ink-900">
        <Container>
          <ProgramFilter programs={programs} />
        </Container>
      </section>

      <HowItWorks />
      <FaqSection faqs={faqsByTopic("certificacao")} tone="raised" />
      <FinalCta
        title={
          <>
            Escolheu a sua
            <span className="block text-volt-400">metodologia?</span>
          </>
        }
        body="Deixe seu contato e a gente te avisa quando a formação da metodologia que você escolheu abrir turma."
        primary={{ label: "Quero me certificar", href: "/contato?perfil=profissional" }}
        secondary={{ label: "Ver a agenda", href: "/agenda" }}
        location="certificacoes_final"
      />
    </>
  );
}
