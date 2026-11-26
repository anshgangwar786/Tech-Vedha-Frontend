import Image, { type ImageProps } from "next/image";
import { cx } from "@/lib/cx";
import { themePictures, type ThemedImageValue } from "@/lib/themedImage";

export type { ThemedImageValue };

type ThemedImageProps = Omit<ImageProps, "src" | "alt"> & { image: ThemedImageValue };

/** CSS object-position for the admin's "Focus" choice ("upper" keeps faces in portrait crops). */
const focusPosition = (focus?: string) =>
  !focus || focus === "center" ? undefined : focus === "upper" ? "center 20%" : focus;

/**
 * An uploaded picture with separate light- and dark-mode versions (admin: "Light mode image" / "Dark mode image").
 * Light mode shows the light picture, dark mode the dark one; when only one is set it is used in both themes.
 * With two pictures both are rendered and the theme picks one by CSS, so the right one shows without a flash.
 */
export default function ThemedImage({ image, className, style, ...props }: ThemedImageProps) {
  const position = focusPosition(image.focus);
  const imageStyle = position ? { ...style, objectPosition: position } : style;
  const { light, dark } = themePictures(image);
  if (!light) return null;
  if (light === dark) {
    return <Image {...props} src={light} alt={image.alt} className={className} style={imageStyle} />;
  }
  return (
    <>
      <Image {...props} src={light} alt={image.alt} className={cx(className, "dark:hidden")} style={imageStyle} />
      <Image {...props} src={dark} alt={image.alt} className={cx(className, "hidden dark:block")} style={imageStyle} />
    </>
  );
}
