import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const { revalidateTagMock, revalidatePathMock } = vi.hoisted(() => ({
  revalidateTagMock: vi.fn(),
  revalidatePathMock: vi.fn(),
}));
vi.mock("next/cache", () => ({ revalidateTag: revalidateTagMock, revalidatePath: revalidatePathMock }));

import { POST } from "./route";

const call = (body: unknown, secret: string | null = "test-shared-secret") =>
  POST(
    new NextRequest("https://site.example.com/api/revalidate", {
      method: "POST",
      headers: secret === null ? {} : { "x-revalidate-secret": secret },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );

beforeEach(() => {
  revalidateTagMock.mockReset();
  revalidatePathMock.mockReset();
});

describe("POST /api/revalidate", () => {
  it("should expire each tag and the root layout when the secret matches", async () => {
    // Act
    const res = await call({ tags: ["homepage", "service-web_dev"] });

    // Assert
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true, revalidated: ["homepage", "service-web_dev"] });
    expect(revalidateTagMock).toHaveBeenCalledWith("homepage", { expire: 0 });
    expect(revalidateTagMock).toHaveBeenCalledWith("service-web_dev", { expire: 0 });
    expect(revalidatePathMock).toHaveBeenCalledWith("/", "layout");
  });

  it("should accept a quoted secret header", async () => {
    expect((await call({ tags: ["a"] }, '"test-shared-secret"')).status).toBe(200);
  });

  it.each([["wrong"], [""], [null]])("should return 401 for secret %j without revalidating", async (secret) => {
    const res = await call({ tags: ["a"] }, secret);
    expect(res.status).toBe(401);
    expect(revalidateTagMock).not.toHaveBeenCalled();
  });

  it("should fail closed when the server has no secret configured", async () => {
    vi.stubEnv("REVALIDATE_SECRET", "");
    expect((await call({ tags: ["a"] }, "")).status).toBe(401);
  });

  it.each([
    ["missing tags", {}],
    ["empty list", { tags: [] }],
    ["not an array", { tags: "homepage" }],
    ["non-string tag", { tags: [1] }],
    ["bad characters", { tags: ["../etc"] }],
    ["space in tag", { tags: ["home page"] }],
    ["tag too long", { tags: ["a".repeat(101)] }],
    ["too many tags", { tags: Array.from({ length: 51 }, (_, i) => `t${i}`) }],
  ])("should return 400 for %s", async (_label, body) => {
    const res = await call(body);
    expect(res.status).toBe(400);
    expect(revalidateTagMock).not.toHaveBeenCalled();
  });

  it("should return 400 for a malformed JSON body", async () => {
    expect((await call("{oops")).status).toBe(400);
  });

  it("should accept exactly 50 tags of 100 characters", async () => {
    const tags = Array.from({ length: 50 }, (_, i) => `${i}`.padEnd(100, "a"));
    expect((await call({ tags })).status).toBe(200);
  });
});
