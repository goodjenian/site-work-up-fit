/**
 * Agenda.
 *
 * There is no confirmed calendar yet. `events` is deliberately empty: the
 * agenda page renders its real empty state (waiting-list capture) instead of
 * showing invented dates. As soon as the client supplies real sessions they
 * drop straight into this array and the page fills itself.
 */

export type EventFormat = "presencial" | "online" | "hibrido";

export type WufEvent = {
  id: string;
  programSlug: string;
  title: string;
  /** ISO 8601 date-time. */
  startsAt: string;
  endsAt?: string;
  format: EventFormat;
  city?: string;
  venue?: string;
  instructor?: string;
  seatsTotal?: number;
  seatsLeft?: number;
  url?: string;
};

export const events: WufEvent[] = [];

export const formatLabels: Record<EventFormat, string> = {
  presencial: "Presencial",
  online: "Online ao vivo",
  hibrido: "Híbrido",
};
