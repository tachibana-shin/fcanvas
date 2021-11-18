import fCanvas from "./fCanvas";

function createCanvas(): fCanvas;
function createCanvas(width: number, height: number): fCanvas;
function createCanvas(element?: HTMLCanvasElement | string): fCanvas;
function createCanvas(
  element: HTMLCanvasElement | string,
  width?: number,
  height?: number
): fCanvas;
function createCanvas(
  element?: HTMLCanvasElement | string | number,
  width?: number,
  height?: number
): fCanvas {
  // eslint-disable-next-line functional/functional-parameters
  if (arguments.length < 2) {
    return new fCanvas(element as HTMLCanvasElement | string | undefined);
  }
  // eslint-disable-next-line functional/functional-parameters
  if (arguments.length === 2) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return new fCanvas(element as number, width!);
  }

  return new fCanvas(element as HTMLCanvasElement, width, height);
}

export { createCanvas };
