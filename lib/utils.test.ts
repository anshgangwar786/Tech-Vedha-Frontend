import { describe, expect, it, vi } from "vitest";
import type React from "react";
import { arrowTarget, externalLinkProps, mailtoHref, revealDelay, stepNumber } from "./utils";

const key = (k: string) => ({ key: k, preventDefault: vi.fn() }) as unknown as React.KeyboardEvent;

describe("stepNumber", () => {
  it.each([
    [0, "01"],
    [8, "09"],
    [9, "10"],
    [99, "100"],
  ])("should format index %i as %j", (i, expected) => {
    expect(stepNumber(i)).toBe(expected);
  });
});

describe("externalLinkProps", () => {
  it("should open http(s) links in a new tab safely", () => {
    expect(externalLinkProps("https://x.com")).toEqual({ target: "_blank", rel: "noopener noreferrer" });
  });

  it.each(["/about", "mailto:a@b.co", "tel:+91", "#top"])("should keep %j in place", (href) => {
    expect(externalLinkProps(href)).toEqual({});
  });
});

describe("arrowTarget", () => {
  it("should move forward and wrap at the end", () => {
    expect(arrowTarget(key("ArrowRight"), 0, 3)).toBe(1);
    expect(arrowTarget(key("ArrowDown"), 2, 3)).toBe(0);
  });

  it("should move backward and wrap at the start", () => {
    expect(arrowTarget(key("ArrowLeft"), 0, 3)).toBe(2);
    expect(arrowTarget(key("ArrowUp"), 1, 3)).toBe(0);
  });

  it("should prevent page scroll only for arrow keys", () => {
    const arrow = key("ArrowRight");
    const enter = key("Enter");
    arrowTarget(arrow, 0, 2);
    expect(arrowTarget(enter, 0, 2)).toBeNull();
    expect(arrow.preventDefault).toHaveBeenCalled();
    expect(enter.preventDefault).not.toHaveBeenCalled();
  });

  it("should stay on the only tab when there is one", () => {
    expect(arrowTarget(key("ArrowRight"), 0, 1)).toBe(0);
  });
});

describe("mailtoHref", () => {
  it("should encode subject and body", () => {
    expect(mailtoHref("a@b.co", "Hi & bye", "Line 1\nLine 2?")).toBe(
      "mailto:a@b.co?subject=Hi%20%26%20bye&body=Line%201%0ALine%202%3F",
    );
  });
});

describe("revealDelay", () => {
  it("should set the --rd custom property in ms", () => {
    expect(revealDelay(120)).toEqual({ "--rd": "120ms" });
  });
});
