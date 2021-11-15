import getInfoFont from "./getInfoFont";

describe("getInfoFont test", () => {
  test("12px Arial", () => {
    expect(getInfoFont("12px Arial")).toEqual({
      font: 12,
      family: "Arial",
      weight: "normal",
    });
  });
  test("12px 900 Arial", () => {
    expect(getInfoFont("12px Arial")).toEqual({
      font: 12,
      family: "Arial",
      weight: "900",
    });
  });
});
