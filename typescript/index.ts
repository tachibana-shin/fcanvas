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

  constructor(canvas?: fCanvas) {
    if (canvas?.constructor === fCanvas) {
      this._els.push(canvas);
    } else {
      this._els.push(noopFCanvas);
    }
  }

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
  addQueue(element: MyElement): void {
    if (element instanceof MyElement) {
      this._queue.push(element);
    } else {
      console.error(
        `fCanvas: the parameter passed to MyElement.addQueue() must be a fCanvas object.`
      );
    }
  }
  getQueue(index: number): MyElement | undefined {
    if (index < 0) {
      index += this._queue.length;
    }

    return this._queue[index];
  }
  run(element: MyElement): void {
    this.$parent.run(element);
  }
  has(id: number): boolean {
    return this._els.some((item) => item.id === id);
  }
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
  sin(angle: number): number {
    return this.$parent.sin(angle);
  }
  asin(sin: number): number {
    return this.$parent.asin(sin);
  }
  cos(angle: number): number {
    return this.$parent.cos(angle);
  }
  acos(cos: number): number {
    return this.$parent.asin(cos);
  }
  tan(angle: number): number {
    return this.$parent.tan(angle);
  }
  atan(tan: number): number {
    return this.$parent.atan(tan);
  }
  atan2(y: number, x: number): number {
    return this.$parent.atan2(y, x);
  }
  get mouseX(): number | null {
    return this.$parent.mouseX;
  }
  get mouseY(): number | null {
    return this.$parent.mouseY;
  }
  get interact(): boolean {
    return this.$parent.interact;
  }
  get width(): number {
    return this.$parent.width;
  }
  get height(): number {
    return this.$parent.height;
  }
  get windowWidth(): number {
    return this.$parent.windowWidth;
  }
  get windowHeight(): number {
    return this.$parent.windowHeight;
  }

  fill(hue: number, saturation: number, lightness: number): void;
  fill(hue: number, saturation: number, bright: number): void;
  fill(red: number, green: number, blue: number): void;
  fill(hue: number, saturation: number, lightness: number, alpha: number): void;
  fill(hue: number, saturation: number, bright: number, alpha: number): void;
  fill(red: number, green: number, blue: number, alpha: number): void;
  fill(color: string): void;
  fill(colors: Array<number>): void;
  fill(gradient: CanvasGradient): void;
  fill(image: HTMLImageElement): void;
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
  stroke(image: HTMLImageElement): void;
  stroke(color: number): void;
  stroke(...args: any[]): void {
    this.$context2d.strokeStyle = this._toRgb(args);
    this.$context2d.stroke();
  }
  noFill(): void {
    this.fill(0, 0, 0, 0);
  }
  lineWidth(): number;
  lineWidth(width: number): void;
  lineWidth(value?: number): any {
    if (value === undefined) {
      return this.$context2d.lineWidth;
    } else {
      this.$context2d.lineWidth = value;
    }
  }
  miterLimit(): number;
  miterLimit(value: number): void;
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
  measureText(text: string): number {
    return this.$context2d.measureText(text).width;
  }
  begin(): void {
    this.$context2d.beginPath();
  }
  close(): void {
    this.$context2d.closePath();
  }
  save(): void {
    this.$parent.save();
  }
  restore(): void {
    this.$parent.restore();
  }

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
  line(x1: number, y1: number, x2: number, y2: number): void {
    this.move(x1, y1);
    this.to(x2, y2);
  }
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
  circle(x: number, y: number, radius: number): void {
    this.arc(
      x,
      y,
      radius,
      0,
      this.$parent.angleMode() === "degress" ? 360 : Math.PI * 2
    );
  }
  point(x: number, y: number): void {
    this.circle(x, y, 1);
  }
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

  drawImage(image: HTMLImageElement, x: number, y: number): void;
  drawImage(
    image: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
  ): void;
  drawImage(
    image: HTMLImageElement,
    sx: number,
    sy: number,
    swidth: number,
    sheight: number,
    x: number,
    y: number,
    width: number,
    height: number
  ): void;
  drawImage(image: HTMLImageElement, ...args: number[]): void {
    if (args.length === 2) {
      args = this._figureOffset(args[0], args[1], image.width, image.height);
    } else if (args.length === 6) {
      [args[5], args[6]] = this._figureOffset(
        args[0],
        args[1],
        args[2],
        args[3]
      );
    }
    this.$context2d.drawImage(
      image,
      args[0],
      args[1],
      args[2],
      args[3],
      args[4],
      args[5],
      args[6],
      args[7]
    );
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
  ) {
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

  quadratic(cpx: number, cpy: number, x: number, y: number): void {
    this.$context2d.quadraticCurveTo(cpx, cpy, x, y);
  }
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
  move(x: number, y: number): void {
    this.$context2d.moveTo(x, y);
  }
  to(x: number, y: number): void {
    this.$context2d.lineTo(x, y);
  }
  fillText(text: string, x: number, y: number, maxWidth?: number): void {
    this.$context2d.fillText(text, x, y, maxWidth);
  }
  strokeText(text: string, x: number, y: number, maxWidth?: number): void {
    this.$context2d.strokeText(text, x, y, maxWidth);
  }
  fillRect(x: number, y: number, width: number, height: number): void {
    this.$context2d.fillRect(x, y, width, height);
  }
  strokeRect(x: number, y: number, width: number, height: number): void {
    this.$context2d.strokeRect(x, y, width, height);
  }
  lineDash(): number;
  lineDash(value: number): void;
  lineDash(value?: number): any {
    if (value === undefined) {
      return this.$context2d.lineDashOffset;
    }

    this.$context2d.lineDashOffset = value;
  }
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void {
    this.$context2d.arcTo(x1, y1, x2, y2, radius);
  }
  isPoint(x: number, y: number): boolean {
    return this.$context2d.isPointInPath(x, y);
  }
  createImageData(height: ImageData): ImageData;
  createImageData(width: number, height: number): ImageData;
  createImageData(width: any, height?: number): ImageData {
    return height
      ? this.$context2d.createImageData(width, height)
      : this.$context2d.createImageData(width);
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
    image: HTMLImageElement,
    direction: "repeat" | "repeat-x" | "repeat-y" | "no-repeat"
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

  lineJoin(): "bevel" | "round" | "miter";
  lineJoin(type: "bevel" | "round" | "miter"): void;
  lineJoin(type?: "bevel" | "round" | "miter"): any {
    if (type !== undefined) {
      this.$context2d.lineJoin = type;
    } else {
      return this.$context2d.lineJoin;
    }
  }
  lineCap(): "butt" | "round" | "square";
  lineCap(value: "butt" | "round" | "square"): void;
  lineCap(value?: "butt" | "round" | "square"): any {
    if (value !== undefined) {
      this.$context2d.lineCap = value;
    } else {
      return this.$context2d.lineCap;
    }
  }
  shadowBlur(): number;
  shadowBlur(opacity: number): void;
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
  shadowColor(image: HTMLImageElement): void;
  shadowColor(color: number): void;
  shadowColor(...args: ParamsToRgb): void {
    this.$context2d.shadowColor = this._toRgb(args);
  }
}

class EAnimate extends MyElement {
  private __animate: Animate = new Animate();
  public get animate(): Animate {
    return this.__animate;
  }
  constructor(animate?: AnimateConfig) {
    super();
    if (animate) {
      this.__animate.config(animate);
    }
  }

  get $(): Emitter {
    return this.animate.$;
  }
  get running(): boolean {
    return this.animate.running;
  }
  get done(): boolean {
    return this.animate.done;
  }
  get xFrom(): number {
    return this.animate.xFrom;
  }
  get yFrom(): number {
    return this.animate.yFrom;
  }
  get zFrom(): number {
    return this.animate.zFrom;
  }

  get xTo(): number {
    return this.animate.xTo;
  }
  get yTo(): number {
    return this.animate.yTo;
  }
  get zTo(): number {
    return this.animate.zTo;
  }

  get x(): number {
    return this.animate.x;
  }
  get y(): number {
    return this.animate.y;
  }
  get z(): number {
    return this.animate.z;
  }

  get frames(): number {
    return this.animate.frames;
  }
  get frame(): number {
    return this.animate.frame;
  }
  set frame(value: number) {
    this.animate.frame = value;
  }

  config(animate: AnimateConfig): void {
    this.animate.config(animate);
  }
  set(x?: number, y?: number, z?: number): void {
    this.animate.set(x, y, z);
  }
  moveTo(x?: number, y?: number, z?: number): void {
    this.animate.move(x, y, z);
  }
  moveAsync(x?: number, y?: number, z?: number): Promise<void> {
    return this.animate.moveAsync(x, y, z);
  }
  moveImmediate(x?: number, y?: number, z?: number): void {
    this.animate.moveImmediate(x, y, z);
  }
  addFrame(): void {
    this.animate.addFrame();
  }
  setType(type: AnimateType): void {
    this.animate.setType(type);
  }
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
  get mouseX(): number | null {
    return this.touches[0]?.x || null;
  }
  get mouseY(): number | null {
    return this.touches[0]?.y || null;
  }
  get interact(): boolean {
    return this.touches.length > 0;
  }

  get id(): number {
    return this._id;
  }
  get $el(): HTMLCanvasElement {
    return this._el;
  }
  get $context2d(): CanvasRenderingContext2D {
    if (this._context2dCaching === null) {
      this._context2dCaching = this.$el.getContext("2d");
    }

    return this._context2dCaching as CanvasRenderingContext2D;
  }

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

  append(parent: HTMLElement = document.body) {
    if (parent.contains(this.$el) === false) {
      parent.appendChild(this.$el);
    }
  }
  noClear(): void {
    this._ENV.clear = false;
  }
  get acceptClear(): boolean {
    return this._ENV.clear;
  }

  run(element: MyElement): void {
    element._run(this);
  }

  get width(): number {
    return this.$el.width;
  }
  set width(value: number) {
    this.$el.width = value;
  }
  get height(): number {
    return this.$el.height;
  }
  set height(value: number) {
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
  angleMode(value?: AngleType): any {
    if (value === undefined) {
      return this._ENV.angleMode;
    }

    this._ENV.angleMode = value;
  }
  rectAlign(): AlignType;
  rectAlign(align: AlignType): void;
  rectAlign(value?: AlignType): any {
    if (value === undefined) {
      return this._ENV.rectAlign;
    }

    this._ENV.rectAlign = value;
  }
  colorMode(): ColorType;
  colorMode(mode: ColorType): void;
  colorMode(value?: ColorType): any {
    if (value === undefined) {
      return this._ENV.colorMode;
    }

    this._ENV.colorMode = value;
  }
  rectBaseline(): BaselineType;
  rectBaseline(baseline: BaselineType): void;
  rectBaseline(value?: BaselineType): any {
    if (value === undefined) {
      return this._ENV.rectBaseline;
    }

    this._ENV.rectBaseline = value;
  }

  fontSize(): number;
  fontSize(size: number): void;
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
  fontWeight(value?: string): any {
    const { size, weight, family } = fontToArray(this.font());

    if (value === undefined) {
      return weight;
    } else {
      this.font([value, `${size}px`, family].join(" "));
    }
  }
  clear(
    x: number = 0,
    y: number = 0,
    w: number = this.width,
    h: number = this.height
  ): void {
    this.$context2d.clearRect(x, y, w, h);
  }
  background(...params: ParamsToRgb): void {
    if (params[0]?.constructor === HTMLImageElement) {
      this.$context2d.drawImage(params[0], 0, 0, this.width, this.height);
    } else {
      this.$context2d.fillStyle = this._toRgb(params);
      this.$context2d.fill();
      this.$context2d.fillRect(0, 0, this.width, this.height);
    }
  }
  toDataURL(type = "image/png", scale?: number): string {
    return this.$el.toDataURL(type, scale);
  }
  rotate(): number;
  rotate(value: number): void;
  rotate(value?: number): any {
    if (value === undefined) {
      return this._ENV.rotate;
    } else {
      this.$context2d.rotate((this._ENV.rotate = this._toRadius(value)));
    }
  }
  resetTransform(): void {
    this.setTransform(1, 0, 0, 1, 0, 0);
  }

  async preload(callback: { (): void }): Promise<void> {
    this._existsPreload = true;
    await callback();

    this._stamentReady.emit("preloaded");
  }
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
  draw(callback: { (): void }): void {
    this._stamentReady.on("setuped", (): void => {
      draw(callback, this);
    });
  }

  font(): string;
  font(font: string): void;
  font(value?: string): any {
    if (value === undefined) {
      return this.$context2d.font;
    }

    this.$context2d.font = value;
  }
  textAlign(): TextAlignType;
  textAlign(type: TextAlignType): void;
  textAlign(value?: TextAlignType): any {
    if (value === undefined) {
      return this.$context2d.textAlign;
    }

    this.$context2d.textAlign = value;
  }
  textBaseline(): TextBaselineType;
  textBaseline(middle: TextBaselineType): void;
  textBaseline(value?: TextBaselineType): any {
    if (value === undefined) {
      return this.$context2d.textBaseline;
    }

    this.$context2d.textBaseline = value;
  }
  globalOperation(): GlobalCompositeOperationType;
  globalOperation(composite: GlobalCompositeOperationType): void;
  globalOperation(value?: GlobalCompositeOperationType): any {
    if (value === undefined) {
      return this.$context2d.globalCompositeOperation;
    }

    this.$context2d.globalCompositeOperation = value;
  }

  translate(): { x: number; y: number };
  translate(x: number, y: number): void;
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
  resetTranslate(): void {
    this.$context2d.translate(-this.__translate.sumX, -this.__translate.sumY);
  }
  scale(): { x: number; y: number };
  scale(x: number, y: number): void;
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
  resetScale(): void {
    this.$context2d.translate(-this.__translate.sumX, -this.__translate.sumY);
  }
  clip(): void;
  clip(fillRule: "nonzero" | "evenodd"): void;
  clip(path: Path2D, fillRule: "nonzero" | "evenodd"): void;
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
    this.$el.style.cursor = "auto";
  }
  noCursor(): void {
    this.$el.style.cursor = "none";
  }
  loop(): void {
    this._ENV.loop = true;
    this._stamentReady.emit("setuped");
  }
  noLoop() {
    this._ENV.loop = false;
    if (this.__idFrame) {
      (cancelAnimationFrame || webkitCancelAnimationFrame || clearTimeout)(
        this.__idFrame
      );
    }
  }
  get acceptLoop(): boolean {
    return this._ENV.loop;
  }
  keyPressed(callback: CallbackEvent): noop {
    this.$el.addEventListener("keypress", callback);

    return () => {
      this.$el.removeEventListener("keypress", callback);
    };
  }
  mouseIn(callback: CallbackEvent): noop {
    this.$el.addEventListener("mouseover", callback);

    return () => {
      this.$el.removeEventListener("mouseover", callback);
    };
  }
  mouseOut(callback: CallbackEvent): noop {
    this.$el.addEventListener("mouseout", callback);

    return () => {
      this.$el.removeEventListener("mouseout", callback);
    };
  }
  mouseDowned(callback: CallbackEvent): noop {
    this.$el.addEventListener("mousedown", callback);

    return () => {
      this.$el.removeEventListener("mousedown", callback);
    };
  }
  touchStarted(callback: CallbackEvent): noop {
    this.$el.addEventListener("touchstart", callback);

    return () => {
      this.$el.removeEventListener("touchstart", callback);
    };
  }
  touchMoved(callback: CallbackEvent): noop {
    this.$el.addEventListener("touchmove", callback);

    return () => {
      this.$el.removeEventListener("touchmove", callback);
    };
  }
  touchEned(callback: CallbackEvent): noop {
    this.$el.addEventListener("touchend", callback);

    return () => {
      this.$el.removeEventListener("touchend", callback);
    };
  }
  mouseMoved(callback: CallbackEvent): noop {
    this.$el.addEventListener("mousemove", callback);

    return () => {
      this.$el.removeEventListener("mousemove", callback);
    };
  }
  mouseUped(callback: CallbackEvent): noop {
    this.$el.addEventListener("mouseup", callback);

    return () => {
      this.$el.removeEventListener("mouseup", callback);
    };
  }
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
export function keyPressed(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("keypress", callback, element);
}
export function changeSize(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("resize", callback, element);
}
export function mouseWheel(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("wheel", callback, element);
}
export function mousePressed(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("mousedown", callback, element);
}
export function mouseClicked(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("click", callback, element);
}
export function mouseMoved(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("mousemove", callback, element);
}
export function touchStarted(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("touchstart", callback, element);
}
export function touchMoved(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("touchmove", callback, element);
}
export function touchEnded(
  callback: CallbackEvent,
  element: Window | HTMLElement = window
): { (): void } {
  return bindEvent("touchend", callback, element);
}

export default fCanvas;
export * from "./methods/index";
