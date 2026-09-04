# 3. Sitemap · 4. Wireframe da home · 6. Arquitetura de componentes · 7. Arquitetura técnica

## 3. Sitemap

### No ar agora

```
/                              Home
/quem-somos                    Sobre a Work Up Fit
/certificacoes                 Catálogo (filtro por frente de treino)
/certificacoes/[slug]          Página do programa  ×11, pré-renderizadas
/academias                     B2B — licenciamento (formulário próprio)
/agenda                        Formações e experiências (estado vazio honesto)
/faq                           Perguntas frequentes, agrupadas por público
/contato                       Contato com dois perfis (profissional / academia)
/blog                          Conteúdo (estado vazio até haver artigo)
/validar-certificado           Busca por código
/validar-certificado/[id]      Resultado público (noindex)
/politica-de-privacidade       LGPD
/termos-de-uso                 Termos
/sitemap.xml  /robots.txt  /opengraph-image  /icon.svg
```

### Preparado, não construído

`/login`, `/dashboard/{instrutor,aluno,academia}`, `/admin`, `/blog/[slug]`.
Nada no código impede essas rotas: o App Router isola por segmento, os dados já
estão fora dos componentes e não há estado global acoplado à camada pública.

---

## 4. Wireframe textual da home

```
┌ NAVBAR ─ sticky, transparente no topo, vidro fosco ao rolar ────────────────┐
│ [símbolo+wordmark]   Certificações · Como funciona · Para academias ·        │
│                      Agenda · Sobre            [ Quero me certificar ]      │
└─────────────────────────────────────────────────────────────────────────────┘

01 HERO ─────────────────────────────────────────────── 2 colunas 1.12 / 0.88
   ▸ pill: CERTIFICADORA BRASILEIRA DE METODOLOGIAS FITNESS
   ▸ H1  NINGUÉM TREINA SOZINHO. / NINGUÉM ENSINA SOZINHO.   (2ª linha em ciano)
   ▸ sub: "…onze metodologias de aula coletiva…"      ← carrega as keywords
   ▸ [Conheça as certificações]  [Quero fazer parte]
   ▸ 11 metodologias · 4 frentes de treino · BR       ← só números verificáveis
   ▸ (direita) mosaico 2×2: AEROBIC grande + DANCE + LIFE, flutuação sutil
   ▸ MARQUEE: os 11 nomes, cada um na sua cor, rolando infinito
     └─ o movimento literal da marca, feito com dado real

02 BRAND PROMISE ─ fundo elevado ────────────────────── 1 / 1.1
   MOVIMENTO QUE CONECTA.  │  "Exercício não precisa ser sobre performance."
                           │  Conexão · Pertencimento · Longevidade

03 ECOSSISTEMA ─────────────────────────────────────────── largura total
   NÃO VENDEMOS AULAS. FORMAMOS QUEM DÁ A AULA.
   Metodologia → Instrutor → Academia → Aluno → Comunidade   (5 cards + setas)

04 CERTIFICAÇÕES ─ fundo elevado ──────────────────────── grade 3 col
   ENCONTRE A METODOLOGIA QUE COMBINA COM VOCÊ.   [Ver as 11 metodologias]
   chips das 4 famílias com contagem
   6 ProgramCards (imagem / família / nome na cor / pilares / resumo / CTA)

05 COMO FUNCIONA ──────────────────────────────────────── 0.85 / 1.15
   CINCO PASSOS ATÉ DAR A SUA AULA.   │  timeline vertical 01→05

06 PARA QUEM É ─ fundo elevado ────────────────────────── 2 cards grandes
   DOIS CAMINHOS. O MESMO MÉTODO.
   [Profissional · azul]              [Academia · verde]
   imagem + 3 bullets + CTA           imagem + 3 bullets + CTA

07 COMUNIDADE ─ fundo mais escuro, sangra a largura toda
   VOCÊ FAZ PARTE DO MOVIMENTO.
   duas faixas de imagens derivando em sentidos opostos + parallax leve

08 EXPERIÊNCIAS ───────────────────────────────────────── imagem / texto
   PRESENCIAL ONDE O MÉTODO ACONTECE.   Presencial · Online · Masterclasses
   [Entrar na lista da próxima turma]   ← muda para "Ver agenda" quando houver

09 PARA ACADEMIAS ─ fundo escuro, brilho vermelho ─────── 1 / 1.05
   UMA GRADE NOVA SEM COMEÇAR DO ZERO.   6 cards de benefício
   [Quero levar a Work Up Fit para minha academia]  ← CTA vermelho, único no site

10 PROVA ─ fundo elevado ──────────────────────────────── 0.9 / 1.1
   UMA GRADE INTEIRA NUM SÓ MÉTODO.
   4 cards de família com contagem e os nomes em pílulas coloridas
   └─ substituído automaticamente por depoimentos reais quando existirem

11 FAQ ────────────────────────────────────────────────── 0.75 / 1.25
   6 perguntas em acordeão; as sem resposta definida mostram o estado honesto

12 CTA FINAL ─ marca-d'água gigante do símbolo ────────── centralizado
   SEU PRÓXIMO MOVIMENTO COMEÇA AQUI.
   [Conheça as certificações]  [Fale com a Work Up Fit]

┌ FOOTER ─────────────────────────────────────────────────────────────────────┐
│ logo + descrição   │ Certificações │ Para você │ Work Up Fit                │
│ (redes aparecem só quando houver URL real)                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Ritmo de fundo:** `base → raised → base → raised → base → raised → deep →
base → deep → raised → base → deep`. Nenhuma seção encosta noutra da mesma cor.

---

## 6. Arquitetura de componentes

```
src/components/
├─ ui/                    primitivas, sem conhecimento de domínio
│  ├─ Button.tsx          ButtonLink + Button · 4 variantes · dispara cta_click
│  ├─ Container.tsx       largura máxima e gutters, um só lugar
│  ├─ Section.tsx         ritmo vertical + tom de fundo (base/raised/deep)
│  ├─ Heading.tsx         níveis 1-4 × 4 tamanhos, itálico opcional
│  ├─ Eyebrow.tsx         rótulo de seção, herda --accent
│  ├─ Badge.tsx           pílula, 3 tons
│  ├─ Card.tsx            superfície padrão + estado interativo
│  ├─ ImageBlock.tsx      moldura editorial com scrim e proporção
│  └─ Reveal.tsx          Reveal / RevealGroup / RevealItem — TODO o scroll reveal
│
├─ brand/
│  ├─ Mark.tsx            símbolo vetorial, currentColor
│  └─ Logo.tsx            lockup símbolo + wordmark
│
├─ forms/
│  ├─ Field.tsx           TextField / TextArea / SelectField — label, erro, aria
│  └─ LeadForm.tsx        um formulário para os 3 casos (perfil como prop)
│
├─ layout/                Navbar (sticky + menu mobile) · Footer
├─ sections/              as 12 seções da home + PageHero + ContactPanel + LegalPage
│
├─ ProgramCard.tsx        card de programa (usado em 4 lugares)
├─ ProgramFilter.tsx      catálogo com filtro por família
├─ EventCard.tsx          card de evento da agenda
├─ Faq.tsx                acordeão acessível
├─ CertificateLookup.tsx  busca de certificado
├─ PageView.tsx           dispara page_view por rota
└─ MotionProvider.tsx     MotionConfig reducedMotion="user"
```

**Regra do accent.** `ProgramCard`, `EventCard` e a página do programa definem
`--accent` inline com a cor daquele programa. Nenhum componente tem variante por
programa: um card serve aos onze porque a cor entra por variável CSS.

---

## 7. Arquitetura técnica

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | Next.js 16 · App Router · Turbopack | Server Components por padrão, rotas estáticas, `generateStaticParams` para os 11 programas |
| Linguagem | TypeScript estrito | — |
| Estilo | Tailwind CSS v4 (`@theme` em CSS) | Tokens vivem em CSS, não num arquivo JS de config |
| Motion | `motion` (Framer Motion) | `MotionConfig reducedMotion="user"` global |
| Fontes | `next/font/google`, auto-hospedadas | Sem requisição a terceiros, sem FOIT |
| Imagens | `next/image`, AVIF + WebP | Um único preload (a imagem do LCP) |

### Separação conteúdo / apresentação

```
src/data/            ← tudo que um CMS vai substituir
  site.ts            identidade, contato, redes  (campos ainda nulos ficam nulos)
  programs.ts        os 11 programas + procedência de cada campo
  faqs.ts            perguntas; `answer: null` + `pending` quando não definido
  events.ts          agenda — vazia de propósito
  testimonials.ts    depoimentos — vazio de propósito
  posts.ts           artigos — vazio de propósito
  navigation.ts      menus
```

Nenhum componente traz conteúdo hardcoded. Plugar um CMS é trocar a origem
desses módulos — os componentes já lidam com lista vazia e campo nulo.

### Camadas de serviço (fachadas, sem backend ainda)

| Módulo | Hoje | Para ligar |
|---|---|---|
| `lib/analytics.ts` | `track()` empurra evento tipado para `window.dataLayer`; nenhum script carregado, nenhuma requisição | Adicionar GTM/GA4 no layout. As chamadas nos componentes não mudam. |
| `lib/leads.ts` | Sem endpoint → devolve `{ok:false, reason:"not-configured"}` e o formulário **avisa** que não enviou | `NEXT_PUBLIC_LEADS_ENDPOINT` |
| `lib/certificates.ts` | Sem registro → devolve `unavailable` (nunca `not-found`, que acusaria falsidade) | `NEXT_PUBLIC_CERTIFICATE_REGISTRY_ENDPOINT` |

### Eventos de analytics já instrumentados

`page_view` · `cta_click {cta_name, location, destination}` ·
`certification_view` · `certification_interest {program_slug, location}` ·
`academy_interest` · `contact_form_start {form_id}` ·
`contact_form_submit {form_id, status, profile}` · `schedule_view` ·
`event_click`

### SEO técnico

Canonical em todas as rotas · OG + Twitter card · `opengraph-image` gerada em
runtime com a fonte da marca embutida · `sitemap.xml` derivado dos dados (rotas
sem conteúdo não entram) · `robots.txt` bloqueando `/validar-certificado/` ·
hierarquia de headings validada nas 15 rotas × 3 larguras.

**Schema.org emitido:** `Organization`, `WebSite` (layout) · `BreadcrumbList`
(todas as internas) · `Course` (cada programa, só com campos conhecidos — sem
preço, sem carga horária) · `FAQPage` (**apenas** perguntas com resposta real).
`Event` e `Person` **não** são emitidos: não há dado para eles.
