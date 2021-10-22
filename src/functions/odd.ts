export default function odd(
  value: number,
  prevent: number,
  max: number
): number {
  if (value === max) {
    return prevent;
  }

  return value + 1;
}
