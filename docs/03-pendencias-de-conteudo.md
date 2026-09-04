# Pendências de conteúdo

Este é o documento operacional do projeto. Ele lista **tudo que o site precisa
e ainda não tem**, e exatamente onde cada informação entra.

Regra que o código segue: **nada foi inventado**. Onde não havia dado real, o
site tem estrutura pronta e um estado explícito — nunca um número, uma data ou
um depoimento fabricado. Cada item abaixo está marcado com o arquivo a editar.

---

## 🔴 Bloqueia o go-live

### 1. Domínio
`src/data/site.ts` → `url` (ou a variável `NEXT_PUBLIC_SITE_URL`).
Hoje: `https://workupfit.com.br` como placeholder.
**Impacto:** canonical, `og:image` e `sitemap.xml` apontam para o domínio errado
até isso mudar.

### 2. Contato
`src/data/site.ts` → `contact.email`, `contact.whatsapp`, `contact.city`.
Hoje: `null`.
**Comportamento atual:** o bloco "Canais diretos" da página de contato
simplesmente não aparece, e o formulário, quando não consegue enviar, diz que os
canais ainda estão sendo finalizados. Nada quebra — mas o visitante fica sem
saída alternativa.

### 3. Destino dos leads
`NEXT_PUBLIC_LEADS_ENDPOINT` (ver `.env.example`).
Hoje: **os formulários não enviam nada** e dizem isso ao visitante, com todas as
letras: *"O envio automático ainda não está ativo."*
Opções: um Route Handler do próprio Next gravando no Supabase; um webhook do
n8n; ou a API de e-mail transacional. O contrato é um `POST` JSON com o tipo
`Lead` de `src/lib/leads.ts`.

---

## 🟡 O site funciona sem, mas fica mais fraco

### 4. Formato, carga horária e nível de cada certificação
`src/data/programs.ts` → campo `details` (hoje `null` nos onze).
```ts
details: { workloadHours: 16, format: "Presencial + online", level: "Básico" }
```
**Comportamento atual:** a página do programa mostra um bloco
*"Formato, carga horária e datas em definição"* com CTA para entrar na lista.
Assim que `details` for preenchido, esse bloco vira automaticamente três cards
com os dados. Nenhum componente precisa mudar.

### 5. Respostas de FAQ ainda em aberto
`src/data/faqs.ts` → cinco entradas com `answer: null`:
`online-presencial` · `duracao` · `avaliacao` · `investimento` · `onde`.
**Comportamento atual:** a pergunta aparece, a resposta mostra o texto de
`pending` e um link *"Quero ser avisado quando definir"*.
**Importante:** essas cinco **não** entram no `FAQPage` do Schema.org — só as
com resposta real são marcadas. Preencher `answer` já as inclui.

### 6. Agenda
`src/data/events.ts` → array `events`, hoje vazio.
**Comportamento atual:** a página `/agenda` mostra "as primeiras turmas estão
sendo montadas" + captura de lista de espera. O `EventCard` e a ordenação já
existem e assumem assim que o array tiver itens. Nenhum `Event` de Schema.org é
emitido enquanto estiver vazio.

### 7. Redes sociais
`src/data/site.ts` → `social.instagram`, `social.youtube`, `social.linkedin`.
**Comportamento atual:** os links do rodapé só são renderizados para redes com
URL. Nenhum link morto.

---

## 🟢 Enriquece quando existir

### 8. Depoimentos
`src/data/testimonials.ts`, hoje vazio.
**Comportamento atual:** a seção de prova social da home mostra a prova que a
marca **de fato** tem — a amplitude do catálogo. Assim que houver um depoimento
real, o componente troca sozinho para a grade de citações. O código dos dois
caminhos já está escrito e testado.

### 9. Blog
`src/data/posts.ts`, hoje vazio. A rota `/blog/[slug]` ainda não existe — criar
junto com o primeiro artigo. Enquanto vazio, `/blog` fica fora do `sitemap.xml`.

### 10. Registro de certificados
`NEXT_PUBLIC_CERTIFICATE_REGISTRY_ENDPOINT`.
**Comportamento atual:** `/validar-certificado/[código]` responde
*"a validação online ainda não está ativa"* — deliberadamente **não** responde
"certificado não encontrado", que daria a entender que o registro foi
consultado e o certificado é falso.

### 11. Logo vetorial
Não há SVG/AI/EPS do logo, nem versão para fundo claro. O wordmark em uso foi
extraído da peça oficial em maior resolução disponível (1080px) e o símbolo foi
redesenhado em vetor. Suficiente para web; **insuficiente para impressão.**

---

## Texto que precisa de validação do cliente

Escritos a partir do que a ilustração oficial mostra, sem nenhum claim sobre
preço, duração ou resultado. Ainda assim, é texto que fala pela marca:

- `programs.ts` → `summary` e `whatToExpect` dos onze programas.
- Blocos institucionais de `/quem-somos` e `/academias`.
- As respostas de FAQ marcadas como definidas.

Recomendação: revisar com quem desenhou as metodologias antes do go-live —
principalmente **Gap Core** e **Burn**, cujas descrições foram inferidas da
ilustração e podem não bater com a intenção técnica do programa.

---

## Checklist de go-live

- [ ] Domínio em `site.ts` (ou `NEXT_PUBLIC_SITE_URL`)
- [ ] E-mail e WhatsApp em `site.ts`
- [ ] `NEXT_PUBLIC_LEADS_ENDPOINT` apontando para destino real
- [ ] Enviar um lead de teste de cada formulário e confirmar a chegada
- [ ] GA4/GTM no layout (as chamadas `track()` já existem em todos os pontos)
- [ ] Revisão dos textos dos onze programas com a equipe técnica
- [ ] `details` das certificações que já estiverem fechadas
- [ ] Redes sociais em `site.ts`
- [ ] Cadastrar a propriedade no Google Search Console e enviar o sitemap
- [ ] Conferir o preview de compartilhamento (`/opengraph-image`) no WhatsApp
