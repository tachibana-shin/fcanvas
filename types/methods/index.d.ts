import Vector from "../../src/classes/Vector";

interface Circle {
  x: number;
  y: number;
  radius: number;
  [propName: string]: any;
}
interface Point {
  x: number;
  y: number;
  [propName: string]: any;
}
interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  [propName: string]: any;
}

export declare function CircleImpact(c1: Circle, c2: Circle): boolean;
export declare function CircleImpactPoint(
  c: Circle,
  x: number,
  y: number
): boolean;
export declare function CircleImpactRect(sphere: Cirle, box: Rect): boolean;
export declare function constrain(
  value: number,
  min: number,
  max: number
): number;
export declare function createMatrix(css: string): number[];
export declare function createVector(...argv: number[]): Vector;
export declare function loadImage(src: string): Promise<HTMLImageElement>;
export declare function map(
  value: number,
  start: number,
  stop: number,
  min: number,
  max: number
): number;
export declare interface random {
  (...args: any[]): any;
  (start: number, stop: number): number;
  (number: number): number;
}
export declare function range<T>(start: T, stop: T, step: number): T;
export declare function RectImpact(r1: Rect, r2: Rect): boolean;
export declare function RectImpactPoint(
  rect: Rect,
  x: number,
  y: number
): boolean;
export declare function lerp(start: number, stop: number, amt: number): number;
