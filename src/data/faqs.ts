/**
 * FAQ content.
 *
 * `answer` is written only where the answer is genuinely known from the
 * project briefing. Where a specific value (price, workload, calendar,
 * evaluation rules) has not been defined by the client, `answer` is null and
 * `pending` carries the honest state. The FAQ component renders the pending
 * state as an invitation to talk to the team — it never fabricates a number.
 *
 * Only entries with a real `answer` are emitted into FAQPage structured data.
 */

export type Faq = {
  id: string;
  question: string;
  answer: string | null;
  /** Shown when `answer` is null. */
  pending?: string;
  topics: ("geral" | "certificacao" | "academia")[];
};

export const faqs: Faq[] = [
  {
    id: "o-que-e",
    question: "O que é a Work Up Fit?",
    answer:
      "A Work Up Fit é uma certificadora brasileira de metodologias fitness coletivas. Desenvolvemos programas de aula em grupo, formamos os instrutores que os aplicam e licenciamos essas metodologias para academias. Não somos uma academia: somos a metodologia que roda dentro dela.",
    topics: ["geral"],
  },
  {
    id: "quem-pode",
    question: "Quem pode se certificar?",
    answer:
      "As certificações são voltadas a profissionais de Educação Física e a estudantes em formação na área. A metodologia é desenhada para quem vai conduzir turmas — o registro profissional junto ao CREF segue as regras do próprio conselho.",
    topics: ["certificacao"],
  },
  {
    id: "quais-programas",
    question: "Quais metodologias existem hoje?",
    answer:
      "São onze programas: Fight, Aerobic, Burn, Bike, Dance, Flex, Jump, Life, Gap Core, Pilates e Lift. Eles cobrem quatro frentes — cardio e intensidade, ritmo e dança, força e definição, e bem-estar e longevidade — para que uma mesma academia consiga montar uma grade completa.",
    topics: ["geral", "certificacao", "academia"],
  },
  {
    id: "como-funciona",
    question: "Como funciona a certificação?",
    answer:
      "O percurso tem cinco passos: você escolhe a metodologia, estuda o conteúdo do programa, participa da formação prática, é avaliado e recebe a certificação que autoriza a aplicar aquele método nas suas aulas.",
    topics: ["certificacao"],
  },
  {
    id: "online-presencial",
    question: "A certificação é online ou presencial?",
    answer: null,
    pending:
      "O formato de cada metodologia está sendo fechado agora, junto com o calendário da primeira turma.",
    topics: ["certificacao"],
  },
  {
    id: "duracao",
    question: "Quanto tempo dura a formação?",
    answer: null,
    pending:
      "A carga horária de cada programa está em definição e será publicada aqui junto com a abertura das inscrições.",
    topics: ["certificacao"],
  },
  {
    id: "avaliacao",
    question: "Como funciona a avaliação?",
    answer: null,
    pending:
      "O modelo de avaliação de cada metodologia está sendo finalizado pela equipe técnica.",
    topics: ["certificacao"],
  },
  {
    id: "certificado",
    question: "Recebo um certificado ao final?",
    answer:
      "Sim. Ao concluir a formação você recebe a certificação Work Up Fit na metodologia cursada. Cada certificado emitido terá uma página pública de validação, para que academias e alunos possam conferir a autenticidade a qualquer momento.",
    topics: ["certificacao"],
  },
  {
    id: "trabalhar-academias",
    question: "Posso dar aula em academias com a certificação?",
    answer:
      "Sim — é exatamente para isso que ela existe. A certificação atesta que você está habilitado a conduzir aquela metodologia, e a academia que licencia o programa precisa de instrutores certificados para colocá-lo na grade.",
    topics: ["certificacao", "academia"],
  },
  {
    id: "academia-parceira",
    question: "Como uma academia se torna parceira?",
    answer:
      "A academia licencia uma ou mais metodologias e passa a oferecê-las na grade, aplicadas por instrutores certificados. O primeiro passo é uma conversa para entender a estrutura da unidade, o perfil dos alunos e quais programas fazem sentido.",
    topics: ["academia"],
  },
  {
    id: "investimento",
    question: "Qual é o investimento?",
    answer: null,
    pending:
      "Os valores de certificação e de licenciamento estão sendo definidos e serão divulgados na abertura das inscrições.",
    topics: ["certificacao", "academia"],
  },
  {
    id: "onde",
    question: "A Work Up Fit atende em quais cidades?",
    answer: null,
    pending:
      "As praças da primeira rodada de formações estão sendo definidas. Deixe seu contato e avisamos assim que a agenda abrir na sua região.",
    topics: ["geral", "academia"],
  },
];

export const answeredFaqs = faqs.filter((f): f is Faq & { answer: string } => Boolean(f.answer));

export const faqsByTopic = (topic: Faq["topics"][number]) =>
  faqs.filter((f) => f.topics.includes(topic));
