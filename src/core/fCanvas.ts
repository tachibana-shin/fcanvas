import MyElement, {
  RectElement,
  CircleElement,
  Point3D,
  LikeMyElement,
} from "./MyElement";
import {
  AutoToPx,
  fontToArray,
  getTouchInfo,
  windowSize,
  isMobile,
  InfoTouch,
  noop,
  Offset,
  cancelAnimationFrame,
  bindEvent,
} from "../utils/index";
import Stament from "../classes/Stament";
import { setup, draw } from "./SystemEvents";
import { CallbackEvent } from "../classes/Emitter";

type AngleType = "degress" | "radial";
export type AlignType = "left" | "center" | "right";
export type BaselineType = "top" | "middle" | "bottom";
type ColorType = "rgb" | "hsl" | "hue" | "hsb";
export type ParamsToRgb = [any?, any?, any?, number?];
type TextAlignType = AlignType | "start" | "end";
type TextBaselineType = BaselineType | "hanging" | "alphabetic" | "ideographic";
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

interface ENV {
  angleMode: AngleType;
  rectAlign: AlignType;
  rectBaseline: BaselineType;
  colorMode: ColorType;
  rotate: number;
  clear: boolean;
  loop: boolean;
}
interface HightTransform {
  x: number;
  y: number;
  sumX: number;
  sumY: number;
}

export default class fCanvas {
  static Element: typeof MyElement = MyElement;
  static RectElement: typeof RectElement = RectElement;
  static CircleElement: typeof CircleElement = CircleElement;
  static Point3D: typeof Point3D = Point3D;
  static count: number = 0;

  private _ENV: ENV = {
    angleMode: "degress",
    rectAlign: "left",
    rectBaseline: "top",
    colorMode: "rgb",

    rotate: 0,
    clear: true,
    loop: true,
  };
  private _id: number = fCanvas.count++;
  private _el: HTMLCanvasElement = document.createElement("canvas");
  private _context2dCaching: CanvasRenderingContext2D | null = null;
  private _stamentReady: Stament = new Stament();
  private _existsPreload: boolean = false;
  private __translate: HightTransform = {
    x: 0,
    y: 0,
    sumX: 0,
    sumY: 0,
  };
  private __scale: HightTransform = {
    x: 0,
    y: 0,
    sumX: 0,
    sumY: 0,
  };
  private __idFrame: number | null = null;
  private __attributeContext: {
    alpha: boolean;
    desynchronized: boolean;
  } = {
    alpha: true,
    desynchronized: false,
  };

  public preventTouch: boolean = false;
  public stopTouch: boolean = false;
  public touches: InfoTouch[] = [];
  public changedTouches: InfoTouch[] = [];
  /**
   * @return {number | null}
   */
  get mouseX(): number | null {
    return this.touches[0]?.x || null;
  }
  /**
   * @return {number | null}
   */
  get mouseY(): number | null {
    return this.touches[0]?.y || null;
  }
  /**
   * @return {boolean}
   */
  get interact(): boolean {
    return this.touches.length > 0;
  }

  /**
   * @return {number}
   */
  get id(): number {
    return this._id;
  }
  /**
   * @return {HTMLCanvasElement}
   */
  get $el(): HTMLCanvasElement {
    return this._el;
  }
  private _createNewContext2d(): void {
    this._context2dCaching = this.$el.getContext(
      "2d",
      this.__attributeContext
    ) as CanvasRenderingContext2D;
  }
  /**
   * @return {boolean}
   */
  acceptBlur(): boolean {
    return this.__attributeContext.alpha;
  }
  /**
   * @return {void}
   */
  blur(): void {
    this.__attributeContext.alpha = true;
    this._createNewContext2d();
  }
  /**
   * @return {void}
   */
  noBlur(): void {
    this.__attributeContext.alpha = false;
    this._createNewContext2d();
  }
  /**
   * Describe your function
   * @return {boolean}
   */
  acceptDesync(): boolean {
    return this.__attributeContext.desynchronized;
  }
  /**
   * Describe your function
   * @return {void}
   */
  desync(): void {
    this.__attributeContext.desynchronized = true;
    this._createNewContext2d();
  }
  /**
   * Describe your function
   * @return {void}
   */
  noDesync(): void {
    this.__attributeContext.desynchronized = false;
    this._createNewContext2d();
  }

  /**
   * @return {CanvasRenderingContext2D}
   */
  get $context2d(): CanvasRenderingContext2D {
    if (this._context2dCaching === null) {
      this._createNewContext2d();
    }

    return this._context2dCaching as CanvasRenderingContext2D;
  }

  /**
   * @return {any}
   */
  constructor() {
    const handlerEvent = (event: any): void => {
      try {
        if (event.type !== "mouseout") {
          this.touches = getTouchInfo(this.$el, event.touches || [event]);
          this.changedTouches = getTouchInfo(
            this.$el,
            event.changedTouches || [event]
          );
        } else {
          this.touches = [];
        }
        this.preventTouch && event.preventDefault();
        this.stopTouch && event.stopPropagation();
      } catch (e) {
        // throw e;
      }
    };

    this.$el.addEventListener(
      isMobile() ? "touchstart" : "mouseover",
      handlerEvent
    );
    this.$el.addEventListener(
      isMobile() ? "touchmove" : "mousemove",
      handlerEvent
    );
    this.$el.addEventListener(
      isMobile() ? "touchend" : "mouseout",
      handlerEvent
    );
  }

  /**
   * @param {HTMLElement=document.body} parent
   * @return {void}
   */
  append(parent: HTMLElement = document.body): void {
    if (parent.contains(this.$el) === false) {
      parent.appendChild(this.$el);
    }
  }
  /**
   * @return {void}
   */
  noClear(): void {
    this._ENV.clear = false;
  }
  /**
   * @return {boolean}
   */
  get acceptClear(): boolean {
    return this._ENV.clear;
  }

  /**
   * @param {LikeMyElement} element
   * @return {void}
   */
  run(element: LikeMyElement): void {
    element._run(this);
  }

  /**
   * @return {number}
   */
  get width(): number {
    return this.$el.width;
  }
  /**
   * @param {number} value
   * @return {any}
   */
  set width(value: number) {
    this.$el.width = value;
  }
  /**
   * @return {number}
   */
  get height(): number {
    return this.$el.height;
  }
  /**
   * @param {number} value
   * @return {any}
   */
  set height(value: number) {
    this.$el.height = value;
  }
  /**
   * @return {number}
   */
  get windowWidth(): number {
    return windowSize.windowWidth.get();
  }
  /**
   * @return {number}
   */
  get windowHeight(): number {
    return windowSize.windowHeight.get();
  }

  /**
   * @return {void}
   */
  save(): void {
    this.$context2d.save();
  }
  /**
   * @return {void}
   */
  restore(): void {
    this.$context2d.restore();
  }

  _toRadius(value: number): number {
    return this._ENV.angleMode === "degress" ? (value * Math.PI) / 180 : value;
  }
  _toDegress(value: number): number {
    return this._ENV.angleMode === "radial" ? (value * 180) / Math.PI : value;
  }
  _toRgb([red = 0, green = red, blue = green, alpha = 1]: ParamsToRgb): string {
    if (Array.isArray(red)) {
      return this._toRgb(red as ParamsToRgb);
    } else {
      if (typeof red === "string") {
        return red;
      } else {
        const after = this._ENV.colorMode.match(/hsl|hsb/i) ? "%" : "";

        return `${this._ENV.colorMode}a(${[
          red,
          green + after,
          blue + after,
          alpha,
        ].join(",")})`;
      }
    }
  }
  _figureOffset(
    x: number,
    y: number,
    width: number,
    height: number
  ): [number, number] {
    switch (this._ENV.rectAlign) {
      case "center":
        x -= width / 2;
        break;
      case "right":
        x -= width;
        break;
    }
    switch (this._ENV.rectBaseline) {
      case "middle":
        y -= height / 2;
        break;
      case "bottom":
        y -= height;
        break;
    }

    return [x, y];
  }

  angleMode(): AngleType;
  angleMode(type: AngleType): void;
  /**
   * @param {AngleType} value?
   * @return {any}
   */
  angleMode(value?: AngleType): AngleType | void {
    if (value === undefined) {
      return this._ENV.angleMode;
    }

    this._ENV.angleMode = value;
  }
  rectAlign(): AlignType;
  rectAlign(align: AlignType): void;
  /**
   * @param {AlignType} value?
   * @return {any}
   */
  rectAlign(value?: AlignType): AlignType | void {
    if (value === undefined) {
      return this._ENV.rectAlign;
    }

    this._ENV.rectAlign = value;
  }
  colorMode(): ColorType;
  colorMode(mode: ColorType): void;
  /**
   * @param {ColorType} value?
   * @return {any}
   */
  colorMode(value?: ColorType): ColorType | void {
    if (value === undefined) {
      return this._ENV.colorMode;
    }

    this._ENV.colorMode = value;
  }
  rectBaseline(): BaselineType;
  rectBaseline(baseline: BaselineType): void;
  /**
   * @param {BaselineType} value?
   * @return {any}
   */
  rectBaseline(value?: BaselineType): BaselineType | void {
    if (value === undefined) {
      return this._ENV.rectBaseline;
    }

    this._ENV.rectBaseline = value;
  }

  fontSize(): number;
  fontSize(size: number): void;
  /**
   * @param {number} value?
   * @return {any}
   */
  fontSize(value?: number): number | void {
    const { size, weight, family } = fontToArray(this.font());

    if (value === undefined) {
      return size;
    } else {
      value = AutoToPx(value, size, size);
      this.font([weight, `${value}px`, family].join(" "));
    }
  }
  fontFamily(): string;
  fontFamily(font: string): void;
  /**
   * @param {string} value?
   * @return {any}
   */
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
  /**
   * @param {string} value?
   * @return {any}
   */
  fontWeight(value?: string): string | void {
    const { size, weight, family } = fontToArray(this.font());

    if (value === undefined) {
      return weight;
    } else {
      this.font([value, `${size}px`, family].join(" "));
    }
  }
  /**
   * @param {number=0} x
   * @param {number=0} y
   * @param {number=this.width} w
   * @param {number=this.height} h
   * @return {void}
   */
  clear(
    x: number = 0,
    y: number = 0,
    w: number = this.width,
    h: number = this.height
  ): void {
    this.$context2d.clearRect(x, y, w, h);
  }
  /**
   * @param {ParamsToRgb} ...params
   * @return {void}
   */
  background(...params: ParamsToRgb): void {
    this.$context2d.fillStyle = this._toRgb(params);
    this.$context2d.fill();
    this.$context2d.fillRect(0, 0, this.width, this.height);
  }
  /**
   * @param {CanvasImageSource} image
   * @return {void}
   */
  backgroundImage(image: CanvasImageSource): void {
    this.$context2d.drawImage(image, 0, 0, this.width, this.height);
  }
  createImageData(height: ImageData): ImageData;
  createImageData(width: number, height: number): ImageData;
  /**
   * @param {ImageData|number} width
   * @param {number} height?
   * @return {ImageData}
   */
  createImageData(width: ImageData | number, height?: number): ImageData {
    return height
      ? this.$context2d.createImageData(width as number, height)
      : this.$context2d.createImageData(width as ImageData);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @return {ImageData}
   */
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
  /**
   * @param {ImageData} imageData
   * @param {number} x
   * @param {number} y
   * @param {number} xs?
   * @param {number} ys?
   * @param {number} width?
   * @param {number} height?
   * @return {void}
   */
  putImageData(
    imageData: ImageData,
    x: number,
    y: number,
    xs?: number,
    ys?: number,
    width?: number,
    height?: number
  ): void {
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
  /**
   * @param {CanvasImageSource} image
   * @param {"repeat"|"repeat-x"|"repeat-y"|"no-repeat"} direction
   * @return {CanvasPattern | null}
   */
  createPattern(
    image: CanvasImageSource,
    direction: "repeat" | "repeat-x" | "repeat-y" | "no-repeat"
  ): CanvasPattern | null {
    return this.$context2d.createPattern(image, direction);
  }
  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} r1
   * @param {number} x2
   * @param {number} y2
   * @param {number} r2
   * @return {CanvasGradient}
   */
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
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @return {CanvasGradient}
   */
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
  /**
   * @param {number} value?
   * @return {any}
   */
  rotate(value?: number): number | void {
    if (value === undefined) {
      return this._ENV.rotate;
    } else {
      this.$context2d.rotate((this._ENV.rotate = this._toRadius(value)));
    }
  }
  /**
   * @return {void}
   */
  resetTransform(): void {
    this.setTransform(1, 0, 0, 1, 0, 0);
  }
  /**
   * @param {noop} callback
   * @return {*}  {MyElement}
   * @memberof fCanvas
   */
  createElement(callback: noop): MyElement {
    return new (class extends MyElement {
      draw = callback;
    })();
  }
  /**
   * @param {Function} callback
   * @return {Promise<void>}
   */
  async preload(callback: { (): void }): Promise<void> {
    this._existsPreload = true;
    await callback();

    this._stamentReady.emit("preloaded");
  }
  /**
   * @param {Function} callback
   * @return {Promise<void>}
   */
  async setup(callback: { (): void }): Promise<void> {
    if (this._existsPreload) {
      this._stamentReady.on("preloaded", async (): Promise<void> => {
        await setup(callback);
        this._stamentReady.emit("setuped");
      });
    } else {
      await setup(callback);
      this._stamentReady.emit("setuped");
    }
  }
  /**
   * @param {Function} callback
   * @return {void}
   */
  draw(callback: { (): void }): void {
    this._stamentReady.on("setuped", (): void => {
      draw(callback, this);
    });
  }

  font(): string;
  font(font: string): void;
  /**
   * @param {string} value?
   * @return {any}
   */
  font(value?: string): string | void {
    if (value === undefined) {
      return this.$context2d.font;
    }

    this.$context2d.font = value;
  }
  textAlign(): TextAlignType;
  textAlign(type: TextAlignType): void;
  /**
   * @param {TextAlignType} value?
   * @return {any}
   */
  textAlign(value?: TextAlignType): TextAlignType | void {
    if (value === undefined) {
      return this.$context2d.textAlign;
    }

    this.$context2d.textAlign = value;
  }
  textBaseline(): TextBaselineType;
  textBaseline(middle: TextBaselineType): void;
  /**
   * @param {TextBaselineType} value?
   * @return {any}
   */
  textBaseline(value?: TextBaselineType): TextBaselineType | void {
    if (value === undefined) {
      return this.$context2d.textBaseline;
    }

    this.$context2d.textBaseline = value;
  }
  operation(): GlobalCompositeOperationType;
  operation(composite: GlobalCompositeOperationType): void;
  /**
   * @param {GlobalCompositeOperationType} value?
   * @return {any}
   */
  operation(
    value?: GlobalCompositeOperationType
  ): GlobalCompositeOperationType | void {
    if (value === undefined) {
      return this.$context2d
        .globalCompositeOperation as GlobalCompositeOperationType;
    }

    this.$context2d.globalCompositeOperation = value;
  }
  alpha(): number;
  alpha(alpha: number): void;
  /**
   * @param {number} alpha?
   * @return {number | void}
   */
  alpha(alpha?: number): number | void {
    if (alpha === undefined) {
      return this.$context2d.globalAlpha;
    }

    this.$context2d.globalAlpha = alpha;
  }

  translate(): Offset;
  translate(x: number, y: number): void;
  /**
   * @param {number} x?
   * @param {number} y?
   * @return {any}
   */
  translate(x?: number, y?: number): Offset | void {
    if (arguments.length === 0) {
      return {
        x: this.__translate.x,
        y: this.__translate.y,
      };
    }

    this.$context2d.translate(x as number, y as number);
    this.__translate.sumX += x || 0;
    this.__translate.sumY += y || 0;
  }
  /**
   * @return {void}
   */
  resetTranslate(): void {
    this.$context2d.translate(-this.__translate.sumX, -this.__translate.sumY);
  }
  scale(): Offset;
  scale(x: number, y: number): void;
  /**
   * @param {number} x?
   * @param {number} y?
   * @return {any}
   */
  scale(x?: number, y?: number): Offset | void {
    if (arguments.length === 0) {
      return {
        x: this.__scale.x,
        y: this.__scale.y,
      };
    }

    this.$context2d.scale(x as number, y as number);
    this.__scale.sumX += x || 0;
    this.__scale.sumY += y || 0;
  }
  /**
   * @return {void}
   */
  resetScale(): void {
    this.$context2d.translate(-this.__translate.sumX, -this.__translate.sumY);
  }
  clip(): void;
  clip(fillRule: "nonzero" | "evenodd"): void;
  clip(path: Path2D, fillRule: "nonzero" | "evenodd"): void;
  /**
   * @param {any} fillRule?
   * @param {any} path?
   * @return {void}
   */
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
  /**
   * @param {number|DOMMatrix} m11?
   * @param {number} m12?
   * @param {number} m21?
   * @param {number} m22?
   * @param {number} dx?
   * @param {number} dy?
   * @return {any}
   */
  transform(
    m11?: number | DOMMatrix,
    m12?: number,
    m21?: number,
    m22?: number,
    dx?: number,
    dy?: number
  ): DOMMatrix | void {
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
  /**
   * @param {number|DOMMatrix} m11
   * @param {number} m12?
   * @param {number} m21?
   * @param {number} m22?
   * @param {number} dx?
   * @param {number} dy?
   * @return {void}
   */
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

  /**
   * @param {number} angle
   * @return {number}
   */
  sin(angle: number): number {
    return Math.sin(this._toRadius(angle));
  }
  /**
   * @param {number} sin
   * @return {number}
   */
  asin(sin: number): number {
    return this._toDegress(Math.asin(sin));
  }
  /**
   * @param {number} angle
   * @return {number}
   */
  cos(angle: number): number {
    return Math.cos(this._toRadius(angle));
  }
  /**
   * @param {number} cos
   * @return {number}
   */
  acos(cos: number): number {
    return this._toDegress(Math.acos(cos));
  }
  /**
   * @param {number} angle
   * @return {number}
   */
  tan(angle: number): number {
    return Math.tan(this._toRadius(angle));
  }
  /**
   * @param {number} tan
   * @return {number}
   */
  atan(tan: number): number {
    return this._toDegress(Math.atan(tan));
  }
  /**
   * @param {number} y
   * @param {number} x
   * @return {number}
   */
  atan2(y: number, x: number): number {
    return this._toDegress(Math.atan2(y, x));
  }

  /**
   * @return {void}
   */
  cursor(): void {
    this.$el.style.cursor = "auto";
  }
  /**
   * @return {void}
   */
  noCursor(): void {
    this.$el.style.cursor = "none";
  }
  /**
   * @return {void}
   */
  loop(): void {
    this._ENV.loop = true;
    this._stamentReady.emit("setuped");
  }
  /**
   * @return {void}
   */
  noLoop(): void {
    this._ENV.loop = false;
    if (this.__idFrame) {
      cancelAnimationFrame(this.__idFrame);
    }
  }
  /**
   * @return {boolean}
   */
  get acceptLoop(): boolean {
    return this._ENV.loop;
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  mouseIn(callback: CallbackEvent): noop {
    return bindEvent("mouseover", callback, this.$el);
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  mouseOut(callback: CallbackEvent): noop {
    return bindEvent("mouseout", callback, this.$el);
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  touchStart(callback: CallbackEvent): noop {
    return bindEvent("touchstart", callback, this.$el);
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  touchMove(callback: CallbackEvent): noop {
    return bindEvent("touchmove", callback, this.$el);
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  touchEnd(callback: CallbackEvent): noop {
    return bindEvent("touchend", callback, this.$el);
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  mouseMove(callback: CallbackEvent): noop {
    return bindEvent("mousemove", callback, this.$el);
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  mouseUp(callback: CallbackEvent): noop {
    return bindEvent("mouseup", callback, this.$el);
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  mouseDown(callback: CallbackEvent): noop {
    return bindEvent("mousedown", callback, this.$el);
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  mouseClicked(callback: CallbackEvent): noop {
    return bindEvent("click", callback, this.$el);
  }
}
export const noopFCanvas: fCanvas = new fCanvas();
