"use client";

import Image from "next/image";
import { formatLabels, type WufEvent } from "@/data/events";
import { getProgram } from "@/data/programs";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const dateFmt = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" });
const timeFmt = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" });

export function EventCard({ event, location = "agenda" }: { event: WufEvent; location?: string }) {
  const program = getProgram(event.programSlug);
  const start = new Date(event.startsAt);
  const accent = program?.accentInk ?? "#37B7FF";

  const Wrapper = event.url ? "a" : "div";

  return (
    <Wrapper
      {...(event.url
        ? {
            href: event.url,
            onClick: () =>
              track("event_click", {
                event_id: event.id,
                program_slug: event.programSlug,
                location,
              }),
          }
        : {})}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-ink-600 bg-ink-800 transition-[border-color,box-shadow] duration-300",
        event.url && "hover:border-[color-mix(in_oklab,var(--accent)_50%,var(--color-ink-600))] hover:shadow-[var(--shadow-lift)]",
      )}
      style={{ ["--accent" as string]: accent } as React.CSSProperties}
    >
      <div className="flex items-stretch gap-4 border-b border-ink-600 p-4">
        <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-md bg-ink-900 py-2.5">
          <span className="font-display text-2xl leading-none text-[var(--accent)]">
            {dateFmt.format(start).split(" ")[0]}
          </span>
          <span className="mt-1 text-[0.65rem] uppercase tracking-[0.12em] text-muted">
            {dateFmt.format(start).split(" ").slice(1).join(" ").replace(".", "")}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.12em] text-muted">
            {timeFmt.format(start)} · {formatLabels[event.format]}
          </p>
          <h3 className="mt-1.5 truncate font-display text-lg text-chalk">{event.title}</h3>
          {program && (
            <p className="font-display-italic text-sm text-[var(--accent)]">{program.name}</p>
          )}
        </div>
        {program && (
          <div className="relative hidden size-16 shrink-0 overflow-hidden rounded-md sm:block">
            <Image src={program.image} alt="" fill sizes="64px" className="object-cover object-top" />
          </div>
        )}
      </div>

      <dl className="flex flex-1 flex-col gap-2 p-4 text-sm">
        {event.city && (
          <div className="flex gap-2">
            <dt className="text-muted">Local</dt>
            <dd className="text-chalk-dim">
              {event.venue ? `${event.venue} · ${event.city}` : event.city}
            </dd>
          </div>
        )}
        {event.instructor && (
          <div className="flex gap-2">
            <dt className="text-muted">Instrutor</dt>
            <dd className="text-chalk-dim">{event.instructor}</dd>
          </div>
        )}
        {typeof event.seatsLeft === "number" && (
          <div className="flex gap-2">
            <dt className="text-muted">Vagas</dt>
            <dd className="text-chalk-dim">
              {event.seatsLeft}
              {typeof event.seatsTotal === "number" ? ` de ${event.seatsTotal}` : ""}
            </dd>
          </div>
        )}
      </dl>
    </Wrapper>
  );
}
