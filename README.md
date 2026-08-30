# Work Up Fit — site institucional

Site público da Work Up Fit, certificadora brasileira de metodologias fitness
coletivas. Next.js 16 · TypeScript · Tailwind CSS v4 · Motion.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm run start
npx tsc --noEmit     # checagem de tipos
```

## Documentação

| Documento | Conteúdo |
|---|---|
| [`docs/00-auditoria-de-assets-e-marca.md`](docs/00-auditoria-de-assets-e-marca.md) | Auditoria dos 23 assets, análise da identidade, extração das cores, as 3 opções de headline |
| [`docs/01-arquitetura.md`](docs/01-arquitetura.md) | Sitemap, wireframe da home, arquitetura de componentes e técnica |
| [`docs/02-design-tokens.md`](docs/02-design-tokens.md) | Cor, tipografia, espaço, sombra, motion |
| [`docs/03-pendencias-de-conteudo.md`](docs/03-pendencias-de-conteudo.md) | **O que falta e onde entra.** Checklist de go-live |

## A regra que rege este repositório

**Nada é inventado.** Preço, carga horária, data, depoimento, número de alunos,
academia parceira — nada disso foi supplied, e nada disso aparece no site.

Onde falta dado, existe estrutura pronta e um estado explícito:

- Sem agenda → `/agenda` diz que as turmas estão sendo montadas e captura lista.
- Sem depoimento → a prova social mostra a amplitude do catálogo, que é real.
- Sem carga horária → o programa diz "em definição" e oferece a lista de espera.
- Sem endpoint de lead → o formulário **avisa que não enviou**. Não finge.
- Sem registro de certificados → a validação diz que ainda não está ativa; não
  responde "não encontrado", que acusaria falsidade sem ter consultado nada.

Cada um desses caminhos tem o código do caso "com dado" já escrito. Preencher
`src/data/*` liga tudo sem tocar em componente.

## Estrutura

```
src/
├─ app/               rotas (App Router) · sitemap · robots · icon · opengraph-image
├─ components/
│  ├─ ui/             primitivas do design system
│  ├─ brand/          Mark (símbolo vetorial) e Logo
│  ├─ forms/          campos acessíveis e LeadForm
│  ├─ layout/         Navbar e Footer
│  └─ sections/       seções de página
├─ data/              ← todo o conteúdo. É isto que um CMS vai substituir
└─ lib/               utils, analytics, leads, certificados, SEO, hooks
public/
├─ programs/          11 ilustrações + 11 peças oficiais com selo
└─ brand/             wordmark, símbolo, mockup original
```

## Onde mexer

| Quero… | Arquivo |
|---|---|
| Corrigir texto de um programa | `src/data/programs.ts` |
| Adicionar uma certificação | `src/data/programs.ts` + imagem em `public/programs/` |
| Publicar a agenda | `src/data/events.ts` |
| Responder uma FAQ pendente | `src/data/faqs.ts` (troque `answer: null`) |
| Publicar depoimentos | `src/data/testimonials.ts` |
| Contato, domínio, redes | `src/data/site.ts` |
| Ajustar cor ou tipografia | `src/app/globals.css`, bloco `@theme` |

## Duas armadilhas conhecidas

**1. `tailwind-merge` e tokens de tamanho.** Ele não sabe que
`text-display-lg` é tamanho e não cor, e descarta a classe quando ela vem junto
de `text-chalk`. A escala está declarada em `src/lib/utils.ts`. **Qualquer token
novo `text-*` que não seja cor precisa entrar lá** — senão some sem erro.

**2. `useReducedMotion()` e hidratação.** O hook devolve `null` no servidor.
Ramificar JSX nele faz o servidor renderizar `opacity: 0`, o cliente renderizar
sem, e o React manter o HTML do servidor — seções inteiras ficam invisíveis, sem
erro no console. Movimento reduzido é tratado **em CSS** (`[data-reveal]` em
`globals.css`) e por `MotionConfig reducedMotion="user"`. Para movimento
decorativo que pode simplesmente não existir, use `useMotionAllowed()`, que é
`false` no servidor e no primeiro render do cliente.

## Verificações feitas

- Build de produção limpo · `tsc --noEmit` limpo
- 15 rotas × 3 larguras (390 / 768 / 1440): sem overflow horizontal, hierarquia
  de headings correta, todo `<img>` com alt, todo campo com label, um `<h1>` por
  página, canonical e meta description presentes
- LCP 128–1500 ms e CLS 0 em todas as rotas medidas (mobile, CPU 4× lento)
- Menu mobile, validação de formulário, acordeão de FAQ e filtro do catálogo
  testados por automação de browser
