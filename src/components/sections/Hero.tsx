"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { MarkWireframe } from "@/components/brand/MarkWireframe";
import { familyAccent, programs } from "@/data/programs";

/**
 * A abertura.
 *
 * Não há fotografia aqui, e a ausência é a decisão. O acervo da marca são
 * ilustrações geradas; exibidas em tela cheia e ampliadas cerca de três vezes,
 * elas comunicam aula de ginástica, não certificadora — e nenhum ajuste de
 * tipografia conserta o que a imagem diz primeiro. As ilustrações seguem no
 * site, contidas e legendadas nos cards e nas páginas de metodologia, que é
 * onde funcionam.
 *
 * No lugar delas, a identidade: o símbolo em arame girando (ver
 * `MarkWireframe`) sobre um campo de cor que se modula devagar, e um holofote
 * que passa pelas onze metodologias. A cor do arame, do campo e do nome é a
 * mesma, então a troca de metodologia atravessa a abertura inteira.
 *
 * O que gira é enriquecimento: o export é estático, e título, subtítulo,
 * atalhos e a primeira metodologia vêm no HTML servido.
 */

const routes = [
  { href: "/certificacoes", label: "Explorar as metodologias" },
  { href: "/contato?perfil=profissional", label: "Quero me certificar" },
  { href: "/academias", label: "Levar para a minha academia" },
];

const SPOTLIGHT_MS = 2800;

export function Hero() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % programs.length),
      SPOTLIGHT_MS,
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  const current = programs[index];
  // `accentInk` e não `accent`: duas metodologias têm cor oficial escura demais
  // para texto sobre preto, e o dado já traz a versão corrigida.
  const ink = current.accentInk;
  const family = familyAccent[current.family];

  return (
    <section
      className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden bg-void"
      style={{ "--hero-fam": family } as React.CSSProperties}
    >
      <div className="hero-field" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      {/*
        No desktop o arame sangra pela direita, na coluna que o texto deixa
        livre. No celular não há coluna: ele sobe para o terço de cima, onde
        sobra espaço, e perde opacidade — atrás do título ele disputaria a
        leitura. Em ambos é decoração; o símbolo acessível é a assinatura do
        cabeçalho.
      */}
      <MarkWireframe
        color={ink}
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[62%] opacity-55 md:inset-y-0 md:left-auto md:right-[-6%] md:h-full md:w-[58%] md:opacity-100"
      />

      <Container className="relative pt-40 pb-10 md:pb-14">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-volt-400">
          Certificadora brasileira de metodologias fitness
        </p>
        <h1 className="mt-6 max-w-[16ch] font-display text-hero text-chalk">
          Ninguém treina sozinho.
          <span className="block text-volt-400">Ninguém ensina sozinho.</span>
        </h1>

        <p className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">
            Formação em
          </span>
          {/*
            O nome que gira é decorativo por acessibilidade: um leitor de tela
            não pode ser interrompido a cada 2,8 s. As onze aparecem de uma vez
            na lista abaixo, que é invisível mas está no documento.
          */}
          <span
            key={current.slug}
            aria-hidden="true"
            className="font-display text-display-md transition-colors duration-700 motion-safe:animate-[hero-spot_0.5s_var(--ease-out-soft)_both]"
            style={{ color: ink }}
          >
            {current.name}
          </span>
          <span className="sr-only">
            onze metodologias: {programs.map((p) => p.name).join(", ")}.
          </span>
        </p>
      </Container>

      <div className="relative border-t border-white/12">
        <Container className="flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between md:gap-10">
          <ul className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-3">
            {routes.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="text-sm text-chalk underline decoration-white/35 underline-offset-[6px] transition-colors hover:text-volt-400 hover:decoration-volt-400"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="#o-que-e"
            aria-label="Ir para o conteúdo"
            className="hidden size-11 shrink-0 items-center justify-center rounded-full text-chalk transition-colors hover:text-volt-400 md:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M12 4v15m0 0 6-6m-6 6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Container>
      </div>
    </section>
  );
}
