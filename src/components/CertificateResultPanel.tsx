import Link from "next/link";
import { Mark } from "@/components/brand/Mark";
import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import type { CertificateResult } from "@/lib/certificates";

const dateFmt = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" });

export function CertificateResultPanel({
  result,
  onReset,
}: {
  result: CertificateResult;
  onReset: () => void;
}) {
  if (result.status === "valid") {
    return (
      <div className="rounded-xl border border-success/40 bg-success/8 p-8">
        <p className="font-display text-2xl text-success">Certificado válido</p>
        <dl className="mt-6 space-y-4 border-t border-success/25 pt-6">
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-muted">Profissional</dt>
            <dd className="mt-1 text-lg text-chalk">{result.holderName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-muted">Metodologia</dt>
            <dd className="mt-1 text-lg text-chalk">{result.programName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-muted">Emitido em</dt>
            <dd className="mt-1 text-lg text-chalk">{dateFmt.format(new Date(result.issuedAt))}</dd>
          </div>
          {result.expiresAt && (
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-muted">Válido até</dt>
              <dd className="mt-1 text-lg text-chalk">
                {dateFmt.format(new Date(result.expiresAt))}
              </dd>
            </div>
          )}
        </dl>
      </div>
    );
  }

  if (result.status === "not-found") {
    return (
      <div className="rounded-xl border border-danger/40 bg-danger/8 p-8">
        <p className="font-display text-2xl text-danger">Certificado não encontrado</p>
        <p className="mt-3 leading-relaxed text-chalk-dim">
          Não localizamos nenhum certificado com o código <strong>{result.code}</strong>. Confira se
          o código foi digitado corretamente.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex h-11 items-center rounded-full border border-ink-500 px-5 font-semibold text-chalk hover:border-volt-400"
        >
          Tentar outro código
        </button>
      </div>
    );
  }

  /*
    The certificate registry does not exist yet. We say that plainly rather than
    returning a fake "valid" or a misleading "not found".
  */
  return (
    <Card className="relative overflow-hidden p-8 md:p-10">
      <Mark
        className="pointer-events-none absolute -right-10 -top-10 h-44 w-auto text-volt-400/8"
        weight={0.5}
      />
      <div className="relative">
        <Heading level={2} size="display-sm">
          A validação online ainda não está ativa.
        </Heading>
        <p className="mt-4 text-pretty leading-relaxed text-muted">
          A base pública de certificados entra no ar junto com a primeira turma certificada. Até
          lá, não conseguimos confirmar códigos por aqui.
        </p>
        <p className="mt-3 text-pretty leading-relaxed text-muted">
          Precisa confirmar a certificação de um profissional agora? Fale com a nossa equipe —
          conferimos manualmente.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/contato"
            className="inline-flex h-11 items-center rounded-full bg-volt-400 px-6 font-semibold text-ink-950 transition-colors hover:bg-volt-300"
          >
            Falar com a Work Up Fit
          </Link>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-11 items-center rounded-full border border-ink-500 px-5 font-semibold text-chalk hover:border-volt-400"
          >
            Consultar outro código
          </button>
        </div>
      </div>
    </Card>
  );
}
