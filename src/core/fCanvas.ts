import Stament from "../classes/Stament";
import {
  AutoToPx,
  bindEvent,
  cancelAnimationFrame,
  fontToArray,
  getTouchInfo,
  InfoTouch,
  isMobile,
  ListEvents,
  noop,
  Offset,
  passive,
  windowSize,
} from "../utils/index";

import {
  CanvasElement,
  createElement,
  Point3D,
  Point3DCenter,
} from "./CanvasElement";
import { draw, setup } from "./SystemEvents";

type AngleType = "degress" | "radial";
export type AlignType = "left" | "center" | "right";
export type BaselineType = "top" | "middle" | "bottom";
type ColorType = "rgb" | "hsl" | "hue" | "hsb";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ParamsToRgb = readonly [any?, any?, any?, number?];
type TextAlignType = AlignType | "start" | "end";
type TextBaselineType = BaselineType | "hanging" | "alphabetic" | "ideographic";
type RectMode = "corner" | "corners" | "center" | "radius";
type GlobalCompositeOperationType =
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
type RuleClip = "nonzero" | "evenodd";
export type DirectionPattern = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";

type HightTransform = {
  // eslint-disable-next-line functional/prefer-readonly-type
  x: number;
  // eslint-disable-next-line functional/prefer-readonly-type
  y: number;
  // eslint-disable-next-line functional/prefer-readonly-type
  sumX: number;
  // eslint-disable-next-line functional/prefer-readonly-type
  sumY: number;
};

export default class fCanvas {
  static readonly CanvasElement: typeof CanvasElement = CanvasElement;
  static readonly Point3D: typeof Point3D = Point3D;
  static readonly Point3DCenter: typeof Point3DCenter = Point3DCenter;
  // eslint-disable-next-line functional/prefer-readonly-type
  private static _count = 0;

  // eslint-disable-next-line functional/immutable-data
  private readonly _id: number = fCanvas._count++;
  // eslint-disable-next-line functional/prefer-readonly-type
  private _el: HTMLCanvasElement;
  private readonly hooks: Stament = new Stament();
  private readonly __store: {
    // eslint-disable-next-line functional/prefer-readonly-type
    _context2dCaching: CanvasRenderingContext2D | null;

    // eslint-disable-next-line functional/prefer-readonly-type
    __translate: HightTransform;
    // eslint-disable-next-line functional/prefer-readonly-type
    __scale: HightTransform;
    // eslint-disable-next-line functional/prefer-readonly-type
    __rotate: {
      // eslint-disable-next-line functional/prefer-readonly-type
      now: number;
      // eslint-disable-next-line functional/prefer-readonly-type
      sum: number;
    };
    // eslint-disable-next-line functional/prefer-readonly-type
    __attributeContext: {
      // eslint-disable-next-line functional/prefer-readonly-type
      alpha: boolean;
      // eslint-disable-next-line functional/prefer-readonly-type
      desynchronized: boolean;
    };

    // eslint-disable-next-line functional/prefer-readonly-type
    _clear: boolean;
    // eslint-disable-next-line functional/prefer-readonly-type
    _loop: boolean;

    // eslint-disable-next-line functional/prefer-readonly-type
    _preventTouch: boolean;
    // eslint-disable-next-line functional/prefer-readonly-type
    _stopTouch: boolean;
    // eslint-disable-next-line functional/prefer-readonly-type
    _idFrame: number | null;
    // eslint-disable-next-line functional/prefer-readonly-type
    _existsPreload: boolean;

    // eslint-disable-next-line functional/prefer-readonly-type
    _angleMode: AngleType;
    // eslint-disable-next-line functional/prefer-readonly-type
    _rectMode: RectMode;
    // eslint-disable-next-line functional/prefer-readonly-type
    _colorMode: ColorType;
    // eslint-disable-next-line functional/prefer-readonly-type
    _useFloatPixel: boolean;

    // eslint-disable-next-line functional/prefer-readonly-type
    _pmouseX: number;
    // eslint-disable-next-line functional/prefer-readonly-type
    _pmouseY: number;

    // eslint-disable-next-line functional/prefer-readonly-type
    _realMouseIsPressed: boolean;
  } = Object.create({
    _context2dCaching: null,

    __translate: Object.create({
      x: 0,
      y: 0,
      sumX: 0,
      sumY: 0,
    }),
    __scale: Object.create({
      x: 0,
      y: 0,
      sumX: 0,
      sumY: 0,
    }),
    __rotate: Object.create({
      now: 0,
      sum: 0,
    }),
    __attributeContext: Object.create({
      alpha: true,
      desynchronized: false,
    }),

    _clear: true,
    _loop: true,

    _preventTouch: false,
    _stopTouch: false,
    _idFrame: null,
    _existsPreload: false,

    _angleMode: "degress",
    _rectMode: "corner",
    _colorMode: "rgb",
    _useFloatPixel: true,

    _pmouseX: 0,
    _pmouseY: 0,

    _realMouseIsPressed: false,
  });

  constructor(width: number, height: number);
  constructor(element?: HTMLCanvasElement | string);
  constructor(
    element: HTMLCanvasElement | string,
    width?: number,
    height?: number
  );
  constructor(
    element?: HTMLCanvasElement | string | number,
    width?: number,
    height?: number
  ) {
    // eslint-disable-next-line functional/functional-parameters
    if (arguments.length === 1 || arguments.length === 3) {
      if (element instanceof HTMLCanvasElement) {
        this._el = element as HTMLCanvasElement;
      } else {
        const el = document.querySelector(element as string);

        if (el instanceof HTMLCanvasElement) {
          this._el = el;
        } else {
          console.warn(
            `fCanvas: "${element}" is not instanceof HTMLCanvasElement.`
          );
          this._el = document.createElement("canvas");
        }
      }
    } else {
      this._el = document.createElement("canvas");
    }

    // eslint-disable-next-line functional/functional-parameters
    switch (arguments.length) {
      case 2:
        this.size((element as number) || 0, width || 0);
        break;
      case 3:
        this.size(width || 0, height || 0);
        break;
    }

    this._restartEvents(this._el);
  }

  get $el(): HTMLCanvasElement {
    return this._el;
  }
  public size(width: number, height: number): void {
    // eslint-disable-next-line functional/immutable-data
    this.$el.width = width;
    // eslint-disable-next-line functional/immutable-data
    this.$el.height = height;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly _handlerEvent = (event: any): void => {
    try {
      // eslint-disable-next-line functional/immutable-data
      this.__store._pmouseX = this.touches[0]?.x || 0;
      // eslint-disable-next-line functional/immutable-data
      this.__store._pmouseY = this.touches[0]?.y || 0;

      this.touches =
        event.type !== "mouseout"
          ? getTouchInfo(this.$el, event.touches || [event])
          : [];
      this.changedTouches = getTouchInfo(
        this.$el,
        event.changedTouches || [event]
      );
      if (this.__store._preventTouch) {
        event.preventDefault();
      }
      if (this.__store._stopTouch) {
        event.stopPropagation();
      }
      // eslint-disable-next-line no-empty
    } catch {}
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly _handlerEventMousePress = (event: any): void => {
    if (event.type === "mousedown") {
      // eslint-disable-next-line functional/immutable-data
      this.__store._realMouseIsPressed = true;
      return;
    }
    if (event.type === "mouseup") {
      // eslint-disable-next-line functional/immutable-data
      this.__store._realMouseIsPressed = false;
      return;
    }

    // eslint-disable-next-line functional/immutable-data
    this.__store._realMouseIsPressed = event?.touches.length > 0;
  };
  private _cancelEventsSystem(el: Element): void {
    [
      "touchstart",
      "mouseover",

      "touchmove",
      "mousemove",

      "touchend",
      "mouseout",
    ].forEach((event: string): void => {
      el.removeEventListener(event, this._handlerEvent);
    });
    [
      // for mouseIsPressed
      "touchstart",
      "mousedown",
      "touchend",
      "mouseup",
    ].forEach((event: string): void => {
      el.removeEventListener(event, this._handlerEventMousePress);
    });
  }
  private _restartEvents(el: Element): void {
    this._cancelEventsSystem(el);

    el.addEventListener(
      isMobile() ? "touchstart" : "mouseover",
      this._handlerEvent,
      passive
        ? {
            passive: true,
          }
        : undefined
    );
    el.addEventListener(
      isMobile() ? "touchmove" : "mousemove",
      this._handlerEvent,
      passive
        ? {
            passive: true,
          }
        : undefined
    );
    el.addEventListener(
      isMobile() ? "touchend" : "mouseout",
      this._handlerEvent,
      passive
        ? {
            passive: true,
          }
        : undefined
    );

    el.addEventListener(
      isMobile() ? "touchstart" : "mousedown",
      this._handlerEventMousePress
    );
    el.addEventListener(
      isMobile() ? "touchend" : "mouseup",
      this._handlerEventMousePress
    );
  }

  // eslint-disable-next-line functional/prefer-readonly-type
  public touches: readonly InfoTouch[] = [];
  // eslint-disable-next-line functional/prefer-readonly-type
  public changedTouches: readonly InfoTouch[] = [];
  public preventTouch(): void {
    // eslint-disable-next-line functional/immutable-data
    this.__store._preventTouch = true;
  }
  public stopTouch(): void {
    // eslint-disable-next-line functional/immutable-data
    this.__store._stopTouch = true;
  }
  get mouseX(): number | null {
    return this.touches[0]?.x || null;
  }
  get mouseY(): number | null {
    return this.touches[0]?.y || null;
  }
  get movedX(): number {
    return this.touches[this.touches.length - 1]?.x || 0;
  }
  get movedY(): number {
    return this.touches[this.touches.length - 1]?.y || 0;
  }
  get pmouseX(): number {
    return this.__store._pmouseX;
  }
  get pmouseY(): number {
    return this.__store._pmouseY;
  }
  get mouseIsPressed(): boolean {
    return this.__store._realMouseIsPressed;
  }

  get id(): number {
    return this._id;
  }
  private _createNewContext2d(): void {
    // eslint-disable-next-line functional/immutable-data
    this.__store._context2dCaching = this.$el.getContext(
      "2d",
      this.__store.__attributeContext
    ) as CanvasRenderingContext2D;
  }
  blur(): void {
    // eslint-disable-next-line functional/immutable-data
    this.__store.__attributeContext.alpha = true;
    this._createNewContext2d();
  }
  noBlur(): void {
    // eslint-disable-next-line functional/immutable-data
    this.__store.__attributeContext.alpha = false;
    this._createNewContext2d();
  }
  desync(): void {
    // eslint-disable-next-line functional/immutable-data
    this.__store.__attributeContext.desynchronized = true;
    this._createNewContext2d();
  }
  noDesync(): void {
    // eslint-disable-next-line functional/immutable-data
    this.__store.__attributeContext.desynchronized = false;
    this._createNewContext2d();
  }
  useFloatPixel(): void {
    // eslint-disable-next-line functional/immutable-data
    this.__store._useFloatPixel = true;
  }
  noFloatPixel(): void {
    // eslint-disable-next-line functional/immutable-data
    this.__store._useFloatPixel = false;
  }
  _getPixel(value: number): number {
    return this.__store._useFloatPixel ? value : Math.round(value);
  }

  get $context2d(): CanvasRenderingContext2D {
    if (this.__store._context2dCaching === null) {
      this._createNewContext2d();
    }

    return this.__store._context2dCaching as CanvasRenderingContext2D;
  }

  append(parent: HTMLElement = document.body): void {
    if (parent.contains(this.$el) === false) {
      parent.appendChild(this.$el);
    }
  }
  mount(element: HTMLCanvasElement | string): void {
    // eslint-disable-next-line functional/no-let
    let el: HTMLCanvasElement;

    if (typeof element === "string") {
      el =
        Array.from(document.querySelectorAll<HTMLCanvasElement>(element)).find(
          (item): boolean => item.tagName === "CANVAS"
        ) || this._el;
    } else {
      if (element.tagName !== "CANVAS") {
        console.error(
          `fCanvas<sys>: function .mount() not allow element "${element?.tagName.toLocaleLowerCase()}`
        );
        el = this._el;
      } else {
        el = element;
      }
    }

    if (this._el !== el) {
      this._cancelEventsSystem(this._el);
      this._el = el;
      this._restartEvents(el);
    }
  }
  noClear(): void {
    // eslint-disable-next-line functional/immutable-data
    this.__store._clear = false;
  }
  get allowClear(): boolean {
    return this.__store._clear;
  }

  // eslint-disable-next-line functional/functional-parameters
  run(...elements: readonly CanvasElement[]): void {
    // eslint-disable-next-line functional/no-let
    let index = 0;
    const { length } = elements;

    // eslint-disable-next-line functional/no-loop-statement
    while (index < length) {
      elements[index++]._run(this);
    }
  }

  get width(): number {
    return this.$el.width;
  }
  set width(value: number) {
    // eslint-disable-next-line functional/immutable-data
    this.$el.width = value;
  }
  get height(): number {
    return this.$el.height;
  }
  set height(value: number) {
    // eslint-disable-next-line functional/immutable-data
    this.$el.height = value;
  }
  get windowWidth(): number {
    return windowSize.windowWidth.get();
  }
  get windowHeight(): number {
    return windowSize.windowHeight.get();
  }

  save(): void {
    this.$context2d.save();
  }
  restore(): void {
    this.$context2d.restore();
  }

  _toRadius(value: number): number {
    return this.__store._angleMode === "degress"
      ? (value * Math.PI) / 180
      : value;
  }
  _toDegress(value: number): number {
    return this.__store._angleMode === "degress"
      ? (value * 180) / Math.PI
      : value;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _toRgb([red = 0, green = red, blue = green, alpha = 1]: ParamsToRgb): any {
    if (Array.isArray(red)) {
      return this._toRgb(red as unknown as ParamsToRgb);
    } else {
      if (typeof red === "object" && red !== null) {
        return red;
      }
      if (typeof red === "string") {
        return red;
      } else {
        const after = this.__store._colorMode.match(/hsl|hsb/i) ? "%" : "";

        return `${this.__store._colorMode}a(${[
          red,
          green + after,
          blue + after,
          alpha,
        ].join(",")})`;
      }
    }
  }
  _argsRect(
    x: number,
    y: number,
    width: number,
    height: number
  ): readonly [number, number, number, number] {
    switch (this.__store._rectMode) {
      case "center":
        return [x - width / 2, y - height / 2, width, height];
      case "radius":
        return [x - width, y - height, width * 2, height * 2];
      case "corners":
        return [x - width, y - height, width, height];
      case "corner":
      default:
        return [x, y, width, height];
    }
  }

  angleMode(): AngleType;
  angleMode(type: AngleType): void;
  angleMode(value?: AngleType): AngleType | void {
    if (value === undefined) {
      return this.__store._angleMode;
    }

    // eslint-disable-next-line functional/immutable-data
    this.__store._angleMode = value;
  }
  colorMode(): ColorType;
  colorMode(mode: ColorType): void;
  colorMode(value?: ColorType): ColorType | void {
    if (value === undefined) {
      return this.__store._colorMode;
    }

    // eslint-disable-next-line functional/immutable-data
    this.__store._colorMode = value;
  }
  rectMode(): RectMode;
  rectMode(mode: RectMode): void;
  rectMode(value?: RectMode): RectMode | void {
    if (value === undefined) {
      return this.__store._rectMode;
    }

    // eslint-disable-next-line functional/immutable-data
    this.__store._rectMode = value;
  }
  fontSize(): number;
  fontSize(size: number): void;
  fontSize(value?: number): number | void {
    const { size, weight, family } = fontToArray(this.font());

    if (value === undefined) {
      return size;
    } else {
      value = AutoToPx(value, size, size) || 16;
      this.font([weight, `${value}px`, family].join(" "));
    }
  }
  fontFamily(): string;
  fontFamily(font: string): void;
  fontFamily(value?: string): string | void {
    const { size, weight, family } = fontToArray(this.font());

    if (value === undefined) {
      return family;
    } else {
      this.font([weight, `${size}px`, value].join(" "));
    }
  }
  fontWeight(): string;
  fontWeight(weight: string): void;
  fontWeight(value?: string): string | void {
    const { size, weight, family } = fontToArray(this.font());

    if (value === undefined) {
      return weight;
    } else {
      this.font([value, `${size}px`, family].join(" "));
    }
  }
  clear(x = 0, y = 0, w: number = this.width, h: number = this.height): void {
    this.$context2d.clearRect(x, y, w, h);
  }
  // eslint-disable-next-line functional/functional-parameters
  background(...params: ParamsToRgb): void {
    // eslint-disable-next-line functional/immutable-data
    this.$context2d.fillStyle = this._toRgb(params);
    this.$context2d.fill();
    this.$context2d.fillRect(0, 0, this.width, this.height);
  }
  backgroundImage(image: CanvasImageSource): void {
    this.$context2d.drawImage(image, 0, 0, this.width, this.height);
  }
  createImageData(height: ImageData): ImageData;
  createImageData(width: number, height: number): ImageData;
  createImageData(width: ImageData | number, height?: number): ImageData {
    return height
      ? this.$context2d.createImageData(width as number, height)
      : this.$context2d.createImageData(width as ImageData);
  }
  getImageData(x: number, y: number, width: number, height: number): ImageData {
    return this.$context2d.getImageData(x, y, width, height);
  }
  putImageData(imageData: ImageData, x: number, y: number): void;
  putImageData(
    imageData: ImageData,
    x: number,
    y: number,
    xs: number,
    ys: number,
    width: number,
    height: number
  ): void;
  putImageData(
    imageData: ImageData,
    x: number,
    y: number,
    xs?: number,
    ys?: number,
    width?: number,
    height?: number
  ): void {
    // eslint-disable-next-line functional/functional-parameters
    if (arguments.length === 7) {
      this.$context2d.putImageData(
        imageData,
        x,
        y,
        xs as number,
        ys as number,
        width as number,
        height as number
      );
    } else {
      this.$context2d.putImageData(imageData, x, y);
    }
  }
  createPattern(
    image: CanvasImageSource,
    direction: DirectionPattern
  ): CanvasPattern | null {
    return this.$context2d.createPattern(image, direction);
  }
  createRadialGradient(
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
  ): CanvasGradient {
    return this.$context2d.createRadialGradient(x1, y1, r1, x2, y2, r2);
  }
  createLinearGradient(
    x: number,
    y: number,
    width: number,
    height: number
  ): CanvasGradient {
    return this.$context2d.createLinearGradient(x, y, width, height);
  }
  /**
   * @param {any} type="image/png"
   * @param {number} scale?
   * @return {string}
   */
  toDataURL(type = "image/png", scale?: number): string {
    return this.$el.toDataURL(type, scale);
  }
  rotate(): number;
  rotate(value: number): void;
  rotate(value?: number): number | void {
    if (value === undefined) {
      return this.__store.__rotate.now;
    } else {
      this.$context2d.rotate(
        // eslint-disable-next-line functional/immutable-data
        (this.__store.__rotate.now = this._toRadius(value))
      );
      // eslint-disable-next-line functional/immutable-data
      this.__store.__rotate.sum += this.__store.__rotate.now % 360;
    }
  }
  resetRotate(): void {
    this.rotate(-this.__store.__rotate.sum);
  }
  resetTransform(): void {
    this.setTransform(1, 0, 0, 1, 0, 0);
  }
  readonly createElement = createElement;
  async preload(callback: noop | (() => Promise<void>)): Promise<void> {
    // eslint-disable-next-line functional/immutable-data
    this.__store._existsPreload = true;
    await callback();

    this.hooks.emit("preloaded");
  }
  async setup(callback: noop | (() => Promise<void>)): Promise<void> {
    if (this.__store._existsPreload) {
      this.hooks.on("preloaded", async (): Promise<void> => {
        await setup(callback, this);
        this.hooks.emit("setuped");
      });
    } else {
      await setup(callback, this);
      this.hooks.emit("setuped");
    }
  }
  draw(callback: noop): void {
    this.hooks.on("setuped", (): void => {
      draw(callback, this);
    });
  }

  font(): string;
  font(font: string): void;
  font(value?: string): string | void {
    if (value === undefined) {
      return this.$context2d.font;
    }

    // eslint-disable-next-line functional/immutable-data
    this.$context2d.font = value;
  }
  textAlign(): TextAlignType;
  textAlign(type: TextAlignType): void;
  textAlign(value?: TextAlignType): TextAlignType | void {
    if (value === undefined) {
      return this.$context2d.textAlign;
    }

    // eslint-disable-next-line functional/immutable-data
    this.$context2d.textAlign = value;
  }
  textBaseline(): TextBaselineType;
  textBaseline(middle: TextBaselineType): void;
  textBaseline(value?: TextBaselineType): TextBaselineType | void {
    if (value === undefined) {
      return this.$context2d.textBaseline;
    }

    // eslint-disable-next-line functional/immutable-data
    this.$context2d.textBaseline = value;
  }
  operation(): GlobalCompositeOperationType;
  operation(composite: GlobalCompositeOperationType): void;
  operation(
    value?: GlobalCompositeOperationType
  ): GlobalCompositeOperationType | void {
    if (value === undefined) {
      return this.$context2d
        .globalCompositeOperation as GlobalCompositeOperationType;
    }

    // eslint-disable-next-line functional/immutable-data
    this.$context2d.globalCompositeOperation = value;
  }
  alpha(): number;
  alpha(alpha: number): void;
  alpha(alpha?: number): number | void {
    if (alpha === undefined) {
      return this.$context2d.globalAlpha;
    }

    // eslint-disable-next-line functional/immutable-data
    this.$context2d.globalAlpha = alpha;
  }
  resetAlpha(): void {
    this.alpha(1);
  }

  translate(): Offset;
  translate(x: number, y: number): void;
  translate(x?: number, y?: number): Offset | void {
    // eslint-disable-next-line functional/functional-parameters
    if (arguments.length === 0) {
      return {
        x: this.__store.__translate.x,
        y: this.__store.__translate.y,
      };
    }

    x = this._getPixel(x || 0);
    y = this._getPixel(y || 0);

    this.$context2d.translate(x, y);
    // eslint-disable-next-line functional/immutable-data
    this.__store.__translate.sumX += x;
    // eslint-disable-next-line functional/immutable-data
    this.__store.__translate.sumY += y;
  }
  resetTranslate(): void {
    this.$context2d.translate(
      -this.__store.__translate.sumX,
      -this.__store.__translate.sumY
    );

    // eslint-disable-next-line functional/immutable-data
    this.__store.__translate.sumX = 0;
    // eslint-disable-next-line functional/immutable-data
    this.__store.__translate.sumY = 0;
  }
  scale(): Offset;
  scale(x: number, y: number): void;
  scale(x?: number, y?: number): Offset | void {
    // eslint-disable-next-line functional/functional-parameters
    if (arguments.length === 0) {
      return {
        x: this.__store.__scale.x,
        y: this.__store.__scale.y,
      };
    }

    this.$context2d.scale(x as number, y as number);
    // eslint-disable-next-line functional/immutable-data
    this.__store.__scale.sumX += x || 0;
    // eslint-disable-next-line functional/immutable-data
    this.__store.__scale.sumY += y || 0;
  }
  resetScale(): void {
    this.$context2d.translate(
      -this.__store.__scale.sumX,
      -this.__store.__scale.sumY
    );

    // eslint-disable-next-line functional/immutable-data
    this.__store.__translate.sumX = 0;
    // eslint-disable-next-line functional/immutable-data
    this.__store.__translate.sumY = 0;
  }
  clip(): void;
  clip(fillRule: RuleClip): void;
  clip(path: Path2D, fillRule: RuleClip): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clip(fillRule?: any, path?: any): void {
    if (path === undefined) {
      this.$context2d.clip(fillRule);
    }

    this.$context2d.clip(path as Path2D, fillRule);
  }
  transform(matrix: DOMMatrix): void;
  transform(
    m11: number,
    m12: number,
    m21: number,
    m22: number,
    dx: number,
    dy: number
  ): void;
  transform(): DOMMatrix;
  transform(
    m11?: number | DOMMatrix,
    m12?: number,
    m21?: number,
    m22?: number,
    dx?: number,
    dy?: number
  ): DOMMatrix | void {
    // eslint-disable-next-line functional/functional-parameters
    if (arguments.length === 0) {
      return this.$context2d.getTransform();
    }

    if (m11 instanceof DOMMatrix) {
      const { a = 1, b = 0, c = 0, d = 1, e = 0, f = 0 } = m11;
      this.$context2d.transform(a, b, c, d, e, f);
    } else {
      this.$context2d.transform(
        m11 as number,
        m12 as number,
        m21 as number,
        m22 as number,
        dx as number,
        dy as number
      );
    }
  }
  setTransform(matrix: DOMMatrix): void;
  setTransform(
    m11: number,
    m12: number,
    m21: number,
    m22: number,
    dx: number,
    dy: number
  ): void;
  setTransform(
    m11: number | DOMMatrix,
    m12?: number,
    m21?: number,
    m22?: number,
    dx?: number,
    dy?: number
  ): void {
    if (m11 instanceof DOMMatrix) {
      const { a = 1, b = 0, c = 0, d = 1, e = 0, f = 0 } = m11;
      this.$context2d.setTransform(a, b, c, d, e, f);
    } else {
      this.$context2d.setTransform(
        m11 as number,
        m12 as number,
        m21 as number,
        m22 as number,
        dx as number,
        dy as number
      );
    }
  }

  measureText(text: string): number {
    return this.$context2d.measureText(text).width;
  }
  sin(angle: number): number {
    return Math.sin(this._toRadius(angle));
  }
  asin(sin: number): number {
    return this._toDegress(Math.asin(sin));
  }
  cos(angle: number): number {
    return Math.cos(this._toRadius(angle));
  }
  acos(cos: number): number {
    return this._toDegress(Math.acos(cos));
  }
  tan(angle: number): number {
    return Math.tan(this._toRadius(angle));
  }
  atan(tan: number): number {
    return this._toDegress(Math.atan(tan));
  }
  atan2(y: number, x: number): number {
    return this._toDegress(Math.atan2(y, x));
  }

  cursor(): void {
    // eslint-disable-next-line functional/immutable-data
    this.$el.style.cursor = "auto";
  }
  noCursor(): void {
    // eslint-disable-next-line functional/immutable-data
    this.$el.style.cursor = "none";
  }
  // TODO: for system callback
  _setIdFrame(id: number): void {
    // eslint-disable-next-line functional/immutable-data
    this.__store._idFrame = id;
  }
  loop(): void {
    // eslint-disable-next-line functional/immutable-data
    this.__store._loop = true;
    this.hooks.emit("setuped");
  }
  noLoop(): void {
    // eslint-disable-next-line functional/immutable-data
    this.__store._loop = false;
    if (this.__store._idFrame) {
      cancelAnimationFrame(this.__store._idFrame);
    }
  }
  get allowLoop(): boolean {
    return this.__store._loop;
  }
  on<Name extends keyof ListEvents>(
    name: Name,
    callback: (ev: ListEvents[Name]) => void
  ): noop {
    return bindEvent(name, callback, this.$el);
  }
  mouseIn(callback: (ev: MouseEvent) => void): noop {
    return this.on("mouseover", callback);
  }
  mouseOut(callback: (ev: MouseEvent) => void): noop {
    return this.on("mouseout", callback);
  }
  touchStart(callback: (ev: TouchEvent) => void): noop {
    return this.on("touchstart", callback);
  }
  touchMove(callback: (ev: TouchEvent) => void): noop {
    return this.on("touchmove", callback);
  }
  touchEnd(callback: (ev: TouchEvent) => void): noop {
    return this.on("touchend", callback);
  }
  mouseMove(callback: (ev: MouseEvent) => void): noop {
    return this.on("mousemove", callback);
  }
  mouseUp(callback: (ev: Event) => void): noop {
    return this.on("mouseup", callback);
  }
  mouseDown(callback: (ev: MouseEvent) => void): noop {
    return this.on("mousedown", callback);
  }
  mouseClicked(callback: (ev: MouseEvent) => void): noop {
    return this.on("click", callback);
  }
}
export const noopFCanvas: fCanvas = new fCanvas(0, 0);
