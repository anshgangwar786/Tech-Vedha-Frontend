/** Top-of-section light: a soft radial wash plus a fading accent hairline along the top edge. */
export default function SectionGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(55%_70%_at_50%_0%,rgb(30_120_240/0.16),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-linear-to-r from-transparent via-accent/22 to-transparent"
      />
    </>
  );
}
