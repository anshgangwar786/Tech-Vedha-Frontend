// Logos of the tools in a service page's "Tech stack". Tools are typed by name in the admin; a name found here shows
// its logo (and brand colour), any other name shows a letter badge. Names are matched without regard to case.

import { media } from "@/data/media";
import type { IconType } from "react-icons";
import { FaAws, FaLinkedin } from "react-icons/fa";
import {
  SiBrevo,
  SiBuffer,
  SiCypress,
  SiDocker,
  SiFacebook,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiGithubactions,
  SiGo,
  SiGoogleads,
  SiGoogleanalytics,
  SiGooglecloud,
  SiGooglesearchconsole,
  SiGoogletagmanager,
  SiGraphql,
  SiHotjar,
  SiHubspot,
  SiInstagram,
  SiJest,
  SiKotlin,
  SiKubernetes,
  SiLooker,
  SiMailchimp,
  SiMeta,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSemrush,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
  SiWhatsapp,
  SiYoutube,
  SiZapier,
} from "react-icons/si";

/**
 * A tool as the tech-stack grid draws it. `color` is the brand colour (omitted for monochrome logos). Logos missing from
 * react-icons use `image` (a full-colour SVG in /public); unknown tools get `initials`.
 */
export type TechTool = { name: string; color?: string } & ({ icon: IconType } | { image: string } | { initials: string });

type Logo = { icon: IconType; color?: string } | { image: string; color?: string };

/** Every tool with a logo, by lower-case name. */
const TOOL_LOGOS: ReadonlyMap<string, Logo> = new Map<string, Logo>([
  ["swift", { icon: SiSwift, color: "#f05138" }],
  ["kotlin", { icon: SiKotlin, color: "#7f52ff" }],
  ["flutter", { icon: SiFlutter, color: "#29b6f6" }],
  ["react native", { icon: SiReact, color: "#61dafb" }],
  ["react", { icon: SiReact, color: "#61dafb" }],
  ["next.js", { icon: SiNextdotjs }],
  ["typescript", { icon: SiTypescript, color: "#3178c6" }],
  ["tailwind", { icon: SiTailwindcss, color: "#06b6d4" }],
  ["node.js", { icon: SiNodedotjs, color: "#5fa04e" }],
  ["python", { icon: SiPython, color: "#3776ab" }],
  ["go", { icon: SiGo, color: "#00add8" }],
  ["graphql", { icon: SiGraphql, color: "#e10098" }],
  ["postgresql", { icon: SiPostgresql, color: "#4169e1" }],
  ["mongodb", { icon: SiMongodb, color: "#47a248" }],
  ["redis", { icon: SiRedis, color: "#ff4438" }],
  ["firebase", { icon: SiFirebase, color: "#ffca28" }],
  ["aws", { icon: FaAws, color: "#ff9900" }],
  ["google cloud", { icon: SiGooglecloud, color: "#4285f4" }],
  ["docker", { icon: SiDocker, color: "#2496ed" }],
  ["kubernetes", { icon: SiKubernetes, color: "#326ce5" }],
  ["figma", { icon: SiFigma, color: "#f24e1e" }],
  ["jest", { icon: SiJest, color: "#c21325" }],
  ["cypress", { icon: SiCypress }],
  ["gh actions", { icon: SiGithubactions, color: "#2088ff" }],
  ["search console", { icon: SiGooglesearchconsole, color: "#458cf5" }],
  ["semrush", { icon: SiSemrush, color: "#ff642d" }],
  ["business profile", { image: media("/tools/google-business-profile.svg"), color: "#4285f4" }],
  ["ga4", { icon: SiGoogleanalytics, color: "#e37400" }],
  ["google ads", { icon: SiGoogleads, color: "#4285f4" }],
  ["meta ads", { icon: SiMeta, color: "#0467df" }],
  ["youtube ads", { icon: SiYoutube, color: "#ff0000" }],
  ["linkedin ads", { icon: FaLinkedin, color: "#0a66c2" }],
  ["instagram", { icon: SiInstagram, color: "#e4405f" }],
  ["facebook", { icon: SiFacebook, color: "#0866ff" }],
  ["canva", { image: media("/tools/canva.svg"), color: "#00c4cc" }],
  ["buffer", { icon: SiBuffer }],
  ["mailchimp", { icon: SiMailchimp, color: "#ffe01b" }],
  ["brevo", { icon: SiBrevo, color: "#0b996e" }],
  ["hubspot", { icon: SiHubspot, color: "#ff7a59" }],
  ["zapier", { icon: SiZapier, color: "#ff4f00" }],
  ["whatsapp api", { icon: SiWhatsapp, color: "#25d366" }],
  ["broadcasts", { icon: SiWhatsapp, color: "#25d366" }],
  ["crm sync", { icon: SiHubspot, color: "#ff7a59" }],
  ["automations", { icon: SiZapier, color: "#ff4f00" }],
  ["tag manager", { icon: SiGoogletagmanager, color: "#246fdb" }],
  ["looker studio", { icon: SiLooker, color: "#4285f4" }],
  ["hotjar", { icon: SiHotjar, color: "#ff3c00" }],
  ["analytics", { icon: SiGoogleanalytics, color: "#e37400" }],
]);

/** A tool by name: its logo when known, otherwise a two-letter badge. */
export function toolByName(name: string): TechTool {
  const logo = TOOL_LOGOS.get(name.trim().toLowerCase());
  if (logo) return { ...logo, name };
  const initials = name
    .split(/\s+/)
    .map((word) => word[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return { name, initials: initials || "•" };
}
