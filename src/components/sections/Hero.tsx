import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { programs } from "@/data/programs";

/**
 * Full-bleed opening frame.
 *
 * The headline is the only thing in it. The supporting sentence moved to the
 * statement block below and the numbers to their own band, because a hero that
 * carries a paragraph, two buttons and a stat row reads as a landing page —
 * and this is the brand's front door.
 *
 * The actions are underlined links rather than buttons: three routes offered
 * at equal weight, none of them shouting over the image.
 */
const routes = [
  { href: "/certificacoes", label: "Explorar as metodologias" },
  { href: "/contato?perfil=profissional", label: "Quero me certificar" },
  { href: "/academias", label: "Levar para a minha academia" },
];

export function Hero() {
  const cover = programs.find((p) => p.slug === "aerobic")!;

  return (
    <section className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden bg-void">
      <Image
        src={cover.image}
        alt={cover.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[68%_26%]"
      />
      {/*
        Two layers, because one cannot do both jobs. The flat scrim buys
        contrast everywhere — the header sits on this too — and the ramp seats
        the headline without flattening the top of the frame into grey.
        The photograph is background here; if it competes with the type at all,
        the type loses.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-void/58" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/55 to-transparent"
      />

      <Container className="relative pt-40 pb-12 md:pb-16">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-volt-400">
          Certificadora brasileira de metodologias fitness
        </p>
        <h1 className="mt-6 max-w-[16ch] font-display text-hero text-chalk">
          Ninguém treina sozinho.
          <span className="block text-volt-400">Ninguém ensina sozinho.</span>
        </h1>
      </Container>

      <div className="relative border-t border-white/12">
        <Container className="flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between md:gap-10">
          <ul className="flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-3">
            {routes.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="text-sm text-chalk underline decoration-white/35 underline-offset-[6px] transition-colors hover:decoration-volt-400 hover:text-volt-400"
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
