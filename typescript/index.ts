import {
  AutoToPx,
  fontToArray,
  getTouchInfo,
  requestAnimationFrame,
  windowSize,
  isMobile,
  InfoTouch,
} from "./utils/index";
import Emitter, { CallbackEvent } from "./classes/Emitter";
import Stament from "./classes/Stament";
import Store from "./classes/Store";
import Vector from "./classes/Vector";
import Animate, { AnimateConfig, AnimateType } from "./classes/Animate";

///let noopFCanvas; /// new fCanvas after class fCanvas because error

type ColorType = "rgb" | "hsl" | "hue" | "hsb";
type AngleType = "degress" | "radial";
type ParamsToRgb = [any?, any?, any?, number?];
type AlignType = "left" | "center" | "right";
type BaselineType = "top" | "middle" | "bottom";
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
type ParamsDrawImage =
  | [number, number]
  | [number, number, number, number]
  | [number, number, number, number, number, number, number, number];

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
interface noop {
  (): void;
}

class MyElement {
  public update: any;
  public draw: any;

  private _els: fCanvas[] = [];
  private _idActiveNow: number = -1;
  private _queue: MyElement[] = [];

  /**
   * @param {fCanvas} canvas?
   * @return {any}
   */
  constructor(canvas?: fCanvas) {
    if (canvas?.constructor === fCanvas) {
      this._els.push(canvas);
    } else {
      this._els.push(noopFCanvas);
    }
  }

  /**
   * @return {HTMLCanvasElement}
   */
  get $el(): HTMLCanvasElement {
    return this.$parent.$el;
  }
  _run(canvas: fCanvas): void {
    this.bind(canvas);
    this._idActiveNow = canvas.id;

    if (typeof this.update === "function") {
      this.update();
    } else if (typeof this.draw === "function") {
      this.draw();
    }

    if (this._queue.length > 0) {
      for (
        let index = 0, length = this._queue.length;
        index < length;
        index++
      ) {
        this.run(this._queue[index]);
      }
    }

    this._idActiveNow = -1;
  }
  /**
   * @param {MyElement} element
   * @return {void}
   */
  addQueue(element: MyElement): void {
    if (element instanceof MyElement) {
      this._queue.push(element);
    } else {
      console.error(
        `fCanvas: the parameter passed to MyElement.addQueue() must be a fCanvas object.`
      );
    }
  }
  /**
   * @param {number} index
   * @return {MyElement | undefined}
   */
  getQueue(index: number): MyElement | undefined {
    if (index < 0) {
      index += this._queue.length;
    }

    return this._queue[index];
  }
  /**
   * @param {MyElement} element
   * @return {void}
   */
  run(element: MyElement): void {
    this.$parent.run(element);
  }
  /**
   * @param {number} id
   * @return {boolean}
   */
  has(id: number): boolean {
    return this._els.some((item) => item.id === id);
  }
  /**
   * @return {fCanvas}
   */
  get $parent(): fCanvas {
    const canvas =
      this._idActiveNow === null
        ? this._els[this._els.length - 1]
        : this._els.find((item) => item.id === this._idActiveNow);

    if (canvas instanceof fCanvas) {
      return canvas;
    } else {
      console.warn(
        "fCanvas: The current referenced version of the fCanvas.run function is incorrect."
      );
      return this._els[0];
    }
  }

  /**
   * @param {fCanvas} canvas
   * @return {void}
   */
  bind(canvas: fCanvas): void {
    if (canvas instanceof fCanvas) {
      if (this.has(canvas.id) === false) {
        this._els.push(canvas);
      }
    } else {
      console.error(
        "fCanvas: the parameter passed to MyElement.bind() must be a fCanvas object."
      );
    }
  }
  /**
   * @return {CanvasRenderingContext2D}
   */
  get $context2d(): CanvasRenderingContext2D {
    return this.$parent.$context2d;
  }

  _toRadius(value: number): number {
    return this.$parent._toRadius(value);
  }
  _toDegress(value: number): number {
    return this.$parent._toDegress(value);
  }
  _toRgb(...params: ParamsToRgb): string {
    return this.$parent._toRgb(params);
  }
  _figureOffset(
    x: number,
    y: number,
    width: number,
    height: number
  ): [number, number] {
    return this.$parent._figureOffset(x, y, width, height);
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
   * @return {boolean}
   */
  get interact(): boolean {
    return this.$parent.interact;
  }
  /**
   * @return {number}
   */
  get width(): number {
    return this.$parent.width;
  }
  /**
   * @return {number}
   */
  get height(): number {
    return this.$parent.height;
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
    this.$context2d.fillStyle = this._toRgb(args);
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
    this.$context2d.strokeStyle = this._toRgb(args);
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
  lineWidth(value?: number): any {
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
  miterLimit(value?: number): any {
    if (value === undefined) {
      return this.$context2d.miterLimit;
    } else {
      if (this.lineJoin() !== "miter") {
        this.lineJoin("miter");
      }

      this.$context2d.miterLimit = value;
    }
  }
  shadowOffset(): {
    x: number;
    y: number;
  };
  shadowOffset(x: number, y: number): void;
  /**
   * @param {number} x?
   * @param {number} y?
   * @return {void|{ x: number, y: number }}
   */
  shadowOffset(x?: number, y?: number): any {
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
      this._toRadius(astart) - Math.PI / 2,
      this._toRadius(astop) - Math.PI / 2,
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
    this.move(x1, y1);
    this.to(x2, y2);
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
      this._toRadius(astart) - Math.PI / 2,
      this._toRadius(astop),
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
    $1?: any,
    $2?: any,
    $3?: any,
    $4?: any
  ): void {
    this.begin();
    [x, y] = this._figureOffset(x, y, w, h);

    if (arguments.length < 5) {
      this.$context2d.rect(x, y, w, h);
    } else {
      const fontSize = this.$parent.fontSize();
      const arc = [
        AutoToPx($1, w, fontSize),
        AutoToPx($2, h, fontSize),
        AutoToPx($3, w, fontSize),
        AutoToPx($4, h, fontSize),
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
  lineDash(): number;
  lineDash(value: number): void;
  /**
   * @param {number} value?
   * @return {any}
   */
  lineDash(value?: number): any {
    if (value === undefined) {
      return this.$context2d.lineDashOffset;
    }

    this.$context2d.lineDashOffset = value;
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
  createImageData(width: any, height?: number): ImageData {
    return height
      ? this.$context2d.createImageData(width, height)
      : this.$context2d.createImageData(width);
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

  lineJoin(): "bevel" | "round" | "miter";
  lineJoin(type: "bevel" | "round" | "miter"): void;
  /**
   * @param {"bevel"|"round"|"miter"} type?
   * @return {any}
   */
  lineJoin(type?: "bevel" | "round" | "miter"): any {
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
  lineCap(value?: "butt" | "round" | "square"): any {
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
  shadowBlur(opacity?: number): any {
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
    this.$context2d.shadowColor = this._toRgb(args);
  }
}

class EAnimate extends MyElement {
  private __animate: Animate = new Animate();
  /**
   * @return {Animate}
   */
  public get animate(): Animate {
    return this.__animate;
  }
  /**
   * @param {AnimateConfig} animate?
   * @return {any}
   */
  constructor(animate?: AnimateConfig) {
    super();
    if (animate) {
      this.__animate.config(animate);
    }
  }

  /**
   * @return {Emitter}
   */
  get $(): Emitter {
    return this.animate.$;
  }
  /**
   * @return {boolean}
   */
  get running(): boolean {
    return this.animate.running;
  }
  /**
   * @return {boolean}
   */
  get done(): boolean {
    return this.animate.done;
  }
  /**
   * @return {number}
   */
  get xFrom(): number {
    return this.animate.xFrom;
  }
  /**
   * @return {number}
   */
  get yFrom(): number {
    return this.animate.yFrom;
  }
  /**
   * @return {number}
   */
  get zFrom(): number {
    return this.animate.zFrom;
  }

  /**
   * @return {number}
   */
  get xTo(): number {
    return this.animate.xTo;
  }
  /**
   * @return {number}
   */
  get yTo(): number {
    return this.animate.yTo;
  }
  /**
   * @return {number}
   */
  get zTo(): number {
    return this.animate.zTo;
  }

  /**
   * @return {number}
   */
  get x(): number {
    return this.animate.x;
  }
  /**
   * @return {number}
   */
  get y(): number {
    return this.animate.y;
  }
  /**
   * @return {number}
   */
  get z(): number {
    return this.animate.z;
  }

  /**
   * @return {number}
   */
  get frames(): number {
    return this.animate.frames;
  }
  /**
   * @return {number}
   */
  get frame(): number {
    return this.animate.frame;
  }
  /**
   * @param {number} value
   * @return {any}
   */
  set frame(value: number) {
    this.animate.frame = value;
  }

  /**
   * @param {AnimateConfig} animate
   * @return {void}
   */
  config(animate: AnimateConfig): void {
    this.animate.config(animate);
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {void}
   */
  set(x?: number, y?: number, z?: number): void {
    this.animate.set(x, y, z);
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {void}
   */
  moveTo(x?: number, y?: number, z?: number): void {
    this.animate.move(x, y, z);
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {Promise<void>}
   */
  moveAsync(x?: number, y?: number, z?: number): Promise<void> {
    return this.animate.moveAsync(x, y, z);
  }
  /**
   * @param {number} x?
   * @param {number} y?
   * @param {number} z?
   * @return {void}
   */
  moveImmediate(x?: number, y?: number, z?: number): void {
    this.animate.moveImmediate(x, y, z);
  }
  /**
   * @return {void}
   */
  addFrame(): void {
    this.animate.addFrame();
  }
  /**
   * @param {AnimateType} type
   * @return {void}
   */
  setType(type: AnimateType): void {
    this.animate.setType(type);
  }
  /**
   * @param {number} time
   * @return {void}
   */
  setTime(time: number): void {
    this.animate.setTime(time);
  }
}

class fCanvas {
  static Element: typeof MyElement = MyElement;
  static EAnimate: typeof EAnimate = EAnimate;
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
  /**
   * @return {CanvasRenderingContext2D}
   */
  get $context2d(): CanvasRenderingContext2D {
    if (this._context2dCaching === null) {
      this._context2dCaching = this.$el.getContext("2d");
    }

    return this._context2dCaching as CanvasRenderingContext2D;
  }

  /**
   * @param {HTMLCanvasElement} element?
   * @return {any}
   */
  constructor(element?: HTMLCanvasElement) {
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

    if (element instanceof HTMLCanvasElement) {
      this._el = element;
    }

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
   * @return {any}
   */
  append(parent: HTMLElement = document.body) {
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
   * @param {MyElement} element
   * @return {void}
   */
  run(element: MyElement): void {
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
    return this._ENV.angleMode === "radial" ? (value * Math.PI) / 180 : value;
  }
  _toDegress(value: number): number {
    return this._ENV.angleMode === "degress" ? (value * 180) / Math.PI : value;
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
  angleMode(value?: AngleType): any {
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
  rectAlign(value?: AlignType): any {
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
  colorMode(value?: ColorType): any {
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
  rectBaseline(value?: BaselineType): any {
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
  fontSize(value?: number): any {
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
  fontFamily(value?: string): any {
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
  fontWeight(value?: string): any {
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
    if (typeof params[0] === "object") {
      this.$context2d.drawImage(params[0], 0, 0, this.width, this.height);
    } else {
      this.$context2d.fillStyle = this._toRgb(params);
      this.$context2d.fill();
      this.$context2d.fillRect(0, 0, this.width, this.height);
    }
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
  rotate(value?: number): any {
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
      this._stamentReady.on(
        "preloaded",
        async (): Promise<void> => {
          await setup(callback);
          this._stamentReady.emit("setuped");
        }
      );
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
  font(value?: string): any {
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
  textAlign(value?: TextAlignType): any {
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
  textBaseline(value?: TextBaselineType): any {
    if (value === undefined) {
      return this.$context2d.textBaseline;
    }

    this.$context2d.textBaseline = value;
  }
  globalOperation(): GlobalCompositeOperationType;
  globalOperation(composite: GlobalCompositeOperationType): void;
  /**
   * @param {GlobalCompositeOperationType} value?
   * @return {any}
   */
  globalOperation(value?: GlobalCompositeOperationType): any {
    if (value === undefined) {
      return this.$context2d.globalCompositeOperation;
    }

    this.$context2d.globalCompositeOperation = value;
  }

  translate(): { x: number; y: number };
  translate(x: number, y: number): void;
  /**
   * @param {number} x?
   * @param {number} y?
   * @return {any}
   */
  translate(x?: number, y?: number): any {
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
  scale(): { x: number; y: number };
  scale(x: number, y: number): void;
  /**
   * @param {number} x?
   * @param {number} y?
   * @return {any}
   */
  scale(x?: number, y?: number): any {
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
  ): any {
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
      (cancelAnimationFrame || webkitCancelAnimationFrame || clearTimeout)(
        this.__idFrame
      );
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
  keyPressed(callback: CallbackEvent): noop {
    this.$el.addEventListener("keypress", callback);

    return () => {
      this.$el.removeEventListener("keypress", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  mouseIn(callback: CallbackEvent): noop {
    this.$el.addEventListener("mouseover", callback);

    return () => {
      this.$el.removeEventListener("mouseover", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  mouseOut(callback: CallbackEvent): noop {
    this.$el.addEventListener("mouseout", callback);

    return () => {
      this.$el.removeEventListener("mouseout", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  mouseDowned(callback: CallbackEvent): noop {
    this.$el.addEventListener("mousedown", callback);

    return () => {
      this.$el.removeEventListener("mousedown", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  touchStarted(callback: CallbackEvent): noop {
    this.$el.addEventListener("touchstart", callback);

    return () => {
      this.$el.removeEventListener("touchstart", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  touchMoved(callback: CallbackEvent): noop {
    this.$el.addEventListener("touchmove", callback);

    return () => {
      this.$el.removeEventListener("touchmove", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  touchEned(callback: CallbackEvent): noop {
    this.$el.addEventListener("touchend", callback);

    return () => {
      this.$el.removeEventListener("touchend", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  mouseMoved(callback: CallbackEvent): noop {
    this.$el.addEventListener("mousemove", callback);

    return () => {
      this.$el.removeEventListener("mousemove", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  mouseUped(callback: CallbackEvent): noop {
    this.$el.addEventListener("mouseup", callback);

    return () => {
      this.$el.removeEventListener("mouseup", callback);
    };
  }
  /**
   * @param {CallbackEvent} callback
   * @return {noop}
   */
  mouseClicked(callback: CallbackEvent): noop {
    this.$el.addEventListener("click", callback);

    return () => {
      this.$el.removeEventListener("click", callback);
    };
  }
}

const noopFCanvas: fCanvas = new fCanvas();

function bindEvent(
  name: string,
  callback: any,
  element: Element | Window | typeof globalThis
): { (): void } {
  element.addEventListener(name, callback);
  return () => {
    element.removeEventListener(name, callback);
  };
}

export { Emitter, Stament, Store, Vector, Animate };

let inited: boolean = false;
const emitter: Emitter = new Emitter();
/**
 * @param {any} document.readyState==="complete"
 * @return {any}
 */

export async function setup(callback: {
  (): Promise<void> | void;
}): Promise<void> {
  if (document.readyState === "complete") {
    //// readyState === "complete"

    inited = true;
    emitter.emit("load");
    const ret = callback();

    if (ret && "length" in ret) {
      await ret;
    }
  } else {
    await new Promise<void>((resolve, reject) => {
      function load() {
        document.removeEventListener("DOMContentLoaded", load);
        window.removeEventListener("load", load);

        inited = true;
        emitter.emit("load");
        callback();
        resolve();
      }

      document.addEventListener("DOMContentLoaded", load);
      window.addEventListener("load", load);
    });
  }
}
/**
 * @param {Function} callback
 * @param {fCanvas} canvas?
 * @return {void}
 */
export function draw(callback: { (): void }, canvas?: fCanvas): void {
  if (inited) {
    if (canvas && canvas.acceptClear === true) {
      canvas.clear();
    }
    callback();
    if (!canvas || canvas.acceptLoop === true) {
      requestAnimationFrame(() => draw(callback, canvas));
    }
  } else {
    emitter.once("load", (): void => {
      draw(callback, canvas);
    });
  }
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function keyPressed(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("keypress", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function changeSize(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("resize", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function mouseWheel(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("wheel", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function mousePressed(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("mousedown", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function mouseClicked(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("click", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function mouseMoved(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("mousemove", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function touchStarted(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("touchstart", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function touchMoved(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("touchmove", callback, element);
}
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export function touchEnded(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("touchend", callback, element);
}

export default fCanvas;
export * from "./methods/index";
