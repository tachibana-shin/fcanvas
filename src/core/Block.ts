import {
  intersectCirclePoint,
  intersectRectPoint,
} from "../functions/intersects";
import map from "../functions/map";
import { throwError } from "../helpers/throw";
import type ReadonlyOffset from "../types/ReadonlyOffset";
import convertValueToPixel from "../utils/convertValueToPixel";

import fCanvas, { getCanvasInstance } from "./fCanvas";

function existsCbDraw(
  el: Block & {
    // eslint-disable-next-line @typescript-eslint/ban-types
    readonly draw?: Function;
  }
): el is Block & {
  // eslint-disable-next-line @typescript-eslint/ban-types
  readonly draw: Function;
} {
  return typeof el.draw === "function";
}
function existsCbUpdate(
  el: Block & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly update?: () => any;
  }
): el is Block & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  #canvasInstance: fCanvas | null = null;

  render<T = void>(canvas = getCanvasInstance()): void | T {
    // eslint-disable-next-line functional/no-let
    let updateReturn;

    this.#canvasInstance = canvas;

    if (existsCbDraw(this)) {
      this.draw();
    }

    if (existsCbUpdate(this)) {
      updateReturn = this.update();
    }

    this.#canvasInstance = null;

    return updateReturn as void | T;
  }
  protected get instance(): fCanvas {
    if (this.#canvasInstance instanceof fCanvas) {
      return this.#canvasInstance;
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
      this.instance.mouseX === null ||
      this.instance.mouseY === null ||
      "x" in this === false ||
      "y" in this === false
    ) {
      return false;
    }

    switch (this.type) {
      case "rect":
        return intersectRectPoint(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          this as any,
          this.instance.mouseX,
          this.instance.mouseY
        );
      case "circle":
        return intersectCirclePoint(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          this as any,
          this.instance.mouseX,
          this.instance.mouseY
        );
      case "point":
        return (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this as any).x &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this as any).y &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (Math.round((this as any).x) === Math.round(this.instance.mouseX),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            Math.round((this as any).y) === Math.round(this.instance.mouseY))
        );
      default:
        return false;
    }
  }
  get isPressedInTouches(): boolean {
    if (
      this.instance.mouseX === null ||
      this.instance.mouseY === null ||
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

  protected pain(cb: () => void, noFill = false, noStroke = false): void {
    if (
      this.instance.doFill() === false &&
      this.instance.doStroke() === false
    ) {
      return;
    }

    if (noFill && this.instance.doStroke() === false) {
      return;
    }
    if (noStroke && this.instance.doFill() === false) {
      return;
    }

    this.instance.ctx.beginPath();
    cb();

    if (this.instance.doFill()) {
      this.instance.ctx.fill();
    }
    if (this.instance.doStroke()) {
      this.instance.ctx.stroke();
    }
    this.instance.ctx.closePath();
  }

  protected fill(hue: number, saturation: number, lightness: number): void;
  protected fill(
    hue: number,
    saturation: number,
    lightness: number,
    alpha: number
  ): void;
  // @hsb color
  protected fill(hue: number, saturation: number, bright: number): void;
  protected fill(
    hue: number,
    saturation: number,
    bright: number,
    alpha: number
  ): void;
  // @rgb color
  protected fill(red: number, green: number, blue: number): void;
  protected fill(red: number, green: number, blue: number, alpha: number): void;
  // @canvasGradient
  protected fill(linear: CanvasGradient): void;
  protected fill(pattern: CanvasPattern): void;
  protected fill(image: CanvasImageSource): void;
  protected fill(color: string): void;
  protected fill(value: number): void;

  // eslint-disable-next-line functional/functional-parameters, @typescript-eslint/no-explicit-any
  protected fill(...args: any) {
    this.instance.doFill(true);
    this.instance.cacheFillColor(this.instance.convertToRgbColor(args));
  }

  protected stroke(hue: number, saturation: number, lightness: number): void;
  protected stroke(
    hue: number,
    saturation: number,
    lightness: number,
    alpha: number
  ): void;
  // @hsb color
  protected stroke(hue: number, saturation: number, bright: number): void;
  protected stroke(
    hue: number,
    saturation: number,
    bright: number,
    alpha: number
  ): void;
  // @rgb color
  protected stroke(red: number, green: number, blue: number): void;
  protected stroke(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ): void;
  // @canvasGradient
  protected stroke(linear: CanvasGradient): void;
  protected stroke(pattern: CanvasPattern): void;
  protected stroke(image: CanvasImageSource): void;
  protected stroke(color: string): void;
  protected stroke(value: number): void;
  // eslint-disable-next-line functional/functional-parameters, @typescript-eslint/no-explicit-any
  protected stroke(...args: any) {
    this.instance.doStroke(true);
    this.instance.cacheStrokeColor(this.instance.convertToRgbColor(args));
  }
  protected noFill(): void {
    this.instance.doFill(false);
  }
  protected noStroke(): void {
    this.instance.doStroke(false);
  }
  protected lineWidth(): number;
  protected lineWidth(width: number): void;
  protected lineWidth(value?: number): number | void {
    if (value === undefined) {
      return this.instance.ctx.lineWidth;
    }
    // eslint-disable-next-line functional/immutable-data
    this.instance.ctx.lineWidth = this.instance.performancePixel(value);
  }
  protected shadowOffset(): ReadonlyOffset;
  protected shadowOffset(x: number, y: number): void;
  protected shadowOffset(x?: number, y?: number): ReadonlyOffset | void {
    // eslint-disable-next-line functional/functional-parameters
    if (arguments.length === 0) {
      return {
        x: this.instance.ctx.shadowOffsetX,
        y: this.instance.ctx.shadowOffsetY,
      };
    }

    [this.instance.ctx.shadowOffsetX, this.instance.ctx.shadowOffsetY] = [
      this.instance.performancePixel(x || 0),
      this.instance.performancePixel(y || 0),
    ];
  }
  protected measureText(text: string): number {
    return this.instance.measureText(text);
  }
  protected begin(): void {
    this.instance.ctx.beginPath();
  }
  protected close(): void {
    this.instance.ctx.closePath();
  }
  protected save(): void {
    this.instance.save();
  }
  protected restore(): void {
    this.instance.restore();
  }
  protected drawWithInstance(cb: (fcanvas: fCanvas) => void): void {
    this.instance.save();
    void cb(this.instance);
    this.instance.restore();
  }
  protected arc(
    x: number,
    y: number,
    radius: number,
    astart: number,
    astop: number,
    reverse?: boolean
  ): void {
    this.pain(() => {
      this.instance.ctx.arc(
        this.instance.performancePixel(x),
        this.instance.performancePixel(y),
        radius,
        this.instance.convertToRadius(astart) - Math.PI / 2,
        this.instance.convertToRadius(astop) - Math.PI / 2,
        reverse
      );
    });
  }
  protected pie(
    x: number,
    y: number,
    radius: number,
    astart: number,
    astop: number,
    reverse?: boolean
  ): void {
    this.pain(() => {
      this.move(x, y);
      this.instance.ctx.arc(
        this.instance.performancePixel(x),
        this.instance.performancePixel(y),
        radius,
        this.instance.convertToRadius(astart) - Math.PI / 2,
        this.instance.convertToRadius(astop) - Math.PI / 2,
        reverse
      );
      this.to(x, y);
    });
  }
  protected line(x1: number, y1: number, x2: number, y2: number): void {
    this.pain(() => {
      this.move(x1, y1);
      this.to(x2, y2);
    }, true);
  }
  protected ellipse(
    x: number,
    y: number,
    radius1: number,
    radius2: number,
    astart: number,
    astop: number,
    reverse: number
  ): void {
    this.pain(() => {
      this.instance.ctx.ellipse(
        this.instance.performancePixel(x),
        this.instance.performancePixel(y),
        radius1,
        radius2,
        this.instance.convertToRadius(astart) - Math.PI / 2,
        this.instance.convertToRadius(astop),
        reverse
      );
    });
  }
  protected circle(x: number, y: number, radius: number): void {
    this.arc(
      x,
      y,
      radius,
      0,
      this.instance.angleMode() === "degress" ? 360 : Math.PI * 2
    );
  }
  protected point(x: number, y: number): void {
    this.circle(x, y, 1);
  }
  protected triangle(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ): void {
    this.pain(() => {
      this.move(x1, y1);
      this.to(x2, y2);
      this.to(x3, y3);
      this.to(x1, y1);
    });
  }

  protected drawImage(image: CanvasImageSource, x: number, y: number): void;
  protected drawImage(
    image: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number
  ): void;
  protected drawImage(
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

  protected drawImage(
    image: CanvasImageSource,
    // eslint-disable-next-line functional/functional-parameters
    ...args: readonly number[]
  ): void {
    // eslint-disable-next-line prefer-spread
    this.instance.ctx.drawImage.apply(this.instance.ctx, [
      image,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(args as readonly any[]),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any);
  }
  protected drawImageRepeat(
    image: CanvasImageSource,
    x: number,
    y: number,
    frameWidth: number,
    frameHeight: number
  ): void;
  protected drawImageRepeat(
    image: CanvasImageSource,
    x: number,
    y: number,
    width: number,
    height: number,
    frameWidth: number,
    frameHeight: number
  ): void;
  protected drawImageRepeat(
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
  protected drawImageRepeat(
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
  protected rRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: string | number
  ): void;
  protected rRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radiusLeft: string | number,
    radiusRight: string | number
  ): void;
  protected rRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radiusTopLeft: string | number,
    radiusTopRight: string | number,
    radiusBottomRight: string | number,
    radiusBottomLeft: string | number
  ): void;
  protected rRect(
    x: number,
    y: number,
    w: number,
    h: number,
    radiusTopLeft?: string | number,
    radiusTopRight?: string | number,
    radiusBottomRight?: string | number,
    radiusBottomLeft?: string | number
  ): void {
    this.pain(() => {
      [x, y, w, h] = this.instance.getSizeofRect(x, y, w, h);

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
    });
  }
  protected rect(x: number, y: number, width: number, height: number): void {
    this.pain(() => {
      [x, y, width, height] = this.instance.getSizeofRect(x, y, width, height);
      this.instance.ctx.rect(
        this.instance.performancePixel(x),
        this.instance.performancePixel(y),
        width,
        height
      );
    });
  }
  protected quadratic(
    xs: number,
    ys: number,
    cpx: number,
    cpy: number,
    x: number,
    y: number
  ): void {
    this.instance.ctx.quadraticCurveTo(cpx, cpy, x, y);
  }
  protected bezier(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number
  ): void {
    this.instance.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  }
  protected move(x: number, y: number): void {
    this.instance.ctx.moveTo(
      this.instance.performancePixel(x),
      this.instance.performancePixel(y)
    );
  }
  protected to(x: number, y: number): void {
    this.instance.ctx.lineTo(
      this.instance.performancePixel(x),
      this.instance.performancePixel(y)
    );
  }
  protected fillText(
    text: string,
    x: number,
    y: number,
    maxWidth?: number
  ): void {
    this.pain(
      () => {
        this.instance.ctx.fillText(
          text,
          this.instance.performancePixel(x),
          this.instance.performancePixel(y),
          maxWidth
        );
      },
      false,
      true
    );
  }
  protected strokeText(
    text: string,
    x: number,
    y: number,
    maxWidth?: number
  ): void {
    this.pain(() => {
      this.instance.ctx.strokeText(
        text,
        this.instance.performancePixel(x),
        this.instance.performancePixel(y),
        maxWidth
      );
    }, true);
  }
  protected fillRect(
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    this.pain(
      () => {
        this.instance.ctx.fillRect(
          this.instance.performancePixel(x),
          this.instance.performancePixel(y),
          width,
          height
        );
      },
      false,
      true
    );
  }
  protected strokeRect(
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    this.pain(() => {
      this.instance.ctx.strokeRect(
        this.instance.performancePixel(x),
        this.instance.performancePixel(y),
        width,
        height
      );
    }, true);
  }
  protected lineDashOffset(): number;
  protected lineDashOffset(value: number): void;
  protected lineDashOffset(value?: number): number | void {
    if (value === undefined) {
      return this.instance.ctx.lineDashOffset;
    }

    // eslint-disable-next-line functional/immutable-data
    this.instance.ctx.lineDashOffset = value;
  }
  protected lineDash(): readonly number[];
  protected lineDash(segments: readonly number[]): void;
  protected lineDash(...segments: readonly number[]): void;
  protected lineDash(
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
  protected arcTo(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    radius: number
  ): void {
    this.instance.ctx.arcTo(
      this.instance.performancePixel(x1),
      this.instance.performancePixel(y1),
      this.instance.performancePixel(x2),
      this.instance.performancePixel(y2),
      radius
    );
  }
  protected isPoint(x: number, y: number): boolean {
    return this.instance.ctx.isPointInPath(x, y);
  }

  protected shadowBlur(): number;
  protected shadowBlur(opacity: number): void;
  protected shadowBlur(opacity?: number): number | void {
    if (opacity === undefined) {
      return this.instance.ctx.shadowBlur;
    }

    // eslint-disable-next-line functional/immutable-data
    this.instance.ctx.shadowBlur = opacity;
  }

  protected shadowColor(
    hue: number,
    saturation: number,
    lightness: number
  ): void;
  protected shadowColor(
    hue: number,
    saturation: number,
    lightness: number,
    alpha: number
  ): void;
  // @hsb color
  protected shadowColor(hue: number, saturation: number, bright: number): void;
  protected shadowColor(
    hue: number,
    saturation: number,
    bright: number,
    alpha: number
  ): void;
  // @rgb color
  protected shadowColor(red: number, green: number, blue: number): void;
  protected shadowColor(
    red: number,
    green: number,
    blue: number,
    alpha: number
  ): void;
  // @canvasGradient
  protected shadowColor(linear: CanvasGradient): void;
  protected shadowColor(pattern: CanvasPattern): void;
  protected shadowColor(image: CanvasImageSource): void;
  protected shadowColor(color: string): void;
  protected shadowColor(value: number): void;
  // eslint-disable-next-line functional/functional-parameters, @typescript-eslint/no-explicit-any
  protected shadowColor(...args: any) {
    // eslint-disable-next-line functional/immutable-data
    this.instance.ctx.shadowColor = this.instance.convertToRgbColor(args);
  }
  protected drawFocusIfNeeded(element: Element): void;
  protected drawFocusIfNeeded(path: Path2D, element: Element): void;
  protected drawFocusIfNeeded(path: Element | Path2D, element?: Element): void {
    if (element === undefined) {
      this.instance.ctx.drawFocusIfNeeded(path as Element);
    } else {
      this.instance.ctx.drawFocusIfNeeded(path as Path2D, element);
    }
  }

  protected polyline(...points: readonly number[]): void;
  protected polyline(...points: readonly (readonly [number, number])[]): void;
  protected polyline(
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
  protected polygon(...points: readonly number[]): void;
  protected polygon(...points: readonly (readonly [number, number])[]): void;
  protected polygon(
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
}
