"use server";

import { headers } from "next/headers";
import { ADMIN_TIMEOUT_MS, HAS_ADMIN, adminUrl, sharedSecret } from "@/lib/adminApi";

/**
 * Sends an enquiry form to Tech-Vedha-Admin (POST /api/lead/<kind>), which saves it under Leads and emails the team.
 * `ok: false` with `fallback: true` means the admin could not be reached: the form then falls back to the visitor's
 * email app, as before, so no enquiry is lost.
 */
export type EnquiryResult = { ok: boolean; message: string; fallback?: boolean; fieldErrors?: Record<string, string> };

export async function sendEnquiry(kind: "homepage" | "contact", formData: FormData): Promise<EnquiryResult> {
  const secret = sharedSecret();
  if (!HAS_ADMIN || !secret) return { ok: false, message: "", fallback: true };

  const head = await headers();
  const ip = head.get("x-forwarded-for")?.split(",")[0]?.trim() || head.get("x-real-ip") || "";

  try {
    const res = await fetch(adminUrl(`/api/lead/${kind === "contact" ? "contact" : "homepage"}`), {
      method: "POST",
      body: formData,
      headers: { "x-revalidate-secret": secret, ...(ip && { "x-site-client-ip": ip }) },
      cache: "no-store",
      signal: AbortSignal.timeout(ADMIN_TIMEOUT_MS + 5_000),
    });
    const body = (await res.json().catch(() => null)) as { ok?: unknown; message?: unknown; fieldErrors?: unknown } | null;
    const message = typeof body?.message === "string" ? body.message : "";
    const fieldErrors =
      body?.fieldErrors && typeof body.fieldErrors === "object"
        ? Object.fromEntries(
            Object.entries(body.fieldErrors as Record<string, unknown>).filter(([, v]) => typeof v === "string"),
          ) as Record<string, string>
        : undefined;
    // Validation and rate-limit answers are shown to the visitor; anything else falls back to email.
    if (res.ok && body?.ok === true) return { ok: true, message };
    if (res.status === 400 || res.status === 429) return { ok: false, message, fieldErrors };
    throw new Error(`HTTP ${res.status}`);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(`[enquiry] admin unavailable, falling back to email: ${reason}`);
    return { ok: false, message: "", fallback: true };
  }
}
