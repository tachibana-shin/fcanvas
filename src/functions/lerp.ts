export default function lerp(start: number, stop: number, amt: number): number {
  return amt * (stop - start) + start;
}
