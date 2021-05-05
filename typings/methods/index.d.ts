import { Object } from "../types";
export interface Circle extends Object {
    x: number;
    y: number;
    radius: number;
}
export interface Rect extends Object {
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * @param {Circle} circle1
 * @param {Circle} circle2
 * @return {boolean}
 */
export declare function CircleImpact(circle1: Circle, circle2: Circle): boolean;
/**
 * @param {Circle} circle
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
export declare function CircleImpactPoint(circle: Circle, x: number | null, y: number | null): boolean;
/**
 * @param {Circle} circle
 * @param {Rect} rect
 * @return {boolean}
 */
export declare function CircleImpactRect(circle: Circle, rect: Rect): boolean;
/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export declare function constrain(value: number, min: number, max: number): number;
/**
 * @param {string} src
 * @return {Promise<HTMLImageElement>}
 */
export declare function loadImage(src: string): Promise<HTMLImageElement>;
/**
 * @param {number} value
 * @param {number} start
 * @param {number} stop
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export declare function map(value: number, start: number, stop: number, min: number, max: number): number;
/**
 * @param {any[]} ...args
 * @return {any}
 */
declare function random(value: number): number;
declare function random<T>(array: T[]): T;
declare function random(start: number, stop: number): number;
declare function range(start: number, stop: number, step: number): number;
declare function range(start: string, stop: string, step: number): string;
export { random, range };
/**
 * @param {Rect} rect1
 * @param {Rect} rect2
 * @return {boolean}
 */
export declare function RectImpact(rect1: Rect, rect2: Rect): boolean;
/**
 * @param {Rect} rect
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
export declare function RectImpactPoint(rect: Rect, x: number | null, y: number | null): boolean;
/**
 * @param {number} start
 * @param {number} stop
 * @param {number} amt
 * @return {number}
 */
export declare function lerp(start: number, stop: number, amt: number): number;
/**
 * @param {number[]} ...args
 * @return {number}
 */
export declare const hypot: (...values: number[]) => number;
export declare function foreach(object: ArrayLike<any> | Object, callback: {
    (value?: any, index?: number | string, object?: ArrayLike<any> | Object): void;
}): void;
