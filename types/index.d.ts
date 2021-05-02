import Emitter from "./classes/Emitter";
import Stament from "./classes/Stament";
import Store from "./classes/Store";
import { Touch } from "./utils";

interface CallbackColor<T> {
  (hue: number, saturation: number, lightness: number): T;
  (hue: number, saturation: number, bright: number): T;
  (red: number, green: number, blue: number): T;
  (hue: number, saturation: number, lightness: number, alpha: number): T;
  (hue: number, saturation: number, bright: number, alpha: number): T;
  (red: number, green: number, blue: number, alpha: number): T;
  (color: string): T;
  (colors: Array<number>): T;
  (gradient: CanvasGradient): T;
  (image: HTMLImageElement): T;
}

declare class MyElement {
  constructor(canvas?: fCanvas);
  _els: fCanvas[];
  _idActiveNow: null | number;
  get $el(): HTMLCanvasElement;
  _queue: MyElement[];
  _run(canvas: fCanvas): void;
  addQueue(element: MyElement): void;
  getQueue(index: number): MyElement | undefined;
  run(element: MyElement): void;
  has(id: number): boolean;
  get $parent(): fCanvas;
  bind(canvas: fCanvas): void;
  get $context2d(): CanvasRenderingContext2D;
  _extendsCanvas(name: string, ...argv: any[]): any;
  _toRadius(...argv: any[]): any;
  _toDegress(...argv: any[]): any;
  _toRgb(...argv: any[]): any;
  _figureOffset(...argv: any[]): any;
  sin(angle: number): number;
  asin(sin: number): number;
  cos(angle: number): number;
  acos(cos: number): number;
  tan(angle: number): number;
  atan(tan: number): number;
  tan2(angle: number): number;
  atan2(y: number, x: number): number;
  get mouseX(): number | null;
  get mouseY(): number | null;
  get interact(): boolean;
  get width(): number;
  get height(): number;
  get windowWidth(): number;
  get windowHeight(): number;
  _createLinear(type: any, ...argv: any[]): any;
  fill: CallbackColor<void>;
  stroke: CallbackColor<void>;
  noFill(): void;
  lineWidth(value: number): number | void;
  miterLimit(value: number): number | void;
  shadowOffset(
    x: number,
    y: number
  ):
    | {
        x: any;
        y: any;
      }
    | undefined;
  measureText(text: string): number;
  begin(): void;
  close(): void;
  save(): void;
  restore(): void;
  arc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    stopAngle: number,
    reverse?: boolean
  ): void;
  pie(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    stopAngle: number,
    reverse?: boolean
  ): void;
  line(x1: number, y1: number, x2: number, y2: number): void;
  ellipse(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    startAngle: number,
    stopAngle: number,
    reverse?: boolean
  ): void;
  circle(x: number, y: number, radius: number): void;
  point(x: number, y: number): void;
  triange(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ): void;
  drawImage: {
    (image: HTMLImageElement): void;
    (image: HTMLImageElement, x: number, y: number): void;
    (
      image: HTMLImageElement,
      cx: number,
      cy: number,
      cwidth: number,
      cheight: number,
      x: number,
      y: number
    ): void;
    (
      image: HTMLImageElement,
      cx: number,
      cy: number,
      cwidth: number,
      cheight: number,
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
  };
  rect: {
    (x: number, y: number, width: number, height: number): void;
    (
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number | string
    ): void;
    (
      x: number,
      y: number,
      width: number,
      height: number,
      radius1: number | string,
      radius2: number | string
    ): void;
    (
      x: number,
      y: number,
      width: number,
      height: number,
      radiusTopLeft: number | string,
      radiusTopRight: number | string,
      radiusBottomRight: number | string,
      radiusBottomLeft: number | string
    ): void;
  };
  square: {
    (x: number, y: number, a: number): void;
    (x: number, y: number, a: number, radius: number | string): void;
    (
      x: number,
      y: number,
      a: number,
      radius1: number | string,
      radius2: number | string
    ): void;
    (
      x: number,
      y: number,
      a: number,
      radiusTopLeft: number | string,
      radiusTopRight: number | string,
      radiusBottomRight: number | string,
      radiusBottomLeft: number | string
    ): void;
  };
  hypot: (...values: number[]) => number;
  __functionDefault(property: any, arg: any): any;
  __functionDefault2(name: any, ...argv: any[]): any;
  quadratic(bzx: number, bzy: number, x: number, y: number): void;
  bezier(
    bzx1: number,
    bzy1: number,
    bzx2: number,
    bzy2: number,
    x: number,
    y: number
  ): void;
  move(x: number, y: number): void;
  to(x: number, y: number): void;
  fillText(text: string, x: number, y: number): void;
  strokeText(text: string, x: number, y: number): void;
  fillRect(x: number, y: number, width: number, height: number): void;
  strokeRect(x: number, y: number, width: number, height: number): void;
  arcTo(
    xStart: number,
    yStart: number,
    xMax: number,
    yMax: number,
    radius: number
  ): void;
  isPoint(x: number, y: number): void;
  createImageData(width: number, height: number, info?: any): ImageData;
  getImageData(x: number, y: number, width: number, height: number): ImageData;
  putImageData(
    imageData: ImageData,
    x: number,
    y: number,
    xs?: number,
    ys?: number,
    width?: number,
    height?: number
  ): void;
  createPattern(
    image: HTMLImageElement,
    direction: "repeat" | "repeat-x" | "repeat-y" | "no-repeat"
  ): CanvasPattern;
  createRadialGradient(
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
  ): CanvasGradient;
  createLinearGradient(
    x: number,
    y: number,
    width: number,
    heightr: number
  ): CanvasGradient;
  lineJoin(miter: "bevel" | "round" | "miter"): "bevel" | "round" | "miter";
  lineCap(cap: "butt" | "round" | "square"): "butt" | "round" | "square";
  shadowBlur(alpha: number): number | void;
  shadowColor: CallbackColor<string>;
}

declare class fCanvas {
  static Element: typeof MyElement;
  static constants: {
    angleMode: {
      0: string;
      1: string;
    };
    rectAlign: {
      0: string;
      1: string;
      2: string;
    };
    rectBaseline: {
      0: string;
      1: string;
      2: string;
    };
    colorMode: {
      rgb: string;
      hsl: string;
      hue: string;
      hsb: string;
    };
  };
  _ENV: {
    angleMode: number;
    rectAlign: number;
    rectBaseline: number;
    colorMode: string;
    rotate: number;
    clear: boolean;
    loop: boolean;
  };
  preventTouch: boolean;
  stopTouch: boolean;
  touches: Touch[];
  changedTouches: Touch[];
  get mouseX(): number | null;
  get mouseY(): number | null;
  get interact(): boolean;
  static count: number;
  _id: number;
  _el: HTMLCanvasElement;
  constructor();
  _events: object;
  $on(name: string, callback: Function): any;
  $off(name: string, callback?: Function): any;
  _moveEvent(toEl: HTMLCanvasElement): void;
  append(parent?: HTMLElement): void;
  mount(query: string | HTMLCanvasElement): void;
  noClear(): void;
  get $el(): HTMLCanvasElement;
  _context2dCaching: null | CanvasRenderingContext2D;
  get $context2d(): CanvasRenderingContext2D | null;
  run(element: MyElement): void;
  get width(): number;
  set width(value: number);
  get height(): number;
  set height(value: number);
  get windowWidth(): number;
  get windowHeight(): number;
  save(): void;
  restore(): void;
  _methodMode(type: any, value: any): any;
  _toRadius(value: any): any;
  _toDegress(value: any): any;
  _toRgb([red, green, blue, alpha]: [
    (number | undefined)?,
    any?,
    any?,
    (number | undefined)?
  ]): any;
  _figureOffset(x: any, y: any, width: any, height: any): any[];
  angleMode: {
    (value: "radial" | "degress"): void;
    (): "radial" | "degress";
  };
  rectAlign: {
    (value: "left" | "center" | "right"): void;
    (): "left" | "center" | "right";
  };
  colorMode: {
    (mode: "rgb" | "hsl" | "hue" | "hsb"): void;
    (): "rgb" | "hsl" | "hue" | "hsb";
  };
  rectBaseline: {
    (value: "top" | "middle" | "bottom"): void;
    (): "top" | "middle" | "bottom";
  };
  fontSize: {
    (size: number | string): void;
    (): number;
  };
  fontFamily: {
    (value: string): void;
    (): string;
  };
  fontWeight: {
    (value: string | number): void;
    (): string | number;
  };
  clear(x?: number, y?: number, width?: number, height?: number): void;
  background: CallbackColor<void>;
  toDataURL(type?: string, encoder?: number): string;
  rotate(value?: number): number | undefined;
  resetTransform(): void;
  _stamentReady: Stament;
  _existsPreload: boolean;
  preload(callback: { (): Promise<void> | void }): Promise<void>;
  setup(callback: { (): Promise<void> | void }): Promise<void>;
  draw(callback: { (): void }): void;
  __functionDefault(property: any, arg: any): any;
  __functionDefault2(name: any, ...argv: any[]): any;
  font(argv?: string): string | void;
  textAlign: {
    (align: "left" | "center" | "right"): void;
    (): "left" | "center" | "right";
  };
  textBaseline: {
    (
      baseline:
        | "alphabetic"
        | "top"
        | "hanging"
        | "middle"
        | "ideographic"
        | "bottom"
    ): void;
    (): "alphabetic" | "top" | "hanging" | "middle" | "ideographic" | "bottom";
  };
  globalOperation: {
    (
      composite:
        | "source-over"
        | "source-atop"
        | "source-in"
        | "source-out"
        | "destination-over"
        | "destination-atop"
        | "destination-in"
        | "destination-out"
        | "lighter"
        | "copy"
        | "xor"
    ): void;
    ():
      | "source-over"
      | "source-atop"
      | "source-in"
      | "source-out"
      | "destination-over"
      | "destination-atop"
      | "destination-in"
      | "destination-out"
      | "lighter"
      | "copy"
      | "xor";
  };
  translate: {
    (x: number, y: number): void;
    (): {
      x: number;
      y: number;
    };
  };
  scale(scale: number): void;
  clip(): void;
  transform(...argv: any[]): void;
  setTransform(...argv: any[]): void;

  sin(angle: number): number;
  asin(sin: number): number;
  cos(angle: number): number;
  acos(cos: number): number;
  tan(angle: number): number;
  atan(tan: number): number;
  tan2(angle: number): number;
  atan2(y: number, x: number): number;
  _store: {
    cursor: string;
  };
  cursor(): void;
  noCursor(): void;
  loop(): void;
  noLoop(): void;
  keyPressed(
    callback: Function
  ): {
    off: () => void;
  };
  mouseIn(
    callback: Function
  ): {
    off: () => void;
  };
  mouseOut(
    callback: Function
  ): {
    off: () => void;
  };
  mouseDowned(
    callback: Function
  ): {
    off: () => void;
  };
  touchStarted(
    callback: Function
  ): {
    off: () => void;
  };
  touchMoved(
    callback: Function
  ): {
    off: () => void;
  };
  touchEned(
    callback: Function
  ): {
    off: () => void;
  };
  mouseMoved(
    callback: Function
  ): {
    off: () => void;
  };
  mouseUped(
    callback: Function
  ): {
    off: () => void;
  };
  mouseClicked(
    callback: Function
  ): {
    off: () => void;
  };
}
export { Emitter, Stament, Store };
export declare function setup(callback: {
  (): Promise<void> | void;
}): Promise<void>;
export declare function draw(
  callback: {
    (): Promise<void> | void;
  },
  canva?: fCanvas
): void;
export declare function keyPressed(
  callback: Function,
  element?: Window & typeof globalThis
): {
  off(): void;
};
export declare function changeSize(
  callback: Function,
  element?: Window & typeof globalThis
): {
  off(): void;
};
export declare function mouseWheel(
  callback: Function,
  element?: Window & typeof globalThis
): {
  off(): void;
};
export declare function mousePressed(
  callback: Function,
  element?: Window & typeof globalThis
): {
  off(): void;
};
export declare function mouseClicked(
  callback: Function,
  element?: Window & typeof globalThis
): {
  off(): void;
};
export declare function mouseMoved(
  callback: Function,
  element?: Window & typeof globalThis
): {
  off(): void;
};
export declare function touchStarted(
  callback: Function,
  element?: Window & typeof globalThis
): {
  off(): void;
};
export declare function touchMoved(
  callback: Function,
  element?: Window & typeof globalThis
): {
  off(): void;
};
export declare function touchEnded(
  callback: Function,
  element?: Window & typeof globalThis
): {
  off(): void;
};
export default fCanvas;
export * from "./methods/index";
export { default as Vector } from "./classes/Vector";
