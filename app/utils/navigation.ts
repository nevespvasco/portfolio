export type NavItem = "home" | "projects" | "experience";

const sections: { item: Exclude<NavItem, "home">; prefix: string }[] = [
  { item: "projects", prefix: "/projects" },
  { item: "experience", prefix: "/experience" },
];

/**
 * Which header nav item to highlight for a path: the section a page belongs
 * to (the projects list and every case study count as Projects), Home for the
 * home page, and nothing for pages outside the nav.
 */
export function activeNavItem(path: string): NavItem | undefined {
  const clean = path.length > 1 ? path.replace(/\/+$/, "") : path;
  if (clean === "/") return "home";
  return sections.find(({ prefix }) => clean === prefix || clean.startsWith(`${prefix}/`))?.item;
}
