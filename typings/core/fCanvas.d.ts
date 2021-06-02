import MyElement, { RectElement, CircleElement, Point3D, LikeMyElement } from "./MyElement";
import { InfoTouch, noop, Offset } from "../utils/index";
import { CallbackEvent } from "../classes/Emitter";
declare type AngleType = "degress" | "radial";
export declare type AlignType = "left" | "center" | "right";
export declare type BaselineType = "top" | "middle" | "bottom";
declare type ColorType = "rgb" | "hsl" | "hue" | "hsb";
export declare type ParamsToRgb = [any?, any?, any?, number?];
declare type TextAlignType = AlignType | "start" | "end";
declare type TextBaselineType = BaselineType | "hanging" | "alphabetic" | "ideographic";
declare type GlobalCompositeOperationType = "source-over" | "source-atop" | "source-in" | "source-out" | "destination-over" | "destination-atop" | "destination-in" | "destination-out" | "lighter" | "copy" | "xor";
export default class fCanvas {
    static Element: typeof MyElement;
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
    private __attributeContext;
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
    private _createNewContext2d;
    /**
     * @return {boolean}
     */
    acceptBlur(): boolean;
    /**
     * @return {void}
     */
    blur(): void;
    /**
     * @return {void}
     */
    noBlur(): void;
    /**
     * Describe your function
     * @return {boolean}
     */
    acceptDesync(): boolean;
    /**
     * Describe your function
     * @return {void}
     */
    desync(): void;
    /**
     * Describe your function
     * @return {void}
     */
    noDesync(): void;
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
     * @return {void}
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
     * @param {noop} callback
     * @return {*}  {MyElement}
     * @memberof fCanvas
     */
    createElement(callback: noop): MyElement;
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
    operation(): GlobalCompositeOperationType;
    operation(composite: GlobalCompositeOperationType): void;
    alpha(): number;
    alpha(alpha: number): void;
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
    mouseMove(callback: CallbackEvent): noop;
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseUp(callback: CallbackEvent): noop;
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseDown(callback: CallbackEvent): noop;
    /**
     * @param {CallbackEvent} callback
     * @return {noop}
     */
    mouseClicked(callback: CallbackEvent): noop;
}
export declare const noopFCanvas: fCanvas;
export {};
