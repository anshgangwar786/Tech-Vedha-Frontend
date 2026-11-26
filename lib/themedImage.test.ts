import { describe, expect, it } from "vitest";
import { hasPicture, themePictures } from "@/lib/themedImage";

describe("themePictures", () => {
  it("maps light to light mode and dark to dark mode", () => {
    expect(themePictures({ src: "/l.png", darkSrc: "/d.png", alt: "" })).toEqual({ light: "/l.png", dark: "/d.png" });
  });
  it("uses the only picture in both themes", () => {
    expect(themePictures({ src: "/l.png", alt: "" })).toEqual({ light: "/l.png", dark: "/l.png" });
    expect(themePictures({ src: "", darkSrc: "/d.png", alt: "" })).toEqual({ light: "/d.png", dark: "/d.png" });
  });
  it("has a picture when either theme has one", () => {
    expect(hasPicture({ src: "", darkSrc: "/d.png" })).toBe(true);
    expect(hasPicture({ src: "", darkSrc: "" })).toBe(false);
    expect(hasPicture(null)).toBe(false);
  });
});
