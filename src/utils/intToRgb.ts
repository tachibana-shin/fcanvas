export default function intToRGB(number: number): [string, string, string] {
  return [
    (number & 0xff0000) >> 16,
    (number & 0x00ff00) >> 8,
    number & 0x0000ff,
  ];
}
