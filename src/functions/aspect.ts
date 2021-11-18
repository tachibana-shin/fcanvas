type ReadonlySize = {
  readonly width: number;
  readonly height: number;
};

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
  } else {
    return {
      width: swidth,
      height,
    };
  }
}
