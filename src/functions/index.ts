export function constrain(value: number, min: number, max: number): number {
  return Math.min(Math.max(min, value), max);
}
export function loadImage(src: string): Promise<HTMLImageElement> {
  const img = new Image();
  // eslint-disable-next-line functional/immutable-data
  img.src = src;
  return new Promise<HTMLImageElement>((resolve, reject) => {
    function loaded() {
      resolve(img);
      img.removeEventListener("load", loaded);
    }

    function error(err: unknown) {
      reject(err);
      img.removeEventListener("error", error);
    }
    img.addEventListener("load", loaded);
    img.addEventListener("error", error);
  });
}
export function loadAudio(src: string): Promise<HTMLAudioElement> {
  const audio = document.createElement("audio");
  // eslint-disable-next-line functional/immutable-data
  audio.src = src;
  return new Promise<HTMLAudioElement>((resolve, reject) => {
    function loaded(): void {
      resolve(audio);
      audio.removeEventListener("load", loaded);
    }

    function error(err: unknown): void {
      reject(err);
      audio.removeEventListener("error", error);
    }

    audio.addEventListener("load", loaded);
    audio.addEventListener("error", error);
  });
}
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
): readonly [number, number] {
  /// ratio = width / height => height = width / ratio
  const swidth = ratio * height;
  const sheight = width / ratio;

  if (width < swidth) {
    return [width, sheight];
  } else {
    return [swidth, height];
  }
}
function random(value: number): number;
function random<T>(array: readonly T[]): T;
function random(start: number, stop: number): number;
// eslint-disable-next-line functional/functional-parameters, @typescript-eslint/no-explicit-any
function random(...args: readonly any[]): any {
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
function randomInt(start: number, stop?: number): number {
  if (stop === undefined) {
    return Math.round(random(start));
  }

  return Math.round(random(start, stop));
}

function range(start: number, stop: number, step: number): number;
function range(start: string, stop: string, step: number): string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function range(start: any, stop: any, step: number): any {
  step = step || 1;
  const arr = [];
  // eslint-disable-next-line functional/no-let
  let isChar = false;

  if (stop === undefined) (stop = start), (start = 1);

  if (typeof start === "string") {
    start = start.charCodeAt(0);
    stop = stop.charCodeAt(0);
    isChar = true;
  }

  if (start !== stop && Math.abs(stop - start) < Math.abs(step))
    // eslint-disable-next-line functional/no-throw-statement
    throw new Error("range(): step exceeds the specified range.");

  if (stop > start) {
    step < 0 && (step *= -1);
    // eslint-disable-next-line functional/no-loop-statement
    while (start <= stop) {
      // eslint-disable-next-line functional/immutable-data
      arr.push(isChar ? String.fromCharCode(start) : start);
      start += step;
    }
  } else {
    step > 0 && (step *= -1);
    // eslint-disable-next-line functional/no-loop-statement
    while (start >= stop) {
      // eslint-disable-next-line functional/immutable-data
      arr.push(isChar ? String.fromCharCode(start) : start);
      start += step;
    }
  }

  return arr;
}

export { random, randomInt, range };

export function lerp(start: number, stop: number, amt: number): number {
  return amt * (stop - start) + start;
}

export const hypot =
  typeof Math.hypot === "function"
    ? Math.hypot
    : // eslint-disable-next-line functional/functional-parameters
      (...args: readonly number[]): number => {
        const len = args.length;
        // eslint-disable-next-line functional/no-let
        let i = 0,
          result = 0;
        // eslint-disable-next-line functional/no-loop-statement
        while (i < len) result += Math.pow(args[i++], 2);
        return Math.sqrt(result);
      };

export function odd(value: number, prevent: number, max: number): number {
  if (value === max) {
    return prevent;
  }

  return value + 1;
}
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
): readonly [number, number] {
  const rectProjectedWidth: number =
    Math.abs(width * Math.cos(rad)) + Math.abs(height * Math.sin(rad));
  const rectProjectedHeight: number =
    Math.abs(width * Math.sin(rad)) + Math.abs(height * Math.cos(rad));

  return [rectProjectedWidth, rectProjectedHeight];
}

// eslint-disable-next-line functional/no-let
let virualContext: CanvasRenderingContext2D;
export function cutImage(
  image: CanvasImageSource,
  x = 0,
  y = 0,
  width: number = parseFloat(`${image.width}`),
  height: number = parseFloat(`${image.height}`),
  rotate = 0
): HTMLImageElement {
  if (virualContext === undefined) {
    virualContext = document
      .createElement("canvas")
      .getContext("2d") as CanvasRenderingContext2D; /// never null
  }
  /// ------------------ draw image canvas -----------------
  const rad: number = (rotate * Math.PI) / 180;
  const [swidth, sheight] = calcProjectedRectSizeOfRotatedRect(
    width,
    height,
    rad
  );

  // eslint-disable-next-line functional/immutable-data
  virualContext.canvas.width = width;
  // eslint-disable-next-line functional/immutable-data
  virualContext.canvas.height = height;

  virualContext.save();
  virualContext.translate(width / 2, height / 2);
  virualContext.rotate((rotate * Math.PI) / 180);
  virualContext.drawImage(
    image,
    x,
    y,
    swidth,
    sheight,
    -swidth / 2,
    -sheight / 2,
    swidth,
    sheight
  );
  virualContext.restore();
  /// -----------------------------------------------------------

  const imageCuted = new Image();
  // eslint-disable-next-line functional/immutable-data
  imageCuted.src = virualContext.canvas.toDataURL();
  virualContext.clearRect(0, 0, width, height);
  return imageCuted;
}

export function unlimited(value: number, min: number, max: number): boolean {
  return value < min || value > max;
}
