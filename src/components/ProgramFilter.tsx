"use client";

import { useMemo, useState } from "react";
import { ProgramCard } from "@/components/ProgramCard";
import { familyLabels, type Program, type ProgramFamily } from "@/data/programs";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Filter = "todas" | ProgramFamily;

const order: Filter[] = ["todas", "cardio", "dance", "strength", "wellness"];

export function ProgramFilter({ programs }: { programs: Program[] }) {
  const [filter, setFilter] = useState<Filter>("todas");

  const counts = useMemo(() => {
    const c: Record<string, number> = { todas: programs.length };
    for (const p of programs) c[p.family] = (c[p.family] ?? 0) + 1;
    return c;
  }, [programs]);

  const visible = useMemo(
    () => (filter === "todas" ? programs : programs.filter((p) => p.family === filter)),
    [filter, programs],
  );

  return (
    <>
      {/* The cards below are h3; without this the page jumps h1 -> h3. */}
      <h2 className="sr-only">Todas as metodologias Work Up Fit</h2>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por frente de treino">
        {order.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setFilter(f);
                track("schedule_view", { has_events: true, filter: f });
              }}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                active
                  ? "border-volt-400 bg-volt-400 text-ink-950"
                  : "border-ink-600 bg-ink-800/70 text-chalk-dim hover:border-ink-500 hover:text-chalk",
              )}
            >
              {f === "todas" ? "Todas" : familyLabels[f]}
              <span className={cn("text-xs", active ? "text-ink-950/70" : "text-muted")}>
                {counts[f] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-sm text-muted" aria-live="polite">
        {visible.length === programs.length
          ? `${programs.length} metodologias`
          : `${visible.length} de ${programs.length} metodologias`}
      </p>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((program) => (
          <li key={program.slug} className="h-full">
            <ProgramCard program={program} location="catalogo" />
          </li>
        ))}
      </ul>
    </>
  );
}
