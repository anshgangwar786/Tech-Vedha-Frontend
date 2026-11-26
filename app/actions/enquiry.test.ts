import { beforeEach, describe, expect, it, vi } from "vitest";

const { headersMock } = vi.hoisted(() => ({ headersMock: vi.fn() }));
vi.mock("next/headers", () => ({ headers: headersMock }));

const fetchMock = vi.fn();
const jsonResponse = (status: number, body: unknown) =>
  ({ ok: status >= 200 && status < 300, status, json: async () => body }) as Response;

// lib/adminApi reads ADMIN_API_URL at import time, so load the action fresh per test.
async function loadAction() {
  vi.resetModules();
  return (await import("./enquiry")).sendEnquiry;
}

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  vi.stubEnv("ADMIN_API_URL", "https://admin.example.com/");
  headersMock.mockResolvedValue(new Headers({ "x-forwarded-for": "203.0.113.7, 10.0.0.1" }));
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("sendEnquiry", () => {
  it("should post the form to the matching admin endpoint with the secret and client IP", async () => {
    // Arrange
    const sendEnquiry = await loadAction();
    fetchMock.mockResolvedValue(jsonResponse(200, { ok: true, message: "Thanks!" }));
    const fd = new FormData();
    fd.set("name", "Ravi");

    // Act
    const result = await sendEnquiry("contact", fd);

    // Assert
    expect(result).toEqual({ ok: true, message: "Thanks!" });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://admin.example.com/api/lead/contact",
      expect.objectContaining({
        method: "POST",
        body: fd,
        cache: "no-store",
        headers: { "x-revalidate-secret": "test-shared-secret", "x-site-client-ip": "203.0.113.7" },
      }),
    );
  });

  it("should route the homepage form to /api/lead/homepage and omit the IP header when unknown", async () => {
    const sendEnquiry = await loadAction();
    headersMock.mockResolvedValue(new Headers());
    fetchMock.mockResolvedValue(jsonResponse(200, { ok: true }));

    await sendEnquiry("homepage", new FormData());

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://admin.example.com/api/lead/homepage");
    expect(init.headers).not.toHaveProperty("x-site-client-ip");
  });

  it.each([400, 429])("should show the admin's message and string field errors for HTTP %i", async (status) => {
    const sendEnquiry = await loadAction();
    fetchMock.mockResolvedValue(
      jsonResponse(status, { ok: false, message: "Check the fields", fieldErrors: { phone: "Must be 10 digits.", junk: 5 } }),
    );

    expect(await sendEnquiry("homepage", new FormData())).toEqual({
      ok: false,
      message: "Check the fields",
      fieldErrors: { phone: "Must be 10 digits." },
    });
  });

  it.each([
    ["a 500 response", () => fetchMock.mockResolvedValue(jsonResponse(500, { ok: false }))],
    ["a 200 without ok:true", () => fetchMock.mockResolvedValue(jsonResponse(200, { message: "?" }))],
    ["a network error", () => fetchMock.mockRejectedValue(new TypeError("fetch failed"))],
    ["a timeout", () => fetchMock.mockRejectedValue(Object.assign(new Error("t"), { name: "TimeoutError" }))],
    [
      "a non-JSON body",
      () => fetchMock.mockResolvedValue({ ok: true, status: 200, json: async () => { throw new SyntaxError("bad"); } } as unknown as Response),
    ],
  ])("should fall back to email on %s", async (_label, arrange) => {
    const sendEnquiry = await loadAction();
    arrange();

    expect(await sendEnquiry("contact", new FormData())).toEqual({ ok: false, message: "", fallback: true });
  });

  it("should fall back without calling the admin when the shared secret is missing", async () => {
    vi.stubEnv("REVALIDATE_SECRET", "");
    const sendEnquiry = await loadAction();

    expect(await sendEnquiry("contact", new FormData())).toEqual({ ok: false, message: "", fallback: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("should fall back without calling the admin in a production build with no ADMIN_API_URL", async () => {
    vi.stubEnv("ADMIN_API_URL", "");
    vi.stubEnv("NODE_ENV", "production");
    const sendEnquiry = await loadAction();

    expect((await sendEnquiry("homepage", new FormData())).fallback).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
