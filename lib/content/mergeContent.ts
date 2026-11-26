// Merges CMS-edited page content over the bundled defaults.
//
// KEEP IN SYNC: this file is identical in Tech-Vedha-Admin/lib/sitePages/mergeContent.ts
// and Tech-Vedha-frontend/lib/content/mergeContent.ts.
//
// The bundled copy of each CMS-driven page (data/about.ts, data/contactPage.ts,
// data/joinPage.ts) is both its fallback content and its schema: the admin
// editor renders one field per default value, and the saved document is
// merged back over the defaults here, value by value:
//
//   • a value of the wrong type, an unsafe image URL or an unknown key is
//     dropped and the default kept, so a bad or partial save never breaks a page;
//   • lists take the saved length (items can be added and removed), each item
//     merged over the default item at the same index (or the first one);
//   • `locked` paths always keep the default (e.g. form options that the
//     server validates against a fixed list);
//   • a list whose default is empty takes its item shape from `templates`
//     (keyed by path pattern), so it can start empty and still be added to.
//
// prepareDefaults() first makes optional fields explicit, so the editor can
// show them: every Copy ({ text, short? }) gets `short`, every section header
// gets `introShort`, every image gets `focus`, and every item of a list gets
// the keys any of its siblings has (e.g. a role's `lead` flag).

export type PlainObject = Record<string, unknown>;

export const MAX_STRING_LENGTH = 5000;
export const MAX_LIST_LENGTH = 60;

export function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** An image: { src, alt, width, height, focus?, darkSrc? } (darkSrc = picture shown in dark mode instead). */
export function isImageValue(value: unknown): value is PlainObject {
  return (
    isPlainObject(value) &&
    typeof value.src === "string" &&
    typeof value.alt === "string" &&
    typeof value.width === "number" &&
    typeof value.height === "number"
  );
}

/** Copy that phones may shorten: { text, short? }. */
export function isCopyValue(value: unknown): value is PlainObject {
  return (
    isPlainObject(value) &&
    typeof value.text === "string" &&
    Object.keys(value).every((key) => key === "text" || key === "short")
  );
}

/** Section header: { eyebrow, heading, intro, introShort? }. */
export function isSectionCopyValue(value: unknown): value is PlainObject {
  return isPlainObject(value) && typeof value.eyebrow === "string" && isPlainObject(value.heading) && "intro" in value;
}

/** Keys whose string value may also be null (null = "not shown on phones"). */
const NULLABLE_KEYS = new Set(["introShort"]);

/** Root-relative path or http(s) URL, without characters that could break out of an attribute or CSS. */
export function isSafeUrl(value: string): boolean {
  if (!value || /[\s"'<>\\`]/.test(value)) return false;
  if (value.startsWith("/")) return !value.startsWith("//");
  return /^https?:\/\/[^/]+/i.test(value);
}

/** An empty value of the same shape (new list items in the editor start from this). */
export function blankLike(value: unknown): unknown {
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return [];
  if (isPlainObject(value)) {
    if (isImageValue(value)) return { ...value };
    return Object.fromEntries(Object.entries(value).map(([key, v]) => [key, blankLike(v)]));
  }
  return value ?? null;
}

/** Deep copy with optional fields made explicit (see the header comment). */
export function prepareDefaults<T>(value: T): T {
  return prepare(value) as T;
}

/** For a list of (non-image) objects: a function that adds the keys any of them has to each one. */
function unionFiller(items: unknown[]): ((item: unknown) => unknown) | null {
  if (items.length < 2 || !items.every((item) => isPlainObject(item) && !isImageValue(item))) return null;
  const union: PlainObject = {};
  for (const item of items as PlainObject[]) {
    for (const [key, v] of Object.entries(item)) if (!(key in union)) union[key] = v;
  }
  return (item) => {
    const obj = item as PlainObject;
    const filled: PlainObject = {};
    for (const [key, v] of Object.entries(union)) filled[key] = key in obj ? obj[key] : blankLike(v);
    return filled;
  };
}

function prepare(value: unknown): unknown {
  if (Array.isArray(value)) {
    const items = value.map(prepare);
    // Give every object item the keys any sibling has — across nested lists
    // too (e.g. the rows of role chips share one item shape).
    if (items.length > 0 && items.every(Array.isArray)) {
      const fill = unionFiller((items as unknown[][]).flat());
      return fill ? (items as unknown[][]).map((row) => row.map(fill)) : items;
    }
    const fill = unionFiller(items);
    return fill ? items.map(fill) : items;
  }
  if (!isPlainObject(value)) return value;

  const out: PlainObject = {};
  for (const [key, v] of Object.entries(value)) out[key] = prepare(v);
  if (isImageValue(out) && typeof out.focus !== "string") out.focus = "center";
  if (isCopyValue(out) && typeof out.short !== "string") out.short = "";
  if (isSectionCopyValue(out) && !("introShort" in out)) out.introShort = "";
  return out;
}

/** Path of a value with list indexes written as "[]", e.g. "hero.mission.services[].icon". */
export function patternOf(path: (string | number)[]): string {
  let out = "";
  for (const part of path) out += typeof part === "number" ? "[]" : out ? `.${part}` : part;
  return out;
}

/** Item shape of lists whose default is empty, keyed by path pattern (e.g. "added"). */
export type ListTemplates = Readonly<Record<string, unknown>>;

/**
 * `raw` (the saved document) merged over `defaults`. `defaults` should come
 * from prepareDefaults(). `locked` lists dotted paths (with "[]" for list
 * items) that always keep their default. `templates` gives the item shape of
 * lists that are empty by default.
 */
export function mergeContent<T>(
  raw: unknown,
  defaults: T,
  locked: readonly string[] = [],
  templates: ListTemplates = {},
): T {
  const lockedSet = new Set(locked);
  return merge(raw, defaults, [], lockedSet, undefined, templates) as T;
}

function merge(
  raw: unknown,
  def: unknown,
  path: (string | number)[],
  locked: Set<string>,
  key: string | undefined,
  templates: ListTemplates,
): unknown {
  if (locked.has(patternOf(path))) return def;

  if (def === null) {
    if (raw === null) return null;
    return typeof raw === "string" ? raw.slice(0, MAX_STRING_LENGTH) : null;
  }
  if (typeof def === "string") {
    if (typeof raw === "string") return raw.slice(0, MAX_STRING_LENGTH);
    if (raw === null && key !== undefined && NULLABLE_KEYS.has(key)) return null;
    return def;
  }
  if (typeof def === "number") return typeof raw === "number" && Number.isFinite(raw) ? raw : def;
  if (typeof def === "boolean") return typeof raw === "boolean" ? raw : def;

  if (Array.isArray(def)) {
    if (!Array.isArray(raw)) return def;
    const template = def.length ? def[0] : templates[patternOf(path)];
    if (template === undefined) return def; // no schema for the items
    // A list whose items hold locked values (ids, icons, links) keeps the default length: each saved item is
    // merged over the default at the same position, and missing ones keep the default.
    const itemPrefix = `${patternOf(path)}[]`;
    if (def.length && [...locked].some((p) => p === itemPrefix || p.startsWith(`${itemPrefix}.`))) {
      return def.map((item, i) => merge(raw[i], item, [...path, i], locked, undefined, templates));
    }
    return raw
      .slice(0, MAX_LIST_LENGTH)
      .map((item, i) => merge(item, def[i] ?? template, [...path, i], locked, undefined, templates));
  }

  if (isPlainObject(def)) {
    if (!isPlainObject(raw)) return def;
    const out: PlainObject = {};
    for (const [k, v] of Object.entries(def)) {
      out[k] = k in raw ? merge(raw[k], v, [...path, k], locked, k, templates) : v;
    }
    if (isImageValue(def)) {
      // An image with an unusable URL falls back to the default image.
      if (typeof out.src !== "string" || !isSafeUrl(out.src)) return def;
      // Optional dark-mode picture: kept when it is a safe URL (even where the default has no such key).
      const dark = raw.darkSrc;
      if (typeof dark === "string" && dark && isSafeUrl(dark)) out.darkSrc = dark.slice(0, MAX_STRING_LENGTH);
      else if ("darkSrc" in out) out.darkSrc = "";
    }
    return out;
  }

  return def;
}

/**
 * The homepage used to be saved as six flat lists; it is now grouped by page section. A document saved in the
 * old shape has its lists moved into their sections (a section already in the new shape wins), so nothing saved
 * before the change is lost. Any other document is returned unchanged.
 */
export function upgradeLegacyHome(raw: unknown): unknown {
  if (!isPlainObject(raw)) return raw;
  const moves: [legacy: string, section: string, key: string][] = [
    ["securityLayers", "security", "layers"],
    ["processSteps", "process", "steps"],
    ["stories", "stories", "items"],
    ["faqs", "faq", "items"],
    ["promises", "why", "promises"],
  ];
  const out: PlainObject = { ...raw };
  let changed = false;
  for (const [legacy, section, key] of moves) {
    if (!Array.isArray(raw[legacy])) continue;
    const target = isPlainObject(out[section]) ? { ...(out[section] as PlainObject) } : {};
    if (!(key in target)) target[key] = raw[legacy];
    out[section] = target;
    if (legacy !== section) delete out[legacy];
    changed = true;
  }
  if (Array.isArray(raw.qualityGates)) {
    const pillars = isPlainObject(out.pillars) ? { ...(out.pillars as PlainObject) } : {};
    const quality = isPlainObject(pillars.quality) ? { ...(pillars.quality as PlainObject) } : {};
    if (!("gates" in quality)) quality.gates = raw.qualityGates;
    out.pillars = { ...pillars, quality };
    delete out.qualityGates;
    changed = true;
  }
  return changed ? out : raw;
}
