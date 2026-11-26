import Image, { type ImageProps } from "next/image";
import { cx } from "@/lib/cx";

/** An image from the admin: its picture, plus an optional one for dark mode and the part kept when cropped. */
export type ThemedImageValue = { src: string; alt: string; darkSrc?: string; focus?: string };

type ThemedImageProps = Omit<ImageProps, "src" | "alt"> & { image: ThemedImageValue };

/** CSS object-position for the admin's "Focus" choice ("upper" keeps faces in portrait crops). */
const focusPosition = (focus?: string) =>
  !focus || focus === "center" ? undefined : focus === "upper" ? "center 20%" : focus;

/**
 * An uploaded picture with an optional dark-mode version (Image → "Dark mode image" in the admin). With a dark
 * version both are rendered and the theme picks one by CSS, so the right picture shows without a flash on load.
 */
export default function ThemedImage({ image, className, style, ...props }: ThemedImageProps) {
  const position = focusPosition(image.focus);
  const imageStyle = position ? { ...style, objectPosition: position } : style;
  const dark = image.darkSrc?.trim();
  if (!dark || dark === image.src) {
    return <Image {...props} src={image.src} alt={image.alt} className={className} style={imageStyle} />;
  }
  return (
    <>
      <Image {...props} src={image.src} alt={image.alt} className={cx(className, "dark:hidden")} style={imageStyle} />
      <Image {...props} src={dark} alt={image.alt} className={cx(className, "hidden dark:block")} style={imageStyle} />
    </>
  );
}
