import fCanvas from "../core/fCanvas";
import MyElement from "../core/MyElement";
import { noop } from "../utils/index";
interface Range {
    min: number;
    max: number;
    default: number;
    current: number;
    dynamic: boolean;
}
interface ConfigCursor {
    x: Range;
    y: Range;
}
declare class Cursor {
    private _camera;
    private _config;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    constructor(camera: Camera, config: ConfigCursor);
}
export default class Camera {
    static Cursor: typeof Cursor;
    private _canvas;
    private _viewport;
    private _offset;
    private _watchers;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    $watch(name: string, callback: {
        (newValue: any, oldValue: any): void;
    }): noop;
    constructor(canvas: fCanvas, x: number, y: number, width: number, height: number);
    getXOffset(value: number, diffSpeed?: number): number;
    getYOffset(value: number, diffSpeed?: number): number;
    isLimitX(): -1 | 0 | 1;
    isLimitY(): -1 | 0 | 1;
    isXInViewBox(element: MyElement, diffSpeed: number): boolean;
    isXInViewBox(value: number, width: number, diffSpeed: number): boolean;
    isYInViewBox(element: MyElement, diffSpeed: number): boolean;
    isYInViewBox(value: number, height: number, diffSpeed: number): boolean;
    isInViewBox(element: MyElement, diffSpeedX: number, diffSpeedY: number): boolean;
    isInViewBox(x: number, y: number, width: number, height: number, diffSpeedX: number, diffSpeedY: number): boolean;
}
export {};
