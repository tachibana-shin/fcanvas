import { requestAnimationFrame, windowSize, isMobile, InfoTouch, isTouch, passive } from "./utils/index";
import Emitter, { CallbackEvent } from "./classes/Emitter";
import Stament from "./classes/Stament";
import Store from "./classes/Store";
import Vector from "./classes/Vector";
import Animate, { AnimateConfig, AnimateType } from "./classes/Animate";
import Camera from "./classes/Camera";
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
interface LikeMyElement extends MyElement {
    [propName: string]: any;
}
interface Offset {
    x: number;
    y: number;
}
declare class MyElement {
    update: noop | undefined;
    draw: noop | undefined;
    setup: noop | undefined;
    setupAnimate: {
        (): AnimateConfig;
    } | undefined | AnimateConfig;
    autoDraw: boolean;
    autoFrame: boolean;
    private _els;
    private _idActiveNow;
    private _queue;
    private _animate;
    private _setuped;
    private __addEl;
    /**
     * @param {fCanvas} canvas?
     * @return {any}
     */
    constructor(canvas?: fCanvas);
    private _initAnimate;
    /**
     * @return {Animate | undefined}
     */
    get animate(): Animate | undefined;
    /**
     * @return {HTMLCanvasElement}
     */
    get $el(): HTMLCanvasElement;
    _run(canvas: fCanvas): void;
    /**
     * @param {LikeMyElement} element
     * @return {void}
     */
    addQueue(element: LikeMyElement): void;
    /**
     * @param {number} index
     * @return {LikeMyElement | undefined}
     */
    getQueue(index: number): LikeMyElement | undefined;
    /**
     * @param {LikeMyElement} element
     * @return {void}
     */
    run(element: LikeMyElement): void;
    /**
     * @param {number} id
     * @return {boolean}
     */
    has(id: number): boolean;
    /**
     * @return {fCanvas}
     */
    get $parent(): fCanvas;
    /**
     * @param {fCanvas} canvas
     * @return {void}
     */
    bind(canvas: fCanvas): void;
    /**
     * @return {CanvasRenderingContext2D}
     */
    get $context2d(): CanvasRenderingContext2D;
    _toRadius(value: number): number;
    _toDegress(value: number): number;
    _toRgb(...params: ParamsToRgb): string;
    _figureOffset(x: number, y: number, width: number, height: number): [number, number];
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
    rect(x: number, y: number, width: number, height: number): void;
    rect(x: number, y: number, width: number, height: number, radius: string | number): void;
    rect(x: number, y: number, width: number, height: number, radiusLeft: string | number, radiusRight: string | number): void;
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
    rect(x: number, y: number, width: number, height: number, radiusTopLeft: string | number, radiusTopRight: string | number, radiusBottomRight: string | number, radiusBottomLeft: string | number): void;
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
    lineDash(): number;
    lineDash(value: number): void;
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
    createPattern(image: CanvasImageSource, direction: "repeat" | "repeat-x" | "repeat-y" | "no-repeat"): CanvasPattern | null;
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
    shadowColor(image: CanvasImageSource): void;
    shadowColor(color: number): void;
}
declare class EAnimate extends MyElement {
    private __animate;
    /**
     * @return {Animate}
     */
    get animate(): Animate;
    /**
     * @param {AnimateConfig} animate?
     * @return {any}
     */
    constructor(animate?: AnimateConfig);
    /**
     * @return {Emitter}
     */
    get $(): Emitter;
    /**
     * @return {boolean}
     */
    get running(): boolean;
    /**
     * @return {boolean}
     */
    get done(): boolean;
    /**
     * @return {number}
     */
    get xFrom(): number;
    /**
     * @return {number}
     */
    get yFrom(): number;
    /**
     * @return {number}
     */
    get zFrom(): number;
    /**
     * @return {number}
     */
    get xTo(): number;
    /**
     * @return {number}
     */
    get yTo(): number;
    /**
     * @return {number}
     */
    get zTo(): number;
    /**
     * @return {number}
     */
    get x(): number;
    /**
     * @return {number}
     */
    get y(): number;
    /**
     * @return {number}
     */
    get z(): number;
    /**
     * @return {number}
     */
    get frames(): number;
    /**
     * @return {number}
     */
    get frame(): number;
    /**
     * @param {number} value
     * @return {any}
     */
    set frame(value: number);
    /**
     * @param {AnimateConfig} animate
     * @return {void}
     */
    config(animate: AnimateConfig): void;
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */
    set(x?: number, y?: number, z?: number): void;
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */
    moveTo(x?: number, y?: number, z?: number): void;
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {Promise<void>}
     */
    moveAsync(x?: number, y?: number, z?: number): Promise<void>;
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */
    moveImmediate(x?: number, y?: number, z?: number): void;
    /**
     * @return {void}
     */
    addFrame(): void;
    /**
     * @param {AnimateType} type
     * @return {void}
     */
    setType(type: AnimateType): void;
    /**
     * @param {number} time
     * @return {void}
     */
    setTime(time: number): void;
}
declare class RectElement extends MyElement {
    readonly type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {any}
     */
    constructor(x: number, y: number, width: number, height: number);
    /**
     * @return {boolean}
     */
    get interact(): boolean;
}
declare class CircleElement extends MyElement {
    readonly type: string;
    x: number;
    y: number;
    radius: number;
    /**
     * Describe your function
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @return {any}
     */
    constructor(x: number, y: number, radius: number);
    /**
     * @return {boolean}
     */
    get interact(): boolean;
}
declare class Point3D extends MyElement {
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
    draw: noop;
}
declare class fCanvas {
    static Element: typeof MyElement;
    static EAnimate: typeof EAnimate;
    static RectElement: typeof RectElement;
    static CircleElement: typeof CircleElement;
    static Point3D: typeof Point3D;
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
    /**
     * @return {number | null}
     */
    get mouseX(): number | null;
    /**
     * @return {number | null}
     */
    get mouseY(): number | null;
    /**
     * @return {boolean}
     */
    get interact(): boolean;
    /**
     * @return {number}
     */
    get id(): number;
    /**
     * @return {HTMLCanvasElement}
     */
    get $el(): HTMLCanvasElement;
    /**
     * @return {CanvasRenderingContext2D}
     */
    get $context2d(): CanvasRenderingContext2D;
    /**
     * @return {any}
     */
    constructor();
    /**
     * @param {HTMLElement=document.body} parent
     * @return {any}
     */
    append(parent?: HTMLElement): void;
    /**
     * @return {void}
     */
    noClear(): void;
    /**
     * @return {boolean}
     */
    get acceptClear(): boolean;
    /**
     * @param {LikeMyElement} element
     * @return {void}
     */
    run(element: LikeMyElement): void;
    /**
     * @return {number}
     */
    get width(): number;
    /**
     * @param {number} value
     * @return {any}
     */
    set width(value: number);
    /**
     * @return {number}
     */
    get height(): number;
    /**
     * @param {number} value
     * @return {any}
     */
    set height(value: number);
    /**
     * @return {number}
     */
    get windowWidth(): number;
    /**
     * @return {number}
     */
    get windowHeight(): number;
    /**
     * @return {void}
     */
    save(): void;
    /**
     * @return {void}
     */
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
    /**
     * @param {number=0} x
     * @param {number=0} y
     * @param {number=this.width} w
     * @param {number=this.height} h
     * @return {void}
     */
    clear(x?: number, y?: number, w?: number, h?: number): void;
    /**
     * @param {ParamsToRgb} ...params
     * @return {void}
     */
    background(...params: ParamsToRgb): void;
    /**
     * @param {CanvasImageSource} image
     * @return {void}
     */
    backgroundImage(image: CanvasImageSource): void;
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
    createPattern(image: CanvasImageSource, direction: "repeat" | "repeat-x" | "repeat-y" | "no-repeat"): CanvasPattern | null;
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
    /**
     * @param {any} type="image/png"
     * @param {number} scale?
     * @return {string}
     */
    toDataURL(type?: string, scale?: number): string;
    rotate(): number;
    rotate(value: number): void;
    /**
     * @return {void}
     */
    resetTransform(): void;
    /**
     * @param {Function} callback
     * @return {Promise<void>}
     */
    preload(callback: {
        (): void;
    }): Promise<void>;
    /**
     * @param {Function} callback
     * @return {Promise<void>}
     */
    setup(callback: {
        (): void;
    }): Promise<void>;
    /**
     * @param {Function} callback
     * @return {void}
     */
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
    globalAlpha(): number;
    globalAlpha(alpha: number): void;
    translate(): Offset;
    translate(x: number, y: number): void;
    /**
     * @return {void}
     */
    resetTranslate(): void;
    scale(): Offset;
    scale(x: number, y: number): void;
    /**
     * @return {void}
     */
    resetScale(): void;
    clip(): void;
    clip(fillRule: "nonzero" | "evenodd"): void;
    clip(path: Path2D, fillRule: "nonzero" | "evenodd"): void;
    transform(matrix: DOMMatrix): void;
    transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
    transform(): DOMMatrix;
    setTransform(matrix: DOMMatrix): void;
    setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
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
     * @return {void}
     */
    cursor(): void;
    /**
     * @return {void}
     */
    noCursor(): void;
    /**
     * @return {void}
     */
    loop(): void;
    /**
     * @return {void}
     */
    noLoop(): void;
    /**
     * @return {boolean}
     */
    get acceptLoop(): boolean;
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseIn(callback: CallbackEvent): noop;
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseOut(callback: CallbackEvent): noop;
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseDown(callback: CallbackEvent): noop;
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    touchStart(callback: CallbackEvent): noop;
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    touchMove(callback: CallbackEvent): noop;
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    touchEnd(callback: CallbackEvent): noop;
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseMoved(callback: CallbackEvent): noop;
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseUped(callback: CallbackEvent): noop;
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseClicked(callback: CallbackEvent): noop;
}
export { Emitter, Stament, Store, Vector, Animate, Camera };
/**
 * @param {any} document.readyState==="complete"
 * @return {any}
 */
export declare function setup(callback: {
    (): Promise<void> | void;
}): Promise<void>;
/**
 * @param {Function} callback
 * @param {fCanvas} canvas?
 * @return {void}
 */
export declare function draw(callback: {
    (): void;
}, canvas?: fCanvas): void;
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function keyPressed(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function keyUp(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function changeSize(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function mouseWheel(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function mousePressed(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function mouseClicked(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function mouseMoved(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function touchStart(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function touchMove(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
/**
 * @param {CallbackEvent} callback
 * @param {Window|HTMLElement=window} element
 * @return {{ (): void }}
 */
export declare function touchEnd(callback: CallbackEvent, element?: Window | HTMLElement): {
    (): void;
};
export default fCanvas;
export { requestAnimationFrame, windowSize, isMobile, InfoTouch, isTouch, passive, };
export * from "./methods/index";
