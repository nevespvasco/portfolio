import { describe, expect, it } from "vitest";
import { activeNavItem } from "./navigation";

describe("activeNavItem", () => {
  it("highlights Home on the home page", () => {
    expect(activeNavItem("/")).toBe("home");
  });

  it("highlights Projects on the projects list and on every case study", () => {
    expect(activeNavItem("/projects")).toBe("projects");
    expect(activeNavItem("/projects/filebridge")).toBe("projects");
  });

  it("highlights Experience on the experience page", () => {
    expect(activeNavItem("/experience")).toBe("experience");
  });

  it("ignores a trailing slash", () => {
    expect(activeNavItem("/projects/")).toBe("projects");
  });

  it("highlights nothing on a path that only starts with a section name", () => {
    expect(activeNavItem("/projects-archive")).toBeUndefined();
    expect(activeNavItem("/experiences")).toBeUndefined();
  });

  it("highlights nothing on an unknown page", () => {
    expect(activeNavItem("/nope")).toBeUndefined();
  });
});
