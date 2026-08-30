"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Heading } from "@/components/ui/Heading";
import { Mark } from "@/components/brand/Mark";
import { getProgram } from "@/data/programs";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

type Tab = "profissional" | "academia";

const tabs: { key: Tab; label: string; blurb: string; cta: string }[] = [
  {
    key: "profissional",
    label: "Sou profissional de EF",
    blurb:
      "Quero me certificar numa metodologia Work Up Fit e conduzir aulas coletivas nas minhas turmas.",
    cta: "Quero me certificar",
  },
  {
    key: "academia",
    label: "Sou academia",
    blurb:
      "Quero levar as metodologias Work Up Fit para a grade da minha unidade, com instrutores certificados.",
    cta: "Quero falar com a Work Up Fit",
  },
];

export function ContactPanel() {
  const params = useSearchParams();
  const initial: Tab = params.get("perfil") === "academia" ? "academia" : "profissional";
  const [tab, setTab] = useState<Tab>(initial);
  const programSlug = params.get("programa") ?? undefined;
  const program = programSlug ? getProgram(programSlug) : undefined;
  const active = tabs.find((t) => t.key === tab)!;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
      <div>
        <div
          role="tablist"
          aria-label="Escolha o seu perfil"
          className="flex flex-col gap-2 sm:flex-row lg:flex-col"
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              type="button"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "rounded-lg border px-5 py-4 text-left transition-colors duration-200",
                tab === t.key
                  ? "border-volt-400 bg-volt-400/10"
                  : "border-ink-600 bg-ink-800/60 hover:border-ink-500",
              )}
            >
              <span
                className={cn(
                  "block font-display text-lg",
                  tab === t.key ? "text-volt-400" : "text-chalk",
                )}
              >
                {t.label}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{t.blurb}</span>
            </button>
          ))}
        </div>

        {program && (
          <p className="mt-6 rounded-lg border border-ink-600 bg-ink-800/60 px-5 py-4 text-sm text-chalk-dim">
            Interesse registrado em{" "}
            <strong className="font-display-italic text-base" style={{ color: program.accentInk }}>
              {program.name}
            </strong>
            .
          </p>
        )}

        {/* Direct channels render only when a real one exists. */}
        {(site.contact.email || site.contact.whatsapp) && (
          <div className="mt-8 border-t border-ink-600 pt-6">
            <h2 className="font-display text-sm tracking-[0.14em] text-chalk">Canais diretos</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {site.contact.email && (
                <li>
                  <a href={`mailto:${site.contact.email}`} className="text-muted hover:text-chalk">
                    {site.contact.email}
                  </a>
                </li>
              )}
              {site.contact.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-chalk"
                  >
                    WhatsApp {site.contact.whatsapp}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <Card className="relative overflow-hidden p-6 md:p-8">
        <Mark
          className="pointer-events-none absolute -right-12 -top-12 h-52 w-auto text-volt-400/6"
          weight={0.5}
        />
        <div className="relative">
          <Heading level={2} size="display-sm">
            {active.cta}
          </Heading>
          <div className="mt-7">
            <LeadForm
              key={tab}
              profile={tab}
              formId={`form-contato-${tab}`}
              source="/contato"
              submitLabel={active.cta}
              defaultProgramSlug={programSlug}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
