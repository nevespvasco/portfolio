import { describe, expect, it } from "vitest";
import { adjacentProjects, type Project } from "./projects";

const project = (slug: string): Project => ({
  slug,
  name: slug.toUpperCase(),
  outcome: "",
  tags: [],
  sections: [],
});

const list = [project("alpha"), project("beta"), project("gamma")];

describe("adjacentProjects", () => {
  it("returns the projects before and after one in the middle of the list", () => {
    const { previous, next } = adjacentProjects("beta", list);
    expect(previous?.slug).toBe("alpha");
    expect(next?.slug).toBe("gamma");
  });

  it("has no previous project for the first one and no next for the last", () => {
    expect(adjacentProjects("alpha", list).previous).toBeUndefined();
    expect(adjacentProjects("gamma", list).next).toBeUndefined();
  });

  it("returns no neighbours for an unknown slug", () => {
    expect(adjacentProjects("missing", list)).toEqual({});
  });
});
