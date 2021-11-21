// @hsl color
declare function FunctionColor(
  hue: number,
  saturation: number,
  lightness: number
): void;
declare function FunctionColor(
  hue: number,
  saturation: number,
  lightness: number,
  alpha: number
): void;
// @hsb color
declare function FunctionColor(
  hue: number,
  saturation: number,
  bright: number
): void;
declare function FunctionColor(
  hue: number,
  saturation: number,
  bright: number,
  alpha: number
): void;
// @rgb color
declare function FunctionColor(red: number, green: number, blue: number): void;
declare function FunctionColor(
  red: number,
  green: number,
  blue: number,
  alpha: number
): void;
// @canvasGradient
declare function FunctionColor(linear: CanvasGradient): void;
declare function FunctionColor(pattern: CanvasPattern): void;
declare function FunctionColor(image: CanvasImageSource): void;
declare function FunctionColor(color: string): void;
declare function FunctionColor(value: number): void;

export default FunctionColor;
