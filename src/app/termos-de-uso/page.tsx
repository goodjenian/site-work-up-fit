import { LegalPage } from "@/components/sections/LegalPage";
import { PageView } from "@/components/PageView";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Termos de uso",
  description: "Condições de uso do site da Work Up Fit.",
  path: "/termos-de-uso",
});

export default function TermosPage() {
  return (
    <>
      <PageView title="Termos de uso" />
      <LegalPage
        eyebrow="Legal"
        title="Termos de uso"
        intro={`Condições para o uso do site da ${site.name}.`}
      >
        <section>
          <h2>Objeto</h2>
          <p>
            Este site apresenta as metodologias de aula coletiva da {site.name}, o processo de
            certificação de instrutores e as possibilidades de parceria com academias. O acesso e a
            navegação implicam a aceitação destes termos.
          </p>
        </section>

        <section>
          <h2>Conteúdo informativo</h2>
          <p>
            As informações publicadas têm caráter informativo. Condições comerciais, carga horária,
            formato e datas de cada certificação são confirmados diretamente com a nossa equipe e
            formalizados no momento da contratação.
          </p>
        </section>

        <section>
          <h2>Propriedade intelectual</h2>
          <p>
            A marca {site.name}, os nomes das metodologias, os materiais visuais, os textos e a
            estrutura deste site são de titularidade da {site.legalName} e não podem ser
            reproduzidos, adaptados ou distribuídos sem autorização prévia por escrito.
          </p>
        </section>

        <section>
          <h2>Uso das metodologias</h2>
          <p>
            A aplicação de qualquer metodologia {site.name} em aulas depende de certificação válida
            do profissional e, no caso de academias, de licenciamento vigente. O uso não autorizado
            das metodologias é vedado.
          </p>
        </section>

        <section>
          <h2>Responsabilidade</h2>
          <p>
            Empenhamo-nos para manter as informações corretas e atualizadas, mas não garantimos a
            ausência de erros ou a disponibilidade ininterrupta do site. Links para sites de
            terceiros são oferecidos por conveniência e não implicam responsabilidade sobre o seu
            conteúdo.
          </p>
        </section>

        <section>
          <h2>Foro</h2>
          <p>
            Estes termos são regidos pela legislação brasileira. Fica eleito o foro da comarca da
            sede da {site.legalName} para dirimir eventuais controvérsias.
          </p>
        </section>
      </LegalPage>
    </>
  );
}
