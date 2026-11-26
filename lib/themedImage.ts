/** An image from the admin: light-mode picture (`src`), optional dark-mode picture, and the part kept when cropped. */
export type ThemedImageValue = { src: string; alt: string; darkSrc?: string; focus?: string };

/** True when the image has a picture for either theme (otherwise the card shows its drawing). */
export const hasPicture = (image: { src?: string; darkSrc?: string } | null | undefined): boolean =>
  Boolean(image && (image.src?.trim() || image.darkSrc?.trim()));

/** The picture for each theme: its own, or the other theme's when only one is set. */
export function themePictures(image: ThemedImageValue): { light: string; dark: string } {
  const light = image.src.trim();
  const dark = image.darkSrc?.trim() ?? "";
  return { light: light || dark, dark: dark || light };
}
