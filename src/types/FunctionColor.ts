type FunctionColor = {
  // @hsl color
  (hue: number, saturation: number, lightness: number): void;
  (hue: number, saturation: number, lightness: number, alpha: number): void;
  // @hsb color
  (hue: number, saturation: number, bright: number): void;
  (hue: number, saturation: number, bright: number, alpha: number): void;
  // @rgb color
  (red: number, green: number, blue: number): void;
  (red: number, green: number, blue: number, alpha: number): void;
  // @canvasGradient
  (linear: CanvasGradient): void;
  (pattern: CanvasPattern): void;
  (image: CanvasImageSource): void;
  (color: string): void;
  (value: number): void;
};

export default FunctionColor;
