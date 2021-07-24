import { noop, Offset } from "../utils/index";
import fCanvas, { DirectionPattern } from "./fCanvas";
import Peers from "../classes/Peers";
declare type LineJoin = "bevel" | "round" | "miter";
declare type LineCap = "butt" | "round" | "square";
export default abstract class MyElement {
    private static _count;
    get type(): "rect" | "circle" | "point" | "unknown";
    private readonly _id;
    get id(): number;
    private readonly _els;
    private _idActiveNow;
    private readonly _queue;
    private __addEl;
    /**
     * @param {fCanvas} canvas?
     * @return {any}
     */
    constructor(canvas?: fCanvas);
    _run(canvas: fCanvas, peers?: Peers): void;
    /**
     * @param {MyElement} element
     * @return {void}
     */
    add(...elements: MyElement[]): void;
    /**
     * @param {MyElement} element
     * @return {void}
     */
    run(element: MyElement): void;
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
     * @return {numbe}
     */
    get movedX(): number;
    /**
     * @return {numbe}
     */
    get movedY(): number;
    /**
     * @return {numbe}
     */
    get pmouseX(): number;
    /**
     * @return {numbe}
     */
    get pmouseY(): number;
    /**
     * @return {boolean}
     */
    get mouseIsPressed(): boolean;
    /**
     * @return {number}
     */
    get windowWidth(): number;
    /**
     * @return {number}
     */
    get windowHeight(): number;
    fill(hue: number, saturation: number, lightness: number, alpha?: number): this;
    fill(red: number, green: number, blue: number, alpha?: number): this;
    fill(color?: string | CanvasGradient | CanvasImageSource | number): this;
    stroke(hue: number, saturation: number, lightness: number, alpha?: number): this;
    stroke(red: number, green: number, blue: number, alpha?: number): this;
    stroke(color?: string | CanvasGradient | CanvasImageSource | number): this;
    /**
     * @return {this}
     */
    noFill(): this;
    lineWidth(): number;
    lineWidth(width: number): this;
    miterLimit(): number;
    miterLimit(value: number): this;
    shadowOffset(): Offset;
    shadowOffset(x: number, y: number): this;
    /**
     * @param {string} text
     * @return {number}
     */
    measureText(text: string): number;
    /**
     * @return {this}
     */
    begin(): this;
    /**
     * @return {this}
     */
    close(): this;
    /**
     * @return {this}
     */
    save(): this;
    /**
     * @return {this}
     */
    restore(): this;
    rotate(): number;
    rotate(angle: number): this;
    translate(): Offset;
    translate(x: number, y: number): this;
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @param  {number} astart
     * @param  {number} astop
     * @param  {boolean} reverse?
     * @returns this
     */
    arc(x: number, y: number, radius: number, astart: number, astop: number, reverse?: boolean): this;
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @param  {number} astart
     * @param  {number} astop
     * @param  {boolean} reverse?
     * @returns {this}
     */
    pie(x: number, y: number, radius: number, astart: number, astop: number, reverse?: boolean): this;
    /**
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @returns {this}
     */
    line(x1: number, y1: number, x2: number, y2: number): this;
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius1
     * @param  {number} radius2
     * @param  {number} astart
     * @param  {number} astop
     * @param  {number} reverse
     * @returns {this}
     */
    ellipse(x: number, y: number, radius1: number, radius2: number, astart: number, astop: number, reverse: number): this;
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} radius
     * @returns {this}
     */
    circle(x: number, y: number, radius: number): this;
    /**
     * @param  {number} x
     * @param  {number} y
     * @returns {this}
     */
    point(x: number, y: number): this;
    /**
     * @param  {number} x1
     * @param  {number} y1
     * @param  {number} x2
     * @param  {number} y2
     * @param  {number} x3
     * @param  {number} y3
     * @returns {this}
     */
    triange(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): this;
    drawImage(image: CanvasImageSource, x: number, y: number): this;
    drawImage(image: CanvasImageSource, x: number, y: number, width: number, height: number): this;
    drawImage(image: CanvasImageSource, sx: number, sy: number, swidth: number, sheight: number, x: number, y: number, width: number, height: number): this;
    rRect(x: number, y: number, width: number, height: number, radius: string | number): this;
    rRect(x: number, y: number, width: number, height: number, radiusLeft: string | number, radiusRight: string | number): this;
    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} width
     * @param  {number} height
     * @param  {string|number} radiusTopLeft
     * @param  {string|number} radiusTopRight
     * @param  {string|number} radiusBottomRight
     * @param  {string|number} radiusBottomLeft
     * @returns {this}
     */
    rRect(x: number, y: number, width: number, height: number, radiusTopLeft: string | number, radiusTopRight: string | number, radiusBottomRight: string | number, radiusBottomLeft: string | number): this;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @memberof MyElement
     * @returns {this}
     */
    rect(x: number, y: number, width: number, height: number): this;
    /**
     * @param  {number} cpx
     * @param  {number} cpy
     * @param  {number} x
     * @param  {number} y
     * @return {this}
     */
    quadratic(cpx: number, cpy: number, x: number, y: number): this;
    /**
     * @param {number} cp1x
     * @param {number} cp1y
     * @param {number} cp2x
     * @param {number} cp2y
     * @param {number} x
     * @param {number} y
     * @return {this}
     */
    bezier(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): this;
    /**
     * @param {number} x
     * @param {number} y
     * @return {this}
     */
    move(x: number, y: number): this;
    /**
     * @param {number} x
     * @param {number} y
     * @return {this}
     */
    to(x: number, y: number): this;
    /**
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number} maxWidth?
     * @return {this}
     */
    fillText(text: string, x: number, y: number, maxWidth?: number): this;
    /**
     * @param {string} text
     * @param {number} x
     * @param {number} y
     * @param {number} maxWidth?
     * @return {this}
     */
    strokeText(text: string, x: number, y: number, maxWidth?: number): this;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {this}
     */
    fillRect(x: number, y: number, width: number, height: number): this;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {this}
     */
    strokeRect(x: number, y: number, width: number, height: number): this;
    lineDashOffset(): number;
    lineDashOffset(value: number): this;
    lineDash(): number[];
    lineDash(segments: number[]): this;
    lineDash(...segments: number[]): this;
    /**
     * @param {number} x1
     * @param {number} y1
     * @param {number} x2
     * @param {number} y2
     * @param {number} radius
     * @return {this}
     */
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): this;
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
    putImageData(imageData: ImageData, x: number, y: number): this;
    putImageData(imageData: ImageData, x: number, y: number, xs: number, ys: number, width: number, height: number): this;
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
    lineJoin(type: LineJoin): this;
    lineCap(): LineCap;
    lineCap(value: LineCap): this;
    shadowBlur(): number;
    shadowBlur(opacity: number): this;
    shadowColor(hue: number, saturation: number, lightness: number, alpha?: number): this;
    shadowColor(red: number, green: number, blue: number, alpha?: number): this;
    shadowColor(color?: string | CanvasGradient | CanvasImageSource | number): this;
    drawFocusIfNeeded(element: Element): this;
    drawFocusIfNeeded(path: Path2D, element: Element): this;
    polyline(...points: number[]): this;
    polyline(...points: [number, number][]): this;
    polygon(...points: number[]): this;
    polygon(...points: [number, number][]): this;
    /**
     * @param {noop} program
     * @memberof MyElement
     */
    drawing(program: noop): void;
    /**
     * @param {noop} program
     * @memberof MyElement
     */
    backup(program: noop): void;
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
export declare function createElement(callback: {
    (canvas: MyElement): void;
}): MyElement;
export {};
