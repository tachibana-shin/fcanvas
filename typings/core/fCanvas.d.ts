import MyElement, { Point3D, Point3DCenter, createElement } from "./MyElement";
import { InfoTouch, noop, Offset } from "../utils/index";
import { CallbackEvent } from "../classes/Emitter";
declare type AngleType = "degress" | "radial";
export declare type AlignType = "left" | "center" | "right";
export declare type BaselineType = "top" | "middle" | "bottom";
declare type ColorType = "rgb" | "hsl" | "hue" | "hsb";
export declare type ParamsToRgb = [any?, any?, any?, number?];
declare type TextAlignType = AlignType | "start" | "end";
declare type TextBaselineType = BaselineType | "hanging" | "alphabetic" | "ideographic";
declare type RectMode = "corner" | "corners" | "center" | "radius";
declare type GlobalCompositeOperationType = "source-over" | "source-atop" | "source-in" | "source-out" | "destination-over" | "destination-atop" | "destination-in" | "destination-out" | "lighter" | "copy" | "xor";
declare type RuleClip = "nonzero" | "evenodd";
export declare type DirectionPattern = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";
export default class fCanvas {
    static Element: typeof MyElement;
    static Point3D: typeof Point3D;
    static Point3DCenter: typeof Point3DCenter;
    private static _count;
    private readonly _id;
    private _el;
    private readonly _stamentReady;
    private readonly __store;
    constructor(width: number, height: number);
    constructor(element?: HTMLCanvasElement | string);
    constructor(element: HTMLCanvasElement | string, width?: number, height?: number);
    /**
     * @return {HTMLCanvasElement}
     */
    get $el(): HTMLCanvasElement;
    /**
     * @param {number} width
     * @param {number} height
     * @memberof fCanvas
     */
    size(width: number, height: number): void;
    private _handlerEvent;
    private _handlerEventMousePress;
    private _cancelEventsSystem;
    private _restartEvents;
    touches: InfoTouch[];
    changedTouches: InfoTouch[];
    /**
     * @return {*}  {boolean}
     */
    preventTouch(): void;
    /**
     * @return {*}  {boolean}
     */
    stopTouch(): void;
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
    get id(): number;
    private _createNewContext2d;
    /**
     * @return {void}
     */
    blur(): void;
    /**
     * @return {void}
     */
    noBlur(): void;
    /**
     * @return {void}
     */
    desync(): void;
    /**
     * @return {void}
     */
    noDesync(): void;
    /**
     * @return {void}
     */
    useFloatPixel(): void;
    /**
     * @return {void}
     */
    noFloatPixel(): void;
    _getPixel(value: number): number;
    /**
     * @return {CanvasRenderingContext2D}
     */
    get $context2d(): CanvasRenderingContext2D;
    /**
     * @param {HTMLElement=document.body} parent
     * @return {void}
     */
    append(parent?: HTMLElement): void;
    /**
     * @param {(HTMLCanvasElement | string)} element
     */
    mount(element: HTMLCanvasElement | string): void;
    /**
     * @return {void}
     */
    noClear(): void;
    /**
     * @return {boolean}
     */
    get allowClear(): boolean;
    /**
     * @param {MyElement} element
     * @return {void}
     */
    run(...elements: MyElement[]): void;
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
    _toRgb([red, green, blue, alpha]: ParamsToRgb): any;
    _argsRect(x: number, y: number, width: number, height: number): [number, number, number, number];
    angleMode(): AngleType;
    angleMode(type: AngleType): void;
    colorMode(): ColorType;
    colorMode(mode: ColorType): void;
    rectMode(): RectMode;
    rectMode(mode: RectMode): void;
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
    resetRotate(): void;
    /**
     * @return {void}
     */
    resetTransform(): void;
    /**
     * @param {noop} callback
     * @return {*}  {MyElement}
     */
    createElement: typeof createElement;
    /**
     * @param {Function} callback
     * @return {Promise<void>}
     */
    preload(callback: noop): Promise<void>;
    /**
     * @param {Function} callback
     * @return {Promise<void>}
     */
    setup(callback: noop): Promise<void>;
    /**
     * @param {Function} callback
     * @return {void}
     */
    draw(callback: noop): void;
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
    resetAlpha(): void;
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
    clip(fillRule: RuleClip): void;
    clip(path: Path2D, fillRule: RuleClip): void;
    transform(matrix: DOMMatrix): void;
    transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
    transform(): DOMMatrix;
    setTransform(matrix: DOMMatrix): void;
    setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
    /**
     * @param {string} text
     * @return {number}
     */
    measureText(text: string): number;
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
    _setIdFrame(id: number): void;
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
    get allowLoop(): boolean;
    on(name: string, callback: CallbackEvent): noop;
    off(resultEvent: noop): void;
    off(name: string, callback: CallbackEvent): void;
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
