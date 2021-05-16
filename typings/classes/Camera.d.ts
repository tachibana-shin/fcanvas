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
     * @return {number}
     */
    followX(x: number): number;
    /**
     * @param {number} y
     * @return {number}
     */
    followY(y: number): number;
    /**
     * @param {Vector} vector
     * @return {Vector}
     */
    followVector(vector: Vector): Vector;
    /**
     * @param {number} x
     * @param {number} y
     * @return {any}
     */
    follow(x: number, y: number): {
        x: number;
        y: number;
    };
    /**
     * @param {number} x
     * @param {number} width
     * @return {boolean}
     */
    xInViewBox(x: number, width?: number): boolean;
    /**
     * @param {number} y
     * @param {number=0} height
     * @return {boolean}
     */
    yInViewBox(y: number, height?: number): boolean;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number=0} width
     * @param {number=0} height
     * @return {boolean}
     */
    inViewBox(x: number, y: number, width?: number, height?: number): boolean;
}
export default Camera;
