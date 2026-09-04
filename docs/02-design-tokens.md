# 5. Design tokens

Definidos em `src/app/globals.css`, bloco `@theme`. Tailwind v4 gera as
utilities a partir deles — não há arquivo de config em JS.

## Cor

### Superfícies
| Token | Hex | Uso |
|---|---|---|
| `ink-950` | `#05080F` | Fundo mais profundo (hero, CTA final, comunidade) |
| `ink-900` | `#070B14` | Fundo padrão da página |
| `ink-850` | `#0B1120` | Seções alternadas ("raised") |
| `ink-800` | `#0E1626` | Superfície de card |
| `ink-700` | `#141F33` | Card em hover |
| `ink-600` | `#1E2A44` | Borda |
| `ink-500` | `#2A3A5C` | Borda forte |

### Texto — contraste medido sobre `ink-850`
| Token | Hex | Contraste |
|---|---|---|
| `chalk` | `#F5F8FF` | 18,8:1 |
| `chalk-dim` | `#C8D3E6` | 12,4:1 |
| `muted` | `#93A3BF` | 7,4:1 |

### Primária — amostrada das peças Fight e Bike
| Token | Hex |
|---|---|
| `volt-300` | `#7FD2FF` |
| `volt-400` | `#37B7FF` ← **primária da marca** |
| `volt-500` | `#0FA5F0` |
| `volt-600` | `#0B84C4` |
| `cyan-400` | `#0CC4E4` |

### Famílias de programa
| Token | Hex | Programas |
|---|---|---|
| `fam-cardio` | `#37B7FF` | Fight · Bike · Jump |
| `fam-dance` | `#5474FC` | Aerobic · Burn · Dance |
| `fam-strength` | `#FC3434` | Gap Core · Lift |
| `fam-wellness` | `#04C464` | Flex · Life · Pilates |

### Estado
`success #04C464` · `warning #F5A524` · `danger #FC5454`

### `--accent`
Variável de tema definida **inline** por programa. Um `ProgramCard` serve aos
onze porque a cor entra por variável, não por variante de componente. Cada
programa expõe dois valores: `accent` (a cor da marca, verdade da peça) e
`accentInk` (a mesma cor ajustada para atingir AA 4,5:1 em texto — só Burn
precisou divergir).

## Tipografia

| Papel | Família | Peso |
|---|---|---|
| Display | Barlow Condensed | 800, normal e itálico |
| Texto | Inter | variável |

`.font-display` e `.font-display-italic` já aplicam caixa alta e o peso 800 —
são as duas únicas portas para a fonte de display.

| Token | clamp | Uso |
|---|---|---|
| `text-display-xl` | `clamp(2.5rem, 5.2vw, 4.75rem)` | H1 da home |
| `text-display-lg` | `clamp(2.1rem, 4.2vw, 3.5rem)` | H1 interno, H2 de seção |
| `text-display-md` | `clamp(1.8rem, 3.2vw, 2.6rem)` | H2 secundário |
| `text-display-sm` | `clamp(1.45rem, 2.4vw, 2rem)` | H2/H3 em card |

> **Armadilha resolvida:** `tailwind-merge` não sabe que `text-display-lg` é
> tamanho e não cor, e descartava a classe quando ela vinha junto de
> `text-chalk`. `src/lib/utils.ts` declara essa escala no grupo `font-size`.
> Qualquer token novo `text-*` que não seja cor **precisa** entrar lá.

## Raio · Espaço · Sombra · Motion

**Raio:** `xs 6` · `sm 10` · `md 14` · `lg 20` · `xl 28` · `2xl 36` (px)

**Espaço:** escala de 4px do Tailwind. Ritmo de seção via `section-y`
(`clamp(4rem, 9vw, 7.5rem)`). Largura via `container-wuf` (máx. `78rem`,
gutter 1,25rem → 2rem em ≥768px).

**Sombra:** `--shadow-card` · `--shadow-lift` (hover) · `--shadow-volt` (brilho
do CTA primário).

**Motion:** `--ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1)`. Entrada 0,65s,
stagger 0,06–0,09s, hover 0,2–0,3s, zoom de imagem 0,7s.

## Botões e cards

| Variante | Aparência |
|---|---|
| `primary` | Fundo `volt-400`, texto `ink-950`, brilho ciano |
| `accent` | Fundo `var(--accent)` — assume a cor do programa |
| `secondary` | Borda `ink-500`, fundo translúcido, vidro fosco |
| `ghost` | Sem fundo até o hover |

Tamanhos: `sm` 36px · `md` 44px · `lg` 52px. Todos com raio total (pill).

Card: `ink-800` + borda `ink-600` + `--shadow-card`; no hover sobe 4–6px, a
borda mistura 45–50% do `--accent` e a sombra vira `--shadow-lift`.

## Tratamento de imagem

`object-cover` com `object-top` (os rostos estão no topo das ilustrações),
scrim `from-ink-950/75` para o texto sobrepor com contraste, raio `lg`/`xl`, e
zoom de 6% no hover dos cards.

## Movimento reduzido

Sob `prefers-reduced-motion: reduce`:
`[data-reveal] { opacity: 1 !important; transform: none !important }` e
`[data-hover-zoom] { transform: none !important }`.

> **Por que em CSS e não em JS:** `useReducedMotion()` devolve `null` no
> servidor. Ramificar o JSX nele fazia o servidor renderizar `opacity: 0` e o
> cliente renderizar sem — o React mantinha o HTML do servidor e **seções
> inteiras ficavam invisíveis**. A regra CSS não tem como dessincronizar.

---

## Registro editorial (adaptado da Les Mills)

O layout foi adaptado a partir de `lesmills.com/br`, a pedido do cliente. O que
foi tomado emprestado é **linguagem de layout**, não marca:

| Adotado | Recusado |
| --- | --- |
| Hero full-bleed com título gigante e links sublinhados | O verde ácido — o azul `volt-400` é amostrado do artwork da Work Up Fit |
| Canvas preto quase uniforme (`--color-void`) | A tipografia, as fotos e os textos da referência |
| Dois registros de heading: `display` × `calm` | O carrossel de depoimentos |
| Grade escalonada, card sem moldura, índice tipográfico | A faixa de alcance (22k academias, 100 países, 100k instrutores) |

### Os dois registros

`Heading` tem `tone="display"` (condensada, caixa-alta — a voz do wordmark) e
`tone="calm"` (fonte de texto, caixa baixa, grande). A alternância é o efeito:
tudo no registro alto vira ruído e não sobra onde pousar. Hero, nomes de
programa e números são `display`; abertura de seção é `calm`.

### A faixa de números tem TRÊS

E não quatro, como na referência. A Work Up Fit não emitiu nenhuma certificação
ainda: não há academias, países, instrutores nem anos para contar. Os três
fatos que existem são 11 metodologias, 4 frentes e origem BR. Um quarto card
teria de ser inventado — por isso `StatsBand` tem três, e o comentário no
arquivo diz o porquê para que ninguém "complete" a grade depois.

### Armadilha ao mexer na escala

`--text-hero`, `--text-index`, `--text-stat`, `--text-calm-*` precisam estar
declaradas em `src/lib/utils.ts` no grupo `font-size` do `tailwind-merge`.
Sem isso ele trata `text-hero text-chalk` como duas cores concorrentes e
**descarta o tamanho em silêncio** — o heading renderiza no tamanho padrão sem
nenhum erro. Já aconteceu com `text-display-*`.

---

## A abertura: símbolo em arame, sem fotografia

A home não abre mais com uma ilustração em tela cheia. O acervo da marca são 22
peças geradas por IA; exibidas a ~3× o tamanho do arquivo, elas comunicam *aula
de ginástica*, não *certificadora* — e o teto de credibilidade da abertura era o
teto dessa imagem. As ilustrações continuam no site, contidas e legendadas nos
cards e nas páginas de metodologia, que é onde funcionam.

No lugar delas entrou a identidade:

| Camada | O quê | Onde |
| --- | --- | --- |
| Campo | Três gradientes radiais à deriva, compostos em `screen` | `.hero-field`, em `globals.css` |
| Símbolo | A marca extrudada em z e girando, desenhada em canvas | `brand/MarkWireframe.tsx` |
| Holofote | As onze metodologias, uma por vez, na cor de cada uma | `sections/Hero.tsx` |

A cor é uma só nas três camadas: trocar a metodologia em destaque atravessa a
abertura inteira. Ela vem de `accentInk`, nunca de `accent` — duas metodologias
têm cor oficial escura demais para texto sobre preto.

**Geometria.** `brand/mark-wire.ts` é gerado por
`scripts/sample-mark-wire.mjs`: cada subpath de `MARK_PATH` é percorrido com
`getPointAtLength` a passo constante de 1,8 unidade num Chrome headless. São 9
contornos e 591 pontos — o traço da marca é um fio, então cada triângulo entra
com um contorno externo e um interno, e extrudados os dois viram as bordas de
uma fita. É daí que vem o volume. Editar a marca exige rodar o script de novo.

**Armadilhas que o motor de referência tinha e aqui não pode ter.** O exemplo em
que este desenho se baseia mede o canvas uma vez, fixa a densidade de pixel em 2
e rechama `requestAnimationFrame` para sempre. Num app com navegação isso vira
um canvas fora da tela consumindo CPU. A versão daqui cancela o quadro ao
desmontar, observa redimensionamento, para quando a aba está oculta ou o canvas
saiu da viewport, e agrupa as ~1.200 arestas em sete faixas de opacidade — sete
`stroke()` por quadro em vez de mil e duzentos.

**Sem JavaScript** o canvas fica vazio, então o símbolo chapado é servido no
HTML e só sai quando o arame desenha o primeiro quadro. Com
`prefers-reduced-motion` desenha-se um quadro só, num ângulo escolhido, e o
holofote não gira.

**Efeito no desempenho:** a abertura não tem mais imagem `priority`, o elemento
LCP passou a ser o título, e a home caiu de 712 ms para **224 ms** no celular com
CPU 4× lenta. CLS segue 0 — nada anima largura, altura ou posição de fluxo.
