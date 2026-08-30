import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Mark } from "@/components/brand/Mark";
import { programs } from "@/data/programs";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-ink-950 pt-32 pb-24 md:pt-40 md:pb-32">
      <Mark
        className="pointer-events-none absolute -right-20 top-24 h-96 w-auto text-volt-400/6"
        weight={0.5}
      />
      <Container className="relative">
        <p className="font-display text-sm tracking-[0.2em] text-volt-400">Erro 404</p>
        <Heading level={1} size="display-lg" className="mt-5 max-w-2xl">
          Essa página saiu
          <span className="block text-volt-400">da grade.</span>
        </Heading>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-chalk-dim">
          O endereço que você abriu não existe ou foi movido. Comece de novo por aqui:
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full bg-volt-400 px-7 font-semibold text-ink-950 transition-colors hover:bg-volt-300"
          >
            Voltar para o início
          </Link>
          <Link
            href="/certificacoes"
            className="inline-flex h-12 items-center justify-center rounded-full border border-ink-500 bg-ink-800/70 px-7 font-semibold text-chalk transition-colors hover:bg-ink-700"
          >
            Ver as certificações
          </Link>
        </div>

        <div className="mt-14 border-t border-ink-600 pt-8">
          <h2 className="font-display text-sm tracking-[0.14em] text-muted">As metodologias</h2>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/certificacoes/${p.slug}`}
                  className="font-display-italic text-2xl leading-none transition-opacity hover:opacity-70"
                  style={{ color: p.accentInk }}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
