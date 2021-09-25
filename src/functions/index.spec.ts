import { hypot } from "./index"

test("hypot test", () => {
   expect(hypot(231, 23454, -12)).toBe(Math.hypot(231, 23454, -12))
})