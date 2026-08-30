"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { programs } from "@/data/programs";
import { useMotionAllowed } from "@/lib/use-motion-allowed";

const heroImages = [
  { slug: "aerobic", className: "col-span-2 row-span-2 aspect-4/5" },
  { slug: "dance", className: "aspect-square" },
  { slug: "life", className: "aspect-square" },
] as const;

export function Hero() {
  const float = useMotionAllowed();
  const pick = (slug: string) => programs.find((p) => p.slug === slug)!;

  // Identical on the server and on first paint; `data-reveal` lets the
  // reduced-motion CSS rule force the final state so nothing stays hidden.
  const rise = (delay: number) => ({
    "data-reveal": "",
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative overflow-hidden bg-ink-950 pt-28 pb-16 md:pt-36 md:pb-24">
      {/* ambient brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-[38rem] opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(48% 55% at 22% 18%, rgb(55 183 255 / 0.22) 0%, transparent 68%), radial-gradient(42% 50% at 82% 8%, rgb(84 116 252 / 0.16) 0%, transparent 70%)",
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-14">
          <div>
            <motion.p
              {...rise(0)}
              className="inline-flex items-center gap-2.5 rounded-full border border-ink-600 bg-ink-800/60 px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-volt-400 backdrop-blur-sm"
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-volt-400 shadow-[0_0_10px_var(--color-volt-400)]" />
              Certificadora brasileira de metodologias fitness
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className="mt-6 max-w-[15ch] font-display text-display-xl text-balance text-chalk"
            >
              Ninguém treina sozinho.
              <span className="block text-volt-400">Ninguém ensina sozinho.</span>
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-chalk-dim md:text-xl"
            >
              A Work Up Fit forma instrutores em <strong className="font-semibold text-chalk">onze
              metodologias de aula coletiva</strong> e leva essas experiências para academias de todo
              o Brasil. Movimento que conecta pessoas — e transforma quem ensina.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                href="/certificacoes"
                size="lg"
                analyticsName="conheca_as_certificacoes"
                analyticsLocation="hero"
              >
                Conheça as certificações
              </ButtonLink>
              <ButtonLink
                href="/contato?perfil=profissional"
                variant="secondary"
                size="lg"
                analyticsName="quero_fazer_parte"
                analyticsLocation="hero"
              >
                Quero fazer parte
              </ButtonLink>
            </motion.div>

            <motion.dl
              {...rise(0.32)}
              className="mt-11 grid max-w-lg grid-cols-3 gap-5 border-t border-ink-600/70 pt-7"
            >
              {[
                { k: "11", l: "metodologias" },
                { k: "4", l: "frentes de treino" },
                { k: "BR", l: "método brasileiro" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd>
                    <span className="block font-display text-3xl leading-none text-chalk md:text-4xl">
                      {s.k}
                    </span>
                    <span className="mt-1.5 block text-xs uppercase tracking-[0.11em] text-muted">
                      {s.l}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Editorial image cluster — official artwork only */}
          <motion.div
            data-reveal=""
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {heroImages.map((item, i) => {
                const p = pick(item.slug);
                return (
                  <motion.div
                    key={item.slug}
                    className={`relative overflow-hidden rounded-lg bg-ink-800 ${item.className}`}
                    animate={float ? { y: [0, i === 0 ? -8 : 6, 0] } : undefined}
                    transition={
                      float ? { duration: 9 + i * 2, repeat: Infinity, ease: "easeInOut" } : undefined
                    }
                  >
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      priority={i === 0}
                      sizes={i === 0 ? "(min-width: 1024px) 30vw, 60vw" : "(min-width: 1024px) 15vw, 30vw"}
                      className="object-cover object-top"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent"
                    />
                    <span className="absolute bottom-3 left-3 font-display-italic text-lg leading-none text-chalk drop-shadow-lg md:text-xl">
                      {p.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>

      <ProgramMarquee />
    </section>
  );
}

/** Infinite strip of the real programme names — literal movement, real data. */
function ProgramMarquee() {
  const scroll = useMotionAllowed();
  const items = [...programs, ...programs];

  return (
    <div
      className="relative mt-16 overflow-hidden border-y border-ink-600/60 bg-ink-900/60 py-4 md:mt-24"
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max items-center gap-8 md:gap-12"
        animate={scroll ? { x: ["0%", "-50%"] } : undefined}
        transition={scroll ? { duration: 42, repeat: Infinity, ease: "linear" } : undefined}
      >
        {items.map((p, i) => (
          <span key={`${p.slug}-${i}`} className="flex items-center gap-8 md:gap-12">
            <span
              className="font-display-italic text-2xl leading-none whitespace-nowrap md:text-3xl"
              style={{ color: p.accentInk }}
            >
              {p.name}
            </span>
            <span className="size-1.5 shrink-0 rounded-full bg-ink-500" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
