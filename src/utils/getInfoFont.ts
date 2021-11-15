import trim from "./trim";

type InfoFont = {
  readonly size: number;
  readonly family: string;
  readonly weight: string;
};

export default function getInfoFont(font: string): InfoFont {
  const fontSplit = font.split(" ");
  if (fontSplit.length === 2) {
    return {
      size: parseFloat(fontSplit[0]),
      family: trim(fontSplit[1]),
      weight: "normal",
    };
  }

  return {
    size: parseFloat(fontSplit[1]),
    family: trim(fontSplit[2]),
    weight: trim(fontSplit[0]),
  };
}
