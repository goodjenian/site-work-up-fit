"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full " +
  "transition-[transform,background-color,border-color,box-shadow,color] duration-200 " +
  "ease-[var(--ease-out-soft)] active:translate-y-px disabled:opacity-50 " +
  "disabled:pointer-events-none whitespace-nowrap select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-volt-400 text-ink-950 hover:bg-volt-300 shadow-[var(--shadow-volt)] hover:shadow-[0_16px_44px_-12px_rgb(55_183_255/0.7)]",
  accent:
    "text-ink-950 bg-[var(--accent)] hover:brightness-110 shadow-[0_12px_34px_-14px_var(--accent)]",
  secondary:
    "border border-ink-500 bg-ink-800/70 text-chalk hover:bg-ink-700 hover:border-ink-500 backdrop-blur-sm",
  ghost: "text-chalk-dim hover:text-chalk hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-13 px-8 text-base md:text-lg",
};

export type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /** When set, the button reports a cta_click with this name. */
  analyticsName?: string;
  /** Where on the page this button lives — required with analyticsName. */
  analyticsLocation?: string;
};

type AnchorProps = ButtonProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & { href: string };

type NativeProps = ButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export const ButtonLink = forwardRef<HTMLAnchorElement, AnchorProps>(function ButtonLink(
  { variant = "primary", size = "md", className, children, analyticsName, analyticsLocation, href, onClick, ...rest },
  ref,
) {
  return (
    <Link
      ref={ref}
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      onClick={(e) => {
        if (analyticsName) {
          track("cta_click", {
            cta_name: analyticsName,
            location: analyticsLocation ?? "unknown",
            destination: String(href),
          });
        }
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
});

export const Button = forwardRef<HTMLButtonElement, NativeProps>(function Button(
  { variant = "primary", size = "md", className, children, analyticsName, analyticsLocation, onClick, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      onClick={(e) => {
        if (analyticsName) {
          track("cta_click", {
            cta_name: analyticsName,
            location: analyticsLocation ?? "unknown",
            destination: "action",
          });
        }
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
});
