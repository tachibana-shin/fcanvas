import Emitter from "./Emitter";
export declare type AnimateType = "ease" | "quadratic" | "sine-ease-in-out" | "quintic-ease" | "exp-ease-in-out" | "linear";
export interface AnimateConfig {
    xFrom?: number;
    xTo?: number;
    yFrom?: number;
    yTo?: number;
    zFrom?: number;
    zTo?: number;
    type?: AnimateType;
    time: number;
    fps?: number;
}
/**
 * @param {AnimateType} type
 * @param {number} start
 * @param {number} stop
 * @param {number} frame
 * @param {number} frames
 * @param {number=3} power
 * @return {number}
 */
declare function getValueInFrame(type: AnimateType, start: number, stop: number, frame: number, frames: number, power?: number): number;
declare class Animate {
    /**
     * Get frames from time
     * @param {number} time
     * @param {number=1000/60} fps
     * @return {number}
     */
    static getFrames(time: number, fps?: number): number;
    static getValueInFrame: typeof getValueInFrame;
    $: Emitter;
    private _frame;
    private type;
    private time;
    private fps;
    xFrom: number;
    xTo: number;
    yFrom: number;
    yTo: number;
    zFrom: number;
    zTo: number;
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
     * @return {boolean}
     */
    get running(): boolean;
    /**
     * @return {boolean}
     */
    get done(): boolean;
    /**
     * @param {AnimateConfig={time:0}} config
     * @return {any}
     */
    constructor(config?: AnimateConfig);
    /**
     * @param {any} {xFrom=0
     * @param {any} xTo=0
     * @param {any} yFrom=0
     * @param {any} yTo=0
     * @param {any} zFrom=0
     * @param {any} zTo=0
     * @param {any} type="linear"
     * @param {any} time
     * @param {any} fps=1000/60
     * @param {AnimateConfig} }
     * @return {void}
     */
    config({ xFrom, xTo, yFrom, yTo, zFrom, zTo, type, time, fps, }: AnimateConfig): void;
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
    move(x?: number, y?: number, z?: number): void;
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {Promise<void>}
     */
    moveAsync(x?: number, y?: number, z?: number): Promise<void>;
    /**
     * @returns void
     */
    addFrame(): void;
    /**
     * @param  {AnimateType} type
     * @returns void
     */
    setType(type: AnimateType): void;
    /**
     * @returns AnimateType
     */
    getType(): AnimateType;
    /**
     * @param  {number} time
     * @returns void
     */
    setTime(time: number): void;
    /**
     * @returns number
     */
    getTime(): number;
    /**
     * @param {number} x?
     * @param {number} y?
     * @param {number} z?
     * @return {void}
     */
    moveImmediate(x?: number, y?: number, z?: number): void;
}
export default Animate;
export { getValueInFrame };
