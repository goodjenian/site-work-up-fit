export type NavItem = { label: string; href: string; description?: string };

export const primaryNav: NavItem[] = [
  { label: "Certificações", href: "/certificacoes", description: "As 11 metodologias Work Up Fit" },
  { label: "Como funciona", href: "/certificacoes#como-funciona", description: "Da escolha ao certificado" },
  { label: "Para academias", href: "/academias", description: "Leve as aulas para a sua unidade" },
  { label: "Agenda", href: "/agenda", description: "Formações e experiências" },
  { label: "Sobre", href: "/quem-somos", description: "Quem é a Work Up Fit" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Certificações",
    items: [
      { label: "Todas as metodologias", href: "/certificacoes" },
      { label: "Como funciona", href: "/certificacoes#como-funciona" },
      { label: "Agenda de formações", href: "/agenda" },
      { label: "Validar certificado", href: "/validar-certificado" },
    ],
  },
  {
    title: "Para você",
    items: [
      { label: "Sou profissional de EF", href: "/contato?perfil=profissional" },
      { label: "Sou academia", href: "/academias" },
      { label: "Perguntas frequentes", href: "/faq" },
      { label: "Conteúdo", href: "/blog" },
    ],
  },
  {
    title: "Work Up Fit",
    items: [
      { label: "Quem somos", href: "/quem-somos" },
      { label: "Contato", href: "/contato" },
      { label: "Política de privacidade", href: "/politica-de-privacidade" },
      { label: "Termos de uso", href: "/termos-de-uso" },
    ],
  },
];
