import hypot from "./hypot";

describe("hypot test", () => {
  test("1", () => {
    expect(hypot(231, 23454, -12)).toBe(Math.hypot(231, 23454, -12));
  });
});
