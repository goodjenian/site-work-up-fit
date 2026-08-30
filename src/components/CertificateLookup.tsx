"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/forms/Field";
import { Mark } from "@/components/brand/Mark";
import { CertificateResultPanel } from "@/components/CertificateResultPanel";
import { lookupCertificate, type CertificateResult } from "@/lib/certificates";

/**
 * Form and result live on one page, keyed by `?codigo=`. The result used to sit
 * on `/validar-certificado/[id]`, but the site ships as a static export and
 * arbitrary codes cannot be prerendered. Keeping the code in the query means a
 * result is still linkable and shareable, with no page transition.
 */
export function CertificateLookup() {
  const router = useRouter();
  const params = useSearchParams();
  const submitted = params.get("codigo")?.trim() ?? "";

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | undefined>();
  // Stored with the code it belongs to, so switching codes clears the old
  // answer by derivation rather than by a second render from an effect.
  const [entry, setEntry] = useState<{ code: string; result: CertificateResult } | null>(null);
  const result = entry?.code === submitted ? entry.result : null;

  useEffect(() => {
    if (!submitted) return;
    let live = true;
    // A slow response for an earlier code must never land on a newer one.
    lookupCertificate(submitted).then((r) => {
      if (live) setEntry({ code: submitted, result: r });
    });
    return () => {
      live = false;
    };
  }, [submitted]);

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 text-sm text-muted">
          Código consultado: <strong className="text-chalk">{submitted}</strong>
        </p>
        {result ? (
          <CertificateResultPanel
            result={result}
            onReset={() => {
              setCode("");
              router.push("/validar-certificado");
            }}
          />
        ) : (
          <p className="rounded-xl border border-ink-600 bg-ink-800 p-8 text-muted" aria-live="polite">
            Consultando…
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const value = code.trim();
          if (value.length < 4) {
            setError("Informe o código completo do certificado.");
            return;
          }
          setError(undefined);
          router.push(`/validar-certificado?codigo=${encodeURIComponent(value)}`);
        }}
        className="relative overflow-hidden rounded-xl border border-ink-600 bg-ink-800 p-6 shadow-[var(--shadow-card)] md:p-8"
        noValidate
      >
        <Mark
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-auto text-volt-400/7"
          weight={0.5}
        />
        <div className="relative flex flex-col gap-4">
          <TextField
            label="Código do certificado"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            error={error}
            placeholder="Ex.: WUF-XXXX-XXXX"
            hint="O código aparece no rodapé do certificado e no QR Code."
            autoComplete="off"
            spellCheck={false}
          />
          <Button type="submit" size="lg" className="self-start">
            Validar certificado
          </Button>
        </div>
      </form>
    </div>
  );
}
