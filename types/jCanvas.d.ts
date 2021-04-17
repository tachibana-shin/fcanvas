import { MyElement } from "./MyElement";

interface toucher {
   x: number
   y: number
   id: number
}

class fCanvas {
   static Element: MyElement;

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
   windowWidth: number
   windowHeight: number

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
