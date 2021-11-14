import trim from "./trim"
import windowSize from "./windowSize"

export default function convertValueToPixel(
  value: string | number,
  fontSize: number = 16
): number {
  if (typeof value === "number") {
    return value
  }

  const dp = value.match(/[a-z%]+$/i)?.[1] || "px"
  value = parseFloat(trim(value)) // convert string to value

  switch (dp) {
    case "em":
      return (fontSize) * value
    case "rem":
      return 16 * (value)
    case "vw":
      return (windowSize.windowWidth.get() * value) / 100;
    case "vh":
      return (windowSize.windowHeight.get() * value) / 100;
    case "vmin":
      return (
        (Math.min(
            windowSize.windowWidth.get(),
            windowSize.windowHeight.get()
          ) *
          value) /
        100
      );
    case "vmax":
      return (
        (Math.max(
            windowSize.windowWidth.get(),
            windowSize.windowHeight.get()
          ) *
          value) /
        100
      );
    case "%":
      return (fontSize / 100) * value;

    case "px":
    default:
      return value
  }
}