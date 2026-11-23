/** Title copy where each entry renders on its own line at desktop widths. */
export default function TitleLines({ lines }: { lines: string[] }) {
  return lines.map((line, index) => (
    <span key={line} className="md:block">
      {line}
      {index < lines.length - 1 && " "}
    </span>
  ));
}
