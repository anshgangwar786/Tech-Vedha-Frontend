/** Title copy where each entry renders on its own line at desktop widths. Blank lines (e.g. cleared in the admin) are skipped. */
export default function TitleLines({ lines }: { lines: string[] }) {
  const shown = lines.filter((line) => line.trim());
  return shown.map((line, index) => (
    <span key={index} className="md:block">
      {line}
      {index < shown.length - 1 && " "}
    </span>
  ));
}
