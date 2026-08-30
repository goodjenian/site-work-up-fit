import { Suspense } from "react";
import { PageView } from "@/components/PageView";
import { PageHero } from "@/components/sections/PageHero";
import { CertificateLookup } from "@/components/CertificateLookup";
import { Section } from "@/components/ui/Section";
import { site } from "@/data/site";
import { buildMetadata, JsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Validar certificado — Work Up Fit",
  description:
    "Confira a autenticidade de uma certificação Work Up Fit. Informe o código do certificado para ver a metodologia, o profissional e a validade.",
  path: "/validar-certificado",
});

export default function ValidarCertificadoPage() {
  return (
    <>
      <PageView title="Validar certificado" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: site.url },
            {
              "@type": "ListItem",
              position: 2,
              name: "Validar certificado",
              item: `${site.url}/validar-certificado`,
            },
          ],
        }}
      />

      <PageHero
        eyebrow="Validação"
        crumbs={[{ label: "Início", href: "/" }, { label: "Validar certificado" }]}
        title={
          <>
            Validar um
            <span className="block text-volt-400">certificado Work Up Fit.</span>
          </>
        }
        lead="Toda certificação Work Up Fit tem um código único. Informe o código — ou leia o QR Code do certificado — para conferir a autenticidade."
      />

      <Section>
        {/* Reads `?codigo=` on the client, so it needs a boundary to prerender. */}
        <Suspense fallback={null}>
          <CertificateLookup />
        </Suspense>
      </Section>
    </>
  );
}
