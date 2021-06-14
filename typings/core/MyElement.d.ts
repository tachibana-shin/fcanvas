import { noop, Offset } from "../utils/index";
import fCanvas, { DirectionPattern } from "./fCanvas";
declare type LineJoin = "bevel" | "round" | "miter";
declare type LineCap = "butt" | "round" | "square";
export interface LikeMyElement extends MyElement {
    [propName: string]: any;
}
export default abstract class MyElement {
    update?: noop;
    draw?: {
        (...params: any[]): void;
    };
    get type(): "rect" | "circle" | "point" | "unknown";
    private _els;
    private _idActiveNow;
    private _queue;
    private __addEl;
    /**
     * @param {fCanvas} canvas?
     * @return {any}
     */
    constructor(canvas?: fCanvas);
    /**
     * @return {HTMLCanvasElement}
     */
    get $el(): HTMLCanvasElement;
    _run(canvas: fCanvas): void;
    /**
     * @param {LikeMyElement} element
     * @return {void}
     */
    add(...elements: LikeMyElement[]): void;
    /**
     * @param {LikeMyElement} element
     * @return {void}
     */
    run(element: LikeMyElement): void;
    /**
     * @return {fCanvas}
     */
    get $parent(): fCanvas;
    /**
     * @return {CanvasRenderingContext2D}
     */
    get $context2d(): CanvasRenderingContext2D;
    /**
     * @param {number} angle
     * @return {number}
     */
    sin(angle: number): number;
    /**
     * @param {number} sin
     * @return {number}
     */
    asin(sin: number): number;
    /**
     * @param {number} angle
     * @return {number}
     */
    cos(angle: number): number;
    /**
     * @param {number} cos
     * @return {number}
     */
    acos(cos: number): number;
    /**
     * @param {number} angle
     * @return {number}
     */
    tan(angle: number): number;
    /**
     * @param {number} tan
     * @return {number}
     */
    atan(tan: number): number;
    /**
     * @param {number} y
     * @param {number} x
     * @return {number}
     */
    atan2(y: number, x: number): number;
    /**
     * @return {number | null}
     */
    get mouseX(): number | null;
    /**
     * @return {number | null}
     */
    get mouseY(): number | null;
    /**
     * @return {number}
     */
    get windowWidth(): number;
    /**
     * @return {number}
     */
    get windowHeight(): number;
    /**
     * @param  {number} red
     * @param  {number} green
     * @param  {number} blue
     * @param  {number} alpha
     * @returns void
     */
    fill(hue: number, saturation: number, lightness: number): void;
    fill(hue: number, saturation: number, bright: number): void;
    fill(red: number, green: number, blue: number): void;
    fill(hue: number, saturation: number, lightness: number, alpha: number): void;
    fill(hue: number, saturation: number, bright: number, alpha: number): void;
    fill(red: number, green: number, blue: number, alpha: number): void;
    fill(color: string): void;
    fill(colors: Array<number>): void;
    fill(gradient: CanvasGradient): void;
    fill(image: CanvasImageSource): void;
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
    stroke(image: CanvasImageSource): void;
    stroke(color: number): void;
    /**
     * @return {void}
     */
    noFill(): void;
    lineWidth(): number;
    lineWidth(width: number): void;
    miterLimit(): number;
    miterLimit(value: number): void;
    shadowOffset(): Offset;
    shadowOffset(x: number, y: number): void;
    /**
     * @param {string} text
     * @return {number}
     */
    measureText(text: string): number;
    /**
     * @return {void}
     */
    begin(): void;
    /**
     * @return {void}
     */
    close(): void;
    /**
     * @return {void}
     */
    save(): void;
    /**
     * @return {void}
     */
    restore(): void;
    rotate(): number;
    rotate(angle: number): void;
    translate(): Offset;
    translate(x: number, y: number): void;
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @param  {number} astart
     * @param  {number} astop
     * @param  {boolean} reverse?
     * @returns void
     */
    arc(x: number, y: number, radius: number, astart: number, astop: number, reverse?: boolean): void;
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @param  {number} astart
     * @param  {number} astop
     * @param  {boolean} reverse?
     */
    pie(x: number, y: number, radius: number, astart: number, astop: number, reverse?: boolean): void;
    /**
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @returns void
     */
    line(x1: number, y1: number, x2: number, y2: number): void;
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius1
     * @param  {number} radius2
     * @param  {number} astart
     * @param  {number} astop
     * @param  {number} reverse
     * @returns void
     */
    ellipse(x: number, y: number, radius1: number, radius2: number, astart: number, astop: number, reverse: number): void;
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @returns void
     */
    circle(x: number, y: number, radius: number): void;
    /**
     * @param  {number} x
     * @param  {number} y
     * @returns void
     */
    point(x: number, y: number): void;
    /**
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @param  {number} x3
     * @param  {number} y3
     * @returns void
     */
    triange(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void;
    drawImage(image: CanvasImageSource, x: number, y: number): void;
    drawImage(image: CanvasImageSource, x: number, y: number, width: number, height: number): void;
    drawImage(image: CanvasImageSource, sx: number, sy: number, swidth: number, sheight: number, x: number, y: number, width: number, height: number): void;
    rRect(x: number, y: number, width: number, height: number, radius: string | number): void;
    rRect(x: number, y: number, width: number, height: number, radiusLeft: string | number, radiusRight: string | number): void;
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} width
     * @param  {number} height
     * @param  {string|number} radiusTopLeft
     * @param  {string|number} radiusTopRight
     * @param  {string|number} radiusBottomRight
     * @param  {string|number} radiusBottomLeft
     * @returns void
     */
    rRect(x: number, y: number, width: number, height: number, radiusTopLeft: string | number, radiusTopRight: string | number, radiusBottomRight: string | number, radiusBottomLeft: string | number): void;
    /**
     *
     *
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @memberof MyElement
     */
    rect(x: number, y: number, width: number, height: number): void;
    /**
     * @param  {number} cpx
     * @param  {number} cpy
     * @param  {number} x
     * @param  {number} y
     */
    quadratic(cpx: number, cpy: number, x: number, y: number): void;
    /**
     * @param {number} cp1x
     * @param {number} cp1y
     * @param {number} cp2x
     * @param {number} cp2y
     * @param {number} x
     * @param {number} y
     * @return {void}
     */
    bezier(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    /**
     * @param {number} x
     * @param {number} y
     * @return {void}
     */
    move(x: number, y: number): void;
    /**
     * @param {number} x
     * @param {number} y
     * @return {void}
     */
    to(x: number, y: number): void;
    /**
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number} maxWidth?
     * @return {void}
     */
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    /**
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number} maxWidth?
     * @return {void}
     */
    strokeText(text: string, x: number, y: number, maxWidth?: number): void;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {void}
     */
    fillRect(x: number, y: number, width: number, height: number): void;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {void}
     */
    strokeRect(x: number, y: number, width: number, height: number): void;
    lineDashOffset(): number;
    lineDashOffset(value: number): void;
    lineDash(): number[];
    lineDash(segments: number[]): void;
    lineDash(...segments: number[]): void;
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} radius
     * @return {void}
     */
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    /**
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    isPoint(x: number, y: number): boolean;
    /**
     * @param {any} width
     * @param {number} height?
     * @return {ImageData}
     */
    createImageData(height: ImageData): ImageData;
    createImageData(width: number, height: number): ImageData;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {ImageData}
     */
    getImageData(x: number, y: number, width: number, height: number): ImageData;
    putImageData(imageData: ImageData, x: number, y: number): void;
    putImageData(imageData: ImageData, x: number, y: number, xs: number, ys: number, width: number, height: number): void;
    /**
     * @param {CanvasImageSource} image
     * @param {"repeat"|"repeat-x"|"repeat-y"|"no-repeat"} direction
     * @return {CanvasPattern | null}
     */
    createPattern(image: CanvasImageSource, direction: DirectionPattern): CanvasPattern | null;
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} r1
     * @param {number} x2
     * @param {number} y2
     * @param {number} r2
     * @return {CanvasGradient}
     */
    createRadialGradient(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): CanvasGradient;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {CanvasGradient}
     */
    createLinearGradient(x: number, y: number, width: number, height: number): CanvasGradient;
    lineJoin(): LineJoin;
    lineJoin(type: LineJoin): void;
    lineCap(): LineCap;
    lineCap(value: LineCap): void;
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
    shadowColor(image: CanvasImageSource): void;
    shadowColor(color: number): void;
    drawFocusIfNeeded(element: Element): void;
    drawFocusIfNeeded(path: Path2D, element: Element): void;
    polyline(...points: number[]): void;
    polyline(...points: [number, number][]): void;
    polygon(...points: number[]): void;
    polygon(...points: [number, number][]): void;
}
export declare class Point3D extends MyElement {
    x: number;
    y: number;
    z: number;
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {any}
     */
    constructor(x?: number, y?: number, z?: number);
    /**
     * @param {number} angle
     * @return {void}
     */
    rotateX(angle: number): void;
    /**
     * @param {number} angle
     * @return {void}
     */
    rotateY(angle: number): void;
    /**
     * @param {number} angle
     * @return {void}
     */
    rotateZ(angle: number): void;
}
export declare class Point3DCenter extends MyElement {
    private static persistent;
    private __x;
    private __y;
    private __z;
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {any}
     */
    constructor(x: number, y: number, z?: number);
    get scale(): number;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get z(): number;
    set z(value: number);
    get(value: number): number;
    get(prop: string): number;
}
export declare function createElement(callback: noop): MyElement;
export {};
