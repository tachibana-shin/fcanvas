import Vector from "./Vector";
interface ViewBox {
    mx: number;
    my: number;
    width: number;
    height: number;
}
interface Viewport {
    width: number;
    height: number;
}
interface Cursor {
    __camera: Camera;
    idealX: number;
    idealY: number;
    width: number;
    height: number;
    offsetTop: number;
    offsetRight: number;
    offsetBottom: number;
    offsetLeft: number;
    x: number;
    y: number;
}
declare class Camera {
    viewport: Viewport;
    viewBox: ViewBox;
    private _cx;
    private _cy;
    get cx(): number;
    set cx(x: number);
    get cy(): number;
    set cy(y: number);
    readonly cursor: Cursor & {
        use: boolean;
        idealRX: number;
    };
    /**
     * @param {number} width?
     * @param {number} height?
     * @param {number} x?
     * @param {number} y?
     * @param {number} vWidth?
     * @param {number} vHeight?
     * @param {number|false} cix?
     * @param {number} ciy?
     * @param {number} cwidth?
     * @param {number} cheight?
     * @return {any}
     */
    constructor(width?: number, height?: number, x?: number, y?: number, vWidth?: number, vHeight?: number, cix?: number | false, ciy?: number, cwidth?: number, cheight?: number);
    /**
     * @param {number} width?
     * @param {number} height?
     * @return {void}
     */
    setViewport(width: number, height: number): void;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {void}
     */
    setViewBox(x: number, y: number, width: number, height: number): void;
    setCursor(idealX: number, idealY: number, width?: number, height?: number): void;
    setCursor(use: false): void;
    /**
     * @param {number} x
     * @param {number=1} scale
     * @return {number}
     */
    followX(x: number, scale?: number): number;
    /**
     * @param {number} y
     * @param {number=1} scale
     * @return {number}
     */
    followY(y: number, scale?: number): number;
    /**
     * @param {Vector} vector
     * @param {number=1} scaleX
     * @param {number=scaleX} scaleY
     * @return {Vector}
     */
    followVector(vector: Vector, scaleX?: number, scaleY?: number): Vector;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number=1} scaleX
     * @param {number=scaleX} scaleY
     * @return {any}
     */
    follow(x: number, y: number, scaleX?: number, scaleY?: number): {
        x: number;
        y: number;
    };
    /**
     * @param {number} x
     * @param {number=0} width
     * @param {number=1} scale
     * @return {boolean}
     */
    xInViewBox(x: number, width?: number, scale?: number): boolean;
    /**
     * @param {number} y
     * @param {number=0} height
     * @param {number=1} scale
     * @return {boolean}
     */
    yInViewBox(y: number, height?: number, scale?: number): boolean;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number=0} width
     * @param {number=0} height
     * @param {number=1} scaleX
     * @param {number=scaleX} scaleY
     * @return {boolean}
     */
    inViewBox(x: number, y: number, width?: number, height?: number, scaleX?: number, scaleY?: number): boolean;
}
export default Camera;
