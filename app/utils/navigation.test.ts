import { describe, expect, it } from "vitest";
import { activeNavItem } from "./navigation";

describe("activeNavItem", () => {
  it("highlights Home at the top of the home page", () => {
    expect(activeNavItem("/", false)).toBe("home");
  });

  it("highlights Projects on a case-study page", () => {
    expect(activeNavItem("/projects/filebridge", false)).toBe("projects");
  });

  it("highlights Projects while the home page's Projects section is in view", () => {
    expect(activeNavItem("/", true)).toBe("projects");
  });
});
