import { beforeEach, describe, expect, it, vi } from "vitest";

type AdminApi = typeof import("./adminApi");

async function load(env: Record<string, string> = {}): Promise<AdminApi> {
  for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v);
  vi.resetModules();
  return import("./adminApi");
}

beforeEach(() => {
  vi.stubEnv("MEDIA_HOSTNAMES", "");
});

describe("normalizeSecret / sharedSecret", () => {
  it("should strip quotes and whitespace", async () => {
    const api = await load({ REVALIDATE_SECRET: '  "s3cret"  ' });
    expect(api.sharedSecret()).toBe("s3cret");
    expect(api.normalizeSecret(null)).toBe("");
  });
});

describe("adminUrl / HAS_ADMIN", () => {
  it("should use a cleaned ADMIN_API_URL", async () => {
    const api = await load({ ADMIN_API_URL: "'https://admin.example.com//'" });
    expect(api.adminUrl("/api/x")).toBe("https://admin.example.com/api/x");
    expect(api.HAS_ADMIN).toBe(true);
  });

  it("should default to localhost:3000 outside production", async () => {
    const api = await load({ ADMIN_API_URL: "", NODE_ENV: "development" });
    expect(api.adminUrl("/api/x")).toBe("http://localhost:3000/api/x");
  });

  it("should have no admin in production when ADMIN_API_URL is unset", async () => {
    const api = await load({ ADMIN_API_URL: "", NODE_ENV: "production" });
    expect(api.HAS_ADMIN).toBe(false);
  });
});

describe("isAllowedImageSrc", () => {
  it("should allow site paths but not protocol-relative URLs", async () => {
    const api = await load();
    expect(api.isAllowedImageSrc("/home/hero.jpg")).toBe(true);
    expect(api.isAllowedImageSrc("//evil.com/x.jpg")).toBe(false);
  });

  it("should allow https URLs on configured media hosts, case-insensitively", async () => {
    const api = await load({ MEDIA_HOSTNAMES: " CDN.Example.com , other.net" });
    expect(api.isAllowedImageSrc("https://cdn.example.com/a.png")).toBe(true);
    expect(api.isAllowedImageSrc("https://other.net/a.png")).toBe(true);
  });

  it.each([
    "http://cdn.example.com/a.png",
    "https://evil.com/a.png",
    "https://cdn.example.com.evil.com/a.png",
    "javascript:alert(1)",
    "data:image/png;base64,AAAA",
    'https://cdn.example.com/a.png"onerror="x',
    "/a b.png",
    "",
    "not a url",
  ])("should reject %j", async (src) => {
    const api = await load({ MEDIA_HOSTNAMES: "cdn.example.com" });
    expect(api.isAllowedImageSrc(src)).toBe(false);
  });
});
