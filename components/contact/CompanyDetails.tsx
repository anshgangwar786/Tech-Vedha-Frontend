import { Glyph } from "@/components/contact/icons";
import SectionHeading from "@/components/contact/SectionHeading";
import { BRAND_GRADIENT, MICRO, SECTION_TIGHT } from "@/components/ui/styles";
import { COMPANY, DIRECTIONS_URL } from "@/data/contact";
import { WHATSAPP_URL } from "@/lib/site";
import { cx } from "@/lib/cx";

/* Stylised street map from the Figma frame (834 × 440), drawn as one SVG so it costs no requests. */
const ROADS_H = [90, 230, 350];
const ROADS_V = [120, 330, 560, 720];
const BLOCKS = [
  [150, 120, 160, 90],
  [360, 24, 180, 52],
  [590, 120, 110, 92],
  [150, 380, 160, 50],
  [750, 260, 120, 72],
  [20, 124, 84, 90],
];
const RIVER =
  "M0 60C120 20 220 100 360 70C500 40 600 10 720 50C840 90 860 90 900 70V110C800 120 700 80 600 95C500 110 380 120 260 100C140 80 80 80 0 100V60Z";

function StreetMap() {
  return (
    <svg aria-hidden viewBox="0 0 834 440" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
      <g className="fill-white dark:fill-line">
        {ROADS_H.map((y) => (
          <rect key={`h${y}`} x={0} y={y} width={834} height={14} />
        ))}
        {ROADS_V.map((x) => (
          <rect key={`v${x}`} x={x} y={0} width={14} height={438} />
        ))}
      </g>
      <path d={RIVER} transform="translate(0 250)" className="fill-[#7cc4fa]/45 dark:fill-[#4db2ff]/18" />
      <g className="fill-white dark:fill-line">
        <rect x={380} y={-40} width={14} height={560} transform="rotate(28 387 240)" />
        <rect x={180} y={-60} width={10} height={560} transform="rotate(-24 185 220)" opacity={0.8} />
      </g>
      <g className="fill-bg dark:fill-[#081a38]" opacity={0.9}>
        {BLOCKS.map(([x, y, width, height]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={width} height={height} rx={8} />
        ))}
      </g>
    </svg>
  );
}

/** "Find us, and everything procurement needs": office map, office card and registration details. */
export default function CompanyDetails() {
  return (
    <section aria-labelledby="company-title" className={cx("defer-render bg-bg", SECTION_TIGHT)}>
      <div className="container-site">
        <SectionHeading
          id="company-title"
          eyebrow="Office and company details"
          title="Find us, and everything"
          highlight="procurement needs."
          breakBeforeHighlight
          intro="Vendor registration paperwork is shared on request."
          introClassName="max-w-[350px]"
        />

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div data-reveal="left" className="reveal relative isolate h-[340px] overflow-hidden rounded-3xl border border-line bg-[#eef4fc] sm:h-[440px] dark:bg-surface">
            <StreetMap />
            <div className="absolute top-[19.5%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5">
              <p className="flex items-center gap-2.5 rounded-[14px] border border-line bg-surface px-3.5 py-2.5 drop-shadow-[0_30px_30px_rgb(20_70_224/0.25)] dark:drop-shadow-[0_30px_30px_rgb(0_0_0/0.6)]">
                <span
                  aria-hidden
                  className={cx("grid size-[30px] place-items-center rounded-lg font-display text-[10px] font-semibold tracking-[0.05em] text-white", BRAND_GRADIENT)}
                >
                  TV
                </span>
                <span className="flex min-w-28 flex-col whitespace-nowrap">
                  <span className="text-[13px] font-medium text-fg">Tech Vedha office</span>
                  <span className="text-xs text-brand">{COMPANY.addressShort}</span>
                </span>
              </p>
              <span
                aria-hidden
                className="grid size-11 place-items-center rounded-full bg-primary text-white shadow-[0_0_0_10px_rgb(30_155_240/0.18)]"
              >
                <Glyph name="pin" className="size-5" />
              </span>
            </div>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-[26px] left-6 flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium text-fg transition-colors duration-250 hover:border-brand"
            >
              <Glyph name="navigation" className="size-[15px]" />
              Get directions
            </a>
          </div>

          <div data-reveal-stagger className="flex flex-col gap-5">
            <address className="flex flex-col gap-3 rounded-3xl border border-line bg-surface px-[26px] py-6 not-italic">
              <div className="flex items-center gap-3.5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-raised text-brand">
                  <Glyph name="pin" className="size-[18px]" />
                </span>
                <span className="flex flex-col">
                  <span className={MICRO}>Our office</span>
                  <span className="text-[17px] font-medium text-fg">{COMPANY.city}</span>
                </span>
              </div>
              <p className="flex items-center gap-2.5 text-sm font-medium text-brand">
                <Glyph name="building" className="size-[15px]" />
                {COMPANY.address}
              </p>
              <p className="flex items-center gap-2.5 text-sm font-medium text-fg-muted">
                <Glyph name="clock" className="size-[15px]" />
                {COMPANY.hours}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-fit items-center gap-2.5 text-sm font-medium text-brand hover:underline"
              >
                <Glyph name="chat" className="size-[15px]" />
                Prefer WhatsApp? Message us anytime
              </a>
            </address>

            <div className="rounded-3xl border border-line bg-surface px-[26px] py-6">
              <h3 className="flex items-center gap-2.5 pb-2.5 text-base font-medium text-fg">
                <Glyph name="file" className="size-[17px]" />
                For procurement teams
              </h3>
              <dl>
                {COMPANY.registration.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 border-t border-line py-3 text-sm">
                    <dt className="text-fg-muted">{row.label}</dt>
                    <dd className="text-right font-medium text-brand">{row.value ?? "To add"}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
