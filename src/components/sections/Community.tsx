"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { programs } from "@/data/programs";
import { useMotionAllowed } from "@/lib/use-motion-allowed";

/** Two rows drifting in opposite directions — the mosaic itself is the movement. */
const rowA = ["dance", "fight", "bike", "aerobic", "jump", "lift"];
const rowB = ["life", "pilates", "flex", "gap-core", "burn", "dance"];

function Row({ slugs, direction }: { slugs: string[]; direction: 1 | -1 }) {
  const drift = useMotionAllowed();
  const items = [...slugs, ...slugs];

  return (
    <div className="overflow-hidden" aria-hidden="true">
      <motion.ul
        className="flex w-max gap-3 md:gap-4"
        animate={drift ? { x: direction === 1 ? ["0%", "-50%"] : ["-50%", "0%"] } : undefined}
        transition={drift ? { duration: 55, repeat: Infinity, ease: "linear" } : undefined}
      >
        {items.map((slug, i) => {
          const p = programs.find((x) => x.slug === slug)!;
          return (
            <li
              key={`${slug}-${i}`}
              className="relative h-40 w-56 shrink-0 overflow-hidden rounded-lg bg-ink-800 md:h-56 md:w-80"
            >
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(min-width: 768px) 320px, 224px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-ink-950/25" />
            </li>
          );
        })}
      </motion.ul>
    </div>
  );
}

export function Community() {
  const ref = useRef<HTMLElement>(null);
  const parallax = useMotionAllowed();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ["4%", "-4%"] : ["0%", "0%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink-950 py-20 md:py-28">
      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">Comunidade</Eyebrow>
          <Heading level={2} size="display-lg" className="mt-5">
            Você faz parte
            <span className="block text-volt-400">do movimento.</span>
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-chalk-dim">
            Uma turma que se reconhece, um instrutor que conduz, uma sala inteira no mesmo ritmo.
            É isso que cada metodologia Work Up Fit foi feita para criar.
          </p>
        </Reveal>
      </Container>

      <motion.div style={{ y }} className="mt-14 flex flex-col gap-3 md:mt-20 md:gap-4">
        <Row slugs={rowA} direction={1} />
        <Row slugs={rowB} direction={-1} />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent"
      />
    </section>
  );
}
