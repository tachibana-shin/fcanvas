import { AutoToPx, noop, Offset } from "../utils/index";
import fCanvas, { noopFCanvas, ParamsToRgb } from "./fCanvas";
import { RectImpactPoint, CircleImpactPoint } from "../functions/index";

type ParamsDrawImage =
  | [number, number]
  | [number, number, number, number]
  | [number, number, number, number, number, number, number, number];

export interface LikeMyElement extends MyElement {
  [propName: string]: any;
}

export default class MyElement {
  public update?: noop;
  public draw?: noop;
  public setup?: { (): any }; //// If you don't like the constructor you can use setup() instead
  public __autodraw: boolean = true;

  private _els: {
    [propName: string]: fCanvas;
  } = Object.create(null);
  private _idActiveNow: number = -1;
  private _queue: LikeMyElement[] = [];

  private __addEl(canvas: fCanvas): void {
    if (canvas.id in this._els === false) {
      this._els[canvas.id] = canvas;
    }
  }
  /**
   * @param {fCanvas} canvas?
   * @return {any}
   */
  constructor(canvas?: fCanvas) {
    if (canvas?.constructor !== fCanvas) {
      canvas = noopFCanvas;
    }

    this.__addEl(canvas);
  }

  /**
   * @return {HTMLCanvasElement}
   */
  get $el(): HTMLCanvasElement {
    return this.$parent.$el;
  }
  _run(canvas: fCanvas): void {
    this.__addEl(canvas);
    this._idActiveNow = canvas.id;

    if (typeof this.update === "function") {
      if (this.__autodraw === true && typeof this.draw === "function") {
        this.draw();
      }
      this.update();
    } else if (typeof this.draw === "function") {
      this.draw();
    }

    if (this._queue.length > 0) {
      const { length } = this._queue;
      let index = 0;

      while (index < length) {
        this.run(this._queue[index]);
        index++;
      }
    }

    this._idActiveNow = -1;
  }
  /**
   * @param {LikeMyElement} element
   * @return {void}
   */
  addQueue(element: LikeMyElement): void {
    this._queue.push(element);
  }
  /**
   * @param {number} index
   * @return {LikeMyElement | undefined}
   */
  getQueue(index: number): LikeMyElement | void {
    if (index < 0) {
      index += this._queue.length;
    }

    return this._queue[index];
  }
  /**
   * @param {LikeMyElement} element
   * @return {void}
   */
  run(element: LikeMyElement): void {
    this.$parent.run(element);
  }
  /**
   * @return {fCanvas}
   */
  get $parent(): fCanvas {
    const canvas = this._els[this._idActiveNow === -1 ? 0 : this._idActiveNow];

    if (canvas?.constructor === fCanvas) {
      return canvas;
    } else {
      console.warn(
        "fCanvas: The current referenced version of the fCanvas.run function is incorrect."
      );
      return this._els[0];
    }
  }

  /**
   * @return {CanvasRenderingContext2D}
   */
  get $context2d(): CanvasRenderingContext2D {
    return this.$parent.$context2d;
  }
  /**
   * @param {number} angle
   * @return {number}
   */
  sin(angle: number): number {
    return this.$parent.sin(angle);
  }
  /**
   * @param {number} sin
   * @return {number}
   */
  asin(sin: number): number {
    return this.$parent.asin(sin);
  }
  /**
   * @param {number} angle
   * @return {number}
   */
  cos(angle: number): number {
    return this.$parent.cos(angle);
  }
  /**
   * @param {number} cos
   * @return {number}
   */
  acos(cos: number): number {
    return this.$parent.asin(cos);
  }
  /**
   * @param {number} angle
   * @return {number}
   */
  tan(angle: number): number {
    return this.$parent.tan(angle);
  }
  /**
   * @param {number} tan
   * @return {number}
   */
  atan(tan: number): number {
    return this.$parent.atan(tan);
  }
  /**
   * @param {number} y
   * @param {number} x
   * @return {number}
   */
  atan2(y: number, x: number): number {
    return this.$parent.atan2(y, x);
  }
  /**
   * @return {number | null}
   */
  get mouseX(): number | null {
    return this.$parent.mouseX;
  }
  /**
   * @return {number | null}
   */
  get mouseY(): number | null {
    return this.$parent.mouseY;
  }
  /**
   * @return {number}
   */
  get windowWidth(): number {
    return this.$parent.windowWidth;
  }
  /**
   * @return {number}
   */
  get windowHeight(): number {
    return this.$parent.windowHeight;
  }
  /**
   * @param  {number} red
   * @param  {number} green
   * @param  {number} blue
   * @param  {number} alpha
   * @returns void
   */
  fill(hue: number, saturation: number, lightness: number): void;
  fill(hue: number, saturation: number, bright: number): void;
  fill(red: number, green: number, blue: number): void;
  fill(hue: number, saturation: number, lightness: number, alpha: number): void;
  fill(hue: number, saturation: number, bright: number, alpha: number): void;
  fill(red: number, green: number, blue: number, alpha: number): void;
  fill(color: string): void;
  fill(colors: Array<number>): void;
  fill(gradient: CanvasGradient): void;
  fill(image: CanvasImageSource): void;
  fill(color: number): void;
  fill(...args: any[]): void {
    this.$context2d.fillStyle = this.$parent._toRgb(args as ParamsToRgb);
    this.$context2d.fill();
  }
  stroke(hue: number, saturation: number, lightness: number): void;
  stroke(hue: number, saturation: number, bright: number): void;
  stroke(red: number, green: number, blue: number): void;
  stroke(
    hue: number,
    saturation: number,
    lightness: number,
    alpha: number
  ): void;
  stroke(hue: number, saturation: number, bright: number, alpha: number): void;
  stroke(red: number, green: number, blue: number, alpha: number): void;
  stroke(color: string): void;
  stroke(colors: Array<number>): void;
  stroke(gradient: CanvasGradient): void;
  stroke(image: CanvasImageSource): void;
  stroke(color: number): void;
  /**
   * @param  {number} red
   * @param  {number} green
   * @param  {number} blue
   * @param  {number} alpha
   * @returns void
   */
  stroke(...args: any[]): void {
    this.$context2d.strokeStyle = this.$parent._toRgb(args as ParamsToRgb);
    this.$context2d.stroke();
  }
  /**
   * @return {void}
   */
  noFill(): void {
    this.fill(0, 0, 0, 0);
  }
  lineWidth(): number;
  lineWidth(width: number): void;
  /**
   * @param {number} value?
   * @return {number|void}
   */
  lineWidth(value?: number): number | void {
    if (value === undefined) {
      return this.$context2d.lineWidth;
    } else {
      this.$context2d.lineWidth = value;
    }
  }
  miterLimit(): number;
  miterLimit(value: number): void;
  /**
   * @param {number} value?
   * @return {number|void}
   */
  miterLimit(value?: number): number | void {
    if (value === undefined) {
      return this.$context2d.miterLimit;
    } else {
      if (this.lineJoin() !== "miter") {
        this.lineJoin("miter");
      }

      this.$context2d.miterLimit = value;
    }
  }
  shadowOffset(): Offset;
  shadowOffset(x: number, y: number): void;
  /**
   * @param {number} x?
   * @param {number} y?
   * @return {void|{ x: number, y: number }}
   */
  shadowOffset(x?: number, y?: number): Offset | void {
    if (arguments.length === 0) {
      return {
        x: this.$context2d.shadowOffsetX,
        y: this.$context2d.shadowOffsetY,
      };
    } else {
      [this.$context2d.shadowOffsetX, this.$context2d.shadowOffsetY] = [
        x || 0,
        y || 0,
      ];
    }
  }
  /**
   * @param {string} text
   * @return {number}
   */
  measureText(text: string): number {
    return this.$context2d.measureText(text).width;
  }
  /**
   * @return {void}
   */
  begin(): void {
    this.$context2d.beginPath();
  }
  /**
   * @return {void}
   */
  close(): void {
    this.$context2d.closePath();
  }
  /**
   * @return {void}
   */
  save(): void {
    this.$parent.save();
  }
  /**
   * @return {void}
   */
  restore(): void {
    this.$parent.restore();
  }
  rotate(): number;
  rotate(angle: number): void;
  /**
   * @param {number} angle?
   * @return {number | void}
   */
  rotate(angle?: number): number | void {
    if (angle === undefined) {
      return this.$parent.rotate();
    }
    this.$parent.rotate(angle);
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
      return this.$parent.translate();
    }

    this.$parent.translate(x as number, y as number);
  }
  /**
   * @param  {number} x
   * @param  {number} y
   * @param  {number} radius
   * @param  {number} astart
   * @param  {number} astop
   * @param  {boolean} reverse?
   * @returns void
   */
  arc(
    x: number,
    y: number,
    radius: number,
    astart: number,
    astop: number,
    reverse?: boolean
  ): void {
    this.begin();
    this.$context2d.arc(
      x,
      y,
      radius,
      this.$parent._toRadius(astart) - Math.PI / 2,
      this.$parent._toRadius(astop) - Math.PI / 2,
      reverse
    );
    this.close();
  }
  /**
   * @param  {number} x
   * @param  {number} y
   * @param  {number} radius
   * @param  {number} astart
   * @param  {number} astop
   * @param  {boolean} reverse?
   */
  pie(
    x: number,
    y: number,
    radius: number,
    astart: number,
    astop: number,
    reverse?: boolean
  ) {
    this.begin();
    this.move(x, y);
    this.arc(x, y, radius, astart, astop, reverse);
    this.to(x, y);
    this.close();
  }
  /**
   * @param  {number} x1
   * @param  {number} y1
   * @param  {number} x2
   * @param  {number} y2
   * @returns void
   */
  line(x1: number, y1: number, x2: number, y2: number): void {
    this.begin();
    this.move(x1, y1);
    this.to(x2, y2);
    this.close();
  }
  /**
   * @param  {number} x
   * @param  {number} y
   * @param  {number} radius1
   * @param  {number} radius2
   * @param  {number} astart
   * @param  {number} astop
   * @param  {number} reverse
   * @returns void
   */
  ellipse(
    x: number,
    y: number,
    radius1: number,
    radius2: number,
    astart: number,
    astop: number,
    reverse: number
  ): void {
    this.begin();
    this.$context2d.ellipse(
      x,
      y,
      radius1,
      radius2,
      this.$parent._toRadius(astart) - Math.PI / 2,
      this.$parent._toRadius(astop),
      reverse
    );
    this.close();
  }
  /**
   * @param  {number} x
   * @param  {number} y
   * @param  {number} radius
   * @returns void
   */
  circle(x: number, y: number, radius: number): void {
    this.arc(
      x,
      y,
      radius,
      0,
      this.$parent.angleMode() === "degress" ? 360 : Math.PI * 2
    );
  }
  /**
   * @param  {number} x
   * @param  {number} y
   * @returns void
   */
  point(x: number, y: number): void {
    this.circle(x, y, 1);
  }
  /**
   * @param  {number} x1
   * @param  {number} y1
   * @param  {number} x2
   * @param  {number} y2
   * @param  {number} x3
   * @param  {number} y3
   * @returns void
   */
  triange(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ): void {
    this.begin();
    this.move(x1, y1);
    this.to(x2, y2);
    this.to(x3, y3);
    this.close();
  }

  drawImage(image: CanvasImageSource, x: number, y: number): void;
  drawImage(
    image: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number
  ): void;
  drawImage(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    swidth: number,
    sheight: number,
    x: number,
    y: number,
    width: number,
    height: number
  ): void;
  /**
   * @param  {CanvasImageSource} image
   * @param  {number} sx?
   * @param  {number} sy?
   * @param  {number} swidth?
   * @param  {number} sheight?
   * @param  {number} x
   * @param  {number} y
   * @param  {number} width
   * @param  {number} height
   * @returns void
   */
  drawImage(image: CanvasImageSource, ...args: number[]): void {
    // @ts-expect-error
    this.$context2d.drawImage(image, ...(args as ParamsDrawImage));
  }
  rect(x: number, y: number, width: number, height: number): void;
  rect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: string | number
  ): void;
  rect(
    x: number,
    y: number,
    width: number,
    height: number,
    radiusLeft: string | number,
    radiusRight: string | number
  ): void;
  /**
   * @param  {number} x
   * @param  {number} y
   * @param  {number} width
   * @param  {number} height
   * @param  {string|number} radiusTopLeft
   * @param  {string|number} radiusTopRight
   * @param  {string|number} radiusBottomRight
   * @param  {string|number} radiusBottomLeft
   * @returns void
   */
  rect(
    x: number,
    y: number,
    width: number,
    height: number,
    radiusTopLeft: string | number,
    radiusTopRight: string | number,
    radiusBottomRight: string | number,
    radiusBottomLeft: string | number
  ): void;
  rect(
    x: number,
    y: number,
    w: number,
    h: number,
    radiusTopLeft?: string | number,
    radiusTopRight?: string | number,
    radiusBottomRight?: string | number,
    radiusBottomLeft?: string | number
  ): void {
    this.begin();
    [x, y] = this.$parent._figureOffset(x, y, w, h);

    if (arguments.length < 5) {
      this.$context2d.rect(x, y, w, h);
    } else {
      const fontSize = this.$parent.fontSize();
      const arc = [
        AutoToPx(radiusTopLeft, w, fontSize),
        AutoToPx(radiusTopRight, h, fontSize),
        AutoToPx(radiusBottomRight, w, fontSize),
        AutoToPx(radiusBottomLeft, h, fontSize),
      ];
      this.move(x, y);
      this.arcTo(x + w, y, x + w, y + h - arc[1], arc[1]);
      this.arcTo(x + w, y + h, x + w - arc[2], y + h, arc[2]);
      this.arcTo(x, y + h, x, y + h - arc[3], arc[3]);
      this.arcTo(x, y, x + w - arc[0], y, arc[0]);
    }
    this.close();
  }
  /**
   * @param  {number} cpx
   * @param  {number} cpy
   * @param  {number} x
   * @param  {number} y
   */
  quadratic(cpx: number, cpy: number, x: number, y: number): void {
    this.$context2d.quadraticCurveTo(cpx, cpy, x, y);
  }
  /**
   * @param {number} cp1x
   * @param {number} cp1y
   * @param {number} cp2x
   * @param {number} cp2y
   * @param {number} x
   * @param {number} y
   * @return {void}
   */
  bezier(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number
  ): void {
    this.$context2d.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @return {void}
   */
  move(x: number, y: number): void {
    this.$context2d.moveTo(x, y);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @return {void}
   */
  to(x: number, y: number): void {
    this.$context2d.lineTo(x, y);
  }
  /**
   * @param {string} text
   * @param {number} x
   * @param {number} y
   * @param {number} maxWidth?
   * @return {void}
   */
  fillText(text: string, x: number, y: number, maxWidth?: number): void {
    this.$context2d.fillText(text, x, y, maxWidth);
  }
  /**
   * @param {string} text
   * @param {number} x
   * @param {number} y
   * @param {number} maxWidth?
   * @return {void}
   */
  strokeText(text: string, x: number, y: number, maxWidth?: number): void {
    this.$context2d.strokeText(text, x, y, maxWidth);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @return {void}
   */
  fillRect(x: number, y: number, width: number, height: number): void {
    this.$context2d.fillRect(x, y, width, height);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @return {void}
   */
  strokeRect(x: number, y: number, width: number, height: number): void {
    this.$context2d.strokeRect(x, y, width, height);
  }
  lineDashOffset(): number;
  lineDashOffset(value: number): void;
  /**
   * @param {number} value?
   * @return {any}
   */
  lineDashOffset(value?: number): number | void {
    if (value === undefined) {
      return this.$context2d.lineDashOffset;
    }

    this.$context2d.lineDashOffset = value;
  }
  lineDash(): number[];
  lineDash(segments: number[]): void;
  lineDash(...segments: number[]): void;
  lineDash(...segments: Array<number[] | number>): number[] | void {
    if (segments.length === 0) {
      return this.$context2d.getLineDash();
    }

    if (Array.isArray(segments[0])) {
      this.$context2d.setLineDash(segments[0]);
    }

    this.$context2d.setLineDash(segments as number[]);
  }
  /**
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @param {number} radius
   * @return {void}
   */
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void {
    this.$context2d.arcTo(x1, y1, x2, y2, radius);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @return {boolean}
   */
  isPoint(x: number, y: number): boolean {
    return this.$context2d.isPointInPath(x, y);
  }
  /**
   * @param {any} width
   * @param {number} height?
   * @return {ImageData}
   */
  createImageData(height: ImageData): ImageData;
  createImageData(width: number, height: number): ImageData;
  createImageData(width: ImageData | number, height?: number): ImageData {
    return height
      ? this.$parent.createImageData(width as number, height)
      : this.$parent.createImageData(width as ImageData);
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @return {ImageData}
   */
  getImageData(x: number, y: number, width: number, height: number): ImageData {
    return this.$parent.getImageData(x, y, width, height);
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
      this.$parent.putImageData(
        imageData,
        x,
        y,
        xs as number,
        ys as number,
        width as number,
        height as number
      );
    } else {
      this.$parent.putImageData(imageData, x, y);
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
    return this.$parent.createPattern(image, direction);
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
    return this.$parent.createRadialGradient(x1, y1, r1, x2, y2, r2);
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
    return this.$parent.createLinearGradient(x, y, width, height);
  }

  lineJoin(): "bevel" | "round" | "miter";
  lineJoin(type: "bevel" | "round" | "miter"): void;
  /**
   * @param {"bevel"|"round"|"miter"} type?
   * @return {any}
   */
  lineJoin(
    type?: "bevel" | "round" | "miter"
  ): "bevel" | "round" | "miter" | void {
    if (type !== undefined) {
      this.$context2d.lineJoin = type;
    } else {
      return this.$context2d.lineJoin;
    }
  }
  lineCap(): "butt" | "round" | "square";
  lineCap(value: "butt" | "round" | "square"): void;
  /**
   * @param {"butt"|"round"|"square"} value?
   * @return {any}
   */
  lineCap(
    value?: "butt" | "round" | "square"
  ): "butt" | "round" | "square" | void {
    if (value !== undefined) {
      this.$context2d.lineCap = value;
    } else {
      return this.$context2d.lineCap;
    }
  }
  shadowBlur(): number;
  shadowBlur(opacity: number): void;
  /**
   * @param {number} opacity?
   * @return {any}
   */
  shadowBlur(opacity?: number): number | void {
    if (opacity === undefined) {
      return this.$context2d.shadowBlur;
    }

    this.$context2d.shadowBlur = opacity;
  }

  shadowColor(hue: number, saturation: number, lightness: number): void;
  shadowColor(hue: number, saturation: number, bright: number): void;
  shadowColor(red: number, green: number, blue: number): void;
  shadowColor(
    hue: number,
    saturation: number,
    lightness: number,
    alpha: number
  ): void;
  shadowColor(
    hue: number,
    saturation: number,
    bright: number,
    alpha: number
  ): void;
  shadowColor(red: number, green: number, blue: number, alpha: number): void;
  shadowColor(color: string): void;
  shadowColor(colors: Array<number>): void;
  shadowColor(gradient: CanvasGradient): void;
  shadowColor(image: CanvasImageSource): void;
  shadowColor(color: number): void;
  /**
   * @param {ParamsToRgb} ...args
   * @return {void}
   */
  shadowColor(...args: ParamsToRgb): void {
    this.$context2d.shadowColor = this.$parent._toRgb(args);
  }
  drawFocusIfNeeded(element: Element): void;
  drawFocusIfNeeded(path: Path2D, element: Element): void;
  drawFocusIfNeeded(path: Element | Path2D, element?: Element): void {
    if (element === undefined) {
      this.$context2d.drawFocusIfNeeded(path as Element);
    } else {
      this.$context2d.drawFocusIfNeeded(path as Path2D, element);
    }
  }
}

export class RectElement extends MyElement {
  public readonly type: string = "rect";
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @return {any}
   */
  constructor(x: number, y: number, width: number, height: number) {
    super();
    [this.x, this.y, this.width, this.height] = [
      x || 0,
      y || 0,
      width || 0,
      height || 0,
    ];
  }

  /**
   * @return {boolean}
   */
  get interact(): boolean {
    return RectImpactPoint(this, this.mouseX, this.mouseY);
  }
}

export class CircleElement extends MyElement {
  public readonly type: string = "circle";
  public x: number = 0;
  public y: number = 0;
  public radius: number = 0;

  /**
   * Describe your function
   * @param {number} x
   * @param {number} y
   * @param {number} radius
   * @return {any}
   */
  constructor(x: number, y: number, radius: number) {
    super();
    [this.x, this.y, this.radius] = [x || 0, y || 0, radius || 0];
  }

  /**
   * @return {boolean}
   */
  get interact(): boolean {
    return CircleImpactPoint(this, this.mouseX, this.mouseY);
  }
}

export class Point3D extends MyElement {
  x: number = 0;
  y: number = 0;
  z: number = 0;

  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {any}
   */
  constructor(x?: number, y?: number, z?: number) {
    super();
    [this.x, this.y, this.z] = [x || 0, y || 0, z || 0];
  }
  /**
   * @param {number} angle
   * @return {void}
   */
  rotateX(angle: number): void {
    this.y =
      this.y * this.$parent.cos(angle) + this.z * this.$parent.sin(angle);
    this.z =
      -this.y * this.$parent.sin(angle) + this.z * this.$parent.cos(angle);
  }
  /**
   * @param {number} angle
   * @return {void}
   */
  rotateY(angle: number): void {
    this.x =
      this.x * this.$parent.cos(angle) + this.z * this.$parent.sin(angle);
    this.z =
      -this.x * this.$parent.sin(angle) + this.z * this.$parent.cos(angle);
  }
  /**
   * @param {number} angle
   * @return {void}
   */
  rotateZ(angle: number): void {
    this.x =
      this.x * this.$parent.cos(angle) - this.y * this.$parent.sin(angle);
    this.y =
      this.x * this.$parent.sin(angle) + this.y * this.$parent.cos(angle);
  }

  draw: noop = (): void => {
    this.point(this.x, this.y);
  };
}
