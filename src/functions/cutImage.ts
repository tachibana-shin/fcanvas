// > https://jsfiddle.net/casamia743/xqh48gno/
function calcProjectedRectSizeOfRotatedRect(
  width: number,
  height: number,
  rad: number
): readonly [number, number] {
  const rectProjectedWidth: number =
    Math.abs(width * Math.cos(rad)) + Math.abs(height * Math.sin(rad));
  const rectProjectedHeight: number =
    Math.abs(width * Math.sin(rad)) + Math.abs(height * Math.cos(rad));

  return [rectProjectedWidth, rectProjectedHeight];
}

export default function cutImage(
  image: CanvasImageSource,
  x = 0,
  y = 0,
  width: number = image.width as number,
  height: number = image.height as number,
  rotate = 0
): HTMLCanvasElement {
  const virualContext = document
    .createElement("canvas")
    .getContext("2d") as CanvasRenderingContext2D; /// never null

  /// ------------------ draw image canvas -----------------
  const rad: number = (rotate * Math.PI) / 180;
  const [swidth, sheight] = calcProjectedRectSizeOfRotatedRect(
    width,
    height,
    rad
  );

  // eslint-disable-next-line functional/immutable-data
  virualContext.canvas.width = width;
  // eslint-disable-next-line functional/immutable-data
  virualContext.canvas.height = height;

  virualContext.save();
  virualContext.translate(width / 2, height / 2);
  virualContext.rotate((rotate * Math.PI) / 180);
  virualContext.drawImage(
    image,
    x,
    y,
    swidth,
    sheight,
    -swidth / 2,
    -sheight / 2,
    swidth,
    sheight
  );
  virualContext.restore();
  /// -----------------------------------------------------------

  return virualContext.canvas;
}
