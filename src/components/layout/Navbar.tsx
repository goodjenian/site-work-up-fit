"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const isScrolled = () => window.scrollY > 12;

export function Navbar() {
  const pathname = usePathname();
  // The menu is open *for a route*. Deriving it this way means a navigation
  // closes it during render — no effect, no extra pass.
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const open = openForPath === pathname;
  const setOpen = (next: boolean) => setOpenForPath(next ? pathname : null);
  const reduced = useReducedMotion();

  // Read straight from the scroll position instead of mirroring it into state:
  // the snapshot is a boolean, so this re-renders only when the header actually
  // needs to change, and the server snapshot (false) matches the first paint.
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, () => false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenForPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // A link to a section (`/certificacoes#como-funciona`) points at part of a
  // page, not at a page — marking it "current" would light up two nav items at
  // once on /certificacoes.
  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-volt-400 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Ir para o conteúdo
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open
            ? "border-b border-ink-600/80 bg-ink-950/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-wuf flex h-16 items-center justify-between gap-4 md:h-18">
          <Logo />

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                      isActive(item.href)
                        ? "text-chalk"
                        : "text-chalk-dim hover:text-chalk",
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3.5 -bottom-0.5 h-px bg-volt-400"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href="/contato?perfil=profissional"
              size="sm"
              className="hidden sm:inline-flex"
              analyticsName="quero_me_certificar"
              analyticsLocation="navbar"
            >
              Quero me certificar
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid size-10 place-items-center rounded-full border border-ink-600 bg-ink-800/70 text-chalk transition-colors hover:bg-ink-700 lg:hidden"
            >
              <span className="relative block h-3 w-4.5" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 w-full rounded bg-current transition-transform duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 block h-0.5 w-full rounded bg-current transition-opacity duration-200",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-0.5 w-full rounded bg-current transition-transform duration-300",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="menu-mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-ink-600/60 bg-ink-950 lg:hidden"
            >
              {/* Body scroll is locked while this is open, so the panel fills
                  the rest of the screen instead of floating over live content. */}
              <nav
                aria-label="Navegação principal (celular)"
                className="container-wuf flex min-h-[calc(100dvh-4rem)] max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto py-5 md:min-h-[calc(100dvh-4.5rem)] md:max-h-[calc(100dvh-4.5rem)]"
              >
                <ul className="flex flex-col">
                  {primaryNav.map((item) => (
                    <li key={item.href} className="border-b border-ink-600/50 last:border-0">
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="flex flex-col gap-0.5 py-3.5"
                      >
                        <span
                          className={cn(
                            "font-display text-xl",
                            isActive(item.href) ? "text-volt-400" : "text-chalk",
                          )}
                        >
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="text-sm text-muted">{item.description}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-2.5 pb-4 pt-6">
                  <ButtonLink
                    href="/contato?perfil=profissional"
                    size="lg"
                    className="w-full"
                    analyticsName="quero_me_certificar"
                    analyticsLocation="menu_mobile"
                  >
                    Quero me certificar
                  </ButtonLink>
                  <ButtonLink
                    href="/academias"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    analyticsName="levar_para_academia"
                    analyticsLocation="menu_mobile"
                  >
                    Quero levar para minha academia
                  </ButtonLink>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
