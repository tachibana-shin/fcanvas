import getInfoFont from "./getInfoFont";

describe("getInfoFont test", () => {
  test("12px Arial", () => {
    expect(getInfoFont("12px Arial")).toEqual({
      size: 12,
      family: "Arial",
      weight: "normal",
    });
  });
});
