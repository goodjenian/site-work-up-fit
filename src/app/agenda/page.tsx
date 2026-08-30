import { PageView } from "@/components/PageView";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/FinalCta";
import { EventCard } from "@/components/EventCard";
import { LeadForm } from "@/components/forms/LeadForm";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Mark } from "@/components/brand/Mark";
import { events } from "@/data/events";
import { programs } from "@/data/programs";
import { site } from "@/data/site";
import { buildMetadata, JsonLd } from "@/lib/seo";
import { Card } from "@/components/ui/Card";

export const metadata = buildMetadata({
  title: "Agenda de formações e experiências — Work Up Fit",
  description:
    "Datas das formações, masterclasses e experiências Work Up Fit. Entre na lista e receba o calendário assim que a próxima turma abrir.",
  path: "/agenda",
});

export default function AgendaPage() {
  const upcoming = [...events].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );

  return (
    <>
      <PageView title="Agenda" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: site.url },
            { "@type": "ListItem", position: 2, name: "Agenda", item: `${site.url}/agenda` },
          ],
        }}
      />
      {/*
        No Event structured data is emitted while `events` is empty — marking up
        an event that does not exist would be a fabricated listing.
      */}

      <PageHero
        eyebrow="Agenda"
        crumbs={[{ label: "Início", href: "/" }, { label: "Agenda" }]}
        title={
          <>
            Formações, masterclasses
            <span className="block text-volt-400">e experiências.</span>
          </>
        }
        lead="Todas as datas das metodologias Work Up Fit em um só lugar — formação prática, aulas abertas e experiências presenciais."
      />

      {upcoming.length > 0 ? (
        <Section>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <li key={event.id} className="h-full">
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        </Section>
      ) : (
        /* Honest empty state — no invented dates, and a real next action. */
        <Section>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
            <Reveal>
              <Card className="relative overflow-hidden p-8 md:p-10">
                <Mark
                  className="pointer-events-none absolute -right-10 -top-10 h-48 w-auto text-volt-400/8"
                  weight={0.5}
                />
                <div className="relative">
                  <Eyebrow>Calendário em construção</Eyebrow>
                  <Heading level={2} size="display-sm" className="mt-4">
                    As primeiras turmas estão sendo montadas.
                  </Heading>
                  <p className="mt-4 text-pretty leading-relaxed text-muted">
                    Estamos fechando as datas, as praças e os instrutores formadores da primeira
                    rodada de certificações. Assim que a agenda abrir, ela aparece aqui — e quem
                    estiver na lista é avisado primeiro.
                  </p>

                  <ul className="mt-8 space-y-3 border-t border-ink-600 pt-6">
                    {[
                      "Formação prática presencial",
                      "Conteúdo online de apoio",
                      "Masterclasses abertas por metodologia",
                    ].map((i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-chalk-dim">
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-volt-400" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Reveal>

            <Reveal delay={0.1}>
              <Card className="p-6 md:p-8">
                <Heading level={2} size="display-sm">
                  Entrar na lista
                </Heading>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Diga qual metodologia te interessa e avisamos assim que a turma abrir na sua
                  região.
                </p>
                <div className="mt-7">
                  <LeadForm
                    profile="profissional"
                    formId="form-agenda"
                    source="/agenda"
                    submitLabel="Quero ser avisado"
                  />
                </div>
              </Card>
            </Reveal>
          </div>
        </Section>
      )}

      <Section tone="raised">
        <Reveal className="max-w-2xl">
          <Eyebrow>Metodologias</Eyebrow>
          <Heading level={2} size="display-md" className="mt-5">
            Enquanto isso, conheça os programas.
          </Heading>
          <p className="mt-5 text-pretty leading-relaxed text-muted">
            Onze metodologias de aula coletiva, cada uma com sua energia e seu público.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {programs.map((p) => (
              <li key={p.slug}>
                <a
                  href={`/certificacoes/${p.slug}`}
                  className="font-display-italic text-3xl leading-none transition-opacity hover:opacity-70 md:text-4xl"
                  style={{ color: p.accentInk }}
                >
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <FinalCta
        title={
          <>
            Não perca
            <span className="block text-volt-400">a primeira turma.</span>
          </>
        }
        body="Deixe seu contato e você fica sabendo antes de todo mundo quando a agenda abrir."
        primary={{ label: "Quero me certificar", href: "/contato?perfil=profissional" }}
        secondary={{ label: "Ver as certificações", href: "/certificacoes" }}
        location="agenda_final"
      />
    </>
  );
}
