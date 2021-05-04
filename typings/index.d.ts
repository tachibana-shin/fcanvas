import { InfoTouch } from "./utils/index";
import Emitter, { CallbackEvent } from "./classes/Emitter";
import Stament from "./classes/Stament";
import Store from "./classes/Store";
import Vector from "./classes/Vector";
import Animate, { AnimateConfig, AnimateType } from "./classes/Animate";
declare type ColorType = "rgb" | "hsl" | "hue" | "hsb";
declare type AngleType = "degress" | "radial";
declare type ParamsToRgb = [any?, any?, any?, number?];
declare type AlignType = "left" | "center" | "right";
declare type BaselineType = "top" | "middle" | "bottom";
declare type TextAlignType = AlignType | "start" | "end";
declare type TextBaselineType = BaselineType | "hanging" | "alphabetic" | "ideographic";
declare type GlobalCompositeOperationType = "source-over" | "source-atop" | "source-in" | "source-out" | "destination-over" | "destination-atop" | "destination-in" | "destination-out" | "lighter" | "copy" | "xor";
interface noop {
    (): void;
}
declare class MyElement {
    update: any;
    draw: any;
    private _els;
    private _idActiveNow;
    private _queue;
    constructor(canvas?: fCanvas);
    get $el(): HTMLCanvasElement;
    _run(canvas: fCanvas): void;
    addQueue(element: MyElement): void;
    getQueue(index: number): MyElement | undefined;
    run(element: MyElement): void;
    has(id: number): boolean;
    get $parent(): fCanvas;
    bind(canvas: fCanvas): void;
    get $context2d(): CanvasRenderingContext2D;
    _toRadius(value: number): number;
    _toDegress(value: number): number;
    _toRgb(...params: ParamsToRgb): string;
    _figureOffset(x: number, y: number, width: number, height: number): [number, number];
    sin(angle: number): number;
    asin(sin: number): number;
    cos(angle: number): number;
    acos(cos: number): number;
    tan(angle: number): number;
    atan(tan: number): number;
    atan2(y: number, x: number): number;
    get mouseX(): number | null;
    get mouseY(): number | null;
    get interact(): boolean;
    get width(): number;
    get height(): number;
    get windowWidth(): number;
    get windowHeight(): number;
    fill(hue: number, saturation: number, lightness: number): void;
    fill(hue: number, saturation: number, bright: number): void;
    fill(red: number, green: number, blue: number): void;
    fill(hue: number, saturation: number, lightness: number, alpha: number): void;
    fill(hue: number, saturation: number, bright: number, alpha: number): void;
    fill(red: number, green: number, blue: number, alpha: number): void;
    fill(color: string): void;
    fill(colors: Array<number>): void;
    fill(gradient: CanvasGradient): void;
    fill(image: HTMLImageElement): void;
    fill(color: number): void;
    stroke(hue: number, saturation: number, lightness: number): void;
    stroke(hue: number, saturation: number, bright: number): void;
    stroke(red: number, green: number, blue: number): void;
    stroke(hue: number, saturation: number, lightness: number, alpha: number): void;
    stroke(hue: number, saturation: number, bright: number, alpha: number): void;
    stroke(red: number, green: number, blue: number, alpha: number): void;
    stroke(color: string): void;
    stroke(colors: Array<number>): void;
    stroke(gradient: CanvasGradient): void;
    stroke(image: HTMLImageElement): void;
    stroke(color: number): void;
    noFill(): void;
    lineWidth(): number;
    lineWidth(width: number): void;
    miterLimit(): number;
    miterLimit(value: number): void;
    shadowOffset(): {
        x: number;
        y: number;
    };
    shadowOffset(x: number, y: number): void;
    measureText(text: string): number;
    begin(): void;
    close(): void;
    save(): void;
    restore(): void;
    arc(x: number, y: number, radius: number, astart: number, astop: number, reverse?: boolean): void;
    pie(x: number, y: number, radius: number, astart: number, astop: number, reverse?: boolean): void;
    line(x1: number, y1: number, x2: number, y2: number): void;
    ellipse(x: number, y: number, radius1: number, radius2: number, astart: number, astop: number, reverse: number): void;
    circle(x: number, y: number, radius: number): void;
    point(x: number, y: number): void;
    triange(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
    drawImage(image: HTMLImageElement, x: number, y: number): void;
    drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number): void;
    drawImage(image: HTMLImageElement, sx: number, sy: number, swidth: number, sheight: number, x: number, y: number, width: number, height: number): void;
    rect(x: number, y: number, width: number, height: number): void;
    rect(x: number, y: number, width: number, height: number, radius: string | number): void;
    rect(x: number, y: number, width: number, height: number, radiusLeft: string | number, radiusRight: string | number): void;
    rect(x: number, y: number, width: number, height: number, radiusTopLeft: string | number, radiusTopRight: string | number, radiusBottomRight: string | number, radiusBottomLeft: string | number): void;
    quadratic(cpx: number, cpy: number, x: number, y: number): void;
    bezier(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    move(x: number, y: number): void;
    to(x: number, y: number): void;
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    strokeText(text: string, x: number, y: number, maxWidth?: number): void;
    fillRect(x: number, y: number, width: number, height: number): void;
    strokeRect(x: number, y: number, width: number, height: number): void;
    lineDash(): number;
    lineDash(value: number): void;
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    isPoint(x: number, y: number): boolean;
    createImageData(height: ImageData): ImageData;
    createImageData(width: number, height: number): ImageData;
    getImageData(x: number, y: number, width: number, height: number): ImageData;
    putImageData(imageData: ImageData, x: number, y: number): void;
    putImageData(imageData: ImageData, x: number, y: number, xs: number, ys: number, width: number, height: number): void;
    createPattern(image: HTMLImageElement, direction: "repeat" | "repeat-x" | "repeat-y" | "no-repeat"): CanvasPattern | null;
    createRadialGradient(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): CanvasGradient;
    createLinearGradient(x: number, y: number, width: number, height: number): CanvasGradient;
    lineJoin(): "bevel" | "round" | "miter";
    lineJoin(type: "bevel" | "round" | "miter"): void;
    lineCap(): "butt" | "round" | "square";
    lineCap(value: "butt" | "round" | "square"): void;
    shadowBlur(): number;
    shadowBlur(opacity: number): void;
    shadowColor(hue: number, saturation: number, lightness: number): void;
    shadowColor(hue: number, saturation: number, bright: number): void;
    shadowColor(red: number, green: number, blue: number): void;
    shadowColor(hue: number, saturation: number, lightness: number, alpha: number): void;
    shadowColor(hue: number, saturation: number, bright: number, alpha: number): void;
    shadowColor(red: number, green: number, blue: number, alpha: number): void;
    shadowColor(color: string): void;
    shadowColor(colors: Array<number>): void;
    shadowColor(gradient: CanvasGradient): void;
    shadowColor(image: HTMLImageElement): void;
    shadowColor(color: number): void;
}
declare class EAnimate extends MyElement {
    private __animate;
    get animate(): Animate;
    constructor(animate?: AnimateConfig);
    get $(): Emitter;
    get running(): boolean;
    get done(): boolean;
    get xFrom(): number;
    get yFrom(): number;
    get zFrom(): number;
    get xTo(): number;
    get yTo(): number;
    get zTo(): number;
    get x(): number;
    get y(): number;
    get z(): number;
    get frames(): number;
    get frame(): number;
    set frame(value: number);
    config(animate: AnimateConfig): void;
    set(x?: number, y?: number, z?: number): void;
    moveTo(x?: number, y?: number, z?: number): void;
    moveAsync(x?: number, y?: number, z?: number): Promise<void>;
    moveImmediate(x?: number, y?: number, z?: number): void;
    addFrame(): void;
    setType(type: AnimateType): void;
    setTime(time: number): void;
}
declare class fCanvas {
    static Element: typeof MyElement;
    static EAnimate: typeof EAnimate;
    static count: number;
    private _ENV;
    private _id;
    private _el;
    private _context2dCaching;
    private _stamentReady;
    private _existsPreload;
    private __translate;
    private __scale;
    private __idFrame;
    preventTouch: boolean;
    stopTouch: boolean;
    touches: InfoTouch[];
    changedTouches: InfoTouch[];
    get mouseX(): number | null;
    get mouseY(): number | null;
    get interact(): boolean;
    get id(): number;
    get $el(): HTMLCanvasElement;
    get $context2d(): CanvasRenderingContext2D;
    constructor(element?: HTMLCanvasElement);
    append(parent?: HTMLElement): void;
    noClear(): void;
    get acceptClear(): boolean;
    run(element: MyElement): void;
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    get windowWidth(): number;
    get windowHeight(): number;
    save(): void;
    restore(): void;
    _toRadius(value: number): number;
    _toDegress(value: number): number;
    _toRgb([red, green, blue, alpha]: ParamsToRgb): string;
    _figureOffset(x: number, y: number, width: number, height: number): [number, number];
    angleMode(): AngleType;
    angleMode(type: AngleType): void;
    rectAlign(): AlignType;
    rectAlign(align: AlignType): void;
    colorMode(): ColorType;
    colorMode(mode: ColorType): void;
    rectBaseline(): BaselineType;
    rectBaseline(baseline: BaselineType): void;
    fontSize(): number;
    fontSize(size: number): void;
    fontFamily(): string;
    fontFamily(font: string): void;
    fontWeight(): string;
    fontWeight(weight: string): void;
    clear(x?: number, y?: number, w?: number, h?: number): void;
    background(...params: ParamsToRgb): void;
    toDataURL(type?: string, scale?: number): string;
    rotate(): number;
    rotate(value: number): void;
    resetTransform(): void;
    preload(callback: {
        (): void;
    }): Promise<void>;
    setup(callback: {
        (): void;
    }): Promise<void>;
    draw(callback: {
        (): void;
    }): void;
    font(): string;
    font(font: string): void;
    textAlign(): TextAlignType;
    textAlign(type: TextAlignType): void;
    textBaseline(): TextBaselineType;
    textBaseline(middle: TextBaselineType): void;
    globalOperation(): GlobalCompositeOperationType;
    globalOperation(composite: GlobalCompositeOperationType): void;
    translate(): {
        x: number;
        y: number;
    };
    translate(x: number, y: number): void;
    resetTranslate(): void;
    scale(): {
        x: number;
        y: number;
    };
    scale(x: number, y: number): void;
    resetScale(): void;
    clip(): void;
    clip(fillRule: "nonzero" | "evenodd"): void;
    clip(path: Path2D, fillRule: "nonzero" | "evenodd"): void;
    transform(matrix: DOMMatrix): void;
    transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
    transform(): DOMMatrix;
    setTransform(matrix: DOMMatrix): void;
    setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
    sin(angle: number): number;
    asin(sin: number): number;
    cos(angle: number): number;
    acos(cos: number): number;
    tan(angle: number): number;
    atan(tan: number): number;
    atan2(y: number, x: number): number;
    cursor(): void;
    noCursor(): void;
    loop(): void;
    noLoop(): void;
    get acceptLoop(): boolean;
    keyPressed(callback: CallbackEvent): noop;
    mouseIn(callback: CallbackEvent): noop;
    mouseOut(callback: CallbackEvent): noop;
    mouseDowned(callback: CallbackEvent): noop;
    touchStarted(callback: CallbackEvent): noop;
    touchMoved(callback: CallbackEvent): noop;
    touchEned(callback: CallbackEvent): noop;
    mouseMoved(callback: CallbackEvent): noop;
    mouseUped(callback: CallbackEvent): noop;
    mouseClicked(callback: CallbackEvent): noop;
}
export { Emitter, Stament, Store, Vector, Animate };
export declare function setup(callback: {
    (): Promise<void> | void;
}): Promise<void>;
export declare function draw(callback: {
    (): void;
}, canvas?: fCanvas): void;
export declare function keyPressed(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
export declare function changeSize(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
export declare function mouseWheel(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
export declare function mousePressed(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
export declare function mouseClicked(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
export declare function mouseMoved(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
export declare function touchStarted(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
export declare function touchMoved(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
export declare function touchEnded(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
export default fCanvas;
export * from "./methods/index";
