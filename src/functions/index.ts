import { extractNumber } from "../utils/index";

export interface Circle extends Object {
  x: number;
  y: number;
  radius: number;
}
export interface Rect extends Object {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * @param {Circle} circle1
 * @param {Circle} circle2
 * @return {boolean}
 */
export function CircleImpact(circle1: Circle, circle2: Circle): boolean {
  return (
    (circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2 <
    (circle1.radius + circle2.radius) ** 2
  );
}
/**
 * @param {Circle} circle
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
export function CircleImpactPoint(
  circle: Circle,
  x: number | null,
  y: number | null
): boolean {
  if (x == null || y == null) {
    return false;
  }
  return (x - circle.x) ** 2 + (y - circle.y) ** 2 < circle.radius ** 2;
}
/**
 * @param {Circle} circle
 * @param {Rect} rect
 * @return {boolean}
 */
export function CircleImpactRect(circle: Circle, rect: Rect): boolean {
  const x = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const y = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

  const distance =
    (x - circle.x) * (x - circle.x) + (y - circle.y) * (y - circle.y);

  return distance < circle.radius ** 2;
}
/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function constrain(value: number, min: number, max: number): number {
  return Math.min(Math.max(min, value), max);
}
/**
 * @param {string} src
 * @return {Promise<HTMLImageElement>}
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.src = src;
  return new Promise<HTMLImageElement>((resolve, reject) => {
    function loaded() {
      resolve(img);
      img.removeEventListener("load", loaded);
    }

    function error(err: any) {
      reject(err);
      img.removeEventListener("error", error);
    }
    img.addEventListener("load", loaded);
    img.addEventListener("error", error);
  });
}
/**
 *
 * @param {string} src
 * @return {Promise<HTMLAudioElement>}
 */
export function loadAudio(src: string): Promise<HTMLAudioElement> {
  const audio = document.createElement("audio");
  audio.src = src;
  return new Promise<HTMLAudioElement>((resolve, reject) => {
    function loaded(): void {
      resolve(audio);
      audio.removeEventListener("load", loaded);
    }

    function error(err: any): void {
      reject(err);
      audio.removeEventListener("error", error);
    }

    audio.addEventListener("load", loaded);
    audio.addEventListener("error", error);
  });
}
/**
 * @param {number} value
 * @param {number} start
 * @param {number} stop
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function map(
  value: number,
  start: number,
  stop: number,
  min: number,
  max: number
): number {
  return ((value - start) * (max - min)) / (stop - start) + min;
}
export function aspectRatio(
  ratio: number,
  width: number,
  height: number
): [number, number] {
  /// ratio = width / height => height = width / ratio
  const nwidth = ratio * height;
  const nheight = width / ratio;

  if (width < nwidth) {
    return [width, nheight];
  } else {
    return [nwidth, height];
  }
}
/**
 * @param {any[]} ...args
 * @return {any}
 */
function random(value: number): number;
function random<T>(array: T[]): T;
function random(start: number, stop: number): number;
function random(...args: any[]): any {
  if (args.length === 1) {
    if (
      args[0] !== null &&
      typeof args[0] === "object" &&
      "length" in args[0]
    ) {
      return args[0][Math.floor(Math.random() * args[0].length)];
    }

    return Math.random() * args[0];
  }
  if (args.length === 2) {
    return args[0] + Math.random() * (args[1] - args[0]);
  }
}

function randomInt(value: number): number;
function randomInt(start: number, stop: number): number;
/**
 * @param {number} start
 * @param {number} stop?
 * @return {number}
 */
function randomInt(start: number, stop?: number): number {
  if (stop === undefined) {
    return Math.round(random(start));
  }

  return Math.round(random(start, stop));
}

function range(start: number, stop: number, step: number): number;
function range(start: string, stop: string, step: number): string;
/**
 * @param {any} start
 * @param {any} stop
 * @param {number} step
 * @return {any}
 */
function range(start: any, stop: any, step: number): any {
  step = step || 1;
  const arr = [];
  let isChar = false;

  if (stop === undefined) (stop = start), (start = 1);

  if (typeof start === "string") {
    start = start.charCodeAt(0);
    stop = stop.charCodeAt(0);
    isChar = true;
  }

  if (start !== stop && Math.abs(stop - start) < Math.abs(step))
    throw new Error("range(): step exceeds the specified range.");

  if (stop > start) {
    step < 0 && (step *= -1);
    while (start <= stop) {
      arr.push(isChar ? String.fromCharCode(start) : start);
      start += step;
    }
  } else {
    step > 0 && (step *= -1);
    while (start >= stop) {
      arr.push(isChar ? String.fromCharCode(start) : start);
      start += step;
    }
  }

  return arr;
}

export { random, randomInt, range };

/**
 * @param {Rect} rect1
 * @param {Rect} rect2
 * @return {boolean}
 */
export function RectImpact(rect1: Rect, rect2: Rect): boolean {
  return (
    rect1.x <= rect2.x + rect2.width &&
    rect1.x + rect1.width >= rect2.x &&
    rect1.y <= rect2.y + rect2.height &&
    rect1.y + rect1.height >= rect2.y
  );
}

/**
 * @param {Rect} rect
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
export function RectImpactPoint(
  rect: Rect,
  x: number | null,
  y: number | null
): boolean {
  if (x == null || y == null) {
    return false;
  }
  return (
    rect.x < x &&
    rect.x + rect.width > x &&
    rect.y < y &&
    rect.y + rect.height > y
  );
}

/**
 * @param {number} start
 * @param {number} stop
 * @param {number} amt
 * @return {number}
 */
export function lerp(start: number, stop: number, amt: number): number {
  return amt * (stop - start) + start;
}

/**
 * @param {number[]} ...args
 * @return {number}
 */
export const hypot =
  typeof Math.hypot === "function"
    ? Math.hypot
    : (...args: number[]): number => {
        const len = args.length;
        let i = 0,
          result = 0;
        while (i < len) result += Math.pow(args[i++], 2);
        return Math.sqrt(result);
      };

/**
 * @param {number} value
 * @param {number} max
 * @param {number} prevent
 * @return {number}
 */
export function odd(value: number, prevent: number, max: number): number {
  if (value === max) {
    return prevent;
  }

  return value + 1;
}
/**
 * @param {number} value
 * @param {number} min
 * @param {number} prevent
 * @return {number}
 */
export function off(value: number, min: number, prevent: number): number {
  if (value === min) {
    return prevent;
  }

  return value - 1;
}

///// https://jsfiddle.net/casamia743/xqh48gno/
function calcProjectedRectSizeOfRotatedRect(
  width: number,
  height: number,
  rad: number
): [number, number] {
  const rectProjectedWidth: number =
    Math.abs(width * Math.cos(rad)) + Math.abs(height * Math.sin(rad));
  const rectProjectedHeight: number =
    Math.abs(width * Math.sin(rad)) + Math.abs(height * Math.cos(rad));

  return [rectProjectedWidth, rectProjectedHeight];
}

let virualContext: CanvasRenderingContext2D;
export function cutImage(
  image: CanvasImageSource,
  x: number = 0,
  y: number = 0,
  width: number = extractNumber(`${image.width}`),
  height: number = extractNumber(`${image.height}`),
  rotate: number = 0
): HTMLImageElement {
  if (virualContext === undefined) {
    virualContext = document
      .createElement("canvas")
      .getContext("2d") as CanvasRenderingContext2D; /// never null
  }
  /// ------------------ draw image canvas -----------------
  const rad: number = (rotate * Math.PI) / 180;
  const [nwidth, nheight] = calcProjectedRectSizeOfRotatedRect(
    width,
    height,
    rad
  );

  virualContext.canvas.width = width;
  virualContext.canvas.height = height;

  virualContext.save();
  virualContext.translate(width / 2, height / 2);
  virualContext.rotate((rotate * Math.PI) / 180);
  virualContext.drawImage(
    image,
    x,
    y,
    nwidth,
    nheight,
    -nwidth / 2,
    -nheight / 2,
    nwidth,
    nheight
  );
  virualContext.restore();
  /// -----------------------------------------------------------

  const imageCuted = new Image();
  imageCuted.src = virualContext.canvas.toDataURL();
  virualContext.clearRect(0, 0, width, height);
  return imageCuted;
}
