// Form validation for the website enquiry forms (homepage "Let's talk" and Contact page).
// Pure functions, safe on client and server. The rules match the server-side checks in
// Tech-Vedha-Admin/app/lib/server/enquiryLead.ts (which uses Tech-Vedha-Admin/utils/leadForm.ts),
// so the browser catches mistakes before sending and the admin rejects anything that slips past.

import { VALIDATION_COPY, type ValidationCopy } from "@/data/forms";

export type FieldErrors = Record<string, string>;

// ── Mobile number ────────────────────────────────────────────────────────────

/** Leaves only what a mobile number can contain while typing: digits, and "+", spaces, "-" for "+91 98765-43210". */
export const cleanPhoneInput = (value: string) => value.replace(/[^\d+\s-]/g, "").slice(0, 16);

/** Indian mobile: 10 digits starting with 5, 6, 7, 8 or 9. Returns the reason it's invalid, or null. */
export function validateIndianMobile(input: string, m: ValidationCopy = VALIDATION_COPY): string | null {
  const value = input.trim();
  if (!value) return m.phoneRequired;
  const compact = value.replace(/[\s\-().]/g, "");
  if (!/^\+?\d+$/.test(compact)) return m.phoneCharacters;
  let digits = compact.replace(/^\+/, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length !== 10) return m.phoneLength;
  if (!/^[5-9]/.test(digits)) return m.phoneStart;
  return null;
}

// ── Email ────────────────────────────────────────────────────────────────────

const EMAIL_DOMAIN_RE = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

export function validateEmail(input: string, m: ValidationCopy = VALIDATION_COPY): string | null {
  const value = input.trim();
  if (!value) return m.emailRequired;
  if (value.length > 191) return m.emailTooLong;
  if (/\s/.test(value)) return m.emailSpaces;
  const parts = value.split("@");
  if (parts.length !== 2) return m.emailOneAt;
  const [local, domain] = parts;
  if (!local) return m.emailNameMissing;
  if (local.length > 64) return m.emailTooLong;
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return m.emailDots;
  if (!domain || !EMAIL_DOMAIN_RE.test(domain)) return m.emailDomain;
  return null;
}

// ── Name and plain text ──────────────────────────────────────────────────────

export function validateName(input: string, m: ValidationCopy = VALIDATION_COPY): string | null {
  const value = input.trim();
  if (!value) return m.nameRequired;
  if (value.length < 2) return m.nameTooShort;
  if (value.length > 100) return m.nameTooLong;
  if (/\p{N}/u.test(value)) return m.nameNumbers;
  if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(value)) return m.nameLetters;
  return null;
}

/** "{field} is required." with the placeholders filled in. */
const fill = (pattern: string, values: Record<string, string | number>) =>
  Object.entries(values).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, String(value)), pattern);

function validateText(input: string, label: string, max: number, m: ValidationCopy): string | null {
  const value = input.trim();
  if (!value) return fill(m.textRequired, { field: label });
  if (value.length < 2) return m.textTooShort;
  if (value.length > max) return fill(m.textTooLong, { max });
  return null;
}

// ── Whole forms ──────────────────────────────────────────────────────────────

const MESSAGE_MAX = 2000;

/** Field name → error for the short enquiry form. Empty object means valid. */
export function validateHomepageEnquiry(data: FormData, m: ValidationCopy = VALIDATION_COPY): FieldErrors {
  const value = (key: string) => String(data.get(key) ?? "");
  const errors: FieldErrors = {};
  const checks: [string, string | null][] = [
    ["name", validateName(value("name"), m)],
    ["phone", validateIndianMobile(value("phone"), m)],
    ["email", validateEmail(value("email"), m)],
    ["message", value("message").trim().length > MESSAGE_MAX ? fill(m.textTooLong, { max: MESSAGE_MAX }) : null],
  ];
  for (const [field, error] of checks) if (error) errors[field] = error;
  return errors;
}

/** Field name → error for the full enquiry form. Empty object means valid. */
export function validateContactEnquiry(
  data: FormData,
  otherLabel: string,
  m: ValidationCopy = VALIDATION_COPY,
): FieldErrors {
  const value = (key: string) => String(data.get(key) ?? "");
  const services = data.getAll("service").map(String).filter(Boolean);
  const errors: FieldErrors = {};
  const checks: [string, string | null][] = [
    ["service", services.length ? null : m.serviceRequired],
    ["otherService", services.includes(otherLabel) ? validateText(value("otherService"), m.otherServiceName, 200, m) : null],
    ["name", validateName(value("name"), m)],
    ["company", validateText(value("company"), m.companyName, 150, m)],
    ["phone", validateIndianMobile(value("phone"), m)],
    ["email", validateEmail(value("email"), m)],
    ["city", validateText(value("city"), m.cityName, 150, m)],
    ["timeframe", value("timeframe").trim() ? null : m.timeframeRequired],
    ["message", value("message").trim().length > MESSAGE_MAX ? fill(m.textTooLong, { max: MESSAGE_MAX }) : null],
  ];
  for (const [field, error] of checks) if (error) errors[field] = error;
  return errors;
}

/** Moves focus to the first field with an error, so keyboard and screen-reader users land on it. */
export function focusFirstError(form: HTMLFormElement, errors: FieldErrors) {
  const first = Object.keys(errors)[0];
  if (!first) return;
  const el = form.elements.namedItem(first);
  const target = el instanceof RadioNodeList ? (el[0] as HTMLElement | undefined) : (el as HTMLElement | null);
  target?.focus();
}
