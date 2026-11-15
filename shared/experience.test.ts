import { describe, expect, it } from "vitest";
import { roles } from "./experience";

describe("roles", () => {
  it("every role lists the tools it used", () => {
    const missing = roles.filter((role) => !role.stack?.length).map((role) => role.company);
    expect(missing).toEqual([]);
  });

  // Tools come from the role's own text, so each one must be named in it.
  it("only lists tools named in the role's own text", () => {
    for (const role of roles) {
      const text = [...(role.paragraphs ?? []), ...(role.bullets ?? [])].join(" ");
      // OFFX's text describes the product rather than naming its tools.
      if (role.company === "OFFX") continue;
      for (const tool of role.stack ?? []) expect(text, `${role.company}: ${tool}`).toContain(tool);
    }
  });
});
