"use client";

import { useCallback, useId, useState } from "react";
import type { FieldErrors } from "@/lib/formValidation";

/**
 * Inline validation state for an uncontrolled form.
 * - `validateForm(form)` checks every field (on submit) and shows all errors.
 * - Leaving a field re-checks it (empty fields are skipped until the first submit, so tabbing through doesn't nag).
 * - Typing in a field that shows an error re-checks it, so the message clears as soon as it's fixed.
 */
export function useFieldErrors(validate: (data: FormData) => FieldErrors) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const baseId = useId();

  const recheck = useCallback(
    (target: EventTarget | null, onlyIfShown: boolean) => {
      const el = target as HTMLInputElement | null;
      const name = el?.name;
      if (!name || !el.form) return;
      setErrors((prev) => {
        if (onlyIfShown && !Object.keys(prev).length) return prev;
        if (!onlyIfShown && !prev[name] && el.type !== "checkbox" && !el.value.trim()) return prev;
        const current = validate(new FormData(el.form!));
        const next: FieldErrors = {};
        // Shown errors that still apply stay (with updated text); fixed ones go — e.g. unticking "Others" clears its box's error.
        for (const key of Object.keys(prev)) if (current[key]) next[key] = current[key];
        // Leaving a field may show a new error for it; typing only ever clears or updates.
        if (!onlyIfShown && current[name]) next[name] = current[name];
        const same =
          Object.keys(next).length === Object.keys(prev).length && Object.keys(next).every((k) => next[k] === prev[k]);
        return same ? prev : next;
      });
    },
    [validate],
  );

  return {
    errors,
    clear: useCallback(() => setErrors({}), []),
    /** Shows errors that came back from the server. */
    show: useCallback((next: FieldErrors) => setErrors(next), []),
    validateForm: (form: HTMLFormElement) => {
      const next = validate(new FormData(form));
      setErrors(next);
      return next;
    },
    /** Spread on the <form>. */
    formHandlers: {
      noValidate: true,
      onBlur: (e: React.FocusEvent<HTMLFormElement>) => recheck(e.target, false),
      onInput: (e: React.FormEvent<HTMLFormElement>) => recheck(e.target, true),
      onChange: (e: React.FormEvent<HTMLFormElement>) => recheck(e.target, true),
    },
    errorId: (name: string) => `${baseId}-${name}-error`,
    /** Spread on an input: marks it invalid and links it to its message for screen readers. */
    fieldProps: (name: string) =>
      errors[name]
        ? { "aria-invalid": true as const, "aria-describedby": `${baseId}-${name}-error` }
        : {},
  };
}

/** The message under a field. Renders nothing when there's no error. */
export function FieldError({ id, message, className = "" }: { id: string; message?: string; className?: string }) {
  if (!message) return null;
  return (
    <span id={id} role="alert" className={`text-[12.5px] leading-snug font-medium text-danger ${className}`}>
      {message}
    </span>
  );
}

/**
 * Fixed space under a field for its message, reserved even when there's no error, so showing or clearing an error
 * never changes the form's height. Sized for one line; a rare message that wraps grows it instead of overlapping.
 */
export function ErrorSlot({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return <span className={`block min-h-[18px] text-[12.5px] leading-snug ${className}`}>{children}</span>;
}

/** Border colour for an invalid field (append to the field's classes). */
export const INVALID_FIELD = "aria-invalid:border-danger aria-invalid:focus:border-danger aria-invalid:focus:ring-danger/30";
