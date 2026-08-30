/**
 * Certificate validation.
 *
 * There is no certificate registry yet — no certification has been issued and
 * no backend exists. `lookupCertificate` therefore returns `unavailable`, and
 * the page says so. It deliberately does NOT return `not-found`, which would
 * imply we checked a real registry and the certificate is fake.
 *
 * The lookup runs in the browser: the site ships as a static export, so there
 * is no server to proxy through. The endpoint is therefore public by
 * necessity — point it at a read-only route that takes a code and returns one
 * certificate's public facts, never at anything that needs a secret.
 *
 * When the registry lands, set NEXT_PUBLIC_CERTIFICATE_REGISTRY_ENDPOINT; the
 * UI already renders `valid` and `not-found` correctly.
 */

export type CertificateResult =
  | {
      status: "valid";
      code: string;
      holderName: string;
      programName: string;
      issuedAt: string;
      expiresAt?: string;
    }
  | { status: "not-found"; code: string }
  | { status: "unavailable"; code: string };

const REGISTRY_ENDPOINT = process.env.NEXT_PUBLIC_CERTIFICATE_REGISTRY_ENDPOINT;

export async function lookupCertificate(code: string): Promise<CertificateResult> {
  if (!REGISTRY_ENDPOINT) return { status: "unavailable", code };

  try {
    const res = await fetch(`${REGISTRY_ENDPOINT}/${encodeURIComponent(code)}`);
    if (res.status === 404) return { status: "not-found", code };
    if (!res.ok) return { status: "unavailable", code };
    const data = (await res.json()) as Omit<
      Extract<CertificateResult, { status: "valid" }>,
      "status" | "code"
    >;
    return { status: "valid", code, ...data };
  } catch {
    return { status: "unavailable", code };
  }
}
