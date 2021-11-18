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
  if (arguments.length < 2) {
    return new fCanvas(element);
  }
  if (arguments.length === 2) {
    return new fCanvas(element, width);
  }

  return new fCanvas(element, width, height);
}

export { createCanvas };
