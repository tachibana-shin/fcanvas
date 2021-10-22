export default function even(value: number, min: number, prevent: number): number {
  if (value === min) {
    return prevent;
  }

  return value - 1;
}
