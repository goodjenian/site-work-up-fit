# Handoff — área do aluno (backend / backoffice)

Documento para quem vai construir a área logada. Escrito em 04/09/2026, contra
o commit em que o site institucional foi dado por pronto.

---

## Antes de tudo: a decisão que trava o resto

**Este site não tem servidor.** `next.config.ts` declara `output: "export"`: o
build gera HTML, CSS, JS e imagens numa pasta, e o GitHub Pages serve arquivos.
Não existe processo Node no ar.

Na prática, o que hoje é **impossível** sem mudar o alvo de publicação:

- `app/api/*/route.ts` — route handlers não são exportados
- Server Actions (`"use server"`)
- `middleware.ts` (é onde normalmente mora a proteção de rota)
- Qualquer leitura de segredo no servidor: num export estático, só variáveis
  `NEXT_PUBLIC_*` existem, e **elas vão embutidas no JS que o visitante baixa**

Uma área do aluno precisa de sessão, banco e autorização. Nenhuma das três cabe
aí. Então o primeiro item do backlog não é código, é **escolher a arquitetura**.

### As três saídas

| | Como fica | Ganha | Custa |
|---|---|---|---|
| **A. Tirar o export** | Remove `output: "export"`, publica em Vercel/Node. O institucional continua estático (SSG); a área do aluno usa route handlers, middleware e Server Actions | Um repositório, um design system, auth de verdade no servidor | Sai do GitHub Pages: precisa de host e de domínio apontado |
| **B. Backend separado** | O site fica onde está. A área do aluno vira app próprio em `aluno.workupfit.com.br`, com a stack que o dev quiser | Risco zero para o que já está no ar; times independentes | Duplica layout, tokens e componentes — e eles vão divergir |
| **C. Estático + BaaS** | Continua export estático; auth e dados via SDK do Supabase/Firebase direto do navegador | Sobe rápido, sem servidor para manter | Toda autorização vira RLS. Backoffice (ver dados de outros alunos) fica frágil e fácil de errar |

**Recomendação: A**, se a área do aluno é parte do produto — que é o que
"interface interna" sugere. Ela é a única em que uma regra de acesso roda onde o
aluno não alcança. **B** é a escolha certa se a prioridade for não encostar no
que já está publicado.

Se for **A**, três coisas do repo deixam de fazer sentido e devem sair juntas:

1. `basePath` (existe porque o Pages serve de subpasta) → `NEXT_PUBLIC_BASE_PATH` vazio
2. O loader de imagem customizado em `image-loader.ts` e o pré-processamento em
   `scripts/optimize-images.mjs` → volta o otimizador nativo do Next
3. `trailingSlash: true` (existe porque host estático serve `/rota/index.html`)

Elas estão documentadas em `README.md § O que o export estático custou`.

---

## O que está no repositório

Confirmado por **clone limpo + `npm ci` + build do zero**: 129 arquivos
versionados, `tsc` e `eslint` limpos, e o HTML gerado é idêntico ao do ambiente
de desenvolvimento (só mudam os hashes de build). Não há passo manual escondido.

```bash
git clone https://github.com/goodjenian/site-work-up-fit.git
npm ci
NEXT_PUBLIC_BASE_PATH=/site-work-up-fit \
NEXT_PUBLIC_SITE_URL=https://goodjenian.github.io/site-work-up-fit \
npm run build
```

`main` guarda o código. `gh-pages` guarda o `out/` publicado — é branch de
artefato, **não versione trabalho nela**.

## O que NÃO está, e por quê

| O quê | Onde está | Ação |
|---|---|---|
| Valores reais de `.env` | Em lugar nenhum. `.env.example` documenta os nomes | Preencher ao escolher a arquitetura |
| `public/programs/_opt/` (143 WebP) | Gerado no `prebuild` | Nada — é derivado |
| Workflow de deploy automático | `docs/deploy-workflow.yml`, **não** em `.github/workflows/` | O token usado não tinha escopo `workflow`. Ligar com `gh auth refresh -s workflow` e `git mv` |
| Material visual original do cliente | Fora do repo, na pasta do cliente | As 22 peças usadas já estão em `public/programs/` |
| Vetor de impressão do logo | Não existe | O traço veio de um JPEG de 500 px. Serve para tela, não para gráfica |
| `docs/04-escopo-hero.html` | Local, não versionado | 256 KB de imagem em base64. Commitar só se quiser o histórico da decisão |

---

## As costuras já prontas

Três serviços foram escritos como fachada justamente para o backend entrar sem
tocar em componente nenhum. Nenhum deles finge sucesso quando não está
configurado — essa é a regra do projeto, não um detalhe.

| Arquivo | Hoje | Ligar com |
|---|---|---|
| `src/lib/leads.ts` | Devolve `{ok:false, reason:"not-configured"}` e o formulário avisa o visitante | `NEXT_PUBLIC_LEADS_ENDPOINT`, ou trocar o transporte por route handler |
| `src/lib/certificates.ts` | Devolve `unavailable` — nunca `not-found`, que acusaria falsidade sem ter checado | `NEXT_PUBLIC_CERTIFICATE_REGISTRY_ENDPOINT` |
| `src/lib/analytics.ts` | Pontos de evento instrumentados, sem provedor | Plugar o provedor; nenhum componente muda |

> **Atenção ao prefixo.** Num export estático toda variável lida no navegador
> precisa de `NEXT_PUBLIC_`. Se a área do aluno virar servidor (opção A), o
> endpoint do registro de certificados **deve** perder esse prefixo e passar a
> ser lido no servidor — hoje ele vai embutido no JS público.

A validação de certificado usa `?codigo=` em vez de rota dinâmica porque um
export estático não gera páginas para IDs que não existem em build. Com
servidor, isso pode voltar a ser `/validar-certificado/[id]`.

---

## O que não pode ser quebrado

Estas não são preferências de estilo; são as travas que o projeto inteiro
respeita e que uma área logada tende a atropelar.

1. **Nada de dado inventado.** Sem número de alunos, de instrutores, de
   academias, sem depoimento, certificação, preço, carga horária ou parceiro que
   não tenha sido confirmado pelo cliente. `testimonials` e `posts` são arrays
   **vazios** de propósito, e `details` é `null` nas 11 metodologias. Componente
   que recebe `null` **omite o bloco** — nunca preenche.
2. **Formulário não mente.** Sem endpoint, ele diz que não enviou e oferece um
   caminho que funciona.
3. **Schema.org só com conteúdo correspondente.** Não marcar o que não existe.
4. **`tailwind-merge` precisa conhecer escalas de tipo novas.** Se você criar um
   `text-*` novo e não registrar no grupo `font-size` de `src/lib/utils.ts`, a
   classe é **descartada em silêncio** e o tamanho volta ao padrão, sem erro.
5. **`.nojekyll` não é opcional** enquanto o deploy for por branch. Sem ele o
   Jekyll do Pages descarta `_next/` e o site sobe sem CSS. Já aconteceu. Hoje
   `scripts/postbuild.mjs` cria o arquivo — não remova.
6. **`src/components/brand/mark-wire.ts` é gerado.** Editar a marca exige rodar
   `node scripts/sample-mark-wire.mjs`, não editar o arquivo à mão.

---

## Pendências de conteúdo que vão aparecer

Estão detalhadas em `docs/03-pendencias-de-conteudo.md`. O resumo, medido hoje:

- **11 de 11** metodologias sem `details` (carga horária, formato, nível)
- **5** perguntas do FAQ com `answer: null`
- **0** eventos na agenda, **0** depoimentos, **0** posts no blog
- Domínio definitivo, e-mail e WhatsApp de contato, URLs de redes sociais
- Cor do símbolo indefinida (nas duas peças originais ele aparece mais apagado
  que o lettering, mas em ambas isso é tratamento da peça)

Nada disso bloqueia o começo do backend, mas metade vira campo de cadastro no
backoffice — vale ler antes de modelar as tabelas.

---

## Primeiro dia sugerido

1. Ler `README.md`, depois `docs/01-arquitetura.md`
2. Rodar o build do clone limpo (comando acima) e abrir `out/` num servidor local
3. **Decidir A, B ou C** — nada de banco ou tela antes disso
4. Se A: tirar `output: "export"`, `basePath`, o loader customizado e
   `trailingSlash` num commit só, e reconfirmar que o site continua igual
5. Ligar o deploy automático (`docs/deploy-workflow.yml`) ou substituí-lo pelo
   pipeline do novo host

---

**No ar:** https://goodjenian.github.io/site-work-up-fit/
**Repositório:** https://github.com/goodjenian/site-work-up-fit
