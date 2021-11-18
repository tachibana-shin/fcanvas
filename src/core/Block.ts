import map from "../functions/map";
import {
  intersectCirclePoint,
  intersectRectPoint,
} from "../functions/intersects";
import { throwError } from "../helpers/throw";
import type { noop } from "../types";
import convertValueToPixel from "../utils/convertValueToPixel";
import { ReadonlyOffset } from "../utils/getTouchInfo";

import fCanvas, {
  DirectionPattern,
  getCanvasInstance,
  ParamsToRgb,
} from "./fCanvas";

type LineJoin = "bevel" | "round" | "miter";
type LineCap = "butt" | "round" | "square";

function existsCbDraw(
  el: CanvasElement & {
    readonly draw?: () => void;
  }
): el is CanvasElement & {
  readonly draw: () => void;
} {
  return typeof el.draw === "function";
}
function existsCbUpdate(
  el: CanvasElement & {
    readonly update?: () => void;
  }
): el is CanvasElement & {
  readonly update: () => void;
} {
  return typeof el.update === "function";
}

function compressTypeToImage(
  source: CanvasImageSource
): source is typeof source & {
  readonly width: number;
  readonly height: number;
} {
  return true;
}
export abstract class Block {
  public get type(): "rect" | "circle" | "point" | "unknown" {
    if ("x" in this && "y" in this) {
      if ("width" in this && "height" in this) {
        return "rect";
      }

      if ("radius" in this) {
        return "circle";
      }

      return "point";
    }

    return "unknown";
  }
  // eslint-disable-next-line functional/prefer-readonly-type
  private canvasInstance: fCanvas | null = null;

  render(canvas = getCanvasInstance()): void {
    this.canvasInstance = canvas;

    if (existsCbUpdate(this)) {
      if (existsCbDraw(this)) {
        this.draw();
      }
      this.update();
    } else if (existsCbDraw(this)) {
      this.draw();
    }

    this.canvasInstance = null;
  }
  get fcanvas(): fCanvas {
    if (this.canvasInstance instanceof fCanvas) {
      return this.canvasInstance;
    } else {
      // eslint-disable-next-line functional/no-throw-statement
      throw throwError(
        "the current referenced version of the fCanvas.run function is incorrect."
      );
    }
  }

  // > share object
  sin(angle: number): number {
    return this.fcanvas.sin(angle);
  }
  asin(sin: number): number {
    return this.fcanvas.asin(sin);
  }
  cos(angle: number): number {
    return this.fcanvas.cos(angle);
  }
  acos(cos: number): number {
    return this.fcanvas.asin(cos);
  }
  tan(angle: number): number {
    return this.fcanvas.tan(angle);
  }
  atan(tan: number): number {
    return this.fcanvas.atan(tan);
  }
  atan2(y: number, x: number): number {
    return this.fcanvas.atan2(y, x);
  }

  get mouseX(): number | null {
    return this.fcanvas.mouseX;
  }
  get mouseY(): number | null {
    return this.fcanvas.mouseY;
  }
  get movedX(): number {
    return this.fcanvas.movedX;
  }
  get movedY(): number {
    return this.fcanvas.movedY;
  }
  get pmouseX(): number {
    return this.fcanvas.pmouseX;
  }
  get pmouseY(): number {
    return this.fcanvas.pmouseY;
  }
  get mouseIsPressed(): boolean {
    return this.fcanvas.mouseIsPressed;
  }

  get isPressed(): boolean {
    if (
      this.mouseX === null ||
      this.mouseY === null ||
      "x" in this === false ||
      "y" in this === false
    ) {
      return false;
    }

    switch (this.type) {
      case "rect":
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return intersectRectPoint(this as any, this.mouseX, this.mouseY);
      case "circle":
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return intersectCirclePoint(this as any, this.mouseX, this.mouseY);
      case "point":
        return (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this as any).x &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this as any).y &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (Math.round((this as any).x) === Math.round(this.mouseX),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Math.round((this as any).y) === Math.round(this.mouseY))
        );
      default:
        return false;
    }
  }
  get isPressedInTouches(): boolean {
    if (
      this.mouseX === null ||
      this.mouseY === null ||
      "x" in this === false ||
      "y" in this === false
    ) {
      return false;
    }

    switch (this.type) {
      case "rect":
        return this.fcanvas.touches.some((item) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          intersectRectPoint(this as any, item.x, item.y)
        );
      case "circle":
        return this.fcanvas.touches.some((item) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          intersectCirclePoint(this as any, item.x, item.y)
        );
      case "point":
        return this.fcanvas.touches.some(
          (item) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Math.round((this as any).x) === Math.round(item.x) &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Math.round((this as any).y) === Math.round(item.y)
        );
      default:
        return false;
    }
  }

  get windowWidth(): number {
    return this.fcanvas.windowWidth;
  }
  get windowHeight(): number {
    return this.fcanvas.windowHeight;
  }
  // > /shared

  fill(
    hue: number,
    saturation: number,
    lightness: number,
    alpha?: number
  ): void;
  fill(red: number, green: number, blue: number, alpha?: number): void;
  fill(
    color?: string | CanvasGradient | CanvasImageSource | CanvasPattern | number
  ): void;
  // eslint-disable-next-line functional/functional-parameters
  fill(...args: ParamsToRgb): void {
    // eslint-disable-next-line functional/immutable-data
    this.fcanvas.ctx.fillStyle = this.fcanvas._toRgb(args);
    this.fcanvas.ctx.fill();
  }
  stroke(
    hue: number,
    saturation: number,
    lightness: number,
    alpha?: number
  ): void;
  stroke(red: number, green: number, blue: number, alpha?: number): void;
  stroke(
    color?: string | CanvasGradient | CanvasPattern | CanvasImageSource | number
  ): void;
  // eslint-disable-next-line functional/functional-parameters
  stroke(...args: ParamsToRgb): void {
    // eslint-disable-next-line functional/immutable-data
    this.fcanvas.ctx.strokeStyle = this.fcanvas._toRgb(args);
    this.fcanvas.ctx.stroke();
  }
  noFill(): void {
    return this.fill(0, 0, 0, 0);
  }
  lineWidth(): number;
  lineWidth(width: number): void;
  lineWidth(value?: number): number | void {
    if (value === undefined) {
      return this.fcanvas.ctx.lineWidth;
    }
    // eslint-disable-next-line functional/immutable-data
    this.fcanvas.ctx.lineWidth = this.fcanvas._getPixel(value);
  }
  miterLimit(): number;
  miterLimit(value: number): void;
  miterLimit(value?: number): number | void {
    if (value === undefined) {
      return this.fcanvas.ctx.miterLimit;
    }
    this.lineJoin("miter");

    // eslint-disable-next-line functional/immutable-data
    this.fcanvas.ctx.miterLimit = value;
  }
  shadowOffset(): ReadonlyOffset;
  shadowOffset(x: number, y: number): void;
  shadowOffset(x?: number, y?: number): ReadonlyOffset | void {
    // eslint-disable-next-line functional/functional-parameters
    if (arguments.length === 0) {
      return {
        x: this.fcanvas.ctx.shadowOffsetX,
        y: this.fcanvas.ctx.shadowOffsetY,
      };
    }

    [this.fcanvas.ctx.shadowOffsetX, this.fcanvas.ctx.shadowOffsetY] = [
      this.fcanvas._getPixel(x || 0),
      this.fcanvas._getPixel(y || 0),
    ];
  }
  measureText(text: string): number {
    return this.fcanvas.measureText(text);
  }
  begin(): void {
    this.fcanvas.ctx.beginPath();
  }
  close(): void {
    this.fcanvas.ctx.closePath();
  }
  save(): void {
    this.fcanvas.save();
  }
  restore(): void {
    this.fcanvas.restore();
  }
  rotate(): number;
  rotate(angle: number): void;
  rotate(angle?: number): number | void {
    if (angle === undefined) {
      return this.fcanvas.rotate();
    }
    this.fcanvas.rotate(angle);
  }
  translate(): ReadonlyOffset;
  translate(x: number, y: number): void;
  translate(x?: number, y?: number): ReadonlyOffset | void {
    // eslint-disable-next-line functional/functional-parameters
    if (arguments.length === 0) {
      return this.fcanvas.translate();
    }

    this.fcanvas.translate(x as number, y as number);
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
    this.fcanvas.ctx.arc(
      this.fcanvas._getPixel(x),
      this.fcanvas._getPixel(y),
      radius,
      this.fcanvas._toRadius(astart) - Math.PI / 2,
      this.fcanvas._toRadius(astop) - Math.PI / 2,
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
  ): void {
    this.move(x, y);
    this.arc(x, y, radius, astart, astop, reverse);
    this.to(x, y);
  }
  line(x1: number, y1: number, x2: number, y2: number): void {
    // this.begin();
    this.move(x1, y1);
    this.to(x2, y2);
    // this.close();fix
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
    this.fcanvas.ctx.ellipse(
      this.fcanvas._getPixel(x),
      this.fcanvas._getPixel(y),
      radius1,
      radius2,
      this.fcanvas._toRadius(astart) - Math.PI / 2,
      this.fcanvas._toRadius(astop),
      reverse
    );
    this.close();
  }
  circle(x: number, y: number, radius: number): void {
    return this.arc(
      x,
      y,
      radius,
      0,
      this.fcanvas.angleMode() === "degress" ? 360 : Math.PI * 2
    );
  }
  point(x: number, y: number): void {
    return this.circle(x, y, 1);
  }
  triangle(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ): void {
    this.move(x1, y1);
    this.to(x2, y2);
    this.to(x3, y3);
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
    xStartCut: number,
    yStartCut: number,
    widthCut: number,
    sheightCut: number,
    x: number,
    y: number,
    width: number,
    height: number
  ): void;
  // eslint-disable-next-line functional/functional-parameters
  drawImage(image: CanvasImageSource, ...args: readonly number[]): void {
    // eslint-disable-next-line prefer-spread
    this.fcanvas.ctx.drawImage.apply(this.fcanvas.ctx, [
      image,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(args as readonly any[]),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any);
  }
  drawImageRepeat(
    image: CanvasImageSource,
    x: number,
    y: number,
    frameWidth: number,
    frameHeight: number
  ): void;
  drawImageRepeat(
    image: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number,
    frameWidth: number,
    frameHeight: number
  ): void;
  drawImageRepeat(
    image: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    frameWidth: number,
    frameHeight: number
  ): void;
  drawImageRepeat(
    image: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number,
    offsetX?: number,
    offsetY?: number,
    frameWidth?: number,
    frameHeight?: number
  ): void {
    if (compressTypeToImage(image)) {
      // eslint-disable-next-line functional/functional-parameters
      if (arguments.length === 5) {
        frameWidth = width;
        frameHeight = height;

        width = image.width;
        height = image.height;
        offsetX = 0;
        offsetY = 0;
      }
      // eslint-disable-next-line functional/functional-parameters
      if (arguments.length === 7) {
        frameWidth = offsetX;
        frameHeight = offsetY;
        offsetX = 0;
        offsetY = 0;
      }

      offsetX = offsetX as number;
      offsetY = offsetY as number;
      frameWidth = frameWidth as number;
      frameHeight = frameHeight as number;

      offsetX %= width;
      offsetY %= height;

      const widthCutRen =
        (frameWidth % width === 0 ? width : frameWidth % width) + offsetX;
      const heightCutRen =
        (frameHeight % height === 0 ? height : frameHeight % height) + offsetY;

      const maxX = width === 0 ? 0 : Math.ceil(frameWidth / width);
      const maxY = height === 0 ? 0 : Math.ceil(frameHeight / height);
      // eslint-disable-next-line functional/no-let
      let xIndex = 0,
        yIndex = 0;
      // eslint-disable-next-line functional/no-loop-statement
      while (xIndex < maxX) {
        yIndex = 0;
        // eslint-disable-next-line functional/no-loop-statement
        while (yIndex < maxY) {
          // eslint-disable-next-line functional/no-let
          let xStartCut = 0,
            yStartCut = 0,
            widthCut_1,
            heightCut_1,
            x_1,
            y_1,
            widthCutRen_1 = width,
            heightCutRen_1 = height;

          if (xIndex === 0) {
            xStartCut = map(offsetX, 0, width, 0, image.width);
            x_1 = x;
          } else {
            x_1 = x - offsetX + xIndex * width;
          }
          if (yIndex === 0) {
            yStartCut = map(offsetY, 0, height, 0, image.height);
            y_1 = y;
          } else {
            y_1 = y - offsetY + yIndex * height;
          }

          if (xIndex === maxX - 1) {
            widthCut_1 = map(widthCutRen, 0, width, 0, image.width);
            widthCutRen_1 = widthCutRen;
          } else {
            widthCut_1 = image.width;
          }
          if (yIndex === maxY - 1) {
            heightCut_1 = map(heightCutRen, 0, height, 0, image.height);
            heightCutRen_1 = heightCutRen;
          } else {
            heightCut_1 = image.height;
          }
          this.drawImage(
            image,
            xStartCut,
            yStartCut,
            widthCut_1,
            heightCut_1,
            x_1,
            y_1,
            widthCutRen_1,
            heightCutRen_1
          );

          yIndex++;
        }

        xIndex++;
      }
    }
  }
  rRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: string | number
  ): void;
  rRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radiusLeft: string | number,
    radiusRight: string | number
  ): void;
  rRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radiusTopLeft: string | number,
    radiusTopRight: string | number,
    radiusBottomRight: string | number,
    radiusBottomLeft: string | number
  ): void;
  rRect(
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
    [x, y, w, h] = this.fcanvas._argsRect(x, y, w, h);

    const fontSize = this.fcanvas.fontSize();
    const arc = [
      convertValueToPixel(radiusTopLeft || 0, fontSize),
      convertValueToPixel(radiusTopRight || 0, fontSize),
      convertValueToPixel(radiusBottomRight || 0, fontSize),
      convertValueToPixel(radiusBottomLeft || 0, fontSize),
    ];
    this.move(x, y);
    this.arcTo(x + w, y, x + w, y + h - arc[1], arc[1]);
    this.arcTo(x + w, y + h, x + w - arc[2], y + h, arc[2]);
    this.arcTo(x, y + h, x, y + h - arc[3], arc[3]);
    this.arcTo(x, y, x + w - arc[0], y, arc[0]);

    this.close();
  }
  rect(x: number, y: number, width: number, height: number): void {
    this.begin();
    [x, y, width, height] = this.fcanvas._argsRect(x, y, width, height);
    this.fcanvas.ctx.rect(
      this.fcanvas._getPixel(x),
      this.fcanvas._getPixel(y),
      width,
      height
    );
    this.close();
  }
  quadratic(cpx: number, cpy: number, x: number, y: number): void {
    this.fcanvas.ctx.quadraticCurveTo(cpx, cpy, x, y);
  }
  bezier(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number
  ): void {
    this.fcanvas.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  }
  move(x: number, y: number): void {
    this.fcanvas.ctx.moveTo(
      this.fcanvas._getPixel(x),
      this.fcanvas._getPixel(y)
    );
  }
  to(x: number, y: number): void {
    this.fcanvas.ctx.lineTo(
      this.fcanvas._getPixel(x),
      this.fcanvas._getPixel(y)
    );
  }
  fillText(text: string, x: number, y: number, maxWidth?: number): void {
    this.fcanvas.ctx.fillText(
      text,
      this.fcanvas._getPixel(x),
      this.fcanvas._getPixel(y),
      maxWidth
    );
  }
  strokeText(text: string, x: number, y: number, maxWidth?: number): void {
    this.fcanvas.ctx.strokeText(
      text,
      this.fcanvas._getPixel(x),
      this.fcanvas._getPixel(y),
      maxWidth
    );
  }
  fillRect(x: number, y: number, width: number, height: number): void {
    this.fcanvas.ctx.fillRect(
      this.fcanvas._getPixel(x),
      this.fcanvas._getPixel(y),
      width,
      height
    );
  }
  strokeRect(x: number, y: number, width: number, height: number): void {
    this.fcanvas.ctx.strokeRect(
      this.fcanvas._getPixel(x),
      this.fcanvas._getPixel(y),
      width,
      height
    );
  }
  lineDashOffset(): number;
  lineDashOffset(value: number): void;
  lineDashOffset(value?: number): number | void {
    if (value === undefined) {
      return this.fcanvas.ctx.lineDashOffset;
    }

    // eslint-disable-next-line functional/immutable-data
    this.fcanvas.ctx.lineDashOffset = value;
  }
  lineDash(): readonly number[];
  lineDash(segments: readonly number[]): void;
  lineDash(...segments: readonly number[]): void;
  lineDash(
    // eslint-disable-next-line functional/functional-parameters
    ...segments: ReadonlyArray<readonly number[] | number>
  ): readonly number[] | void {
    if (segments.length === 0) {
      return this.fcanvas.ctx.getLineDash();
    }

    if (Array.isArray(segments[0])) {
      this.fcanvas.ctx.setLineDash(segments[0]);
    }

    this.fcanvas.ctx.setLineDash(segments as readonly number[]);
  }
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void {
    this.fcanvas.ctx.arcTo(
      this.fcanvas._getPixel(x1),
      this.fcanvas._getPixel(y1),
      this.fcanvas._getPixel(x2),
      this.fcanvas._getPixel(y2),
      radius
    );
  }
  isPoint(x: number, y: number): boolean {
    return this.fcanvas.ctx.isPointInPath(x, y);
  }
  createImageData(height: ImageData): ImageData;
  createImageData(width: number, height: number): ImageData;
  createImageData(width: ImageData | number, height?: number): ImageData {
    return height
      ? this.fcanvas.createImageData(width as number, height)
      : this.fcanvas.createImageData(width as ImageData);
  }
  getImageData(x: number, y: number, width: number, height: number): ImageData {
    return this.fcanvas.getImageData(x, y, width, height);
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
      this.fcanvas.putImageData(
        imageData,
        x,
        y,
        xs as number,
        ys as number,
        width as number,
        height as number
      );
    } else {
      this.fcanvas.putImageData(imageData, x, y);
    }
  }
  createPattern(
    image: CanvasImageSource,
    direction: DirectionPattern
  ): CanvasPattern | null {
    return this.fcanvas.createPattern(image, direction);
  }
  createRadialGradient(
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
  ): CanvasGradient {
    return this.fcanvas.createRadialGradient(x1, y1, r1, x2, y2, r2);
  }
  createLinearGradient(
    x: number,
    y: number,
    width: number,
    height: number
  ): CanvasGradient {
    return this.fcanvas.createLinearGradient(x, y, width, height);
  }

  lineJoin(): LineJoin;
  lineJoin(type: LineJoin): void;
  lineJoin(type?: LineJoin): LineJoin | void {
    if (type === undefined) {
      return this.fcanvas.ctx.lineJoin;
    }

    // eslint-disable-next-line functional/immutable-data
    this.fcanvas.ctx.lineJoin = type;
  }
  lineCap(): LineCap;
  lineCap(value: LineCap): void;
  lineCap(value?: LineCap): LineCap | void {
    if (value === undefined) {
      return this.fcanvas.ctx.lineCap;
    }
    // eslint-disable-next-line functional/immutable-data
    this.fcanvas.ctx.lineCap = value;
  }
  shadowBlur(): number;
  shadowBlur(opacity: number): void;
  shadowBlur(opacity?: number): number | void {
    if (opacity === undefined) {
      return this.fcanvas.ctx.shadowBlur;
    }

    // eslint-disable-next-line functional/immutable-data
    this.fcanvas.ctx.shadowBlur = opacity;
  }

  shadowColor(
    hue: number,
    saturation: number,
    lightness: number,
    alpha?: number
  ): void;
  shadowColor(red: number, green: number, blue: number, alpha?: number): void;
  shadowColor(
    color?: string | CanvasGradient | CanvasImageSource | number
  ): void;
  // eslint-disable-next-line functional/functional-parameters
  shadowColor(...args: ParamsToRgb): void {
    // eslint-disable-next-line functional/immutable-data
    this.fcanvas.ctx.shadowColor = this.fcanvas._toRgb(args);
  }
  drawFocusIfNeeded(element: Element): void;
  drawFocusIfNeeded(path: Path2D, element: Element): void;
  drawFocusIfNeeded(path: Element | Path2D, element?: Element): void {
    if (element === undefined) {
      this.fcanvas.ctx.drawFocusIfNeeded(path as Element);
    } else {
      this.fcanvas.ctx.drawFocusIfNeeded(path as Path2D, element);
    }
  }

  polyline(...points: readonly number[]): void;
  polyline(...points: readonly (readonly [number, number])[]): void;
  polyline(
    // eslint-disable-next-line functional/functional-parameters
    ...points: readonly number[] | ReadonlyArray<readonly [number, number]>
  ): void {
    if (points.length > 0) {
      if (Array.isArray(points[0])) {
        this.move(points[0][0], points[0][1]);

        // eslint-disable-next-line functional/no-let
        let index = 1;
        const { length } = points;

        // eslint-disable-next-line functional/no-loop-statement
        while (index < length) {
          this.to(
            (points[index] as readonly [number, number])[0],
            (points[index] as readonly [number, number])[1]
          );
          index++;
        }
      } else {
        if (points.length > 1) {
          this.move(points[0] as number, points[1] as number);

          // eslint-disable-next-line functional/no-let
          let index = 2;
          const { length } = points;

          // eslint-disable-next-line functional/no-loop-statement
          while (index < length - 1) {
            this.to(points[index] as number, points[index + 1] as number);
            index += 2;
          }
        }
      }
    }
  }
  polygon(...points: readonly number[]): void;
  polygon(...points: readonly (readonly [number, number])[]): void;
  polygon(
    // eslint-disable-next-line functional/functional-parameters
    ...points: readonly number[] | ReadonlyArray<readonly [number, number]>
  ): void {
    if (Array.isArray(points[0])) {
      this.polyline(...(points as readonly number[]), points[0] as number);
    } else {
      this.polyline(
        ...(points as readonly number[]),
        points[0] as number,
        points[1] as number
      );
    }
  }

  drawing(program: noop): void {
    this.begin();
    program.call(this);
    this.close();
  }
  backup(program: noop): void {
    this.save();
    program.call(this);
    this.restore();
  }
}
