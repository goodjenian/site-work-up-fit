/**
 * Lead capture service abstraction.
 *
 * There is no backend yet. `submitLead` therefore does NOT pretend to send
 * anything: with no endpoint configured it resolves to `{ ok: false,
 * reason: "not-configured" }` and the form shows an honest fallback that hands
 * the visitor a working way to reach the team.
 *
 * To go live, set NEXT_PUBLIC_LEADS_ENDPOINT (or swap the transport here for
 * Supabase / a Next.js route handler). No component needs to change.
 */

export type LeadProfile = "profissional" | "academia" | "geral";

export type Lead = {
  profile: LeadProfile;
  name: string;
  email: string;
  whatsapp?: string;
  city?: string;
  /** Academy leads only. */
  academy?: string;
  units?: string;
  /** Which programme sparked the interest, when relevant. */
  programSlug?: string;
  message?: string;
  /** Where on the site the form was submitted from. */
  source: string;
};

export type LeadResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "network" | "server"; detail?: string };

const ENDPOINT = process.env.NEXT_PUBLIC_LEADS_ENDPOINT;

export const isLeadCaptureConfigured = Boolean(ENDPOINT);

export async function submitLead(lead: Lead): Promise<LeadResult> {
  if (!ENDPOINT) {
    return { ok: false, reason: "not-configured" };
  }
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) return { ok: false, reason: "server", detail: `HTTP ${res.status}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: "network", detail: err instanceof Error ? err.message : undefined };
  }
}
