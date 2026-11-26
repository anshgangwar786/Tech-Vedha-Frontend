import { describe, expect, it } from "vitest";
import { mergeContent } from "@/lib/content/mergeContent";

// KEEP IN SYNC: identical in Tech-Vedha-Admin/lib/sitePages/mergeContent.test.ts.
const DEFAULTS = { card: { image: { src: "", alt: "", width: 0, height: 0 } } };
const IMG = "https://media.example.com/a.png";
const DARK = "https://media.example.com/a-dark.png";

describe("mergeContent — dark-mode images", () => {
  it("keeps a safe darkSrc even though the default image has no such key", () => {
    const out = mergeContent({ card: { image: { src: IMG, alt: "A", width: 10, height: 5, darkSrc: DARK } } }, DEFAULTS);
    expect(out.card.image).toMatchObject({ src: IMG, darkSrc: DARK });
  });

  it("drops an unsafe darkSrc", () => {
    const out = mergeContent({ card: { image: { src: IMG, alt: "", width: 1, height: 1, darkSrc: "javascript:alert(1)" } } }, DEFAULTS);
    expect(out.card.image).not.toHaveProperty("darkSrc");
  });

  it("clears an unsafe darkSrc when the default declares the key", () => {
    const defaults = { image: { src: "/a.png", alt: "", width: 1, height: 1, darkSrc: "" } };
    const out = mergeContent({ image: { src: IMG, alt: "", width: 1, height: 1, darkSrc: "bad url" } }, defaults);
    expect(out.image.darkSrc).toBe("");
  });

  it("keeps a dark-only picture (no light picture) with its alt text", () => {
    const out = mergeContent({ card: { image: { src: "", alt: "Dark", width: 0, height: 0, darkSrc: DARK } } }, DEFAULTS);
    expect(out.card.image).toEqual({ src: "", alt: "Dark", width: 0, height: 0, darkSrc: DARK });
  });

  it("falls back to the default image when neither picture is usable", () => {
    const out = mergeContent({ card: { image: { src: "bad url", alt: "", width: 0, height: 0, darkSrc: "also bad" } } }, DEFAULTS);
    expect(out.card.image).toEqual(DEFAULTS.card.image);
  });
});
