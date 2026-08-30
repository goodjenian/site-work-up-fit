/**
 * The eleven Work Up Fit methodologies.
 *
 * PROVENANCE — every field marked "official" was read directly from the
 * brand's key-visual files in `material visual work up fit`:
 *   • `name`      — the programme name set in the badge bar.
 *   • `pillars`   — the three-word claim printed at the top of each key visual.
 *   • `accent` / `surface` — colours sampled from the badge bar and title.
 *   • `image`     — the official illustration for that programme.
 *
 * `summary` and `whatToExpect` are editorial drafts written to describe what
 * the official illustration plainly shows. They carry no claim about price,
 * duration, workload, module count or certification rules — none of which has
 * been supplied. Those live in `details`, which is intentionally `null` for
 * every programme until the client confirms them. The UI must omit any block
 * whose data is null rather than fill it in.
 */

export type ProgramFamily = "cardio" | "dance" | "strength" | "wellness";

export type ProgramDetails = {
  /** Contact hours. Unknown → the whole `details` object stays null. */
  workloadHours: number;
  /** "presencial" | "online" | "híbrido" */
  format: string;
  level: string;
};

export type Program = {
  slug: string;
  name: string;
  /** The three pillars printed on the official key visual. Verbatim. */
  pillars: [string, string, string];
  family: ProgramFamily;
  /** Brand accent sampled from the official badge. */
  accent: string;
  /** Accent adjusted to reach WCAG AA (4.5:1) on the dark surface. */
  accentInk: string;
  /** Deep surface colour sampled from the official badge bar. */
  surface: string;
  /** Clean illustration, 1254×1254, no badge. */
  image: string;
  /** Official key visual including the badge lock-up, 1080×1350. */
  keyVisual: string;
  /** Editorial summary of what the official artwork depicts. */
  summary: string;
  /** Short bullets describing the session, drawn from the artwork. */
  whatToExpect: string[];
  /** Alt text for the illustration. */
  alt: string;
  /** Not yet defined by the client — never invent. */
  details: ProgramDetails | null;
};

export const familyLabels: Record<ProgramFamily, string> = {
  cardio: "Cardio & Intensidade",
  dance: "Ritmo & Dança",
  strength: "Força & Definição",
  wellness: "Bem-estar & Longevidade",
};

export const familyAccent: Record<ProgramFamily, string> = {
  cardio: "#37B7FF",
  dance: "#5474FC",
  strength: "#FC3434",
  wellness: "#04C464",
};

export const programs: Program[] = [
  {
    slug: "fight",
    name: "Fight",
    pillars: ["Queima calórica", "Força", "Agilidade"],
    family: "cardio",
    accent: "#3CB4FC",
    accentInk: "#3CB4FC",
    surface: "#040E27",
    image: "/programs/fight.jpg",
    keyVisual: "/programs/fight-kv.jpg",
    summary:
      "Aula coletiva inspirada nos gestos das artes marciais. Sequências de golpes, esquivas e deslocamentos conduzidas em grupo, no ritmo da música.",
    whatToExpect: [
      "Combinações de socos e chutes em sequência coreografada",
      "Trabalho de agilidade e deslocamento pela sala",
      "Formato em grupo, com o instrutor à frente da turma",
    ],
    alt: "Turma da Work Up Fit em aula Fight, com luvas de treino, executando golpes em sequência numa sala com iluminação azul.",
    details: null,
  },
  {
    slug: "aerobic",
    name: "Aerobic",
    pillars: ["Queima calórica", "Energia", "Diversão"],
    family: "dance",
    accent: "#5474FC",
    accentInk: "#5474FC",
    surface: "#1D152A",
    image: "/programs/aerobic.jpg",
    keyVisual: "/programs/aerobic-kv.jpg",
    summary:
      "A ginástica aeróbica em grupo, atualizada. Passos simples encadeados em blocos que crescem em intensidade ao longo da aula.",
    whatToExpect: [
      "Passos de baixo impacto que evoluem para saltos e corridas",
      "Blocos coreografados fáceis de acompanhar desde a primeira aula",
      "Turma inteira no mesmo ritmo, do início ao fim",
    ],
    alt: "Grupo da Work Up Fit em aula Aerobic, saltando com os braços erguidos numa sala de piso de madeira.",
    details: null,
  },
  {
    slug: "burn",
    name: "Burn",
    pillars: ["Queima de gordura", "Desafios", "Evolução física"],
    family: "dance",
    accent: "#044CAC",
    accentInk: "#1778FA",
    surface: "#1D152A",
    image: "/programs/burn.jpg",
    keyVisual: "/programs/burn-kv.jpg",
    summary:
      "Treino de alta intensidade em formato de desafio. Blocos curtos e intensos alternados com recuperação, feitos junto com a turma.",
    whatToExpect: [
      "Estímulos curtos e intensos, com pausas planejadas",
      "Progressão de desafios ao longo do ciclo de aulas",
      "Movimentos sem equipamento, usando o peso do corpo",
    ],
    alt: "Turma da Work Up Fit em aula Burn, em posição de guarda com os punhos cerrados, numa sala com luz azul neon.",
    details: null,
  },
  {
    slug: "bike",
    name: "Bike",
    pillars: ["Queima calórica", "Força", "Energia"],
    family: "cardio",
    accent: "#0CC4E4",
    accentInk: "#0CC4E4",
    surface: "#17264F",
    image: "/programs/bike.jpg",
    keyVisual: "/programs/bike-kv.jpg",
    summary:
      "Ciclismo indoor conduzido em grupo. Percursos com variação de carga e cadência, do plano à subida, no comando do instrutor.",
    whatToExpect: [
      "Percursos com mudanças de carga, cadência e posição",
      "Trabalho sentado e em pé sobre a bike",
      "Sala inteira pedalando no mesmo percurso",
    ],
    alt: "Turma da Work Up Fit em aula Bike, pedalando lado a lado em bicicletas indoor numa sala iluminada de azul.",
    details: null,
  },
  {
    slug: "dance",
    name: "Dance",
    pillars: ["Queima calórica", "Alegria", "Diversão"],
    family: "dance",
    accent: "#5CE4E4",
    accentInk: "#5CE4E4",
    surface: "#1D152A",
    image: "/programs/dance.jpg",
    keyVisual: "/programs/dance-kv.jpg",
    summary:
      "Dança como treino. Coreografias construídas para serem aprendidas na hora, com a turma dançando junto do começo ao fim.",
    whatToExpect: [
      "Coreografias curtas, repetidas até saírem naturalmente",
      "Ritmos variados dentro da mesma aula",
      "Nenhuma experiência prévia em dança é necessária",
    ],
    alt: "Turma da Work Up Fit em aula Dance, dançando em grupo numa sala com iluminação rosa e roxa.",
    details: null,
  },
  {
    slug: "flex",
    name: "Flex",
    pillars: ["Mobilidade", "Flexibilidade", "Relaxamento"],
    family: "wellness",
    accent: "#C4FC74",
    accentInk: "#C4FC74",
    surface: "#29331A",
    image: "/programs/flex.jpg",
    keyVisual: "/programs/flex-kv.jpg",
    summary:
      "Aula de mobilidade e alongamento no solo. Sequências conduzidas com tempo de permanência e respiração, para abrir amplitude e soltar tensão.",
    whatToExpect: [
      "Sequências no colchonete, com apoio do próprio corpo",
      "Foco em amplitude de movimento e respiração",
      "Ritmo calmo, indicado como complemento aos treinos intensos",
    ],
    alt: "Turma da Work Up Fit em aula Flex, alongando lateralmente sobre colchonetes numa sala clara com plantas.",
    details: null,
  },
  {
    slug: "jump",
    name: "Jump",
    pillars: ["Queima calórica", "Força", "Diversão"],
    family: "cardio",
    accent: "#0494B4",
    accentInk: "#0494B4",
    surface: "#17264F",
    image: "/programs/jump.jpg",
    keyVisual: "/programs/jump-kv.jpg",
    summary:
      "Treino sobre a cama elástica. Saltos, corridas e sequências rítmicas que somam intensidade com menos impacto nas articulações.",
    whatToExpect: [
      "Sequências de saltos e corridas sobre o mini trampolim",
      "Alto gasto energético com impacto amortecido",
      "Coreografia simples, guiada pelo instrutor",
    ],
    alt: "Turma da Work Up Fit em aula Jump, saltando sobre mini trampolins numa sala com luz azul.",
    details: null,
  },
  {
    slug: "life",
    name: "Life",
    pillars: ["Saúde", "Equilíbrio", "Qualidade de vida"],
    family: "wellness",
    accent: "#04C464",
    accentInk: "#04C464",
    surface: "#29331A",
    image: "/programs/life.jpg",
    keyVisual: "/programs/life-kv.jpg",
    summary:
      "Aula pensada para o público maduro. Força, equilíbrio e mobilidade trabalhados em grupo, com cargas leves e progressão respeitosa.",
    whatToExpect: [
      "Exercícios de força com halteres leves, sentado e em pé",
      "Trabalho de equilíbrio e coordenação",
      "Ritmo conversado, com espaço para adaptação individual",
    ],
    alt: "Turma da Work Up Fit em aula Life, adultos maduros treinando com halteres leves sentados sobre colchonetes.",
    details: null,
  },
  {
    slug: "gap-core",
    name: "Gap Core",
    pillars: ["Força", "Resistência", "Definição"],
    family: "strength",
    accent: "#FC3434",
    accentInk: "#FC3434",
    surface: "#732221",
    image: "/programs/gap-core.jpg",
    keyVisual: "/programs/gap-core-kv.jpg",
    summary:
      "Trabalho localizado de glúteos, abdômen e pernas somado ao core. Séries de repetição alta conduzidas em grupo.",
    whatToExpect: [
      "Séries localizadas para glúteos, abdômen e pernas",
      "Trabalho de core no solo e em prancha",
      "Repetições altas com pouca ou nenhuma carga externa",
    ],
    alt: "Turma da Work Up Fit em aula Gap Core, alternando prancha no solo e trabalho com barra numa sala de luz vermelha.",
    details: null,
  },
  {
    slug: "pilates",
    name: "Pilates",
    pillars: ["Concentração", "Força", "Postura"],
    family: "wellness",
    accent: "#7CDC54",
    accentInk: "#7CDC54",
    surface: "#1B1E17",
    image: "/programs/pilates.jpg",
    keyVisual: "/programs/pilates-kv.jpg",
    summary:
      "Pilates de solo em grupo, com bola, anel e rolo. Movimento controlado, respiração e consciência corporal como base da aula.",
    whatToExpect: [
      "Exercícios de solo com bola, anel e rolo",
      "Foco em controle, respiração e alinhamento",
      "Progressões que cabem em diferentes níveis na mesma turma",
    ],
    alt: "Turma da Work Up Fit em aula Pilates, usando bola e anel sobre colchonetes numa sala clara com plantas.",
    details: null,
  },
  {
    slug: "lift",
    name: "Lift",
    pillars: ["Força", "Resistência", "Definição"],
    family: "strength",
    accent: "#FC5454",
    accentInk: "#FC5454",
    surface: "#732221",
    image: "/programs/lift.jpg",
    keyVisual: "/programs/lift-kv.jpg",
    summary:
      "Aula de força com barra e step. Séries por grupo muscular, com carga escolhida por cada aluno e execução guiada pela música.",
    whatToExpect: [
      "Séries por grupo muscular com barra e anilhas",
      "Carga ajustada individualmente dentro da mesma turma",
      "Execução no tempo da música, com o instrutor conduzindo",
    ],
    alt: "Turma da Work Up Fit em aula Lift, executando avanços com barra sobre o step numa sala de luz vermelha.",
    details: null,
  },
];

export const getProgram = (slug: string) => programs.find((p) => p.slug === slug);

export const programsByFamily = (): { family: ProgramFamily; items: Program[] }[] =>
  (["cardio", "dance", "strength", "wellness"] as ProgramFamily[]).map((family) => ({
    family,
    items: programs.filter((p) => p.family === family),
  }));
