import type ReadonlySize from "../types/ReadonlySize";

export default function aspect(
  { width, height }: ReadonlySize,
  ratio: number
): ReadonlySize {
  /// ratio = width / height => height = width / ratio
  const swidth = ratio * height;
  const sheight = width / ratio;

  if (width < swidth) {
    return {
      width,
      height: sheight,
    };
  }
  
  return {
    width: swidth,
    height,
  };
}
