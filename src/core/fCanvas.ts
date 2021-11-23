import { OneTimeEvent } from "../classes/OneTimeEvent";
import { error, warn } from "../helpers/log";
import type FunctionColor from "../types/FunctionColor";
import type Noop from "../types/Noop";
import type ReadonlyListEvents from "../types/ReadonlyListEvents";
import type ReadonlyMouseOffset from "../types/ReadonlyMouseOffset";
import type ReadonlyOffset from "../types/ReadonlyOffset";
import { cancelAnimationFrame } from "../utils/animationFrame";
import bindEvent from "../utils/bindEvent";
import convertValueToPixel from "../utils/convertValueToPixel";
import generateUUID from "../utils/generateUUID";
import getInfoFont from "../utils/getInfoFont";
import getTouchInfo from "../utils/getTouchInfo";
import isMobile from "../utils/isMobile";
import isSupportPassive from "../utils/isSupportPassive";
import windowSize from "../utils/windowSize";

import { draw, setup } from "./SystemEvents";

type LineJoin = "bevel" | "round" | "miter";
type LineCap = "butt" | "round" | "square";

type AngleType = "degress" | "radial";
type AlignType = "left" | "center" | "right";
type BaselineType = "top" | "middle" | "bottom";
type ColorType = "rgb" | "hsl" | "hsb";
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
type DirectionPattern = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";

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

// eslint-disable-next-line functional/no-let
let canvasInstance: fCanvas | null = null;
export function setCanvasInstance(canvas: fCanvas | null): void {
  canvasInstance = canvas;
}
export function unsetCanvasInstance(): void {
  canvasInstance = null;
}
export function getCanvasInstance(): fCanvas | null {
  return canvasInstance;
}

export default class fCanvas {
  // eslint-disable-next-line functional/prefer-readonly-type
  #el: HTMLCanvasElement;
  readonly #hooks = new OneTimeEvent({
    preloaded: false,
    setuped: false,
  });
  readonly #env = Object.create({
    context2dCaching: <CanvasRenderingContext2D | null>null,

    translate: <HightTransform>Object.create({
      x: 0,
      y: 0,
      sumX: 0,
      sumY: 0,
    }),
    scale: <HightTransform>Object.create({
      x: 0,
      y: 0,
      sumX: 0,
      sumY: 0,
    }),
    rotate: <
      {
        // eslint-disable-next-line functional/prefer-readonly-type
        now: number;
        // eslint-disable-next-line functional/prefer-readonly-type
        sum: number;
      }
    >Object.create({
      now: 0,
      sum: 0,
    }),
    attributeContext: <
      {
        // eslint-disable-next-line functional/prefer-readonly-type
        alpha: boolean;
        // eslint-disable-next-line functional/prefer-readonly-type
        desynchronized: boolean;
      }
    >Object.create({
      alpha: true,
      desynchronized: false,
    }),

    clear: <boolean>true,
    loop: <boolean>true,

    preventTouch: <boolean>false,
    stopTouch: <boolean>false,
    idFrame: <number | null>null,
    existsPreload: <boolean>false,

    angleMode: <AngleType>"degress",
    rectMode: <RectMode>"corner",
    colorMode: <ColorType>"rgb",
    useFloatPixel: <boolean>true,

    pmouseX: <number>0,
    pmouseY: <number>0,

    realMouseIsPressed: <boolean>false,
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
        this.#el = element as HTMLCanvasElement;
      } else {
        const el = document.querySelector(element as string);

        if (el instanceof HTMLCanvasElement) {
          this.#el = el;
        } else {
          warn(`"${element}" is not instanceof HTMLCanvasElement.`);
          this.#el = document.createElement("canvas");
        }
      }
    } else {
      this.#el = document.createElement("canvas");
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

    this.#reListenMouseEventSystem(this.#el);
    this.#el.setAttribute("data-fcanvas-id", generateUUID());
  }

  get $el(): HTMLCanvasElement {
    return this.#el;
  }
  get ctx(): CanvasRenderingContext2D {
    if (this.#env.context2dCaching === null) {
      this.#refreshContext();
    }

    return this.#env.context2dCaching as CanvasRenderingContext2D;
  }
  public size(width: number, height: number): void {
    // eslint-disable-next-line functional/immutable-data
    this.$el.width = width;
    // eslint-disable-next-line functional/immutable-data
    this.$el.height = height;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #listenerMouseEventSystem(event: any): void {
    try {
      // eslint-disable-next-line functional/immutable-data
      this.#env.pmouseX = this.touches[0]?.x || 0;
      // eslint-disable-next-line functional/immutable-data
      this.#env.pmouseY = this.touches[0]?.y || 0;

      this.touches =
        event.type !== "mouseout"
          ? getTouchInfo(this.$el, event.touches || [event])
          : [];
      this.changedTouches = getTouchInfo(
        this.$el,
        event.changedTouches || [event]
      );
      if (this.#env.preventTouch) {
        event.preventDefault();
      }
      if (this.#env.stopTouch) {
        event.stopPropagation();
      }
      // eslint-disable-next-line no-empty
    } catch {}
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  #listenerMousePress(event: any): void {
    if (event.type === "mousedown") {
      // eslint-disable-next-line functional/immutable-data
      this.#env.realMouseIsPressed = true;
      return;
    }
    if (event.type === "mouseup") {
      // eslint-disable-next-line functional/immutable-data
      this.#env.realMouseIsPressed = false;
      return;
    }

    // eslint-disable-next-line functional/immutable-data
    this.#env.realMouseIsPressed = event?.touches.length > 0;
  }
  #cancelListenerMouseEventSystem(el: Element): void {
    [
      "touchstart",
      "mouseover",

      "touchmove",
      "mousemove",

      "touchend",
      "mouseout",
    ].forEach((event: string): void => {
      el.removeEventListener(event, this.#listenerMouseEventSystem);
    });
    [
      // for mouseIsPressed
      "touchstart",
      "mousedown",
      "touchend",
      "mouseup",
    ].forEach((event: string): void => {
      el.removeEventListener(event, this.#listenerMousePress);
    });
  }
  #reListenMouseEventSystem(el: Element): void {
    this.#cancelListenerMouseEventSystem(el);

    el.addEventListener(
      isMobile() ? "touchstart" : "mouseover",
      this.#listenerMouseEventSystem,
      isSupportPassive
        ? {
            passive: true,
          }
        : undefined
    );
    el.addEventListener(
      isMobile() ? "touchmove" : "mousemove",
      this.#listenerMouseEventSystem,
      isSupportPassive
        ? {
            passive: true,
          }
        : undefined
    );
    el.addEventListener(
      isMobile() ? "touchend" : "mouseout",
      this.#listenerMouseEventSystem,
      isSupportPassive
        ? {
            passive: true,
          }
        : undefined
    );

    el.addEventListener(
      isMobile() ? "touchstart" : "mousedown",
      this.#listenerMousePress
    );
    el.addEventListener(
      isMobile() ? "touchend" : "mouseup",
      this.#listenerMousePress
    );
  }

  #refreshContext(): void {
    // eslint-disable-next-line functional/immutable-data
    this.#env.context2dCaching = this.$el.getContext(
      "2d",
      this.#env.attributeContext
    ) as CanvasRenderingContext2D;
  }

  // eslint-disable-next-line functional/prefer-readonly-type
  touches: readonly ReadonlyMouseOffset[] = [];
  // eslint-disable-next-line functional/prefer-readonly-type
  changedTouches: readonly ReadonlyMouseOffset[] = [];
  preventTouch(): void {
    // eslint-disable-next-line functional/immutable-data
    this.#env.preventTouch = true;
  }
  stopTouch(): void {
    // eslint-disable-next-line functional/immutable-data
    this.#env.stopTouch = true;
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
    return this.#env.pmouseX;
  }
  get pmouseY(): number {
    return this.#env.pmouseY;
  }
  get mouseIsPressed(): boolean {
    return this.#env.realMouseIsPressed;
  }

  blur(): void {
    // eslint-disable-next-line functional/immutable-data
    this.#env.attributeContext.alpha = true;
    this.#refreshContext();
  }
  noBlur(): void {
    // eslint-disable-next-line functional/immutable-data
    this.#env.attributeContext.alpha = false;
    this.#refreshContext();
  }
  desync(): void {
    // eslint-disable-next-line functional/immutable-data
    this.#env.attributeContext.desynchronized = true;
    this.#refreshContext();
  }
  noDesync(): void {
    // eslint-disable-next-line functional/immutable-data
    this.#env.attributeContext.desynchronized = false;
    this.#refreshContext();
  }
  useFloatPixel(): void {
    // eslint-disable-next-line functional/immutable-data
    this.#env.useFloatPixel = true;
  }
  noFloatPixel(): void {
    // eslint-disable-next-line functional/immutable-data
    this.#env.useFloatPixel = false;
  }
  performancePixel(value: number): number {
    return this.#env.useFloatPixel ? value : Math.round(value);
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
        ) || this.#el;
    } else {
      if (element.tagName !== "CANVAS") {
        error(
          `function .mount() not allow element "${element?.tagName.toLocaleLowerCase()}`
        );
        el = this.#el;
      } else {
        el = element;
      }
    }

    if (this.#el !== el) {
      this.#cancelListenerMouseEventSystem(this.#el);
      this.#el = el;
      this.#reListenMouseEventSystem(el);
    }
  }
  noClear(): void {
    // eslint-disable-next-line functional/immutable-data
    this.#env.clear = false;
  }
  get allowClear(): boolean {
    return this.#env.clear;
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
    this.ctx.save();
  }
  restore(): void {
    this.ctx.restore();
  }

  convertToRadius(value: number): number {
    return this.#env.angleMode === "degress" ? (value * Math.PI) / 180 : value;
  }
  convertToDegress(value: number): number {
    return this.#env.angleMode === "degress" ? (value * 180) / Math.PI : value;
  }

  convertToRgbColor([
    red = 0,
    green = red,
    blue = green,
    alpha = 1,
  ]: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly any[]): any {
    if (Array.isArray(red)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return this.convertToRgbColor(red as unknown as any);
    } else {
      if (typeof red === "object" && red !== null) {
        return red;
      }
      if (typeof red === "string") {
        return red;
      } else {
        const after = this.#env.colorMode.match(/hsl|hsb/i) ? "%" : "";

        return `${this.#env.colorMode}a(${[
          red,
          green + after,
          blue + after,
          alpha,
        ].join(",")})`;
      }
    }
  }
  getSizeofRect(
    x: number,
    y: number,
    width: number,
    height: number
  ): readonly [number, number, number, number] {
    switch (this.#env.rectMode) {
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
      return this.#env.angleMode;
    }

    // eslint-disable-next-line functional/immutable-data
    this.#env.angleMode = value;
  }
  colorMode(): ColorType;
  colorMode(mode: ColorType): void;
  colorMode(value?: ColorType): ColorType | void {
    if (value === undefined) {
      return this.#env.colorMode;
    }

    // eslint-disable-next-line functional/immutable-data
    this.#env.colorMode = value;
  }
  rectMode(): RectMode;
  rectMode(mode: RectMode): void;
  rectMode(value?: RectMode): RectMode | void {
    if (value === undefined) {
      return this.#env.rectMode;
    }

    // eslint-disable-next-line functional/immutable-data
    this.#env.rectMode = value;
  }
  fontSize(): number;
  fontSize(size: number): void;
  fontSize(value?: number): number | void {
    const { size, weight, family } = getInfoFont(this.ctx.font);

    if (value === undefined) {
      return size;
    } else {
      value = convertValueToPixel(value, size);
      // eslint-disable-next-line functional/immutable-data
      this.ctx.font = [weight, `${value}px`, family].join(" ");
    }
  }
  fontFamily(): string;
  fontFamily(font: string): void;
  fontFamily(value?: string): string | void {
    const { size, weight, family } = getInfoFont(this.ctx.font);

    if (value === undefined) {
      return family;
    } else {
      // eslint-disable-next-line functional/immutable-data
      this.ctx.font = [weight, `${size}px`, value].join(" ");
    }
  }
  fontWeight(): string;
  fontWeight(weight: string): void;
  fontWeight(value?: string): string | void {
    const { size, weight, family } = getInfoFont(this.ctx.font);

    if (value === undefined) {
      return weight;
    } else {
      // eslint-disable-next-line functional/immutable-data
      this.ctx.font = [value, `${size}px`, family].join(" ");
    }
  }
  lineJoin(): LineJoin;
  lineJoin(type: LineJoin): void;
  lineJoin(type?: LineJoin): LineJoin | void {
    if (type === undefined) {
      return this.ctx.lineJoin;
    }

    // eslint-disable-next-line functional/immutable-data
    this.ctx.lineJoin = type;
  }
  lineCap(): LineCap;
  lineCap(value: LineCap): void;
  lineCap(value?: LineCap): LineCap | void {
    if (value === undefined) {
      return this.ctx.lineCap;
    }
    // eslint-disable-next-line functional/immutable-data
    this.ctx.lineCap = value;
  }
  miterLimit(): number;
  miterLimit(value: number): void;
  miterLimit(value?: number): number | void {
    if (value === undefined) {
      return this.ctx.miterLimit;
    }
    this.lineJoin("miter");

    // eslint-disable-next-line functional/immutable-data
    this.ctx.miterLimit = value;
  }
  clear(x = 0, y = 0, w: number = this.width, h: number = this.height): void {
    this.ctx.clearRect(x, y, w, h);
  }

  // eslint-disable-next-line functional/functional-parameters, @typescript-eslint/no-explicit-any
  readonly background = ((...params: any) => {
    // eslint-disable-next-line functional/immutable-data
    this.ctx.fillStyle = this.convertToRgbColor(params);
    this.ctx.fill();
    this.ctx.fillRect(0, 0, this.width, this.height);
  }) as FunctionColor;
  backgroundImage(image: CanvasImageSource): void {
    this.ctx.drawImage(image, 0, 0, this.width, this.height);
  }
  createImageData(height: ImageData): ImageData;
  createImageData(width: number, height: number): ImageData;
  createImageData(width: ImageData | number, height?: number): ImageData {
    return height
      ? this.ctx.createImageData(width as number, height)
      : this.ctx.createImageData(width as ImageData);
  }
  getImageData(x: number, y: number, width: number, height: number): ImageData {
    return this.ctx.getImageData(x, y, width, height);
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
      this.ctx.putImageData(
        imageData,
        x,
        y,
        xs as number,
        ys as number,
        width as number,
        height as number
      );
    } else {
      this.ctx.putImageData(imageData, x, y);
    }
  }
  createPattern(
    image: CanvasImageSource,
    direction: DirectionPattern
  ): CanvasPattern {
    return this.ctx.createPattern(image, direction) as CanvasPattern;
  }
  createRadialGradient(
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
  ): CanvasGradient {
    return this.ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
  }
  createLinearGradient(
    x: number,
    y: number,
    width: number,
    height: number
  ): CanvasGradient {
    return this.ctx.createLinearGradient(x, y, width, height);
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
      return this.#env.rotate.now;
    } else {
      this.ctx.rotate(
        // eslint-disable-next-line functional/immutable-data
        (this.#env.rotate.now = this.convertToRadius(value))
      );
      // eslint-disable-next-line functional/immutable-data
      this.#env.rotate.sum += this.#env.rotate.now % 360;
    }
  }
  resetRotate(): void {
    this.rotate(-this.#env.rotate.sum);
  }
  resetTransform(): void {
    this.setTransform(1, 0, 0, 1, 0, 0);
  }
  async preload(callback: Noop | (() => Promise<void>)): Promise<void> {
    // eslint-disable-next-line functional/immutable-data
    this.#env.existsPreload = true;
    await callback();

    this.#hooks.emit("preloaded");
  }
  async setup(callback: Noop | (() => Promise<void>)): Promise<void> {
    if (this.#env.existsPreload) {
      this.#hooks.on("preloaded", async (): Promise<void> => {
        await setup(callback, this);
        this.#hooks.emit("setuped");
      });
    } else {
      await setup(callback, this);
      this.#hooks.emit("setuped");
    }
  }
  draw(callback: Noop): void {
    this.#hooks.on("setuped", (): void => {
      draw(callback, this);
    });
  }

  font(): string;
  font(font: string): void;
  font(value?: string): string | void {
    if (value === undefined) {
      return this.ctx.font;
    }

    // eslint-disable-next-line functional/immutable-data
    this.ctx.font = value;
  }
  textAlign(): TextAlignType;
  textAlign(type: TextAlignType): void;
  textAlign(value?: TextAlignType): TextAlignType | void {
    if (value === undefined) {
      return this.ctx.textAlign;
    }

    // eslint-disable-next-line functional/immutable-data
    this.ctx.textAlign = value;
  }
  textBaseline(): TextBaselineType;
  textBaseline(middle: TextBaselineType): void;
  textBaseline(value?: TextBaselineType): TextBaselineType | void {
    if (value === undefined) {
      return this.ctx.textBaseline;
    }

    // eslint-disable-next-line functional/immutable-data
    this.ctx.textBaseline = value;
  }
  operation(): GlobalCompositeOperationType;
  operation(composite: GlobalCompositeOperationType): void;
  operation(
    value?: GlobalCompositeOperationType
  ): GlobalCompositeOperationType | void {
    if (value === undefined) {
      return this.ctx.globalCompositeOperation as GlobalCompositeOperationType;
    }

    // eslint-disable-next-line functional/immutable-data
    this.ctx.globalCompositeOperation = value;
  }
  alpha(): number;
  alpha(alpha: number): void;
  alpha(alpha?: number): number | void {
    if (alpha === undefined) {
      return this.ctx.globalAlpha;
    }

    // eslint-disable-next-line functional/immutable-data
    this.ctx.globalAlpha = alpha;
  }
  resetAlpha(): void {
    this.alpha(1);
  }

  translate(): ReadonlyOffset;
  translate(x: number, y: number): void;
  translate(x?: number, y?: number): ReadonlyOffset | void {
    // eslint-disable-next-line functional/functional-parameters
    if (arguments.length === 0) {
      return {
        x: this.#env.translate.x,
        y: this.#env.translate.y,
      };
    }

    x = this.performancePixel(x || 0);
    y = this.performancePixel(y || 0);

    this.ctx.translate(x, y);
    // eslint-disable-next-line functional/immutable-data
    this.#env.translate.sumX += x;
    // eslint-disable-next-line functional/immutable-data
    this.#env.translate.sumY += y;
  }
  resetTranslate(): void {
    this.ctx.translate(-this.#env.translate.sumX, -this.#env.translate.sumY);

    // eslint-disable-next-line functional/immutable-data
    this.#env.translate.sumX = 0;
    // eslint-disable-next-line functional/immutable-data
    this.#env.translate.sumY = 0;
  }
  scale(): ReadonlyOffset;
  scale(x: number, y: number): void;
  scale(x?: number, y?: number): ReadonlyOffset | void {
    // eslint-disable-next-line functional/functional-parameters
    if (arguments.length === 0) {
      return {
        x: this.#env.scale.x,
        y: this.#env.scale.y,
      };
    }

    this.ctx.scale(x as number, y as number);
    // eslint-disable-next-line functional/immutable-data
    this.#env.scale.sumX += x || 0;
    // eslint-disable-next-line functional/immutable-data
    this.#env.scale.sumY += y || 0;
  }
  resetScale(): void {
    this.ctx.translate(-this.#env.scale.sumX, -this.#env.scale.sumY);

    // eslint-disable-next-line functional/immutable-data
    this.#env.translate.sumX = 0;
    // eslint-disable-next-line functional/immutable-data
    this.#env.translate.sumY = 0;
  }
  clip(): void;
  clip(fillRule: RuleClip): void;
  clip(path: Path2D, fillRule: RuleClip): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clip(fillRule?: any, path?: any): void {
    if (path === undefined) {
      this.ctx.clip(fillRule);
    }

    this.ctx.clip(path as Path2D, fillRule);
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
      return this.ctx.getTransform();
    }

    if (m11 instanceof DOMMatrix) {
      const { a = 1, b = 0, c = 0, d = 1, e = 0, f = 0 } = m11;
      this.ctx.transform(a, b, c, d, e, f);
    } else {
      this.ctx.transform(
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
      this.ctx.setTransform(a, b, c, d, e, f);
    } else {
      this.ctx.setTransform(
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
    return this.ctx.measureText(text).width;
  }
  sin(angle: number): number {
    return Math.sin(this.convertToRadius(angle));
  }
  asin(sin: number): number {
    return this.convertToDegress(Math.asin(sin));
  }
  cos(angle: number): number {
    return Math.cos(this.convertToRadius(angle));
  }
  acos(cos: number): number {
    return this.convertToDegress(Math.acos(cos));
  }
  tan(angle: number): number {
    return Math.tan(this.convertToRadius(angle));
  }
  atan(tan: number): number {
    return this.convertToDegress(Math.atan(tan));
  }
  atan2(y: number, x: number): number {
    return this.convertToDegress(Math.atan2(y, x));
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
  setIdFrame(id: number): void {
    // eslint-disable-next-line functional/immutable-data
    this.#env.idFrame = id;
  }
  loop(): void {
    // eslint-disable-next-line functional/immutable-data
    this.#env.loop = true;
    this.#hooks.emit("setuped");
  }
  noLoop(): void {
    // eslint-disable-next-line functional/immutable-data
    this.#env.loop = false;
    if (this.#env.idFrame) {
      cancelAnimationFrame(this.#env.idFrame);
    }
  }
  get allowLoop(): boolean {
    return this.#env.loop;
  }
  on<Name extends keyof ReadonlyListEvents>(
    name: Name,
    callback: (ev: ReadonlyListEvents[Name]) => void
  ): Noop {
    return bindEvent(name, callback, this.$el);
  }
  mouseIn(callback: (ev: MouseEvent) => void): Noop {
    return this.on("mouseover", callback);
  }
  mouseOut(callback: (ev: MouseEvent) => void): Noop {
    return this.on("mouseout", callback);
  }
  touchStart(callback: (ev: TouchEvent) => void): Noop {
    return this.on("touchstart", callback);
  }
  touchMove(callback: (ev: TouchEvent) => void): Noop {
    return this.on("touchmove", callback);
  }
  touchEnd(callback: (ev: TouchEvent) => void): Noop {
    return this.on("touchend", callback);
  }
  mouseMove(callback: (ev: MouseEvent) => void): Noop {
    return this.on("mousemove", callback);
  }
  mouseUp(callback: (ev: Event) => void): Noop {
    return this.on("mouseup", callback);
  }
  mouseDown(callback: (ev: MouseEvent) => void): Noop {
    return this.on("mousedown", callback);
  }
  mouseClicked(callback: (ev: MouseEvent) => void): Noop {
    return this.on("click", callback);
  }
}
