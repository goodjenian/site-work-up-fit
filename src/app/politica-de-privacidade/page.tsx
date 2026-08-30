import { LegalPage } from "@/components/sections/LegalPage";
import { PageView } from "@/components/PageView";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Política de privacidade",
  description:
    "Como a Work Up Fit trata os dados pessoais informados no site, em conformidade com a LGPD.",
  path: "/politica-de-privacidade",
});

export default function PoliticaPage() {
  return (
    <>
      <PageView title="Política de privacidade" />
      <LegalPage
        eyebrow="Legal"
        title="Política de privacidade"
        intro="Como tratamos os dados que você informa neste site, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)."
      >
        <section>
          <h2>Quais dados coletamos</h2>
          <p>
            Coletamos apenas os dados que você informa voluntariamente nos formulários deste site:
            nome, e-mail e, quando preenchidos, WhatsApp, cidade, nome da academia, número de
            unidades, metodologia de interesse e a mensagem enviada.
          </p>
          <p>
            Também podem ser coletados dados técnicos de navegação (páginas visitadas, origem do
            acesso e tipo de dispositivo) por ferramentas de medição de audiência, sempre de forma
            agregada.
          </p>
        </section>

        <section>
          <h2>Para que usamos</h2>
          <ul>
            <li>Responder ao contato que você iniciou;</li>
            <li>Informar sobre turmas, formações e novidades das metodologias;</li>
            <li>Entender como o site é usado e melhorá-lo.</li>
          </ul>
          <p>Não vendemos, alugamos nem cedemos seus dados a terceiros para fins comerciais.</p>
        </section>

        <section>
          <h2>Por quanto tempo guardamos</h2>
          <p>
            Mantemos seus dados enquanto durar a relação de contato ou até que você solicite a
            exclusão. Registros necessários ao cumprimento de obrigações legais são mantidos pelos
            prazos exigidos em lei.
          </p>
        </section>

        <section>
          <h2>Seus direitos</h2>
          <p>
            A LGPD garante a você o direito de confirmar a existência de tratamento, acessar,
            corrigir, anonimizar, portar ou excluir seus dados, além de revogar o consentimento a
            qualquer momento.
          </p>
          <p>
            {site.contact.email
              ? `Para exercer qualquer um desses direitos, escreva para ${site.contact.email}.`
              : "Para exercer qualquer um desses direitos, use o formulário da página de contato — o canal dedicado de privacidade será publicado aqui assim que estiver ativo."}
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            Este site utiliza apenas os cookies necessários ao seu funcionamento. Caso ferramentas
            de medição de audiência sejam ativadas, esta política será atualizada com a descrição
            de cada uma delas antes da coleta.
          </p>
        </section>

        <section>
          <h2>Alterações</h2>
          <p>
            Esta política pode ser atualizada. A versão vigente é sempre a publicada nesta página.
          </p>
        </section>
      </LegalPage>
    </>
  );
}
