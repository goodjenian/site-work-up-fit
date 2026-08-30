"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { Program } from "@/data/programs";
import { familyLabels } from "@/data/programs";
import { track } from "@/lib/analytics";

export function ProgramCard({
  program,
  priority = false,
  location = "certificacoes",
  sizes = "(min-width: 1280px) 380px, (min-width: 768px) 45vw, 88vw",
}: {
  program: Program;
  priority?: boolean;
  location?: string;
  sizes?: string;
}) {
  return (
    <motion.article
      className="group relative h-full"
      style={{ ["--accent" as string]: program.accentInk }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/certificacoes/${program.slug}`}
        onClick={() =>
          track("certification_interest", {
            program_slug: program.slug,
            program_name: program.name,
            location,
          })
        }
        className="flex h-full flex-col overflow-hidden rounded-xl border border-ink-600 bg-ink-800 shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-300 group-hover:border-[color-mix(in_oklab,var(--accent)_50%,var(--color-ink-600))] group-hover:shadow-[var(--shadow-lift)]"
      >
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={program.image}
            alt={program.alt}
            fill
            sizes={sizes}
            priority={priority}
            data-hover-zoom=""
            className="object-cover object-top transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/35 to-transparent"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-x-100"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted">
            {familyLabels[program.family]}
          </p>

          <h3 className="font-display-italic text-3xl leading-none text-[var(--accent)] md:text-4xl">
            {program.name}
          </h3>

          <ul className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-chalk-dim">
            {program.pillars.map((p, i) => (
              <li key={p} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="size-1 rounded-full bg-ink-500" />
                )}
                {p}
              </li>
            ))}
          </ul>

          <p className="mt-1 flex-1 text-pretty text-sm leading-relaxed text-muted">
            {program.summary}
          </p>

          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)]">
            Conhecer certificação
            <svg
              viewBox="0 0 16 16"
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 8h11M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
