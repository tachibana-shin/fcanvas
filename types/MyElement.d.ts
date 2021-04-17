import { jCanvas } from "./jCanvas"

export interface MyElement {
   constructor(canvas: jCanvas): void;

   $el: HTMLCanvasElement;

   addQueue(jcanvas: jCanvas): void;
   getQueue(index: number): jCanvas | void;
   run(jcanvas: jCanvas): void;

   has(id: number): boolean;
   fCanvas(): jCanvas;

   bind(jcanvas: jCanvas): void;
   $context2d: CanvasRenderingContext2D;

   sin(angle: number): number;
   asin(sine: number): number;
   cos(angle: number): number;
   acos(sine: number): number;
   tan(angle: number): number;
   atan(sine: number): number;
   atan2(alpha: number, beta: number): number;

   mouseX: number | null
   mouseY: number | null
   interact: boolean;
   width: number
   height: number
   windowWidth: number
   windowHeight: number
   fill(red?: number | string | CanvasPattern, green?: number | string, blue?: number | string, alpha?: number | string): void;
   stroke(red?: number | string | CanvasPattern, green?: number | string, blue?: number | string, alpha?: number | string): void;
   noFill(): void;
   lineWidth(width: number): void;
   miterLimit(width: number): void;
   shadowOffset(x?: number, y?: number): {
      x: number,
      y: number
   } | void;
   measureText(text: string): number;
   begin(): void;
   close(): void;
   save(): void;
   restore(): void;

   arc(x: number, y: number, radius: number, start: number, end: number, reverse?: boolean): void;
   pie(x: number, y: number, radius: number, start: number, end: number, reverse?: boolean): void;

   line(xFrom: number, yFrom: number, xTo: number, yTo: numner): void;
   ellipse(x: numebr, y: number, radius1: number, radius2: number, start: number, end: number, reverse?: boolean): void
   circle(x: number, y: number, radius: number): void;
   point(x: number, y: number): void;
   triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void

   drawImage(image: HTMLImageElement, sx?: number, sy?: number, swidth?: number, sheight?: number, x: number, y: number, width?: number, height?: number): void

   rect(x: number, y: number, width: number, height: number, rLeftTop?: number | string, rRightTop?: number | string = rLeftTop, rRightBottom?: number | string = rLeftTop, rLeftBottom?: number | string = rRightTop): void;

   square(x: number, y: number, edge: number, rLeftTop?: number | string, rRightTop?: number | string = rLeftTop, rRightBottom?: number | string = rLeftTop, rLeftBottom?: number | string = rRightTop): void
   hypot(...args: number): number;

   quadratic(cpx: number, cpy: number, x: number, y: number): void
   bezier(cp1x: number, cp2y: number, cp1x: number, cp2y: number, x: number, y: number): void
   move(x: number, y: number): void;
   to(x: number, y: number): void;
   fillText(text: string | number, x: number, y: number): void;
   strokeText(text: string | number, x: number, y: number): void;
   fillRect(x: number, y: number, width: number, height: number): void;
   strokeRect(x: number, y: number, width: number, height: number): void;
   arcTo(xStart: number, yStart: number, xEnd: number, yEnd: number, radius: number): void;
   isPoint(x: number, y: number): void;
   createImageData(width: number, height: number, imageData: string): ImageData;
   getImageData(x: number, y: number, width: number, height: number): ImageData;
   putImageData(imageData: ImageData, x: number, y: number, vWidth: number, vHeight: number, width: number, height: number): void

   createPattern(image: HTMLImageElement, repeat: "repeat" | "repeat-x" | "repeat-y" | "no-repeat"): CanvasPattern
   createRadialGradient(xStart: number, yStart: number, radiusStart: number, xEnd: number, yEnd: number, radiusEnd: number): CanvasGradient;
   createLinearGradient(xStart: number, yStart: number, xEnd: number, yEnd: number): CanvasGradient
   lineJoin(type: "bevel" | "round" | "miter"): "bevel" | "round" | "miter" | void
   lineCap(type: "butt" | "round" | "square"): "butt" | "round" | "square" | void
   shadowBlur(opacity: number): number | void
   shadowColor(red?: number | string | CanvasPattern, green?: number | string, blue?: number | string, alpha?: number | string): string | void
}