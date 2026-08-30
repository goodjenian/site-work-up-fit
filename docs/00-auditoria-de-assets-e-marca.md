# 1. Auditoria de assets · 2. Análise de marca

## 1. Auditoria de assets

Pasta analisada: `~/Documents/GoodySEO clients/Work Up Fit/material visual work up fit`

**30 arquivos entregues → 23 únicos** (7 eram duplicatas byte a byte). Nenhum
arquivo original foi modificado; tudo foi copiado para `public/`.

| Tipo | Qtd | Formato | Uso no site |
|---|---|---|---|
| Ilustração limpa do programa | 11 | JPEG 1254×1254 | Cards, heros, mosaico da comunidade |
| Peça oficial com selo (nome + pilares) | 11 | JPEG 1080×1350 | Bloco "Identidade" da página do programa, `og:image` |
| Mockup do logo | 1 | JPEG 500×500 | Origem do wordmark e do símbolo |

### O que os assets revelaram

O material não era um "banco de fotos": era **o catálogo de produtos da marca**.
Cada peça traz, impresso, o nome do programa e os três pilares dele. Isso virou
a espinha dorsal do site — os onze programas são o único conteúdo 100% real que
existia, e o site inteiro foi construído em torno deles.

**Os 11 programas (dados verbatim das peças oficiais):**

| Programa | Pilares (verbatim) | Família | Cor da marca |
|---|---|---|---|
| Fight | Queima calórica · Força · Agilidade | Cardio | `#3CB4FC` |
| Bike | Queima calórica · Força · Energia | Cardio | `#0CC4E4` |
| Jump | Queima calórica · Força · Diversão | Cardio | `#0494B4` |
| Aerobic | Queima Calórica · Energia · Diversão | Ritmo | `#5474FC` |
| Burn | Queima de gordura · Desafios · Evolução física | Ritmo | `#044CAC` |
| Dance | Queima Calórica · Alegria · Diversão | Ritmo | `#5CE4E4` |
| Gap Core | Força · Resistência · Definição | Força | `#FC3434` |
| Lift | Força · Resistência · Definição | Força | `#FC5454` |
| Flex | Mobilidade · Flexibilidade · Relaxamento | Bem-estar | `#C4FC74` |
| Life | Saúde · Equilíbrio · Qualidade de vida | Bem-estar | `#04C464` |
| Pilates | Concentração · Força · Postura | Bem-estar | `#7CDC54` |

As cores foram **amostradas pixel a pixel** das barras de selo e dos títulos das
peças — não escolhidas por gosto. O script de amostragem está descrito abaixo em
"Como as cores foram extraídas".

### Estratégia de uso dos assets

| Contexto | Asset escolhido | Por quê |
|---|---|---|
| Hero da home | `aerobic.jpg` (grande) + `dance.jpg` e `life.jpg` (pequenos) | Grupo em movimento, expressão de alegria, e o trio cobre jovem + maduro — comunidade, não performance individual |
| Cards de certificação | Ilustração limpa, crop `object-top` | O topo das ilustrações concentra rostos e expressão |
| Mosaico da comunidade | As 11, em duas faixas com deriva oposta | Volume e variedade: mostra que é um ecossistema, não um curso |
| Para profissionais | `fight.jpg` | Energia alta, gesto técnico |
| Para academias | `life.jpg` / `bike.jpg` | Público amplo e equipamento — fala com gestor |
| Bloco "Identidade" | Peça oficial `*-kv.jpg` | Único lugar onde o selo aparece: é o produto sendo mostrado como produto |
| `og:image` do programa | Peça oficial `*-kv.jpg` | Já traz nome + marca, funciona sozinha no feed |

### Logo

O mockup 500×500 (`public/brand/logo-mockup.jpg`) é um render sobre parede de
tijolo, não um arquivo de logo — e é **o único arquivo dedicado à marca** em
todo o material. Nenhuma outra peça traz o logo maior: medido, o símbolo tem
181px de altura no mockup contra 189px nos key visuals, ou seja 4% — sem ganho
útil, e nos KVs ele ainda é uma marca-d'água desfocada.

**Símbolo — traçado, não redesenhado.** A primeira versão deste site reconstruiu
o símbolo por fórmula (três triângulos a 120°). Isso estava errado: medindo o
artwork, a sobreposição do símbolo consigo mesmo girado 120° dá **0,469**, e
espelhado dá **0,455**. Nenhuma das duas simetrias se sustenta — os três
triângulos têm tamanhos e ângulos próprios, desenho manual. Qualquer geometria
gerada seria *outro logo*. A versão atual é o contorno real, vetorizado a partir
do artwork:

1. o traço foi isolado do tijolo por contraste local (o fundo tem gradiente, um
   limiar global não funciona);
2. dos 8 componentes conexos, o símbolo é um só — as letras começam em x≥199 e
   ficaram de fora;
3. borda suavizada antes do traço, senão o ruído de JPEG vira centenas de nós.

**A espessura é uma decisão, não um acidente.** O traço desenhado tem 2px numa
marca de 181px — **1,1% da altura**. Isso é um fio: correto em tamanho grande,
invisível abaixo de ~48px. Por isso `<Mark weight={n} />` sobrepõe um `stroke` ao
mesmo `fill`: `weight={0}` é a espessura original (usada nas marcas-d'água
grandes), `weight={1.5}` no cabeçalho. Acima de ~3 o entrelaçamento fecha e a
forma vira mancha.

**Wordmark — vetorizado dos key visuals.** No mockup ele sofre com o render;
nos KVs é branco chapado sobre navy. Extraído por saturação (as letras são
brancas, o nome do programa é ciano) de `flex-kv.jpg`, o mais nítido dos onze.
Substitui o recorte raster anterior, que serrilhava acima de ~120px.

**Proporções do lockup**, medidas no mockup — a única peça com símbolo e
wordmark juntos: wordmark = **0,508 × a altura do símbolo**, folga = **0,033 ×**,
centrados na mesma linha. `Logo.tsx` deriva tudo de `--mark-h`, então a
assinatura mantém essas razões em qualquer tamanho. *(O lockup anterior usava
wordmark a 0,7× — visivelmente fora de proporção.)*

Arquivos:

| Arquivo | O que é |
| --- | --- |
| `public/brand/mark.svg` | Símbolo traçado, standalone |
| `public/brand/wordmark.svg` | Lettering vetorizado |
| `public/brand/logo-lockup.png` | Assinatura rasterizada dos vetores acima — existe porque o Google **não aceita SVG** no campo `logo` do schema `Organization` |
| `public/brand/logo-mockup.jpg` | Original do cliente, intocado — é a fonte do traço |
| `src/components/brand/mark-path.ts` | O path, com a procedência registrada |
| `src/components/brand/BrandSprite.tsx` | `<symbol>` renderizado uma vez por página |

O símbolo entra via `<use href="#wuf-mark">`. O path tem ~11KB e uma página
chega a mostrar a marca três vezes (cabeçalho, rodapé, marca-d'água): embutido
seriam ~33KB de HTML para uma forma só.

> **Faltas de asset registradas:**
> - Não há vetor original (SVG/AI/EPS). O traço veio de um JPEG de 500px — ótimo
>   para tela, **insuficiente para impressão**. As retas longas têm ondulação
>   herdada do original.
> - Não há versão para fundo claro.
> - **Cor do símbolo indefinida.** Nas duas fontes ele aparece mais apagado que o
>   wordmark, mas em ambas isso é tratamento da peça (fio de neon no mockup,
>   marca-d'água no KV) — não existe versão chapada que defina a intenção. O site
>   usa a mesma cor do wordmark, leitura padrão de logo monocromático. Vale
>   confirmar com o cliente.

---

## 2. Análise de marca

### O que os assets dizem

A identidade da Work Up Fit **já existe** e é bem definida:

- **Base escura.** Todas as onze peças se passam num estúdio de luz baixa com
  neon. O site é dark por fidelidade à marca, não por moda.
- **Cor codifica modalidade.** Azul/ciano = cardio. Violeta/magenta = ritmo.
  Vermelho = força. Verde = bem-estar. Esse é o sistema mais forte da marca e
  virou a espinha do design system (`--accent` por programa).
- **Ilustração, não fotografia.** Estilo semi-realista, saturado, com traço.
  Nenhuma foto stock foi usada — não havia necessidade e teria quebrado a
  linguagem.
- **Sempre grupo.** Não existe uma única peça com pessoa isolada. Sempre há
  turma, sempre há um rosto sorrindo no primeiro plano.
- **Diversidade real.** Idade (Life mostra público 60+), corpo, etnia e gênero
  variam de forma consistente entre as peças.
- **Wordmark itálico condensado pesado.** Inclinação para a frente = movimento.

### Direção definida

A estética dark/roxa da apresentação da GoodySEO **não** foi copiada. O roxo do
deck é da agência; o azul elétrico `#37B7FF` é da Work Up Fit — ele aparece nos
três programas de cardio, que são o carro-chefe visual do catálogo.

Tipografia: **Barlow Condensed 800** para display (é a família livre mais
próxima do wordmark — condensada, pesada, com itálico verdadeiro) e **Inter**
para texto corrido.

### Headline: três opções e a escolhida

1. **"Um novo jeito de viver, ensinar e experimentar o fitness."**
   *(sugerida no briefing)* — Descreve, mas não provoca. Serve para qualquer
   marca de fitness do mundo. Rejeitada.
2. **"Onze metodologias feitas para mover uma turma inteira."**
   Concreta e verdadeira, apoiada no dado real do catálogo. Mas soa a catálogo,
   não a convite. Rejeitada como H1 — o número virou prova social logo abaixo.
3. ✅ **"Ninguém treina sozinho. Ninguém ensina sozinho."**
   Escolhida. Diz a ideia central do briefing (conexão) em seis palavras, e a
   segunda frase vira o site inteiro para o público prioritário — o instrutor.
   O posicionamento factual entra na subheadline imediatamente abaixo, que é
   onde as palavras-chave de busca também precisam estar.

### Como as cores foram extraídas

Para cada peça oficial: a barra do selo foi isolada, a cor de fundo obtida pela
moda dos pixels da coluna esquerda, e a cor do título pela moda dos pixels
saturados da metade direita (descartando as franjas de antialiasing). Cada cor
foi então testada contra a superfície escura do site; só **Burn** (`#044CAC`,
2,36:1) reprovava em contraste e ganhou uma variante `accentInk` (`#1778FA`,
4,58:1) para uso em texto. As outras dez passam em AA na cor original.
