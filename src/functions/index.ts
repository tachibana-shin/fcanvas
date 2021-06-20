import { extractNumber } from "../utils/index";

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
export function even(value: number, min: number, prevent: number): number {
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

/**
 * @export
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {*}  {boolean}
 */
export function unlimited(value: number, min: number, max: number): boolean {
  return value < min || value > max;
}

function runScript(script: string): any {
  return new Function(script)();
}
