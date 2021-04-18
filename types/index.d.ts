export * from "./classes/Emitter";

export interface setup {
   (callback: Function, args: any): void
}
export interface draw {
   (callback: Function, fcanvas: fCanvas, args: any): void
}
export interface keyPressed {
   (callback: Function, element: Window | HTMLElement)
}
export interface changeSize {
   (callback: Function, element: Window | HTMLElement)
}
export interface mouseWheel {
   (callback: Function, element: Window | HTMLElement)
}
export interface mousePressed {
   (callback: Function, element: Window | HTMLElement)
}
export interface mouseClicked {
   (callback: Function, element: Window | HTMLElement)
}
export interface mouseMoved {
   (callback: Function, element: Window | HTMLElement)
}
export interface touchStarted {
   (callback: Function, element: Window | HTMLElement)
}
export interface touchMoved {
   (callback: Function, element: Window | HTMLElement)
}
export interface touchEnded {
   (callback: Function, element: Window | HTMLElement)
}



interface toucher {
   x: number
   y: number
   id: number
}

declare class MyElement {
   constructor(fcanvas?: fCanvas)

   $el: HTMLCanvasElement;

   addQueue(fcanvas: fCanvas): void;
   getQueue(index: number): fCanvas | void;
   run(fcanvas: fCanvas): void;

   has(id: number): boolean;
   pcanvas(): fCanvas;

   bind(fcanvas: fCanvas): void;
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
   WindowWidth: number
   WindowHeight: number
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

   line(xFrom: number, yFrom: number, xTo: number, yTo: number): void;
   ellipse(x: number, y: number, radius1: number, radius2: number, start: number, end: number, reverse?: boolean): void
   circle(x: number, y: number, radius: number): void;
   point(x: number, y: number): void;
   triangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void

   drawImage(image: HTMLImageElement, sx?: number, sy?: number, swidth?: number, sheight?: number, x?: number, y?: number, width?: number, height?: number): void

   rect(x: number, y: number, width: number, height: number, rLeftTop?: number | string, rRightTop?: number | string, rRightBottom?: number | string, rLeftBottom?: number | string): void;

   square(x: number, y: number, edge: number, rLeftTop?: number | string, rRightTop?: number | string, rRightBottom?: number | string, rLeftBottom?: number | string): void
   hypot(...args: Array<number>): number;

   quadratic(cpx: number, cpy: number, x: number, y: number): void
   bezier(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void
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
declare class fCanvas {
   static Element: MyElement

   preventTouch: boolean;
   stopTouch: boolean;
   touches: Array<toucher>
   changedTouches: Array<toucher>
   mouseX: number | null
   mouseY: number | null
   interact: boolean

   $on(name: string, callback: Function): void
   $off(name: string, callback?: Function): void

   append(parent?: HTMLBodyElement | HTMLElement | Element): void
   mount(query?: HTMLBodyElement | HTMLElement): void

   noClear(): void

   $el: HTMLCanvasElement
   $context2d: CanvasRenderingContext2D

   run(element: MyElement): void

   width: number
   height: number
   WindowWidth: number
   WindowHeight: number

   angleMode(mode?: "radial" | "degress"): "radial" | "degress" | void
   rectAlign(align?: "left" | "center" | "right"): "left" | "center" | "right" | void
   colorMode(mode?: "rgb" | "hsl" | "hue" | "hsb"): "rgb" | "hsl" | "hue" | "hsb" | void
   rectBaseline(base?: "top" | "middle" | "bottom"): "top" | "middle" | "bottom" | void

   fontSize(size?: number | string): string | void
   fontFamily(name?: string): string | void
   fontWeight(weight?: number): number | void
   clear(x?: number, y?: number, width?: number, height?: number): void
   background(red?: number | string | CanvasPattern, green?: number | string, blue?: number | string, alpha?: number | string): void
   toDataURL(type?: string, encoderOptions?: any): string
   rotate(radial?: number): number | void
   resetTransform(): void
   preload(callback: Function): void
   setup(callback: Function, args?: any): void
   draw(callback: Function, args?: any): void

   font(size?: string): string | void
   textAlign(align?: "left" | "center" | "right"): "left" | "center" | "right" | void
   textBaseline(base?: "top" | "middle" | "bottom"): "top" | "middle" | "bottom" | void

   globalOperation(type?: "source-over" | "source-atop" | "source-in" | "source-out	" | "destination-over" | "destination-atop" | "destination-in" | "destination-out" | "lighter" | "copy" | "xor"): "source-over" | "source-atop" | "source-in" | "source-out	" | "destination-over" | "destination-atop" | "destination-in" | "destination-out" | "lighter" | "copy" | "xor" | void

   translate(x: number, y: number): void
   scale(value: number): void
   clip(...args: any): void
   transform(a?: number | DOMMatrix, b?: number, c?: number, d?: number, e?: number, f?: number): DOMMatrix | Array<number> | void
   setTransform(a: number | DOMMatrix, b: number, c: number, d: number, e: number, f: number): DOMMatrix | Array<number>


   sin(angle: number): number;
   asin(sine: number): number;
   cos(angle: number): number;
   acos(sine: number): number;
   tan(angle: number): number;
   atan(sine: number): number;

   atan2(alpha: number, beta: number): number;


   cursor(): void
   noCursor(): void
   loop(): void
   noLoop(): void
   keyPressed(callback: Function): {
      off: Function
   }
   mouseIn(callback: Function): {
      off: Function
   }
   mouseOut(callback: Function): {
      off: Function
   }
   mouseDowned(callback: Function): {
      off: Function
   }
   touchStarted(callback: Function): {
      off: Function
   }
   touchMoved(callback: Function): {
      off: Function
   }
   touchEned(callback: Function): {
      off: Function
   }
   mouseMoved(callback: Function): {
      off: Function
   }
   mouseUped(callback: Function): {
      off: Function
   }
   mouseClicked(callback: Function): {
      off: Function
   }
}


export default fCanvas
export * from "./methods"