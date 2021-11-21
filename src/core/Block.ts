import {
  intersectCirclePoint,
  intersectRectPoint,
} from "../functions/intersects";
import map from "../functions/map";
import { throwError } from "../helpers/throw";
import convertValueToPixel from "../utils/convertValueToPixel";
import { ReadonlyOffset } from "../utils/getTouchInfo";

import fCanvas, {
  DirectionPattern,
  getCanvasInstance,
  ParamsToRgb,
} from "./fCanvas";

import type FunctionColor from "../types/FunctionColor";
import type Noop from "../types/Noop";

type LineJoin = "bevel" | "round" | "miter";
type LineCap = "butt" | "round" | "square";

function existsCbDraw(
  el: Block & {
    readonly draw?: () => void;
  }
): el is Block & {
  readonly draw: () => void;
} {
  return typeof el.draw === "function";
}
function existsCbUpdate(
  el: Block & {
    readonly update?: () => any;
  }
): el is Block & {
  readonly update: () => any;
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

  render<T = void>(canvas = getCanvasInstance()): void | T {
    let updateReturn
    
    this.canvasInstance = canvas;

    if (existsCbUpdate(this)) {
      if (existsCbDraw(this)) {
        this.draw();
      }
      updateReturn = this.update();
    } else if (existsCbDraw(this)) {
      this.draw();
    }

    this.canvasInstance = null;
    
    return updateReturn as (void | T);
  }
  get instance(): fCanvas {
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
        return this.instance.touches.some((item) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          intersectRectPoint(this as any, item.x, item.y)
        );
      case "circle":
        return this.instance.touches.some((item) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          intersectCirclePoint(this as any, item.x, item.y)
        );
      case "point":
        return this.instance.touches.some(
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
  // > /shared

  // eslint-disable-next-line functional/functional-parameters
  fill: FunctionColor = function(...args: ParamsToRgb) {
    // eslint-disable-next-line functional/immutable-data
    this.instance.ctx.fillStyle = this.instance._toRgb(args);
    this.instance.ctx.fill();
  }
  
  // eslint-disable-next-line functional/functional-parameters
  stroke: FunctionColor = function(...args: ParamsToRgb) {
    // eslint-disable-next-line functional/immutable-data
    this.instance.ctx.strokeStyle = this.instance._toRgb(args);
    this.instance.ctx.stroke();
  }
  noFill(): void {
    return this.fill(0, 0, 0, 0);
  }
  lineWidth(): number;
  lineWidth(width: number): void;
  lineWidth(value?: number): number | void {
    if (value === undefined) {
      return this.instance.ctx.lineWidth;
    }
    // eslint-disable-next-line functional/immutable-data
    this.instance.ctx.lineWidth = this.instance._getPixel(value);
  }
  miterLimit(): number;
  miterLimit(value: number): void;
  miterLimit(value?: number): number | void {
    if (value === undefined) {
      return this.instance.ctx.miterLimit;
    }
    this.lineJoin("miter");

    // eslint-disable-next-line functional/immutable-data
    this.instance.ctx.miterLimit = value;
  }
  shadowOffset(): ReadonlyOffset;
  shadowOffset(x: number, y: number): void;
  shadowOffset(x?: number, y?: number): ReadonlyOffset | void {
    // eslint-disable-next-line functional/functional-parameters
    if (arguments.length === 0) {
      return {
        x: this.instance.ctx.shadowOffsetX,
        y: this.instance.ctx.shadowOffsetY,
      };
    }

    [this.instance.ctx.shadowOffsetX, this.instance.ctx.shadowOffsetY] = [
      this.instance._getPixel(x || 0),
      this.instance._getPixel(y || 0),
    ];
  }
  measureText(text: string): number {
    return this.instance.measureText(text);
  }
  begin(): void {
    this.instance.ctx.beginPath();
  }
  close(): void {
    this.instance.ctx.closePath();
  }
  save(): void {
    this.instance.save();
  }
  restore(): void {
    this.instance.restore();
  }
  rotate(): number;
  rotate(angle: number): void;
  rotate(angle?: number): number | void {
    if (angle === undefined) {
      return this.instance.rotate();
    }
    this.instance.rotate(angle);
  }
  translate(): ReadonlyOffset;
  translate(x: number, y: number): void;
  translate(x?: number, y?: number): ReadonlyOffset | void {
    // eslint-disable-next-line functional/functional-parameters
    if (arguments.length === 0) {
      return this.instance.translate();
    }

    this.instance.translate(x as number, y as number);
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
    this.instance.ctx.arc(
      this.instance._getPixel(x),
      this.instance._getPixel(y),
      radius,
      this.instance._toRadius(astart) - Math.PI / 2,
      this.instance._toRadius(astop) - Math.PI / 2,
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
    this.instance.ctx.ellipse(
      this.instance._getPixel(x),
      this.instance._getPixel(y),
      radius1,
      radius2,
      this.instance._toRadius(astart) - Math.PI / 2,
      this.instance._toRadius(astop),
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
      this.instance.angleMode() === "degress" ? 360 : Math.PI * 2
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
    this.instance.ctx.drawImage.apply(this.instance.ctx, [
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
    [x, y, w, h] = this.instance._argsRect(x, y, w, h);

    const fontSize = this.instance.fontSize();
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
    [x, y, width, height] = this.instance._argsRect(x, y, width, height);
    this.instance.ctx.rect(
      this.instance._getPixel(x),
      this.instance._getPixel(y),
      width,
      height
    );
    this.close();
  }
  quadratic(cpx: number, cpy: number, x: number, y: number): void {
    this.instance.ctx.quadraticCurveTo(cpx, cpy, x, y);
  }
  bezier(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number
  ): void {
    this.instance.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  }
  move(x: number, y: number): void {
    this.instance.ctx.moveTo(
      this.instance._getPixel(x),
      this.instance._getPixel(y)
    );
  }
  to(x: number, y: number): void {
    this.instance.ctx.lineTo(
      this.instance._getPixel(x),
      this.instance._getPixel(y)
    );
  }
  fillText(text: string, x: number, y: number, maxWidth?: number): void {
    this.instance.ctx.fillText(
      text,
      this.instance._getPixel(x),
      this.instance._getPixel(y),
      maxWidth
    );
  }
  strokeText(text: string, x: number, y: number, maxWidth?: number): void {
    this.instance.ctx.strokeText(
      text,
      this.instance._getPixel(x),
      this.instance._getPixel(y),
      maxWidth
    );
  }
  fillRect(x: number, y: number, width: number, height: number): void {
    this.instance.ctx.fillRect(
      this.instance._getPixel(x),
      this.instance._getPixel(y),
      width,
      height
    );
  }
  strokeRect(x: number, y: number, width: number, height: number): void {
    this.instance.ctx.strokeRect(
      this.instance._getPixel(x),
      this.instance._getPixel(y),
      width,
      height
    );
  }
  lineDashOffset(): number;
  lineDashOffset(value: number): void;
  lineDashOffset(value?: number): number | void {
    if (value === undefined) {
      return this.instance.ctx.lineDashOffset;
    }

    // eslint-disable-next-line functional/immutable-data
    this.instance.ctx.lineDashOffset = value;
  }
  lineDash(): readonly number[];
  lineDash(segments: readonly number[]): void;
  lineDash(...segments: readonly number[]): void;
  lineDash(
    // eslint-disable-next-line functional/functional-parameters
    ...segments: ReadonlyArray<readonly number[] | number>
  ): readonly number[] | void {
    if (segments.length === 0) {
      return this.instance.ctx.getLineDash();
    }

    if (Array.isArray(segments[0])) {
      this.instance.ctx.setLineDash(segments[0]);
    }

    this.instance.ctx.setLineDash(segments as readonly number[]);
  }
  arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void {
    this.instance.ctx.arcTo(
      this.instance._getPixel(x1),
      this.instance._getPixel(y1),
      this.instance._getPixel(x2),
      this.instance._getPixel(y2),
      radius
    );
  }
  isPoint(x: number, y: number): boolean {
    return this.instance.ctx.isPointInPath(x, y);
  }
  createImageData(height: ImageData): ImageData;
  createImageData(width: number, height: number): ImageData;
  createImageData(width: ImageData | number, height?: number): ImageData {
    return height
      ? this.instance.createImageData(width as number, height)
      : this.instance.createImageData(width as ImageData);
  }
  getImageData(x: number, y: number, width: number, height: number): ImageData {
    return this.instance.getImageData(x, y, width, height);
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
      this.instance.putImageData(
        imageData,
        x,
        y,
        xs as number,
        ys as number,
        width as number,
        height as number
      );
    } else {
      this.instance.putImageData(imageData, x, y);
    }
  }
  createPattern(
    image: CanvasImageSource,
    direction: DirectionPattern
  ): CanvasPattern | null {
    return this.instance.createPattern(image, direction);
  }
  createRadialGradient(
    x1: number,
    y1: number,
    r1: number,
    x2: number,
    y2: number,
    r2: number
  ): CanvasGradient {
    return this.instance.createRadialGradient(x1, y1, r1, x2, y2, r2);
  }
  createLinearGradient(
    x: number,
    y: number,
    width: number,
    height: number
  ): CanvasGradient {
    return this.instance.createLinearGradient(x, y, width, height);
  }

  lineJoin(): LineJoin;
  lineJoin(type: LineJoin): void;
  lineJoin(type?: LineJoin): LineJoin | void {
    if (type === undefined) {
      return this.instance.ctx.lineJoin;
    }

    // eslint-disable-next-line functional/immutable-data
    this.instance.ctx.lineJoin = type;
  }
  lineCap(): LineCap;
  lineCap(value: LineCap): void;
  lineCap(value?: LineCap): LineCap | void {
    if (value === undefined) {
      return this.instance.ctx.lineCap;
    }
    // eslint-disable-next-line functional/immutable-data
    this.instance.ctx.lineCap = value;
  }
  shadowBlur(): number;
  shadowBlur(opacity: number): void;
  shadowBlur(opacity?: number): number | void {
    if (opacity === undefined) {
      return this.instance.ctx.shadowBlur;
    }

    // eslint-disable-next-line functional/immutable-data
    this.instance.ctx.shadowBlur = opacity;
  }

  // eslint-disable-next-line functional/functional-parameters
  shadowColor: FunctionColor = function(...args: ParamsToRgb) {
    // eslint-disable-next-line functional/immutable-data
    this.instance.ctx.shadowColor = this.instance._toRgb(args);
  }
  drawFocusIfNeeded(element: Element): void;
  drawFocusIfNeeded(path: Path2D, element: Element): void;
  drawFocusIfNeeded(path: Element | Path2D, element?: Element): void {
    if (element === undefined) {
      this.instance.ctx.drawFocusIfNeeded(path as Element);
    } else {
      this.instance.ctx.drawFocusIfNeeded(path as Path2D, element);
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

  drawing(program: Noop): void {
    this.begin();
    program.call(this);
    this.close();
  }
  backup(program: Noop): void {
    this.save();
    program.call(this);
    this.restore();
  }
}
