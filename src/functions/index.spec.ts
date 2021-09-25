import { constrain, hypot } from "./index";

describe("hypot test", () => {
  test("1", () => {
    expect(hypot(231, 23454, -12)).toBe(Math.hypot(231, 23454, -12));
  });
});

describe.each([
  {
    value: 12,
    min: 0,
    max: 100,

    expected: 12,
  },
  {
    value: -1212,
    min: 0,
    max: 100,

    expected: 0,
  },
  {
    value: 200,
    min: 0,
    max: 100,

    expected: 100,
  },
])("constrain($value, $min, $max", ({ value, min, max, expected }) => {
  // eslint-disable-next-line jest/no-standalone-expect
  expect(constrain(value, min, max)).toBe(expected);
});
