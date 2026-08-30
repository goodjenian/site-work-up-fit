"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Faq } from "@/data/faqs";
import { cn } from "@/lib/utils";

function Item({ faq, defaultOpen }: { faq: Faq; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  const reduced = useReducedMotion();
  const panelId = useId();

  return (
    <li className="border-b border-ink-600/70 last:border-0">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start justify-between gap-5 py-5 text-left transition-colors hover:text-volt-400 md:py-6"
        >
          <span className="text-pretty text-base font-semibold text-chalk md:text-lg">
            {faq.question}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-ink-500 text-volt-400 transition-transform duration-300 ease-[var(--ease-out-soft)]",
              open && "rotate-45 border-volt-400",
            )}
          >
            <svg viewBox="0 0 14 14" className="size-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M7 1v12M1 7h12" />
            </svg>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {faq.answer ? (
              <p className="max-w-3xl pb-6 pr-10 text-pretty leading-relaxed text-muted">
                {faq.answer}
              </p>
            ) : (
              <div className="max-w-3xl pb-6 pr-10">
                <p className="text-pretty leading-relaxed text-muted">{faq.pending}</p>
                <a
                  href="/contato"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-volt-400 hover:text-volt-300"
                >
                  Quero ser avisado quando definir
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function FaqList({
  faqs,
  className,
  openFirst = false,
}: {
  faqs: Faq[];
  className?: string;
  openFirst?: boolean;
}) {
  return (
    <ul className={cn("divide-y-0", className)}>
      {faqs.map((faq, i) => (
        <Item key={faq.id} faq={faq} defaultOpen={openFirst && i === 0} />
      ))}
    </ul>
  );
}
