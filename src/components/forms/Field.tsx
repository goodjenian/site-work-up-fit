"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type Base = {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
};

const controlClass =
  "w-full rounded-md border border-ink-600 bg-ink-900 px-4 py-3 text-chalk placeholder:text-muted/70 " +
  "transition-colors duration-200 hover:border-ink-500 focus:border-volt-400 focus:outline-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt-400 " +
  "aria-[invalid=true]:border-danger";

export function TextField({
  label,
  error,
  hint,
  required,
  className,
  ...rest
}: Base & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-chalk-dim">
        {label}
        {required && <span className="ml-1 text-volt-400" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(error && errorId, hint && hintId) || undefined}
        className={controlClass}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextArea({
  label,
  error,
  hint,
  required,
  className,
  ...rest
}: Base & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-chalk-dim">
        {label}
        {required && <span className="ml-1 text-volt-400" aria-hidden="true">*</span>}
      </label>
      <textarea
        id={id}
        rows={4}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(error && errorId, hint && hintId) || undefined}
        className={cn(controlClass, "resize-y")}
        {...rest}
      />
      {hint && !error && (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function SelectField({
  label,
  error,
  required,
  className,
  children,
  ...rest
}: Base & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-chalk-dim">
        {label}
        {required && <span className="ml-1 text-volt-400" aria-hidden="true">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(controlClass, "appearance-none pr-11")}
          {...rest}
        >
          {children}
        </select>
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </div>
      {error && (
        <p id={errorId} className="text-xs font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
