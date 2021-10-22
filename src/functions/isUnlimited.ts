export default function isUnlimited(
  value: number,
  min: number,
  max: number
): boolean {
  return value < min || value > max;
}
