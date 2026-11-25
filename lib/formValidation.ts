// Form validation for the website enquiry forms (homepage "Let's talk" and Contact page).
// Pure functions, safe on client and server. The rules match the server-side checks in
// Tech-Vedha-Admin/app/lib/server/enquiryLead.ts (which uses Tech-Vedha-Admin/utils/leadForm.ts),
// so the browser catches mistakes before sending and the admin rejects anything that slips past.

export type FieldErrors = Record<string, string>;

// ── Mobile number ────────────────────────────────────────────────────────────

export const PHONE_ERRORS = {
  required: "Mobile number is required.",
  characters: "Use digits only.",
  length: "Must be 10 digits.",
  start: "Must start with 5, 6, 7, 8 or 9.",
} as const;

/** Leaves only what a mobile number can contain while typing: digits, and "+", spaces, "-" for "+91 98765-43210". */
export const cleanPhoneInput = (value: string) => value.replace(/[^\d+\s-]/g, "").slice(0, 16);

/** Indian mobile: 10 digits starting with 5, 6, 7, 8 or 9. Returns the reason it's invalid, or null. */
export function validateIndianMobile(input: string): string | null {
  const value = input.trim();
  if (!value) return PHONE_ERRORS.required;
  const compact = value.replace(/[\s\-().]/g, "");
  if (!/^\+?\d+$/.test(compact)) return PHONE_ERRORS.characters;
  let digits = compact.replace(/^\+/, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length !== 10) return PHONE_ERRORS.length;
  if (!/^[5-9]/.test(digits)) return PHONE_ERRORS.start;
  return null;
}

// ── Email ────────────────────────────────────────────────────────────────────

const EMAIL_DOMAIN_RE = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i;

export function validateEmail(input: string): string | null {
  const value = input.trim();
  if (!value) return "Email is required.";
  if (value.length > 191) return "Email is too long.";
  if (/\s/.test(value)) return "Remove the spaces.";
  const parts = value.split("@");
  if (parts.length !== 2) return "Use one @, like name@company.com";
  const [local, domain] = parts;
  if (!local) return "Add your name before the @.";
  if (local.length > 64) return "Email is too long.";
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return "Check the dots in your email.";
  if (!domain || !EMAIL_DOMAIN_RE.test(domain)) return "Check the part after the @.";
  return null;
}

// ── Name and plain text ──────────────────────────────────────────────────────

export function validateName(input: string): string | null {
  const value = input.trim();
  if (!value) return "Name is required.";
  if (value.length < 2) return "Enter at least 2 characters.";
  if (value.length > 100) return "Name is too long.";
  if (/\p{N}/u.test(value)) return "Name can't contain numbers.";
  if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(value)) return "Use letters only.";
  return null;
}

function validateText(input: string, label: string, max: number): string | null {
  const value = input.trim();
  if (!value) return `${label} is required.`;
  if (value.length < 2) return "Enter at least 2 characters.";
  if (value.length > max) return `Keep it under ${max} characters.`;
  return null;
}

// ── Whole forms ──────────────────────────────────────────────────────────────

const MESSAGE_MAX = 2000;

/** Field name → error for the homepage enquiry form. Empty object means valid. */
export function validateHomepageEnquiry(data: FormData): FieldErrors {
  const value = (key: string) => String(data.get(key) ?? "");
  const errors: FieldErrors = {};
  const checks: [string, string | null][] = [
    ["name", validateName(value("name"))],
    ["phone", validateIndianMobile(value("phone"))],
    ["email", validateEmail(value("email"))],
    ["message", value("message").trim().length > MESSAGE_MAX ? `Keep it under ${MESSAGE_MAX} characters.` : null],
  ];
  for (const [field, error] of checks) if (error) errors[field] = error;
  return errors;
}

/** Field name → error for the Contact page form. Empty object means valid. */
export function validateContactEnquiry(data: FormData, otherLabel: string): FieldErrors {
  const value = (key: string) => String(data.get(key) ?? "");
  const services = data.getAll("service").map(String).filter(Boolean);
  const errors: FieldErrors = {};
  const checks: [string, string | null][] = [
    ["service", services.length ? null : "Select at least one service."],
    [
      "otherService",
      services.includes(otherLabel) ? validateText(value("otherService"), "The service you need", 200) : null,
    ],
    ["name", validateName(value("name"))],
    ["company", validateText(value("company"), "Company", 150)],
    ["phone", validateIndianMobile(value("phone"))],
    ["email", validateEmail(value("email"))],
    ["city", validateText(value("city"), "City / country", 150)],
    ["timeframe", value("timeframe").trim() ? null : "Pick when you'd like to start."],
    ["message", value("message").trim().length > MESSAGE_MAX ? `Keep it under ${MESSAGE_MAX} characters.` : null],
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
