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
