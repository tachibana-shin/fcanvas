import { Object } from "../types";
interface Circle extends Object {
    x: number;
    y: number;
    radius: number;
}
interface Rect extends Object {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare function CircleImpact(circle1: Circle, circle2: Circle): boolean;
export declare function CircleImpactPoint(circle: Circle, x: number, y: number): boolean;
export declare function CircleImpactRect(circle: Circle, rect: Rect): boolean;
export declare function constrain(value: number, min: number, max: number): number;
export declare function loadImage(src: string): Promise<HTMLImageElement>;
export declare function map(value: number, start: number, stop: number, min: number, max: number): number;
declare function random(value: number): number;
declare function random<T>(array: T[]): T;
declare function random(start: number, stop: number): number;
declare function range(start: number, stop: number, step: number): number;
declare function range(start: string, stop: string, step: number): string;
export { random, range };
export declare function RectImpact(rect1: Rect, rect2: Rect): boolean;
export declare function RectImpactPoint(rect: Rect, x: number, y: number): boolean;
export declare function lerp(start: number, stop: number, amt: number): number;
export declare const hypot: (...values: number[]) => number;
