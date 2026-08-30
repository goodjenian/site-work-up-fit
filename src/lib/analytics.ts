/**
 * Analytics façade.
 *
 * No provider is wired yet and no measurement ID exists, so nothing is loaded
 * and no network call is made. Every tracked interaction in the UI calls
 * `track()`, which pushes a well-formed event into `window.dataLayer` and stops
 * there. Connecting GA4 / GTM later is a one-line change in `AnalyticsProvider`
 * — the call sites never need to be touched.
 */

export type AnalyticsEvent =
  | { name: "page_view"; params: { page_path: string; page_title?: string } }
  | {
      name: "cta_click";
      params: { cta_name: string; location: string; destination: string };
    }
  | { name: "certification_view"; params: { program_slug: string; program_name: string } }
  | {
      name: "certification_interest";
      params: { program_slug: string; program_name: string; location: string };
    }
  | { name: "academy_interest"; params: { location: string } }
  | { name: "contact_form_start"; params: { form_id: string } }
  | {
      name: "contact_form_submit";
      params: { form_id: string; status: "success" | "error"; profile?: string };
    }
  | { name: "schedule_view"; params: { has_events: boolean; filter?: string } }
  | {
      name: "event_click";
      params: { event_id: string; program_slug: string; location: string };
    };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track<E extends AnalyticsEvent>(name: E["name"], params: E["params"]): void {
  if (typeof window === "undefined") return;
  const payload = { event: name, ...params };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", payload);
  }
}
