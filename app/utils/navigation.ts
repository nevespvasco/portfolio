export type NavItem = "home" | "projects";

/**
 * Which header nav item to highlight: Projects on any case-study page or
 * while the home page's Projects section is on screen, Home otherwise.
 */
export function activeNavItem(path: string, projectsInView: boolean): NavItem {
  if (path.startsWith("/projects/")) return "projects";
  return projectsInView ? "projects" : "home";
}
