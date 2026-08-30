import { Suspense } from "react";
import { PageView } from "@/components/PageView";
import { PageHero } from "@/components/sections/PageHero";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { Section } from "@/components/ui/Section";
import { site } from "@/data/site";
import { buildMetadata, JsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contato — Work Up Fit",
  description:
    "Fale com a Work Up Fit. Profissionais de Educação Física que querem se certificar e academias que querem licenciar as metodologias.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <PageView title="Contato" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: site.url },
            { "@type": "ListItem", position: 2, name: "Contato", item: `${site.url}/contato` },
          ],
        }}
      />

      <PageHero
        eyebrow="Contato"
        crumbs={[{ label: "Início", href: "/" }, { label: "Contato" }]}
        title={
          <>
            Vamos conversar
            <span className="block text-volt-400">sobre o seu próximo passo.</span>
          </>
        }
        lead="Escolha o seu perfil e conte o que você precisa. A gente responde com o que já está definido — e avisa quando o resto fechar."
      />

      <Section>
        <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
          <ContactPanel />
        </Suspense>
      </Section>
    </>
  );
}
