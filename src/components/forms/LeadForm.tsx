"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextArea, TextField } from "./Field";
import { submitLead, type LeadProfile } from "@/lib/leads";
import { track } from "@/lib/analytics";
import { programs } from "@/data/programs";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<string, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const digits = (v: string) => v.replace(/\D/g, "");

export function LeadForm({
  profile,
  formId,
  source,
  className,
  submitLabel = "Enviar",
  defaultProgramSlug,
}: {
  profile: LeadProfile;
  formId: string;
  source: string;
  className?: string;
  submitLabel?: string;
  defaultProgramSlug?: string;
}) {
  const reduced = useReducedMotion();
  const [state, setState] = useState<"idle" | "loading" | "success" | "unsent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [started, setStarted] = useState(false);
  const isAcademy = profile === "academia";

  const onFirstInput = () => {
    if (started) return;
    setStarted(true);
    track("contact_form_start", { form_id: formId });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();

    const next: Errors = {};
    if (get("name").length < 2) next.name = "Informe seu nome.";
    if (!emailRe.test(get("email"))) next.email = "Informe um e-mail válido.";
    const wpp = digits(get("whatsapp"));
    if (wpp && (wpp.length < 10 || wpp.length > 13))
      next.whatsapp = "Informe o WhatsApp com DDD.";
    if (isAcademy && get("academy").length < 2) next.academy = "Informe o nome da academia.";
    if (isAcademy && get("city").length < 2) next.city = "Informe a cidade.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = document.querySelector<HTMLElement>(`#${CSS.escape(formId)} [aria-invalid="true"]`);
      first?.focus();
      return;
    }

    setState("loading");
    const result = await submitLead({
      profile,
      name: get("name"),
      email: get("email"),
      whatsapp: get("whatsapp") || undefined,
      city: get("city") || undefined,
      academy: get("academy") || undefined,
      units: get("units") || undefined,
      programSlug: get("programSlug") || defaultProgramSlug,
      message: get("message") || undefined,
      source,
    });

    if (result.ok) {
      setState("success");
      track("contact_form_submit", { form_id: formId, status: "success", profile });
      return;
    }
    setState(result.reason === "not-configured" ? "unsent" : "error");
    track("contact_form_submit", { form_id: formId, status: "error", profile });
  }

  if (state === "success") {
    return (
      <Status
        tone="success"
        title="Recebemos seu contato."
        body="Nossa equipe vai responder no e-mail e no WhatsApp que você informou."
      />
    );
  }

  /**
   * Honest fallback: there is no lead endpoint wired yet, so we do not claim
   * the message was sent. We say what happened and hand over a channel that
   * actually works — or, if none is published yet, we say that too.
   */
  if (state === "unsent") {
    const email = site.contact.email;
    const whatsapp = site.contact.whatsapp;
    return (
      <Status
        tone="warning"
        title="O envio automático ainda não está ativo."
        body={
          email || whatsapp
            ? "Enquanto ligamos o formulário, fale com a gente por um destes canais:"
            : "Estamos finalizando os canais de atendimento. Assim que o formulário estiver no ar, ele passa a enviar direto para a equipe."
        }
      >
        {(email || whatsapp) && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {email && (
              <li>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex h-10 items-center rounded-full border border-ink-500 px-5 text-sm font-semibold text-chalk hover:border-volt-400"
                >
                  {email}
                </a>
              </li>
            )}
            {whatsapp && (
              <li>
                <a
                  href={`https://wa.me/${digits(whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center rounded-full border border-ink-500 px-5 text-sm font-semibold text-chalk hover:border-volt-400"
                >
                  WhatsApp
                </a>
              </li>
            )}
          </ul>
        )}
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-4 text-sm font-semibold text-volt-400 hover:text-volt-300"
        >
          Voltar ao formulário
        </button>
      </Status>
    );
  }

  return (
    <form
      id={formId}
      onSubmit={onSubmit}
      onInput={onFirstInput}
      noValidate
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Nome"
          name="name"
          autoComplete="name"
          required
          error={errors.name}
          placeholder="Como podemos te chamar"
        />
        <TextField
          label="E-mail"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          error={errors.email}
          placeholder="voce@email.com"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="WhatsApp"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          error={errors.whatsapp}
          placeholder="(00) 00000-0000"
          hint="Opcional, mas acelera o retorno."
        />
        <TextField
          label="Cidade"
          name="city"
          autoComplete="address-level2"
          required={isAcademy}
          error={errors.city}
          placeholder="Cidade / UF"
        />
      </div>

      {isAcademy && (
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Academia"
            name="academy"
            required
            error={errors.academy}
            placeholder="Nome da academia"
          />
          <SelectField label="Número de unidades" name="units" defaultValue="">
            <option value="">Selecione</option>
            <option value="1">1 unidade</option>
            <option value="2-4">2 a 4 unidades</option>
            <option value="5-10">5 a 10 unidades</option>
            <option value="10+">Mais de 10 unidades</option>
          </SelectField>
        </div>
      )}

      {!isAcademy && (
        <SelectField
          label="Metodologia de interesse"
          name="programSlug"
          defaultValue={defaultProgramSlug ?? ""}
        >
          <option value="">Ainda estou decidindo</option>
          {programs.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </SelectField>
      )}

      <TextArea
        label="Mensagem"
        name="message"
        placeholder={
          isAcademy
            ? "Conte um pouco sobre a academia e o que procura."
            : "Conte o que você quer saber."
        }
      />

      {state === "error" && (
        <p role="alert" className="rounded-md border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
          Não conseguimos enviar agora. Tente novamente em instantes.
        </p>
      )}

      <div className="mt-1 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={state === "loading"}>
          {state === "loading" ? (
            <>
              <motion.span
                aria-hidden="true"
                className="size-4 rounded-full border-2 border-ink-950/30 border-t-ink-950"
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              Enviando…
            </>
          ) : (
            submitLabel
          )}
        </Button>
        <p className="text-xs text-muted">Usamos seus dados apenas para responder este contato.</p>
      </div>
    </form>
  );
}

function Status({
  tone,
  title,
  body,
  children,
}: {
  tone: "success" | "warning";
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence>
      <motion.div
        role="status"
        initial={{ opacity: 0, y: reduced ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "rounded-lg border p-6",
          tone === "success"
            ? "border-success/40 bg-success/8"
            : "border-warning/40 bg-warning/8",
        )}
      >
        <p
          className={cn(
            "font-display text-xl",
            tone === "success" ? "text-success" : "text-warning",
          )}
        >
          {title}
        </p>
        <p className="mt-2 text-pretty leading-relaxed text-chalk-dim">{body}</p>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
